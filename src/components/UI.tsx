import { useEffect, useRef, useState } from "react";
import type {
  ReactNode,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  X,
  AlertCircle,
  Info,
  LoaderCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
} from "lucide-react";

export const cx = (...v: (string | false | undefined | null)[]) =>
  v.filter(Boolean).join(" ");
export const tc = (n: number) => "00:00:00:" + String(n).padStart(2, "0");

export function EqualizerMark({ className = "" }: { className?: string }) {
  return (
    <span className={cx("eq-mark", className)} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function Logo({
  className = "",
  size = "text-lg",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span
      className={cx("logo-group inline-flex items-center gap-2.5", className)}
    >
      <EqualizerMark />
      <span
        className={cx(
          "display font-semibold tracking-[-.03em] leading-none",
          size,
        )}
      >
        audio arts<span className="text-green logo-dot">.</span>
      </span>
    </span>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export function Button({
  variant = "solid",
  className = "",
  children,
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
}) {
  return (
    <button
      {...p}
      className={cx(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold tracking-[.08em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-45",
        variant === "solid"
          ? "bg-offwhite text-ink hover:bg-green"
          : variant === "outline"
            ? "border border-white/15 bg-transparent text-white hover:border-green/50 hover:text-green"
            : "text-white/60 hover:bg-white/[.05] hover:text-white",
        className,
      )}
    >
      {children}
    </button>
  );
}
export function IconButton({
  label,
  children,
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      {...p}
      aria-label={label}
      className={cx(
        "focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/65 transition hover:border-green/50 hover:text-green",
        p.className as string,
      )}
    >
      {children}
    </button>
  );
}
export function Input({
  label,
  error,
  ...p
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block text-sm">
      <span className="label">{label}</span>
      <input {...p} aria-invalid={!!error} className="focus-ring field mt-2" />
      {error && (
        <span className="mt-2 block text-xs text-red-300">{error}</span>
      )}
    </label>
  );
}
export function Textarea({
  label,
  error,
  ...p
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="label">{label}</span>
      <textarea
        {...p}
        aria-invalid={!!error}
        className="focus-ring field mt-2"
      />
      {error && (
        <span className="mt-2 block text-xs text-red-300">{error}</span>
      )}
    </label>
  );
}
export function Select({
  label,
  children,
  ...p
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="block text-sm">
      <span className="label">{label}</span>
      <select {...p} className="focus-ring field mt-2">
        {children}
      </select>
    </label>
  );
}
export function SectionHead({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cx("max-w-3xl", align === "center" && "mx-auto text-center")}
    >
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="display mt-4 text-4xl font-medium tracking-[-.04em] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/48">
          {copy}
        </p>
      )}
    </Reveal>
  );
}
export function Status({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "muted" | "amber";
}) {
  return (
    <span
      className={cx(
        "status",
        tone === "green"
          ? "status-green"
          : tone === "amber"
            ? "status-amber"
            : "status-muted",
      )}
    >
      <span className="status-dot" />
      {children}
    </span>
  );
}
export function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      role="status"
      className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-3 rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-sm shadow-2xl"
    >
      <Check size={16} className="text-green" />
      {message}
      <IconButton label="Close notification" onClick={onClose}>
        <X size={15} />
      </IconButton>
    </div>
  );
}
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={ref}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl border border-white/10 bg-charcoal p-6 shadow-2xl"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
          >
            <div className="flex items-center justify-between gap-5">
              <h2 id="dialog-title" className="display text-2xl font-medium">
                {title}
              </h2>
              <IconButton label="Close dialog" onClick={onClose}>
                <X size={16} />
              </IconButton>
            </div>
            <div className="mt-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export function EmptyState({
  title,
  copy,
  action,
}: {
  title: string;
  copy: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <Info size={20} />
      <h3 className="display mt-4 text-xl">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-white/40">{copy}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
export function ErrorState({ retry }: { retry?: () => void }) {
  return (
    <div className="empty-state">
      <AlertCircle size={20} className="text-red-300" />
      <h3 className="display mt-4 text-xl">Something went wrong.</h3>
      <p className="mt-2 text-sm text-white/40">
        Please try again. If the issue continues, contact the studio.
      </p>
      {retry && (
        <Button onClick={retry} className="mt-5">
          TRY AGAIN
        </Button>
      )}
    </div>
  );
}
export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={cx("skeleton", className)} />;
}
export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-trigger focus-ring"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        <span
          className={cx(
            "grid h-8 w-8 flex-none place-items-center rounded-full border border-white/15 text-white/50 transition",
            open && "rotate-45 border-green/50 text-green",
          )}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-sm leading-7 text-white/45">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export function TeamCard({
  number,
  role,
  bio,
}: {
  number: string;
  role: string;
  bio: string;
}) {
  return (
    <div>
      <div className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/[.03] font-mono text-sm font-semibold text-green">
        {number}
      </div>
      <h3 className="display mt-4 text-lg">Engineer {number}</h3>
      <div className="mt-1 text-[11px] uppercase tracking-[.12em] text-white/35">
        {role}
      </div>
      <p className="mt-3 text-sm leading-6 text-white/40">{bio}</p>
    </div>
  );
}
export function BeforeAfterPlayer({
  label = "Before / After comparison",
}: {
  label?: string;
}) {
  const [active, setActive] = useState<"before" | "after">("after");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<number>();
  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(
      () => setProgress((p) => (p >= 100 ? 0 : p + 1)),
      500,
    );
    return () => window.clearInterval(timer.current);
  }, [playing]);
  return (
    <div className="audio-player" aria-label={label}>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActive("before")}
          className={cx(
            "focus-ring rounded-full px-4 py-2 text-xs font-semibold tracking-[.08em]",
            active === "before"
              ? "bg-white/10 text-white"
              : "text-white/35 hover:text-white",
          )}
        >
          BEFORE
        </button>
        <button
          type="button"
          onClick={() => setActive("after")}
          className={cx(
            "focus-ring rounded-full px-4 py-2 text-xs font-semibold tracking-[.08em]",
            active === "after"
              ? "bg-green text-black"
              : "text-white/35 hover:text-white",
          )}
        >
          AFTER
        </button>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className="relative grid place-items-center">
          {playing && (
            <motion.span
              aria-hidden="true"
              className="absolute h-[52px] w-[52px] rounded-full border border-dashed border-green/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          )}
          <IconButton
            label={playing ? "Pause audio" : "Play audio"}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </IconButton>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-4 text-xs">
            <span>
              {active === "before" ? "Unprocessed · demo" : "Mastered · demo"}
            </span>
            <span className="text-white/35">
              {progress
                ? `0:${String(Math.floor(progress * 1.8) % 60).padStart(2, "0")}`
                : "Audio unavailable"}
            </span>
          </div>
          <div
            className="wave mt-3"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                style={{ height: `${8 + (i % 7) * 3}px` }}
                className={
                  i < progress * 0.48
                    ? active === "after"
                      ? "wave-active"
                      : "wave-active-muted"
                    : ""
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 text-[11px] text-white/30">
        Demo comparison · no processed claim is asserted without approved audio.
      </div>
    </div>
  );
}
export function AudioPlayer({ label = "Audio preview" }: { label?: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const timer = useRef<number>();
  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(
      () => setProgress((p) => (p >= 100 ? 0 : p + 1)),
      500,
    );
    return () => window.clearInterval(timer.current);
  }, [playing]);
  return (
    <div className="audio-player" aria-label={label}>
      <div className="flex items-center gap-4">
        <span className="relative grid place-items-center">
          {playing && (
            <motion.span
              aria-hidden="true"
              className="absolute h-[52px] w-[52px] rounded-full border border-dashed border-green/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          )}
          <IconButton
            label={playing ? "Pause audio" : "Play audio"}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </IconButton>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-4 text-xs">
            <span>{label}</span>
            <span className="text-white/35">
              {progress
                ? `${Math.floor((progress * 1.8) / 60)}:${String(Math.floor(progress * 1.8) % 60).padStart(2, "0")}`
                : "Audio unavailable"}
            </span>
          </div>
          <div
            className="wave mt-3"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                style={{ height: `${8 + (i % 7) * 3}px` }}
                className={i < progress * 0.48 ? "wave-active" : ""}
              />
            ))}
          </div>
        </div>
        <IconButton
          label={muted ? "Unmute audio" : "Mute audio"}
          onClick={() => setMuted(!muted)}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </IconButton>
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px] text-white/30">
        <span>Demo player</span>
        <span>Audio preview will be added here.</span>
      </div>
    </div>
  );
}
