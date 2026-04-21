SVG ikonlarini bu klasore ekleyin ve sonra `yarn icons:generate` calistirin.

Kurallar:
- Dosya adlari `kebab-case` olsun.
- Istersen alt klasor kullanabilirsin. `social/arrow-left.svg` dosyasi `social-arrow-left` olarak kaydolur.
- Tek renkli ikonlarda `fill="currentColor"` veya `stroke="currentColor"` kullanirsan `AppIcon color="..."` garantili calisir.
- Cok renkli SVG'ler de render edilir; kendi renklerini korurlar ve `color` override beklenmez.
- Uygulama icinde dogrudan SVG import etmek yerine `AppIcon name="..."` kullan.
