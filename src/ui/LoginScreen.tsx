import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  onLogin: (firstName: string, lastName: string) => void;
}

const StarryBackground = () => {
  const [stars] = useState(() => 
    Array.from({ length: 80 }).map((_, i) => ({
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

export default function LoginScreen({ onLogin }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleStart = () => {
    // Kural 5: Hata Yönetimi (try-catch zorunluluğu)
    try {
      const fName = firstName.trim();
      const lName = lastName.trim();

      if (fName.length === 0 || lName.length === 0) {
        throw new Error("Lütfen adınızı ve soyadınızı boş bırakmayın.");
      }
      
      if (fName.length < 2) {
        throw new Error("Adınız en az 2 karakter olmalıdır.");
      }

      // Hata fırlatılmazsa oyuna giriş yap
      onLogin(fName, lName);
      
    } catch (error: any) {
      // Yakalanan hatayı kullanıcıya göster
      alert(`Giriş Hatası: ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <StarryBackground />
      
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>ROUTELINGO</Text>
        <Text style={styles.subLogoText}>UZAY AKADEMİSİ'NE HOŞ GELDİN</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>ADINIZ:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Örn: Ali" 
          placeholderTextColor="#64748B"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>SOYADINIZ:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Örn: Yılmaz" 
          placeholderTextColor="#64748B"
          value={lastName}
          onChangeText={setLastName}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleStart} activeOpacity={0.8}>
          <Text style={styles.loginBtnText}>UZAY GEMİSİNE BİN 🚀</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  logoText: { color: '#0EA5E9', fontSize: 42, fontWeight: '900', letterSpacing: 4, textShadowColor: '#0EA5E9', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20 },
  subLogoText: { color: '#A78BFA', fontSize: 14, fontWeight: 'bold', letterSpacing: 2, marginTop: 5 },

  formContainer: {
    width: width * 0.85, backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: 30,
    borderRadius: 25, borderWidth: 2, borderColor: '#38BDF8',
    shadowColor: '#38BDF8', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 10,
  },
  
  label: { color: '#E2E8F0', fontSize: 14, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8, marginLeft: 5 },
  input: {
    backgroundColor: '#020617', color: '#FFF', fontSize: 18, fontWeight: 'bold',
    paddingHorizontal: 20, paddingVertical: 15, borderRadius: 15, borderWidth: 1, borderColor: '#475569',
    marginBottom: 25,
  },

  loginBtn: {
    backgroundColor: '#8B5CF6', paddingVertical: 18, borderRadius: 20, alignItems: 'center',
    shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.6, shadowRadius: 10, elevation: 5,
    marginTop: 10
  },
  loginBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', letterSpacing: 1 }
});
