
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, Clock, Star, Heart, Share2, 
  ChevronLeft, Check, AlertCircle, CreditCard, Shield,
  MessageCircle, Flag, Globe, Phone, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { mockEvents } from '@/data/mockData';
import { TicketType } from '@/types';
import BookingForm from '@/components/booking/BookingForm';

const EventDetail = () => {
  const { id } = useParams();
  const [selectedTickets, setSelectedTickets] = useState<{[key: string]: number}>({});
  const [isLiked, setIsLiked] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const event = mockEvents.find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const handleTicketSelect = (ticketId: string, quantity: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: quantity
    }));
  };

  const getTotalPrice = () => {
    if (!event.tickets) return 0;
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = event.tickets!.find(t => t.id === ticketId);
      return total + (ticket ? ticket.price * quantity : 0);
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
  };

  const getAvailabilityStatus = (ticket: TicketType) => {
    const available = ticket.quantity - ticket.sold;
    const percentage = (available / ticket.quantity) * 100;
    
    if (percentage === 0) return { status: 'sold-out', text: 'Épuisé', color: 'bg-red-500' };
    if (percentage < 10) return { status: 'limited', text: 'Dernières places', color: 'bg-orange-500' };
    if (percentage < 30) return { status: 'few-left', text: 'Places limitées', color: 'bg-yellow-500' };
    return { status: 'available', text: 'Disponible', color: 'bg-green-500' };
  };

  const eventImage = event.image || event.images?.[0] || '/placeholder.svg';
  const eventDescription = event.description || event.fullDescription || event.shortDescription;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/discover" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour aux événements
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={eventImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Floating Actions */}
        <div className="absolute top-6 right-6 flex space-x-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className={`bg-white/90 hover:bg-white ${isLiked ? 'text-red-500' : ''}`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Event Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-white/20 text-white border-white/30">
                {event.category}
              </Badge>
              {event.featured && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                  Featured
                </Badge>
              )}
              <Badge variant="outline" className="text-white border-white/50">
                {event.status === 'upcoming' ? 'À venir' : event.status}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <div className="grid md:grid-cols-3 gap-4 text-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Description */}
            <Card>
              <CardHeader>
                <CardTitle>À propos de cet événement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {eventDescription}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Lieu et accès
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{event.location.venue}</h4>
                  <p className="text-muted-foreground">
                    {event.location.address}<br />
                    {event.location.city}
                  </p>
                </div>
                
                {/* Map Placeholder */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Carte interactive disponible</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <Button variant="outline" className="justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Voir sur la carte
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Contacter le lieu
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card>
              <CardHeader>
                <CardTitle>Organisateur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={event.organizer.avatar} />
                    <AvatarFallback>{event.organizer.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-lg">{event.organizer.name}</h4>
                      {event.organizer.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Check className="h-3 w-3 mr-1" />
                          Vérifié
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      {event.organizer.rating && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{event.organizer.rating}</span>
                          <span className="text-muted-foreground ml-1">(127 avis)</span>
                        </div>
                      )}
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">23 événements organisés</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contacter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Suivre
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="reviews">Avis (12)</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Conditions d'accès</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Pièce d'identité obligatoire</li>
                          <li>• Âge minimum : 16 ans</li>
                          <li>• Billet électronique accepté</li>
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Politique d'annulation</h4>
                        <p className="text-muted-foreground">
                          Remboursement intégral jusqu'à 48h avant l'événement. 
                          Après cette période, aucun remboursement ne sera accordé.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground py-8">
                      Les avis seront disponibles après l'événement
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="faq">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Puis-je modifier mon billet ?</h4>
                        <p className="text-muted-foreground">
                          Les modifications sont possibles jusqu'à 24h avant l'événement.
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Y a-t-il un parking ?</h4>
                        <p className="text-muted-foreground">
                          Un parking payant est disponible à proximité du lieu.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Booking */}
          <div className="space-y-6">
            {/* Attendance Stats */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2 mb-4">
                  <div className="text-2xl font-bold text-primary">{event.attendees}</div>
                  <div className="text-muted-foreground">participants inscrits</div>
                </div>
                <Progress value={(event.attendees / event.capacity) * 100} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>{event.capacity - event.attendees} places restantes</span>
                  <span>{Math.round((event.attendees / event.capacity) * 100)}% complet</span>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choisir vos billets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.tickets?.map((ticket) => {
                  const availability = getAvailabilityStatus(ticket);
                  const selectedQuantity = selectedTickets[ticket.id] || 0;
                  const maxQuantity = Math.min(5, ticket.quantity - ticket.sold);
                  
                  return (
                    <div key={ticket.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{ticket.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {ticket.description}
                          </p>
                          
                          {/* Benefits */}
                          <ul className="space-y-1 mb-3">
                            {ticket.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-3 w-3 mr-2 text-green-600" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="text-right ml-4">
                          <div className="text-xl font-bold text-primary mb-1">
                            {ticket.price.toLocaleString()} CFA
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${availability.color} text-white`}
                          >
                            {availability.text}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Quantity Selection */}
                      {availability.status !== 'sold-out' && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Quantité:
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleTicketSelect(ticket.id, Math.max(0, selectedQuantity - 1))}
                              disabled={selectedQuantity === 0}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{selectedQuantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleTicketSelect(ticket.id, Math.min(maxQuantity, selectedQuantity + 1))}
                              disabled={selectedQuantity >= maxQuantity}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }) || (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Informations sur les billets bientôt disponibles</p>
                    <p className="text-sm mt-2">Prix à partir de {event.price.min.toLocaleString()} CFA</p>
                  </div>
                )}

                {/* Total */}
                {getTotalTickets() > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total ({getTotalTickets()} billet{getTotalTickets() > 1 ? 's' : ''})</span>
                        <span className="text-xl font-bold text-primary">{getTotalPrice().toLocaleString()} CFA</span>
                      </div>
                      
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Les frais de service seront ajoutés à l'étape suivante
                        </AlertDescription>
                      </Alert>

                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => setShowBookingForm(true)}
                      >
                        <CreditCard className="mr-2 h-5 w-5" />
                        Réserver maintenant
                      </Button>
                      
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>Paiement sécurisé</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 mb-1">
                      Attention aux arnaques
                    </p>
                    <p className="text-yellow-700">
                      N'achetez vos billets que sur EventWave ou auprès de l'organisateur officiel.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report */}
            <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
              <Flag className="h-4 w-4 mr-2" />
              Signaler cet événement
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm
          selectedTickets={selectedTickets}
          totalPrice={getTotalPrice()}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
};

export default EventDetail;
