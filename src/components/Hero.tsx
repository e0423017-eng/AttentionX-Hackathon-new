import { Zap, Scissors, Captions } from 'lucide-react';

export default function Hero() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
        <Zap size={12} />
        AttentionX — AI Hackathon
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
        Turn Hours of Video Into
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Viral 60-Second Clips
        </span>
      </h1>
      <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
        Paste a YouTube link or upload a video. Our AI finds the golden moments, crops to vertical, and adds captions — automatically.
      </p>
      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
        {[
          { icon: <Zap size={15} className="text-yellow-400" />, label: 'Emotional Peak Detection' },
          { icon: <Scissors size={15} className="text-cyan-400" />, label: 'Smart Vertical Crop' },
          { icon: <Captions size={15} className="text-green-400" />, label: 'Dynamic Captions' },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
