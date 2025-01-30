import Lenis from 'lenis';

interface LenisOptions {
    duration: number;
    easing: (t: number) => number;
    smoothWheel: boolean;
    smoothTouch: boolean;
}

const useLenis = () => {
    const lenisOptions: LenisOptions = {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: true,
    };

    const lenis = new Lenis(lenisOptions);

    const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
};

export default useLenis;
