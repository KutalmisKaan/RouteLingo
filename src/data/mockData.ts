import { Word } from '../core/Word';
import { Universe } from '../core/Universe';
import { FlashcardActivity, QuizActivity, SentenceActivity } from '../core/Activity';

// --- 1. TANIŞMA ŞEHRİ ---
const word1 = new Word("w1", "Hello", "Merhaba", "A1");
const word2 = new Word("w2", "Good morning", "Günaydın", "A1");
const word3 = new Word("w3", "How are you", "Nasılsın", "A1");
const word4 = new Word("w4", "Thank you", "Teşekkür ederim", "A1");
const word5 = new Word("w5", "Goodbye", "Hoşça kal", "A1");
const word6 = new Word("w6", "Please", "Lütfen", "A1");
const word7 = new Word("w7", "Sorry", "Özür dilerim", "A1");
const word8 = new Word("w8", "Yes and no", "Evet ve hayır", "A1");

const helloFlashcards = new FlashcardActivity("a1", "Tanışma Kartları", [word1, word2, word3, word4, word5, word6, word7, word8]);
const helloQuiz = new QuizActivity("a2", "Tanışma Testi", [word1, word2, word3, word4, word5, word6, word7, word8]);
const helloSentence = new SentenceActivity("a3", "Cümle Kur", [word2, word3, word4, word5, word7, word8]); 

// --- 2. AKSİYON KASABASI ---
const actWord1 = new Word("aw1", "Help me", "Bana yardım et", "A1");
const actWord2 = new Word("aw2", "Run fast", "Hızlı koş", "A1");
const actWord3 = new Word("aw3", "Save me", "Beni kurtar", "A1");
const actWord4 = new Word("aw4", "Danger is near", "Tehlike yakın", "A1");
const actWord5 = new Word("aw5", "Be careful", "Dikkatli ol", "A1");
const actWord6 = new Word("aw6", "Look out", "Dikkat et", "A1");
const actWord7 = new Word("aw7", "Don't move", "Hareket etme", "A1");
const actWord8 = new Word("aw8", "We are safe", "Güvendeyiz", "A1");

const actFlashcards = new FlashcardActivity("a4", "Aksiyon Kartları", [actWord1, actWord2, actWord3, actWord4, actWord5, actWord6, actWord7, actWord8]);
const actQuiz = new QuizActivity("a5", "Aksiyon Testi", [actWord1, actWord2, actWord3, actWord4, actWord5, actWord6, actWord7, actWord8]);
const actSentence = new SentenceActivity("a6", "Aksiyon Cümleleri", [actWord1, actWord2, actWord3, actWord4, actWord5, actWord8]); 

// --- 3. YEMEK VADİSİ ---
const food1 = new Word("fw1", "Red apple", "Kırmızı elma", "A1");
const food2 = new Word("fw2", "Cold water", "Soğuk su", "A1");
const food3 = new Word("fw3", "I am hungry", "Ben açım", "A1");
const food4 = new Word("fw4", "Eat bread", "Ekmek ye", "A1");
const food5 = new Word("fw5", "Drink tea", "Çay iç", "A1");
const food6 = new Word("fw6", "Hot soup", "Sıcak çorba", "A1");
const food7 = new Word("fw7", "Sweet cake", "Tatlı kek", "A1");
const food8 = new Word("fw8", "Fresh meat", "Taze et", "A1");

const foodFlash = new FlashcardActivity("a7", "Yemek Kartları", [food1, food2, food3, food4, food5, food6, food7, food8]);
const foodQuiz = new QuizActivity("a8", "Yemek Testi", [food1, food2, food3, food4, food5, food6, food7, food8]);
const foodSent = new SentenceActivity("a9", "Yemek Cümleleri", [food1, food2, food3, food4, food5, food6]); 

// --- 4. RENKLER ORMANI ---
const col1 = new Word("cw1", "Red apple", "Kırmızı elma", "A1");
const col2 = new Word("cw2", "Blue sky", "Mavi gökyüzü", "A1");
const col3 = new Word("cw3", "Green tree", "Yeşil ağaç", "A1");
const col4 = new Word("cw4", "Yellow sun", "Sarı güneş", "A1");
const col5 = new Word("cw5", "Black night", "Siyah gece", "A1");
const col6 = new Word("cw6", "White snow", "Beyaz kar", "A1");
const col7 = new Word("cw7", "Purple flower", "Mor çiçek", "A1");
const col8 = new Word("cw8", "Orange cat", "Turuncu kedi", "A1");

const colFlash = new FlashcardActivity("a10", "Renk Kartları", [col1, col2, col3, col4, col5, col6, col7, col8]);
const colQuiz = new QuizActivity("a11", "Renk Testi", [col1, col2, col3, col4, col5, col6, col7, col8]);
const colSent = new SentenceActivity("a12", "Renk Cümleleri", [col1, col2, col3, col4, col5, col6]); 

// --- 5. HAYVANAT BAHÇESİ ---
const zoo1 = new Word("zw1", "Dog barks", "Köpek havlar", "A1");
const zoo2 = new Word("zw2", "Fast cat", "Hızlı kedi", "A1");
const zoo3 = new Word("zw3", "Big elephant", "Büyük fil", "A1");
const zoo4 = new Word("zw4", "Wild lion", "Vahşi aslan", "A1");
const zoo5 = new Word("zw5", "Tall giraffe", "Uzun zürafa", "A1");
const zoo6 = new Word("zw6", "Small mouse", "Küçük fare", "A1");
const zoo7 = new Word("zw7", "Green snake", "Yeşil yılan", "A1");
const zoo8 = new Word("zw8", "Flying bird", "Uçan kuş", "A1");

const zooFlash = new FlashcardActivity("a13", "Hayvan Kartları", [zoo1, zoo2, zoo3, zoo4, zoo5, zoo6, zoo7, zoo8]);
const zooQuiz = new QuizActivity("a14", "Hayvan Testi", [zoo1, zoo2, zoo3, zoo4, zoo5, zoo6, zoo7, zoo8]);
const zooSent = new SentenceActivity("a15", "Hayvan Cümleleri", [zoo1, zoo2, zoo3, zoo4, zoo5, zoo8]); 

// --- 6. MÜZİK ADASI ---
const mus1 = new Word("mw1", "Play guitar", "Gitar çal", "A1");
const mus2 = new Word("mw2", "Loud song", "Yüksek sesli şarkı", "A1");
const mus3 = new Word("mw3", "Sing a song", "Şarkı söyle", "A1");
const mus4 = new Word("mw4", "Listen to music", "Müzik dinle", "A1");
const mus5 = new Word("mw5", "Play piano", "Piyano çal", "A1");
const mus6 = new Word("mw6", "Good rhythm", "İyi ritim", "A1");
const mus7 = new Word("mw7", "Dance well", "İyi dans et", "A1");
const mus8 = new Word("mw8", "Pop music", "Pop müzik", "A1");

const musFlash = new FlashcardActivity("a16", "Müzik Kartları", [mus1, mus2, mus3, mus4, mus5, mus6, mus7, mus8]);
const musQuiz = new QuizActivity("a17", "Müzik Testi", [mus1, mus2, mus3, mus4, mus5, mus6, mus7, mus8]);
const musSent = new SentenceActivity("a18", "Müzik Cümleleri", [mus1, mus2, mus3, mus4, mus5, mus7]); 

// --- 7. TEKNOLOJİ ÜSSÜ ---
const tech1 = new Word("tw1", "Smart phone", "Akıllı telefon", "A1");
const tech2 = new Word("tw2", "Fast internet", "Hızlı internet", "A1");
const tech3 = new Word("tw3", "Open computer", "Bilgisayarı aç", "A1");
const tech4 = new Word("tw4", "Broken screen", "Kırık ekran", "A1");
const tech5 = new Word("tw5", "Send email", "E-posta gönder", "A1");
const tech6 = new Word("tw6", "New robot", "Yeni robot", "A1");
const tech7 = new Word("tw7", "Digital watch", "Dijital saat", "A1");
const tech8 = new Word("tw8", "Save data", "Veriyi kaydet", "A1");

const techFlash = new FlashcardActivity("a19", "Teknoloji Kartları", [tech1, tech2, tech3, tech4, tech5, tech6, tech7, tech8]);
const techQuiz = new QuizActivity("a20", "Teknoloji Testi", [tech1, tech2, tech3, tech4, tech5, tech6, tech7, tech8]);
const techSent = new SentenceActivity("a21", "Teknoloji Cümleleri", [tech1, tech2, tech3, tech4, tech5, tech8]); 

// --- 8. SPOR ARENASI ---
const spo1 = new Word("sw1", "Play football", "Futbol oyna", "A1");
const spo2 = new Word("sw2", "Run very fast", "Çok hızlı koş", "A1");
const spo3 = new Word("sw3", "Jump high", "Yükseğe zıpla", "A1");
const spo4 = new Word("sw4", "Win the match", "Maçı kazan", "A1");
const spo5 = new Word("sw5", "Lose the game", "Oyunu kaybet", "A1");
const spo6 = new Word("sw6", "Strong team", "Güçlü takım", "A1");
const spo7 = new Word("sw7", "Gold medal", "Altın madalya", "A1");
const spo8 = new Word("sw8", "Swim well", "İyi yüz", "A1");

const spoFlash = new FlashcardActivity("a22", "Spor Kartları", [spo1, spo2, spo3, spo4, spo5, spo6, spo7, spo8]);
const spoQuiz = new QuizActivity("a23", "Spor Testi", [spo1, spo2, spo3, spo4, spo5, spo6, spo7, spo8]);
const spoSent = new SentenceActivity("a24", "Spor Cümleleri", [spo1, spo2, spo3, spo4, spo5, spo8]); 

// --- 9. SEYAHAT GALAKSİSİ ---
const trv1 = new Word("rw1", "Flight ticket", "Uçak bileti", "A1");
const trv2 = new Word("rw2", "Go to hotel", "Otele git", "A1");
const trv3 = new Word("rw3", "My passport", "Benim pasaportum", "A1");
const trv4 = new Word("rw4", "Happy holiday", "Mutlu tatiller", "A1");
const trv5 = new Word("rw5", "Big suitcase", "Büyük bavul", "A1");
const trv6 = new Word("rw6", "Take photo", "Fotoğraf çek", "A1");
const trv7 = new Word("rw7", "Lost map", "Kayıp harita", "A1");
const trv8 = new Word("rw8", "Train station", "Tren istasyonu", "A1");

const trvFlash = new FlashcardActivity("a25", "Seyahat Kartları", [trv1, trv2, trv3, trv4, trv5, trv6, trv7, trv8]);
const trvQuiz = new QuizActivity("a26", "Seyahat Testi", [trv1, trv2, trv3, trv4, trv5, trv6, trv7, trv8]);
const trvSent = new SentenceActivity("a27", "Seyahat Cümleleri", [trv1, trv2, trv3, trv4, trv5, trv6, trv8]); 


// Ve o muhteşem 9 Evren!
export const mockUniverses: Universe[] = [
  new Universe("u1", "Tanışma Şehri", 1, [helloFlashcards, helloQuiz, helloSentence], true),
  new Universe("u2", "Aksiyon Kasabası", 2, [actFlashcards, actQuiz, actSentence], false),
  new Universe("u3", "Yemek Vadisi", 3, [foodFlash, foodQuiz, foodSent], false),
  new Universe("u4", "Renkler Ormanı", 4, [colFlash, colQuiz, colSent], false),
  new Universe("u5", "Hayvanat Bahçesi", 5, [zooFlash, zooQuiz, zooSent], false),
  new Universe("u6", "Müzik Adası", 6, [musFlash, musQuiz, musSent], false),
  new Universe("u7", "Teknoloji Üssü", 7, [techFlash, techQuiz, techSent], false),
  new Universe("u8", "Spor Arenası", 8, [spoFlash, spoQuiz, spoSent], false),
  new Universe("u9", "Seyahat Galaksisi", 9, [trvFlash, trvQuiz, trvSent], false)
];
