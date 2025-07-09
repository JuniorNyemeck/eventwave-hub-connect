import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Download, Share2, Calendar, MapPin, Clock, User, CheckCircle, QrCode, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { generateTicketPDF } from '@/utils/ticketGenerator';

const TicketView = () => {
  const { ticketId } = useParams();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  // Get ticket data from localStorage (in a real app, this would come from an API)
  const getTicketData = () => {
    const savedTickets = localStorage.getItem('purchasedTickets');
    if (savedTickets) {
      const tickets = JSON.parse(savedTickets);
      return tickets.find((ticket: any) => ticket.id === ticketId);
    }
    return null;
  };

  const ticketData = getTicketData();

  const handleDownloadPDF = async () => {
    if (!ticketData) return;
    
    setIsDownloading(true);
    try {
      await generateTicketPDF(ticketData);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Billets - ${ticketData.event.title}`,
        text: `J'ai un billet pour ${ticketData.event.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien a été copié dans le presse-papiers",
      });
    }
  };

  if (!ticketData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Billet non trouvé</h1>
          <p className="text-muted-foreground">
            Ce billet n'existe pas ou a été supprimé.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Billet Électronique</h1>
          <p className="text-muted-foreground">
            Présentez ce billet (imprimé ou numérique) à l'entrée
          </p>
        </div>

        {/* Ticket Card */}
        <Card ref={ticketRef} className="mb-8 overflow-hidden">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="secondary" className="bg-white/20 text-white border-0 mb-2">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Valide
                </Badge>
                <h2 className="text-2xl font-bold">{ticketData.event.title}</h2>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">Billet #</div>
                <div className="font-mono text-lg">{ticketData.id}</div>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            {/* Event Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(ticketData.event.date)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Heure</div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(ticketData.event.date)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Lieu</div>
                    <div className="text-sm text-muted-foreground">
                      {ticketData.event.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Titulaire</div>
                    <div className="text-sm text-muted-foreground">
                      {ticketData.customerName}
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-muted mb-4">
                  <QrCode className="w-32 h-32 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Présentez ce QR code à l'entrée de l'événement
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Ticket Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Détails du billet</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Billets achetés</div>
                  <div className="font-medium">
                    {ticketData.tickets.map((ticket: any, index: number) => (
                      <div key={index}>
                        {ticket.quantity}x {ticket.type} - {ticket.price.toLocaleString()} CFA
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Total payé</div>
                  <div className="font-bold text-lg text-primary">
                    {ticketData.total.toLocaleString()} CFA
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Code de vérification</div>
                <div className="font-mono bg-muted px-3 py-2 rounded text-sm">
                  {ticketData.id}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Important Instructions */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Instructions importantes
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Présentez ce billet (imprimé ou numérique) à l'entrée</li>
                <li>• Une pièce d'identité peut être demandée</li>
                <li>• Arrivez à l'heure indiquée sur votre billet</li>
                <li>• Ce billet est non remboursable et non transférable</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleDownloadPDF} disabled={isDownloading} size="lg">
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? 'Téléchargement...' : 'Télécharger PDF'}
          </Button>
          
          <Button variant="outline" onClick={handleShare} size="lg">
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </Button>

          <Button variant="outline" onClick={() => window.print()} size="lg">
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketView;