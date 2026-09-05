import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  AudioWaveform,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AudioPlayer,
  BeforeAfterPlayer,
  Button,
  FaqItem,
  IconButton,
  SectionHead,
  TeamCard,
  cx,
  tc,
  Modal,
  Input,
  Textarea,
} from "../components/UI";
import {
  equipment,
  gallery,
  team,
  testimonials,
  industries,
  whyUs,
  process,
  faqs,
} from "../config/brand";
import { getContact, getPortfolio, getRooms, getServices } from "../lib/content";

function Placeholder({
  title,
  index = 0,
  className = "",
  image,
}: {
  title: string;
  index?: number;
  className?: string;
  image?: string;
}) {
  if (image) {
    return (
      <div className={cx("visual relative overflow-hidden", className)}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/30 backdrop-blur">
            <AudioWaveform size={15} />
          </span>
          <span className="text-[10px] uppercase tracking-[.18em] text-white/70">
            {title}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={cx("visual relative overflow-hidden", className)}>
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at ${25 + index * 13}% ${25 + index * 9}%, rgba(124,111,255,.30), transparent 30%),radial-gradient(circle at ${75 - index * 8}% ${70 - index * 6}%, rgba(63,146,232,.22), transparent 32%)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.03),transparent_40%,rgba(255,255,255,.02))]" />
      <div className="absolute bottom-5 left-5 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/20">
          <AudioWaveform size={15} />
        </span>
        <span className="text-[10px] uppercase tracking-[.18em] text-white/45">
          Approved studio image slot · {title}
        </span>
      </div>
    </div>
  );
}

export function Home() {
  const [services] = useState(getServices);
  const [portfolio] = useState(getPortfolio);
  return (
    <div>
      <section className="hero-full">
        <img
          src="/images/rooms/console-detail.jpg"
          alt="Inside audio arts"
          className="hero-bg"
          loading="eager"
        />
        <div className="hero-scrim" />
        <div className="hero-shard">
          <div className="light-rays" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="container-x relative z-10 max-w-full pb-20 pt-32 lg:pb-28"
        >
          <div className="meter-row mb-7">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                style={{ height: 6 + (i % 5) * 4, animationDelay: `${i * 0.06}s` }}
                className={i < 10 ? "on eq-live" : "eq-live"}
              />
            ))}
          </div>
          <div className="eyebrow">Recording · Dubbing · Production · Post</div>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.8rem,7vw,7.5rem)] font-medium leading-[.9] tracking-[-.06em]">
            WHERE SOUND
            <br />
            <span className="text-white/40">MEETS CRAFT.</span>
          </h1>
          <p className="channel-tick mt-8 max-w-xl text-base leading-7 text-white/60">
            Professional recording, dubbing, music production and audio
            post-production for artists, creators and brands.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/booking">
              <Button>
                BOOK A SESSION <ArrowUpRight size={15} />
              </Button>
            </Link>
            <Link to="/studio">
              <Button variant="outline">EXPLORE THE STUDIO</Button>
            </Link>
          </div>
        </motion.div>
      </section>
      <section className="section container-x">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHead
            eyebrow="The audio arts experience"
            title="A focused space for better decisions."
          />
          <div className="grid gap-8 text-sm leading-7 text-white/50 md:grid-cols-2">
            <p>
              Every session is shaped around clarity, control and a comfortable
              creative workflow. The interface stays quiet so the work can lead.
            </p>
            <p>
              From acoustic environment and capture through production, mixing
              and finishing, the experience is structured without becoming
              rigid.
            </p>
          </div>
        </div>
      </section>
      <section className="section border-t border-white/[.07] container-x">
        <SectionHead
          eyebrow="Questions"
          title="Frequently asked."
          align="left"
        />
        <div className="mt-10 max-w-3xl">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
      <section className="section border-y border-white/[.07] bg-charcoal/45 studio-glow">
        <div className="container-x">
          <SectionHead
            eyebrow="What we do"
            title="Audio, without the noise."
            copy="A considered production workflow across recording, dialogue, music and post."
          />
          <div className="mt-14 grid md:grid-cols-2">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={"/services/" + s.slug}
                className="service-row group"
              >
                <span className="service-number">{tc(i + 1)}</span>
                <span className="flex-1">
                  <strong className="display text-xl font-medium">
                    {s.name}
                  </strong>
                  <span className="mt-2 block max-w-lg text-sm leading-6 text-white/40">
                    {s.description}
                  </span>
                </span>
                <ArrowUpRight
                  size={17}
                  className="text-white/25 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-green"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container-x">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHead
            eyebrow="Selected work"
            title="Let the work speak."
            copy="The current portfolio is intentionally fictional demo content and is clearly labeled as such."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {portfolio.slice(0, 4).map((p, i) => (
              <Link to="/portfolio" key={p.id} className="group">
                <Placeholder title={p.title} index={i + 1} className="h-56" />
                <div className="mt-4">
                  <div className="eyebrow">{p.category} · DEMO PROJECT</div>
                  <h3 className="display mt-2 text-2xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/40">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section border-y border-white/[.07] bg-charcoal/45 studio-glow">
        <div className="container-x">
          <SectionHead
            eyebrow="Kind words"
            title="What clients say."
            copy="A few reactions from recent sessions. Demo quotes, standing in until real testimonials are shared."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col justify-between border border-white/10 bg-white/[.02] p-7"
              >
                <p className="text-sm leading-7 text-white/65">“{t.quote}”</p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-medium">{t.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[.1em] text-white/35">
                    {t.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container-x">
        <SectionHead
          eyebrow="The people"
          title="Engineers behind the sound."
          copy="Roles are shown generically until the client provides real names and photos to publish."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.div
              key={m.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <TeamCard number={m.number} role={m.role} bio={m.bio} />
            </motion.div>
          ))}
        </div>
      </section>
      <section className="section border-y border-white/[.07] bg-charcoal/45 studio-glow container-x">
        <SectionHead
          eyebrow="Why audio arts"
          title="What the studio is built around."
          align="center"
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="border-t border-white/10 pt-5"
            >
              <h3 className="display text-lg">{w.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/40">{w.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="section container-x">
        <SectionHead
          eyebrow="Who it's for"
          title="Built for the industries that need clean audio."
          copy="These represent the kinds of work the studio supports — not a list of current clients."
        />
        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
          {industries.map((x) => (
            <span
              key={x}
              className="display text-2xl text-white/35 transition hover:text-green sm:text-3xl"
            >
              {x}
            </span>
          ))}
        </div>
      </section>

      <section className="section container-x">
        <div className="flex flex-col justify-between gap-8 border-y border-white/10 py-10 md:flex-row md:items-center">
          <div>
            <div className="eyebrow">Ready when you are</div>
            <h2 className="display mt-3 text-4xl">Plan your next session.</h2>
          </div>
          <Link to="/booking">
            <Button>
              BOOK A SESSION <ArrowUpRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export function Studio() {
  const [studios] = useState(getRooms);
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="section container-x">
      <SectionHead
        eyebrow="Inside audio arts"
        title="The space behind the sound."
        copy="Real photography from the control room and recording booth, alongside upcoming spaces."
      />
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {studios.map((s, i) => (
          <button
            type="button"
            className="text-left"
            key={s.id}
            onClick={() => setSelected(i)}
          >
            <Placeholder
              title={s.name}
              index={i}
              image={s.image}
              className="h-[360px]"
            />
            <div className="border-b border-white/10 py-5">
              <div className="flex justify-between gap-5">
                <h3 className="display text-2xl">{s.name}</h3>
                <span className="text-[10px] uppercase tracking-[.14em] text-green">
                  {s.capability}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/45">{s.description}</p>
            </div>
          </button>
        ))}
      </div>
      <section className="mt-28 border-t border-white/10 pt-20">
        <SectionHead
          eyebrow="Technical capability"
          title="The tools behind the sound."
          copy="Generic capability descriptions are used until exact equipment ownership is confirmed."
        />
        <div className="mt-12 grid border-t border-white/10 md:grid-cols-2">
          {equipment.map(([a, b]) => (
            <div key={a} className="border-b border-white/10 py-6 md:pr-10">
              <div className="eyebrow text-green">{a}</div>
              <div className="mt-2 text-white/60">{b}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-28 border-t border-white/10 pt-20">
        <SectionHead
          eyebrow="The people"
          title="Engineers behind the sound."
          copy="Roles are shown generically until the client provides real names and photos to publish."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <TeamCard
              key={m.number}
              number={m.number}
              role={m.role}
              bio={m.bio}
            />
          ))}
        </div>
      </section>
      {selected !== null && (
        <GalleryLightbox
          rooms={studios}
          index={selected}
          onClose={() => setSelected(null)}
          onPrev={() =>
            setSelected((selected - 1 + studios.length) % studios.length)
          }
          onNext={() => setSelected((selected + 1) % studios.length)}
        />
      )}
    </div>
  );
}

function GalleryLightbox({
  rooms,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  rooms: ReturnType<typeof getRooms>;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [onClose, onPrev, onNext]);
  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Studio gallery"
    >
      <div className="relative w-full max-w-5xl">
        <Placeholder
          title={rooms[index].name}
          index={index}
          image={rooms[index].image}
          className="h-[70vh]"
        />
        <div className="absolute right-4 top-4 flex gap-2">
          <IconButton label="Close gallery" onClick={onClose}>
            <X size={17} />
          </IconButton>
        </div>
        <div className="absolute inset-y-0 left-3 flex items-center">
          <IconButton label="Previous image" onClick={onPrev}>
            <ChevronLeft size={20} />
          </IconButton>
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center">
          <IconButton label="Next image" onClick={onNext}>
            <ChevronRight size={20} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [services] = useState(getServices);
  const [active, setActive] = useState(0);
  const s = services[active];
  return (
    <div className="section container-x">
      <SectionHead
        eyebrow="What we do"
        title="Services designed around the work."
        copy="Hover or select a service to see its scope, use cases and deliverables."
      />
      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="border-t border-white/10">
          {services.map((sv, i) => (
            <button
              type="button"
              key={sv.slug}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cx(
                "focus-ring flex w-full items-center gap-5 border-b border-white/10 py-5 text-left transition",
                i === active ? "pl-3" : "pl-0",
              )}
            >
              <span
                className={cx(
                  "font-mono text-xs",
                  i === active ? "text-green" : "text-white/25",
                )}
              >
                {tc(i + 1)}
              </span>
              <span
                className={cx(
                  "display text-2xl transition sm:text-3xl",
                  i === active ? "text-white" : "text-white/30",
                )}
              >
                {sv.name}
              </span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="border border-white/10 bg-white/[.02] p-8"
          >
            <div className="eyebrow">audio arts service · {tc(active + 1)}</div>
            <h3 className="display mt-4 text-3xl">{s.name}</h3>
            <p className="mt-4 text-sm leading-7 text-white/50">{s.detail}</p>
            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="eyebrow">Ideal use cases</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.uses.map((u) => (
                  <span
                    key={u}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50"
                  >
                    {u}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to={"/services/" + s.slug}
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-green"
            >
              View full service <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ServiceDetail() {
  const { service = "" } = useParams();
  const [services] = useState(getServices);
  const s = services.find((x) => x.slug === service);
  if (!s) return <NotFound />;
  return (
    <div className="section container-x">
      <div className="grid gap-12 lg:grid-cols-[1fr_.8fr]">
        <div>
          <div className="eyebrow">audio arts service</div>
          <h1 className="display mt-5 text-[clamp(3.5rem,8vw,7rem)] leading-[.9] tracking-[-.06em]">
            {s.name}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/50">
            {s.detail}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/booking">
              <Button>
                BOOK A SESSION <ArrowUpRight size={15} />
              </Button>
            </Link>
            <Link to="/quote">
              <Button variant="outline">REQUEST A QUOTE</Button>
            </Link>
          </div>
        </div>
        <Placeholder
          title={s.name}
          index={services.findIndex((x) => x.slug === s.slug)}
          className="h-[430px]"
        />
      </div>
      <div className="mt-24 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2">
        <div>
          <div className="eyebrow">Ideal use cases</div>
          <div className="mt-5 space-y-3">
            {s.uses.map((x, i) => (
              <div key={x} className="border-b border-white/10 py-4">
                <span className="mr-4 text-xs text-green">{tc(i + 1)}</span>
                {x}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="eyebrow">Deliverables</div>
          <div className="mt-5 space-y-3">
            {s.deliverables.map((x) => (
              <div key={x} className="border-b border-white/10 py-4">
                {x}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16 border-t border-white/10 pt-8 text-sm text-white/35">
        Final scope, session requirements and deliverables are confirmed before
        production.
      </div>
    </div>
  );
}

export function Portfolio() {
  const [portfolio] = useState(getPortfolio);
  const [filter, setFilter] = useState("All");
  const filters = [
    "All",
    "Music",
    "Dubbing",
    "Film",
    "Advertisement",
    "Voice",
  ];
  const items = useMemo(
    () =>
      filter === "All"
        ? portfolio
        : portfolio.filter((x) => x.category === filter),
    [filter, portfolio],
  );
  return (
    <div className="section container-x">
      <SectionHead
        eyebrow="Selected work"
        title="A place for the work to speak."
        copy="Every project shown here is fictional demo content and is not presented as an Audio Arts client relationship."
      />
      <div className="mt-12 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cx(
              "focus-ring rounded-full px-4 py-2 text-xs",
              filter === f
                ? "bg-green text-black"
                : "border border-white/10 text-white/45 hover:text-white",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {items.map((p, i) => (
          <article key={p.id} className="group">
            <Placeholder title={p.title} index={i} className="h-[390px]" />
            <div className="border-b border-white/10 py-5">
              <div className="eyebrow">{p.category} · DEMO PROJECT</div>
              <h3 className="display mt-2 text-3xl">{p.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                {p.description}
              </p>
              <div className="mt-5">
                <AudioPlayer label="Demo audio preview" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  const [contact] = useState(getContact);
  const [sent, setSent] = useState(false);
  return (
    <div className="section container-x">
      <SectionHead
        eyebrow="Contact"
        title="Let’s talk about the session."
        copy="Contact details are managed by the studio owner from the admin portal."
      />
      <div className="mt-14 grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
        <div className="space-y-0">
          {[
            ["Studio location", contact.address],
            ["Phone", contact.phone],
            ["Email", contact.email],
            ["Business hours", contact.businessHours],
            ["WhatsApp", contact.whatsapp],
            ["Instagram", contact.instagram],
          ].map(([a, b]) => (
            <div key={a} className="border-t border-white/10 py-5">
              <div className="eyebrow">{a}</div>
              <div className="mt-2 text-white/65">{b}</div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {sent ? (
            <div className="sm:col-span-2">
              <div className="empty-state">
                <CheckIcon />
                <h3 className="display mt-4 text-xl">
                  Enquiry saved for demo review.
                </h3>
                <p className="mt-2 text-sm text-white/40">
                  Nothing was sent to an external system.
                </p>
                <button
                  type="button"
                  className="mt-5 text-sm text-green"
                  onClick={() => setSent(false)}
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <>
              <Input label="Name" required />
              <Input label="Email" type="email" required />
              <Input label="Phone" />
              <Input label="Project type" />
              <Textarea
                label="Message"
                className="sm:col-span-2"
                rows={7}
                required
              />
              <div className="sm:col-span-2">
                <Button type="submit">
                  SEND ENQUIRY <ArrowUpRight size={15} />
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
function CheckIcon() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-full bg-green text-black">
      <span>✓</span>
    </span>
  );
}

export function Quote() {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <div className="section container-x">
        <div className="mx-auto max-w-2xl">
          <div className="empty-state">
            <CheckIcon />
            <h1 className="display mt-5 text-3xl">
              Quote request received in demo mode.
            </h1>
            <p className="mt-3 text-sm text-white/40">
              No files or personal data were uploaded to an external service.
            </p>
            <Link to="/" className="mt-6 inline-flex text-sm text-green">
              Return home <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  return (
    <div className="section container-x">
      <div className="max-w-2xl">
        <SectionHead
          eyebrow="Request a quote"
          title="Tell us what you’re making."
          copy="Demo enquiry flow. Reference upload is presentation-only unless a backend is connected."
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          <Input label="Name" required />
          <Input label="Email" type="email" required />
          <Input label="Phone" />
          <Input label="Project type" />
          <Textarea
            label="Project description"
            className="md:col-span-2"
            rows={6}
            required
          />
          <Input label="Estimated duration" />
          <Input label="Preferred date" type="date" />
          <Input label="Budget range" />
          <label className="block text-sm">
            <span className="label">Reference upload · demo</span>
            <input
              type="file"
              className="field mt-2 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs"
            />
          </label>
          <div className="md:col-span-2">
            <Button type="submit">
              SUBMIT REQUEST <ArrowUpRight size={15} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="section container-x min-h-[70vh] grid place-items-center">
      <div className="text-center">
        <div className="eyebrow">404 · Page not found</div>
        <h1 className="display mt-4 text-6xl">Nothing here.</h1>
        <p className="mt-4 text-white/40">
          The page you requested does not exist.
        </p>
        <Link to="/" className="mt-7 inline-flex text-sm text-green">
          Return to audio arts <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
