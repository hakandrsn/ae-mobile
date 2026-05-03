// src/components/map/MapView.tsx
import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import { ActivityIndicator, Linking, Platform, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT, type Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { useJobs } from '@/services/jobs';
import { Button, Icon, IconButton, Surface, Typography } from '@/components/ui';
import type { AppBottomSheetModalRef } from '@/components/ui/sheet/app-bottom-sheet-modal';
import { spacing } from '@/theme/tokens';

import { getJobLatLng } from './job-coordinates';
import { JobMapDetailSheet } from './job-map-detail-sheet';
import { JobMapPin, mapMarkerAnchor, mapMarkerIosCenterOffset } from './job-map-pin';
import type { MapViewComponentProps } from './map.types';

const DEFAULT_FALLBACK = {
  latitude: 41.0082,
  longitude: 28.9784,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

const MIN_ZOOM_DELTA = 0.002;
const MAX_ZOOM_DELTA = 80;

export function MapViewComponent({
  jobsQueryParams,
  fallbackRegion = DEFAULT_FALLBACK,
}: MapViewComponentProps) {
  const mapRef = useRef<React.ElementRef<typeof MapView>>(null);
  const jobDetailSheetRef = useRef<AppBottomSheetModalRef>(null);
  const regionRef = useRef<Region>(fallbackRegion);
  const insets = useSafeAreaInsets();

  const { data: jobsResponse } = useJobs({
    limit: 100,
    ...jobsQueryParams,
  });

  const jobsWithCoords = useMemo(() => {
    return (jobsResponse?.data ?? []).filter((job) => {
      const coords = getJobLatLng(job);
      if (!coords) return false;
      if (coords.latitude === 0 && coords.longitude === 0) return false;
      return true;
    });
  }, [jobsResponse]);

  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(
    null,
  );
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'denied'>('idle');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const requestLocationPermission = useCallback(async () => {
    setStatus('loading');
    const { status: permission } = await Location.requestForegroundPermissionsAsync();

    if (permission !== 'granted') {
      setStatus('denied');
      setUserCoords(null);
      mapRef.current?.animateToRegion(fallbackRegion, 1000);
      return;
    }

    try {
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };

      setUserCoords(coords);
      setStatus('ready');

      mapRef.current?.animateToRegion(
        {
          ...coords,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        },
        1000,
      );
    } catch (error) {
      console.warn('Konum alınamadı:', error);
      setStatus('denied');
      mapRef.current?.animateToRegion(fallbackRegion, 1000);
    }
  }, [fallbackRegion]);

  useEffect(() => {
    void requestLocationPermission();
  }, [requestLocationPermission]);

  const fitToMarkers = useCallback(() => {
    if (!mapRef.current || jobsWithCoords.length === 0) return;

    const jobPoints = jobsWithCoords.map((j) => getJobLatLng(j)!);
    const points = [...jobPoints];

    if (userCoords) {
      points.push(userCoords);
    }

    mapRef.current.fitToCoordinates(points, {
      edgePadding: { top: 80, right: 48, bottom: 80, left: 48 },
      animated: true,
    });
  }, [jobsWithCoords, userCoords]);

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openSettings();
    } else {
      IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS);
    }
  };

  const clampDelta = useCallback((value: number) => {
    return Math.min(MAX_ZOOM_DELTA, Math.max(MIN_ZOOM_DELTA, value));
  }, []);

  const handleZoomIn = useCallback(() => {
    const r = regionRef.current;
    const factor = 0.55;
    const next: Region = {
      ...r,
      latitudeDelta: clampDelta(r.latitudeDelta * factor),
      longitudeDelta: clampDelta(r.longitudeDelta * factor),
    };
    mapRef.current?.animateToRegion(next, 220);
  }, [clampDelta]);

  const handleZoomOut = useCallback(() => {
    const r = regionRef.current;
    const factor = 1.75;
    const next: Region = {
      ...r,
      latitudeDelta: clampDelta(r.latitudeDelta * factor),
      longitudeDelta: clampDelta(r.longitudeDelta * factor),
    };
    mapRef.current?.animateToRegion(next, 220);
  }, [clampDelta]);

  const handleJobMarkerPress = useCallback(
    (jobId: string) => {
      const sheet = jobDetailSheetRef.current;
      if (!sheet) return;

      const sheetAlreadyVisible = selectedJobId !== null;

      setSelectedJobId(jobId);

      queueMicrotask(() => {
        if (!sheetAlreadyVisible) {
          sheet.present();
        }
        sheet.snapToIndex(0);
      });
    },
    [selectedJobId],
  );

  const handleJobDetailSheetDismiss = useCallback(() => {
    setSelectedJobId(null);
  }, []);

  const handleFocusMyLocation = useCallback(async () => {
    if (status === 'ready' && userCoords) {
      mapRef.current?.animateToRegion(
        {
          ...userCoords,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        },
        350,
      );
      return;
    }
    await requestLocationPermission();
  }, [status, userCoords, requestLocationPermission]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={fallbackRegion}
        onRegionChangeComplete={(r) => {
          regionRef.current = r;
        }}
        onMapReady={() => {
          if (jobsWithCoords.length > 0 && status !== 'loading') fitToMarkers();
        }}
        showsUserLocation={status === 'ready' && userCoords !== null}
        showsMyLocationButton={false}
        provider={PROVIDER_DEFAULT}>
        {jobsWithCoords.map((job) => {
          const coord = getJobLatLng(job)!;
          return (
            <Marker
              key={job.id}
              coordinate={coord}
              identifier={job.id}
              anchor={mapMarkerAnchor}
              {...(Platform.OS === 'ios' ? { centerOffset: mapMarkerIosCenterOffset } : {})}
              tracksViewChanges={false}
              onPress={() => handleJobMarkerPress(job.id)}>
              <JobMapPin category={job.jobCategory} />
            </Marker>
          );
        })}
      </MapView>

      <View
        style={[
          styles.mapControlsZoom,
          { top: insets.top + spacing.md, right: insets.right + spacing.md },
        ]}
        pointerEvents="box-none">
        <IconButton
          accessibilityLabel="Haritayı yakınlaştır"
          variant="surface"
          size="sm"
          icon={({ color, size: iconSize }) => <Icon name="plus" color={color} size={iconSize} />}
          onPress={handleZoomIn}
        />
        <IconButton
          accessibilityLabel="Haritayı uzaklaştır"
          variant="surface"
          size="sm"
          icon={({ color, size: iconSize }) => <Icon name="minus" color={color} size={iconSize} />}
          onPress={handleZoomOut}
        />
      </View>

      <View
        style={[
          styles.mapControlsLocate,
          { bottom: insets.bottom + spacing.md + 40, right: insets.right + spacing.md },
        ]}
        pointerEvents="box-none">
        <IconButton
          accessibilityLabel="Konumuma git"
          variant="surface"
          size="sm"
          icon={({ color, size: iconSize }) => (
            <Icon name="find-geo" color={color} size={iconSize} />
          )}
          onPress={handleFocusMyLocation}
        />
      </View>

      {status === 'loading' && (
        <View style={styles.overlay} pointerEvents="none">
          <ActivityIndicator size="large" />
        </View>
      )}

      <JobMapDetailSheet
        jobId={selectedJobId}
        sheetRef={jobDetailSheetRef}
        onDismiss={handleJobDetailSheetDismiss}
      />

      {status === 'denied' && (
        <Surface style={styles.deniedWarning}>
          <View style={styles.deniedTextContainer}>
            <Typography variant="label" color="danger">
              Konum İzni Gerekli
            </Typography>
            <Typography variant="caption" color="muted">
              Size yakın ilanları ve konumunuzu görebilmek için ayarlardan izin vermelisiniz.
            </Typography>
          </View>
          <Button label="Ayarlar" size="sm" variant="surface" onPress={handleOpenSettings} />
        </Surface>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  deniedWarning: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    right: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    zIndex: 10,
    elevation: 4,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  deniedTextContainer: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  mapControlsZoom: {
    position: 'absolute',
    zIndex: 5,
    gap: theme.spacing.xs,
    alignItems: 'center',
  },
  mapControlsLocate: {
    position: 'absolute',
    zIndex: 5,
    alignItems: 'center',
  },
}));
