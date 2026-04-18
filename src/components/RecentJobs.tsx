import { History, CheckCircle, Clock } from 'lucide-react';
import { VideoJob } from '../lib/supabase';

interface Props {
  jobs: VideoJob[];
  onSelect: (job: VideoJob) => void;
}

export default function RecentJobs({ jobs, onSelect }: Props) {
  if (!jobs.length) return null;

  return (
    <div className="mt-10">
      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <History size={12} />
        Recent Jobs
      </h3>
      <div className="space-y-2">
        {jobs.slice(0, 5).map((job) => (
          <button
            key={job.id}
            onClick={() => onSelect(job)}
            className="w-full text-left bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl px-4 py-3 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2.5">
              {job.status === 'completed'
                ? <CheckCircle size={14} className="text-green-400 shrink-0" />
                : <Clock size={14} className="text-yellow-400 shrink-0" />
              }
              <span className="text-sm text-gray-300 truncate max-w-[180px]">{job.title}</span>
            </div>
            <span className="text-xs text-gray-600 shrink-0 ml-2">{job.clips_count} clips</span>
          </button>
        ))}
      </div>
    </div>
  );
}
