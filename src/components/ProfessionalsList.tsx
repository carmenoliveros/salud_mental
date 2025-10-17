import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, Star, MapPin, Video, Users, Clock } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("all");
  const [filterModality, setFilterModality] = useState("all");

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
    {
      id: 3,
      name: "Lic. Ana Martínez",
      specialty: "Psicóloga Infantil",
      description: "Especializada en niños y adolescentes. Ayudo a familias a superar dificultades emocionales y de comportamiento.",
      rating: 5.0,
      reviews: 156,
      price: 50,
      location: "Valencia, España",
      modality: ["Presencial", "Online"],
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=200&h=200&fit=crop",
      experience: 12,
      availability: "Disponible esta semana"
    },
    {
      id: 4,
      name: "Dr. Luis Fernández",
      specialty: "Psiquiatra",
      description: "Tratamiento integral de trastornos de ansiedad, depresión y trastornos del estado de ánimo. Enfoque holístico.",
      rating: 4.7,
      reviews: 84,
      price: 80,
      location: "Sevilla, España",
      modality: ["Presencial"],
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=200&h=200&fit=crop",
      experience: 15,
      availability: "Próxima semana"
    },
    {
      id: 5,
      name: "Lic. Isabel Ruiz",
      specialty: "Coach de Vida",
      description: "Te ayudo a descubrir tu potencial, establecer metas y crear la vida que deseas. Especializada en autoestima y propósito.",
      rating: 4.9,
      reviews: 112,
      price: 45,
      location: "Málaga, España",
      modality: ["Online"],
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=200&h=200&fit=crop",
      experience: 6,
      availability: "Disponible hoy"
    },
    {
      id: 6,
      name: "Dr. Roberto Silva",
      specialty: "Terapeuta de Pareja",
      description: "Ayudo a parejas a mejorar su comunicación, resolver conflictos y fortalecer su relación.",
      rating: 4.8,
      reviews: 91,
      price: 70,
      location: "Bilbao, España",
      modality: ["Presencial", "Online"],
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=200&h=200&fit=crop",
      experience: 9,
      availability: "Disponible esta semana"
    }
  ];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === "all" || prof.specialty === filterSpecialty;
    const matchesModality = filterModality === "all" || prof.modality.includes(filterModality);
    return matchesSearch && matchesSpecialty && matchesModality;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground mb-2">Encuentra tu profesional ideal</h1>
        <p className="text-muted-foreground">
          Conecta con especialistas en salud mental verificados y con experiencia.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o especialidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especialidades</SelectItem>
                <SelectItem value="Psicóloga Clínica">Psicóloga Clínica</SelectItem>
                <SelectItem value="Terapeuta Cognitivo">Terapeuta Cognitivo</SelectItem>
                <SelectItem value="Psicóloga Infantil">Psicóloga Infantil</SelectItem>
                <SelectItem value="Psiquiatra">Psiquiatra</SelectItem>
                <SelectItem value="Coach de Vida">Coach de Vida</SelectItem>
                <SelectItem value="Terapeuta de Pareja">Terapeuta de Pareja</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterModality} onValueChange={setFilterModality}>
              <SelectTrigger>
                <SelectValue placeholder="Modalidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las modalidades</SelectItem>
                <SelectItem value="Presencial">Presencial</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredProfessionals.length} profesionales encontrados
      </div>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.map((professional) => (
          <Card key={professional.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectProfessional(professional)}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={professional.avatar} alt={professional.name} />
                  <AvatarFallback>{professional.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{professional.name}</CardTitle>
                  <CardDescription>{professional.specialty}</CardDescription>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{professional.rating}</span>
                    <span className="text-sm text-muted-foreground">({professional.reviews})</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {professional.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {professional.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {professional.experience} años de experiencia
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {professional.availability}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {professional.modality.map((mod) => (
                  <Badge key={mod} variant="secondary">
                    {mod === "Online" && <Video className="h-3 w-3 mr-1" />}
                    {mod}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <span className="text-2xl">${professional.price}</span>
                  <span className="text-sm text-muted-foreground">/sesión</span>
                </div>
                <Button onClick={(e) => {
                  e.stopPropagation();
                  onSelectProfessional(professional);
                }}>
                  Ver perfil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
