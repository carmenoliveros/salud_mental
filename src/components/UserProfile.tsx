import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { User, Mail, Phone, MapPin, Calendar, Target, Heart, Bell, Lock, Edit2, Save } from "lucide-react";

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Ana López",
    email: "ana.lopez@email.com",
    phone: "+34 612 345 678",
    location: "Madrid, España",
    birthdate: "1990-05-15",
    goals: "Mejorar mi ansiedad y desarrollar hábitos de autocuidado saludables.",
    emergencyContact: "María López - +34 687 654 321"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to backend/Supabase
  };

  const emotionalJourney = [
    { month: "Jun", anxiety: 70, mood: 50, sleep: 60 },
    { month: "Jul", anxiety: 65, mood: 55, sleep: 65 },
    { month: "Ago", anxiety: 55, mood: 65, sleep: 70 },
    { month: "Sep", anxiety: 45, mood: 70, sleep: 75 },
    { month: "Oct", anxiety: 25, mood: 75, sleep: 70 }
  ];

  const achievements = [
    { id: 1, title: "Primera sesión completada", date: "Jun 2025", icon: "🎯" },
    { id: 2, title: "5 sesiones completadas", date: "Jul 2025", icon: "⭐" },
    { id: 3, title: "Racha de 7 días de meditación", date: "Ago 2025", icon: "🔥" },
    { id: 4, title: "10 sesiones completadas", date: "Oct 2025", icon: "🏆" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground mb-2">Mi perfil</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal y preferencias.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=200&h=200&fit=crop" alt={formData.name} />
                <AvatarFallback>{formData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle>{formData.name}</CardTitle>
              <CardDescription>{formData.email}</CardDescription>
              <Badge className="mt-2">Miembro desde Jun 2025</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progreso general</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl">8</div>
                <div className="text-xs text-muted-foreground">Sesiones</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">12</div>
                <div className="text-xs text-muted-foreground">Favoritos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="info" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="goals">Objetivos</TabsTrigger>
                <TabsTrigger value="progress">Progreso</TabsTrigger>
                <TabsTrigger value="settings">Ajustes</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="info" className="space-y-4 mt-0">
                <div className="flex items-center justify-between mb-4">
                  <h3>Información personal</h3>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar
                      </>
                    ) : (
                      <>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Editar
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      <User className="inline h-4 w-4 mr-2" />
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="inline h-4 w-4 mr-2" />
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <MapPin className="inline h-4 w-4 mr-2" />
                      Ubicación
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthdate">
                      <Calendar className="inline h-4 w-4 mr-2" />
                      Fecha de nacimiento
                    </Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={formData.birthdate}
                      onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency">Contacto de emergencia</Label>
                    <Input
                      id="emergency"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Nombre - Teléfono"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="goals" className="space-y-4 mt-0">
                <div>
                  <h3 className="mb-2">Mis objetivos de bienestar</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Define qué te gustaría lograr con tu proceso terapéutico.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">
                    <Target className="inline h-4 w-4 mr-2" />
                    Objetivos personales
                  </Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    rows={4}
                    placeholder="¿Qué te gustaría mejorar o trabajar?"
                  />
                </div>

                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="text-base">Logros alcanzados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">{achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-4 mt-0">
                <div>
                  <h3 className="mb-2">Tu evolución emocional</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Seguimiento de tu bienestar en los últimos meses.
                  </p>
                </div>

                <div className="space-y-6">
                  {emotionalJourney.map((month, index) => (
                    <div key={month.month}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{month.month} 2025</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Ansiedad</span>
                            <span>{month.anxiety}%</span>
                          </div>
                          <Progress value={month.anxiety} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Estado de ánimo</span>
                            <span>{month.mood}%</span>
                          </div>
                          <Progress value={month.mood} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Calidad del sueño</span>
                            <span>{month.sleep}%</span>
                          </div>
                          <Progress value={month.sleep} className="h-2" />
                        </div>
                      </div>
                      {index < emotionalJourney.length - 1 && (
                        <div className="border-b my-4" />
                      )}
                    </div>
                  ))}
                </div>

                <Card className="bg-accent/10 border-accent">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium">¡Gran progreso!</p>
                        <p className="text-sm text-muted-foreground">
                          Has reducido tu ansiedad en un 45% en los últimos 4 meses. Sigue así.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4 mt-0">
                <div>
                  <h3 className="mb-2">Preferencias y privacidad</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configura cómo quieres usar MindCare.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      <Bell className="inline h-4 w-4 mr-2" />
                      Notificaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Recordatorios de citas</p>
                        <p className="text-sm text-muted-foreground">24h antes de cada sesión</p>
                      </div>
                      <Button variant="outline" size="sm">Activado</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Contenido recomendado</p>
                        <p className="text-sm text-muted-foreground">Sugerencias personalizadas</p>
                      </div>
                      <Button variant="outline" size="sm">Activado</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Registro emocional</p>
                        <p className="text-sm text-muted-foreground">Recordatorio diario</p>
                      </div>
                      <Button variant="outline" size="sm">Desactivado</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      <Lock className="inline h-4 w-4 mr-2" />
                      Seguridad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Cambiar contraseña
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Autenticación de dos factores
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Descargar mis datos
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
