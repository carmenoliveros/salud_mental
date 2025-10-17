import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { ProfessionalsList } from "./components/ProfessionalsList";
import { ProfessionalDetail } from "./components/ProfessionalDetail";
import { AppointmentsCalendar } from "./components/AppointmentsCalendar";
import { ContentLibrary } from "./components/ContentLibrary";
import { UserProfile } from "./components/UserProfile";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BookOpen, 
  User, 
  Menu,
  X,
  Heart,
  LogOut
} from "lucide-react";

type View = 'dashboard' | 'professionals' | 'calendar' | 'content' | 'profile';

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

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);

  const navigation = [
    { name: 'Inicio', icon: LayoutDashboard, view: 'dashboard' as View },
    { name: 'Profesionales', icon: Users, view: 'professionals' as View },
    { name: 'Mis citas', icon: Calendar, view: 'calendar' as View },
    { name: 'Contenido', icon: BookOpen, view: 'content' as View },
    { name: 'Mi perfil', icon: User, view: 'profile' as View },
  ];

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setSelectedProfessional(null);
    setIsMobileMenuOpen(false);
  };

  const handleSelectProfessional = (professional: Professional) => {
    setSelectedProfessional(professional);
  };

  const handleBackToProfessionals = () => {
    setSelectedProfessional(null);
  };

  const handleBookAppointment = (appointmentData: any) => {
    const newAppointment = {
      id: appointments.length + 100,
      professional: appointmentData.professional.name,
      specialty: appointmentData.professional.specialty,
      date: appointmentData.date.toISOString().split('T')[0],
      time: appointmentData.time,
      type: appointmentData.modality,
      avatar: appointmentData.professional.avatar,
      status: "upcoming" as const
    };
    
    setAppointments([...appointments, newAppointment]);
    
    toast.success("¡Cita reservada!", {
      description: `Tu cita con ${appointmentData.professional.name} ha sido confirmada para el ${appointmentData.date.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      })} a las ${appointmentData.time}.`,
    });
    
    setSelectedProfessional(null);
    setCurrentView('calendar');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-xl text-primary">MindCare</span>
                <span className="text-xs text-muted-foreground hidden sm:block">Bienestar mental en tus manos</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Button
                key={item.view}
                variant={currentView === item.view && !selectedProfessional ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigate(item.view)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9 cursor-pointer hidden sm:flex" onClick={() => handleNavigate('profile')}>
              <AvatarImage src="https://images.unsplash.com/photo-1758273241260-f49172d876e3?w=100&h=100&fit=crop" alt="Usuario" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Button
                  key={item.view}
                  variant={currentView === item.view && !selectedProfessional ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleNavigate(item.view)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              ))}
              <div className="pt-2 border-t">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8">
        {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        
        {currentView === 'professionals' && !selectedProfessional && (
          <ProfessionalsList onSelectProfessional={handleSelectProfessional} />
        )}
        
        {currentView === 'professionals' && selectedProfessional && (
          <ProfessionalDetail
            professional={selectedProfessional}
            onBack={handleBackToProfessionals}
            onBookAppointment={handleBookAppointment}
          />
        )}
        
        {currentView === 'calendar' && <AppointmentsCalendar appointments={appointments} />}
        
        {currentView === 'content' && <ContentLibrary />}
        
        {currentView === 'profile' && <UserProfile />}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary fill-primary" />
                <span className="font-bold text-lg text-primary">MindCare</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tu plataforma de confianza para el bienestar mental y emocional.
              </p>
            </div>
            
            <div>
              <h4 className="mb-3">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">Blog</li>
                <li className="hover:text-foreground cursor-pointer">Guías</li>
                <li className="hover:text-foreground cursor-pointer">FAQs</li>
                <li className="hover:text-foreground cursor-pointer">Comunidad</li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">Privacidad</li>
                <li className="hover:text-foreground cursor-pointer">Términos</li>
                <li className="hover:text-foreground cursor-pointer">Cookies</li>
                <li className="hover:text-foreground cursor-pointer">Contacto</li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-3">Soporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">Centro de ayuda</li>
                <li className="hover:text-foreground cursor-pointer">Chat en vivo</li>
                <li className="hover:text-foreground cursor-pointer">Línea de crisis</li>
                <li className="hover:text-foreground cursor-pointer">Emergencias: 112</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>© 2025 MindCare. Todos los derechos reservados.</p>
            <p className="mt-1">
              Si tienes una emergencia, llama al 112 o acude al servicio de urgencias más cercano.
            </p>
          </div>
        </div>
      </footer>

      <Toaster position="top-right" />
    </div>
  );
}
