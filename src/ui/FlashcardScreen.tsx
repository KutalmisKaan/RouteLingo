import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Word } from '../core/Word';

const { width } = Dimensions.get('window');

interface Props {
  words: Word[];
  onBack: () => void;
  onComplete: () => void;
}

const StarryBackground = () => {
  const [stars] = useState(() => 
    Array.from({ length: 60 }).map((_, i) => ({
      key: i,
      left: `${Math.random() * 100}%` as any,
      top: `${Math.random() * 100}%` as any,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }))
  );

  return (
    <View style={[StyleSheet.absoluteFillObject, { zIndex: -10, backgroundColor: '#020617' }]}>
      {stars.map((star) => (
        <View
          key={star.key}
          style={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: '#FFF',
            borderRadius: star.size / 2,
            opacity: star.opacity,
          }}
        />
      ))}
    </View>
  );
};

export default function FlashcardScreen({ words, onBack, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // YENİ KURAL: İki yüze de bakıldı mı? (Kullanıcı öğrenmeden geçemesin)
  const [hasViewedBothSides, setHasViewedBothSides] = useState(false); 
  
  const flipAnim = useRef(new Animated.Value(0)).current;
  const currentWord = words[currentIndex];

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnim, { toValue: 0, friction: 8, tension: 10, useNativeDriver: true }).start();
    } else {
      Animated.spring(flipAnim, { toValue: 1, friction: 8, tension: 10, useNativeDriver: true }).start();
    }
    setIsFlipped(!isFlipped);
    setHasViewedBothSides(true); // Kartı çevirdiği an iki yüzü de gördü demektir! Kilidi aç.
  };

  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }], position: 'absolute' as const, top: 0 };

  const handleNext = () => {
    if (!hasViewedBothSides) return; // Güvenlik duvarı: Bakmadıysa geçemez

    if (currentIndex < words.length - 1) {
      setHasViewedBothSides(false); // Yeni kelime gelince kilidi tekrar kapat
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  // BUTONUN DİNAMİK RENGİ (Öndeyse Mavi, Arkadaysa Kırmızı)
  const buttonColor = isFlipped ? '#F43F5E' : '#0EA5E9'; 

  return (
    <View style={styles.container}>
      <StarryBackground />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>{"< EVRENE DÖN"}</Text>
        </TouchableOpacity>
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>{currentIndex + 1} / {words.length}</Text>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity activeOpacity={1} onPress={flipCard}>
          <Animated.View style={[styles.card, frontAnimatedStyle]}>
            <View style={styles.cardInnerBorder}>
              <Text style={styles.wordText}>{currentWord.english}</Text>
            </View>
          </Animated.View>
          
          <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
            <View style={styles.cardInnerBorderBack}>
              <Text style={styles.wordText}>{currentWord.turkish}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[
          styles.nextBtn, 
          { backgroundColor: buttonColor, shadowColor: buttonColor },
          !hasViewedBothSides && { opacity: 0.4 } // Kartın arkasına bakmadıysa buton soluk durur
        ]} 
        onPress={handleNext}
        disabled={!hasViewedBothSides}
      >
        <Text style={styles.nextBtnText}>
          {currentIndex === words.length - 1 ? "🚀 BÖLÜMÜ BİTİR" : "SONRAKİ KELİME ➔"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  header: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 25, marginBottom: 50,
  },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
  backBtnText: { color: '#0EA5E9', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  progressBadge: { backgroundColor: '#0EA5E9', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 5 },
  progressText: { color: '#020617', fontSize: 16, fontWeight: '900' },
  cardContainer: { alignItems: 'center', justifyContent: 'center' },
  
  card: {
    width: width * 0.85, height: width * 1.2,
    backgroundColor: '#071022', 
    borderRadius: 40, borderWidth: 3, borderColor: '#0EA5E9', 
    alignItems: 'center', justifyContent: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 30, elevation: 15,
  },
  cardInnerBorder: {
    width: '90%', height: '92%',
    borderWidth: 1, borderColor: 'rgba(14, 165, 233, 0.3)', borderRadius: 30, 
    alignItems: 'center', justifyContent: 'center', position: 'relative'
  },
  cardBack: {
    backgroundColor: '#4C0519', 
    borderColor: '#F43F5E', 
    shadowColor: '#F43F5E',
  },
  cardInnerBorderBack: {
    width: '90%', height: '92%',
    borderWidth: 1, borderColor: 'rgba(244, 63, 94, 0.3)', borderRadius: 30,
    alignItems: 'center', justifyContent: 'center', position: 'relative'
  },
  wordText: { fontSize: 48, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', letterSpacing: 2 },
  
  nextBtn: {
    marginTop: 50, 
    paddingVertical: 10, paddingHorizontal: 18, borderRadius: 20, // ÇOOOK KÜÇÜLTÜLDÜ
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.6, shadowRadius: 15, elevation: 10,
  },
  nextBtnText: { color: '#020617', fontSize: 13, fontWeight: '900', letterSpacing: 1 } // Yazı da minik yapıldı
});
