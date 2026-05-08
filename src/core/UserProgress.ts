/**
 * Bu dosya OOP tasarım desenlerinden "Singleton Pattern" kullanılarak yazılmıştır.
 * Kullanıcının sadece 1 tane ilerlemesi (profilli) olabilir.
 */
export class UserProgress {
  private static instance: UserProgress;
  
  private _xp: number = 0;
  private _unlockedUniverseIds: string[] = ["u1"]; // Sadece 1. evren (Tanışma Şehri) başlangıçta açık (renkli)

  private constructor() {
    // Private constructor (Singleton)
  }

  public static getInstance(): UserProgress {
    if (!UserProgress.instance) {
      UserProgress.instance = new UserProgress();
    }
    return UserProgress.instance;
  }

  public get xp(): number { return this._xp; }
  
  public addXp(amount: number): void {
    this._xp += amount;
  }

  // Kullanıcının o evreni açıp açmadığını kontrol eder
  public isUniverseUnlocked(universeId: string): boolean {
    return this._unlockedUniverseIds.includes(universeId);
  }

  // Yeni evrenin kilidini açar (Gri'den Renkli'ye çevirir)
  public unlockUniverse(universeId: string): void {
    if (!this._unlockedUniverseIds.includes(universeId)) {
      this._unlockedUniverseIds.push(universeId);
    }
  }
}
