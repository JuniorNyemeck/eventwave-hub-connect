
import { Music, Mic, Briefcase, Palette, Utensils, Users, Gamepad2, Camera } from 'lucide-react';

export const categories = [
  {
    id: 'concerts',
    name: 'Concerts',
    icon: <Music className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-600',
    count: 45
  },
  {
    id: 'conferences',
    name: 'Conférences',
    icon: <Mic className="h-5 w-5" />,
    color: 'bg-green-100 text-green-600',
    count: 32
  },
  {
    id: 'business',
    name: 'Business',
    icon: <Briefcase className="h-5 w-5" />,
    color: 'bg-purple-100 text-purple-600',
    count: 28
  },
  {
    id: 'art',
    name: 'Art & Culture',
    icon: <Palette className="h-5 w-5" />,
    color: 'bg-pink-100 text-pink-600',
    count: 24
  },
  {
    id: 'food',
    name: 'Gastronomie',
    icon: <Utensils className="h-5 w-5" />,
    color: 'bg-orange-100 text-orange-600',
    count: 18
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-cyan-100 text-cyan-600',
    count: 21
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: <Gamepad2 className="h-5 w-5" />,
    color: 'bg-red-100 text-red-600',
    count: 15
  },
  {
    id: 'photography',
    name: 'Photographie',
    icon: <Camera className="h-5 w-5" />,
    color: 'bg-yellow-100 text-yellow-600',
    count: 12
  }
];

export const mockEvents = [
  // Concerts
  {
    id: '1',
    title: 'Concert Jazz Fusion Night',
    shortDescription: 'Une soirée jazz exceptionnelle avec les meilleurs musiciens du Cameroun',
    fullDescription: 'Rejoignez-nous pour une soirée jazz inoubliable mettant en vedette les talents locaux et internationaux. Une expérience musicale unique dans le cadre magnifique du Centre Culturel de Douala.',
    date: '2025-02-15',
    time: '20:00',
    location: {
      venue: 'Centre Culturel de Douala',
      address: 'Rue de la Liberté, Akwa',
      city: 'Douala',
      coordinates: { lat: 4.0511, lng: 9.7679 }
    },
    category: 'Concerts',
    price: { min: 15, max: 35 },
    images: ['/placeholder.svg'],
    organizer: {
      name: 'EventPro Cameroun',
      avatar: '/placeholder.svg',
      verified: true
    },
    attendees: 250,
    capacity: 300,
    status: 'upcoming' as const,
    featured: true,
    tags: ['jazz', 'musique', 'culture']
  },
  {
    id: '2',
    title: 'Festival Makossa Revival',
    shortDescription: 'Célébration de la musique makossa traditionnelle',
    fullDescription: 'Un festival dédié à la musique makossa, patrimoine musical du Cameroun, avec des artistes légendaires et de nouvelles générations.',
    date: '2025-03-20',
    time: '18:00',
    location: {
      venue: 'Palais des Sports',
      address: 'Makepe',
      city: 'Douala',
      coordinates: { lat: 4.0123, lng: 9.7321 }
    },
    category: 'Concerts',
    price: { min: 10, max: 25 },
    images: ['/placeholder.svg'],
    organizer: {
      name: 'Cultural Heritage',
      avatar: '/placeholder.svg',
      verified: false
    },
    attendees: 800,
    capacity: 1000,
    status: 'upcoming' as const,
    featured: true,
    tags: ['makossa', 'tradition', 'festival']
  },

  // Conférences
  {
    id: '3',
    title: 'Tech Summit Cameroun 2025',
    shortDescription: 'Le plus grand événement technologique du Cameroun',
    fullDescription: 'Trois jours de conférences, ateliers et networking pour découvrir les dernières innovations technologiques et rencontrer les leaders du secteur.',
    date: '2025-04-10',
    time: '09:00',
    location: {
      venue: 'Hôtel Hilton Yaoundé',
      address: 'Boulevard du 20 Mai',
      city: 'Yaoundé',
      coordinates: { lat: 3.8480, lng: 11.5021 }
    },
    category: 'Conférences',
    price: { min: 50, max: 150 },
    images: ['/placeholder.svg'],
    organizer: {
      name: 'Tech Events CM',
      avatar: '/placeholder.svg',
      verified: true
    },
    attendees: 500,
    capacity: 600,
    status: 'upcoming' as const,
    featured: true,
    tags: ['technologie', 'innovation', 'startup']
  },
  {
    id: '4',
    title: 'Conférence Entrepreneuriat Féminin',
    shortDescription: 'Autonomisation des femmes entrepreneures',
    fullDescription: 'Une journée dédiée aux femmes entrepreneures avec des témoignages inspirants, des ateliers pratiques et des opportunités de networking.',
    date: '2025-03-08',
    time: '10:00',
    location: {
      venue: 'Centre de Conférences de Bafoussam',
      address: 'Avenue de la Réunification',
      city: 'Bafoussam',
      coordinates: { lat: 5.4765, lng: 10.4173 }
    },
    category: 'Conférences',
    price: { min: 20, max: 40 },
    images: ['/placeholder.svg'],
    organizer: {
      name: 'Women in Business CM',
      avatar: '/placeholder.svg',
      verified: true
    },
    attendees: 200,
    capacity: 250,
    status: 'upcoming' as const,
    featured: false,
    tags: ['entrepreneuriat', 'femmes', 'business']
  },

  // Business
  {
    id: '5',
    title: 'Forum des Investisseurs',
    shortDescription: 'Rencontre entre entrepreneurs et investisseurs',
    fullDescription: 'Un forum exclusif pour connecter les entrepreneurs avec des investisseurs potentiels, avec des sessions de pitch et de networking.',
    date: '2025-05-15',
    time: '14:00',
    location: {
      venue: 'Chambre de Commerce de Douala',
      address: 'Place du Gouvernement',
      city: 'Douala',
      coordinates: { lat: 4.0469, lng: 9.7070 }
    },
    category: 'Business',
    price: { min: 75, max: 200 },
    images: ['/placeholder.svg'],
    organizer: {
      name: 'Business Angels CM',
      avatar: '/placeholder.svg',
      verified: true
    },
    attendees: 150,
    capacity: 200,
    status: 'upcoming' as const,
    featured: false,
    tags: ['investissement', 'startup', 'financement']
  },

  // Art & Culture
  {
    id: '6',
    title: 'Exposition Art Contemporain Africain',
    shortDescription: 'Découverte de l\'art contemporain africain',
    fullDescription: 'Une exposition unique présentant les œuvres d\'artistes contemporains africains émergents et établis.',
    date: '2025-02-28',
    time: '16:00',
    location: {
      venue: 'Galerie d\'Art Moderne',
      address: 'Quartier Bonapriso',
      city: 'Douala',
      coordinates: { lat: 4.0600, lng: 9.7000 }
    },
    category: 'Art & Culture',
    price: { min: 5, max: 15 },
    images: ['/placeholder.svg'],
    organizer: {
      name: 'Galerie Moderne',
      avatar: '/placeholder.svg',
      verified: false
    },
    attendees: 300,
    capacity: 400,
    status: 'upcoming' as const,
    featured: false,
    tags: ['art', 'exposition', 'culture']
  },

  // Gastronomie
  {
    id: '7',
    title: 'Festival Gastronomique Camerounais',
    shortDescription: 'Célébration de la cuisine camerounaise',
    fullDescription: 'Un festival culinaire mettant en avant la richesse de la gastronomie camerounaise avec des chefs renommés.',
    date: '2025-04-25',
    time: '12:00',
    location: {
      venue: 'Parc de la Douala',
      address: 'Boulevard de la Liberté',
      city: 'Douala',
      coordinates: { lat: 4.0400, lng: 9.7200 }
    },
    category: 'Gastronomie',
    price: { min: 25, max: 50 },
    images: ['/placeholder.svg'],
    organizer: {
      name: 'Chefs Unis CM',
      avatar: '/placeholder.svg',
      verified: true
    },
    attendees: 600,
    capacity: 800,
    status: 'upcoming' as const,
    featured: false,
    tags: ['cuisine', 'gastronomie', 'tradition']
  },

  // Networking
  {
    id: '8',
    title: 'Networking Professionals Douala',
    shortDescription: 'Rencontre mensuelle des professionnels',
    fullDescription: 'Un événement mensuel de networking pour les professionnels de tous secteurs à Douala.',
    date: '2025-02-20',
    time: '18:30',
    location: {
      venue: 'Hôtel Akwa Palace',
      address: 'Boulevard de la Liberté',
      city: 'Douala',
      coordinates: { lat: 4.0489, lng: 9.7654 }
    },
    category: 'Networking',
    price: { min: 15, max: 30 },
    images: ['/placeholder.svg'],
    organizer: {
      name: 'Professional Network CM',
      avatar: '/placeholder.svg',
      verified: true
    },
    attendees: 120,
    capacity: 150,
    status: 'upcoming' as const,
    featured: false,
    tags: ['networking', 'professionnel', 'business']
  },

  // Gaming
  {
    id: '9',
    title: 'Tournoi E-Sports Cameroun',
    shortDescription: 'Compétition de jeux vidéo nationale',
    fullDescription: 'Le plus grand tournoi de jeux vidéo du Cameroun avec des prix en espèces et des sponsors internationaux.',
    date: '2025-06-15',
    time: '10:00',
    location: {
      venue: 'Centre Multisport de Yaoundé',
      address: 'Quartier Mfandena',
      city: 'Yaoundé',
      coordinates: { lat: 3.8667, lng: 11.5167 }
    },
    category: 'Gaming',
    price: { min: 10, max: 25 },
    images: ['/placeholder.svg'],
    organizer: {
      name: 'Gaming Club CM',
      avatar: '/placeholder.svg',
      verified: false
    },
    attendees: 300,
    capacity: 400,
    status: 'upcoming' as const,
    featured: false,
    tags: ['gaming', 'esports', 'compétition']
  },

  // Photographie
  {
    id: '10',
    title: 'Workshop Photographie de Portrait',
    shortDescription: 'Atelier de photographie avec un professionnel',
    fullDescription: 'Un atelier intensif de photographie de portrait avec un photographe professionnel reconnu.',
    date: '2025-03-12',
    time: '14:00',
    location: {
      venue: 'Studio Photo Lumière',
      address: 'Rue des Arts, Bonanjo',
      city: 'Douala',
      coordinates: { lat: 4.0520, lng: 9.6950 }
    },
    category: 'Photographie',
    price: { min: 40, max: 80 },
    images: ['/placeholder.svg'],
    organizer: {
      name: 'Photo Academy',
      avatar: '/placeholder.svg',
      verified: true
    },
    attendees: 25,
    capacity: 30,
    status: 'upcoming' as const,
    featured: false,
    tags: ['photographie', 'portrait', 'formation']
  }
];
