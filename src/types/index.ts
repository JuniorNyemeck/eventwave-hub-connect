export interface Event {
  id: string;
  title: string;
  description?: string;
  shortDescription: string;
  fullDescription?: string;
  image?: string;
  images?: string[];
  date: string;
  time: string;
  location: {
    venue: string;
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  price: {
    min: number;
    max: number;
    currency?: string;
  };
  organizer: {
    id?: string;
    name: string;
    avatar: string;
    rating?: number;
    verified: boolean;
  };
  capacity: number;
  attendees: number;
  tags: string[];
  featured: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  tickets?: TicketType[];
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  sold: number;
  benefits: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  location?: string;
  interests: string[];
  eventsAttended: number;
  eventsOrganized: number;
  rating: number;
  verified: boolean;
  role: 'user' | 'organizer' | 'admin';
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  tickets: {
    ticketTypeId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: string;
  paymentMethod: string;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
  count: number;
}
