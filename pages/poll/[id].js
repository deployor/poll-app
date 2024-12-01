import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { UserContext } from '../../contexts/UserContext';
import { VoteChart } from '../../components/VoteChart';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function PollDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(UserContext);
  const [poll, setPoll] = useState(null);
  const [optionSelected, setOptionSelected] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  

  useEffect(() => {
    if (!id) return;

    const fetchPoll = async () => {
      try {
        const { data: pollData } = await supabase
          .from('polls')
          .select('*')
          .eq('id', id)
          .single();
        setPoll(pollData);

        if (user) {
          const { data: voteData, error } = await supabase
            .from('votes')
            .select('*')
            .eq('poll_id', id)
            .eq('voter_id', user.id)
            .maybeSingle(); // Use maybeSingle instead of single to handle no results gracefully
          
          // Only set hasVoted if we actually found a vote
          setHasVoted(!!voteData);
        }
      } catch (error) {
        console.error('Error fetching poll data:', error);
      }
    };
    fetchPoll();
  }, [id, user]);

  const submitVote = async () => {
    if (!optionSelected || !user) return;
    await supabase.from('votes').insert([
      {
        poll_id: id,
        voter_id: user.id,
        option: optionSelected,
      },
    ]);
    setHasVoted(true);
  };

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  if (!poll) return null;

  const isActive = new Date(poll.expires_at) > new Date();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-8 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{poll.title}</h1>
          <Link
            href={`/poll/${id}/results`}
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all duration-300"
          >
            View Results
          </Link>
        </div>
        <p className="mb-6">{poll.description}</p>

        {isActive ? (
          user ? (
            !hasVoted ? (
              <div className="mt-6">
                {poll.options.map((option) => (
                  <div key={option} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="option"
                        value={option}
                        onChange={(e) => setOptionSelected(e.target.value)}
                        className="form-radio text-green-600"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
                <button
                  onClick={submitVote}
                  className="mt-4 px-6 py-3 bg-green-600 rounded-md hover:bg-green-500"
                >
                  Submit Vote
                </button>
              </div>
            ) : (
              <VoteChart pollId={id} />
            )
          ) : (
            <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 max-w-md border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Sign in to Vote
              </h3>
              <p className="text-gray-400 mb-6">
                Join our community to cast your vote and make your opinion count!
              </p>
              <button 
                onClick={signInWithGitHub}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/20 hover:from-green-400 hover:to-blue-400 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign in with GitHub
              </button>
            </div>
          )
        ) : (
          <VoteChart pollId={id} />
        )}
      </div>
    </div>
  );
}