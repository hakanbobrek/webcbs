const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const news = [
  {
    title: "6. Coğrafi Bilgi Sistemleri Kongresi 2019 – AÇIK KAYNAK KODLU BELEDİYE MÜLK TAKİP SİSTEMİ",
    slug: "cografi-bilgi-sistemleri-kongresi-2019",
    shortDescription: "Mosk Bilişim olarak TMMOB Harita ve Kadastro Mühendisleri Odası'nın düzenlediği 6. Coğrafi Bilgi Sistemleri Kongresi'nde iki farklı proje sunumu ile yer aldık.",
    content: `
      <h2>Mosk Bilişim, 6. CBS Kongresi'nde Sektöre Yön Verdi</h2>
      <p>TMMOB Harita ve Kadastro Mühendisleri Odası tarafından düzenlenen ve sektörün en prestijli etkinliklerinden biri olan <strong>"6. Coğrafi Bilgi Sistemleri Kongresi 2019"</strong>, 23-25 Ekim 2019 tarihleri arasında Türkiye Barolar Birliği Av. Özdemir Özok Kültür ve Kongre Merkezi'nde gerçekleştirildi.</p>
      
      <p>Bilişim ve haritacılık sektörünün önde gelen isimlerini, akademisyenleri ve kamu kurum temsilcilerini bir araya getiren bu önemli organizasyonda, <strong>Mosk Bilişim</strong> olarak yerimizi aldık. Kongre süresince, geliştirdiğimiz yenilikçi çözümleri ve sektöre kattığımız değeri katılımcılarla paylaşma fırsatı bulduk.</p>

      <h3>Açık Kaynak Kodlu Mülk Takip Sistemi Tanıtıldı</h3>
      <p>Kongre kapsamında gerçekleştirdiğimiz sunumlardan en dikkat çekeni, tamamen açık kaynak kodlu teknolojiler kullanılarak geliştirdiğimiz <strong>"Belediye Mülk Takip Sistemi"</strong> oldu. Bu proje ile belediyelerin taşınmaz yönetim süreçlerini dijitalleştirerek, şeffaf, izlenebilir ve verimli bir yapıya kavuşturmayı hedefledik. Sunumumuz, özellikle kamu kurumu temsilcileri tarafından büyük ilgi gördü ve teknik detayları ile takdir topladı.</p>

      <h3>İki Farklı Proje ile Sahne Aldık</h3>
      <p>Sadece mülk takip sistemi ile sınırlı kalmayıp, akıllı şehir uygulamaları kapsamındaki bir diğer projemizin de sunumunu başarıyla gerçekleştirdik. Mosk Bilişim olarak, yerli ve milli yazılım geliştirme vizyonumuz doğrultusunda ürettiğimiz çözümlerin, böylesine önemli bir platformda sergilenmesi bizler için büyük bir gurur kaynağı oldu.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    features: ["CBS Kongresi", "Proje Sunumu", "Açık Kaynak Kod", "Mülk Takip Sistemi"],
    isVisible: true,
    publishedAt: new Date("2019-10-25")
  },
  {
    title: "Karesi Belediyesi – Gelir Artırıcı Projeler",
    slug: "karesi-belediyesi-gelir-artirici-projeler",
    shortDescription: "Karesi Belediyesi'nde başlattığımız 'Gelir Artırıcı Projeler' kapsamında saha ve veri analizi çalışmalarımız hızla devam ediyor.",
    content: `
      <h2>Karesi Belediyesi'nde Verimlilik Dönemi</h2>
      <p>Mosk Bilişim Teknolojileri olarak, yerel yönetimlerin finansal sürdürülebilirliğine katkı sağlamak amacıyla geliştirdiğimiz <strong>"Gelir Artırıcı Projeler (GAÇ)"</strong> kapsamında, Balıkesir'in Karesi Belediyesi ile önemli bir iş birliğine imza attık. Projemiz, belediye gelirlerini optimize etmek ve kayıt dışı verileri sisteme kazandırmak amacıyla başlatılmıştır.</p>

      <h3>Vatandaş Desteği ile İlerliyoruz</h3>
      <p>Projenin saha çalışmaları aşamasında, Karesi halkının ve esnafının gösterdiği duyarlılık ve destek, sürecin beklenenden çok daha hızlı ve verimli ilerlemesini sağlamaktadır. Ekiplerimiz, sahada yaptıkları tespitler ve güncellemeler ile belediye veri tabanını zenginleştirirken, vatandaşlarımızın da sisteme entegrasyonunu kolaylaştırmaktadır.</p>

      <h3>Teknoloji ve Saha Çalışması Bir Arada</h3>
      <p>Bu projede, sadece saha tespiti yapmakla kalmayıp, elde edilen verileri geliştirdiğimiz özel yazılımlar ve coğrafi bilgi sistemleri (CBS) ile analiz ediyoruz. Uydu görüntüleri, imar planları ve mevcut beyanların çapraz sorgulaması yapılarak, gelir kayıplarının önüne geçiliyor. Karesi Belediyesi ile yürüttüğümüz bu çalışma, şeffaf ve adil bir vergi yönetimi için örnek teşkil etmektedir.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1554224155-9d0e0f268f51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    features: ["Gelir Artırıcı Proje", "Karesi Belediyesi", "Saha Çalışması", "Veri Analizi"],
    isVisible: true,
    publishedAt: new Date("2019-11-15")
  },
  {
    title: "Bursa Büyükşehir Belediyesi GAÇ Çalışmalarımızı Tamamladık",
    slug: "bursa-buyuksehir-belediyesi-gac-tamamlandi",
    shortDescription: "4 aylık yoğun bir çalışmanın ardından Bursa Büyükşehir Belediyesi Gelir Artırıcı Proje (GAÇ) sürecini başarıyla sonlandırdık.",
    content: `
      <h2>Bursa'da Başarı Hikayesi: GAÇ Projesi Tamamlandı</h2>
      <p>Yaklaşık 4 ay önce Bursa Büyükşehir Belediyesi Mali Hizmetler Daire Başkanlığı bünyesinde başlattığımız <strong>Gelir Artırıcı Proje (GAÇ)</strong> kapsamındaki çalışmalarımızı başarıyla tamamlamanın gururunu yaşıyoruz. Bu süreçte, Türkiye'nin en büyük metropollerinden biri olan Bursa'da, geniş kapsamlı bir veri analizi ve saha çalışması gerçekleştirdik.</p>

      <h3>Final Toplantısı ve Sonuçlar</h3>
      <p>Bugün kurum üst düzey yetkilileri ile gerçekleştirdiğimiz proje final toplantısında, yapılan çalışmaların somut sonuçları masaya yatırıldı. Elde edilen veriler, gelir artış oranları, tespit edilen kaçaklar ve kuruma sağlanan katma değerler detaylı sunumlarla aktarıldı. Ayrıca, projenin sürdürülebilirliği için bundan sonra atılması gereken adımlar ve stratejik yol haritası belirlendi.</p>

      <h3>En Büyük Kazanımımız: Memnuniyet</h3>
      <p>Toplantı sonrasında yöneticilerimizin yüzlerindeki gülümseme ve duyduğumuz memnuniyet ifadeleri, Mosk Bilişim ailesi olarak bizler için en büyük motivasyon kaynağı olmuştur. Proje boyunca bizlerden desteklerini esirgemeyen Bursa Büyükşehir Belediyesi'nin değerli yöneticilerine, özverili çalışanlarına ve bu zorlu süreçte ekip ruhunu hiç kaybetmeyen çalışma arkadaşlarımıza sonsuz teşekkürlerimizi sunarız.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    features: ["Bursa Büyükşehir", "Proje Tamamlama", "Gelir Artırıcı Çalışma", "Başarı Hikayesi"],
    isVisible: true,
    publishedAt: new Date("2019-12-10")
  },
  {
    title: "Karesi Belediyesi “Gelir Artırıcı Proje” Çalışmalarının İlk Etabını Tamamladık",
    slug: "karesi-belediyesi-gac-ilk-etap",
    shortDescription: "Karesi Belediyesi'ndeki GAÇ projesinin ilk etabı tamamlandı ve projenin tüm ilçe sınırlarına genişletilmesine karar verildi.",
    content: `
      <h2>Karesi'de İlk Etap Başarıyla Sonuçlandı</h2>
      <p>Karesi Belediyesi'nde bir süredir titizlikle yürüttüğümüz <strong>"Gelir Artırıcı Proje"</strong> kapsamındaki çalışmalarımızın ilk etabını tamamlamış bulunmaktayız. Pilot bölgelerde gerçekleştirilen veri toplama, analiz ve sayısallaştırma işlemleri sonucunda, belediye gelirlerinde öngörülenin üzerinde bir iyileştirme potansiyeli tespit edilmiştir.</p>

      <h3>Proje Tüm İlçeye Yayılıyor</h3>
      <p>Üst yönetim ile yapılan değerlendirme toplantısında, ilk etabın sonuçları büyük bir memnuniyetle karşılanmıştır. Elde edilen verilerin doğruluğu ve sisteme sağladığı katkı göz önüne alınarak, projenin kapsamının genişletilmesine ve tüm Karesi Belediyesi sınırlarını kapsayacak şekilde devam ettirilmesine karar verilmiştir.</p>
      
      <p>Bu karar, Mosk Bilişim olarak sunduğumuz hizmetin kalitesini ve güvenilirliğini bir kez daha kanıtlamıştır. Karesi Belediyesi ile olan iş birliğimizin artarak devam edecek olmasından mutluluk duyuyoruz.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1115&q=80",
    features: ["Karesi Belediyesi", "Proje Genişletme", "İlk Etap", "Gelir Artırma"],
    isVisible: true,
    publishedAt: new Date("2019-12-20")
  },
  {
    title: "14.12.2019 Tarihinde Yapılan Beysiad – Genel Kuruluna Katıldık",
    slug: "beysiad-genel-kurul-katilimi",
    shortDescription: "Mosk Bilişim olarak Belediye Yazılım Sanayicileri ve İş İnsanları Derneği (BEYSİAD) genel kurulunda yerimizi aldık.",
    content: `
      <h2>Sektörün Nabzı BEYSİAD Genel Kurulu'nda Attı</h2>
      <p><strong>MOSK Bilişim Teknolojileri LTD. ŞTİ.</strong> olarak, sektörümüzün en önemli sivil toplum kuruluşlarından biri olan <strong>BEYSİAD – Belediye Yazılım Sanayicileri ve İş İnsanları Derneği</strong>'nin 14.12.2019 tarihinde gerçekleştirilen genel kurul toplantısına katılım sağladık.</p>

      <h3>İş Birliği ve Vizyon</h3>
      <p>Belediyecilik yazılımları alanında faaliyet gösteren firmaları bir araya getiren bu platformda, sektörün sorunları, çözüm önerileri ve gelecek vizyonu üzerine verimli görüşmeler gerçekleştirdik. Diğer paydaşlarla kurduğumuz iletişim ve iş birliği ağları, hem firmamızın hem de sektörümüzün gelişimi adına önemli fırsatlar sunmaktadır. Mosk Bilişim olarak, sektörümüzün kurumsallaşması ve standartlarının yükseltilmesi adına bu tür organizasyonlarda aktif rol almaya devam edeceğiz.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    features: ["BEYSİAD", "Genel Kurul", "Sektörel Buluşma", "Belediye Yazılımları"],
    isVisible: true,
    publishedAt: new Date("2019-12-14")
  },
  {
    title: "Zonguldak Belediyesi Coğrafi Bilgi Sistemi Eğitimi Gerçekleştirildi",
    slug: "zonguldak-belediyesi-cbs-egitimi",
    shortDescription: "Zonguldak Belediyesi personeline yönelik düzenlediğimiz kapsamlı Coğrafi Bilgi Sistemi (CBS) eğitimlerini tamamladık.",
    content: `
      <h2>Zonguldak Belediyesi'nde Teknoloji Dönüşümü</h2>
      <p>Zonguldak Belediyesi'nde yürütmekte olduğumuz <strong>Coğrafi Bilgi Sistemi (CBS)</strong> projesi kapsamında, sistemin sürdürülebilirliği ve etkin kullanımı için kritik öneme sahip olan eğitim sürecini tamamladık. Geliştirdiğimiz modern CBS altyapısının kurum personeli tarafından en verimli şekilde kullanılabilmesi amacıyla düzenlenen eğitimlere katılım yoğun oldu.</p>

      <h3>Birimler Arası Entegrasyon</h3>
      <p>Eğitim programı, Zonguldak Belediyesi'nin İmar, Fen İşleri, Emlak ve Bilgi İşlem gibi çeşitli birimlerinden personellerin katılımı ile gerçekleştirildi. Bu sayede, farklı müdürlüklerin ortak bir veri tabanı üzerinden koordineli çalışması ve geliştirdiğimiz yazılımın tüm fonksiyonlarının aktif olarak kullanılması sağlandı.</p>
      
      <h3>Teşekkürler</h3>
      <p>MOSK Bilişim olarak Zonguldak Belediyesi için geliştirdiğimiz yazılımların kuruma katma değer ve büyük kolaylıklar sağladığını görmekten mutluluk duyuyoruz. Bu projede vizyonuyla öncülük eden Zonguldak Belediyesi'nin değerli yöneticilerine, eğitimlere ilgiyle katılan ve sinerjimizi paylaşan değerli çalışanlarına sonsuz teşekkürlerimizi sunarız.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    features: ["Zonguldak Belediyesi", "CBS Eğitimi", "Personel Eğitimi", "Teknoloji Transferi"],
    isVisible: true,
    publishedAt: new Date("2020-01-15")
  },
  {
    title: "Kınık Belediyesi Coğrafi Bilgi Sistemi",
    slug: "kinik-belediyesi-cbs-projesi",
    shortDescription: "Kınık Belediyesi'nde kurduğumuz Coğrafi Bilgi Sistemi'nin eğitimlerini, farklı birimlerin katılımıyla başarıyla tamamladık.",
    content: `
      <h2>Kınık Belediyesi Dijitalleşiyor</h2>
      <p>İzmir'in Kınık Belediyesi'nde devam eden projemiz kapsamında, belediyenin dijital altyapısını güçlendirecek <strong>Coğrafi Bilgi Sistemi (CBS)</strong> kurulumunu tamamladık ve sistemin kullanıcı eğitimlerini gerçekleştirdik. MOSK Bilişim olarak geliştirdiğimiz kullanıcı dostu arayüzler ve güçlü analiz araçları, belediye personelinin hizmetine sunuldu.</p>

      <h3>Verimli Kullanım İçin Eğitim</h3>
      <p>Sistemin verimli bir şekilde kullanılması ve kurum hafızasının dijital ortama aktarılması amacıyla, Kınık Belediyesi'nin bünyesinde bulunan çeşitli birimlerden personellerin katılımı ile kapsamlı bir eğitim programı uygulandı. Eğitimlerde, harita tabanlı veri sorgulama, raporlama ve analiz yetenekleri detaylıca anlatıldı.</p>
      
      <p>Bu projede emeği geçen Kınık Belediyesi'nin vizyoner yöneticilerine, iş birliği içinde olduğumuz ve sinerjimizi paylaşan değerli çalışanlarına ve sahadaki ekip arkadaşlarımıza teşekkür ederiz.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
    features: ["Kınık Belediyesi", "CBS Kurulumu", "Eğitim", "Dijitalleşme"],
    isVisible: true,
    publishedAt: new Date("2020-02-10")
  },
  {
    title: "Altınova Belediyesi’nde Coğrafi Bilgi Sistemi Eğitimi Gerçekleştirildi",
    slug: "altinova-belediyesi-cbs-egitimi",
    shortDescription: "Altınova Belediyesi için geliştirdiğimiz CBS yazılımının tanıtımı ve eğitimi, kurum personeli ve halkın katılımıyla yapıldı.",
    content: `
      <h2>Altınova'da CBS Dönemi Başladı</h2>
      <p>Yalova'nın incisi Altınova Belediyesi için <strong>MOSK Bilişim Teknolojileri</strong> olarak özel olarak geliştirdiğimiz Coğrafi Bilgi Sistemi yazılımımızın tanıtılması ve en etkin şekilde kullanılması amacıyla düzenlediğimiz eğitim programı başarı ile tamamlandı.</p>

      <h3>Vatandaş Odaklı Çözümler</h3>
      <p>Eğitim sonrasında sadece belediye personelinin değil, Kent Rehberi uygulamamız sayesinde Altınova halkının da belediye hizmetlerine ve kent bilgilerine erişimi kolaylaştı. Altınova Belediyesi birimlerinin iş yükünün hafiflemesi ve vatandaşların bilgiye hızlı erişimi, MOSK Bilişim olarak en büyük kazanımımızdır.</p>
      
      <p>Projede bizlerden desteklerini esirgemeyen Altınova Belediyesi'nin değerli yöneticilerine, özverili çalışanlarına ve ekip ruhunu projenin her aşamasında yaşatan ekip arkadaşlarımıza teşekkür ederiz.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    features: ["Altınova Belediyesi", "Kent Rehberi", "CBS", "Vatandaş Odaklı"],
    isVisible: true,
    publishedAt: new Date("2020-03-05")
  },
  {
    title: "Menderes Belediyesi’nde Coğrafi Bilgi Sistemi",
    slug: "menderes-belediyesi-cbs-devreye-alimi",
    shortDescription: "Menderes Belediyesi Coğrafi Bilgi Sistemi projesini başarıyla devreye aldık ve kullanıcı eğitimlerini tamamladık.",
    content: `
      <h2>Menderes Belediyesi CBS ile Güçlendi</h2>
      <p><strong>MOSK Bilişim Teknolojileri</strong> olarak, İzmir'in Menderes Belediyesi'nin dijital dönüşüm yolculuğunda önemli bir kilometre taşı olan <strong>Coğrafi Bilgi Sistemi (CBS)</strong> projesini başarıyla devreye aldık. Sistemin kurulumunun ardından, belediye personelinin yetkinliğini artırmak amacıyla düzenlediğimiz eğitimleri de tamamladık.</p>

      <p>Menderes Belediyesi artık altyapı, imar ve emlak verilerini dijital ortamda, harita destekli olarak yönetebilecek. Katılım gösteren ve projeye destek veren herkese teşekkür ederiz.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    features: ["Menderes Belediyesi", "Proje Teslimi", "CBS", "İzmir"],
    isVisible: true,
    publishedAt: new Date("2020-04-20")
  },
  {
    title: "Osmaneli Belediyesi’nde Coğrafi Bilgi Sistemi",
    slug: "osmaneli-belediyesi-cbs-projesi",
    shortDescription: "Tarihi Osmaneli kentinde, belediyenin e-Dönüşüm çalışmaları kapsamında Açık Kaynak Kodlu CBS ürünlerimiz tercih edildi.",
    content: `
      <h2>Tarihi Kent Osmaneli, Teknolojiyle Buluştu</h2>
      <p>Tarihimizin canlı şahidi, Bilecik ilimizin güzide ilçesi olan Osmaneli kentinde, <strong>Osmaneli Belediyesi</strong> e-Dönüşüm çalışmaları kapsamında Coğrafi Bilgi Sistemleri konusunda çözüm ortağı olarak <strong>MOSK Bilişim Teknolojileri LTD. ŞTİ.</strong>'yi tercih etti.</p>

      <h3>Açık Kaynak Kod ve Sınırsız Kullanıcı</h3>
      <p>Firmamız bünyesinde tamamı <strong>Açık Kaynak Kod (Open Source)</strong> teknolojileri ile geliştirilen, lisans maliyeti gerektirmeyen ve kullanıcı sınırı olmayan uygulamalarımız kurum bünyesinde devreye alınmıştır. Bu sayede belediyemizin kurum içi ve kurum dışı sunduğu hizmetlerin daha hızlı, aktif ve verimli hale getirilmesi amaçlanmıştır. Tarihi dokuyu korurken teknolojinin imkanlarından faydalanan Osmaneli Belediyesi'ni tebrik eder, proje paydaşımız olan belediye çalışanlarına katkılarından dolayı teşekkür ederiz.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1565514020176-db7122831b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    features: ["Osmaneli Belediyesi", "Açık Kaynak", "e-Dönüşüm", "Tarihi Kent"],
    isVisible: true,
    publishedAt: new Date("2020-05-15")
  },
  {
    title: "Germencik Belediyesi’nde Coğrafi Bilgi Sistemi",
    slug: "germencik-belediyesi-cbs-portal",
    shortDescription: "Aydın Germencik Belediyesi için özel olarak geliştirdiğimiz, açık kaynak kodlu CBS portalımızı devreye aldık.",
    content: `
      <h2>Germencik İçin Özel CBS Çözümü</h2>
      <p>Çok değerli Aydın ilimizin eşsiz ilçesi olan Germencik kenti için özel olarak geliştirdiğimiz <strong>Coğrafi Bilgi Sistemi</strong> portalımızı <strong>MOSK Bilişim Teknolojileri LTD. ŞTİ.</strong> olarak devreye almanın mutluluğunu yaşıyoruz.</p>

      <h3>Hızlı ve Güvenilir Hizmet</h3>
      <p>Bu süreçte e-Dönüşüm çalışmaları kapsamında firmamızı tercih eden Germencik belediyemizin, hem kurum içi işleyişinde hem de vatandaşlara sunduğu hizmetlerde, sistemimizin getirdiği yenilikler sayesinde işlemlerin çok daha hızlı ve güvenilir olması hedeflenmiştir.</p>

      <h3>Çözüm Odaklı Yaklaşım</h3>
      <p>Tamamını <strong>Açık Kaynak Kod (Open Source)</strong> teknolojileri ile geliştirdiğimiz ve sınırsız kullanıcı yetkisi ile donattığımız sistemimiz, belediye bütçesine yük getirmeden maksimum verim sağlamaktadır. Belediye sistemlerine daha çözüm odaklı yaklaşan firmamız, sunduğu hizmet ile işleyişi modernize etmiştir. Proje paydaşımız olan ve eğitimlerini de tamamladığımız Germencik Belediyesi çalışanlarına projeye gösterdikleri katkılarından dolayı teşekkür ederiz.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1274&q=80",
    features: ["Germencik Belediyesi", "Özel Portal", "Aydın", "Open Source"],
    isVisible: true,
    publishedAt: new Date("2020-06-10")
  },
  {
    title: "Orhaneli Belediyesi’nde Coğrafi Bilgi Sistemi",
    slug: "orhaneli-belediyesi-cbs-2023-vizyonu",
    shortDescription: "Orhaneli Belediyesi'nde kurulu CBS platformumuzun 2023 vizyonu ve yeni yetenekleri için geliştirme toplantısı gerçekleştirdik.",
    content: `
      <h2>Orhaneli'de CBS Vizyonu Büyüyor</h2>
      <p>Tarihiyle kültürümüzde özel bir yere sahip olan, doğasıyla Bursa'mızın en güzel ilçelerinden biri olan <strong>Orhaneli</strong>'de geliştirdiğimiz ve devreye aldığımız Coğrafi Bilgi Sistemi platformu için bir araya geldik. Mevcut sistemin başarısını daha da ileriye taşımak adına, 2023 planlarımızın ve sisteme eklenecek yeni yeteneklerin görüşüldüğü verimli bir iyileştirme toplantısı gerçekleştirdik.</p>

      <p>Teknolojinin hızla geliştiği günümüzde, sistemlerimizi sürekli güncel tutarak belediyemizin ihtiyaçlarına en hızlı şekilde cevap vermeyi sürdürüyoruz. Değerli Orhaneli Belediyesi çalışanlarına misafirperverlikleri ve süregelen işbirlikleri için teşekkür ederiz.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1332&q=80",
    features: ["Orhaneli Belediyesi", "Sistem Geliştirme", "2023 Vizyonu", "Bursa"],
    isVisible: true,
    publishedAt: new Date("2022-11-20")
  },
  {
    title: "Uludağ Üniversitesi’nde Coğrafi Bilgi Sistemleri Etkinliği",
    slug: "uludag-universitesi-cbs-gunu-etkinligi",
    shortDescription: "Dünya CBS Günü kapsamında Uludağ Üniversitesi Coğrafya Bölümü'nün düzenlediği etkinliğe Mosk Bilişim olarak katılım sağladık.",
    content: `
      <h2>Akademi ve Sektör Buluşması: Uludağ Üniversitesi CBS Etkinliği</h2>
      <p>Her yıl Kasım ayının 3. haftasında kutlanan <strong>Dünya Coğrafi Bilgi Sistemleri (CBS) Günü</strong>'ne özel olarak, Uludağ Üniversitesi Fen-Edebiyat Fakültesi Coğrafya Bölümü tarafından hazırlanan etkinliğe, <strong>MOSK Bilişim Teknolojileri LTD. ŞTİ.</strong> ailesi olarak katılım gösterdik.</p>

      <h3>Geleceğin Meslektaşlarıyla Bir Arada</h3>
      <p>Uzman akademisyenler ve sektör profesyonellerinin anlatımıyla, coğrafi bilgi sistemlerine ait dünyada ve Türkiye’de yürütülen çalışmaların, son trendlerin ve teknolojilerin konuşulduğu bu etkinlik, öğrenciler için büyük bir vizyon kaynağı oldu. Bizler de sektördeki tecrübelerimizi genç arkadaşlarımızla paylaşma fırsatı bulduk. Bu güzel organizasyonda emeklerinden dolayı Uludağ Üniversitesi Coğrafya Bölümü'ndeki öğrenci arkadaşlarımıza ve hocalarımıza teşekkür ederiz.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    features: ["Uludağ Üniversitesi", "CBS Günü", "Öğrenci Etkinliği", "Akademi"],
    isVisible: true,
    publishedAt: new Date("2022-11-16")
  },
  {
    title: "Sındırgı Belediyesi’nde E-Dönüşüm Çalışmaları(CBS)",
    slug: "sindirgi-belediyesi-plangml-ve-cbs",
    shortDescription: "PlanGML projesini tamamladığımız Sındırgı Belediyesi ile e-Dönüşüm ve CBS konularında değerlendirme toplantısı yaptık.",
    content: `
      <h2>Sındırgı'da Dijital Dönüşüm Hamlesi</h2>
      <p>Daha önce <strong>PlanGML</strong> projesini başarıyla tamamladığımız Balıkesir'in Sındırgı Belediyesi ile iş birliğimizi bir adım öteye taşıyoruz. E-Dönüşüm çalışmaları kapsamında, coğrafi bilgi sistemleri konusunda mevcut durumun değerlendirilmesi ve geliştirilecek yeni projeler üzerine kapsamlı bir toplantı gerçekleştirdik.</p>

      <p>Doğal Şehir Sındırgı'nın teknolojik altyapısını güçlendirmek ve vatandaşlara sunulan hizmet kalitesini artırmak adına atılacak adımları planladık. Kendilerine misafirperverlikleri ve kıymetli vakitlerini bize ayırdıkları için Sındırgı Belediyesi yönetimine teşekkürlerimizi sunuyoruz.</p>
    `,
    bgImage: "https://images.unsplash.com/photo-1444653614773-995cb74600f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    features: ["Sındırgı Belediyesi", "PlanGML", "e-Dönüşüm", "Proje Toplantısı"],
    isVisible: true,
    publishedAt: new Date("2023-01-15")
  }
];

async function main() {
  console.log('Start seeding news...');

  for (let i = 0; i < news.length; i++) {
    const item = news[i];
    
    // Check if news exists
    const existing = await prisma.news.findUnique({
      where: { slug: item.slug }
    });

    if (existing) {
      console.log(`News already exists: ${item.title}, updating...`);
      await prisma.news.update({
        where: { id: existing.id },
        data: {
          ...item,
          order: i // Update order
        }
      });
    } else {
      console.log(`Creating news: ${item.title}`);
      await prisma.news.create({
        data: {
          ...item,
          order: i
        }
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
