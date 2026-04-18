import { Clip } from './supabase';

const EMOTIONS = ['Inspiring', 'High Energy', 'Profound', 'Motivational', 'Emotional'];
const HOOK_TEMPLATES = [
  'Nobody talks about this...',
  'This changed everything for me',
  'The truth about {topic}',
  'Stop doing this right now',
  'This one tip will transform you',
  "Here's what they don't teach you",
  'I wish I knew this earlier',
  'The real secret to success',
];

const TOPICS = ['success', 'learning', 'mindset', 'growth', 'leadership', 'focus', 'habits'];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMockClips(durationSeconds: number): Clip[] {
  const clipCount = randomBetween(3, 6);
  const clips: Clip[] = [];
  let cursor = randomBetween(30, 120);

  for (let i = 0; i < clipCount; i++) {
    const clipDuration = randomBetween(45, 75);
    const startTime = cursor;
    const endTime = Math.min(startTime + clipDuration, durationSeconds - 10);

    const topic = randomItem(TOPICS);
    const hookTemplate = randomItem(HOOK_TEMPLATES);

    clips.push({
      id: crypto.randomUUID(),
      title: `Clip ${i + 1} — ${randomItem(EMOTIONS)} Moment`,
      hook: hookTemplate.replace('{topic}', topic),
      startTime,
      endTime,
      engagementScore: randomBetween(72, 98),
      emotion: randomItem(EMOTIONS),
      caption: generateCaption(i),
    });

    cursor = endTime + randomBetween(60, 180);
    if (cursor >= durationSeconds - 60) break;
  }

  return clips;
}

function generateCaption(index: number): string {
  const captions = [
    'The moment you stop chasing perfection is when everything clicks.',
    'Real learning happens outside your comfort zone. Always.',
    "Don't wait for permission. Build it. Ship it. Learn from it.",
    "Your biggest competition is yesterday's version of you.",
    'Consistency beats talent every single time.',
    "The best investment you'll ever make is in yourself.",
  ];
  return captions[index % captions.length];
}

export function parseDuration(input: string): number {
  const match = input.match(/(\d+)/g);
  if (!match) return 3600;
  if (match.length === 1) return parseInt(match[0]) * 60;
  if (match.length === 2) return parseInt(match[0]) * 60 + parseInt(match[1]);
  return parseInt(match[0]) * 3600 + parseInt(match[1]) * 60 + parseInt(match[2]);
}

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
