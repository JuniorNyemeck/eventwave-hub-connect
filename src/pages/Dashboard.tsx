
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  BarChart3,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Événements actifs', value: '12', icon: Calendar, change: '+2' },
    { label: 'Participants totaux', value: '1,247', icon: Users, change: '+15%' },
    { label: 'Revenus ce mois', value: '245,000 F', icon: DollarSign, change: '+23%' },
    { label: 'Taux de participation', value: '87%', icon: TrendingUp, change: '+5%' }
  ];

  const recentEvents = [
    {
      id: '1',
      title: 'Concert de Jazz',
      date: '2025-01-15',
      location: 'Douala',
      attendees: 145,
      revenue: '85,000 F',
      status: 'active'
    },
    {
      id: '2',
      title: 'Conférence Tech',
      date: '2025-01-20',
      location: 'Douala',
      attendees: 89,
      revenue: '45,000 F',
      status: 'active'
    },
    {
      id: '3',
      title: 'Festival Culturel',
      date: '2025-01-25',
      location: 'Douala',
      attendees: 234,
      revenue: '120,000 F',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Gérez vos événements et suivez vos performances
            </p>
          </div>
          <Link to="/create-event">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvel événement
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Événements récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEvents.slice(0, 3).map(event => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {event.date}
                            <MapPin className="ml-2 mr-1 h-3 w-3" />
                            {event.location}
                          </p>
                        </div>
                        <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                          {event.status === 'active' ? 'Actif' : 'Terminé'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm">15 nouvelles inscriptions</p>
                        <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm">Événement "Concert Jazz" mis à jour</p>
                        <p className="text-xs text-muted-foreground">Il y a 4 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div>
                        <p className="text-sm">Nouveau commentaire reçu</p>
                        <p className="text-xs text-muted-foreground">Il y a 6 heures</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Mes événements</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Lieu</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Revenus</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEvents.map(event => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.attendees}</TableCell>
                        <TableCell>{event.revenue}</TableCell>
                        <TableCell>
                          <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                            {event.status === 'active' ? 'Actif' : 'Terminé'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Performances mensuelles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    [Graphique des performances mensuelles]
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques détaillées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Taux de conversion</span>
                      <span className="font-bold">12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Temps moyen sur page</span>
                      <span className="font-bold">3min 24s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Événements favoris</span>
                      <span className="font-bold">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Partages sociaux</span>
                      <span className="font-bold">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Gérez vos préférences et paramètres de compte.
                  </p>
                  <Button variant="outline">
                    Modifier le profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
