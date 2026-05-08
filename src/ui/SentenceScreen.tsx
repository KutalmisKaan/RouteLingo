import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
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

export default function SentenceScreen({ words, onBack, onComplete, onWrongAnswer }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentSentenceWord = words[currentIndex];

  useEffect(() => {
    if (!currentSentenceWord) return;

    // Hedef İngilizce cümleyi kelimelere böl ("How are you?" -> ["How", "are", "you?"])
    const targetWords = currentSentenceWord.english.split(' ');
    
    // Kafa karıştırıcı sahte kelimeler ekleyelim
    const extraWordsPool = ["apple", "water", "hello", "good", "is", "the", "car", "my", "yes", "no"];
    const extraWords = extraWordsPool.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Hepsini karıştır
    const shuffled = [...targetWords, ...extraWords].sort(() => 0.5 - Math.random());
    
    setAvailableWords(shuffled);
    setSelectedWords([]);
    setIsCorrect(null);
  }, [currentIndex]);

  if (!currentSentenceWord) {
    return null;
  }

  const handleSelectWord = (word: string, index: number) => {
    setSelectedWords([...selectedWords, word]);
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);
  };

  const handleRemoveWord = (word: string, index: number) => {
    setAvailableWords([...availableWords, word]);
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
  };

  const handleCheck = () => {
    const userSentence = selectedWords.join(' ');
    const isRight = userSentence === currentSentenceWord.english;
    setIsCorrect(isRight);

    if (isRight) {
      setTimeout(() => {
        if (currentIndex < words.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      if (onWrongAnswer) onWrongAnswer(); // YENİ: Yanlış yapılınca canı düşür
      setTimeout(() => {
        setIsCorrect(null);
      }, 1500);
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

      <Text style={styles.instructionText}>BU CÜMLEYİ İNGİLİZCEYE ÇEVİR:</Text>
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentSentenceWord.turkish}</Text>
      </View>

      {/* KULLANICININ OLUŞTURDUĞU CÜMLE KUTUSU */}
      <View style={[
        styles.answerBox, 
        isCorrect === true && styles.answerCorrect,
        isCorrect === false && styles.answerWrong
      ]}>
        {selectedWords.map((word, index) => (
          <TouchableOpacity key={`sel-${index}`} onPress={() => handleRemoveWord(word, index)} style={styles.wordBlock}>
            <Text style={styles.wordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SEÇİLEBİLİR KELİMELER HAVUZU */}
      <View style={styles.poolBox}>
        {availableWords.map((word, index) => (
          <TouchableOpacity key={`avail-${index}`} onPress={() => handleSelectWord(word, index)} style={styles.wordBlock}>
            <Text style={styles.wordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[
          styles.checkBtn, 
          selectedWords.length === 0 && { opacity: 0.4 }
        ]} 
        onPress={handleCheck}
        disabled={selectedWords.length === 0 || isCorrect === true}
      >
        <Text style={styles.checkBtnText}>KONTROL ET</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginBottom: 40 },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
  backBtnText: { color: '#0EA5E9', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  progressBadge: { backgroundColor: '#0EA5E9', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  progressText: { color: '#020617', fontSize: 16, fontWeight: '900' },
  
  instructionText: { color: '#A78BFA', fontSize: 14, fontWeight: 'bold', letterSpacing: 1, marginBottom: 10 },
  
  questionCard: {
    width: width * 0.85, paddingVertical: 25, backgroundColor: '#071022', 
    borderRadius: 20, borderWidth: 2, borderColor: '#0EA5E9', 
    alignItems: 'center', justifyContent: 'center', marginBottom: 40,
    shadowColor: '#0EA5E9', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 10,
  },
  questionText: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', textAlign: 'center' },

  answerBox: {
    width: width * 0.85, minHeight: 80, backgroundColor: 'rgba(255,255,255,0.05)', 
    borderRadius: 20, borderWidth: 2, borderColor: '#334155', borderStyle: 'dashed',
    flexDirection: 'row', flexWrap: 'wrap', padding: 15, gap: 10, marginBottom: 30,
  },
  answerCorrect: { borderColor: '#22C55E', backgroundColor: 'rgba(34,197,94,0.1)', borderStyle: 'solid' },
  answerWrong: { borderColor: '#EF4444', backgroundColor: 'rgba(239,68,68,0.1)', borderStyle: 'solid' },

  poolBox: {
    width: width * 0.85, flexDirection: 'row', flexWrap: 'wrap', 
    justifyContent: 'center', gap: 10, marginBottom: 50,
  },

  wordBlock: {
    backgroundColor: '#1E293B', paddingVertical: 12, paddingHorizontal: 20, 
    borderRadius: 15, borderWidth: 1, borderColor: '#475569',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 5,
  },
  wordText: { color: '#F8FAFC', fontSize: 18, fontWeight: 'bold' },

  checkBtn: {
    backgroundColor: '#8B5CF6', paddingVertical: 18, paddingHorizontal: 50, borderRadius: 30,
    shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 10,
  },
  checkBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', letterSpacing: 2 }
});
