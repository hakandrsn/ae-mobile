export const tr = {
  common: {
    continue: "Devam et",
    foundation: "Altyapi",
    language: "Dil",
    direction: "Yon",
    theme: "Tema",
  },
  home: {
    badge: "Temel Surum",
    title: "Tekrar kullanilabilir Expo altyapisi",
    description:
      "Bu proje; theme, shared component, i18n, routing ve data katmanlarini ortak bir standarda baglamak icin kuruldu.",
    architectureTitle: "Mimari Ilkeleri",
    architectureItems: [
      "Feature-first ama ortak primitive merkezli yapi",
      "Token tabanli theme sistemi",
      "Provider katmaninda tek giris noktasi",
      "Paketler gelmeden once bile calisan sade iskelet",
    ],
    nextTitle: "Sonraki Adim",
    nextDescription:
      "Bir sonraki adimda veri, state ve i18n paketlerini kontrollu sekilde ekleyip bu iskeleti gercek entegrasyonlarla guclendirecegiz.",
  },
  settings: {
    languageSectionTitle: "Dil Degistirme",
    languageDescription:
      "Buradan dili degistirip paylasilan i18n ve RTL altyapisini test edebilirsin.",
    themeSectionTitle: "Tema Degistirme",
    themeDescription: "Bu buton ile mevcut temayi degistirebilirsin.",
    localeStatus: "Aktif dil: {{locale}}",
    directionStatus: "Aktif yon: {{direction}}",
    rtlHint:
      "Arapca secildiginde shared componentlerin RTL davranis vermesi gerekir. Tam native RTL aynalama icin app config degisikliginden sonra dev build yeniden gerekebilir.",
    switchToLight: "Light Tema'ya Gec",
    switchToDark: "Dark Tema'ya Gec",
    languageNames: {
      en: "Ingilizce",
      tr: "Turkce",
      ar: "Arapca",
    },
  },
} as const;
