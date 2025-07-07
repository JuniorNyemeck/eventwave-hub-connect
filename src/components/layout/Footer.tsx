
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/a191384a-7740-40c9-9591-19169c81e086.png" 
                alt="EventWave Logo" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                EventWave
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              La plateforme de référence pour découvrir et organiser des événements exceptionnels à Douala, Cameroun.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link to="/discover" className="text-muted-foreground hover:text-primary transition-colors">Découvrir</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">Catégories</Link></li>
              <li><Link to="/organizers" className="text-muted-foreground hover:text-primary transition-colors">Organisateurs</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">À propos</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/create-event" className="text-muted-foreground hover:text-primary transition-colors">Créer un événement</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Tarifs</Link></li>
              <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Centre d'aide</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Restez informé des derniers événements et actualités.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Votre email" className="flex-1" />
              <Button>S'abonner</Button>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@eventwave.cm</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+237 6 98 97 94 37</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Douala, Cameroun</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 EventWave. Tous droits réservés.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Confidentialité
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Conditions
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
