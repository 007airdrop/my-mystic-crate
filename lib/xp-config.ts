/** Fixed XP per check-in streak day (matches on-chain contract). */
export const CHECK_IN_XP_BY_DAY = [5, 7, 10, 12, 15, 20, 30] as const;

export function checkInXpForDay(day: number): number {
  if (day < 1 || day > 7) return CHECK_IN_XP_BY_DAY[0];
  return CHECK_IN_XP_BY_DAY[day - 1];
}

/** Spin wheel segment labels (visual); on-chain awards 15–30 XP. */
export const SPIN_WHEEL_SEGMENTS = [
  { label: '10', color: '#7c3aed' },
  { label: '15', color: '#db2777' },
  { label: '18', color: '#2563eb' },
  { label: '20', color: '#059669' },
  { label: '22', color: '#d97706' },
  { label: '25', color: '#dc2626' },
  { label: '28', color: '#9333ea' },
  { label: '30', color: '#4f46e5' },
] as const;
