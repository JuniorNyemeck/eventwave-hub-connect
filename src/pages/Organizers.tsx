
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Users, Trophy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Organizers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const organizers = [
    {
      id: '1',
      name: 'EventPro Cameroun',
      avatar: '/placeholder.svg',
      verified: true,
      rating: 4.8,
      totalEvents: 45,
      totalAttendees: 12000,
      specialties: ['Concerts', 'Festivals'],
      location: 'Douala, Cameroun',
      description: 'Spécialiste des événements musicaux et culturels au Cameroun',
      upcomingEvents: 8,
      joinedYear: 2020
    },
    {
      id: '2',
      name: 'Tech Events CM',
      avatar: '/placeholder.svg',
      verified: true,
      rating: 4.9,
      totalEvents: 32,
      totalAttendees: 8500,
      specialties: ['Conférences', 'Formations'],
      location: 'Yaoundé, Cameroun',
      description: 'Organisation d\'événements technologiques et professionnels',
      upcomingEvents: 5,
      joinedYear: 2019
    },
    {
      id: '3',
      name: 'Cultural Heritage',
      avatar: '/placeholder.svg',
      verified: false,
      rating: 4.6,
      totalEvents: 28,
      totalAttendees: 6200,
      specialties: ['Art', 'Culture'],
      location: 'Bafoussam, Cameroun',
      description: 'Promotion de la culture et des arts traditionnels camerounais',
      upcomingEvents: 3,
      joinedYear: 2021
    },
    {
      id: '4',
      name: 'Sports Academy CM',
      avatar: '/placeholder.svg',
      verified: true,
      rating: 4.7,
      totalEvents: 38,
      totalAttendees: 9800,
      specialties: ['Sport'],
      location: 'Douala, Cameroun',
      description: 'Organisation de compétitions et événements sportifs',
      upcomingEvents: 6,
      joinedYear: 2018
    }
  ];

  const filteredOrganizers = organizers.filter(organizer =>
    organizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    organizer.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-gray-100 border-b py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos <span className="text-primary">organisateurs</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez les professionnels qui créent les meilleurs événements au Cameroun
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <div className="relative flex-1">
                <Input
                  placeholder="Rechercher des organisateurs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <Link to="/create-event">
                <Button size="lg" className="h-12">
                  Devenir organisateur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-muted-foreground">Organisateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2.5K+</div>
              <div className="text-sm text-muted-foreground">Événements organisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">450K+</div>
              <div className="text-sm text-muted-foreground">Participants satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-sm text-muted-foreground">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizers List */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {filteredOrganizers.length} organisateur{filteredOrganizers.length !== 1 ? 's' : ''} trouvé{filteredOrganizers.length !== 1 ? 's' : ''}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredOrganizers.map((organizer) => (
            <Card key={organizer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={organizer.avatar} />
                      <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-xl">{organizer.name}</CardTitle>
                        {organizer.verified && (
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{organizer.rating}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{organizer.totalEvents} événements</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{organizer.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{organizer.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {organizer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 text-center py-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{organizer.upcomingEvents}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">À venir</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{organizer.totalAttendees.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Participants</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{new Date().getFullYear() - organizer.joinedYear}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Années</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link to={`/organizers/${organizer.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Voir le profil
                    </Button>
                  </Link>
                  <Button className="flex-1">
                    Contacter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Rejoignez notre communauté d'organisateurs
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Créez des événements mémorables et développez votre audience au Cameroun
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary">
                S'inscrire gratuitement
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Organizers;
