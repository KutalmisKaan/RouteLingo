import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Universe } from '../core/Universe';

const { width } = Dimensions.get('window');

interface Props {
  universe: Universe;
  onBack: () => void;
  onSelectActivity: (type: 'flashcard' | 'quiz' | 'sentence') => void;
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

export default function UniverseDetailScreen({ universe, onBack, onSelectActivity }: Props) {
  const progress = universe.progressLevel;

  return (
    <View style={styles.container}>
      <StarryBackground />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>{"< HARİTAYA DÖN"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleCard}>
        <Text style={styles.titleText}>{universe.title.toUpperCase()}</Text>
        <Text style={styles.subtitleText}>GÖREV KONTROL MERKEZİ</Text>
      </View>

      <View style={styles.menu}>
        {/* 1. KELİME KARTLARI (HER ZAMAN AÇIK) */}
        <TouchableOpacity 
          style={styles.activityBtn} 
          onPress={() => onSelectActivity('flashcard')}
        >
          <View style={styles.btnContent}>
            <Text style={styles.btnNumber}>1</Text>
            <Text style={styles.btnText}>KELİME KARTLARI</Text>
          </View>
          {progress > 0 && <Text style={styles.checkIcon}>✓</Text>}
        </TouchableOpacity>

        {/* 2. QUİZ (1 BİTİNCE AÇILIR) */}
        <TouchableOpacity 
          style={[styles.activityBtn, progress < 1 && styles.disabledBtn]} 
          onPress={() => progress >= 1 && onSelectActivity('quiz')}
          activeOpacity={progress >= 1 ? 0.7 : 1}
        >
          <View style={styles.btnContent}>
            <Text style={[styles.btnNumber, progress < 1 && {opacity: 0.5}]}>2</Text>
            <Text style={[styles.btnText, progress < 1 && {opacity: 0.5}]}>KELİME TESTİ (QUİZ)</Text>
          </View>
          {progress < 1 ? <Text style={styles.lockIcon}>🔒</Text> : (progress > 1 && <Text style={styles.checkIcon}>✓</Text>)}
        </TouchableOpacity>

        {/* 3. CÜMLE KURMA (2 BİTİNCE AÇILIR) */}
        <TouchableOpacity 
          style={[styles.activityBtn, progress < 2 && styles.disabledBtn]} 
          onPress={() => progress >= 2 && onSelectActivity('sentence')}
          activeOpacity={progress >= 2 ? 0.7 : 1}
        >
          <View style={styles.btnContent}>
            <Text style={[styles.btnNumber, progress < 2 && {opacity: 0.5}]}>3</Text>
            <Text style={[styles.btnText, progress < 2 && {opacity: 0.5}]}>CÜMLE KURMA</Text>
          </View>
          {progress < 2 ? <Text style={styles.lockIcon}>🔒</Text> : (progress > 2 && <Text style={styles.checkIcon}>✓</Text>)}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  header: { width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, marginBottom: 30 },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
  backBtnText: { color: '#0EA5E9', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  
  titleCard: {
    width: width * 0.85, paddingVertical: 30, backgroundColor: '#071022', 
    borderRadius: 20, borderWidth: 2, borderColor: '#8B5CF6', 
    alignItems: 'center', justifyContent: 'center', marginBottom: 50,
    shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 10,
  },
  titleText: { fontSize: 26, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', letterSpacing: 2 },
  subtitleText: { fontSize: 12, fontWeight: 'bold', color: '#A78BFA', marginTop: 10, letterSpacing: 3 },

  menu: { width: width * 0.85, gap: 20 },
  
  activityBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#0F172A', paddingVertical: 20, paddingHorizontal: 25,
    borderRadius: 20, borderWidth: 2, borderColor: '#38BDF8',
    shadowColor: '#38BDF8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
  },
  disabledBtn: { backgroundColor: '#020617', borderColor: '#1E293B', shadowOpacity: 0 },
  
  btnContent: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  btnNumber: { color: '#0EA5E9', fontSize: 24, fontWeight: '900' },
  btnText: { color: '#F8FAFC', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  
  checkIcon: { color: '#22C55E', fontSize: 24, fontWeight: 'bold' },
  lockIcon: { fontSize: 20 }
});
