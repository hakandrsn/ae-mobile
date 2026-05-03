# ae-mobil Agent Guide

Bu dosya, bu repo icinde calisan agent'lar icin proje mimarisi ve kullanim kurallarini anlatir.

Amaç:

- Yeni gelen agent'larin mevcut foundation'i hizli anlamasi
- Tekrarlanan mimari kararlarin bozulmamasi
- Yeni kodun mevcut pattern'lerle uyumlu yazilmasi

## 1. Genel Mimari

Bu proje Expo + Expo Router + **react-native-unistyles 3.x** + Zustand + React Query + Axios + i18next tabanli bir mobil
app foundation'idir.

Ana klasor mantigi:

- `app/`: Expo Router route dosyalari ve layout'lar
- `src/components/`: shared UI primitive ve component'ler
- `src/core/`: provider, navigation, app-level altyapi
- `src/features/`: feature bazli ekranlar, auth, app flow
- `src/i18n/`: locale, translation, direction kurallari
- `src/services/`: API client, query client, remote data yardimcilari
- `src/store/`: global app store
- `src/theme/`: token'lar ve Unistyles yapilandirmasi
- `docs/`: insana donuk mimari notlari

Kritik ilke:

- Route mantigi `app/` altinda
- Asil ekran/component implementasyonu `src/features/` ve `src/components/` altinda
- `app/` dosyalari ince route adapter olarak kalmali

## 2. Theme Sistemi (Unistyles)

Theme altyapisi:

- `src/theme/tokens.ts` — `lightTheme` / `darkTheme`, `spacing`, `radius`, semantic renk contract
- `src/theme/unistyles.ts` — `StyleSheet.configure({ themes, settings })`; **uygulama girisinde** `@/theme/unistyles`
  import edilir (`app/_layout.tsx`)
- `babel.config.js` — `react-native-unistyles/plugin` (`root: "src"`)
- `src/core/providers/theme-provider.tsx` — React context ile `AppTheme` (tokens); tercih / mantik icin
- `src/core/providers/theme-scope.tsx` — `UnistylesRuntime.setTheme(theme.id)` + root arka plan

Calisma mantigi:

1. Design token'lar ve semantic tema `tokens.ts` icindedir.
2. Unistyles temalari `unistyles.ts` ile `light` / `dark` olarak kayitlidir.
3. `ThemeScope`, Zustand'daki tema tercihine gore runtime tema degistirir (`theme.id` = `"light"` | `"dark"`).

Kurallar:

- Renk/spacing icin **birebir hex hard-code** etmek yerine `StyleSheet.create((theme) => (...))` icinde
  `theme.colors.*`, `theme.spacing.*`, `theme.radius.*` kullan.
- **NativeWind, `className`, `tailwind.config.js` kullanma** — bu proje Unistyles 3 ile kurgulanmistir.
- Yeni semantic renk veya token eklenirse once `tokens.ts` (ve bagimli tema tipleri) guncellenmeli, sonra ilgili
  component stilleri.

## 3. Styling (react-native-unistyles)

Styling altyapisi:

- `react-native-unistyles`
- `StyleSheet` importu: `import { StyleSheet } from "react-native-unistyles"`
- `babel.config.js` icindeki Unistyles plugin

Shared component styling mantigi:

- Varsayilan stil `StyleSheet.create((theme) => ({ ... }))` ile theme bagimli objelerdir.
- Shared component'lerde `variant`, `tone`, `color` gibi **semantic prop** API'leri tercih edilir.
- `style` prop'u yalnizca disaridan override veya edge-case icin kullanilir; ana gorunum yine `styles.*` uzerinden
  gelir.

Kurallar:

- Yeni UI component yazarken ilk tercih **Unistyles `StyleSheet.create`**.
- `theme` disinda kalan tek seferlik degerler icin bile mumkunse token'lara yakin tut (constants veya theme extension).
- RTL ve layout icin `AppText` ve mevcut primitive'lerdeki ornekleri takip et.

Ornekler:

- `src/components/ui/app-text.tsx`
- `src/components/ui/app-button.tsx`
- `src/components/ui/surface-card.tsx`
- `src/components/ui/app-screen.tsx`

Insan dokumanı: `docs/unistyles.md`

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
- `start/end`, metin hizasi, `flex-row` gibi kararlar locale yonu ile uyumlu tasarlanmalı.

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
- `app/(onboarding)/...`
- `app/(app)/...`
- `app/(auth)/...`
- `app/(app)/(tabs)/_layout.tsx`
- `src/core/navigation/paths.ts`
- `docs/expo-router.md`

Route group mantigi (guncel kok stack):

- `(onboarding)`: onboarding tamamlanincaya kadar (`!hasCompletedOnboarding`)
- `(app)` ve `(auth)`: onboarding tamamlandiktan sonra (`hasCompletedOnboarding`); ana uygulama sekmeleri + ayri auth
  flow ekranlari (auth, app ile **ayni kok korumasi altinda kardes** grup — auth ekranlari `(app)/_layout` stack'ine
  gomulmez)
- `(app)/(tabs)`: ana tab navigator
- `app/modal.tsx`: global modal route

Auth korumasi:

- Kok `Stack.Protected` onboarding ve post-onboarding gruplarini ayirir.
- Oturum / tab bazli kisitlar icin ayrica `Tabs.Protected`, layout guard'lari veya login sheet gibi pattern'ler
  kullanilabilir.

Tab bar kurallari:

- Kalici sekmeler `(tabs)` altindadir
- Route var ama sekme butonu gosterilmeyecekse `href: null`
- Tab bar gizlenecek tam ekran akislari tabs grubunun disinda, ayni `(app)` stack altinda sibling route olarak acilir

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
- **Kimlik dogrulama:** `api-client` istek interceptor'inda `expo-secure-store` uzerinden okunan access token varsa
  `Authorization: Bearer <token>` eklenir (`src/services/storage/secure-storage.ts`). Token yoksa baslik eklenmez (
  public endpoint'ler).

Gelecek pattern:

- Feature bazli query hook'lari `src/features/<feature>/api` ya da `hooks` altinda tutulabilir
- Ortak axios instance kullanilmali
- Ileride refresh token / 401 retry icin response interceptor genisletilebilir

## 10. Auth ve Session

Ana dosyalar:

- `src/features/auth/hooks/use-session.ts`
- `src/features/auth/store/session-store.ts`
- `src/features/auth/screens/sign-in-screen.tsx`
- `src/services/storage/secure-storage.ts`

Su anki durum:

- Session token `SecureStore`'da; `session-store` bootstrap ile senkronize eder
- `bootstrap()` ilk acilista token okur

Gelecek plan:

- Token refresh / session restore
- Role bazli nested protected routes (gerekiyorsa)

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
- **Stil: Unistyles + theme token'lari** — className / Tailwind yok
- Hard-coded text yazma, i18n kullan
- Zustand selector'da object return etme
- Tabs icinde full-screen secondary page gerekiyorsa tabs disi sibling stack kullan
- Scroll-hide gereken yerlerde `AppScreen` kullan

## 13. Yararlı Referanslar

Proje ici:

- `docs/expo-router.md`
- `docs/unistyles.md`
- `.agents/rules/rule.mdc`

Harici resmi referanslar:

- React Native Unistyles 3
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
4. Renk ve spacing `tokens.ts` + Unistyles `theme` uzerinden mi tanimlanmali?
5. Zustand selector primitive mi?
6. Route degisikligi `paths.ts` ile uyumlu mu?
7. RTL etkisi var mi?
8. API cagrisi `api-client` ile mi (token interceptor davranisini bozmadan)?

Bu checklist yeni agent'in mevcut foundation'i bozmadan ilerlemesini saglar.
