const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const services = [
  {
    title: "MOBİL UYGULAMA YAZILIM GELİŞTİRME",
    shortTitle: "Mobil Uygulama",
    shortDescription: "iOS ve Android platformlarında, 7/24 kesintisiz hizmet sunan, etkileyici ve kullanışlı mobil belediye uygulamaları geliştiriyoruz.",
    slug: "mobil-uygulama-yazilim-gelistirme",
    icon: "Smartphone",
    bgImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    content: `
      <h2 style="text-align: center; color: #2c3e50;">MOBİL DÜNYADA YERİNİZİ ALIN</h2>
      <p style="font-size: 1.1em; line-height: 1.6; text-align: justify;">
        Mosk Bilişim Teknolojileri olarak, <strong>iOS</strong> ve <strong>Android</strong> platformlarında geliştirdiğimiz "Mobil Belediyecilik Uygulaması" ile belediyecilik hizmetlerini vatandaşların cebine taşıyoruz. 
        7/24 kesintisiz erişim imkanı sunan bu uygulamalar, modern arayüzleri ve kullanıcı dostu yapılarıyla vatandaş memnuniyetini en üst seviyeye çıkarıyor.
      </p>

      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

      <h3 style="color: #e67e22;">NEDEN MOBİL BELEDİYE?</h3>
      <p style="font-size: 1em; line-height: 1.6;">
        Mobil uygulamalarımız, klasik belediyecilik hizmetlerinin ötesine geçerek interaktif bir iletişim kanalı oluşturur. Vatandaşlarınız, belediye binasına gelmeden birçok işlemi saniyeler içinde gerçekleştirebilir.
      </p>

      <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
        <div style="flex: 1; min-width: 300px; background: #f8f9fa; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <h4 style="color: #34495e; margin-top: 0;">Mekandan Bağımsız Erişim</h4>
          <p>Vatandaşlar ile Belediye arasındaki iletişimi zaman ve mekan kısıtlamasından kurtarır. Her an, her yerden erişim imkanı sağlar.</p>
        </div>
        <div style="flex: 1; min-width: 300px; background: #f8f9fa; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <h4 style="color: #34495e; margin-top: 0;">Yüksek Kullanım Oranı</h4>
          <p>Özel olarak tasarlanan modern ve sade arayüzü sayesinde, her yaş grubundan vatandaşın kolayca kullanabileceği bir deneyim sunar.</p>
        </div>
      </div>

      <h3 style="color: #e67e22; margin-top: 40px;">ÖNE ÇIKAN ÖZELLİKLER</h3>
      <ul style="list-style-type: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
        <li style="background: #fff; padding: 15px; border-left: 4px solid #e67e22; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <strong>E-Belediye Entegrasyonu:</strong> Borç sorgulama ve güvenli ödeme işlemleri.
        </li>
        <li style="background: #fff; padding: 15px; border-left: 4px solid #e67e22; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <strong>Çek & Gönder:</strong> İstek ve şikayetlerin fotoğraflı olarak iletilmesi.
        </li>
        <li style="background: #fff; padding: 15px; border-left: 4px solid #e67e22; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <strong>Haberler & Duyurular:</strong> Belediyeden güncel gelişmelerin anlık bildirimi.
        </li>
        <li style="background: #fff; padding: 15px; border-left: 4px solid #e67e22; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <strong>Nöbetçi Eczane & Ulaşım:</strong> Günlük hayatı kolaylaştıran rehber hizmetleri.
        </li>
      </ul>

      <div style="background-color: #eef2f7; padding: 25px; border-radius: 10px; margin-top: 40px;">
        <h3 style="color: #2980b9; margin-top: 0;">GELİŞTİRME SÜRECİMİZ</h3>
        <p>Projelerimizi, uluslararası standartlarda yazılım geliştirme metodolojileri ile yönetiyoruz:</p>
        <ol style="margin-left: 20px;">
          <li style="margin-bottom: 10px;"><strong>Analiz:</strong> Gereksinimlerin ve hedeflerin belirlenmesi.</li>
          <li style="margin-bottom: 10px;"><strong>Tasarım:</strong> UI/UX prensiplerine uygun arayüz tasarımı.</li>
          <li style="margin-bottom: 10px;"><strong>Kodlama:</strong> En güncel teknolojilerle güvenli yazılım geliştirme.</li>
          <li style="margin-bottom: 10px;"><strong>Test:</strong> Performans ve güvenlik testlerinin yapılması.</li>
          <li style="margin-bottom: 10px;"><strong>Teslim & Bakım:</strong> Uygulamanın yayınlanması ve sürekli teknik destek.</li>
        </ol>
      </div>
    `,
    features: ["iOS & Android", "E-Belediye Entegrasyonu", "7/24 Ödeme", "İstek-Şikayet Modülü", "Nöbetçi Eczane", "Çek Gönder"],
    isVisible: true
  },
  {
    title: "COĞRAFİ BİLGİ SİSTEMLERİ ( GIS )",
    shortTitle: "CBS (GIS)",
    shortDescription: "Planlanabilir bir gelecek için uluslararası standartlarda, kullanıcı dostu ve sürdürülebilir Coğrafi Bilgi Sistemleri (CBS) çözümleri.",
    slug: "cografi-bilgi-sistemleri",
    icon: "Map",
    bgImage: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1631&q=80",
    content: `
      <h2 style="text-align: center; color: #2c3e50;">PLANLANABİLİR BİR GELECEK İÇİN CBS</h2>
      <p style="font-size: 1.1em; line-height: 1.6; text-align: justify;">
        Uluslararası standartlarda ve ihtiyaçlarınıza özel, geliştirilebilir arayüze sahip <strong>Açık Kaynak Kodlu</strong> sistemler kuruyoruz. 
        Performans kriterlerini göz önünde bulundurarak, kullanıcı dostu Coğrafi Bilgi Sistemleri (CBS) kurulumu gerçekleştiriyoruz.
      </p>

      <div style="display: flex; align-items: center; background: #fff8e1; padding: 20px; border-radius: 8px; border-left: 5px solid #ffc107; margin: 30px 0;">
        <p style="margin: 0; color: #7f8c8d;">
          <em>"Sürdürülebilir ve yönetilebilir sistemler kurarak, kurumların uzun yıllar ihtiyaçlarını karşılayabilecekleri ve zaman içerisinde esnek geliştirmeler yapabilecekleri modellemeler sunuyoruz."</em>
        </p>
      </div>

      <h3 style="color: #27ae60;">HİZMET KAPSAMIMIZ</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
        <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; transition: transform 0.2s;">
          <h4 style="margin-top: 0; color: #2c3e50;">🌍 Veri Yönetimi</h4>
          <p>Verilerinizin analizi, düzenlenmesi ve ilişkisel veritabanı yönetim sistemlerinin (RDBMS) tasarımı.</p>
        </div>
        <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; transition: transform 0.2s;">
          <h4 style="margin-top: 0; color: #2c3e50;">🖥️ Sunucu & Altyapı</h4>
          <p>Coğrafi sunucu (GeoServer vb.) tasarımı, kurulumu ve optimizasyonu.</p>
        </div>
        <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; transition: transform 0.2s;">
          <h4 style="margin-top: 0; color: #2c3e50;">🗺️ Harita Entegrasyonu</h4>
          <p>Altlık verilerin hazırlanması, WMS/WFS servislerinin yapılandırılması ve entegrasyonu.</p>
        </div>
        <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; transition: transform 0.2s;">
          <h4 style="margin-top: 0; color: #2c3e50;">💻 Arayüz Geliştirme</h4>
          <p>Kullanıcı dostu web ve mobil CBS arayüzlerinin tasarımı ve geliştirilmesi.</p>
        </div>
      </div>

      <h3 style="color: #27ae60; margin-top: 40px;">NEDEN BİZ?</h3>
      <ul style="line-height: 1.8;">
        <li><strong>Açık Kaynak Gücü:</strong> Lisans maliyetlerini minimize eden, güvenilir açık kaynak çözümler.</li>
        <li><strong>Ölçeklenebilirlik:</strong> İhtiyaçlarınızla birlikte büyüyebilen esnek mimari.</li>
        <li><strong>Tam Destek:</strong> Kurulum sonrası bakım, destek ve danışmanlık hizmetleri.</li>
      </ul>
    `,
    features: ["Açık Kaynak Kodlu", "Kullanıcı Dostu", "Sürdürülebilir", "Yönetilebilir", "Veri Analizi", "Sunucu Kurulumu"],
    isVisible: true
  },
  {
    title: "WEB PORTAL TASARIM & GELİŞTİRME",
    shortTitle: "Web Portal",
    shortDescription: "Kurumsal kimliğinize uygun, özgün, kullanıcı dostu ve yenilikçi web tasarım ve geliştirme çözümleri.",
    slug: "web-portal-tasarim-gelistirme",
    icon: "Layout",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1115&q=80",
    content: `
      <h2 style="text-align: center; color: #2c3e50;">ÖZGÜN VE TEKNOLOJİK TASARIMLAR</h2>
      <p style="font-size: 1.1em; line-height: 1.6; text-align: justify;">
        Mosk Bilişim Teknolojileri olarak, firmanızın kurumsal kimliğini dijital dünyaya en doğru şekilde yansıtıyoruz. 
        <strong>Özgün</strong>, <strong>kullanıcı dostu</strong> ve <strong>yenilikçi</strong> tasarımlarımızla, markanızın dijital varlığını güçlendiriyoruz.
      </p>

      <div style="display: flex; gap: 30px; margin: 40px 0; align-items: center;">
        <div style="flex: 1;">
          <h3 style="color: #8e44ad;">SÜREÇ YÖNETİMİ</h3>
          <p>Tasarım ve kodlamanın tüm adımlarında sizlerle etkileşim halindeyiz. Her aşamada onayınızı alarak, sürprizlere yer vermeyen şeffaf bir süreç yürütüyoruz.</p>
          <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
              <span style="position: absolute; left: 0; color: #8e44ad;">✔</span> Tanışma ve Beklentilerin Analizi
            </li>
            <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
              <span style="position: absolute; left: 0; color: #8e44ad;">✔</span> Proje Planlaması & Wireframe
            </li>
            <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
              <span style="position: absolute; left: 0; color: #8e44ad;">✔</span> UI/UX Tasarım & Onay
            </li>
            <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
              <span style="position: absolute; left: 0; color: #8e44ad;">✔</span> Kodlama & CMS Entegrasyonu
            </li>
          </ul>
        </div>
        <div style="flex: 1; background: #f4f6f7; padding: 25px; border-radius: 10px; text-align: center;">
          <h4 style="color: #2c3e50;">Müşteri Memnuniyeti</h4>
          <p style="font-size: 0.9em; color: #7f8c8d;">
            "Proje teslimi bizim için bir son değil, uzun soluklu bir işbirliğinin başlangıcıdır. Kesintisiz destek hizmetimizle her zaman yanınızdayız."
          </p>
        </div>
      </div>

      <h3 style="color: #8e44ad;">TEKNİK YETKİNLİKLERİMİZ</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
        <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">Responsive Tasarım</div>
        <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">SEO Uyumluluğu</div>
        <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">Yüksek Hız</div>
        <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">Güçlü Yönetim Paneli</div>
        <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">Güvenlik</div>
        <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">Sosyal Medya Entegrasyonu</div>
      </div>
    `,
    features: ["Özgün Tasarım", "Kullanıcı Dostu", "Yenilikçi", "Etkileşimli Süreç", "Kesintisiz Destek", "Yönetim Paneli"],
    isVisible: true
  },
  {
    title: "DANIŞMANLIK HİZMETLERİ",
    shortTitle: "Danışmanlık",
    shortDescription: "Kamu Kurumları ve Belediyeler için Yönetim Bilgi Sistemleri, CBS ve Bilişim Yatırımları konularında profesyonel danışmanlık.",
    slug: "danismanlik-hizmetleri",
    icon: "Briefcase",
    bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    content: `
      <h2 style="text-align: center; color: #2c3e50;">İŞBİRLİĞİ VE SİNERJİ</h2>
      <p style="font-size: 1.1em; line-height: 1.6; text-align: justify;">
        Edindiğimiz tecrübeler ışığında Kamu Kurumları ve Belediyelere; Yönetim Bilgi Sistemleri, Coğrafi Bilgi Sistemleri, Bilişim Yatırımları ve Saha Projeleri konularında 
        <strong>anahtar teslim çözümlerin</strong> yanında <strong>Profesyonel Danışmanlık Hizmetleri</strong> de sunmaktayız.
      </p>

      <div style="margin: 40px 0;">
        <h3 style="color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 10px; display: inline-block;">HİZMET YAKLAŞIMIMIZ</h3>
        <p>Kurumların yatırım süreçlerinden başlayarak, geleceği karşılayabilecek teknolojilerin seçiminden, projelerinin hayata geçirilmesine ve proje sürekliliğinin sağlanmasına kadar bütün süreçlerde deneyimlerimizi profesyonel bakış açısı ile destekleyerek hizmet sunuyoruz.</p>
      </div>

      <div style="background-color: #fdf2e9; padding: 30px; border-radius: 12px;">
        <h3 style="color: #d35400; text-align: center; margin-top: 0;">UZMANLIK ALANLARIMIZ</h3>
        <ul style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; list-style: none; padding: 0;">
          <li style="background: #fff; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <strong>📌 Kurumsal Danışmanlık</strong>
          </li>
          <li style="background: #fff; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <strong>📌 Teknik Danışmanlık</strong>
          </li>
          <li style="background: #fff; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <strong>📌 Proje Bazlı Danışmanlık</strong>
          </li>
          <li style="background: #fff; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <strong>📌 Bilişim Yatırım Danışmanlığı</strong>
          </li>
          <li style="background: #fff; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <strong>📌 CBS İş Süreçleri Danışmanlığı</strong>
          </li>
          <li style="background: #fff; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <strong>📌 Saha Operasyon Danışmanlığı</strong>
          </li>
        </ul>
      </div>

      <p style="margin-top: 30px; text-align: center; font-style: italic; color: #7f8c8d;">
        "Alanında uzman, üst seviyede yetkin ve birçok benzer proje deneyimine sahip ekibimizle yanınızdayız."
      </p>
    `,
    features: ["Yönetim Bilgi Sistemleri", "Bilişim Yatırımları", "Saha Projeleri", "Teknik Danışmanlık", "Süreç Danışmanlığı"],
    isVisible: true
  },
  {
    title: "WEB TABANLI YAZILIM GELİŞTİRME",
    shortTitle: "Web Yazılım",
    shortDescription: "Hayal edin, tasarlayın, öne çıkarın. Uluslararası standartlarda, ihtiyaçlarınıza özel web tabanlı yazılım çözümleri.",
    slug: "web-tabanli-yazilim-gelistirme",
    icon: "Code",
    bgImage: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    content: `
      <h2 style="text-align: center; color: #2c3e50;">HAYAL ET, TASARLA, ÖNE ÇIKAR</h2>
      <p style="font-size: 1.1em; line-height: 1.6; text-align: justify;">
        Yazılım geliştirme süreçlerinde uluslararası standartlarda, müşterilerimizin ihtiyaçları doğrultusunda şekillenen çözümler üretiyoruz. 
        Geliştirdiğimiz yazılımları sadece bir "ürün" olarak değil, yaşayan ve gelişen <strong>sürdürülebilir projeler</strong> olarak değerlendiriyoruz.
      </p>

      <div style="background: #e8f8f5; border-left: 5px solid #1abc9c; padding: 20px; margin: 30px 0;">
        <h3 style="color: #16a085; margin-top: 0;">PROJE YAKLAŞIMIMIZ</h3>
        <p>
          Her aşamada belgelendirme ve düzenli bilgilendirme yaparak paydaşlarımızı sürecin içine dahil ediyoruz. 
          İşin kapsamı ve planlanmasıyla başlayan sürecimiz, ön analiz, kullanıcı dostu arayüz tasarımı, kodlama ve test aşamalarıyla devam eder.
        </p>
      </div>

      <h3 style="color: #16a085;">METODOLOJİMİZ</h3>
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 15px; text-align: center;">
        <div style="flex: 1; min-width: 100px; background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <div style="font-size: 2em; color: #1abc9c;">1</div>
          <div style="font-weight: bold;">Analiz</div>
        </div>
        <div style="flex: 1; min-width: 100px; background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <div style="font-size: 2em; color: #1abc9c;">2</div>
          <div style="font-weight: bold;">Kodlama</div>
        </div>
        <div style="flex: 1; min-width: 100px; background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <div style="font-size: 2em; color: #1abc9c;">3</div>
          <div style="font-weight: bold;">Test</div>
        </div>
        <div style="flex: 1; min-width: 100px; background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <div style="font-size: 2em; color: #1abc9c;">4</div>
          <div style="font-weight: bold;">Teslim</div>
        </div>
        <div style="flex: 1; min-width: 100px; background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <div style="font-size: 2em; color: #1abc9c;">5</div>
          <div style="font-weight: bold;">Destek</div>
        </div>
      </div>

      <p style="margin-top: 30px;">
        Yazılımın yaşam döngüsü boyunca; değişen müşteri ihtiyaçları, teknolojik güncellemeler veya iş yapış şekillerindeki farklılıklar için 
        <strong>bakım ve garanti süresi</strong> kapsamında kesintisiz destek ve eğitim sağlıyoruz.
      </p>
    `,
    features: ["Uluslararası Standartlar", "Sürdürülebilir Proje", "Kullanıcı Dostu", "Kesintisiz Destek", "Özel Çözümler"],
    isVisible: true
  },
  {
    title: "GELİR ARTIRICI ÇALIŞMALAR ( GAÇ )",
    shortTitle: "Gelir Artırıcı (GAÇ)",
    shortDescription: "Vergide adaleti sağlamak ve belediye gelirlerini artırmak için vergi kayıp ve kaçak tespiti çalışmaları.",
    slug: "gelir-artirici-calismalar",
    icon: "TrendingUp",
    bgImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1111&q=80",
    content: `
      <h2 style="text-align: center; color: #2c3e50;">VERGİDE ADALETİ SAĞLAMAK</h2>
      <p style="font-size: 1.1em; line-height: 1.6; text-align: justify;">
        Belediyelerin hizmet sınırları içerisindeki taşınmazlar ve vergiye tabi diğer unsurlar için <strong>nitelikli ve güncel veri</strong> hayati önem taşır. 
        Amacımız, vergisini düzenli ödeyen vatandaşların hakkını korumak ve vergi adaletini tesis etmektir.
      </p>

      <div style="display: flex; gap: 30px; margin: 40px 0;">
        <div style="flex: 1;">
          <h3 style="color: #c0392b;">SORUN NEDİR?</h3>
          <p>
            Vergisini nizami ödeyen mükelleflerin yanı sıra, hiç beyanda bulunmamış (kaçak) veya eksik beyanda bulunmuş (nitelik kaçağı) mükellefler belediye gelirlerinde önemli kayıplara neden olmaktadır.
          </p>
        </div>
        <div style="flex: 1;">
          <h3 style="color: #27ae60;">ÇÖZÜMÜMÜZ</h3>
          <p>
            Mevzuat gereği belediyelerin sorumluluğunda olan bu tespitleri, geliştirdiğimiz teknolojik altyapı ve saha çalışmalarıyla gerçekleştiriyoruz.
          </p>
        </div>
      </div>

      <div style="background-color: #f9ebea; padding: 25px; border-radius: 10px; border: 1px solid #e6b0aa;">
        <h3 style="color: #c0392b; text-align: center; margin-top: 0;">PROJE KAZANIMLARI</h3>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-bottom: 10px; display: flex; align-items: center;">
            <span style="background: #c0392b; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-right: 10px;">✓</span>
            Vergi kayıp ve kaçaklarının tespiti ve önlenmesi için kalıcı sistem kurulumu.
          </li>
          <li style="margin-bottom: 10px; display: flex; align-items: center;">
            <span style="background: #c0392b; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-right: 10px;">✓</span>
            Belediye gelirlerinin "Vergide Adalet" ilkesiyle artırılması.
          </li>
          <li style="margin-bottom: 10px; display: flex; align-items: center;">
            <span style="background: #c0392b; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-right: 10px;">✓</span>
            Kurum verilerinin analizi, temizlenmesi ve güncellenmesi.
          </li>
          <li style="margin-bottom: 10px; display: flex; align-items: center;">
            <span style="background: #c0392b; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-right: 10px;">✓</span>
            Tapu verileriyle entegrasyon ve çapraz kontroller.
          </li>
          <li style="margin-bottom: 10px; display: flex; align-items: center;">
            <span style="background: #c0392b; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-right: 10px;">✓</span>
            Detaylı raporlama ve yönetici özetleri.
          </li>
        </ul>
      </div>
    `,
    features: ["Vergi Adaleti", "Kayıp Kaçak Tespiti", "Veri Güncelleme", "Tapu Entegrasyonu", "Raporlama"],
    isVisible: true
  },
  {
    title: "VERİ MADENCİLİĞİ HİZMETLERİ",
    shortTitle: "Veri Madenciliği",
    shortDescription: "Verilere kulak verin, doğru kararlar alın. Büyük veri kümelerini analiz ederek kurumlar için paha biçilemez kazanımlar sağlıyoruz.",
    slug: "veri-madenciligi-hizmetleri",
    icon: "Database",
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    content: `
      <h2 style="text-align: center; color: #2c3e50;">VERİLERE KULAK VERİN, DOĞRU KARARLAR ALIN</h2>
      <p style="font-size: 1.1em; line-height: 1.6; text-align: justify;">
        Kamu kurumları ve belediyelerde yıllar içinde biriken devasa veri kümeleri, doğru analiz edildiğinde paha biçilemez bir hazineye dönüşür. 
        Geçmiş verilerin analiziyle geleceğe yönelik doğru projeksiyonlar oluşturmak, ancak <strong>Veri Madenciliği</strong> algoritmalarıyla mümkündür.
      </p>

      <div style="background: linear-gradient(to right, #2980b9, #3498db); padding: 30px; border-radius: 10px; color: white; margin: 30px 0; text-align: center;">
        <h3 style="margin-top: 0; color: white;">AKILLI YAZILIM ARAÇLARI</h3>
        <p style="font-size: 1.1em;">
          Mosk Bilişim olarak geliştirdiğimiz akıllı araçlarla; kaynakların doğru kullanımını sağlıyor, pasif kaynakları ortaya çıkarıyor ve stratejik planlamalara yön veriyoruz.
        </p>
      </div>

      <div style="display: flex; gap: 30px; margin-bottom: 30px;">
        <div style="flex: 1;">
          <h3 style="color: #2980b9;">GELECEĞİN KENTLERİ</h3>
          <p>"Akıllı Şehir" kavramının hayal olmaktan çıkması, veriye dayalı karar alma mekanizmalarıyla mümkündür. Doğru ve güncel veri, doğru yatırımların temel taşıdır.</p>
        </div>
      </div>

      <h3 style="color: #2980b9;">HİZMET ADIMLARIMIZ</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
        <div style="background: #f4f6f7; padding: 15px; border-radius: 5px; border-left: 4px solid #2980b9;">
          <strong>🔍 Veri Analizi ve Yorumlama</strong>
        </div>
        <div style="background: #f4f6f7; padding: 15px; border-radius: 5px; border-left: 4px solid #2980b9;">
          <strong>📊 Dış Kurum Veri Entegrasyonu</strong>
        </div>
        <div style="background: #f4f6f7; padding: 15px; border-radius: 5px; border-left: 4px solid #2980b9;">
          <strong>📝 Saha Verilerinin Toplanması</strong>
        </div>
        <div style="background: #f4f6f7; padding: 15px; border-radius: 5px; border-left: 4px solid #2980b9;">
          <strong>⚡ Akıllı Çakıştırma Analizleri</strong>
        </div>
        <div style="background: #f4f6f7; padding: 15px; border-radius: 5px; border-left: 4px solid #2980b9;">
          <strong>📈 Sonuç Raporlama</strong>
        </div>
        <div style="background: #f4f6f7; padding: 15px; border-radius: 5px; border-left: 4px solid #2980b9;">
          <strong>🔄 Güncelleme Mekanizmaları</strong>
        </div>
      </div>
    `,
    features: ["Büyük Veri Analizi", "Akıllı Yazılım Araçları", "Gelecek Projeksiyonu", "Akıllı Şehir", "Veri Entegrasyonu"],
    isVisible: true
  },
  {
    title: "AKILLANDIRMA / SAYISALLAŞTIRMA HİZMETLERİ",
    shortTitle: "Akıllandırma & Sayısallaştırma",
    shortDescription: "Gelecek için Akıllı Kentler. Verilerinizi akıllandırarak Coğrafi Bilgi Sistemlerine entegre ediyoruz.",
    slug: "akillandirma-sayisallastirma-hizmetleri",
    icon: "Cpu",
    bgImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    content: `
      <h2 style="text-align: center; color: #2c3e50;">GELECEK İÇİN AKILLI KENTLER</h2>
      <p style="font-size: 1.1em; line-height: 1.6; text-align: justify;">
        Coğrafi Bilgi Sistemlerinin (CBS) gerçek gücü, <strong>akıllandırılmış veri</strong> ile ortaya çıkar. 
        Büyük hacimli coğrafi verilerin toplanması, işlenmesi ve analizi; sosyal, ekonomik ve çevresel kararların alınmasında kilit rol oynar.
      </p>

      <div style="display: flex; gap: 40px; margin: 40px 0;">
        <div style="flex: 1; text-align: center;">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80" style="border-radius: 50%; width: 150px; height: 150px; object-fit: cover; margin-bottom: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h3 style="color: #8e44ad;">Veri Akıllandırma Nedir?</h3>
          <p>Grafik (coğrafi) veriler ile sözel (öznitelik) veriler arasında bağlantı kurarak; veriyi sorgulanabilir, analiz edilebilir ve raporlanabilir hale getirme işlemidir.</p>
        </div>
        <div style="flex: 1; text-align: center;">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80" style="border-radius: 50%; width: 150px; height: 150px; object-fit: cover; margin-bottom: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h3 style="color: #8e44ad;">Sağladığı Yararlar</h3>
          <p>İş verimliliğini artırır, zaman kaybını önler, doğru analiz imkanı sunar ve yöneticilere karar verme süreçlerinde stratejik destek sağlar.</p>
        </div>
      </div>

      <h3 style="color: #8e44ad; border-bottom: 1px solid #ddd; padding-bottom: 10px;">HİZMET ALANLARIMIZ</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        <ul style="list-style-type: disc; padding-left: 20px;">
          <li style="margin-bottom: 8px;">Kadastral Veri Akıllandırılması</li>
          <li style="margin-bottom: 8px;">İmar Planı Veri Akıllandırılması</li>
          <li style="margin-bottom: 8px;">Halihazır Harita Veri Akıllandırılması</li>
          <li style="margin-bottom: 8px;">Altyapı Veri Akıllandırılması</li>
        </ul>
        <ul style="list-style-type: disc; padding-left: 20px;">
          <li style="margin-bottom: 8px;">Numarataj Veri Akıllandırılması</li>
          <li style="margin-bottom: 8px;">Fen İşleri Veri Akıllandırılması</li>
          <li style="margin-bottom: 8px;">Fotogrametrik Veri Akıllandırılması</li>
          <li style="margin-bottom: 8px;">Metinsel Veri Akıllandırılması</li>
        </ul>
      </div>
    `,
    features: ["Akıllı Kentler", "Veri Akıllandırma", "Karar Destek", "Mekansal Analiz", "Verimlilik Artışı"],
    isVisible: true
  }
];

async function main() {
  console.log('Start seeding services...');

  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    
    // Check if service exists
    const existing = await prisma.service.findUnique({
      where: { slug: service.slug }
    });

    if (existing) {
      console.log(`Service already exists: ${service.title}, updating...`);
      await prisma.service.update({
        where: { id: existing.id },
        data: {
          ...service,
          order: i // Update order
        }
      });
    } else {
      console.log(`Creating service: ${service.title}`);
      await prisma.service.create({
        data: {
          ...service,
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
