import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Course } from '../services/mockAI';

export interface UserProfile {
    name: string;
    age: string;
    interests: string[];
    level: string;
    language?: string;
}

interface UserContextState {
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
    enrolledCourses: Course[];
    enrollCourse: (course: Course) => void;
    logout: () => void;
    isOnboarded: boolean;
}

const UserContext = createContext<UserContextState | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<UserProfile | null>(() => {
        const saved = localStorage.getItem('lumina_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>(() => {
        const saved = localStorage.getItem('lumina_courses');
        return saved ? JSON.parse(saved) : [];
    });

    const setUser = (u: UserProfile | null) => {
        setUserState(u);
        if (u) localStorage.setItem('lumina_user', JSON.stringify(u));
        else localStorage.removeItem('lumina_user');
    };

    const logout = () => {
        setUserState(null);
        setEnrolledCourses([]);
        localStorage.removeItem('lumina_user');
        localStorage.removeItem('lumina_courses');
    };

    const enrollCourse = (course: Course) => {
        console.log('UserContext: enrollCourse called with:', course.id, course.title);
        setEnrolledCourses(prev => {
            console.log('UserContext: Current enrolled courses:', prev.length);
            const alreadyEnrolled = prev.some(c => c.id === course.id);
            console.log('UserContext: Already enrolled?', alreadyEnrolled);

            if (alreadyEnrolled) {
                console.log('UserContext: Course already enrolled, skipping');
                return prev;
            }

            const updated = [...prev, course];
            console.log('UserContext: Adding course. New total:', updated.length);
            localStorage.setItem('lumina_courses', JSON.stringify(updated));
            console.log('UserContext: Saved to localStorage');
            return updated;
        });
        console.log('UserContext: enrollCourse complete');
    };

    return (
        <UserContext.Provider value={{ user, setUser, enrolledCourses, enrollCourse, logout, isOnboarded: !!user }}>
            {children}
        </UserContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
