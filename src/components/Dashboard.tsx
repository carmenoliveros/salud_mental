import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Calendar, Clock, BookOpen, TrendingUp, Video, Heart } from "lucide-react";
import { Progress } from "./ui/progress";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const upcomingAppointments = [
    {
      id: 1,
      professional: "Dra. María González",
      specialty: "Psicóloga Clínica",
      date: "2025-10-20",
      time: "10:00",
      type: "Videollamada",
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      professional: "Dr. Carlos Méndez",
      specialty: "Terapeuta Cognitivo",
      date: "2025-10-24",
      time: "16:30",
      type: "Presencial",
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=100&h=100&fit=crop"
    }
  ];

  const recommendedContent = [
    {
      id: 1,
      title: "5 técnicas de respiración para la ansiedad",
      type: "Artículo",
      duration: "5 min",
      category: "Ansiedad"
    },
    {
      id: 2,
      title: "Meditación guiada para dormir mejor",
      type: "Audio",
      duration: "15 min",
      category: "Sueño"
    },
    {
      id: 3,
      title: "Cómo construir autoestima saludable",
      type: "Video",
      duration: "12 min",
      category: "Autoestima"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-foreground mb-2">Bienvenido de nuevo 🌸</h1>
        <p className="text-muted-foreground">
          Tu bienestar es importante. Aquí está tu resumen de hoy.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Próximas citas</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Sesiones completadas</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">8</div>
            <p className="text-xs text-muted-foreground">+2 este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Contenido guardado</CardTitle>
            <BookOpen className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">12</div>
            <p className="text-xs text-muted-foreground">Favoritos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Bienestar emocional</CardTitle>
            <Heart className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">75%</div>
            <p className="text-xs text-muted-foreground">+5% esta semana</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Próximas citas</CardTitle>
                <CardDescription>Tus sesiones programadas</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => onNavigate('calendar')}>
                Ver calendario
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={appointment.avatar} alt={appointment.professional} />
                  <AvatarFallback>{appointment.professional.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{appointment.professional}</p>
                  <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(appointment.date).toLocaleDateString('es-ES', { 
                      weekday: 'short', 
                      day: 'numeric', 
                      month: 'short' 
                    })} • {appointment.time}
                  </div>
                </div>
                <Badge variant={appointment.type === "Videollamada" ? "default" : "secondary"}>
                  {appointment.type === "Videollamada" ? <Video className="h-3 w-3 mr-1" /> : null}
                  {appointment.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Emotional Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso emocional</CardTitle>
            <CardDescription>Tu evolución semanal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Ansiedad</span>
                <span className="text-muted-foreground">Bajo</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Estado de ánimo</span>
                <span className="text-muted-foreground">Bien</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Calidad del sueño</span>
                <span className="text-muted-foreground">Bueno</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Energía</span>
                <span className="text-muted-foreground">Moderado</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contenido recomendado</CardTitle>
              <CardDescription>Recursos seleccionados para ti</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate('content')}>
              Ver todo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedContent.map((content) => (
              <div
                key={content.id}
                className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
              >
                <Badge variant="outline" className="mb-2">{content.category}</Badge>
                <h4 className="mb-2">{content.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-3 w-3" />
                  {content.type} • {content.duration}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
