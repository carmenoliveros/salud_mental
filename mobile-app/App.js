import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ProfessionalsList } from './components/ProfessionalsList';

export default function App() {
  return (
    <View style={styles.container}>
      <ProfessionalsList onSelectProfessional={(professional) => console.log('Selected:', professional)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50, // Add padding to avoid overlap with status bar
  },
});
