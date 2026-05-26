export const WORKSHOP = {
  date: '25 May 2026',
  day: 'Monday',
  time: '6:30 PM to 9:30 PM',
  priceNow: 99,
  priceWas: 999,
  currency: '₹',
  seatsTotal: 200,
  seatsLeft: 47,
  startsAtISO: '2026-05-25T18:30:00+05:30',
};

// Google Sheet (BCR - Date Change tab). A2 = Date, B2 = "Day | start to end" e.g. "Monday | 6:30 PM to 9:30 PM"
export const SCHEDULE_SHEET = {
  id: '1bWMWzwQnuIwJqVYwRcKZQI10OOUe6TAK4bAf4Br3meE',
  gid: '138894925',
};

export const SOURCE = 'fb7';

export const LEADS_WEBHOOK_URL =
  'https://offbeatn8n.coachswastik.com/webhook/bcr-fb7-leads';
export const LEADS_WEBHOOK_TEST_URL =
  'https://offbeatn8n.coachswastik.com/webhook-test/bcr-fb7-leads';

export const RAZORPAY_PAGE_URL = 'https://pages.razorpay.com/bcr-fb7';

export const THANK_YOU_BUTTON_URL = 'http://join.valarmathisrinivasan.in/fb-wap';

export const PAIN_POINTS = [
  {
    n: '01',
    title: 'You start the day already heavy.',
    body: 'Your back is stiff. Your shoulders are tight. Your body feels heavy - and you haven’t even started your day.',
  },
  {
    n: '02',
    title: 'Sleep stopped recovering you.',
    body: 'You slept last night. You’re still tired this morning.',
  },
  {
    n: '03',
    title: 'Your gut is on edge - constantly.',
    body: 'The bloating, the acidity, the unsettled stomach - it’s almost a constant in your life.',
  },
  {
    n: '04',
    title: 'The mind won’t switch off.',
    body: 'Not at night. Not on weekends. Not even on a holiday.',
  },
  {
    n: '05',
    title: 'Nothing has stuck.',
    body: 'You’ve tried everything - doctors, tablets, supplements, exercises. The same problems keep coming back.',
  },
  {
    n: '06',
    title: 'You quietly know it isn’t “just stress”.',
    body: 'You’ve told yourself this is your 30s, your 40s, just life. But somewhere you know it isn’t.',
  },
];

export const STATS = [
  { value: 92, suffix: '%', label: 'feel a physical shift inside the session itself' },
  { value: 8, suffix: '/10', label: 'reported sleeping better the night after' },
  { value: 10000, suffix: '+', label: 'people reset their body with Dr. Valarrmathi' },
];

export const BEFORE_AFTER = [
  { before: 'Waking up stiff before the day has even started', after: 'Waking up and actually feeling light' },
  { before: 'Bloated, acidic, unsettled stomach - almost a constant', after: 'Stomach settled. No heaviness. No burning.' },
  { before: 'Eight hours of sleep and still exhausted', after: 'Sleep that actually recovers you - feels like rest' },
  { before: 'Body feels tight and heavy for no reason you can explain', after: 'Body loose and flexible. Like it finally let go.' },
  { before: 'A mind that won’t stop - not even on a holiday', after: 'A mind that’s calm and focused.' },
];

export const COMPONENTS = [
  {
    n: '01',
    tag: 'Diagnose',
    title: 'The Body Signal Diagnosis',
    promise: 'Stop treating four problems. Start working on one source.',
    body: 'A guided body scan - zone by zone - so you can feel exactly where your body is holding the tension. Not guess. Feel.',
  },
  {
    n: '02',
    tag: 'Release',
    title: 'The 3-Zone Unlock',
    promise: '92% feel a physical shift inside the session itself.',
    body: 'A body-based protocol - zone by zone - that physically shifts what your body has been holding for months. Sometimes years.',
  },
  {
    n: '03',
    tag: 'Anchor',
    title: 'The Safety Switch Protocol',
    promise: 'A signal your nervous system has been waiting years to hear.',
    body: 'A specific breath pattern that tells your body it is safe. Use it every day. Use it anywhere. The release is not just for one night.',
  },
];

export const ZONES = [
  {
    id: 'zone-1',
    label: 'Zone 1 · Survival',
    region: 'Lower body - hips, pelvis, lower back',
    color: '#C7995A',
  },
  {
    id: 'zone-2',
    label: 'Zone 2 · Digestion',
    region: 'Stomach, gut, diaphragm',
    color: '#C94B6D',
  },
  {
    id: 'zone-3',
    label: 'Zone 3 · Emotion',
    region: 'Chest, throat, jaw',
    color: '#0E5448',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'I feel more calmer and more energetic. I always used to think how to connect breath and nervous system and muscles. Now my mind is more relaxed. Pains started going away from my body.',
    name: 'Shivaranjan',
    meta: '35 · Bangalore',
  },
  {
    quote:
      'I can’t remember the last time I slept without waking up. The night after the masterclass - I didn’t wake up once. Not even once.',
    name: 'Arati Prasad',
    meta: '65 · Navi Mumbai',
  },
  {
    quote:
      'My shoulder and upper back were so tight. Now feeling free and happy.',
    name: 'P. Radhika',
    meta: '49',
  },
  {
    quote:
      'For the first time I was able to understand and identify my anxiety very clearly.',
    name: 'Vinkal Ghodasra',
    meta: '33',
  },
  {
    quote:
      'So relaxed and light after the first session. For a change I am not going to bed bloated tonight!',
    name: 'Ananya',
    meta: '40',
  },
  {
    quote:
      'My gut problem has completely cured. I was suffering from acidity for 20 years and emotionally disturbed. Now I am very calm and learnt to handle every situation peacefully.',
    name: 'Vijayaprabha',
    meta: '57',
  },
  {
    quote:
      'Today was magical. It was like I was just letting go of whatever is holding me back. Not in anger - just in terms of releasing it.',
    name: 'Naimesh',
    meta: '43',
  },
];

export const FAQS = [
  {
    q: 'Will I actually feel something in the session itself?',
    a: 'Most people do. 8 in 10 attendees report a physical shift inside the session - a lighter chest, a softer stomach, a quieter mind.',
  },
  {
    q: 'I’ve tried breathwork and meditation before. Nothing happened.',
    a: 'Most breathwork focuses on relaxing the mind. The Breath Chakra Reset works directly on the zone in your body where the tension is physically stored. It is not about calming your mind. It is about giving your body the one signal it hasn’t received in years.',
  },
  {
    q: 'Will one session fix everything completely?',
    a: 'One session is a reset - a real, felt shift most people haven’t experienced before. The body has been holding this for years. One session opens the door; the deeper, lasting change comes with continued practice.',
  },
  {
    q: 'It’s ₹99. What’s the catch?',
    a: 'No catch. The price keeps it accessible - and keeps the room serious. People who pay show up. The session stands completely on its own value.',
  },
  {
    q: 'I don’t have a serious health issue. I just feel tired and stressed. Is this for me?',
    a: 'You don’t need a diagnosis to know something isn’t right. If your body hasn’t felt like yours in a while, this is for you.',
  },
];

export const PROFESSIONS = [
  'Working Professional',
  'Business Owner / Entrepreneur',
  'Student',
  'Freelancer',
  'Other',
];

export const REASONS = [
  'Stress and overthinking',
  'Digestive discomfort',
  'Body stiffness',
  'Low energy',
];
