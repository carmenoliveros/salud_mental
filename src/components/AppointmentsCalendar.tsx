import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Clock, Video, MapPin, Calendar as CalendarIcon, Edit, Trash2 } from "lucide-react";

interface Appointment {
  id: number;
  professional: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  avatar: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface AppointmentsCalendarProps {
  appointments?: Appointment[];
}

export function AppointmentsCalendar({ appointments: propAppointments }: AppointmentsCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const defaultAppointments: Appointment[] = propAppointments || [
    {
      id: 1,
      professional: "Dra. María González",
      specialty: "Psicóloga Clínica",
      date: "2025-10-20",
      time: "10:00",
      type: "Videollamada",
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=100&h=100&fit=crop",
      status: "upcoming"
    },
    {
      id: 2,
      professional: "Dr. Carlos Méndez",
      specialty: "Terapeuta Cognitivo",
      date: "2025-10-24",
      time: "16:30",
      type: "Presencial",
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=100&h=100&fit=crop",
      status: "upcoming"
    },
    {
      id: 3,
      professional: "Lic. Ana Martínez",
      specialty: "Psicóloga Infantil",
      date: "2025-10-18",
      time: "11:00",
      type: "Online",
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=100&h=100&fit=crop",
      status: "upcoming"
    },
    {
      id: 4,
      professional: "Dra. María González",
      specialty: "Psicóloga Clínica",
      date: "2025-10-15",
      time: "10:00",
      type: "Videollamada",
      avatar: "https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=100&h=100&fit=crop",
      status: "completed"
    }
  ];

  const [appointments, setAppointments] = useState(defaultAppointments);

  const appointmentDates = appointments
    .filter(apt => apt.status === "upcoming")
    .map(apt => new Date(apt.date));

  const selectedDateAppointments = appointments.filter(apt => {
    if (!selectedDate) return false;
    const aptDate = new Date(apt.date);
    return aptDate.toDateString() === selectedDate.toDateString();
  });

  const upcomingAppointments = appointments
    .filter(apt => apt.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const completedAppointments = appointments.filter(apt => apt.status === "completed");

  const handleCancelAppointment = (id: number) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: "cancelled" as const } : apt
    ));
    setIsDetailOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground mb-2">Calendario de citas</h1>
        <p className="text-muted-foreground">
          Gestiona tus sesiones programadas y completas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Selecciona una fecha</CardTitle>
            <CardDescription>Días con citas marcados</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                booked: appointmentDates
              }}
              modifiersStyles={{
                booked: { 
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  color: 'hsl(var(--primary))'
                }
              }}
            />
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Total de citas:</strong> {upcomingAppointments.length} próximas
              </p>
              <p className="text-sm">
                <strong>Completadas:</strong> {completedAppointments.length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedDate
                ? `Citas del ${selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}`
                : "Todas las citas próximas"}
            </CardTitle>
            <CardDescription>
              {selectedDateAppointments.length > 0 && selectedDate
                ? `${selectedDateAppointments.length} cita(s) programada(s)`
                : selectedDate
                ? "No hay citas programadas para este día"
                : `${upcomingAppointments.length} cita(s) próxima(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(selectedDate && selectedDateAppointments.length > 0
              ? selectedDateAppointments
              : upcomingAppointments
            ).map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setIsDetailOpen(true);
                }}
              >
                <Avatar className="h-14 w-14">
                  <AvatarImage src={appointment.avatar} alt={appointment.professional} />
                  <AvatarFallback>
                    {appointment.professional.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{appointment.professional}</p>
                    <Badge 
                      variant={
                        appointment.status === "upcoming" ? "default" :
                        appointment.status === "completed" ? "secondary" :
                        "outline"
                      }
                    >
                      {appointment.status === "upcoming" ? "Próxima" :
                       appointment.status === "completed" ? "Completada" :
                       "Cancelada"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(appointment.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center gap-1">
                      {appointment.type === "Videollamada" || appointment.type === "Online" ? (
                        <Video className="h-3 w-3" />
                      ) : (
                        <MapPin className="h-3 w-3" />
                      )}
                      {appointment.type}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {selectedDate && selectedDateAppointments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay citas programadas para este día</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Appointment Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles de la cita</DialogTitle>
            <DialogDescription>
              Información completa de tu sesión programada
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedAppointment.avatar} alt={selectedAppointment.professional} />
                  <AvatarFallback>
                    {selectedAppointment.professional.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedAppointment.professional}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.specialty}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Fecha</span>
                  <span className="font-medium">
                    {new Date(selectedAppointment.date).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Hora</span>
                  <span className="font-medium">{selectedAppointment.time}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Modalidad</span>
                  <Badge variant="secondary">{selectedAppointment.type}</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Duración</span>
                  <span className="font-medium">50 minutos</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Estado</span>
                  <Badge 
                    variant={
                      selectedAppointment.status === "upcoming" ? "default" :
                      selectedAppointment.status === "completed" ? "secondary" :
                      "outline"
                    }
                  >
                    {selectedAppointment.status === "upcoming" ? "Confirmada" :
                     selectedAppointment.status === "completed" ? "Completada" :
                     "Cancelada"}
                  </Badge>
                </div>
              </div>

              {selectedAppointment.status === "upcoming" && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Recordatorio:</strong> Recibirás un correo 24 horas antes de tu cita con el enlace para unirte a la videollamada.
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex gap-2">
            {selectedAppointment?.status === "upcoming" && (
              <>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Reagendar
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => selectedAppointment && handleCancelAppointment(selectedAppointment.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Cancelar cita
                </Button>
              </>
            )}
            <Button variant="default" onClick={() => setIsDetailOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
