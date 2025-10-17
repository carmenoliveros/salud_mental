
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, FlatList, StyleSheet } from 'react-native';

interface Professional {
  id: number;
  name: string;
  specialty: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  modality: string[];
  avatar: string;
  experience: number;
  availability: string;
}

interface ProfessionalsListProps {
  onSelectProfessional: (professional: Professional) => void;
}

export function ProfessionalsList({ onSelectProfessional }: ProfessionalsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [filterModality, setFilterModality] = useState('all');

  const professionals: Professional[] = [
    {
      id: 1,
      name: "Dra. María González",
      specialty: "Psicóloga Clínica",
      description: "Especialista en ansiedad, depresión y terapia cognitivo-conductual. Más de 10 años de experiencia ayudando a personas a superar sus desafíos emocionales.",
      rating: 4.9,
      reviews: 127,
      price: 60,
      location: "Madrid, España",
      modality: ["Presencial", "Online"],
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=200&h=200&fit=crop",
      experience: 10,
      availability: "Disponible esta semana"
    },
    {
      id: 2,
      name: "Dr. Carlos Méndez",
      specialty: "Terapeuta Cognitivo",
      description: "Experto en manejo del estrés, mindfulness y desarrollo personal. Enfoque práctico y centrado en soluciones.",
      rating: 4.8,
      reviews: 98,
      price: 55,
      location: "Barcelona, España",
      modality: ["Online"],
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=200&h=200&fit=crop",
      experience: 8,
      availability: "Disponible mañana"
    },
  ];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === "all" || prof.specialty === filterSpecialty;
    const matchesModality = filterModality === "all" || prof.modality.includes(filterModality);
    return matchesSearch && matchesSpecialty && matchesModality;
  });

  const renderItem = ({ item }: { item: Professional }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.avatar }} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
        </View>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Button title="Ver perfil" onPress={() => onSelectProfessional(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encuentra tu profesional ideal</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre o especialidad..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredProfessionals}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    color: 'gray',
  },
  description: {
    marginBottom: 10,
  },
});
