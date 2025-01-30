import React, { createContext, useContext, useCallback, useMemo, useEffect, useState, useRef } from 'react';
import { DiscordAuthContextType, DiscordAuthResponse, DiscordRoleType, DiscordUserType } from '../types';
import { deleteCookie, getCookie, secureStorage, setCookie } from '../hooks';
import { usePreloader } from './preloader';
import { securePost } from '../utils';


const DiscordAuthContext = createContext<DiscordAuthContextType | undefined>(undefined);
const SESSION_KEY = 'discord_auth_state';

interface initialStateType {
    isLoading: boolean;
    isAuthed: boolean;
    user: DiscordUserType | null;
    roles: DiscordRoleType | null;
    verifiedUser: boolean;
    isAdmin: boolean;
}

const initialState: initialStateType = {
    isLoading: true,
    isAuthed: false,
    user: null,
    roles: null,
    verifiedUser: false,
    isAdmin: false,

};

export const DiscordAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState(initialState);
    const { setPreloader } = usePreloader();
    const authRequestInProgress = useRef<boolean>(false);
    const isMounted = useRef<boolean>(true);

    const fetchAuth = useCallback(async () => {
        if (authRequestInProgress.current) return;

        const cookieValue = getCookie({ name: 'refresh_token' });
        if (!cookieValue || cookieValue === 'undefined') {
            setState(prev => ({ ...prev, isLoading: false }));
            setPreloader(false);
            return;
        }

        try {
            authRequestInProgress.current = true;

            const { data, status } = await securePost<DiscordAuthResponse>('/api/auth/reauth', { cookieValue });

            if (!isMounted.current) return;

            if (status === 200 && data) {
                setCookie({
                    name: 'refresh_token',
                    value: data.refresh_token,
                    time: data.expires_in,
                    priority: 'high',
                    SameSite: 'Strict',
                    Secure: true
                });

                const newState = {
                    isLoading: false,
                    isAuthed: true,
                    user: data.user,
                    roles: data.roles,
                    verifiedUser: false,
                    isAdmin: false,
                };

                setState(newState);
                secureStorage.setItem(SESSION_KEY, { state: newState });

            } else if (status === 400) {
                deleteCookie({ name: 'refresh_token' });
                secureStorage.removeItem(SESSION_KEY);
                setState({ ...initialState, isLoading: false });
            }
        } catch (error) {
            if (isMounted.current) {
                console.error('Auth error:', error);
                setState({ ...initialState, isLoading: false });
            }
        } finally {
            authRequestInProgress.current = false;
            if (isMounted.current) {
                setPreloader(false);
            }
        }
    }, [setPreloader]);

    useEffect(() => {
        isMounted.current = true;
        setPreloader(true);

        // Try to load from sessionStorage first
        const cachedAuth = secureStorage.getItem(SESSION_KEY);
        if (cachedAuth?.state) {
            setState(cachedAuth.state);
            setPreloader(false);
            return;
        }

        fetchAuth();

        return () => {
            isMounted.current = false;
        };
    }, [fetchAuth, setPreloader]);

    const signIn = useCallback(async () => {
        if (authRequestInProgress.current) return;

        try {
            const { data } = await securePost<{ url: string }>('/api/auth/login', {});
            if (data?.url) {
                window.location.replace(data.url);
            }
        } catch (error) {
            console.error('Sign in failed:', error);
        }
    }, []);

    const signOut = useCallback(async () => {
        if (authRequestInProgress.current) return;

        setState(prev => ({ ...prev, isLoading: true }));
        setPreloader(true);

        const cookie = getCookie({ name: 'refresh_token' });
        if (!cookie) {
            setState({ ...initialState, isLoading: false });
            setPreloader(false);
            return;
        }

        try {
            await securePost<{ message: string }>('/api/auth/logout', {});
            deleteCookie({ name: 'refresh_token' });
            secureStorage.removeItem(SESSION_KEY);
        } finally {
            setState({ ...initialState, isLoading: false });
            setPreloader(false);
        }
    }, [setPreloader]);

    const contextValue = useMemo(() => ({
        ...state,
        setIsAuthed: (isAuthed: boolean) => setState(prev => ({ ...prev, isAuthed })),
        setUser: (user: DiscordUserType | null) => setState(prev => ({ ...prev, user })),
        setUserRoles: (roles: DiscordRoleType | null) => setState(prev => ({ ...prev, roles })),
        setVerifiedUser: (verifiedUser: boolean) => setState(prev => ({ ...prev, verifiedUser })),
        setIsAdmin: (isAdmin: boolean) => setState(prev => ({ ...prev, isAdmin })),
        signIn,
        signOut,
        
    }), [
        state,
        signIn,
        signOut,
    ]);

    return (
        <DiscordAuthContext.Provider value={contextValue}>
            {children}
        </DiscordAuthContext.Provider>
    );
};

export const useDiscordAuth = () => {
    const context = useContext(DiscordAuthContext);
    if (!context) {
        throw new Error('useDiscordAuth must be used within a DiscordAuthProvider');
    }
    return context;
};