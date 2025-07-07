
import { Music, Mic, Briefcase, Palette, Utensils, Users, Gamepad2, Camera } from 'lucide-react';

export const categories = [
  {
    id: 'concerts',
    name: 'Concerts',
    icon: Music,
    color: 'bg-blue-100 text-blue-600',
    count: 45
  },
  {
    id: 'conferences',
    name: 'Conférences',
    icon: Mic,
    color: 'bg-green-100 text-green-600',
    count: 32
  },
  {
    id: 'business',
    name: 'Business',
    icon: Briefcase,
    color: 'bg-purple-100 text-purple-600',
    count: 28
  },
  {
    id: 'art',
    name: 'Art & Culture',
    icon: Palette,
    color: 'bg-pink-100 text-pink-600',
    count: 24
  },
  {
    id: 'food',
    name: 'Gastronomie',
    icon: Utensils,
    color: 'bg-orange-100 text-orange-600',
    count: 18
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: Users,
    color: 'bg-cyan-100 text-cyan-600',
    count: 21
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    color: 'bg-red-100 text-red-600',
    count: 15
  },
  {
    id: 'photography',
    name: 'Photographie',
    icon: Camera,
    color: 'bg-yellow-100 text-yellow-600',
    count: 12
  }
];

export const cameroonCities = [
  'Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua',
  'Ngaoundéré', 'Bertoua', 'Ebolowa', 'Kribi', 'Limbe', 'Buea',
  'Kumba', 'Edéa', 'Foumban', 'Mbalmayo', 'Sangmélima', 'Dschang'
];

export const mockEvents = [
  // Concerts
  {
    id: '1',
    title: 'Concert Jazz Fusion Night',
    shortDescription: 'Une soirée jazz exceptionnelle avec les meilleurs musiciens du Cameroun',
    description: 'Une soirée jazz exceptionnelle avec les meilleurs musiciens du Cameroun',
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
    price: { min: 15000, max: 35000, currency: 'CFA' },
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'],
    organizer: {
      id: '1',
      name: 'EventPro Cameroun',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      verified: true,
      rating: 4.8
    },
    attendees: 250,
    capacity: 300,
    status: 'upcoming' as const,
    featured: true,
    tags: ['jazz', 'musique', 'culture'],
    tickets: [
      {
        id: 'jazz-standard',
        name: 'Billet Standard',
        price: 15000,
        description: 'Accès général à la soirée',
        quantity: 200,
        sold: 150,
        benefits: ['Accès à la salle', 'Consommation offerte']
      },
      {
        id: 'jazz-vip',
        name: 'Billet VIP',
        price: 35000,
        description: 'Accès VIP avec privilèges',
        quantity: 100,
        sold: 75,
        benefits: ['Accès VIP', 'Meet & Greet', 'Buffet inclus']
      }
    ]
  },
  {
    id: '2',
    title: 'Festival Makossa Revival',
    shortDescription: 'Célébration de la musique makossa traditionnelle',
    description: 'Célébration de la musique makossa traditionnelle',
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
    price: { min: 10000, max: 25000, currency: 'CFA' },
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    images: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'],
    organizer: {
      id: '2',
      name: 'Cultural Heritage',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      verified: false,
      rating: 4.2
    },
    attendees: 800,
    capacity: 1000,
    status: 'upcoming' as const,
    featured: true,
    tags: ['makossa', 'tradition', 'festival'],
    tickets: [
      {
        id: 'makossa-standard',
        name: 'Billet Standard',
        price: 10000,
        description: 'Accès général au festival',
        quantity: 800,
        sold: 600,
        benefits: ['Accès au festival', 'Programme officiel']
      },
      {
        id: 'makossa-premium',
        name: 'Billet Premium',
        price: 25000,
        description: 'Accès premium avec avantages',
        quantity: 200,
        sold: 150,
        benefits: ['Accès premium', 'Zone réservée', 'Merchandising offert']
      }
    ]
  },
  {
    id: '11',
    title: 'Concert Afrobeat Live',
    shortDescription: 'Soirée afrobeat avec les meilleurs artistes',
    description: 'Soirée afrobeat avec les meilleurs artistes',
    fullDescription: 'Une soirée exceptionnelle dédiée à l\'afrobeat avec des artistes renommés du continent africain.',
    date: '2025-04-18',
    time: '19:30',
    location: {
      venue: 'Salle des Fêtes de Bonapriso',
      address: 'Bonapriso',
      city: 'Douala',
      coordinates: { lat: 4.0600, lng: 9.7000 }
    },
    category: 'Concerts',
    price: { min: 12000, max: 30000 },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
    organizer: {
      name: 'Afro Music Events',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      verified: true
    },
    attendees: 400,
    capacity: 500,
    status: 'upcoming' as const,
    featured: false,
    tags: ['afrobeat', 'musique', 'live'],
    tickets: []
  },

  // Conférences
  {
    id: '3',
    title: 'Tech Summit Cameroun 2025',
    shortDescription: 'Le plus grand événement technologique du Cameroun',
    description: 'Le plus grand événement technologique du Cameroun',
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
    price: { min: 50000, max: 150000 },
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    images: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800'],
    organizer: {
      name: 'Tech Events CM',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
      verified: true
    },
    attendees: 500,
    capacity: 600,
    status: 'upcoming' as const,
    featured: true,
    tags: ['technologie', 'innovation', 'startup'],
    tickets: []
  },
  {
    id: '4',
    title: 'Conférence Entrepreneuriat Féminin',
    shortDescription: 'Autonomisation des femmes entrepreneures',
    description: 'Autonomisation des femmes entrepreneures',
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
    price: { min: 20000, max: 40000 },
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800',
    images: ['https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800'],
    organizer: {
      name: 'Women in Business CM',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c96f4b8a?w=150',
      verified: true
    },
    attendees: 200,
    capacity: 250,
    status: 'upcoming' as const,
    featured: false,
    tags: ['entrepreneuriat', 'femmes', 'business'],
    tickets: []
  },
  {
    id: '12',
    title: 'Conférence Intelligence Artificielle',
    shortDescription: 'L\'avenir de l\'IA en Afrique',
    description: 'L\'avenir de l\'IA en Afrique',
    fullDescription: 'Une conférence dédiée aux développements de l\'intelligence artificielle et son impact sur le continent africain.',
    date: '2025-05-22',
    time: '14:00',
    location: {
      venue: 'Université de Douala',
      address: 'Campus Universitaire',
      city: 'Douala',
      coordinates: { lat: 4.0700, lng: 9.7400 }
    },
    category: 'Conférences',
    price: { min: 25000, max: 60000 },
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    images: ['https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800'],
    organizer: {
      name: 'AI Research Group',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      verified: true
    },
    attendees: 180,
    capacity: 220,
    status: 'upcoming' as const,
    featured: false,
    tags: ['intelligence artificielle', 'technologie', 'recherche'],
    tickets: []
  },

  // Business
  {
    id: '5',
    title: 'Forum des Investisseurs',
    shortDescription: 'Rencontre entre entrepreneurs et investisseurs',
    description: 'Rencontre entre entrepreneurs et investisseurs',
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
    price: { min: 75000, max: 200000 },
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'],
    organizer: {
      name: 'Business Angels CM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      verified: true
    },
    attendees: 150,
    capacity: 200,
    status: 'upcoming' as const,
    featured: false,
    tags: ['investissement', 'startup', 'financement'],
    tickets: []
  },
  {
    id: '13',
    title: 'Salon des PME Camerounaises',
    shortDescription: 'Exposition et networking pour les PME',
    description: 'Exposition et networking pour les PME',
    fullDescription: 'Un salon dédié aux petites et moyennes entreprises camerounaises avec des opportunités de partenariat et d\'expansion.',
    date: '2025-06-10',
    time: '09:00',
    location: {
      venue: 'Palais des Congrès',
      address: 'Centre-ville',
      city: 'Yaoundé',
      coordinates: { lat: 3.8570, lng: 11.5120 }
    },
    category: 'Business',
    price: { min: 30000, max: 80000 },
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800',
    images: ['https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800'],
    organizer: {
      name: 'Association PME Cameroun',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      verified: false
    },
    attendees: 300,
    capacity: 400,
    status: 'upcoming' as const,
    featured: false,
    tags: ['pme', 'exposition', 'partenariat'],
    tickets: []
  },

  // Art & Culture
  {
    id: '6',
    title: 'Exposition Art Contemporain Africain',
    shortDescription: 'Découverte de l\'art contemporain africain',
    description: 'Découverte de l\'art contemporain africain',
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
    price: { min: 5000, max: 15000 },
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    images: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800'],
    organizer: {
      name: 'Galerie Moderne',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c96f4b8a?w=150',
      verified: false
    },
    attendees: 300,
    capacity: 400,
    status: 'upcoming' as const,
    featured: false,
    tags: ['art', 'exposition', 'culture'],
    tickets: []
  },
  {
    id: '14',
    title: 'Festival des Arts Traditionnels',
    shortDescription: 'Célébration des arts traditionnels camerounais',
    description: 'Célébration des arts traditionnels camerounais',
    fullDescription: 'Un festival mettant en valeur les arts traditionnels du Cameroun avec des artisans, danseurs et musiciens.',
    date: '2025-07-14',
    time: '15:00',
    location: {
      venue: 'Place des Fêtes',
      address: 'Centre-ville',
      city: 'Bafoussam',
      coordinates: { lat: 5.4800, lng: 10.4200 }
    },
    category: 'Art & Culture',
    price: { min: 8000, max: 20000 },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'],
    organizer: {
      name: 'Heritage Culturel',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      verified: true
    },
    attendees: 600,
    capacity: 800,
    status: 'upcoming' as const,
    featured: true,
    tags: ['tradition', 'artisanat', 'culture'],
    tickets: []
  },

  // Gastronomie
  {
    id: '7',
    title: 'Festival Gastronomique Camerounais',
    shortDescription: 'Célébration de la cuisine camerounaise',
    description: 'Célébration de la cuisine camerounaise',
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
    price: { min: 25000, max: 50000 },
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800'],
    organizer: {
      name: 'Chefs Unis CM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      verified: true
    },
    attendees: 600,
    capacity: 800,
    status: 'upcoming' as const,
    featured: false,
    tags: ['cuisine', 'gastronomie', 'tradition'],
    tickets: []
  },
  {
    id: '15',
    title: 'Atelier Cuisine Traditionnelle',
    shortDescription: 'Apprendre la cuisine camerounaise authentique',
    description: 'Apprendre la cuisine camerounaise authentique',
    fullDescription: 'Un atelier pratique pour apprendre à préparer les plats traditionnels camerounais avec des chefs expérimentés.',
    date: '2025-03-30',
    time: '10:00',
    location: {
      venue: 'École Culinaire de Douala',
      address: 'Akwa',
      city: 'Douala',
      coordinates: { lat: 4.0520, lng: 9.7650 }
    },
    category: 'Gastronomie',
    price: { min: 35000, max: 65000 },
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'],
    organizer: {
      name: 'École Culinaire CM',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
      verified: true
    },
    attendees: 40,
    capacity: 50,
    status: 'upcoming' as const,
    featured: false,
    tags: ['atelier', 'cuisine', 'formation'],
    tickets: []
  },

  // Networking
  {
    id: '8',
    title: 'Networking Professionals Douala',
    shortDescription: 'Rencontre mensuelle des professionnels',
    description: 'Rencontre mensuelle des professionnels',
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
    price: { min: 15000, max: 30000 },
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
    images: ['https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800'],
    organizer: {
      name: 'Professional Network CM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      verified: true
    },
    attendees: 120,
    capacity: 150,
    status: 'upcoming' as const,
    featured: false,
    tags: ['networking', 'professionnel', 'business'],
    tickets: []
  },

  // Gaming
  {
    id: '9',
    title: 'Tournoi E-Sports Cameroun',
    shortDescription: 'Compétition de jeux vidéo nationale',
    description: 'Compétition de jeux vidéo nationale',
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
    price: { min: 10000, max: 25000 },
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'],
    organizer: {
      name: 'Gaming Club CM',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      verified: false
    },
    attendees: 300,
    capacity: 400,
    status: 'upcoming' as const,
    featured: false,
    tags: ['gaming', 'esports', 'compétition'],
    tickets: []
  },

  // Photographie
  {
    id: '10',
    title: 'Workshop Photographie de Portrait',
    shortDescription: 'Atelier de photographie avec un professionnel',
    description: 'Atelier de photographie avec un professionnel',
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
    price: { min: 40000, max: 80000 },
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'],
    organizer: {
      name: 'Photo Academy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      verified: true
    },
    attendees: 25,
    capacity: 30,
    status: 'upcoming' as const,
    featured: false,
    tags: ['photographie', 'portrait', 'formation'],
    tickets: []
  }
];
