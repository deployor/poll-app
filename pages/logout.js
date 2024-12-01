import {useEffect, useState} from 'react';
import {supabase} from '../utils/supabaseClient';
import {useRouter} from 'next/navigation';

export default function Logout() {
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const {error} = await supabase.auth.signOut();
                if (error) throw error;
                router.push('/');
            } catch (err) {
                setError(err.message);
            }
        };

        handleLogout();
    }, [router]);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-red-500">Error logging out: {error}</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-white">Logging out...</div>
        </div>
    );
}