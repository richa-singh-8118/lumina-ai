import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface GamificationState {
    xp: number;
    level: number;
    streak: number;
    addXp: (amount: number) => void;
}

const GamificationContext = createContext<GamificationState | undefined>(undefined);

export function GamificationProvider({ children }: { children: ReactNode }) {
    const [xp, setXp] = useState(2450);
    const [streak] = useState(12); // Mock streak for now

    // Simple level calculation: Level up every 1000 XP
    const level = Math.floor(xp / 1000) + 1;

    const addXp = (amount: number) => {
        setXp((prev) => prev + amount);
    };

    return (
        <GamificationContext.Provider value={{ xp, level, streak, addXp }}>
            {children}
        </GamificationContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGamification() {
    const context = useContext(GamificationContext);
    if (context === undefined) {
        throw new Error('useGamification must be used within a GamificationProvider');
    }
    return context;
}
