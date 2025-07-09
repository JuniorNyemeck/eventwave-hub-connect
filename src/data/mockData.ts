import { Event, Category } from '@/types';
import { 
  LayoutDashboard, Calendar, GraduationCap, Users, ShoppingCart, 
  BarChart, Music, Film, Utensils, Speaker, Palette, BookOpen, 
  Gamepad2, Shirt, Trees, Puzzle, Heart, Lightbulb, Code, Atom, 
  LucideIcon
} from 'lucide-react';

export const categories: Category[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    color: 'bg-sky-500',
    count: 0,
  },
  {
    id: 'conferences',
    name: 'Conférences',
    icon: Calendar,
    color: 'bg-orange-500',
    count: 0,
  },
  {
    id: 'education',
    name: 'Éducation',
    icon: GraduationCap,
    color: 'bg-green-500',
    count: 0,
  },
  {
    id: 'community',
    name: 'Communauté',
    icon: Users,
    color: 'bg-blue-500',
    count: 0,
  },
  {
    id: 'marketplace',
    name: 'Marché',
    icon: ShoppingCart,
    color: 'bg-pink-500',
    count: 0,
  },
  {
    id: 'business',
    name: 'Affaires',
    icon: BarChart,
    color: 'bg-yellow-500',
    count: 0,
  },
  {
    id: 'music',
    name: 'Musique',
    icon: Music,
    color: 'bg-red-500',
    count: 0,
  },
  {
    id: 'film',
    name: 'Film',
    icon: Film,
    color: 'bg-purple-500',
    count: 0,
  },
  {
    id: 'food',
    name: 'Gastronomie',
    icon: Utensils,
    color: 'bg-amber-500',
    count: 0,
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: Speaker,
    color: 'bg-teal-500',
    count: 0,
  },
  {
    id: 'art',
    name: 'Art',
    icon: Palette,
    color: 'bg-rose-500',
    count: 0,
  },
  {
    id: 'literature',
    name: 'Littérature',
    icon: BookOpen,
    color: 'bg-violet-500',
    count: 0,
  },
   {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    color: 'bg-orange-500',
    count: 0,
  },
  {
    id: 'fashion',
    name: 'Mode',
    icon: Shirt,
    color: 'bg-lime-500',
    count: 0,
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: Trees,
    color: 'bg-emerald-500',
    count: 0,
  },
  {
    id: 'hobbies',
    name: 'Loisirs',
    icon: Puzzle,
    color: 'bg-cyan-500',
    count: 0,
  },
  {
    id: 'wellness',
    name: 'Bien-être',
    icon: Heart,
    color: 'bg-fuchsia-500',
    count: 0,
  },
  {
    id: 'innovation',
    name: 'Innovation',
    icon: Lightbulb,
    color: 'bg-stone-500',
    count: 0,
  },
  {
    id: 'technology',
    name: 'Technologie',
    icon: Code,
    color: 'bg-slate-500',
    count: 0,
  },
  {
    id: 'science',
    name: 'Science',
    icon: Atom,
    color: 'bg-zinc-500',
    count: 0,
  },
];

export const cameroonCities = [
  "Douala",
  "Yaoundé",
  "Garoua",
  "Maroua",
  "Bafoussam",
  "Bamenda",
  "Ngaoundéré",
  "Kumba",
  "Ebolowa",
  "Bertoua"
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Concert de Jazz - Soirée Exceptionnelle',
    description: 'Une soirée inoubliable avec les meilleurs artistes de jazz du Cameroun et d\'Afrique centrale.',
    shortDescription: 'Une soirée inoubliable avec les meilleurs artistes de jazz du Cameroun.',
    fullDescription: 'Rejoignez-nous pour une soirée exceptionnelle de jazz au Centre Culturel de Douala. Les plus grands noms du jazz camerounais et africain se produiront sur scène pour vous offrir un spectacle inoubliable. Ambiance feutrée, cocktails raffinés et musique de qualité au programme.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80'],
    date: '2025-01-15',
    time: '20:00',
    location: {
      venue: 'Centre Culturel de Douala',
      address: 'Avenue de la Liberté, Douala',
      city: 'Douala',
      coordinates: { lat: 4.0435, lng: 9.7295 }
    },
    category: 'Musique',
    price: { min: 5000, max: 15000, currency: 'CFA' },
    organizer: {
      id: '1',
      name: 'Jazz Club Douala',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      rating: 4.8,
      verified: true
    },
    capacity: 200,
    attendees: 150,
    tags: ['Jazz', 'Musique Live', 'Cocktails', 'Soirée'],
    featured: true,
    status: 'upcoming',
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
  },
  {
    id: '2',
    title: 'Conférence Tech Innovation 2025',
    description: 'La plus grande conférence technologique d\'Afrique centrale.',
    shortDescription: 'La plus grande conférence technologique d\'Afrique centrale.',
    fullDescription: 'Découvrez les dernières innovations technologiques et rencontrez les leaders du secteur tech en Afrique. Cette conférence rassemble entrepreneurs, développeurs, investisseurs et passionnés de technologie.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'],
    date: '2025-02-10',
    time: '09:00',
    location: {
      venue: 'Palais des Congrès',
      address: 'Boulevard de la République, Douala',
      city: 'Douala',
      coordinates: { lat: 4.0511, lng: 9.7679 }
    },
    category: 'Technologie',
    price: { min: 10000, max: 25000, currency: 'CFA' },
    organizer: {
      id: '2',
      name: 'Tech Hub Cameroun',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 4.9,
      verified: true
    },
    capacity: 500,
    attendees: 380,
    tags: ['Tech', 'Innovation', 'Startup', 'Networking'],
    featured: true,
    status: 'upcoming',
    tickets: [
      {
        id: 'early-bird',
        name: 'Early Bird',
        price: 10000,
        description: 'Tarif préférentiel',
        quantity: 200,
        sold: 180,
        benefits: ['Accès complet', 'Kit de bienvenue', 'Déjeuner inclus']
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 25000,
        description: 'Accès VIP avec networking',
        quantity: 100,
        sold: 50,
        benefits: ['Accès VIP', 'Networking exclusif', 'Dîner de gala', 'Certificat de participation']
      }
    ]
  },
  {
    id: '3',
    title: 'Festival Culturel Sawa',
    description: 'Célébration de la culture camerounaise.',
    shortDescription: 'Célébration de la richesse culturelle camerounaise.',
    fullDescription: 'Un festival coloré célébrant la diversité culturelle du Cameroun. Danses traditionnelles, musique locale, gastronomie et artisanat seront au rendez-vous pour une immersion totale dans la culture sawa.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80'],
    date: '2025-03-20',
    time: '15:00',
    location: {
      venue: 'Esplanade du Musée',
      address: 'Rue des Arts, Douala',
      city: 'Douala',
      coordinates: { lat: 4.0614, lng: 9.7061 }
    },
    category: 'Art',
    price: { min: 2000, max: 8000, currency: 'CFA' },
    organizer: {
      id: '3',
      name: 'Association Culturelle Sawa',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c95e3a24?auto=format&fit=crop&w=150&q=80',
      rating: 4.7,
      verified: true
    },
    capacity: 1000,
    attendees: 650,
    tags: ['Culture', 'Tradition', 'Musique', 'Danse', 'Gastronomie'],
    featured: false,
    status: 'upcoming',
    tickets: [
      {
        id: 'general',
        name: 'Accès Général',
        price: 2000,
        description: 'Accès à tous les spectacles',
        quantity: 800,
        sold: 500,
        benefits: ['Spectacles', 'Dégustation']
      },
      {
        id: 'family',
        name: 'Pack Famille',
        price: 8000,
        description: 'Forfait famille (2 adultes + 2 enfants)',
        quantity: 50,
        sold: 30,
        benefits: ['Accès famille', 'Activités enfants', 'Repas inclus']
      }
    ]
  },
  {
    id: '4',
    title: 'Championnat de Football Local',
    description: 'Tournoi de football amateur.',
    shortDescription: 'Grand tournoi de football amateur de Douala.',
    fullDescription: 'Le plus grand tournoi de football amateur de la région. Les meilleures équipes locales s\'affronteront pour le titre de champion. Animation, buvette et ambiance garanties.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'],
    date: '2025-04-05',
    time: '14:00',
    location: {
      venue: 'Stade Municipal',
      address: 'Quartier Bonapriso, Douala',
      city: 'Douala',
      coordinates: { lat: 4.0732, lng: 9.7014 }
    },
    category: 'Sports',
    price: { min: 1000, max: 5000, currency: 'CFA' },
    organizer: {
      id: '4',
      name: 'Ligue de Football Douala',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      rating: 4.5,
      verified: true
    },
    capacity: 2000,
    attendees: 1200,
    tags: ['Football', 'Sport', 'Amateur', 'Compétition'],
    featured: false,
    status: 'upcoming',
    tickets: [
      {
        id: 'tribune',
        name: 'Tribune Populaire',
        price: 1000,
        description: 'Places en tribune',
        quantity: 1500,
        sold: 900,
        benefits: ['Vue sur le terrain']
      },
      {
        id: 'vip-sport',
        name: 'Tribune VIP',
        price: 5000,
        description: 'Places VIP avec restauration',
        quantity: 200,
        sold: 100,
        benefits: ['Places VIP', 'Restauration', 'Parking']
      }
    ]
  }
];
