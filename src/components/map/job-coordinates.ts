import type { Job } from '@/services/jobs/types';

export function getJobLatLng(job: Job): { latitude: number; longitude: number } | null {
  if (Number.isFinite(job.latitude) && Number.isFinite(job.longitude)) {
    return { latitude: job.latitude!, longitude: job.longitude! };
  }
  const loc = job.location;
  if (loc && Number.isFinite(loc.lat) && Number.isFinite(loc.lng)) {
    return { latitude: loc.lat, longitude: loc.lng };
  }
  return null;
}
