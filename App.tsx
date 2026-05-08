import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, StatusBar, Image, Animated, Modal } from 'react-native';
import { mockUniverses } from './src/data/mockData';
import { Universe } from './src/core/Universe';
import LoginScreen from './src/ui/LoginScreen';
import FlashcardScreen from './src/ui/FlashcardScreen';
import QuizScreen from './src/ui/QuizScreen';
import SentenceScreen from './src/ui/SentenceScreen';
import UniverseDetailScreen from './src/ui/UniverseDetailScreen';

const { width } = Dimensions.get('window');

const LOCAL_ISLANDS = [
  require('./assets/islands/house.png'),
  require('./assets/islands/desert.png'),
  require('./assets/islands/food.png'),
  require('./assets/islands/alien.png'),
  require('./assets/islands/zoo.png'),
  require('./assets/islands/music.png'),
  require('./assets/islands/tech.png'),
  require('./assets/islands/sport.png'),
  require('./assets/islands/travel.png'),
];

// 3D UZAYDA SÜZÜLEN ADA ANİMASYONU
const FloatingIsland = ({ source, isUnlocked }: { source: any, isUnlocked: boolean }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 1500 + Math.random() * 1000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1500 + Math.random() * 1000, useNativeDriver: true })
      ])
    );
    float.start();
    return () => float.stop();
  }, []);

  const translateY = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -12] });

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <Image source={source} style={[styles.islandImage, !isUnlocked && styles.lockedImage]} />
    </Animated.View>
  );
};

export default function App() {
  // Hoca Sorarsa: "useState" nedir?
  // Cevap: React'ta uygulamanın anlık hafızasıdır (State Management). Değer değiştiğinde ekran kendini otomatik yeniler.
  const [universes, setUniverses] = useState<Universe[]>(mockUniverses);
  
  // Kullanıcı profili: İsim, soyisim, toplam kazanılan XP ve anlık Can bilgisi burada tutuluyor.
  const [userProfile, setUserProfile] = useState<{firstName: string, lastName: string, xp: number, hearts: number} | null>(null);
  
  // Can sayacı için saniye tutucumuz
  const [heartTimer, setHeartTimer] = useState<number | null>(null);

  // Uygulamadaki sayfalar arasında geçiş yapmayı sağlayan state değişkenimiz (Routing)
  const [currentScreen, setCurrentScreen] = useState<'login' | 'map' | 'universe_detail' | 'flashcard' | 'quiz' | 'sentence'>('login');
  
  const [selectedUniverse, setSelectedUniverse] = useState<Universe | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [unlockedUniverseName, setUnlockedUniverseName] = useState("");
  const [isGameFinished, setIsGameFinished] = useState(false);

  // Hoca Sorarsa: "useEffect" nedir?
  // Cevap: Uygulamanın yaşam döngüsü hook'udur. Arka planda saniye saniye sayaç saymak gibi işlemleri yapar.
  // KALPLERİN DOLMA SAYACI (10 SANİYE)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (userProfile && userProfile.hearts < 3) {
      if (heartTimer === null) {
        setHeartTimer(10); // 10 saniye bekleme süresi
      } else if (heartTimer > 0) {
        interval = setInterval(() => setHeartTimer(prev => prev! - 1), 1000);
      } else if (heartTimer === 0) {
        // Süre doldu, 1 kalp ver
        setUserProfile(prev => prev ? { ...prev, hearts: prev.hearts + 1 } : null);
        setHeartTimer(null); // Bir sonraki tur için sıfırla
      }
    }
    return () => clearInterval(interval);
  }, [userProfile?.hearts, heartTimer]);

  const handleLogin = (firstName: string, lastName: string) => {
    setUserProfile({ firstName, lastName, xp: 0, hearts: 3 });
    setCurrentScreen('map');
  };

  const handleLogout = () => {
    // 1. Kullanıcıyı ve sayaçları temizle
    setUserProfile(null);
    setHeartTimer(null);
    setShowProfileModal(false);
    
    // 2. Oyundaki tüm bölümleri sıfırla (1. bölüm hariç hepsini kilitle)
    const resetUniverses = [...universes];
    resetUniverses.forEach((u, index) => {
      u.resetProgress(index === 0);
    });
    setUniverses(resetUniverses);
    
    // 3. Login ekranına at
    setCurrentScreen('login');
  };

  const addXP = (amount: number) => {
    setUserProfile(prev => prev ? { ...prev, xp: prev.xp + amount } : null);
  };

  const deductHeart = () => {
    setUserProfile(prev => {
      if (!prev) return prev;
      const newHearts = Math.max(0, prev.hearts - 1);
      
      if (newHearts === 0) {
        // Can bittiğinde ekrandan at
        setTimeout(() => {
          alert("💔 Canın kalmadı! Menüye dönülüyor, kalplerinin dolmasını bekle.");
          setCurrentScreen('universe_detail');
        }, 500);
      }
      return { ...prev, hearts: newHearts };
    });
  };

  const handleActivityComplete = (activityIndex: number) => {
    if (selectedUniverse) {
      const currentIndex = universes.findIndex(u => u.id === selectedUniverse.id);
      if (currentIndex !== -1) {
        const updatedUniverses = [...universes];
        
        updatedUniverses[currentIndex].completeActivity(activityIndex);
        addXP(50); // Her biten görev için 50 XP
        
        if (activityIndex === 2) {
          updatedUniverses[currentIndex].complete(); 
          
          if (currentIndex < universes.length - 1) {
            updatedUniverses[currentIndex + 1].unlock(); 
            setUnlockedUniverseName(updatedUniverses[currentIndex + 1].title);
            setIsGameFinished(false);
            
            // YENİ EVRENE GEÇİNCE KALPLERİ FULLE
            setUserProfile(prev => prev ? { ...prev, hearts: 3 } : null);
            setHeartTimer(null);
          } else {
            setUnlockedUniverseName(""); 
            setIsGameFinished(true);
          }
          
          setUniverses(updatedUniverses);
          setShowSuccessModal(true); 
        } else {
          setUniverses(updatedUniverses);
          setCurrentScreen('universe_detail'); 
        }
      }
    }
  };

  const handleNextUniverse = () => {
    const currentIndex = universes.findIndex(u => u.id === selectedUniverse?.id);
    if (currentIndex !== -1 && currentIndex < universes.length - 1) {
      setSelectedUniverse(universes[currentIndex + 1]);
      setCurrentScreen('universe_detail');
    }
    setShowSuccessModal(false);
  };

  const renderScreen = () => {
    if (currentScreen === 'login') {
      return <LoginScreen onLogin={handleLogin} />;
    }
    
    if (currentScreen === 'universe_detail' && selectedUniverse) {
      return (
        <UniverseDetailScreen
          universe={selectedUniverse}
          onBack={() => setCurrentScreen('map')}
          onSelectActivity={(type) => {
            if (userProfile && userProfile.hearts === 0) {
              alert("💔 Hiç canın kalmadı! Sürenin dolmasını bekle.");
            } else {
              setCurrentScreen(type);
            }
          }}
        />
      );
    }
    if (currentScreen === 'flashcard' && selectedUniverse) {
      return (
        <FlashcardScreen 
          words={selectedUniverse.activities[0]?.["words"] || []} 
          onBack={() => setCurrentScreen('universe_detail')} 
          onComplete={() => handleActivityComplete(0)} 
        />
      );
    }
    if (currentScreen === 'quiz' && selectedUniverse) {
      return (
        <QuizScreen
          words={selectedUniverse.activities[1]?.["words"] || selectedUniverse.activities[0]?.["words"] || []}
          onBack={() => setCurrentScreen('universe_detail')}
          onComplete={() => handleActivityComplete(1)} 
          onWrongAnswer={deductHeart}
        />
      );
    }
    if (currentScreen === 'sentence' && selectedUniverse) {
      return (
        <SentenceScreen
          words={selectedUniverse.activities[2]?.["words"] || selectedUniverse.activities[0]?.["words"] || []}
          onBack={() => setCurrentScreen('universe_detail')}
          onComplete={() => handleActivityComplete(2)} 
          onWrongAnswer={deductHeart}
        />
      );
    }

    // Default: Harita Ekranı
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#050A15" />
        
        {/* PROFiL & HUD EKRANI */}
        {userProfile && (
          <View style={styles.hudContainer}>
            <TouchableOpacity 
              style={styles.hudProfile}
              activeOpacity={0.8}
              onPress={() => setShowProfileModal(true)} // Tıklayınca profili aç
            >
              <Text style={styles.hudName}>{userProfile.firstName} {userProfile.lastName}</Text>
              <Text style={styles.hudXp}>⭐ {userProfile.xp} XP</Text>
            </TouchableOpacity>
            <View style={styles.hudHearts}>
              <Text style={styles.heartIcon}>❤️ {userProfile.hearts}</Text>
              {userProfile.hearts < 3 && <Text style={styles.timerText}>{heartTimer}s</Text>}
            </View>
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.headerTitle}>EVRENLER</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {universes.map((universe, index) => {
            const isLeft = index % 2 === 0;
            const isUnlocked = universe.isUnlocked;
            const isLast = index === universes.length - 1;

            return (
              <View key={universe.id} style={styles.levelRow}>
                {!isLast && (
                  <View style={[
                    styles.pathLine, 
                    isLeft ? styles.pathLineLeft : styles.pathLineRight,
                    isUnlocked && universes[index+1]?.isUnlocked ? styles.pathLineUnlocked : {}
                  ]} />
                )}

                <View style={[styles.nodeWrapper, isLeft ? styles.nodeLeft : styles.nodeRight]}>
                  <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={() => {
                      if(isUnlocked) {
                        setSelectedUniverse(universe);
                        setCurrentScreen('universe_detail'); 
                      } else {
                        alert(`🔒 Önceki evrenleri tamamlamalısın!`);
                      }
                    }}
                    style={styles.touchableNode}
                  >
                    <FloatingIsland source={LOCAL_ISLANDS[index]} isUnlocked={isUnlocked} />

                    <View style={[styles.labelWrapper, isUnlocked ? styles.labelUnlocked : styles.labelLocked]}>
                      <Text style={[styles.labelText, isUnlocked ? styles.textUnlocked : styles.textLocked]}>
                        {universe.difficulty}. {universe.title.toUpperCase()}
                      </Text>
                    </View>

                    {universe.isCompleted && (
                      <View style={styles.completedBadge}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
          <View style={{height: 80}} />
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#050A15' }}>
      
      {renderScreen()}

      {/* BAŞARI MODALI */}
      <Modal visible={showSuccessModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>GÖREV TAMAMLANDI! 🚀</Text>
            <Text style={styles.modalText}>
              Bölümü başarıyla bitirdin.
              {"\n\n"}
              {isGameFinished ? (
                <Text style={styles.modalHighlight}>TEBRİKLER! TÜM OYUNU BİTİRDİN! 👑</Text>
              ) : (
                <Text>Şimdi <Text style={styles.modalHighlight}>{unlockedUniverseName.toUpperCase()}</Text> evreninin kilidi açıldı!</Text>
              )}
            </Text>
            
            <View style={{width: '100%', marginTop: 10, gap: 12}}>
              {!isGameFinished && (
                <TouchableOpacity 
                  style={[styles.modalButton, {backgroundColor: '#8B5CF6', shadowColor: '#8B5CF6'}]} 
                  onPress={handleNextUniverse}
                >
                  <Text style={[styles.modalButtonText, {color: '#FFFFFF'}]}>YENİ EVRENE GİT 🚀</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity 
                style={[styles.modalButton, {backgroundColor: 'transparent', borderWidth: 2, borderColor: '#334155', shadowOpacity: 0}]} 
                onPress={() => {
                  setShowSuccessModal(false);
                  setCurrentScreen('map');
                }}
              >
                <Text style={[styles.modalButtonText, {color: '#94A3B8'}]}>HARİTAYA DÖN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* KULLANICI PROFİL MODALI */}
      <Modal visible={showProfileModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {borderColor: '#38BDF8', shadowColor: '#38BDF8'}]}>
            <Text style={[styles.modalTitle, {color: '#38BDF8'}]}>KAPTAN PROFİLİ 👨‍🚀</Text>
            
            <View style={{width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', padding: 15, borderRadius: 15, marginBottom: 20}}>
              <Text style={{color: '#E2E8F0', fontSize: 16, marginBottom: 10, fontWeight: 'bold'}}>
                İsim: <Text style={{color: '#38BDF8'}}>{userProfile?.firstName} {userProfile?.lastName}</Text>
              </Text>
              <Text style={{color: '#E2E8F0', fontSize: 16, marginBottom: 10, fontWeight: 'bold'}}>
                Toplam Tecrübe: <Text style={{color: '#FCD34D'}}>⭐ {userProfile?.xp} XP</Text>
              </Text>
              <Text style={{color: '#E2E8F0', fontSize: 16, fontWeight: 'bold'}}>
                Fethedilen Evrenler: <Text style={{color: '#22C55E'}}>🏆 {universes.filter(u => u.isCompleted).length} / {universes.length}</Text>
              </Text>
            </View>

            <View style={{width: '100%', gap: 12}}>
              <TouchableOpacity 
                style={[styles.modalButton, {backgroundColor: '#334155', shadowColor: '#334155'}]} 
                onPress={() => setShowProfileModal(false)}
              >
                <Text style={[styles.modalButtonText, {color: '#FFFFFF'}]}>OYUNA DÖN</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalButton, {backgroundColor: 'transparent', borderWidth: 2, borderColor: '#F43F5E', shadowOpacity: 0}]} 
                onPress={handleLogout}
              >
                <Text style={[styles.modalButtonText, {color: '#F43F5E'}]}>ÇIKIŞ YAP (BAŞTAN BAŞLA)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050A15' }, 
  
  // YENİ: HUD (Profil) Tasarımı
  hudContainer: {
    position: 'absolute', top: 50, left: 0, width: '100%', paddingHorizontal: 20, zIndex: 200,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'
  },
  hudProfile: { backgroundColor: 'rgba(15, 23, 42, 0.8)', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: '#38BDF8' },
  hudName: { color: '#F8FAFC', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  hudXp: { color: '#FCD34D', fontSize: 16, fontWeight: '900', marginTop: 2 },
  
  hudHearts: { backgroundColor: 'rgba(15, 23, 42, 0.8)', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: '#F43F5E', alignItems: 'center' },
  heartIcon: { color: '#F8FAFC', fontSize: 16, fontWeight: '900' },
  timerText: { color: '#F43F5E', fontSize: 12, fontWeight: 'bold', marginTop: 2 },

  header: {
    padding: 20, paddingTop: 100, backgroundColor: 'transparent',
    alignItems: 'center', position: 'absolute', top: 0, width: '100%', zIndex: 100
  },
  headerTitle: { color: '#FFF', fontSize: 32, fontWeight: '900', letterSpacing: 2, textShadowColor: 'rgba(255,255,255,0.3)', textShadowOffset: {width: 0, height: 2}, textShadowRadius: 6 },
  
  scrollContent: { paddingVertical: 180, alignItems: 'center', flexDirection: 'column-reverse' },
  levelRow: { width: width, height: 200, position: 'relative', marginTop: -10 },
  
  pathLine: {
    position: 'absolute', top: 120, height: 200, width: width * 0.45,
    borderWidth: 6, borderColor: '#1E293B', borderStyle: 'dashed', zIndex: -1,
  },
  pathLineLeft: { left: width * 0.25, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 60, borderBottomLeftRadius: 60 },
  pathLineRight: { right: width * 0.25, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 60, borderBottomRightRadius: 60 },
  pathLineUnlocked: { borderColor: '#475569' },

  nodeWrapper: { width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  nodeLeft: { justifyContent: 'flex-start' },
  nodeRight: { justifyContent: 'flex-end' },
  touchableNode: { alignItems: 'center', position: 'relative' },

  islandImage: { 
    width: 170, height: 170, borderRadius: 85, resizeMode: 'cover',
    borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.1)', 
  },
  lockedImage: { opacity: 0.35 },

  labelWrapper: {
    marginTop: -30, paddingHorizontal: 20, paddingVertical: 8,
    borderRadius: 12, borderWidth: 3, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 4, elevation: 10,
  },
  labelUnlocked: { backgroundColor: '#F59E0B', borderColor: '#B45309' },
  labelLocked: { backgroundColor: '#1E293B', borderColor: '#0F172A' },
  
  labelText: { fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  textUnlocked: { color: '#FFFFFF', textShadowColor: 'rgba(0,0,0,0.8)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 2 },
  textLocked: { color: '#64748B' },

  completedBadge: {
    position: 'absolute', top: 10, left: -10, zIndex: 10,
    backgroundColor: '#84CC16', width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 4, borderColor: '#000',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 10,
  },
  checkmark: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#071022', padding: 25, borderRadius: 25, borderWidth: 3, borderColor: '#8B5CF6', alignItems: 'center', shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 30, elevation: 15 },
  modalTitle: { color: '#A78BFA', fontSize: 22, fontWeight: '900', marginBottom: 20, letterSpacing: 1, textAlign: 'center' },
  modalText: { color: '#E2E8F0', fontSize: 15, textAlign: 'center', marginBottom: 20, lineHeight: 22 },
  modalHighlight: { color: '#0EA5E9', fontWeight: 'bold', fontSize: 17 },
  modalButton: { width: '100%', alignItems: 'center', paddingVertical: 15, borderRadius: 25, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.6, shadowRadius: 10, elevation: 5 },
  modalButtonText: { fontWeight: '900', letterSpacing: 1, fontSize: 15 }
});
