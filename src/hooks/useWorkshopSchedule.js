import { useEffect, useState } from 'react';
import { WORKSHOP, SCHEDULE_SHEET } from '../data/content.js';

// Convert "6:30 PM" into 24h parts {h, m}
function parseTimePart(str) {
  if (!str) return null;
  const m = String(str).trim().match(/^(\d{1,2}):?(\d{2})?\s*(AM|PM)?$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const ampm = (m[3] || '').toUpperCase();
  if (ampm === 'PM' && h < 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return { h, m: min };
}

// "Date(2026,4,25)" → "25 May 2026", "Monday"
function parseGvizDate(raw, formatted) {
  if (formatted) {
    const d = new Date(formatted);
    if (!isNaN(d.getTime())) return d;
  }
  const m = /Date\((\d+),(\d+),(\d+)/.exec(raw || '');
  if (!m) return null;
  return new Date(parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatDate(d) {
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function buildIso(date, timeStr) {
  // timeStr like "Monday | 6:30 PM to 9:30 PM"
  const parts = String(timeStr || '').split('|');
  const range = (parts[1] || parts[0] || '').trim();
  const start = range.split(/to|–|-/i)[0]?.trim();
  const t = parseTimePart(start);
  if (!t) return WORKSHOP.startsAtISO;
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const da = String(date.getDate()).padStart(2, '0');
  const hh = String(t.h).padStart(2, '0');
  const mm = String(t.m).padStart(2, '0');
  return `${y}-${mo}-${da}T${hh}:${mm}:00+05:30`;
}

function extractTimeRange(timeStr) {
  // "Monday | 6:30 PM to 9:30 PM" → "6:30 PM to 9:30 PM"
  const parts = String(timeStr || '').split('|');
  return (parts[1] || parts[0] || '').trim();
}

export function useWorkshopSchedule() {
  const [schedule, setSchedule] = useState({
    date: WORKSHOP.date,
    day: WORKSHOP.day,
    time: WORKSHOP.time,
    startsAtISO: WORKSHOP.startsAtISO,
    loaded: false,
  });

  useEffect(() => {
    const url = `https://docs.google.com/spreadsheets/d/${SCHEDULE_SHEET.id}/gviz/tq?tqx=out:json&gid=${SCHEDULE_SHEET.gid}`;
    let cancelled = false;
    fetch(url)
      .then((r) => r.text())
      .then((text) => {
        // gviz wraps JSON in google.visualization.Query.setResponse(...);
        const match = text.match(/setResponse\(([\s\S]+)\);?\s*$/);
        if (!match) throw new Error('Unable to parse gviz response');
        const data = JSON.parse(match[1]);
        const row = data.table?.rows?.[0]?.c || [];
        const dateCell = row[0];
        const timeCell = row[1];
        const dateObj = parseGvizDate(dateCell?.v, dateCell?.f);
        const timeStr = timeCell?.v || timeCell?.f || '';
        if (!dateObj) return;

        const next = {
          date: formatDate(dateObj),
          day: DAYS[dateObj.getDay()],
          time: extractTimeRange(timeStr),
          startsAtISO: buildIso(dateObj, timeStr),
          loaded: true,
        };
        if (!cancelled) setSchedule(next);
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return schedule;
}
