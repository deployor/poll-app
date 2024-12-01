import { useContext } from 'react';
import Image from 'next/image';
import { UserContext } from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import PollList from '../components/PollList';

export default function Home() {
  const { user, supabase } = useContext(UserContext);

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar />
      <div className="container mx-auto px-4 pt-12">
        <div className="flex justify-center mb-1 pt-9 pb-5">
          <Image
            src="/logo.png"
            alt="Poll App Logo"
            width={450}
            height={200}
            className="hover:opacity-90 transition-all duration-300"
            priority
          />
        </div>
        {!user && (
          <div className="text-center py-20 pt-2">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Welcome!
            </h1>
            <p className="text-gray-400 mb-8 text-xl">
              Here you can create poll and vote on polls created by others.
            </p>
            <button
              onClick={signInWithGitHub}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg text-lg hover:opacity-90 transition-opacity"
            >
              Sign In with GitHub
            </button>
          </div>
        )}
        <PollList />
      </div>
    </div>
  );
}