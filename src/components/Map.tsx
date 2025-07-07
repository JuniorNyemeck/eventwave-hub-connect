
import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MapProps {
  events?: Array<{
    id: string;
    title: string;
    location: {
      venue: string;
      address: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
  }>;
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

const Map = ({ events = [], center = { lat: 4.0511, lng: 9.7679 }, zoom = 12 }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Mock events for Douala if none provided
  const defaultEvents = [
    {
      id: '1',
      title: 'Concert de Jazz',
      location: {
        venue: 'Centre Culturel de Douala',
        address: 'Rue de la Liberté, Akwa, Douala',
        coordinates: { lat: 4.0511, lng: 9.7679 }
      }
    },
    {
      id: '2',
      title: 'Conférence Tech',
      location: {
        venue: 'Hôtel Akwa Palace',
        address: 'Boulevard de la Liberté, Akwa, Douala',
        coordinates: { lat: 4.0489, lng: 9.7654 }
      }
    },
    {
      id: '3',
      title: 'Festival Culturel',
      location: {
        venue: 'Palais des Sports',
        address: 'Makepe, Douala',
        coordinates: { lat: 4.0123, lng: 9.7321 }
      }
    }
  ];

  const mapEvents = events.length > 0 ? events : defaultEvents;

  useEffect(() => {
    // Simulate map initialization
    console.log('Map initialized with center:', center, 'zoom:', zoom);
    console.log('Events to display:', mapEvents);
  }, [center, zoom, mapEvents]);

  return (
    <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
        {/* Placeholder for actual map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">
              Carte interactive de Douala
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {mapEvents.length} événements à afficher
            </p>
          </div>
        </div>

        {/* Event Markers */}
        {mapEvents.map((event, index) => (
          <div
            key={event.id}
            className={`absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg transform transition-transform hover:scale-110 ${
              selectedEvent === event.id ? 'ring-4 ring-primary/30' : ''
            }`}
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + index * 15}%`
            }}
            onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
          >
            <MapPin className="h-4 w-4 text-white" />
          </div>
        ))}
      </div>

      {/* Event Info Card */}
      {selectedEvent && (
        <Card className="absolute bottom-4 left-4 right-4 shadow-lg">
          <CardContent className="p-4">
            {(() => {
              const event = mapEvents.find(e => e.id === selectedEvent);
              return event ? (
                <div>
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">{event.location.venue}</p>
                      <p>{event.location.address}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline">
                      <Navigation className="h-3 w-3 mr-1" />
                      Itinéraire
                    </Button>
                    <Button size="sm">
                      Voir l'événement
                    </Button>
                  </div>
                </div>
              ) : null;
            })()}
          </CardContent>
        </Card>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
          <Minus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Map;
