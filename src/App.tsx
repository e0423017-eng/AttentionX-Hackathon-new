import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ProcessingView, { PROCESSING_STEPS_COUNT } from './components/ProcessingView';
import ResultsView from './components/ResultsView';
import RecentJobs from './components/RecentJobs';
import { supabase, VideoJob } from './lib/supabase';
import { generateMockClips, parseDuration } from './lib/mockProcessor';

type AppState = 'idle' | 'processing' | 'done';

export default function App() {
  const [state, setState] = useState<AppState>('idle');
  const [processingStep, setProcessingStep] = useState(0);
  const [currentJob, setCurrentJob] = useState<VideoJob | null>(null);
  const [recentJobs, setRecentJobs] = useState<VideoJob[]>([]);

  useEffect(() => {
    loadRecentJobs();
  }, []);

  async function loadRecentJobs() {
    const { data } = await supabase
      .from('video_jobs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setRecentJobs(data as VideoJob[]);
  }

  async function handleSubmit(title: string, videoUrl: string, durationInput: string) {
    setState('processing');
    setProcessingStep(0);

    const rawSeconds = parseDuration(durationInput);
    const durationSeconds = rawSeconds < 600 ? rawSeconds * 60 : rawSeconds;
    const clips = generateMockClips(durationSeconds);

    const { data: job } = await supabase
      .from('video_jobs')
      .insert({
        title,
        video_url: videoUrl,
        status: 'processing',
        duration_seconds: durationSeconds,
        clips_count: clips.length,
        clips,
      })
      .select()
      .maybeSingle();

    for (let i = 0; i <= PROCESSING_STEPS_COUNT; i++) {
      await new Promise((r) => setTimeout(r, 900));
      setProcessingStep(i);
    }

    if (job) {
      await supabase
        .from('video_jobs')
        .update({ status: 'completed' })
        .eq('id', job.id);

      const finalJob: VideoJob = { ...job, status: 'completed', clips };
      setCurrentJob(finalJob);
    }

    setState('done');
    loadRecentJobs();
  }

  function handleReset() {
    setState('idle');
    setCurrentJob(null);
    setProcessingStep(0);
  }

  function handleSelectJob(job: VideoJob) {
    setCurrentJob(job);
    setState('done');
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Hero />

        {state === 'idle' && (
          <>
            <UploadSection onSubmit={handleSubmit} loading={false} />
            <RecentJobs jobs={recentJobs} onSelect={handleSelectJob} />
          </>
        )}

        {state === 'processing' && (
          <>
            <UploadSection onSubmit={handleSubmit} loading={true} />
            <ProcessingView currentStep={processingStep} />
          </>
        )}

        {state === 'done' && currentJob && (
          <ResultsView job={currentJob} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
