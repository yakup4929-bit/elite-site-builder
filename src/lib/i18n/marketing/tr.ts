import type { MarketingCopy } from "./types";

export const TR: MarketingCopy = {
  nav: { product: "Ürün", languages: "Diller", pricing: "Fiyatlar", demo: "Demo", start: "Başla" },
  hero: {
    eyebrow: "Çok dilli site üretici",
    title: "Bir cümle yaz. Dünyanın konuştuğu dillerde bir site çıksın.",
    subtitle:
      "Aeltay Studio, işini bir cümleyle anlattığında sana yayına hazır bir web sitesi kurar — istediğin kadar dilde, hepsi tek seferde, hepsi o dilde yazılmış.",
    primaryCta: "Siteni kur",
    secondaryCta: "Örneği gör",
    note: "Kredi kartı bilgisi istemeden deneyebilirsin.",
  },
  proof: {
    languages: "110+",
    languagesLabel: "hazır dil, dilediğini ekle",
    oneCall: "Tek istek",
    oneCallLabel: "tüm diller aynı anda üretilir",
    rtl: "RTL",
    rtlLabel: "Arapça, İbranice, Farsça, Urduca doğru akar",
  },
  difference: {
    title: "Çeviri değil, üretim.",
    lead: "Aradaki fark, sitenin okunduğunda nasıl hissettirdiğidir.",
    translatedTitle: "Çeviri eklentisi ne yapar",
    translatedBody:
      "Önce tek dilde bir site yazılır, sonra o metin makineye verilir. Cümle yapısı ilk dilin kalıbında kalır; deyimler birebir çevrilir, başlıklar kutulara sığmaz. Okuyucu anlar ama yabancı olduğunu da anlar.",
    generatedTitle: "Aeltay Studio ne yapar",
    generatedBody:
      "Her dil, o pazarda gerçekten nasıl yazılıyorsa öyle üretilir. Aynı teklif, aynı yapı, aynı blok sırası — ama her dilin kendi cümlesiyle. Almanca uzar, Japonca kısalır; metin buna göre yazılır, düzen bozulmaz.",
    closing:
      "Hepsi tek modele tek istekte üretildiği için markanın sesi diller arasında kaymaz.",
  },
  how: {
    title: "Üç adım, birkaç dakika.",
    lead: "Şablon seçmek, sürükle bırak, boş kutuları doldurmak yok.",
    steps: [
      {
        title: "İşini anlat",
        body: "Sektörünü ve ne yaptığını bir iki cümleyle yaz. Ne kadar somut olursan metin o kadar sana ait olur.",
      },
      {
        title: "Dillerini ve tonunu seç",
        body: "Ulaşmak istediğin dilleri ekle, sesini belirle: elit, sıcak, kurumsal, cesur, teknik ya da minimal.",
      },
      {
        title: "Siteni al",
        body: "Bölümler saniyeler içinde canlı önizlemede belirir. Beğenmediğin bölümü tek başına yeniden ürettir, sonra yayına al ya da kodunu indir.",
      },
    ],
  },
  languages: {
    title: "Kitleni dar tutma.",
    lead: "Katalogda dünyanın en çok konuşulan dilleri var ve liste kapalı değil — istediğin BCP-47 etiketini yazarsan o dili de üretir.",
    rtlNote:
      "Sağdan sola yazılan diller gerçekten sağdan sola akar: düzen döner, hizalama değişir, butonların sırası tersine geçer.",
    anyTagNote: "Katalogda olmayan bir dil mi lazım? Etiketini yaz, yeter.",
    reachLabel: "Seçtiğin dillerin toplam erişimi",
  },
  blocks: {
    title: "Sayfada ne var?",
    lead: "Her blok içeriğiyle birlikte üretilir — hiçbir metin şablondan gelmez.",
    items: [
      { title: "Hero", body: "Başlık, alt başlık, açıklama ve iki eylem çağrısı. Hepsi işine göre yazılır." },
      { title: "Özellikler", body: "Seni rakibinden ayıran maddeler, genel geçer laf değil somut ayrıntılarla." },
      { title: "Hakkında", body: "Markanın hikâyesi; kuruluş, usul ve neden böyle çalıştığın." },
      { title: "Fiyatlandırma", body: "Kendi para biriminde fiyatlar, gerçek paket içerikleri, doğru vurgu." },
      { title: "İletişim", body: "Form ve iletişim bilgileri, sitenin rengine uyumlu." },
      { title: "Alt bilgi", body: "Marka, bağlantılar ve telif satırı." },
    ],
  },
  pricingTeaser: {
    title: "Dürüst fiyat, gizli eklenti yok.",
    lead: "Diller pakete dahil. Sonradan kelime kredisi ya da dil başına abonelik satın almazsın.",
    cta: "Fiyatları gör",
    compare:
      "Yalnızca çeviri eklentileri tek ek dil için aylık 15 €'dan başlıyor. Burada diller üretimin parçası.",
  },
  faq: {
    title: "Sık sorulanlar",
    items: [
      {
        q: "Üretilen metin gerçekten kullanılabilir mi, yoksa doldurma mı?",
        a: "Verdiğin brief ne kadar somutsa metin o kadar sana ait olur. Sektörünü, konumunu ve seni farklı kılan şeyi yazarsan çıkan metin yayına hazır olur; tek kelimelik bir brief verirsen genel bir metin alırsın. Beğenmediğin bölümü tek başına yeniden ürettirebilirsin.",
      },
      {
        q: "Çevirinin doğruluğunu nasıl biliyorum?",
        a: "Çeviri yapılmıyor. Her dil o dilde baştan yazılıyor, yani birinden diğerine aktarımda bozulacak bir şey yok. Yine de her dili önizlemede görüp düzenleyebilirsin.",
      },
      {
        q: "Kaç dil ekleyebilirim?",
        a: "Paketine bağlı: Başlangıç iki, Profesyonel altı, İşletme yirmi, Ajans sınırsız. Paketinin üstünde dil eklersen sistem hangilerinin dışarıda kaldığını sana açıkça söyler, sessizce kırpmaz.",
      },
      {
        q: "Siteyi kendi sunucuma taşıyabilir miyim?",
        a: "Evet. Başlangıç paketinde statik HTML, Profesyonel ve üstünde tam bir Next.js projesi olarak indirebilirsin. Kilitli değilsin.",
      },
      {
        q: "Neden ücretsiz paket yok?",
        a: "Her üretim gerçek model maliyeti doğuruyor ve bu ürünün en pahalı işlemi tam olarak o. Ücretsiz paket, en maliyetli eylemi sübvanse etmek olurdu. Bunun yerine giriş fiyatını düşük tuttuk.",
      },
      {
        q: "İptal edebilir miyim?",
        a: "İstediğin zaman. Yıllık ödediysen dönem sonuna kadar kullanmaya devam edersin.",
      },
    ],
  },
  finalCta: {
    title: "İşini bir cümleyle anlat, gerisini biz kuralım.",
    body: "İlk siten birkaç dakika sonra önizlemede olacak.",
    cta: "Siteni kur",
  },
  footer: {
    tagline: "Aeltay ailesinin çok dilli site üretim aracı.",
    product: "Ürün",
    company: "Kurumsal",
    legal: "Yasal",
    rights: "Tüm hakları saklıdır.",
  },
  pricingPage: {
    title: "Fiyatlar",
    lead: "Diller dahil. Kelime kredisi yok, dil başına abonelik yok.",
    monthly: "Aylık",
    yearly: "Yıllık",
    savePrefix: "%{n} tasarruf",
    perMonth: "/ay",
    billedYearly: "yıllık ödemede",
    choose: "Bu paketi seç",
    recommended: "En çok seçilen",
    comparisonTitle: "Paketler yan yana",
    featureColumn: "Özellik",
    unlimited: "Sınırsız",
    included: "Var",
    notIncluded: "Yok",
    rows: {
      sitesPerMonth: "Aylık site üretimi",
      maxLocales: "Dil sayısı",
      blocks: "Blok sayısı",
      regenerateBlock: "Bölümü yeniden üret",
      toneControl: "Ton seçimi",
      themeVariants: "Tema varyantı",
      export: "Dışa aktarma",
      removeBranding: "Aeltay markasını kaldır",
      customDomain: "Özel alan adı",
      whiteLabel: "Kendi markanla sun",
      apiAccess: "API erişimi",
      support: "Destek",
    },
    supportLevels: { email: "E-posta", priority: "Öncelikli", dedicated: "Özel temsilci" },
    exportKinds: { html: "Statik HTML", nextjs: "Next.js projesi" },
    noFreeTitle: "Neden ücretsiz paket yok?",
    noFreeBody:
      "Bir site üretmek her seferinde gerçek model maliyeti doğuruyor — ücretsiz paket, ürünün en pahalı işlemini sübvanse etmek olurdu. Bunun yerine giriş fiyatını düşük tuttuk ve dilleri pakete dahil ettik.",
  },
};
