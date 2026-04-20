# Expo Router Foundation

Bu projede kullandigimiz route sistemi su mantiga dayanir:

## Gruplar

- `(public)`: giris gerektirmeyen ekranlar
- `(auth)`: sadece guest kullaniciya acik auth ekranlari
- `(app)`: sadece authenticated kullaniciya acik ana uygulama
- `modal.tsx`: navigation history'nin parcasi olan global modal route

## Protected Routes

Root `app/_layout.tsx` icinde `Stack.Protected` kullanilir.

- Guest ise `(public)` ve `(auth)` acik
- Authenticated ise `(app)` acik

Expo Router SDK 53+ icin resmi ve guncel pattern budur.

## Tabs

`(app)/(tabs)` altinda ana navigasyon sekmeleri tutulur.

- Kalici sekmeler: `home`, `search`, `profile`
- Route var ama sekme butonu yok: `href: null`

## Tab Bar Gizleme

Bir ekranda tab bar'i gizlemek icin o ekrani tabs grubunun disina, ama ayni app stack altina koyuyoruz.

Ornek:

- `app/(app)/(tabs)/home.tsx`
- `app/(app)/details/[id].tsx`

Bu pattern, `tabBarStyle: { display: "none" }` gibi kirilgan cozumlerden daha dogrudur.

## Modals

Iki farkli modal tipi var:

- Navigation history'de yeri olacaksa: Expo Router modal route
- Lokal popup/confirm ise: React Native `Modal`

## Sonraki Genisleme

- Gercek session persistence icin `expo-secure-store`
- Role bazli access icin nested `Stack.Protected`
- Feature flag tablari icin `Tabs.Protected`
- Deep-link map ve route helper'larinin buyutulmesi
