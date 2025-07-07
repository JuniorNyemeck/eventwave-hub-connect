
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreditCard, Smartphone, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const TicketPurchase = () => {
  const { id } = useParams();
  const [selectedTickets, setSelectedTickets] = useState<{[key: string]: number}>({});
  const [paymentMethod, setPaymentMethod] = useState('orange-money');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const event = {
    id: '1',
    title: 'Concert de Jazz - Soirée Exceptionnelle',
    date: '15 Janvier 2025',
    time: '20:00',
    venue: 'Centre Culturel de Douala',
    tickets: [
      {
        id: 'standard',
        name: 'Billet Standard',
        price: 5000,
        description: 'Accès général à l\'événement',
        quantity: 100,
        sold: 75,
        benefits: ['Accès à l\'événement', 'Programme officiel']
      },
      {
        id: 'vip',
        name: 'Billet VIP',
        price: 15000,
        description: 'Accès privilégié avec avantages',
        quantity: 50,
        sold: 30,
        benefits: ['Accès privilégié', 'Cocktail de bienvenue', 'Rencontre avec les artistes', 'Parking inclus']
      }
    ]
  };

  const updateTicketQuantity = (ticketId: string, change: number) => {
    const newQuantity = Math.max(0, (selectedTickets[ticketId] || 0) + change);
    setSelectedTickets({
      ...selectedTickets,
      [ticketId]: newQuantity
    });
  };

  const getTotalPrice = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = event.tickets.find(t => t.id === ticketId);
      return total + (ticket ? ticket.price * quantity : 0);
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Purchase data:', {
      tickets: selectedTickets,
      paymentMethod,
      customerInfo,
      total: getTotalPrice()
    });
    // Handle purchase logic
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link to={`/events/${id}`} className="inline-flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'événement
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sélection des billets</CardTitle>
                <p className="text-muted-foreground">{event.title}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {event.tickets.map(ticket => (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{ticket.name}</h3>
                        <p className="text-muted-foreground mb-2">{ticket.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {ticket.benefits.map((benefit, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {ticket.quantity - ticket.sold} places restantes
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {ticket.price.toLocaleString()} F
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateTicketQuantity(ticket.id, -1)}
                          disabled={!selectedTickets[ticket.id]}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {selectedTickets[ticket.id] || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateTicketQuantity(ticket.id, 1)}
                          disabled={ticket.quantity - ticket.sold <= (selectedTickets[ticket.id] || 0)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-medium">
                        {((selectedTickets[ticket.id] || 0) * ticket.price).toLocaleString()} F
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {getTotalTickets() > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      placeholder="+237 6 XX XX XX XX"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Événement</span>
                    <span className="font-medium">{event.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Date</span>
                    <span>{event.date} à {event.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Lieu</span>
                    <span>{event.venue}</span>
                  </div>
                  
                  {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                    if (quantity === 0) return null;
                    const ticket = event.tickets.find(t => t.id === ticketId);
                    if (!ticket) return null;
                    return (
                      <div key={ticketId} className="flex justify-between text-sm">
                        <span>{ticket.name} × {quantity}</span>
                        <span>{(ticket.price * quantity).toLocaleString()} F</span>
                      </div>
                    );
                  })}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{getTotalPrice().toLocaleString()} F</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {getTotalTickets() > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Mode de paiement</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="orange-money" id="orange-money" />
                      <Label htmlFor="orange-money" className="flex items-center flex-1 cursor-pointer">
                        <Smartphone className="mr-2 h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Orange Money</p>
                          <p className="text-xs text-muted-foreground">Paiement mobile sécurisé</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="mtn-money" id="mtn-money" />
                      <Label htmlFor="mtn-money" className="flex items-center flex-1 cursor-pointer">
                        <Smartphone className="mr-2 h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">MTN Mobile Money</p>
                          <p className="text-xs text-muted-foreground">Paiement mobile sécurisé</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center flex-1 cursor-pointer">
                        <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">PayPal</p>
                          <p className="text-xs text-muted-foreground">Paiement international</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Shield className="mr-2 h-4 w-4" />
                      Paiement 100% sécurisé
                    </div>
                    
                    <Button 
                      onClick={handleSubmit} 
                      className="w-full" 
                      size="lg"
                      disabled={getTotalTickets() === 0}
                    >
                      Finaliser l'achat - {getTotalPrice().toLocaleString()} F
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchase;
