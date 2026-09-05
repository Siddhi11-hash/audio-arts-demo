import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollRail } from "../components/ScrollRail";
const titles: Record<string, [string, string]> = {
  "/": [
    "audio arts | Recording, Dubbing & Music Production",
    "Professional recording, dubbing, music production and audio post-production for artists, creators and brands.",
  ],
  "/studio": [
    "Studio | audio arts",
    "Explore the audio arts studio experience and technical capabilities.",
  ],
  "/services": [
    "Services | audio arts",
    "Recording, dubbing, voice over, music production, mixing, mastering and audio post-production.",
  ],
  "/portfolio": [
    "Portfolio | audio arts",
    "Selected fictional demo work for the audio arts website experience.",
  ],
  "/booking": [
    "Book a Session | audio arts",
    "Request a demo studio session through the audio arts booking flow.",
  ],
  "/contact": [
    "Contact | audio arts",
    "Contact audio arts about a recording, dubbing, production or post-production session.",
  ],
  "/quote": [
    "Request a Quote | audio arts",
    "Share project details with audio arts through the demo quote request flow.",
  ],
};
export function PublicLayout() {
  const loc = useLocation();
  useEffect(() => {
    const [title, desc] = titles[loc.pathname] || [
      "audio arts",
      "Professional audio production experience.",
    ];
    document.title = title;
    let m =
      document.querySelector('meta[name="description"]') ||
      document.createElement("meta");
    m.setAttribute("name", "description");
    m.setAttribute("content", desc);
    document.head.appendChild(m);
    let og =
      document.querySelector('meta[property="og:title"]') ||
      document.createElement("meta");
    og.setAttribute("property", "og:title");
    og.setAttribute("content", title);
    document.head.appendChild(og);
  }, [loc.pathname]);
  return (
    <>
      <Navbar />
      <ScrollRail />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
