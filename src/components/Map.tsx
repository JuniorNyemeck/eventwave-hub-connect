
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Navigation, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

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

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [center.lng, center.lat],
        zoom: zoom
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for events
      mapEvents.forEach((event) => {
        if (event.location.coordinates) {
          const marker = new mapboxgl.Marker({
            color: '#3b82f6'
          })
            .setLngLat([event.location.coordinates.lng, event.location.coordinates.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <h3 class="font-semibold">${event.title}</h3>
                    <p class="text-sm text-gray-600">${event.location.venue}</p>
                    <p class="text-xs text-gray-500">${event.location.address}</p>
                  </div>
                `)
            )
            .addTo(map.current!);

          marker.getElement().addEventListener('click', () => {
            setSelectedEvent(event.id);
          });
        }
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Carte Interactive</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Pour afficher la carte interactive, veuillez entrer votre token Mapbox.
                Vous pouvez obtenir un token gratuit sur{' '}
                <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  mapbox.com
                </a>
              </p>
            </div>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Votre token Mapbox"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Charger la carte
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Event Info Card */}
      {selectedEvent && (
        <Card className="absolute bottom-4 left-4 right-4 shadow-lg z-10">
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

      {/* Custom Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <Button 
          size="icon" 
          variant="secondary" 
          className="bg-white/90 hover:bg-white"
          onClick={() => map.current?.zoomIn()}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button 
          size="icon" 
          variant="secondary" 
          className="bg-white/90 hover:bg-white"
          onClick={() => map.current?.zoomOut()}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Map;
