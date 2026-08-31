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
`src/lib/i18n/locales.ts` içindeki 110+ dillik katalog sadece arayüzün yerel adı ve
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

| | Başlangıç | Profesyonel | İşletme | Ajans |
|---|---|---|---|---|
| Aylık | 19 € | **49 €** | 99 € | 249 € |
| Yıllıkta aylığa | 15 € | 39 € | 79 € | 199 € |
| Site / ay | 3 | 15 | 50 | sınırsız |
| Dil | 2 | 6 | 20 | sınırsız |
| Bölüm yenileme | ✗ | ✓ | ✓ | ✓ |
| Ton seçimi | ✗ | ✓ | ✓ | ✓ |
| Tema varyantı | 2 | 4 | 6 | 10 |
| Dışa aktarma | HTML | Next.js | Next.js | Next.js |
| Marka kaldırma | ✗ | ✓ | ✓ | ✓ |
| Özel alan adı | ✗ | ✗ | ✓ | ✓ |
| Kendi markanla | ✗ | ✗ | ✗ | ✓ |
| API | ✗ | ✗ | ✗ | ✓ |

**Fiyatlar nereden geliyor:** Ağustos 2026 piyasası — Wix ADI 17/29/39/159 $, Durable
~12 $, 10Web 10–30 $, Framer 5–20 $. Çeviri ayrı faturalanıyor: Weglot **tek ek dil için
15 €/ay**'dan başlayıp yirmi dilde 699 €'ya çıkıyor. Buradaki konum tam o boşluk — diller
üretimin parçası, sonradan eklenen makine çevirisi değil. Yani altı dilli bir paket, bir
site kurucu aboneliği **artı** bir Weglot katmanıyla yarışıyor ve ikisinin toplamının
altında kalıyor.

**Ücretsiz paket yok, bilerek:** her üretim gerçek model maliyeti doğuruyor ve bu ürünün
en pahalı işlemi tam olarak o. Ücretsiz katman, en maliyetli eylemi sübvanse etmek olurdu.

`applyLocaleQuota` neyin verildiğini **ve neyin düştüğünü** birlikte döndürüyor, böylece
arayüz listeyi sessizce kırpmak yerine kullanıcıya ne kaybettiğini söyleyebiliyor.

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

### Identity-linked anahtar kullanıyorsan

Bazı anahtarlar hangi workspace adına çalıştığını da bildirmek zorunda. Bunu
söylemezsen API şu hatayı döner:

```
400 anthropic-workspace-id is required when authenticating with
    an identity-linked API key
```

İki çözümden birini seç:

- `.env.local`'e (ve Vercel'e) `ANTHROPIC_WORKSPACE_ID=...` ekle. Workspace ID
  Console'da URL'de görünür; gizli bir değer değil.
- Ya da Console'dan **workspace'e bağlı düz bir anahtar** üret; o hiçbir ek ayar
  istemez.

Değişken tanımlıysa kod `anthropic-workspace-id` başlığını gönderiyor, tanımlı
değilse hiç göndermiyor — boş göndermek de reddedilirdi.

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (strict TS kontrolleri açık)
npm run lint     # Next 16'da lint build'den ayrı çalışır
```

## Yapı

```
src/
  app/
    page.tsx              tanıtım sayfası (landing)
    fiyatlar/page.tsx     fiyat sayfası + karşılaştırma tablosu
    demo/page.tsx         örnek site (MOCK_SITE_CONFIG — demo verisi, marka değil)
    builder/page.tsx      builder arayüzü
    api/generate/route.ts üretim endpoint'i
  lib/
    ai/index.ts           Claude çağrısı + dinamik JSON şeması
    i18n/locales.ts       dil kataloğu, yön, normalleştirme
    i18n/ui.ts            builder arayüz metinleri (tr/en/fr)
    i18n/marketing.ts     tanıtım ve fiyat sayfası metinleri (tr/en/fr)
    options/index.ts      ton ve metin yoğunluğu seçenekleri
    plans/index.ts        paketler, fiyatlar ve kotalar
  components/
    marketing/            tanıtım sayfası navigasyonu, alt bilgi, dil hafızası
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

## Neler var

- **Kalıcılık.** Üretilen siteler kaydediliyor, listeleniyor, silinebiliyor. Şu an
  tarayıcı deposunda: başka cihazda görünmez, site verisi silinirse kaybolur. Saklanan
  yapı bir sunucu deposunun kullanacağı yapı, yani geçiş backend değişikliği olacak.
- **Sohbetle düzenleme.** Önizlemenin yanındaki panelde ne istediğini yazıyorsun,
  uygulanıyor. `claude-sonnet-5` üzerinde, tur başına ~$0,004.
  Model yeniden yazılmış config değil **işlem listesi** döndürüyor; böylece adı geçmeyen
  hiçbir şey değişemiyor. Gelen işlemler doğrulanıyor: olmayan blok id'si, sitede
  bulunmayan dil, hex olmayan renk ve sayfayı boşaltacak silme reddediliyor.
- **Maliyet ölçümü.** Her üretim ve düzenlemenin token'ı sayılıyor, site başına ve
  toplam harcama arayüzde görünüyor.

## Bilinen eksikler

- **Site içi AI yok.** Müşteri sitelerinin kendi AI özellikleri (devis üretimi, asistan)
  henüz yazılmadı. Maliyet ve hukuk analizi yapıldı: bu özellik kredi sayacı ve onay
  akışı olmadan açılmamalı.
- **Gerçek veritabanı yok.** Vercel Storage hesapta provizyon edilmeli.
- **6 dil üretimi ~240 saniye sürüyor.** Dilleri paralel isteklerde üretmek süreyi
  yaklaşık altıya böler.
- **Görseller.** About bloğu tek bir sabit Unsplash görseline düşüyor.
