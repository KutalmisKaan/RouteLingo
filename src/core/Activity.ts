import { Word } from './Word';

/**
 * Bu dosya OOP Kalıtım (Inheritance) ve Çok Biçimlilik (Polymorphism) kuralını karşılar.
 */

// Soyut temel sınıf (Base Class)
// Neden Abstract Sınıf? Çünkü tek başına "Activity" diye bir nesne yaratılamaz. Kart, Quiz veya Cümle olmalıdır.
export abstract class Activity {
  // Sadece bu sınıf ve bundan türeyen (miras alan) sınıflar erişebilsin diye "protected" kullanıldı.
  protected id: string;
  protected title: string;
  protected words: Word[];

  constructor(id: string, title: string, words: Word[]) {
    this.id = id;
    this.title = title;
    this.words = words;
  }

  // Polymorphism (Çok Biçimlilik) Göstergesi: 
  // Alt sınıflar bu metotları kendi ihtiyaçlarına göre ezmek (override) zorundadır.
  // Böylece Activity referansıyla çağrılsa bile, hangi tipteyse onun metodu çalışır.
  public abstract getActivityType(): string;
  public abstract getScoreMultiplier(): number;
}

// 1. Alt Sınıf: Kelime Kartları (Flashcards)
export class FlashcardActivity extends Activity {
  constructor(id: string, title: string, words: Word[]) {
    super(id, title, words);
  }

  public getActivityType(): string {
    return "Flashcard"; // Sadece kartları çevirip kelime öğrendiğimiz mod
  }

  public getScoreMultiplier(): number {
    return 1.0; // Puan çarpana etkisi normal
  }
}

// 2. Alt Sınıf: Çoktan Seçmeli Test
export class QuizActivity extends Activity {
  constructor(id: string, title: string, words: Word[]) {
    super(id, title, words);
  }

  public getActivityType(): string {
    return "Quiz"; // 4 şıklı soru modu
  }

  public getScoreMultiplier(): number {
    return 1.5; // Test çözerken 1.5 kat daha fazla puan kazanılır
  }
}

// 3. Alt Sınıf: Cümle Yazma / Boşluk Doldurma
// Inheritance (Kalıtım): Activity sınıfından türetildi (extends Activity)
export class SentenceActivity extends Activity {
  constructor(id: string, title: string, words: Word[]) {
    super(id, title, words); // Ana sınıfın constructor'ı çağrılır
  }

  // Polymorphism: getActivityType metodu eziliyor (override)
  public getActivityType(): string {
    return "Sentence"; // Cümle oluşturma modu
  }

  // Polymorphism: Puan çarpanı her aktiviteye göre farklı hesaplanıyor
  public getScoreMultiplier(): number {
    return 2.0; // Cümle yazmak en zoru olduğu için 2 kat puan
  }
}
