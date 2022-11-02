import { scroll } from '@motionone/dom';
import { motionValue } from './index.mjs';
import { useConstant } from '../utils/use-constant.mjs';
import { useIsomorphicLayoutEffect } from '../utils/use-isomorphic-effect.mjs';

const createScrollMotionValues = () => ({
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0),
});
function useScroll({ container, target, ...options } = {}) {
    const values = useConstant(createScrollMotionValues);
    useIsomorphicLayoutEffect(() => {
        return scroll(({ x, y }) => {
            values.scrollX.set(x.current);
            values.scrollXProgress.set(x.progress);
            values.scrollY.set(y.current);
            values.scrollYProgress.set(y.progress);
        }, {
            ...options,
            container: (container === null || container === void 0 ? void 0 : container.current) || undefined,
            target: (target === null || target === void 0 ? void 0 : target.current) || undefined,
        });
    }, []);
    return values;
}

export { useScroll };