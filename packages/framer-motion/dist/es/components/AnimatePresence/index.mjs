import * as React from 'react';
import { useContext, useRef, useCallback, cloneElement, Children, isValidElement } from 'react';
import { env } from '../../utils/process.mjs';
import { useForceUpdate } from '../../utils/use-force-update.mjs';
import { useIsMounted } from '../../utils/use-is-mounted.mjs';
import { PresenceChild } from './PresenceChild.mjs';
import { LayoutGroupContext } from '../../context/LayoutGroupContext.mjs';
import { useIsomorphicLayoutEffect } from '../../utils/use-isomorphic-effect.mjs';
import { useUnmountEffect } from '../../utils/use-unmount-effect.mjs';
import { warnOnce } from '../../utils/warn-once.mjs';

const getChildKey = (child) => child.key || "";
function updateChildLookup(children, allChildren) {
    children.forEach((child) => {
        const key = getChildKey(child);
        allChildren.set(key, child);
    });
}
function onlyElements(children) {
    const filtered = [];
    // We use forEach here instead of map as map mutates the component key by preprending `.$`
    Children.forEach(children, (child) => {
        if (isValidElement(child))
            filtered.push(child);
    });
    return filtered;
}
function splitChildrenByKeys(keys, children, mapFunction) {
    const chunks = [];
    let insertionStartIndex = 0;
    keys.forEach((key) => {
        const insertionEndIndex = children.findIndex((child) => getChildKey(child) === key);
        let chunk = children.slice(insertionStartIndex, insertionEndIndex);
        if (mapFunction)
            chunk = chunk.map(mapFunction);
        chunks.push(chunk);
        insertionStartIndex = insertionEndIndex + 1;
    });
    let chunk = children.slice(insertionStartIndex, children.length);
    if (mapFunction)
        chunk = chunk.map(mapFunction);
    chunks.push(chunk);
    return chunks;
}
/**
* `AnimatePresence` enables the animation of components that have been removed from the tree.
*
* When adding/removing more than a single child, every child **must** be given a unique `key` prop.
*
* Any `motion` components that have an `exit` property defined will animate out when removed from
* the tree.
*
* ```jsx
* import { motion, AnimatePresence } from 'framer-motion'
*
* export const Items = ({ items }) => (
*   <AnimatePresence>
*     {items.map(item => (
*       <motion.div
*         key={item.id}
*         initial={{ opacity: 0 }}
*         animate={{ opacity: 1 }}
*         exit={{ opacity: 0 }}
*       />
*     ))}
*   </AnimatePresence>
* )
* ```
*
* You can sequence exit animations throughout a tree using variants.
*
* If a child contains multiple `motion` components with `exit` props, it will only unmount the child
* once all `motion` components have finished animating out. Likewise, any components using
* `usePresence` all need to call `safeToRemove`.
*
* @public
*/
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, exitBeforeEnter, presenceAffectsLayout = true, mode = "sync", }) => {
    // Support deprecated exitBeforeEnter prop
    if (exitBeforeEnter) {
        mode = "wait";
        warnOnce(false, "Replace exitBeforeEnter with mode='wait'");
    }
    // We want to force a re-render once all exiting animations have finished. We
    // either use a local forceRender function, or one from a parent context if it exists.
    let [forceRender] = useForceUpdate();
    const forceRenderLayoutGroup = useContext(LayoutGroupContext).forceRender;
    if (forceRenderLayoutGroup)
        forceRender = forceRenderLayoutGroup;
    const isMounted = useIsMounted();
    // Filter out any children that aren't ReactElements. We can only track ReactElements with a props.key
    const filteredChildren = onlyElements(children);
    let childrenToRender = filteredChildren;
    const exiting = useRef(new Set()).current;
    // Keep a living record of the children we're actually rendering so we
    // can diff to figure out which are entering and exiting
    const presentChildren = useRef(childrenToRender);
    // A lookup table to quickly reference components by key
    const allChildren = useRef(new Map()).current;
    // If this is the initial component render, just deal with logic surrounding whether
    // we play onMount animations or not.
    const isInitialRender = useRef(true);
    const onPresenceChildRemove = useCallback((key) => {
        allChildren.delete(key);
        exiting.delete(key);
        // Remove this child from the present children
        const removeIndex = presentChildren.current.findIndex((presentChild) => presentChild.key === key);
        presentChildren.current.splice(removeIndex, 1);
        // Defer re-rendering until all exiting children have indeed left
        if (!exiting.size) {
            presentChildren.current = filteredChildren;
            if (isMounted.current === false)
                return;
            forceRender();
            onExitComplete && onExitComplete();
        }
    }, [
        allChildren,
        exiting,
        filteredChildren,
        forceRender,
        isMounted,
        onExitComplete,
    ]);
    useIsomorphicLayoutEffect(() => {
        isInitialRender.current = false;
        updateChildLookup(filteredChildren, allChildren);
        presentChildren.current = childrenToRender;
    });
    useUnmountEffect(() => {
        isInitialRender.current = true;
        allChildren.clear();
        exiting.clear();
    });
    if (isInitialRender.current) {
        return (React.createElement(React.Fragment, null, childrenToRender.map((child) => (React.createElement(PresenceChild, { key: getChildKey(child), childKey: getChildKey(child), isPresent: true, initial: initial ? undefined : false, presenceAffectsLayout: presenceAffectsLayout, mode: mode }, child)))));
    }
    // If this is a subsequent render, deal with entering and exiting children
    // Diff the keys of the currently-present and target children to update our
    // preserving list.
    const presentKeys = presentChildren.current.map(getChildKey);
    const targetKeys = filteredChildren.map(getChildKey);
    const preservingKeys = [];
    // Diff the present children with our target children and mark those that are preserving
    const numPresent = presentKeys.length;
    for (let i = 0; i < numPresent; i++) {
        const key = presentKeys[i];
        if (targetKeys.indexOf(key) === -1) {
            exiting.add(key);
        }
        else {
            preservingKeys.push(key);
            exiting.delete(key);
        }
    }
    // split the presentChildren based on the key of the component you are preserving
    const presentChunks = splitChildrenByKeys(preservingKeys, presentChildren.current, (_child) => {
        const key = getChildKey(_child);
        const child = allChildren.get(key);
        const extingChild = (React.createElement(PresenceChild, { key: key, childKey: key, isPresent: false, onExitComplete: onPresenceChildRemove, custom: custom, presenceAffectsLayout: presenceAffectsLayout, mode: mode }, child));
        return extingChild;
    });
    const targetChunks = splitChildrenByKeys(preservingKeys, filteredChildren, (child) => (
    // Add `MotionContext` even to children that don't need it to ensure we're rendering
    // the same tree between renders
    React.createElement(PresenceChild, { key: getChildKey(child), childKey: getChildKey(child), isPresent: true, presenceAffectsLayout: presenceAffectsLayout, mode: mode }, child)));
    // Combine the chunk separated by the preservingKeys.
    //
    // If a change occurs in the rendering array,
    // insert the chunk where the change occurred in the previous location.
    //
    // presentChildren  ->  children
    //     [A]                 [1]
    //     [D]                 [A]
    //     [E]                 [2]
    //     [F]                 [B]
    //     [B]                 [3]
    //     [C]                 [C]
    //
    //  init ->  animate -> Exit Complete
    //
    //             [1]        [1]     <--- targetChunk - 1
    //   [A]       [A]        [A]     <--- preservingKey
    //   [D]       [D]
    //   [E]       [E]                <--- presentChunk - 1
    //   [F]       [F]
    //             [2]        [2]     <--- targetChunk - 2
    //   [B]       [B]        [B]     <--- preservingKey
    //             [3]        [3]     <--- targetChunk - 3
    //   [C]       [C]        [C]     <--- preservingKey
    childrenToRender = [];
    Array.from({ length: preservingKeys.length + 1 }).forEach((_, i) => {
        const key = preservingKeys[i];
        const child = allChildren.get(key);
        childrenToRender = childrenToRender.concat(presentChunks[i]);
        // If we currently have exiting children, and we're deferring rendering incoming children
        // until after all current children have exiting, empty the childrenToRender array
        if (!(mode === "wait" && exiting.size)) {
            childrenToRender = childrenToRender.concat(targetChunks[i]);
        }
        if (child) {
            childrenToRender.push(React.createElement(PresenceChild, { key: key, childKey: key, isPresent: true, presenceAffectsLayout: presenceAffectsLayout, mode: mode }, child));
        }
    });
    if (env !== "production" &&
        mode === "wait" &&
        childrenToRender.length > 1) {
        console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
    }
    return (React.createElement(React.Fragment, null, exiting.size
        ? childrenToRender
        : childrenToRender.map((child) => cloneElement(child))));
};

export { AnimatePresence };
