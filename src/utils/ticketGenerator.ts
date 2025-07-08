import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { Event, TicketType } from '@/types';

interface TicketData {
  id: string;
  event: Event;
  customerName: string;
  tickets: {[key: string]: number};
  totalPrice: number;
  purchaseDate: string;
}

export const generateTicketPDF = async (ticketData: TicketData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;

  // Generate QR Code
  const qrCodeData = `https://eventwave.com/ticket/verify/${ticketData.id}`;
  const qrCodeDataURL = await QRCode.toDataURL(qrCodeData);

  // Header
  pdf.setFillColor(220, 38, 127); // Primary color
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('EVENTWAVE', 20, 25);
  
  pdf.setFontSize(12);
  pdf.text('Billet Électronique', pageWidth - 20, 25, { align: 'right' });

  // Ticket Info
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(ticketData.event.title, 20, 60);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  
  // Event details
  const eventDetails = [
    `Date: ${new Date(ticketData.event.date).toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })}`,
    `Heure: ${ticketData.event.time}`,
    `Lieu: ${ticketData.event.location.venue}`,
    `Adresse: ${ticketData.event.location.address}, ${ticketData.event.location.city}`,
    '',
    `Titulaire: ${ticketData.customerName}`,
    `Date d'achat: ${new Date(ticketData.purchaseDate).toLocaleDateString('fr-FR')}`,
    `Numéro de billet: ${ticketData.id}`
  ];

  let yPosition = 80;
  eventDetails.forEach(detail => {
    if (detail) {
      pdf.text(detail, 20, yPosition);
    }
    yPosition += 8;
  });

  // Tickets purchased
  yPosition += 10;
  pdf.setFont('helvetica', 'bold');
  pdf.text('Billets achetés:', 20, yPosition);
  yPosition += 10;

  pdf.setFont('helvetica', 'normal');
  Object.entries(ticketData.tickets).forEach(([ticketId, quantity]) => {
    if (quantity > 0) {
      const ticket = ticketData.event.tickets?.find(t => t.id === ticketId);
      if (ticket) {
        pdf.text(`• ${ticket.name} x ${quantity} - ${(ticket.price * quantity).toLocaleString()} CFA`, 25, yPosition);
        yPosition += 8;
      }
    }
  });

  // Total
  yPosition += 5;
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Total: ${ticketData.totalPrice.toLocaleString()} CFA`, 25, yPosition);

  // QR Code
  pdf.addImage(qrCodeDataURL, 'PNG', pageWidth - 80, 80, 60, 60);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Scannez pour vérifier', pageWidth - 80, 150, { align: 'left' });

  // Footer
  yPosition = pageHeight - 40;
  pdf.setFillColor(240, 240, 240);
  pdf.rect(0, yPosition - 10, pageWidth, 50, 'F');
  
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(10);
  pdf.text('Ce billet est valide uniquement pour l\'événement mentionné ci-dessus.', 20, yPosition);
  pdf.text('Présentez ce billet (imprimé ou numérique) à l\'entrée.', 20, yPosition + 8);
  pdf.text('En cas de problème, contactez-nous à support@eventwave.com', 20, yPosition + 16);

  return pdf;
};

export const downloadTicketPDF = async (ticketData: TicketData) => {
  const pdf = await generateTicketPDF(ticketData);
  pdf.save(`ticket-${ticketData.id}.pdf`);
};

export const generateQRCodeForTicket = async (ticketId: string): Promise<string> => {
  const qrCodeData = `https://eventwave.com/ticket/verify/${ticketId}`;
  return await QRCode.toDataURL(qrCodeData);
};