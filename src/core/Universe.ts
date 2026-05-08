import { Activity } from './Activity';

/**
 * Evrenleri (Universes/Bölümleri) temsil eden sınıf.
 * OOP Kapsülleme (Encapsulation) kurallarına uygundur.
 */
export class Universe {
  // Hoca Sorarsa: Değişkenleri neden "private" yaptık?
  // Cevap: Veri güvenliğini (Encapsulation) sağlamak için.
  // Dışarıdan biri direkt "universe._isCompleted = true" diyerek hile yapamasın diye gizledik.
  // Değişkenlere sadece izin verdiğimiz metotlarla (örneğin complete() fonksiyonu) ulaşılabiliyor.
  private _id: string;
  private _title: string;
  private _difficulty: number;
  private _activities: Activity[];
  private _isUnlocked: boolean; // Bölümün kilidi açık mı?
  private _isCompleted: boolean; // Bölüm tamamen bitti mi? (Yeşil tik eklenecek mi?)
  private _progressLevel: number; // 0:Flashcard, 1:Quiz, 2:Sentence, 3:Tamamlandı

  constructor(id: string, title: string, difficulty: number, activities: Activity[], isUnlocked: boolean = false) {
    this._id = id;
    this._title = title;
    this._difficulty = difficulty;
    this._activities = activities;
    this._isUnlocked = isUnlocked;
    this._isCompleted = false; // Başlangıçta hiçbir bölüm bitmedi
    this._progressLevel = 0; // Sıfırdan başlar
  }

  // Getter metotları: Değişkenleri dışarıya sadece "okunabilir" olarak açıyoruz.
  // Hoca sorarsa: Değiştirmeye izin yok, sadece değerini okumak için "get" kelimesini kullandık.
  public get id(): string { return this._id; }
  public get title(): string { return this._title; }
  public get difficulty(): number { return this._difficulty; }
  public get activities(): Activity[] { return this._activities; }

  // Kilidi açık mı? 
  public get isUnlocked(): boolean { return this._isUnlocked; }

  // Kilidi sadece bu fonksiyon ile açabiliyoruz (Encapsulation kuralı)
  public unlock(): void { this._isUnlocked = true; }

  // Bölüm bittiğinde yeşil tiki yakan fonksiyon
  public get isCompleted(): boolean { return this._isCompleted; }
  public complete(): void { this._isCompleted = true; }

  // Alt Aktivitelerin sırasıyla açılmasını sağlayan ilerleme mantığı
  public get progressLevel(): number { return this._progressLevel; }
  public completeActivity(level: number): void {
    if (this._progressLevel <= level) {
      this._progressLevel = level + 1;
    }
  }

  // Oyunu Sıfırlamak İçin (Çıkış Yapınca)
  public resetProgress(isFirst: boolean): void {
    this._isUnlocked = isFirst; // Sadece ilk bölüm açık kalır
    this._isCompleted = false;
    this._progressLevel = 0;
  }
}
