
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, TrendingUp, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EventCard from '@/components/events/EventCard';
import { mockEvents, categories } from '@/data/mockData';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const featuredEvents = mockEvents.filter(event => event.featured);
  const upcomingEvents = mockEvents.filter(event => event.status === 'upcoming').slice(0, 6);

  const cameroonCities = [
    'Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua',
    'Ngaoundéré', 'Bertoua', 'Ebolowa', 'Kribi', 'Limbe', 'Buea'
  ];

  const stats = [
    { label: 'Événements actifs', value: '1,247', icon: Calendar },
    { label: 'Participants', value: '45K+', icon: Users },
    { label: 'Organisateurs', value: '284', icon: Star },
    { label: 'Villes', value: '15+', icon: MapPin }
  ];

  const quickCategories = categories.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-orange-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Découvrez des événements
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              {' '}extraordinaires
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Participez aux meilleurs événements à Douala et créez vos propres expériences inoubliables
          </p>

          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <Input
                  placeholder="Rechercher des événements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-white/70 h-12"
                />
              </div>
              <div className="relative min-w-48">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 bg-white/20 border border-white/30 rounded-lg text-white appearance-none cursor-pointer"
                >
                  <option value="">Toutes les villes</option>
                  {cameroonCities.map(city => (
                    <option key={city} value={city} className="text-black">{city}</option>
                  ))}
                </select>
              </div>
              <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                <Search className="mr-2 h-5 w-5" />
                Rechercher
              </Button>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {quickCategories.map((category) => (
              <Link key={category.id} to={`/categories/${category.id}`}>
                <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors px-4 py-2 text-sm"
                >
                  <category.icon size={16} />
                  <span className="ml-2">{category.name}</span>
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 bg-transparent">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Événements à la une</h2>
            <p className="text-muted-foreground">Découvrez nos événements les plus populaires</p>
          </div>
          <Link to="/discover">
            <Button variant="outline" className="group">
              Voir tout
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="featured" />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explorez par catégorie</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez exactement ce que vous cherchez parmi nos catégories d'événements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/categories/${category.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform text-white`}>
                      <category.icon size={24} />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} événements
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Événements à venir</h2>
            <p className="text-muted-foreground">Ne manquez pas ces prochains événements</p>
          </div>
          <Link to="/discover">
            <Button variant="outline" className="group">
              <TrendingUp className="mr-2 h-4 w-4" />
              Voir les tendances
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à créer votre propre événement ?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'organisateurs qui font confiance à EventWave pour créer des expériences mémorables à Douala
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Créer un événement
              </Button>
            </Link>
            <Link to="/organizers">
              <Button size="lg" variant="outline" className="h-12 px-8 text-white border-white hover:bg-white/10">
                Devenir organisateur
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
