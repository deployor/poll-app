import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { supabase } from '../utils/supabaseClient';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const VoteChart = ({ pollId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Poll Results',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#444',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff',
          stepSize: 1,
        },
        grid: {
          color: '#444',
        },
      },
    },
  };

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        setLoading(true);
        const { data: votes, error } = await supabase
          .from('votes')
          .select('option')
          .eq('poll_id', pollId);

        if (error) throw error;

        if (!votes || votes.length === 0) {
          setChartData({
            labels: [],
            datasets: [{
              label: 'Votes',
              data: [],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }]
          });
          return;
        }

        const results = votes.reduce((acc, vote) => {
          acc[vote.option] = (acc[vote.option] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(results),
          datasets: [{
            label: 'Votes',
            data: Object.values(results),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        });
      } catch (error) {
        console.error('Error fetching votes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (pollId) {
      fetchVotes();
    }
  }, [pollId]);

  if (loading) return <div>Loading results...</div>;
  if (!chartData) return <div>No votes yet</div>;

  return (
    <div className="mt-4">
      <h2 className="text-xl">Results:</h2>
      <Bar options={options} data={chartData} />
    </div>
  );
};