
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Phone, Mail, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockEvents } from '@/data/mockData';

interface BookingFormProps {
  selectedTickets: {[key: string]: number};
  totalPrice: number;
  onClose: () => void;
}

const BookingForm = ({ selectedTickets, totalPrice, onClose }: BookingFormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    paypalEmail: '',
    paypalPassword: '',
    mobileNumber: '',
    pinCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const event = mockEvents.find(e => e.id === id);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const isValidAge = () => {
    if (!customerInfo.birthDate) return false;
    return calculateAge(customerInfo.birthDate) >= 16;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!isValidAge()) {
        alert('Vous devez avoir au moins 16 ans pour réserver un billet.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      handlePayment();
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulation du paiement
    setTimeout(() => {
      const ticketId = generateTicketId();
      
      // Générer le ticket PDF
      generateTicketPDF(ticketId);
      
      setIsProcessing(false);
      alert('Paiement réussi ! Votre ticket a été généré.');
      onClose();
      navigate(`/ticket/${ticketId}`);
    }, 2000);
  };

  const generateTicketId = () => {
    return 'TKT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const generateTicketPDF = (ticketId: string) => {
    // Simulation de génération PDF
    console.log('Génération du ticket PDF pour:', ticketId);
    
    // Ici on pourrait intégrer une vraie librairie PDF comme jsPDF
    const ticketData = {
      id: ticketId,
      event: event?.title,
      date: event?.date,
      time: event?.time,
      venue: event?.location.venue,
      customer: `${customerInfo.firstName} ${customerInfo.lastName}`,
      tickets: selectedTickets,
      total: totalPrice,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}`
    };
    
    // Stocker dans localStorage pour l'exemple
    localStorage.setItem(`ticket-${ticketId}`, JSON.stringify(ticketData));
  };

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Réservation - {event.title}</span>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informations personnelles</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="+237 6 XX XX XX XX"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date de naissance *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={customerInfo.birthDate}
                    onChange={(e) => setCustomerInfo({...customerInfo, birthDate: e.target.value})}
                    required
                  />
                  {customerInfo.birthDate && !isValidAge() && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        Vous devez avoir au moins 16 ans pour réserver un billet.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total à payer:</span>
                  <span className="text-xl font-bold text-primary">{totalPrice.toLocaleString()} CFA</span>
                </div>
                <Button 
                  onClick={handleNext} 
                  className="w-full"
                  disabled={!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone || !customerInfo.birthDate || !isValidAge()}
                >
                  Continuer vers le paiement
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Mode de paiement</h3>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center flex-1 cursor-pointer">
                      <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-xs text-muted-foreground">Paiement sécurisé international</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="orange-money" id="orange-money" />
                    <Label htmlFor="orange-money" className="flex items-center flex-1 cursor-pointer">
                      <Smartphone className="mr-2 h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Orange Money</p>
                        <p className="text-xs text-muted-foreground">Paiement mobile Orange</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="mtn-money" id="mtn-money" />
                    <Label htmlFor="mtn-money" className="flex items-center flex-1 cursor-pointer">
                      <Smartphone className="mr-2 h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">MTN Mobile Money</p>
                        <p className="text-xs text-muted-foreground">Paiement mobile MTN</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'paypal' && (
                  <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
                    <h4 className="font-medium">Informations PayPal</h4>
                    <div className="space-y-2">
                      <Label htmlFor="paypalEmail">Email PayPal</Label>
                      <Input
                        id="paypalEmail"
                        type="email"
                        value={paymentDetails.paypalEmail}
                        onChange={(e) => setPaymentDetails({...paymentDetails, paypalEmail: e.target.value})}
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypalPassword">Mot de passe</Label>
                      <Input
                        id="paypalPassword"
                        type="password"
                        value={paymentDetails.paypalPassword}
                        onChange={(e) => setPaymentDetails({...paymentDetails, paypalPassword: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                {(paymentMethod === 'orange-money' || paymentMethod === 'mtn-money') && (
                  <div className="space-y-4 p-4 border rounded-lg bg-orange-50">
                    <h4 className="font-medium">Paiement Mobile Money</h4>
                    <div className="space-y-2">
                      <Label htmlFor="mobileNumber">Numéro de téléphone</Label>
                      <Input
                        id="mobileNumber"
                        value={paymentDetails.mobileNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, mobileNumber: e.target.value})}
                        placeholder="+237 6 XX XX XX XX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pinCode">Code PIN</Label>
                      <Input
                        id="pinCode"
                        type="password"
                        value={paymentDetails.pinCode}
                        onChange={(e) => setPaymentDetails({...paymentDetails, pinCode: e.target.value})}
                        placeholder="****"
                        maxLength={4}
                      />
                    </div>
                    <Alert>
                      <AlertDescription>
                        Une notification sera envoyée sur votre téléphone pour confirmer le paiement.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total à payer:</span>
                  <span className="text-xl font-bold text-primary">{totalPrice.toLocaleString()} CFA</span>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Retour
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    className="flex-1"
                    disabled={!paymentMethod || isProcessing}
                  >
                    {isProcessing ? 'Traitement...' : 'Confirmer le paiement'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
