import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const suggestions = ['Zaplanuj zadanie', 'Przeanalizuj problem', 'Uruchom narzędzie'];

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const send = () => {
    const value = input.trim();
    if (!value) return;
    setMessages((current) => [...current, value]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>AGENT ANDROID</Text>
            <Text style={styles.title}>Agent</Text>
          </View>
          <View style={styles.status}><View style={styles.dot} /><Text style={styles.statusText}>READY</Text></View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Co mam wykonać?</Text>
          <Text style={styles.heroText}>Napisz cel. Agent dobierze model, narzędzia i kolejne kroki.</Text>
        </View>

        {messages.length > 0 && (
          <View style={styles.thread}>
            {messages.map((message, index) => <View key={`${message}-${index}`} style={styles.message}><Text style={styles.messageText}>{message}</Text></View>)}
          </View>
        )}

        <View style={styles.suggestions}>
          {suggestions.map((item) => <Pressable key={item} onPress={() => setInput(item)} style={styles.chip}><Text style={styles.chipText}>{item}</Text></Pressable>)}
        </View>

        <View style={styles.composer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={send}
            placeholder="Opisz zadanie..."
            placeholderTextColor="#657086"
            multiline
            style={styles.input}
            textAlignVertical="top"
          />
          <Pressable disabled={!canSend} onPress={send} style={[styles.send, !canSend && styles.sendDisabled]}><Text style={styles.sendText}>↑</Text></Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B0F19' },
  container: { flex: 1, padding: 20, gap: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { color: '#73809A', fontSize: 11, letterSpacing: 2, fontWeight: '700' },
  title: { color: '#F4F7FB', fontSize: 28, fontWeight: '800', marginTop: 4 },
  status: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1, borderColor: '#263149', borderRadius: 99 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#72E0A2' },
  statusText: { color: '#9BA8BF', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  hero: { paddingTop: 34, paddingBottom: 18 },
  heroTitle: { color: '#F4F7FB', fontSize: 34, fontWeight: '800', letterSpacing: -1 },
  heroText: { marginTop: 10, color: '#8F9AB0', fontSize: 15, lineHeight: 23, maxWidth: 360 },
  thread: { flex: 1, gap: 10 },
  message: { alignSelf: 'flex-end', maxWidth: '90%', backgroundColor: '#1A2232', borderRadius: 18, paddingHorizontal: 15, paddingVertical: 12 },
  messageText: { color: '#E8EDF5', fontSize: 15, lineHeight: 21 },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: '#28334A', borderRadius: 99, paddingHorizontal: 12, paddingVertical: 9 },
  chipText: { color: '#A7B2C7', fontSize: 12, fontWeight: '600' },
  composer: { minHeight: 118, borderWidth: 1, borderColor: '#2B3750', borderRadius: 22, padding: 14, backgroundColor: '#111725' },
  input: { flex: 1, color: '#F4F7FB', fontSize: 16, lineHeight: 23, paddingRight: 48 },
  send: { position: 'absolute', right: 12, bottom: 12, width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F7FB' },
  sendDisabled: { opacity: 0.28 },
  sendText: { color: '#0B0F19', fontSize: 22, fontWeight: '800' },
});
