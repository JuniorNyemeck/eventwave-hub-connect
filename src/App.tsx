
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import TicketPurchase from "./pages/TicketPurchase";
import TicketView from "./pages/TicketView";
import Organizers from "./pages/Organizers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="eventwave-theme">
      <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="discover" element={<Discover />} />
                <Route path="categories" element={<Categories />} />
                <Route path="categories/:categoryId" element={<CategoryPage />} />
                <Route path="events/:id" element={<EventDetail />} />
                <Route path="events/:id/tickets" element={<TicketPurchase />} />
                <Route path="ticket/:ticketId" element={<TicketView />} />
                <Route path="organizers" element={<Organizers />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="create-event" element={<CreateEvent />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
