import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, BookOpen, Video, Headphones, Heart, Clock, Play, BookmarkPlus, Bookmark } from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  type: "article" | "video" | "podcast" | "exercise";
  category: string;
  duration: string;
  image: string;
  isFavorite: boolean;
}

export function ContentLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [content, setContent] = useState<ContentItem[]>([
    {
      id: 1,
      title: "5 técnicas de respiración para calmar la ansiedad",
      description: "Aprende ejercicios de respiración efectivos que puedes usar en cualquier momento para reducir la ansiedad y encontrar calma.",
      type: "article",
      category: "Ansiedad",
      duration: "5 min",
      image: "https://images.unsplash.com/photo-1716816211509-6e7b2c82d845?w=400&h=250&fit=crop",
      isFavorite: false
    },
    {
      id: 2,
      title: "Meditación guiada para dormir mejor",
      description: "Una meditación relajante diseñada para ayudarte a conciliar el sueño y mejorar la calidad de tu descanso nocturno.",
      type: "podcast",
      category: "Sueño",
      duration: "15 min",
      image: "https://images.unsplash.com/photo-1635545999375-057ee4013deb?w=400&h=250&fit=crop",
      isFavorite: true
    },
    {
      id: 3,
      title: "Construyendo una autoestima saludable",
      description: "Descubre estrategias prácticas para desarrollar una autoestima sólida y mejorar tu relación contigo mismo.",
      type: "video",
      category: "Autoestima",
      duration: "12 min",
      image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=250&fit=crop",
      isFavorite: false
    },
    {
      id: 4,
      title: "Ejercicio de gratitud diaria",
      description: "Un ejercicio práctico para cultivar la gratitud y mejorar tu bienestar emocional día a día.",
      type: "exercise",
      category: "Mindfulness",
      duration: "10 min",
      image: "https://images.unsplash.com/photo-1716816211509-6e7b2c82d845?w=400&h=250&fit=crop",
      isFavorite: false
    },
    {
      id: 5,
      title: "Gestión del estrés laboral",
      description: "Técnicas efectivas para manejar el estrés en el trabajo y mantener un equilibrio saludable vida-trabajo.",
      type: "article",
      category: "Estrés",
      duration: "8 min",
      image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=250&fit=crop",
      isFavorite: true
    },
    {
      id: 6,
      title: "Mindfulness para principiantes",
      description: "Introducción práctica al mindfulness con ejercicios simples que puedes incorporar a tu rutina diaria.",
      type: "video",
      category: "Mindfulness",
      duration: "18 min",
      image: "https://images.unsplash.com/photo-1635545999375-057ee4013deb?w=400&h=250&fit=crop",
      isFavorite: false
    },
    {
      id: 7,
      title: "Podcast: Superando la procrastinación",
      description: "Conversación con expertos sobre las causas de la procrastinación y cómo superarla efectivamente.",
      type: "podcast",
      category: "Productividad",
      duration: "25 min",
      image: "https://images.unsplash.com/photo-1716816211509-6e7b2c82d845?w=400&h=250&fit=crop",
      isFavorite: false
    },
    {
      id: 8,
      title: "Ejercicio de relajación muscular progresiva",
      description: "Aprende a liberar la tensión física y mental con esta técnica de relajación paso a paso.",
      type: "exercise",
      category: "Ansiedad",
      duration: "12 min",
      image: "https://images.unsplash.com/photo-1635545999375-057ee4013deb?w=400&h=250&fit=crop",
      isFavorite: false
    }
  ]);

  const categories = ["all", "Ansiedad", "Sueño", "Autoestima", "Mindfulness", "Estrés", "Productividad"];

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setContent(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const getIcon = (type: ContentItem['type']) => {
    switch (type) {
      case "article": return <BookOpen className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "podcast": return <Headphones className="h-4 w-4" />;
      case "exercise": return <Heart className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: ContentItem['type']) => {
    switch (type) {
      case "article": return "Artículo";
      case "video": return "Video";
      case "podcast": return "Podcast";
      case "exercise": return "Ejercicio";
    }
  };

  const filterByType = (type: ContentItem['type'] | 'all') => {
    if (type === 'all') return filteredContent;
    return filteredContent.filter(item => item.type === type);
  };

  const favorites = content.filter(item => item.isFavorite);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground mb-2">Biblioteca de contenido</h1>
        <p className="text-muted-foreground">
          Recursos de autocuidado para tu bienestar emocional.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contenido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "Todos" : category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todos ({filteredContent.length})</TabsTrigger>
          <TabsTrigger value="article">
            Artículos ({filterByType('article').length})
          </TabsTrigger>
          <TabsTrigger value="video">
            Videos ({filterByType('video').length})
          </TabsTrigger>
          <TabsTrigger value="podcast">
            Podcasts ({filterByType('podcast').length})
          </TabsTrigger>
          <TabsTrigger value="favorites">
            Favoritos ({favorites.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden aspect-video">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="h-6 w-6 text-primary ml-1" />
                      </div>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  >
                    {item.isFavorite ? (
                      <Bookmark className="h-4 w-4 fill-primary text-primary" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">
                      {getIcon(item.type)}
                      <span className="ml-1">{getTypeLabel(item.type)}</span>
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </div>
                    <Button size="sm">
                      {item.type === "video" ? "Ver" : 
                       item.type === "podcast" ? "Escuchar" : 
                       "Leer"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="article" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterByType('article').map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden aspect-video">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  >
                    {item.isFavorite ? (
                      <Bookmark className="h-4 w-4 fill-primary text-primary" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">
                      {getIcon(item.type)}
                      <span className="ml-1">{getTypeLabel(item.type)}</span>
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </div>
                    <Button size="sm">Leer</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="video" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterByType('video').map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden aspect-video">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary ml-1" />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  >
                    {item.isFavorite ? (
                      <Bookmark className="h-4 w-4 fill-primary text-primary" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">
                      {getIcon(item.type)}
                      <span className="ml-1">{getTypeLabel(item.type)}</span>
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </div>
                    <Button size="sm">Ver</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="podcast" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterByType('podcast').map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden aspect-video">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  >
                    {item.isFavorite ? (
                      <Bookmark className="h-4 w-4 fill-primary text-primary" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">
                      {getIcon(item.type)}
                      <span className="ml-1">{getTypeLabel(item.type)}</span>
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </div>
                    <Button size="sm">Escuchar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map(item => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative overflow-hidden aspect-video">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="h-6 w-6 text-primary ml-1" />
                        </div>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                    >
                      <Bookmark className="h-4 w-4 fill-primary text-primary" />
                    </Button>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">
                        {getIcon(item.type)}
                        <span className="ml-1">{getTypeLabel(item.type)}</span>
                      </Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {item.duration}
                      </div>
                      <Button size="sm">
                        {item.type === "video" ? "Ver" : 
                         item.type === "podcast" ? "Escuchar" : 
                         "Leer"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">
                  Aún no tienes contenido guardado en favoritos.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Explora nuestra biblioteca y guarda tus recursos preferidos.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
