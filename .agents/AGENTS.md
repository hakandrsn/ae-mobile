# ae-mobil Agent Guide

Bu dosya, bu repo icinde calisan agent'lar icin proje mimarisi ve kullanim kurallarini anlatir.

Amaç:

- Yeni gelen agent'larin mevcut foundation'i hizli anlamasi
- Tekrarlanan mimari kararlarin bozulmamasi
- Yeni kodun mevcut pattern'lerle uyumlu yazilmasi

## 1. Genel Mimari

Bu proje Expo + Expo Router + NativeWind + Zustand + React Query + Axios + i18next tabanli bir mobil app foundation'idir.

Ana klasor mantigi:

- `app/`: Expo Router route dosyalari ve layout'lar
- `src/components/`: shared UI primitive ve component'ler
- `src/core/`: provider, navigation, app-level altyapi
- `src/features/`: feature bazli ekranlar, auth, app flow
- `src/i18n/`: locale, translation, direction kurallari
- `src/services/`: API client, query client, remote data yardimcilari
- `src/store/`: global app store
- `src/theme/`: token, theme, css variable uretimi
- `docs/`: insana donuk mimari notlari

Kritik ilke:

- Route mantigi `app/` altinda
- Asil ekran/component implementasyonu `src/features/` ve `src/components/` altinda
- `app/` dosyalari ince route adapter olarak kalmali

## 2. Theme Sistemi

Theme altyapisi:

- `src/theme/tokens.ts`
- `src/theme/variables.ts`
- `src/core/providers/theme-provider.tsx`
- `src/core/providers/theme-scope.tsx`
- `tailwind.config.js`

Calisma mantigi:

1. Theme contract `lightTheme` ve `darkTheme` olarak `tokens.ts` icinde tanimlidir.
2. `createThemeVariables()` semantic renkleri CSS variable'a cevirir.
3. `ThemeScope` root seviyede bu variable'lari uygular.
4. NativeWind semantic renkleri `tailwind.config.js` icinde `var(--color-...)` uzerinden tuketir.

Kurallar:

- Theme renklerini component icinde `style={{ color: ... }}` ile enjekte etme.
- Ilk tercih her zaman semantic `className` kullanmak.
- Yeni semantic renk eklenirse:
  - `src/theme/tokens.ts`
  - `src/theme/variables.ts`
  - `tailwind.config.js`
  bu uc yerde birlikte guncellenmeli.

## 3. Styling ve NativeWind

Styling altyapisi:

- `nativewind`
- `tailwind.config.js`
- `global.css`
- `babel.config.js`
- `metro.config.js`

Shared component styling mantigi:

- Varsayilan stil `className` ile verilir.
- Shared component icinde semantic variant/tone API olabilir.
- `style` sadece zorunlu native edge-case durumlarinda kullanilmali.

Kurallar:

- Yeni UI component yazarken ilk tercih `className`.
- Ortak component'lerde `variant`, `tone`, `color` gibi semantic prop'lar tercih edilir.
- Inline style kullanimi minimumda tutulur.
- Root theme semantic class'lar uzerinden akar.

Ornekler:

- `src/components/ui/app-text.tsx`
- `src/components/ui/app-button.tsx`
- `src/components/ui/surface-card.tsx`
- `src/components/ui/app-screen.tsx`

## 4. Shared Component Sistemi

Mevcut primitive'ler:

- `AppScreen`
- `AppText`
- `AppButton`
- `SurfaceCard`

Dosya:

- `src/components/ui/index.ts`

Kurallar:

- Ekranlar dogrudan ham `Text`/`View` yerine mümkün oldugunca shared primitive kullanmali.
- Typography ihtiyaclari icin once `AppText` genisletilmeli.
- Button varyasyonlari icin once `AppButton` genisletilmeli.
- Layout ve page padding ihtiyaci icin once `AppScreen` kullanilmali.

RTL notu:

- `AppText` locale direction farkindaligina sahiptir.
- Yeni shared component yazarken RTL dusunulmeli.
- `start/end`, `text-left/text-right`, `flex-row` gibi kararlar locale yonu ile uyumlu tasarlanmalı.

## 5. i18n ve Dil Sistemi

Ana dosyalar:

- `src/i18n/index.ts`
- `src/i18n/locale.ts`
- `src/i18n/translations/index.ts`
- `src/i18n/translations/en.ts`
- `src/i18n/translations/tr.ts`
- `src/i18n/translations/ar.ts`

Desteklenen diller:

- `en`
- `tr`
- `ar`

Direction mantigi:

- Locale metadata `src/i18n/locale.ts` icinde tutulur.
- `ar` RTL kabul edilir.
- `useLocaleSettings()` locale, `direction`, `isRTL` dondurur.

Kurallar:

- Yeni dil eklenecekse:
  - translation dosyasi ekle
  - `translations/index.ts` export et
  - `locale.ts` icinde supported locale listesine ekle
  - `app.json` icinde supported locales listesine ekle
- i18n key'leri feature/alan mantigiyla gruplanmali.
- Hard-coded text yerine `t(...)` tercih edilmeli.

RTL notu:

- Expo docs'a gore `extra.supportsRTL: true` ve `expo-localization` plugin ayarlari native seviyede etkilidir.
- Uygulama ici direction davranisi component seviyesinde de desteklenir.

## 6. Router ve Navigation Sistemi

Ana dosyalar:

- `app/_layout.tsx`
- `app/(public)/...`
- `app/(auth)/...`
- `app/(app)/...`
- `app/(app)/(tabs)/_layout.tsx`
- `src/core/navigation/paths.ts`
- `docs/expo-router.md`

Route group mantigi:

- `(public)`: login gerektirmeyen ekranlar
- `(auth)`: auth flow ekranlari
- `(app)`: authenticated alan
- `(app)/(tabs)`: ana tab navigator
- `app/modal.tsx`: global modal route

Auth korumasi:

- Root `Stack.Protected` kullanilir
- Guest icin public/auth
- Authenticated user icin app grubu

Tab bar kurallari:

- Kalici sekmeler `(tabs)` altindadir
- Route var ama sekme butonu gosterilmeyecekse `href: null`
- Tab bar gizlenecek tam ekran akislari tabs grubunun disinda, ayni stack altinda sibling route olarak acilir

Ornek:

- `app/(app)/(tabs)/home.tsx`
- `app/(app)/details/[id].tsx`

Modal kurali:

- Navigation history'nin parcasi olacaksa Expo Router modal route
- Basit local popup ise React Native `Modal`

## 7. Animated Tab Bar

Ana dosyalar:

- `src/core/navigation/animated-tab-bar.tsx`
- `src/core/navigation/tab-bar-visibility-context.tsx`
- `src/components/ui/app-screen.tsx`

Calisma mantigi:

- Tabs custom animated tab bar render eder
- `AppScreen` scroll davranisi ile tab bar'i hide/show eder
- Tabs disindaki ekranlarda bu davranis aktif degildir

Lock mantigi:

- `AppScreen` icinde `tabBarScrollBehavior="locked"` kullanilabilir
- Bu durumda scroll ile tab bar gizlenmez

Kural:

- Scroll davranisi gereken tab ekranlarinda `AppScreen` kullan
- Tab bar'in sabit kalmasi gereken ekranlarda `tabBarScrollBehavior="locked"` kullan

## 8. Store Kurallari

Ana dosyalar:

- `src/store/app-store.ts`
- `src/features/auth/store/session-store.ts`

Store bolunumu:

- `app-store`: app-wide UI ve locale/theme/navigation state
- `session-store`: auth/session state

Kurallar:

- Zustand selector'lari mumkunse primitive dondurmeli
- Obje/array selector'lari gereksiz render ve loop riski olusturabilir
- Guvenli pattern:
  - `const theme = useAppStore((state) => state.themePreference)`
  - `const toggle = useAppStore((state) => state.toggleThemePreference)`
- Asagidaki gibi selector'lardan kacinin:
  - `useAppStore((state) => ({ theme: state.themePreference }))`

Server state kurali:

- Server state Zustand'da tutulmaz
- Server state React Query tarafinda tutulur

## 9. Services ve API Katmani

Ana dosyalar:

- `src/services/api/api-client.ts`
- `src/services/api/query-client.ts`
- `src/services/api/query-keys.ts`
- `src/services/api/normalize-api-error.ts`

Kurallar:

- Ekran icinden dogrudan `fetch` kullanma
- API cagrilari service/query katmanindan gecmeli
- Query key'ler merkezi tanimlanmali
- Axios error'lari normalize edilerek handle edilmeli

Gelecek pattern:

- Feature bazli query hook'lari `src/features/<feature>/api` ya da `hooks` altinda tutulabilir
- Ortak axios instance kullanilmali

## 10. Auth ve Session

Ana dosyalar:

- `src/features/auth/hooks/use-session.ts`
- `src/features/auth/store/session-store.ts`
- `src/features/auth/screens/sign-in-screen.tsx`

Su anki durum:

- Session mock/in-memory
- `bootstrap()` ilk durum kontrolu icin var

Gelecek plan:

- Gercek persistence icin `expo-secure-store`
- Token refresh / session restore
- Gerekirse role bazli nested protected routes

## 11. Route Helper Kullanimi

Dosya:

- `src/core/navigation/paths.ts`

Kurallar:

- Hard-coded route string yerine `paths` kullan
- Dynamic route'lar typed route uyumlu helper ile donmeli
- Router gecislerinde ilk tercih:
  - `router.push(paths.settings)`
  - `router.push(paths.details("42"))`

## 12. Kod Yazim Kurallari

Bu projede yeni agent'lar sunlari korumali:

- `app/` altinda logic buyutme, logic'i `src/` altinda tut
- Yeni sayfa = route adapter + feature screen ayrimi
- Shared component varsa onu genislet, benzer component'i kopyalama
- Theme ve color kullanimi semantic olmali
- Hard-coded text yazma, i18n kullan
- Zustand selector'da object return etme
- Tabs icinde full-screen secondary page gerekiyorsa tabs disi sibling stack kullan
- Scroll-hide gereken yerlerde `AppScreen` kullan

## 13. Yararlı Referanslar

Proje ici:

- `docs/expo-router.md`
- `docs/native-wind.md`

Harici resmi referanslar:

- Expo Router Authentication
- Expo Router Protected Routes
- Expo Router Tabs
- Expo Router Modals
- Expo Localization / RTL support

## 14. Agent Checklist

Bu repo'da degisiklik yapmadan once:

1. Degisiklik hangi katmanda?
   - route / feature / shared component / store / service / theme
2. Mevcut pattern var mi?
   - varsa onu genislet
3. Text i18n'e girmeli mi?
4. Renk semantic theme class olarak tanimlanmali mi?
5. Zustand selector primitive mi?
6. Route degisikligi `paths.ts` ile uyumlu mu?
7. RTL etkisi var mi?

Bu checklist yeni agent'in mevcut foundation'i bozmadan ilerlemesini saglar.
