
import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EventCard from '@/components/events/EventCard';
import { mockEvents, categories, cameroonCities } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('date-asc');

  const category = categories.find(cat => cat.id === categoryId);
  const categoryEvents = mockEvents.filter(event => 
    event.category.toLowerCase() === category?.name.toLowerCase()
  );

  const filteredEvents = useMemo(() => {
    let filtered = categoryEvents.filter(event => {
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCity && event.location.city !== selectedCity) {
        return false;
      }
      return true;
    });

    switch (sortBy) {
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price.min - b.price.min);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price.max - a.price.max);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.attendees - a.attendees);
        break;
    }

    return filtered;
  }, [categoryEvents, searchQuery, selectedCity, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('categories.not_found')}</h1>
          <Link to="/categories">
            <Button>{t('categories.back_to_categories')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = {
    totalEvents: categoryEvents.length,
    totalAttendees: categoryEvents.reduce((sum, event) => sum + event.attendees, 0),
    avgPrice: categoryEvents.reduce((sum, event) => sum + event.price.min, 0) / categoryEvents.length,
    upcomingEvents: categoryEvents.filter(event => event.status === 'upcoming').length
  };

  const IconComponent = category.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/categories">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-2xl text-white`}>
              <IconComponent size={24} />
            </div>
              <div>
                <h1 className="text-4xl font-bold">{category.name}</h1>
                <p className="text-muted-foreground">
                  {stats.totalEvents} {t('discover.events_found').replace('{s}', stats.totalEvents !== 1 ? 's' : '')} • {stats.upcomingEvents} {t('categories.upcoming')}
                </p>
              </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalEvents}</div>
                <div className="text-sm text-muted-foreground">{t('common.events')}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalAttendees.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">{t('common.participants')}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(stats.avgPrice).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">{t('categories.avg_price')}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{stats.upcomingEvents}</div>
                <div className="text-sm text-muted-foreground">{t('categories.upcoming')}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder={`${t('common.search')} dans cette catégorie...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-48 h-12">
                <SelectValue placeholder="Toutes les villes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les villes</SelectItem>
                {cameroonCities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">{t('discover.sort_date_asc')}</SelectItem>
                <SelectItem value="date-desc">{t('discover.sort_date_desc')}</SelectItem>
                <SelectItem value="price-asc">{t('discover.sort_price_asc')}</SelectItem>
                <SelectItem value="price-desc">{t('discover.sort_price_desc')}</SelectItem>
                <SelectItem value="popularity">{t('discover.sort_popularity')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="container mx-auto px-4 py-8">
        {filteredEvents.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="text-4xl">🔍</div>
              <h3 className="text-lg font-semibold">{t('discover.no_events')}</h3>
              <p className="text-muted-foreground">
                {t('categories.no_events_category')}
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCity('');
              }}>
                {t('discover.clear_filters')}
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            
            {/* Pagination placeholder */}
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg">
                {t('discover.load_more')}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
