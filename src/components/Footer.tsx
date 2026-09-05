import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getContact } from "../lib/content";
export function Footer() {
  const [contact] = useState(getContact);
  return (
    <footer className="border-t border-white/[.08]">
      <div className="container-x pb-10 pt-20">
        <div className="signal-line mb-16" />
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="display text-[clamp(2.2rem,6vw,3.6rem)] font-medium leading-none tracking-[-.04em]"
            >
              audio arts<span className="text-green">.</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/40">
              Professional recording, dubbing, music production and audio
              post-production.
            </p>
            <div className="mono mt-8 text-[10px] uppercase tracking-[.18em] text-white/25">
              Frontend demonstration · UI-first build
            </div>
          </div>
          <div>
            <div className="eyebrow">Explore</div>
            <div className="mt-5 grid gap-3 text-sm text-white/55">
              {[
                ["Studio", "/studio"],
                ["Services", "/services"],
                ["Portfolio", "/portfolio"],
                ["Book a session", "/booking"],
              ].map(([n, p]) => (
                <Link
                  key={p}
                  to={p}
                  className="w-fit transition hover:text-green"
                >
                  {n}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow">Contact</div>
            <div className="mt-5 space-y-3 text-sm text-white/45">
              <div>{contact.email}</div>
              <div>{contact.phone}</div>
              <div>{contact.address}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-3 border-t border-white/[.06] py-6 text-[11px] text-white/25 sm:flex-row sm:items-center">
        <span className="mono">
          © {new Date().getFullYear()} audio arts · Frontend demonstration
        </span>
        <Link
          to="/admin/login"
          className="inline-flex items-center gap-1 transition hover:text-green"
        >
          Studio owner login <ArrowUpRight size={12} />
        </Link>
      </div>
    </footer>
  );
}
