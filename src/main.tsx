import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./index.css";
import { PublicLayout } from "./layouts/PublicLayout";
import {
  Home,
  Studio,
  Services,
  ServiceDetail,
  Portfolio,
  Contact,
  Quote,
  NotFound,
} from "./pages/Public";
import { Booking } from "./pages/Booking";
import {
  Login,
  AdminHome,
  AdminRooms,
  AdminPortfolio,
  AdminServices,
  AdminBookings,
  AdminClients,
  AdminProjects,
  AdminMessages,
  AdminSettings,
} from "./pages/Portal";
import { isDemoAuthed } from "./lib/auth";

// Demo-only guard: without it, typing /admin directly in the address bar
// skips the login screen entirely (broken access control). This still isn't
// real authentication — see README "Security limitations" — it just makes
// the sales demo behave the way an owner-only admin console should.
function RequirePortalAuth({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  if (!isDemoAuthed())
    return (
      <Navigate to="/admin/login" state={{ from: loc.pathname }} replace />
    );
  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:service" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <RequirePortalAuth>
            <AdminHome />
          </RequirePortalAuth>
        }
      />
      <Route
        path="/admin/rooms"
        element={
          <RequirePortalAuth>
            <AdminRooms />
          </RequirePortalAuth>
        }
      />
      <Route
        path="/admin/portfolio"
        element={
          <RequirePortalAuth>
            <AdminPortfolio />
          </RequirePortalAuth>
        }
      />
      <Route
        path="/admin/services"
        element={
          <RequirePortalAuth>
            <AdminServices />
          </RequirePortalAuth>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <RequirePortalAuth>
            <AdminBookings />
          </RequirePortalAuth>
        }
      />
      <Route
        path="/admin/clients"
        element={
          <RequirePortalAuth>
            <AdminClients />
          </RequirePortalAuth>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <RequirePortalAuth>
            <AdminProjects />
          </RequirePortalAuth>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <RequirePortalAuth>
            <AdminMessages />
          </RequirePortalAuth>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <RequirePortalAuth>
            <AdminSettings />
          </RequirePortalAuth>
        }
      />
    </Routes>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
