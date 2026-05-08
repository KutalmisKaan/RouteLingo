# Gereksinim Analizi Dokümanı

**Proje Adı:** RouteLingo Uzay Akademisi (Oyunlaştırılmış Yabancı Dil Öğrenme Uygulaması)
**Proje Amacı:** Kullanıcıların yabancı dil kelimelerini oyunlaştırma öğeleri (XP, Can, Seviye Sistemi) eşliğinde interaktif olarak öğrenmesini sağlamak.

**Fonksiyonel Gereksinimler:**
1. Kullanıcı, adı ve soyadı ile sisteme kayıt olabilmelidir (Kimlik Yönetimi).
2. Sistem, 9 farklı zorluk seviyesine sahip "Evren" barındırmalıdır.
3. Kullanıcı ilk evrenden başlamalı ve evrendeki görevleri bitirmeden diğer evrene geçememelidir (Kilitleme Algoritması).
4. Her evrende sırasıyla; Kelime Kartları, Çoktan Seçmeli Test (Quiz) ve Cümle Kurma aktiviteleri yapılmalıdır.
5. Kullanıcı test veya cümle kurmada hata yaptığında "Can (Kalp)" hakkından düşmeli, canı bittiğinde aktivite iptal olmalıdır.
6. Başarıyla tamamlanan her aktiviteden "XP (Tecrübe Puanı)" kazanılmalıdır.

**Fonksiyonel Olmayan Gereksinimler:**
1. Uygulama modüler bir mimaride (Component Bazlı) tasarlanmalıdır.
2. Sınıf tabanlı OOP (Nesne Yönelimli Programlama) kullanılarak veri güvenliği (Encapsulation) sağlanmalıdır.
3. Uygulama mobil uyumlu olmalı ve hata fırlatma (Try-Catch) mekanizmaları barındırmalıdır.
