import { __rest } from 'tslib';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { LazyContext } from '../../context/LazyContext.mjs';
import { loadFeatures } from '../../motion/features/definitions.mjs';

/**
 * Used in conjunction with the `m` component to reduce bundle size.
 *
 * `m` is a version of the `motion` component that only loads functionality
 * critical for the initial render.
 *
 * `LazyMotion` can then be used to either synchronously or asynchronously
 * load animation and gesture support.
 *
 * ```jsx
 * // Synchronous loading
 * import { LazyMotion, m, domAnimations } from "framer-motion"
 *
 * function App() {
 *   return (
 *     <LazyMotion features={domAnimations}>
 *       <m.div animate={{ scale: 2 }} />
 *     </LazyMotion>
 *   )
 * }
 *
 * // Asynchronous loading
 * import { LazyMotion, m } from "framer-motion"
 *
 * function App() {
 *   return (
 *     <LazyMotion features={() => import('./path/to/domAnimations')}>
 *       <m.div animate={{ scale: 2 }} />
 *     </LazyMotion>
 *   )
 * }
 * ```
 *
 * @public
 */
function LazyMotion({ children, features, strict = false }) {
    const [, setIsLoaded] = useState(!isLazyBundle(features));
    const loadedRenderer = useRef(undefined);
    /**
     * If this is a synchronous load, load features immediately
     */
    if (!isLazyBundle(features)) {
        const { renderer } = features, loadedFeatures = __rest(features, ["renderer"]);
        loadedRenderer.current = renderer;
        loadFeatures(loadedFeatures);
    }
    useEffect(() => {
        if (isLazyBundle(features)) {
            features().then((_a) => {
                var { renderer } = _a, loadedFeatures = __rest(_a, ["renderer"]);
                loadFeatures(loadedFeatures);
                loadedRenderer.current = renderer;
                setIsLoaded(true);
            });
        }
    }, []);
    return (React.createElement(LazyContext.Provider, { value: { renderer: loadedRenderer.current, strict } }, children));
}
function isLazyBundle(features) {
    return typeof features === "function";
}

export { LazyMotion };
