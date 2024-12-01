import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabaseClient';
import { VoteChart } from '../../../components/VoteChart';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

export default function PollResults() {
  const router = useRouter();
  const { id } = router.query;
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPoll = async () => {
      const { data: pollData } = await supabase
        .from('polls')
        .select('*')
        .eq('id', id)
        .single();
      setPoll(pollData);
    };
    fetchPoll();
  }, [id]);

  if (!poll) return null;

  const isActive = new Date(poll.expires_at) > new Date();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-8 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {poll.title} - Results
          </h1>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white hover:opacity-90 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
        <p className="mb-6 text-gray-400">{poll.description}</p>
        <VoteChart pollId={id} />
      </div>
    </div>
  );
}