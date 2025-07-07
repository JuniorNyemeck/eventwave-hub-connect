
import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Calendar, DollarSign, Users, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import EventCard from '@/components/events/EventCard';
import { mockEvents, categories } from '@/data/mockData';

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const cameroonCities = [
    'Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua',
    'Ngaoundéré', 'Bertoua', 'Ebolowa', 'Kribi', 'Limbe', 'Buea'
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Pertinence' },
    { value: 'date-asc', label: 'Date (plus proche)' },
    { value: 'date-desc', label: 'Date (plus lointaine)' },
    { value: 'price-asc', label: 'Prix (croissant)' },
    { value: 'price-desc', label: 'Prix (décroissant)' },
    { value: 'popularity', label: 'Popularité' }
  ];

  const filteredEvents = useMemo(() => {
    let filtered = mockEvents.filter(event => {
      // Search query
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) {
        return false;
      }

      // Cities
      if (selectedCities.length > 0 && !selectedCities.includes(event.location.city)) {
        return false;
      }

      // Price range
      if (event.price.min > priceRange[1] || event.price.max < priceRange[0]) {
        return false;
      }

      // Date range
      if (dateRange !== 'all') {
        const eventDate = new Date(event.date);
        const now = new Date();
        const daysDiff = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
        
        switch (dateRange) {
          case 'today':
            if (daysDiff !== 0) return false;
            break;
          case 'week':
            if (daysDiff < 0 || daysDiff > 7) return false;
            break;
          case 'month':
            if (daysDiff < 0 || daysDiff > 30) return false;
            break;
          case 'weekend':
            const dayOfWeek = eventDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) return false;
            break;
        }
      }

      return true;
    });

    // Sort events
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
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedCities, priceRange, dateRange, sortBy]);

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleCityToggle = (city: string) => {
    setSelectedCities(prev => 
      prev.includes(city)
        ? prev.filter(c => c !== city)
        : [...prev, city]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCities([]);
    setPriceRange([0, 300]);
    setDateRange('all');
    setSearchQuery('');
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Recherche</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher des événements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Catégories</label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => handleCategoryToggle(category.name)}
              />
              <label htmlFor={category.id} className="text-sm flex items-center cursor-pointer">
                <span className="mr-2"><category.icon className="h-4 w-4" /></span>
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Cities */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Villes</label>
        <div className="space-y-2">
          {cameroonCities.map((city) => (
            <div key={city} className="flex items-center space-x-2">
              <Checkbox
                id={city}
                checked={selectedCities.includes(city)}
                onCheckedChange={() => handleCityToggle(city)}
              />
              <label htmlFor={city} className="text-sm cursor-pointer">
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <label className="text-sm font-medium">
          Fourchette de prix: {priceRange[0]}€ - {priceRange[1]}€
        </label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={300}
          step={5}
          className="w-full"
        />
      </div>

      <Separator />

      {/* Date Range */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Période</label>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les dates</SelectItem>
            <SelectItem value="today">Aujourd'hui</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="weekend">Week-ends</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Effacer les filtres
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Découvrir des événements</h1>
          <p className="text-muted-foreground mb-6">
            Trouvez les événements qui correspondent à vos envies
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Rechercher des événements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 px-6 md:hidden">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                  <SheetDescription>
                    Affinez votre recherche d'événements
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filtres
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FiltersContent />
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {filteredEvents.length} événement{filteredEvents.length !== 1 ? 's' : ''} trouvé{filteredEvents.length !== 1 ? 's' : ''}
                </h2>
                {(selectedCategories.length > 0 || selectedCities.length > 0 || searchQuery) && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {searchQuery && (
                      <Badge variant="secondary">
                        Recherche: {searchQuery}
                      </Badge>
                    )}
                    {selectedCategories.map(category => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                    {selectedCities.map(city => (
                      <Badge key={city} variant="secondary">
                        {city}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Events Grid/List */}
            {filteredEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <div className="text-4xl">🔍</div>
                  <h3 className="text-lg font-semibold">Aucun événement trouvé</h3>
                  <p className="text-muted-foreground">
                    Essayez de modifier vos critères de recherche ou de supprimer certains filtres.
                  </p>
                  <Button onClick={clearFilters}>
                    Effacer tous les filtres
                  </Button>
                </div>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-4"
              }>
                {filteredEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredEvents.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Charger plus d'événements
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
