import React, { createContext, useCallback, useContext, useState, ReactNode, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface PreloaderContextType {
    isPreloaderVisible: boolean;
    setPreloader: (visible: boolean, duration?: number) => void;
}

const PreloaderContext = createContext<PreloaderContextType | null>(null);

const Preloader = memo(() => {
    const cardVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center justify-center h-[100dvh] fixed inset-0 z-50 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90"
        >
            <svg className="w-12 h-12 animate-spin text-black dark:text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4Z"></path>
            </svg>
        </motion.div>
    );
});

Preloader.displayName = 'Preloader';

interface PreloaderProviderProps {
    children: ReactNode;
}

export const PreloaderProvider: React.FC<PreloaderProviderProps> = ({ children }) => {
    const [isPreloaderVisible, setPreloaderVisible] = useState<boolean>(true);

    const setPreloader = useCallback((visible: boolean, duration?: number) => {
        setPreloaderVisible(visible);
        if (visible && duration) {
            const timeoutId = setTimeout(() => {
                setPreloaderVisible(false);
            }, duration);

            return () => clearTimeout(timeoutId);
        }
    }, []);

    const contextValue = React.useMemo(() => ({ isPreloaderVisible, setPreloader }), [isPreloaderVisible, setPreloader]);

    return (
        <PreloaderContext.Provider value={contextValue}>
            {children}
            <AnimatePresence mode="wait">
                {isPreloaderVisible && <Preloader />}
            </AnimatePresence>
        </PreloaderContext.Provider>
    );
};

export const MemoizedPreloaderProvider = memo(PreloaderProvider);

export const usePreloader = (): PreloaderContextType => {
    const context = useContext(PreloaderContext);
    if (!context) {
        throw new Error('usePreloader must be used within a PreloaderProvider');
    }
    return context;
};
