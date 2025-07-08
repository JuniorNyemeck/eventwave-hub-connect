import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Share2, Calendar, MapPin, User, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { downloadTicketPDF, generateQRCodeForTicket } from '@/utils/ticketGenerator';
import { mockEvents } from '@/data/mockData';

const TicketView = () => {
  const { ticketId } = useParams();
  const [ticketData, setTicketData] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Load ticket data from localStorage
    const storedTicket = localStorage.getItem(`ticket-${ticketId}`);
    if (storedTicket) {
      const data = JSON.parse(storedTicket);
      setTicketData(data);
      
      // Generate QR code
      generateQRCodeForTicket(ticketId!).then(setQrCodeUrl);
    }
  }, [ticketId]);

  const handleDownloadPDF = async () => {
    if (!ticketData) return;
    
    setIsDownloading(true);
    try {
      await downloadTicketPDF(ticketData);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Billet - ${ticketData.event.title}`,
        text: `J'ai un billet pour ${ticketData.event.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers');
    }
  };

  if (!ticketData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Billet non trouvé</h2>
          <p className="text-muted-foreground">Ce billet n'existe pas ou a été supprimé.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">Billet Électronique</h1>
                <p className="opacity-90">EventWave</p>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Valide
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            {/* Event Info */}
            <div className="space-y-4 mb-6">
              <h2 className="text-xl font-bold">{ticketData.event.title}</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(ticketData.event.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <span className="font-medium">Heure:</span>
                  <span className="ml-2">{ticketData.event.time}</span>
                </div>
              </div>

              <div className="flex items-start text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium">{ticketData.event.location.venue}</div>
                  <div>{ticketData.event.location.address}</div>
                  <div>{ticketData.event.location.city}</div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Ticket Details */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold">Détails du billet</h3>
              
              <div className="flex items-center text-muted-foreground">
                <User className="h-4 w-4 mr-2" />
                <span>{ticketData.customer}</span>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Billets achetés:</span>
                {Object.entries(ticketData.tickets).map(([ticketId, quantity]: [string, any]) => {
                  if (quantity > 0) {
                    const ticket = ticketData.event.tickets?.find((t: any) => t.id === ticketId);
                    if (ticket) {
                      return (
                        <div key={ticketId} className="flex justify-between items-center bg-muted/30 p-3 rounded">
                          <span>{ticket.name} × {quantity}</span>
                          <span className="font-medium">{(ticket.price * quantity).toLocaleString()} CFA</span>
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-semibold">Total payé:</span>
                <span className="text-lg font-bold text-primary">{ticketData.total.toLocaleString()} CFA</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* QR Code */}
            <div className="text-center space-y-4">
              <h3 className="font-semibold">Code de vérification</h3>
              {qrCodeUrl && (
                <div className="flex justify-center">
                  <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32 border rounded" />
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Présentez ce QR code à l'entrée de l'événement
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                ID: {ticketData.id}
              </p>
            </div>

            <Separator className="my-6" />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? 'Téléchargement...' : 'Télécharger PDF'}
              </Button>
              
              <Button variant="outline" onClick={handleShare} className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>

            {/* Important Notice */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Instructions importantes:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Présentez ce billet (imprimé ou numérique) à l'entrée</li>
                <li>• Une pièce d'identité peut être demandée</li>
                <li>• Arrivez à l'heure indiquée sur votre billet</li>
                <li>• Ce billet est non remboursable et non transférable</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketView;