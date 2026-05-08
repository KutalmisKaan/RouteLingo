import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Word } from '../core/Word';

const { width } = Dimensions.get('window');

interface Props {
  words: Word[];
  onBack: () => void;
  onComplete: () => void;
  onWrongAnswer?: () => void;
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
        <View key={star.key} style={{ position: 'absolute', left: star.left, top: star.top, width: star.size, height: star.size, backgroundColor: '#FFF', borderRadius: star.size / 2, opacity: star.opacity }} />
      ))}
    </View>
  );
};

export default function QuizScreen({ words, onBack, onComplete, onWrongAnswer }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentWord = words[currentIndex];

  useEffect(() => {
    // 1 doğru, 3 yanlış şık oluştur ve karıştır
    const wrongWords = words.filter(w => w.id !== currentWord.id);
    const shuffledWrong = wrongWords.sort(() => 0.5 - Math.random()).slice(0, 3);
    const newOptions = [currentWord, ...shuffledWrong].sort(() => 0.5 - Math.random());
    setOptions(newOptions.map(w => w.turkish));
    setSelectedOption(null);
    setIsCorrect(null);
  }, [currentIndex]);

  const handleSelect = (option: string) => {
    if (selectedOption) return; // Zaten seçildiyse bekle
    
    setSelectedOption(option);
    const correct = option === currentWord.turkish;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        if (currentIndex < words.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          onComplete(); // Quiz Bitti!
        }
      }, 1000); // 1 saniye yeşil yansın sonra geçsin
    } else {
      if (onWrongAnswer) onWrongAnswer(); // YENİ: Yanlış yapılınca canı düşür
      setTimeout(() => {
        // Yanlış seçtiyse sadece rengi sıfırla, tekrar denesin
        setSelectedOption(null);
        setIsCorrect(null);
      }, 1000); // 1 saniye kırmızı yansın sonra sıfırlansın
    }
  };

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

      {/* SORU KARTI */}
      <View style={styles.questionCard}>
        <View style={styles.cardInnerBorder}>
          <Text style={styles.questionTitle}>BUNUN ANLAMI NEDİR?</Text>
          <Text style={styles.wordText}>{currentWord.english}</Text>
        </View>
      </View>

      {/* ŞIKLAR */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          let btnStyle = styles.optionBtn;
          let textStyle = styles.optionText;
          
          if (selectedOption === option) {
            if (isCorrect) {
              btnStyle = styles.optionCorrect;
              textStyle = styles.textCorrect;
            } else {
              btnStyle = styles.optionWrong;
              textStyle = styles.textWrong;
            }
          } else if (selectedOption && option === currentWord.turkish && isCorrect === false) {
             // Opsiyonel: Yanlış seçince doğru şıkkı parlatmak istersek buraya ekleyebiliriz.
          }

          return (
            <TouchableOpacity 
              key={index} 
              style={btnStyle} 
              activeOpacity={0.8}
              onPress={() => handleSelect(option)}
            >
              <Text style={textStyle}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  header: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 25, marginBottom: 30,
  },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
  backBtnText: { color: '#0EA5E9', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  progressBadge: { backgroundColor: '#0EA5E9', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  progressText: { color: '#020617', fontSize: 16, fontWeight: '900' },
  
  questionCard: {
    width: width * 0.85, height: width * 0.6,
    backgroundColor: '#071022', 
    borderRadius: 30, borderWidth: 3, borderColor: '#8B5CF6', // Kozmik Mor çerçeve
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 30, elevation: 15,
    marginBottom: 40,
  },
  cardInnerBorder: {
    width: '92%', height: '88%',
    borderWidth: 1, borderColor: 'rgba(139, 92, 246, 0.4)', borderRadius: 20, 
    alignItems: 'center', justifyContent: 'center', position: 'relative'
  },
  questionTitle: { position: 'absolute', top: 15, color: '#A78BFA', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 },
  wordText: { fontSize: 46, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', letterSpacing: 1 },

  optionsContainer: { width: width * 0.85, alignItems: 'center' },
  
  optionBtn: {
    width: '100%', backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingVertical: 18, borderRadius: 20, marginBottom: 15,
    borderWidth: 2, borderColor: '#1E293B',
    alignItems: 'center', justifyContent: 'center',
  },
  optionText: { color: '#E2E8F0', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },

  optionCorrect: {
    width: '100%', backgroundColor: 'rgba(34, 197, 94, 0.2)', // Yeşil
    paddingVertical: 18, borderRadius: 20, marginBottom: 15,
    borderWidth: 2, borderColor: '#22C55E',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#22C55E', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 15, elevation: 10,
  },
  textCorrect: { color: '#22C55E', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },

  optionWrong: {
    width: '100%', backgroundColor: 'rgba(239, 68, 68, 0.2)', // Kırmızı
    paddingVertical: 18, borderRadius: 20, marginBottom: 15,
    borderWidth: 2, borderColor: '#EF4444',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#EF4444', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 15, elevation: 10,
  },
  textWrong: { color: '#EF4444', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
});
