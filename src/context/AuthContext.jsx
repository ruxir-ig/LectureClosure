import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange, getSession, getTeacherProfile, signOut as authSignOut, resetPassword, updatePassword, updateProfile } from '../services/authService';
import { isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

    useEffect(() => {
        // Check initial session
        const initAuth = async () => {
            if (!isSupabaseConfigured) {
                // Demo mode - no authentication
                setIsDemoMode(true);
                setLoading(false);
                return;
            }

            const { session } = await getSession();
            if (session?.user) {
                setUser(session.user);
                const { profile } = await getTeacherProfile(session.user.id);
                setProfile(profile);
            }
            setLoading(false);
        };

        initAuth();

        // Subscribe to auth changes
        const { data: { subscription } } = onAuthStateChange(async (event, session) => {
            if (!isSupabaseConfigured) {
                return;
            }

            if (session?.user) {
                setUser(session.user);
                const { profile } = await getTeacherProfile(session.user.id);
                setProfile(profile);
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await authSignOut();
        setUser(null);
        setProfile(null);
    };

    const handleResetPassword = async (email) => {
        return await resetPassword(email);
    };

    const handleUpdatePassword = async (newPassword) => {
        return await updatePassword(newPassword);
    };

    const handleUpdateProfile = async (updates) => {
        if (!user) {
            return { profile: null, error: 'No user logged in' };
        }
        const result = await updateProfile(user.id, updates);
        if (result.profile) {
            setProfile(result.profile);
        }
        return result;
    };

    const value = {
        user,
        profile,
        loading,
        signOut,
        isAuthenticated: !!user,
        isDemoMode,
        resetPassword: handleResetPassword,
        updatePassword: handleUpdatePassword,
        updateProfile: handleUpdateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
