
import { Event, User, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Musique', icon: '🎵', color: 'bg-purple-500', count: 245 },
  { id: '2', name: 'Sport', icon: '⚽', color: 'bg-green-500', count: 189 },
  { id: '3', name: 'Art & Culture', icon: '🎨', color: 'bg-pink-500', count: 156 },
  { id: '4', name: 'Business', icon: '💼', color: 'bg-blue-500', count: 234 },
  { id: '5', name: 'Technologie', icon: '💻', color: 'bg-indigo-500', count: 123 },
  { id: '6', name: 'Gastronomie', icon: '🍽️', color: 'bg-orange-500', count: 87 },
  { id: '7', name: 'Bien-être', icon: '🧘', color: 'bg-teal-500', count: 65 },
  { id: '8', name: 'Éducation', icon: '📚', color: 'bg-yellow-500', count: 98 }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Festival de Jazz de Paris',
    description: 'Un festival exceptionnel réunissant les plus grands noms du jazz international dans un cadre unique au cœur de Paris.',
    shortDescription: 'Les plus grands noms du jazz se donnent rendez-vous à Paris',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    date: '2024-08-15',
    time: '19:00',
    location: {
      venue: 'Olympia',
      address: '28 Boulevard des Capucines',
      city: 'Paris',
      coordinates: { lat: 48.8698, lng: 2.3316 }
    },
    category: 'Musique',
    price: { min: 45, max: 120, currency: 'EUR' },
    organizer: {
      id: '1',
      name: 'Jazz Events Paris',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 4.8,
      verified: true
    },
    capacity: 2000,
    attendees: 1456,
    tags: ['jazz', 'musique', 'paris', 'festival'],
    featured: true,
    status: 'upcoming',
    tickets: [
      {
        id: '1',
        name: 'Standard',
        price: 45,
        description: 'Accès général',
        quantity: 1000,
        sold: 756,
        benefits: ['Accès à la salle', 'Programme officiel']
      },
      {
        id: '2',
        name: 'VIP',
        price: 120,
        description: 'Accès premium avec avantages',
        quantity: 200,
        sold: 145,
        benefits: ['Accès VIP', 'Meet & Greet', 'Boissons incluses', 'Parking gratuit']
      }
    ]
  },
  {
    id: '2',
    title: 'Marathon de Lyon',
    description: 'Participez au plus grand marathon de la région Rhône-Alpes avec un parcours spectaculaire à travers la ville.',
    shortDescription: 'Course emblématique de 42km à travers Lyon',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800',
    date: '2024-09-22',
    time: '08:00',
    location: {
      venue: 'Place Bellecour',
      address: 'Place Bellecour',
      city: 'Lyon'
    },
    category: 'Sport',
    price: { min: 25, max: 60, currency: 'EUR' },
    organizer: {
      id: '2',
      name: 'Lyon Sports Events',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 4.6,
      verified: true
    },
    capacity: 5000,
    attendees: 3245,
    tags: ['marathon', 'course', 'sport', 'lyon'],
    featured: true,
    status: 'upcoming',
    tickets: [
      {
        id: '3',
        name: 'Marathon',
        price: 60,
        description: 'Course complète 42km',
        quantity: 3000,
        sold: 2156,
        benefits: ['Dossard officiel', 'T-shirt technique', 'Médaille', 'Ravitaillement']
      },
      {
        id: '4',
        name: 'Semi-Marathon',
        price: 35,
        description: 'Course 21km',
        quantity: 2000,
        sold: 1089,
        benefits: ['Dossard officiel', 'T-shirt', 'Médaille']
      }
    ]
  },
  {
    id: '3',
    title: 'Conférence Tech Innovation',
    description: 'Découvrez les dernières innovations technologiques avec des experts de renommée mondiale.',
    shortDescription: 'Les dernières innovations tech par des experts mondiaux',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    date: '2024-10-10',
    time: '09:00',
    location: {
      venue: 'Palais des Congrès',
      address: '2 Place de la Porte Maillot',
      city: 'Paris'
    },
    category: 'Technologie',
    price: { min: 89, max: 299, currency: 'EUR' },
    organizer: {
      id: '3',
      name: 'TechEvents France',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c96f4b8a?w=150',
      rating: 4.9,
      verified: true
    },
    capacity: 800,
    attendees: 567,
    tags: ['technologie', 'innovation', 'conférence', 'ai'],
    featured: false,
    status: 'upcoming',
    tickets: [
      {
        id: '5',
        name: 'Early Bird',
        price: 89,
        description: 'Tarif préférentiel',
        quantity: 200,
        sold: 200,
        benefits: ['Accès conférence', 'Petit-déjeuner', 'Networking']
      },
      {
        id: '6',
        name: 'Standard',
        price: 149,
        description: 'Accès complet',
        quantity: 400,
        sold: 245,
        benefits: ['Accès conférence', 'Déjeuner', 'Networking', 'Support cours']
      },
      {
        id: '7',
        name: 'Premium',
        price: 299,
        description: 'Expérience complète',
        quantity: 200,
        sold: 122,
        benefits: ['Accès VIP', 'Tous repas', 'Meet speakers', 'Certificat', 'Goodies']
      }
    ]
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Marie Dubois',
  email: 'marie.dubois@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616c96f4b8a?w=150',
  bio: 'Passionnée d\'événements culturels et sportifs',
  location: 'Paris, France',
  interests: ['Musique', 'Sport', 'Art & Culture'],
  eventsAttended: 23,
  eventsOrganized: 3,
  rating: 4.7,
  verified: true,
  role: 'user'
};
