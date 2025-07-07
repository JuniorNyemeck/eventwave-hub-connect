
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/events/EventCard';
import { categories, mockEvents } from '@/data/mockData';

const Categories = () => {
  const getCategoryStats = (categoryName: string) => {
    const categoryEvents = mockEvents.filter(event => event.category === categoryName);
    const totalAttendees = categoryEvents.reduce((sum, event) => sum + event.attendees, 0);
    const upcomingEvents = categoryEvents.filter(event => event.status === 'upcoming').length;
    
    return {
      totalEvents: categoryEvents.length,
      totalAttendees,
      upcomingEvents,
      popularEvent: categoryEvents.sort((a, b) => b.attendees - a.attendees)[0]
    };
  };

  const featuredCategories = categories.slice(0, 3);
  const allCategories = categories;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explorez par 
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {' '}catégorie
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez des événements dans vos domaines d'intérêt favoris. 
              De la musique au sport, en passant par la technologie et l'art.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>{mockEvents.length} événements actifs</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>{mockEvents.reduce((sum, event) => sum + event.attendees, 0).toLocaleString()} participants</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5" />
                <span>8 catégories disponibles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Catégories populaires</h2>
          <p className="text-muted-foreground">
            Les catégories les plus prisées par notre communauté
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {featuredCategories.map((category) => {
            const stats = getCategoryStats(category.name);
            
            return (
              <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${category.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg text-primary">{stats.totalEvents}</div>
                      <div className="text-muted-foreground">Événements</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-primary">{stats.totalAttendees.toLocaleString()}</div>
                      <div className="text-muted-foreground">Participants</div>
                    </div>
                  </div>
                  
                  {stats.popularEvent && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Événement populaire</div>
                      <div className="font-medium text-sm line-clamp-2">
                        {stats.popularEvent.title}
                      </div>
                    </div>
                  )}
                  
                  <Link to={`/categories/${category.id}`}>
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      Explorer {category.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Popular Events by Category */}
        <div className="space-y-12">
          {featuredCategories.map((category) => {
            const categoryEvents = mockEvents
              .filter(event => event.category === category.name)
              .slice(0, 3);
            
            if (categoryEvents.length === 0) return null;
            
            return (
              <div key={category.id}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center text-lg`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                      <p className="text-muted-foreground">
                        {categoryEvents.length} événement{categoryEvents.length > 1 ? 's' : ''} à venir
                      </p>
                    </div>
                  </div>
                  <Link to={`/categories/${category.id}`}>
                    <Button variant="outline">
                      Voir tout
                    </Button>
                  </Link>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {categoryEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Toutes les catégories</h2>
            <p className="text-muted-foreground">
              Explorez l'ensemble de nos catégories d'événements
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {allCategories.map((category) => {
              const stats = getCategoryStats(category.name);
              
              return (
                <Link key={category.id} to={`/categories/${category.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                      <div>
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${category.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                          {category.icon}
                        </div>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Événements:</span>
                          <Badge variant="secondary">{stats.totalEvents}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stats.upcomingEvents} à venir
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Vous ne trouvez pas votre catégorie ?
          </h2>
          <p className="text-muted-foreground mb-8">
            Créez votre propre événement et lancez une nouvelle tendance dans votre domaine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create-event">
              <Button size="lg">
                Créer un événement
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Suggérer une catégorie
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
