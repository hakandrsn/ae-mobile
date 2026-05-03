import type { GetJobsParams } from '@/services/jobs/types';

export type MapViewComponentProps = {
  /** `/jobs` listesi için ek sorgu parametreleri (ör. kategori, radius). */
  jobsQueryParams?: Omit<GetJobsParams, 'limit' | 'page'>;
  /** Konum alınamazsa gösterilecek başlangıç bölgesi (ör. şehir merkezi). */
  fallbackRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};
