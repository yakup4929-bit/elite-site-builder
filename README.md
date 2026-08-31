# Aeltay Studio

Aeltay ailesinin site üretme aracı. Bir cümlelik brief ve sektör bilgisinden, Claude ile
tam bir web sitesi konfigürasyonu üretir ve anında canlı önizler.

## Nasıl çalışıyor

1. `/builder` sayfasında sektör + brief giriyorsun.
2. `POST /api/generate` isteği `src/lib/ai/index.ts` üzerinden Claude'a gidiyor.
3. Model, **structured output** ile `SiteConfig` şemasına birebir uyan JSON döndürüyor
   (bkz. `SITE_CONFIG_SCHEMA`) — markdown ayıklama veya `JSON.parse` kumarı yok.
4. `BlockRenderer` gelen blokları (Hero, Features, About, Pricing, Contact, Footer)
   sırayla React bileşenlerine basıyor.

## Kurulum

```bash
npm install
```

`.env.local` dosyasına Anthropic API anahtarını ekle:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Anahtar [Anthropic Console](https://console.anthropic.com/settings/keys) üzerinden alınır.
Anahtar yoksa `/api/generate` 500 döner ve sebebini açıkça yazar.

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
  lib/ai/index.ts         Claude çağrısı + JSON şeması
  components/
    BlockRenderer.tsx     type -> bileşen eşlemesi
    blocks/               Hero, Features, About, Pricing, Contact, Footer
  types/index.ts          SiteConfig / SiteBlock / BlockContent
```

Yeni blok tipi eklemek için: `types/index.ts`'e `BlockType` ekle, `blocks/` altına
bileşeni yaz, `BlockRenderer`'a kaydet, `lib/ai/index.ts`'teki `BLOCK_TYPES`'a ekle.
Dördü de yapılmazsa model o bloğu ya hiç üretmez ya da renderer "not yet implemented" basar.

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
