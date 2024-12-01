import { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
  const { user, supabase } = useContext(UserContext);

  const signInWithGitHub = async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
    };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="backdrop-blur-md bg-gray-900/80 fixed w-full top-0 z-50 border-b border-gray-800/50 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent hover:from-green-300 hover:to-blue-400 transition-all duration-300">
            Poll App by Deployor
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  href="/create" 
                  className="text-gray-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-green-400 after:to-blue-500 after:transition-all"
                >
                  Create Poll
                </Link>
                <button 
                  onClick={signOut} 
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 hover:from-green-400 hover:to-blue-400 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button 
                onClick={signInWithGitHub} 
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 hover:from-green-400 hover:to-blue-400 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;  // Make sure this is the default export