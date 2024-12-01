import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { UserContext } from '../contexts/UserContext';
import Navbar from '../components/Navbar';

export default function CreatePoll() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['']);
  const [duration, setDuration] = useState('1 Hour');

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createPoll = async () => {
    const expiresAt = new Date();
    if (duration === '1 Hour') expiresAt.setHours(expiresAt.getHours() + 1);
    if (duration === '1 Day') expiresAt.setDate(expiresAt.getDate() + 1);
    if (duration === '2 Days') expiresAt.setDate(expiresAt.getDate() + 2);

    const { data, error } = await supabase.from('polls').insert([
      {
        title,
        description,
        options,
        created_by: user.id,
        expires_at: expiresAt.toISOString(),
      },
    ]);
    if (!error) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-8 pt-24">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Create a New Poll</h1>
        <div className="space-y-6 max-w-2xl mx-auto bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border border-gray-700">
          <div>
            <label className="block mb-2 text-gray-300">Title</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700/50 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Description</label>
            <textarea
              className="w-full p-3 bg-gray-800 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Options</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-3 bg-gray-800 rounded-md mt-2"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}
            <button
              onClick={addOption}
              className="mt-2 px-4 py-2 bg-green-600 rounded-md hover:bg-green-500"
            >
              Add Option
            </button>
          </div>
          <div className="mt-4">
            <label className="block mb-2">Duration</label>
            <select
              className="w-full p-3 bg-gray-800 rounded-md"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option>1 Hour</option>
              <option>1 Day</option>
              <option>2 Days</option>
            </select>
          </div>
          <button
            onClick={createPoll}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-md hover:from-green-400 hover:to-blue-400 transform hover:-translate-y-0.5 transition-all duration-300 text-white font-medium shadow-lg shadow-blue-500/20"
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
}