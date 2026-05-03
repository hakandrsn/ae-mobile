export const ar = {
  common: {
    continue: 'متابعة',
    foundation: 'الأساس',
    language: 'اللغة',
    direction: 'الاتجاه',
    theme: 'السمة',
  },
  home: {
    badge: 'النسخة الأساسية',
    title: 'بنية Expo قابلة لإعادة الاستخدام',
    description:
      'تم إعداد هذا المشروع لتوحيد الثيم والمكونات المشتركة و i18n والتوجيه وطبقة البيانات ضمن معيار قابل لإعادة الاستخدام.',
    architectureTitle: 'مبادئ المعمارية',
    architectureItems: [
      'هيكل feature-first مع primitive مشتركة',
      'نظام ثيم مبني على tokens',
      'نقطة دخول واحدة للـ providers',
      'هيكل بسيط يعمل حتى قبل تثبيت كل الحزم',
    ],
    nextTitle: 'الخطوة التالية',
    nextDescription:
      'في الخطوة التالية سنضيف طبقات البيانات والحالة والترجمة بشكل متدرج ونربط هذا الهيكل بتكاملات حقيقية.',
  },
  settings: {
    languageSectionTitle: 'تبديل اللغة',
    languageDescription: 'يمكنك التبديل بين اللغات لاختبار البنية الداعمة للترجمة و RTL.',
    themeSectionTitle: 'تبديل السمة',
    themeDescription: 'يمكنك تغيير السمة الحالية من هذا الزر.',
    localeStatus: 'اللغة الحالية: {{locale}}',
    directionStatus: 'الاتجاه الحالي: {{direction}}',
    rtlHint:
      'عند اختيار العربية يجب أن تستجيب المكونات المشتركة للـ RTL. لتفعيل RTL الأصلي بالكامل قد تحتاج إلى إعادة تشغيل dev build بعد تغيير إعدادات التطبيق.',
    switchToLight: 'الانتقال إلى السمة الفاتحة',
    switchToDark: 'الانتقال إلى السمة الداكنة',
    languageNames: {
      en: 'الإنجليزية',
      tr: 'التركية',
      ar: 'العربية',
    },
  },
} as const;
