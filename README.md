# ae-mobil

Expo tabanli tekrar kullanilabilir mobil uygulama altyapisi.

## Hedef

Bu repo bir demo ekranindan cok, farkli projelerde yeniden kullanabilecegimiz saglam bir temel olusturmak icin kuruldu.

Odak noktalarimiz:

- Katmanli ve anlasilir mimari
- Theme token tabanli UI sistemi
- Shared component kutuphanesi
- Expo Router ile net navigasyon yapisi
- i18n temelli dil kurgusu
- API katmani icin `axios` + `@tanstack/react-query`
- Global state icin `zustand`
- Feature-first genisleyebilen klasor yapisi

## Mimari V1

```text
app/                  Expo Router route dosyalari
src/
  components/         Ortak UI primitive ve composite componentler
  core/               Provider, config, constants, bootstrap
  features/           Feature bazli ekran ve moduller
  i18n/               Dil altyapisi ve translation kaynaklari
  services/           API istemcisi ve remote data yardimcilari
  store/              Global store kurallari ve store'lar
  theme/              Tokens, theme contract, helper'lar
```

## Simdiki Durum

Ilk adim olarak temel iskelet ve ilk entegrasyonlar kuruldu:

- `src` tabanli dizin yapisi
- Theme token sistemi
- Shared `AppScreen`, `AppText`, `AppButton`, `SurfaceCard` componentleri
- `i18next` tabanli locale-aware i18n yapisi
- `react-query` provider katmani
- `axios` tabanli API istemcisi
- `zustand` tabanli global app store

## Sonraki Paketler

Kurulan cekirdek paketler:

- `@tanstack/react-query`
- `axios`
- `zustand`
- `i18next`
- `react-i18next`
- `expo-localization`

Ikinci asama adaylari:

- `zod`
- `react-hook-form`

## Komutlar

```bash
npm run start
npm run ios
npm run android
npm run web
```
# expo-template
