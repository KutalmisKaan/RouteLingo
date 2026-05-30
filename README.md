# RouteLingo - Uzay Akademisi 🚀

## a) Proje Adı
**RouteLingo Uzay Akademisi** (Oyunlaştırılmış Yabancı Dil Öğrenme Uygulaması)

## b) Proje Amacı
Kullanıcıların yabancı dil kelimelerini oyunlaştırma öğeleri (XP, Kalp/Can sistemi, Seviye Algoritması) eşliğinde, sürükleyici bir uzay macerası temasıyla interaktif olarak öğrenmesini sağlamaktır. Klasik ve sıkıcı dil öğrenme yöntemleri yerine, 9 farklı zorluk seviyesine sahip evrenlerde görevleri tamamlayarak (Flashcard, Quiz, Cümle Kurma) ilerlemeye dayalı bir eğitim modelini benimser.

## c) Proje Demosunun Kurulum ve Çalıştırma Talimatı

Bu proje **React Native** ve **Expo** kullanılarak geliştirilmiştir. Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayınız:

('PROJE ASIL OLARAK MOBİL UYGULAMA OLARAK GELİŞTİRİLMİŞTİR TELEFONDAN DENEMENİZ ÖNERİLİR.')

### Ön Koşullar:
- Bilgisayarınızda **Node.js** yüklü olmalıdır.
- (İsteğe bağlı) Telefonunuzda uygulamayı canlı test etmek için iOS App Store veya Google Play Store'dan **"Expo Go"** uygulamasını indirmelisiniz.

### Kurulum Adımları:
1. Proje klasörünü (RouteLingo) bilgisayarınıza indirin ve klasörün içine girin.
2. Klasör içerisinde bir terminal (CMD veya PowerShell) açın.
3. Gerekli kütüphaneleri kurmak için terminale şu komutu yazıp Enter'a basın:
   ```bash
   npm install
   ```
4. Yükleme tamamlandıktan sonra projeyi başlatmak için şu komutu çalıştırın:
   ```bash
   npx expo start
   ```
5. Terminalde büyük bir **QR Kod** belirecektir.
   - **Mobil Cihazda Denemek İçin:** Telefonunuzdaki Expo Go uygulamasını açın ve "Scan QR Code" diyerek ekrandaki kodu okutun.
   - **Bilgisayarda Denemek İçin:** Terminal ekranındayken klavyeden `w` tuşuna basarak uygulamanın Web sürümünü tarayıcıda açabilirsiniz.

### Kullanım Kılavuzu:
- Uygulama ilk açıldığında sizden "Adınız" ve "Soyadınız" istenir. (Try-Catch mekanizmasıyla boşluk veya hatalı girişler engellenir).
- Ana haritada sağ üstte can (kalp) sayacınızı ve tecrübe (XP) puanınızı görebilirsiniz.
- Sırasıyla evrenlere tıklayın. Her evrende 3 görev vardır (Kartlar, Quiz, Cümle). Görevleri sırasıyla bitirmeden diğerleri açılmaz.
- Hata yaparsanız canınız gider, 10 saniye beklerseniz canınız dolar.
- Sol üstteki profilinize tıklayarak istatistiklerinizi görebilir ve çıkış yapıp (oyunu sıfırlayıp) başa dönebilirsiniz.
