import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'home': 'Accueil',
    'discover': 'Découvrir',
    'categories': 'Catégories',
    'organizers': 'Organisateurs',
    'login': 'Connexion',
    'register': 'Inscription',
    'dashboard': 'Tableau de bord',
    'profile': 'Profil',
    'logout': 'Déconnexion',
    
    // Common
    'common.search': 'Rechercher',
    'common.filter': 'Filtres',
    'common.download': 'Télécharger',
    'common.share': 'Partager',
    'common.date': 'Date',
    'common.time': 'Heure',
    'common.location': 'Lieu',
    'common.price': 'Prix',
    'common.tickets': 'Billets',
    'common.events': 'Événements',
    'common.categories': 'Catégories',
    'common.organizers': 'Organisateurs',
    'common.participants': 'Participants',
    
    // Tickets
    'ticket.title': 'Billet Électronique',
    'ticket.valid': 'Valide',
    'ticket.details': 'Détails du billet',
    'ticket.verification': 'Code de vérification',
    'ticket.instructions': 'Instructions importantes',
    'ticket.present': 'Présentez ce billet (imprimé ou numérique) à l\'entrée',
    'ticket.id_required': 'Une pièce d\'identité peut être demandée',
    'ticket.arrive_time': 'Arrivez à l\'heure indiquée sur votre billet',
    'ticket.non_refundable': 'Ce billet est non remboursable et non transférable',
    'ticket.download_pdf': 'Télécharger PDF',
    'ticket.downloading': 'Téléchargement...',
    'ticket.qr_instruction': 'Présentez ce QR code à l\'entrée de l\'événement',
    'ticket.not_found': 'Billet non trouvé',
    'ticket.not_found_desc': 'Ce billet n\'existe pas ou a été supprimé.',
    'ticket.purchased_tickets': 'Billets achetés',
    'ticket.total_paid': 'Total payé',
    
    // Discover
    'discover.title': 'Découvrir des événements',
    'discover.subtitle': 'Trouvez les événements qui correspondent à vos envies',
    'discover.search_placeholder': 'Rechercher des événements...',
    'discover.price_range': 'Fourchette de prix',
    'discover.period': 'Période',
    'discover.all_dates': 'Toutes les dates',
    'discover.today': 'Aujourd\'hui',
    'discover.this_week': 'Cette semaine',
    'discover.this_month': 'Ce mois',
    'discover.weekends': 'Week-ends',
    'discover.clear_filters': 'Effacer les filtres',
    'discover.no_events': 'Aucun événement trouvé',
    'discover.no_events_desc': 'Essayez de modifier vos critères de recherche ou de supprimer certains filtres.',
    'discover.load_more': 'Charger plus d\'événements',
    'discover.events_found': 'événement{s} trouvé{s}',
    'discover.sort_relevance': 'Pertinence',
    'discover.sort_date_asc': 'Date (plus proche)',
    'discover.sort_date_desc': 'Date (plus lointaine)',
    'discover.sort_price_asc': 'Prix (croissant)',
    'discover.sort_price_desc': 'Prix (décroissant)',
    'discover.sort_popularity': 'Popularité',
    
    // Categories
    'categories.explore': 'Explorez par catégorie',
    'categories.subtitle': 'Découvrez des événements dans vos domaines d\'intérêt favoris. De la musique au sport, en passant par la technologie et l\'art.',
    'categories.active_events': 'événements actifs',
    'categories.available': 'catégories disponibles',
    'categories.popular': 'Catégories populaires',
    'categories.popular_desc': 'Les catégories les plus prisées par notre communauté',
    'categories.explore_category': 'Explorer {category}',
    'categories.popular_event': 'Événement populaire',
    'categories.view_all': 'Voir tout',
    'categories.all_categories': 'Toutes les catégories',
    'categories.all_desc': 'Explorez l\'ensemble de nos catégories d\'événements',
    'categories.upcoming': 'à venir',
    'categories.not_found': 'Catégorie non trouvée',
    'categories.back_to_categories': 'Retour aux catégories',
    'categories.no_events_category': 'Aucun événement ne correspond à vos critères dans cette catégorie.',
    'categories.avg_price': 'Prix moyen (CFA)',
    
    // Themes
    'theme.light': 'Clair',
    'theme.dark': 'Sombre',
    'theme.system': 'Système',
  },
  en: {
    // Navigation
    'home': 'Home',
    'discover': 'Discover',
    'categories': 'Categories',
    'organizers': 'Organizers',
    'login': 'Login',
    'register': 'Sign Up',
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'logout': 'Logout',
    
    // Common
    'common.search': 'Search',
    'common.filter': 'Filters',
    'common.download': 'Download',
    'common.share': 'Share',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.location': 'Location',
    'common.price': 'Price',
    'common.tickets': 'Tickets',
    'common.events': 'Events',
    'common.categories': 'Categories',
    'common.organizers': 'Organizers',
    'common.participants': 'Participants',
    
    // Tickets
    'ticket.title': 'Electronic Ticket',
    'ticket.valid': 'Valid',
    'ticket.details': 'Ticket details',
    'ticket.verification': 'Verification code',
    'ticket.instructions': 'Important instructions',
    'ticket.present': 'Present this ticket (printed or digital) at the entrance',
    'ticket.id_required': 'ID may be required',
    'ticket.arrive_time': 'Arrive at the time indicated on your ticket',
    'ticket.non_refundable': 'This ticket is non-refundable and non-transferable',
    'ticket.download_pdf': 'Download PDF',
    'ticket.downloading': 'Downloading...',
    'ticket.qr_instruction': 'Present this QR code at the event entrance',
    'ticket.not_found': 'Ticket not found',
    'ticket.not_found_desc': 'This ticket does not exist or has been deleted.',
    'ticket.purchased_tickets': 'Purchased tickets',
    'ticket.total_paid': 'Total paid',
    
    // Discover
    'discover.title': 'Discover events',
    'discover.subtitle': 'Find events that match your interests',
    'discover.search_placeholder': 'Search for events...',
    'discover.price_range': 'Price range',
    'discover.period': 'Period',
    'discover.all_dates': 'All dates',
    'discover.today': 'Today',
    'discover.this_week': 'This week',
    'discover.this_month': 'This month',
    'discover.weekends': 'Weekends',
    'discover.clear_filters': 'Clear filters',
    'discover.no_events': 'No events found',
    'discover.no_events_desc': 'Try modifying your search criteria or removing some filters.',
    'discover.load_more': 'Load more events',
    'discover.events_found': 'event{s} found',
    'discover.sort_relevance': 'Relevance',
    'discover.sort_date_asc': 'Date (nearest)',
    'discover.sort_date_desc': 'Date (farthest)',
    'discover.sort_price_asc': 'Price (ascending)',
    'discover.sort_price_desc': 'Price (descending)',
    'discover.sort_popularity': 'Popularity',
    
    // Categories
    'categories.explore': 'Explore by category',
    'categories.subtitle': 'Discover events in your favorite areas of interest. From music to sports, technology and art.',
    'categories.active_events': 'active events',
    'categories.available': 'available categories',
    'categories.popular': 'Popular categories',
    'categories.popular_desc': 'The most popular categories in our community',
    'categories.explore_category': 'Explore {category}',
    'categories.popular_event': 'Popular event',
    'categories.view_all': 'View all',
    'categories.all_categories': 'All categories',
    'categories.all_desc': 'Explore all our event categories',
    'categories.upcoming': 'upcoming',
    'categories.not_found': 'Category not found',
    'categories.back_to_categories': 'Back to categories',
    'categories.no_events_category': 'No events match your criteria in this category.',
    'categories.avg_price': 'Average price (CFA)',
    
    // Themes
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}