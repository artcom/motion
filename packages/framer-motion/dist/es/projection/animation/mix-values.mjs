import { mix, progress, circOut, linear } from 'popmotion';
import { percent, px } from 'style-value-types';

const borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
const numBorders = borders.length;
const asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
const isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress, shouldCrossfadeOpacity, isOnlyMember) {
    var _a, _b, _c, _d;
    if (shouldCrossfadeOpacity) {
        target.opacity = mix(0, 
        // (follow?.opacity as number) ?? 0,
        // TODO Reinstate this if only child
        (_a = lead.opacity) !== null && _a !== void 0 ? _a : 1, easeCrossfadeIn(progress));
        target.opacityExit = mix((_b = follow.opacity) !== null && _b !== void 0 ? _b : 1, 0, easeCrossfadeOut(progress));
    }
    else if (isOnlyMember) {
        target.opacity = mix((_c = follow.opacity) !== null && _c !== void 0 ? _c : 1, (_d = lead.opacity) !== null && _d !== void 0 ? _d : 1, progress);
    }
    /**
     * Mix border radius
     */
    for (let i = 0; i < numBorders; i++) {
        const borderLabel = `border${borders[i]}Radius`;
        let followRadius = getRadius(follow, borderLabel);
        let leadRadius = getRadius(lead, borderLabel);
        if (followRadius === undefined && leadRadius === undefined)
            continue;
        followRadius || (followRadius = 0);
        leadRadius || (leadRadius = 0);
        const canMix = followRadius === 0 ||
            leadRadius === 0 ||
            isPx(followRadius) === isPx(leadRadius);
        if (canMix) {
            target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress), 0);
            if (percent.test(leadRadius) || percent.test(followRadius)) {
                target[borderLabel] += "%";
            }
        }
        else {
            target[borderLabel] = leadRadius;
        }
    }
    /**
     * Mix rotation
     */
    if (follow.rotate || lead.rotate) {
        target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress);
    }
}
function getRadius(values, radiusName) {
    var _a;
    return (_a = values[radiusName]) !== null && _a !== void 0 ? _a : values.borderRadius;
}
// /**
//  * We only want to mix the background color if there's a follow element
//  * that we're not crossfading opacity between. For instance with switch
//  * AnimateSharedLayout animations, this helps the illusion of a continuous
//  * element being animated but also cuts down on the number of paints triggered
//  * for elements where opacity is doing that work for us.
//  */
// if (
//     !hasFollowElement &&
//     latestLeadValues.backgroundColor &&
//     latestFollowValues.backgroundColor
// ) {
//     /**
//      * This isn't ideal performance-wise as mixColor is creating a new function every frame.
//      * We could probably create a mixer that runs at the start of the animation but
//      * the idea behind the crossfader is that it runs dynamically between two potentially
//      * changing targets (ie opacity or borderRadius may be animating independently via variants)
//      */
//     leadState.backgroundColor = followState.backgroundColor = mixColor(
//         latestFollowValues.backgroundColor as string,
//         latestLeadValues.backgroundColor as string
//     )(p)
// }
const easeCrossfadeIn = compress(0, 0.5, circOut);
const easeCrossfadeOut = compress(0.5, 0.95, linear);
function compress(min, max, easing) {
    return (p) => {
        // Could replace ifs with clamp
        if (p < min)
            return 0;
        if (p > max)
            return 1;
        return easing(progress(min, max, p));
    };
}

export { mixValues };
