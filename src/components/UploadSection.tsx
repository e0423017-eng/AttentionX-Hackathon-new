import { useState, useRef } from 'react';
import { Link, Upload, Clock, Play } from 'lucide-react';

interface Props {
  onSubmit: (title: string, videoUrl: string, durationMinutes: string) => void;
  loading: boolean;
}

export default function UploadSection({ onSubmit, loading }: Props) {
  const [tab, setTab] = useState<'url' | 'file'>('url');
  const [url, setUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [duration, setDuration] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const videoUrl = tab === 'url' ? url : fileName;
    const title = tab === 'url'
      ? (url.includes('youtube.com') || url.includes('youtu.be') ? 'YouTube Video' : 'Uploaded Video')
      : fileName;
    onSubmit(title, videoUrl || 'demo-video', duration || '60');
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
      <div className="flex gap-1 mb-6 bg-gray-800 rounded-xl p-1">
        {(['url', 'file'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t === 'url' ? <Link size={14} /> : <Upload size={14} />}
            {t === 'url' ? 'Paste URL' : 'Upload File'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {tab === 'url' ? (
          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-medium">YouTube / Video URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-xl p-8 text-center cursor-pointer transition-colors group"
          >
            <Upload size={28} className="mx-auto text-gray-600 group-hover:text-blue-400 mb-2 transition-colors" />
            {fileName ? (
              <p className="text-sm text-blue-400 font-medium">{fileName}</p>
            ) : (
              <>
                <p className="text-sm text-gray-400">Click to upload your video</p>
                <p className="text-xs text-gray-600 mt-1">MP4, MOV, AVI supported</p>
              </>
            )}
            <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleFile} />
          </div>
        )}

        <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-medium flex items-center gap-1">
            <Clock size={12} />
            Video Duration (e.g. 60 or 1:30:00)
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="60 minutes"
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            <>
              <Play size={16} />
              Generate Clips
            </>
          )}
        </button>
      </form>
    </div>
  );
}
