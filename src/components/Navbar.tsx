import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight, Lock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, cx, IconButton, Logo } from "./UI";

const links = [
  ["Studio", "/studio"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Contact", "/contact"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className="site-nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {links.map(([n, p], i) => (
            <NavLink
              key={p}
              to={p}
              className={({ isActive }) => cx("nav-link", isActive && "active")}
            >
              <span className="nav-name whitespace-nowrap">{n}</span>
              <span className="nav-fill" />
            </NavLink>
          ))}

          <Link
            to="/admin/login"
            aria-label="Admin login"
            title="Admin login"
            className="focus-ring grid h-9 w-9 flex-none place-items-center rounded-full border border-white/12 text-white/45 transition hover:border-green/50 hover:text-green"
          >
            <Lock size={14} />
          </Link>

          <Link to="/booking">
            <Button>
              BOOK A SESSION <ArrowUpRight size={14} />
            </Button>
          </Link>
        </nav>

        <div className="lg:hidden">
          <IconButton
            label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </IconButton>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-20 z-50 bg-ink lg:hidden"
          >
            <nav className="container-x flex flex-col py-8">
              {links.map(([n, p], i) => (
                <motion.div
                  key={p}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    onClick={() => setOpen(false)}
                    to={p}
                    className="display flex items-baseline gap-4 border-b border-white/[.08] py-5"
                  >
                    <span className="font-mono text-xs text-white/25">
                      CH.{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-3xl">{n}</span>
                  </Link>
                </motion.div>
              ))}

              <Link
                onClick={() => setOpen(false)}
                to="/booking"
                className="mt-8"
              >
                <Button className="w-full">
                  BOOK A SESSION <ArrowUpRight size={15} />
                </Button>
              </Link>

              <Link
                onClick={() => setOpen(false)}
                to="/admin/login"
                className="mt-5 inline-flex items-center justify-center gap-2 text-center text-sm text-white/45"
              >
                <Lock size={13} /> Admin login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
