import API from '../../../utils/API/api';
import moment from 'moment';

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';
let demoEvents = DEMO ? generateDemoEvents() : [];

function generateDemoEvents() {
  const themes = ['BLUE', 'GREEN', 'PURPLE', 'ORANGE', 'PINK'];

  const events = [];
  const today = moment();

  for (let i = 0; i < 10; i++) {
    const randomOffset = Math.floor(Math.random() * 60) - 30;
    const start = today.clone().add(randomOffset, 'days');

    const duration = Math.floor(Math.random() * 3) + 1;
    const end = start.clone().add(duration, 'days');

    events.push({
      _id: `demo-event-${i + 1}`,
      title: [
        'Team Meeting',
        'Design Review',
        'Client Demo',
        'Sprint Planning',
        'Marketing Sync',
        'QA Testing',
        'Roadmap Review',
        'Company All Hands',
        'Bug Triage',
        'Deployment Window',
      ][i],

      startTime: start.toISOString(),
      endTime: end.toISOString(),
      theme: themes[i % themes.length],
    });
  }

  return events;
}

export const fetchEventsAPI = async () => {
  if (DEMO) {
    return generateDemoEvents();
  }

  const res = await API.get('/events');
  return res.data;
};

export const createEventAPI = async (event) => {
  if (DEMO) {
    const newEvent = {
      ...event,
      _id: crypto.randomUUID(),
    };
    demoEvents.push(newEvent);
    return newEvent;
  }

  const res = await API.post('/events', event);
  return res.data;
};
