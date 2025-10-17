import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Calendar } from "./ui/calendar";
import { Star, MapPin, Video, Clock, Award, GraduationCap, CheckCircle, ArrowLeft } from "lucide-react";

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

interface ProfessionalDetailProps {
  professional: Professional;
  onBack: () => void;
  onBookAppointment: (appointmentData: any) => void;
}

export function ProfessionalDetail({ professional, onBack, onBookAppointment }: ProfessionalDetailProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedModality, setSelectedModality] = useState(professional.modality[0]);
  const [reason, setReason] = useState("");

  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const reviews = [
    {
      id: 1,
      author: "Laura P.",
      rating: 5,
      date: "Hace 2 semanas",
      comment: "Excelente profesional. Me ha ayudado mucho con mi ansiedad. Muy recomendable."
    },
    {
      id: 2,
      author: "Miguel R.",
      rating: 5,
      date: "Hace 1 mes",
      comment: "Gran empatía y profesionalismo. Las sesiones son muy productivas."
    },
    {
      id: 3,
      author: "Carmen S.",
      rating: 4,
      date: "Hace 2 meses",
      comment: "Muy buena terapeuta. Me siento mucho mejor después de cada sesión."
    }
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      onBookAppointment({
        professional,
        date: selectedDate,
        time: selectedTime,
        modality: selectedModality,
        reason
      });
      setIsBookingOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver
      </Button>

      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={professional.avatar} alt={professional.name} />
              <AvatarFallback>{professional.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="mb-1">{professional.name}</h1>
                <p className="text-muted-foreground">{professional.specialty}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{professional.rating}</span>
                  </div>
                  <span className="text-muted-foreground">• {professional.reviews} reseñas</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {professional.modality.map((mod) => (
                  <Badge key={mod} variant="secondary">
                    {mod === "Online" && <Video className="h-3 w-3 mr-1" />}
                    {mod}
                  </Badge>
                ))}
                <Badge variant="outline">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verificado
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {professional.location}
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  {professional.experience} años de experiencia
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {professional.availability}
                </div>
              </div>
            </div>

            <div className="md:text-right space-y-4">
              <div>
                <div className="text-3xl">${professional.price}</div>
                <div className="text-sm text-muted-foreground">por sesión de 50 min</div>
              </div>
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full md:w-auto">
                    Reservar cita
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Reservar cita con {professional.name}</DialogTitle>
                    <DialogDescription>
                      Completa los detalles de tu cita
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label>Modalidad de la sesión</Label>
                      <RadioGroup value={selectedModality} onValueChange={setSelectedModality}>
                        {professional.modality.map((mod) => (
                          <div key={mod} className="flex items-center space-x-2">
                            <RadioGroupItem value={mod} id={mod} />
                            <Label htmlFor={mod} className="font-normal cursor-pointer">
                              {mod}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Selecciona una fecha</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Horario disponible</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Motivo de consulta (opcional)</Label>
                      <Textarea
                        id="reason"
                        placeholder="Cuéntanos brevemente qué te gustaría trabajar en esta sesión..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <h4>Resumen de la cita</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Profesional:</strong> {professional.name}</p>
                        <p><strong>Fecha:</strong> {selectedDate?.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Hora:</strong> {selectedTime || "No seleccionada"}</p>
                        <p><strong>Modalidad:</strong> {selectedModality}</p>
                        <p><strong>Duración:</strong> 50 minutos</p>
                        <p><strong>Precio:</strong> ${professional.price}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsBookingOpen(false)} className="flex-1">
                        Cancelar
                      </Button>
                      <Button onClick={handleBooking} disabled={!selectedTime} className="flex-1">
                        Confirmar cita
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">Sobre mí</TabsTrigger>
          <TabsTrigger value="expertise">Especialidades</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas ({professional.reviews})</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Acerca de {professional.name.split(' ')[1]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {professional.description}
              </p>
              <p className="text-muted-foreground">
                Mi enfoque terapéutico se centra en crear un espacio seguro y libre de juicios donde puedas explorar tus pensamientos, emociones y comportamientos. Trabajo de manera colaborativa contigo para identificar tus fortalezas y desarrollar estrategias efectivas que te ayuden a alcanzar tus objetivos.
              </p>
              <p className="text-muted-foreground">
                Creo firmemente en el poder de la terapia para transformar vidas y estoy comprometida a acompañarte en tu proceso de crecimiento personal y bienestar emocional.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <GraduationCap className="inline h-5 w-5 mr-2" />
                Formación y certificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Licenciatura en Psicología - Universidad Complutense de Madrid</li>
                <li>• Máster en Psicología Clínica y de la Salud</li>
                <li>• Certificación en Terapia Cognitivo-Conductual</li>
                <li>• Formación en Mindfulness y Reducción del Estrés</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expertise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Áreas de especialización</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Ansiedad y trastornos de pánico",
                  "Depresión y trastornos del estado de ánimo",
                  "Estrés y agotamiento",
                  "Autoestima y desarrollo personal",
                  "Terapia cognitivo-conductual",
                  "Mindfulness y meditación",
                  "Gestión emocional",
                  "Relaciones interpersonales"
                ].map((specialty, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{specialty}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metodología de trabajo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2">Enfoque terapéutico</h4>
                <p className="text-muted-foreground">
                  Utilizo una combinación de técnicas basadas en evidencia, principalmente terapia cognitivo-conductual (TCC), mindfulness y técnicas de tercera generación. Cada plan de tratamiento es personalizado según tus necesidades específicas.
                </p>
              </div>
              <div>
                <h4 className="mb-2">Estructura de las sesiones</h4>
                <p className="text-muted-foreground">
                  Las sesiones tienen una duración de 50 minutos. Durante la primera sesión, realizaremos una evaluación completa para entender tu situación actual y establecer objetivos claros. Las sesiones posteriores se centrarán en trabajar hacia esos objetivos utilizando estrategias específicas.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{review.author}</CardTitle>
                    <CardDescription>{review.date}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
