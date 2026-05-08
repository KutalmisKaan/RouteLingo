/**
 * Bu dosya OOP gereksinimini (Encapsulation - Kapsülleme) karşılamak için yazılmıştır.
 */
export class Word {
  private _id: string;
  private _english: string;
  private _turkish: string;
  private _level: string; // A1, A2

  constructor(id: string, english: string, turkish: string, level: string = "A1") {
    this._id = id;
    this._english = english;
    this._turkish = turkish;
    this._level = level;
  }

  // Encapsulation (Kapsülleme) için Getter metodları
  public get id(): string { return this._id; }
  public get english(): string { return this._english; }
  public get turkish(): string { return this._turkish; }
  public get level(): string { return this._level; }
}
