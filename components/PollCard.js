import Link from 'next/link';

const PollCard = ({ poll }) => {
  const isActive = new Date(poll.expires_at) > new Date();

  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-green-400 group-hover:to-blue-500 transition-all duration-300">{poll.title}</h2>
        <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">{poll.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {isActive && (
              <Link
                href={`/poll/${poll.id}`}
                className="px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Vote Now
              </Link>
            )}
            <Link
              href={`/poll/${poll.id}/results`}
              className="px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Results
            </Link>
          </div>
          <span className={`text-sm px-3 py-1 rounded-full ${
            isActive 
              ? 'bg-green-500/20 text-green-400'
              : 'bg-gray-700/50 text-gray-400'
          }`}>
            {isActive ? 'Active' : 'Ended'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PollCard;