
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Heart, Share2, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact' | 'featured';
}

const EventCard = ({ event, variant = 'default' }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  const formatPrice = (min: number, max: number, currency: string) => {
    if (min === max) return `${min}${currency === 'EUR' ? '€' : currency}`;
    return `${min}-${max}${currency === 'EUR' ? '€' : currency}`;
  };

  if (variant === 'compact') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <Link to={`/events/${event.id}`}>
          <div className="flex">
            <div className="relative w-32 h-24 flex-shrink-0">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {event.featured && (
                <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500">
                  ⭐ Featured
                </Badge>
              )}
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(event.date)} • {event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{event.location.venue}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold text-primary">
                    {formatPrice(event.price.min, event.price.max, event.price.currency)}
                  </span>
                  <div className="flex items-center text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{event.attendees}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <Link to={`/events/${event.id}`}>
          <div className="relative">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500">
                ⭐ Featured
              </Badge>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={event.organizer.avatar} />
                    <AvatarFallback>{event.organizer.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{event.organizer.name}</p>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{event.organizer.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="secondary">{event.category}</Badge>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {event.shortDescription}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(event.date)} • {event.time}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location.venue}, {event.location.city}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(event.price.min, event.price.max, event.price.currency)}
                    </span>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{event.attendees} participants</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <Link to={`/events/${event.id}`}>
        <div className="relative">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {event.featured && (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500">
                ⭐ Featured
              </Badge>
            )}
            <div className="absolute top-3 left-3">
              <Badge variant="secondary">{event.category}</Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {event.shortDescription}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(event.date)} • {event.time}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="truncate">{event.location.venue}, {event.location.city}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-primary">
                {formatPrice(event.price.min, event.price.max, event.price.currency)}
              </span>
              <div className="flex items-center text-muted-foreground text-sm">
                <Users className="h-4 w-4 mr-1" />
                <span>{event.attendees}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={event.organizer.avatar} />
                <AvatarFallback className="text-xs">{event.organizer.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{event.organizer.rating}</span>
              </div>
            </div>
          </CardFooter>
        </div>
      </Link>
    </Card>
  );
};

export default EventCard;
