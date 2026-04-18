import { Zap, Quote, Clock, Download, Share2 } from 'lucide-react';
import { Clip } from '../lib/supabase';
import { formatTime } from '../lib/mockProcessor';

const EMOTION_COLORS: Record<string, string> = {
  'Inspiring': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'High Energy': 'text-red-400 bg-red-400/10 border-red-400/20',
  'Profound': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  'Motivational': 'text-green-400 bg-green-400/10 border-green-400/20',
  'Emotional': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
};

interface Props {
  clip: Clip;
  index: number;
}

export default function ClipCard({ clip, index }: Props) {
  const emotionClass = EMOTION_COLORS[clip.emotion] ?? 'text-blue-400 bg-blue-400/10 border-blue-400/20';
  const duration = clip.endTime - clip.startTime;

  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600">#{index + 1}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${emotionClass}`}>
            {clip.emotion}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Zap size={11} className="text-yellow-400" />
          <span className="font-bold text-yellow-400">{clip.engagementScore}%</span>
        </div>
      </div>

      <h3 className="text-white font-bold text-sm mb-1">{clip.title}</h3>

      <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 mb-3">
        <p className="text-blue-300 text-xs font-bold mb-0.5 flex items-center gap-1">
          <Zap size={10} /> Hook
        </p>
        <p className="text-gray-300 text-sm italic">"{clip.hook}"</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-3 mb-4">
        <p className="text-gray-500 text-xs font-bold mb-0.5 flex items-center gap-1">
          <Quote size={10} /> Caption Overlay
        </p>
        <p className="text-gray-300 text-xs">{clip.caption}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {formatTime(clip.startTime)} – {formatTime(clip.endTime)}
          </span>
          <span className="text-gray-700">•</span>
          <span>{duration}s clip</span>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-all">
            <Share2 size={11} />
            Share
          </button>
          <button className="flex items-center gap-1 text-xs text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-all">
            <Download size={11} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
