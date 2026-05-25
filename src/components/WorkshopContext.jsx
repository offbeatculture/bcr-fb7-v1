import { createContext, useContext } from 'react';
import { useWorkshopSchedule } from '../hooks/useWorkshopSchedule.js';
import { WORKSHOP } from '../data/content.js';

const WorkshopContext = createContext({
  date: WORKSHOP.date,
  day: WORKSHOP.day,
  time: WORKSHOP.time,
  startsAtISO: WORKSHOP.startsAtISO,
  loaded: false,
});

export function WorkshopProvider({ children }) {
  const schedule = useWorkshopSchedule();
  return <WorkshopContext.Provider value={schedule}>{children}</WorkshopContext.Provider>;
}

export function useWorkshop() {
  return useContext(WorkshopContext);
}
