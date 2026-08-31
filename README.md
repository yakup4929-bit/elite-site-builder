# Aeltay Studio

Aeltay ailesinin site üretme aracı. Bir cümlelik brief ve sektör bilgisinden, Claude ile
tam bir web sitesi konfigürasyonu üretir — **istenen sayıda dilde** — ve anında canlı önizler.

## Nasıl çalışıyor

1. `/builder` sayfasında paket, diller, sektör ve brief giriyorsun.
2. `POST /api/generate` isteği `src/lib/ai/index.ts` üzerinden Claude'a gidiyor.
3. Model, **structured output** ile `SiteConfig` şemasına birebir uyan JSON döndürüyor —
   markdown ayıklama veya `JSON.parse` kumarı yok. Şema, istenen dillere göre
   `buildSchema()` içinde çalışma anında kuruluyor.
4. `SitePreview` aktif dili tutuyor, her bloğun içeriğini o dile daraltıp
   `BlockRenderer`'a veriyor; o da React bileşenlerine basıyor.

## Çoklu dil

Diller BCP-47 etiketi (`tr`, `en`, `pt-BR`, `zh-TW`). **Sabit bir liste yok** —
`src/lib/i18n/locales.ts` içindeki ~40 dillik katalog sadece arayüzün yerel adı ve
yazı yönünü ağa çıkmadan bilmesi için var. Katalogda olmayan bir etiket de çalışır:
etiketin kendisi gösterilir, yön birincil alt etiketten çıkarılır. Sağdan sola yazılan
diller (Arapça, İbranice, Farsça, Urduca) üretilen sitede `dir` ayarını tetikler.

**Tüm diller tek istekte üretilir.** Önce tek dil üretip sonra çevirmek tonu kaydırır
ve her dil için ayrı fatura çıkarır; hepsini birlikte istemek sesi tutarlı tutar.
Şemada çeviriler dile göre anahtarlanmış bir nesne değil, `locale` alanı taşıyan bir
dizi — strict JSON schema serbest anahtar ifade edemiyor, ayrıca o alandaki enum
modelin istenmeyen dil uydurmasını engelliyor.

İki ayrı şey olduğuna dikkat: **arayüz dili** (builder ekranı, `src/lib/i18n/ui.ts`,
tr/en/fr) ile **üretilen sitenin dilleri** farklı seçimler.

## Paketler

`src/lib/plans` dört katman tanımlıyor. Her sınır oradan okunuyor, koda gömülü kontrol
yok — bir özelliği katmanlar arasında taşımak tek dosyalık değişiklik.

| | Sade | Orta | Üst Seviye | Sınırsız |
|---|---|---|---|---|
| Dil sayısı | 1 (sabit) | 3 | 10 | sınırsız |
| Dil seçimi | ✗ | ✓ | ✓ | ✓ |
| Blok tipleri | 4 | hepsi | hepsi | hepsi |
| Blok yenileme | ✗ | ✓ | ✓ | ✓ |
| Tema varyantı | 1 | 3 | 5 | 8 |
| Export | ✗ | HTML | Next.js | Next.js |
| Marka kaldırma | ✗ | ✗ | ✓ | ✓ |
| Özel alan adı | ✗ | ✗ | ✗ | ✓ |

`applyLocaleQuota` neyin verildiğini **ve neyin düştüğünü** birlikte döndürüyor, böylece
arayüz listeyi sessizce kırpmak yerine kullanıcıya ne kaybettiğini söyleyebiliyor.

> Fiyatlar şu an placeholder. Kimseden ücret almadan önce gerçek rakamları gir.

## Kurulum

```bash
npm install
```

`.env.local` dosyasına Anthropic API anahtarını ekle:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Anahtar [Anthropic Console](https://console.anthropic.com/settings/keys) üzerinden alınır.
**Vercel'de ayrıca proje ayarlarındaki Environment Variables'a da eklenmeli** — yoksa
deploy build'i geçer ama üretim isteği 500 döner. Route bu durumu açıkça bildiriyor.

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (strict TS kontrolleri açık)
npm run lint     # Next 16'da lint build'den ayrı çalışır
```

## Yapı

```
src/
  app/
    page.tsx              demo site (MOCK_SITE_CONFIG — örnek veri, marka değil)
    builder/page.tsx      builder arayüzü
    api/generate/route.ts üretim endpoint'i
  lib/
    ai/index.ts           Claude çağrısı + dinamik JSON şeması
    i18n/locales.ts       dil kataloğu, yön, normalleştirme
    i18n/ui.ts            arayüz metinleri (tr/en/fr)
    plans/index.ts        paketler ve kotalar
  components/
    SitePreview.tsx       aktif dil + yön, blok çözümleme
    LocaleSwitcher.tsx    site içi dil değiştirici
    BlockRenderer.tsx     type -> bileşen eşlemesi
    blocks/               Hero, Features, About, Pricing, Contact, Footer
  types/index.ts          SiteConfig / SiteBlock / ResolvedBlock / resolveBlock
```

**Yeni blok tipi eklemek için** dördünü birden yap, biri eksik kalırsa model o bloğu ya
hiç üretmez ya da renderer "not yet implemented" basar:

1. `types/index.ts` → `BlockType`'a ekle
2. `components/blocks/` → bileşeni yaz (`ResolvedBlock` alır, dilden habersizdir)
3. `components/BlockRenderer.tsx` → `BLOCK_COMPONENTS`'e kaydet
4. `lib/ai/index.ts` → `ALL_BLOCK_TYPES`'a ekle
5. Paket bazlı kısıtlama istiyorsan `lib/plans` → `allowedBlockTypes`

**Yeni arayüz dili eklemek için** `lib/i18n/ui.ts` içindeki `UI_LOCALES` ve
`DICTIONARIES`'e ekle. Üretilen site dilleri için hiçbir şey yapmana gerek yok —
onlar zaten açık uçlu.

## Dikkat: dosya kodlaması

Kaynak dosyalar **UTF-8** olmalı. Türkçe karakter içeren dosyalar CP1254 (Windows Türkçe)
kaydedilirse Turbopack şu hatayı verir ve sebebini söylemez:

```
Reading source code for parsing failed
- invalid utf-8 sequence of 1 bytes from index NNNN
```

Tespit:

```bash
for f in $(find src -name '*.ts*'); do iconv -f UTF-8 -t UTF-8 "$f" >/dev/null 2>&1 || echo "BAD $f"; done
```

Düzeltme: `iconv -f CP1254 -t UTF-8 dosya > tmp && mv tmp dosya`

## Bilinen eksikler

- **Kalıcılık yok.** Üretilen site sayfa yenilenince kayboluyor.
- **Blok yenileme henüz kodda yok.** Paket sınırı (`regenerateBlock`) tanımlı ama
  arayüz/endpoint tarafı yazılmadı.
- **Görseller.** `About` bloğu sabit bir Unsplash görseline düşüyor; modele URL
  uydurtmak 404 verdiği için prompt'tan çıkarıldı. Gerçek çözüm Unsplash API'siyle
  anahtar kelimeden arama.
