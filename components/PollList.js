import { useEffect, useState, useContext } from 'react';
import { supabase } from '../utils/supabaseClient';
import { UserContext } from '../contexts/UserContext';
import PollCard from './PollCard';
import Link from 'next/link';

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPolls = async () => {
      const { data } = await supabase
        .from('polls')
        .select('*')
        .order('created_at', { ascending: false });
      setPolls(data);
    };
    fetchPolls();
  }, []);

  if (polls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 max-w-md w-full text-center border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            No Polls Yet
          </h3>
          <p className="text-gray-400 mb-6">
            Be the first to create a poll and start gathering opinions from your community!
          </p>
          {user ? (
            <Link
              href="/create"
              className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/20 hover:from-green-400 hover:to-blue-400 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Create First Poll
            </Link>
          ) : (
            <p className="text-sm text-gray-500">Sign in to create polls</p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default PollList;