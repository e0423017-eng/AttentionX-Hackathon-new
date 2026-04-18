import { CheckCircle, Loader, Circle } from 'lucide-react';

const STEPS = [
  { id: 'transcribe', label: 'Transcribing Audio', desc: 'Whisper AI converting speech to timestamped text' },
  { id: 'peaks', label: 'Detecting Emotional Peaks', desc: 'Analyzing audio energy & sentiment spikes' },
  { id: 'crop', label: 'Smart Vertical Cropping', desc: 'Face tracking to keep speaker centered (9:16)' },
  { id: 'captions', label: 'Generating Captions & Hooks', desc: 'Creating scroll-stopping text overlays' },
  { id: 'export', label: 'Packaging Clips', desc: 'Exporting ready-to-post vertical shorts' },
];

interface Props {
  currentStep: number;
}

export default function ProcessingView({ currentStep }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
      <h2 className="text-white font-bold text-lg mb-5">Processing Your Video...</h2>
      <div className="space-y-4">
        {STEPS.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={step.id} className={`flex items-start gap-3 transition-opacity ${i > currentStep ? 'opacity-30' : 'opacity-100'}`}>
              <div className="mt-0.5">
                {done ? (
                  <CheckCircle size={20} className="text-green-400" />
                ) : active ? (
                  <Loader size={20} className="text-blue-400 animate-spin" />
                ) : (
                  <Circle size={20} className="text-gray-600" />
                )}
              </div>
              <div>
                <p className={`text-sm font-semibold ${done ? 'text-green-400' : active ? 'text-blue-300' : 'text-gray-500'}`}>
                  {step.label}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
          style={{ width: `${Math.min(((currentStep) / STEPS.length) * 100, 100)}%` }}
        />
      </div>
      <p className="text-xs text-gray-600 mt-2 text-right">
        {Math.round(Math.min(((currentStep) / STEPS.length) * 100, 100))}% complete
      </p>
    </div>
  );
}

export const PROCESSING_STEPS_COUNT = STEPS.length;
