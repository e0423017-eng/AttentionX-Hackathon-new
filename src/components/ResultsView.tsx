import { CheckCircle, RotateCcw, TrendingUp } from 'lucide-react';
import { VideoJob } from '../lib/supabase';
import ClipCard from './ClipCard';
import { formatTime } from '../lib/mockProcessor';

interface Props {
  job: VideoJob;
  onReset: () => void;
}

export default function ResultsView({ job, onReset }: Props) {
  const avgScore = job.clips.length
    ? Math.round(job.clips.reduce((a, c) => a + c.engagementScore, 0) / job.clips.length)
    : 0;

  return (
    <div>
      <div className="bg-gray-900 border border-green-500/20 rounded-2xl p-5 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-white font-bold">{job.clips.length} Clips Generated</p>
              <p className="text-gray-500 text-xs mt-0.5">from {formatTime(job.duration_seconds)} of content</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-lg transition-all"
          >
            <RotateCcw size={12} />
            New Video
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: 'Clips Ready', value: job.clips_count, unit: 'shorts' },
            { label: 'Avg Engagement', value: `${avgScore}%`, unit: 'score', icon: <TrendingUp size={12} className="text-green-400" /> },
            { label: 'Time Saved', value: Math.round(job.duration_seconds / 60), unit: 'minutes' },
          ].map(({ label, value, unit, icon }) => (
            <div key={label} className="bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-white flex items-center justify-center gap-1">
                {icon}{value}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{unit}</p>
              <p className="text-xs text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-white font-bold text-lg mb-4">Your Viral Clips</h2>
      <div className="space-y-4">
        {job.clips.map((clip, i) => (
          <ClipCard key={clip.id} clip={clip} index={i} />
        ))}
      </div>
    </div>
  );
}
