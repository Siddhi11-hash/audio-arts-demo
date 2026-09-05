import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Input, Select, Textarea, cx, Toast } from "../components/UI";
import { getRooms, getServices } from "../lib/content";
import { writeStorage } from "../lib/storage";
const steps = ["Service", "Studio", "Date & time", "Details", "Review"];
const slots = [
  "18 Sep · 18:00",
  "19 Sep · 11:00",
  "21 Sep · 15:00",
  "22 Sep · 17:30",
  "24 Sep · 12:00",
  "25 Sep · 19:00",
];
export function Booking() {
  const [services] = useState(getServices);
  const [studios] = useState(getRooms);
  const [step, setStep] = useState(0),
    [done, setDone] = useState(false),
    [service, setService] = useState<string>(services[0].name),
    [studio, setStudio] = useState<string>(studios[0].name),
    [slot, setSlot] = useState(slots[0]),
    [duration, setDuration] = useState("2 hours"),
    [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
      description: "",
    }),
    [toast, setToast] = useState(false);
  const selectedService = useMemo(
    () => services.find((s) => s.name === service)!,
    [service],
  );
  const id = useMemo(
    () => `AA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    [done],
  );
  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));
  const confirm = (e: FormEvent) => {
    e.preventDefault();
    writeStorage("audioArtsBooking", {
      id,
      service,
      studio,
      slot,
      duration,
      client: form,
      createdAt: new Date().toISOString(),
      demo: true,
    });
    setDone(true);
    setToast(true);
  };
  if (done)
    return (
      <div className="section container-x min-h-[75vh] grid place-items-center">
        <div className="max-w-2xl text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green text-black">
            <Check />
          </div>
          <div className="eyebrow mt-7">Booking confirmed · demo</div>
          <h1 className="display mt-3 text-6xl tracking-[-.05em]">{id}</h1>
          <div className="mt-8 grid gap-0 border-y border-white/10 text-left sm:grid-cols-2">
            {[
              ["Service", service],
              ["Studio", studio],
              ["Date", slot.split(" · ")[0]],
              ["Time", slot.split(" · ")[1]],
              ["Duration", duration],
            ].map(([a, b]) => (
              <div
                key={a}
                className="border-b border-white/10 p-4 last:border-b-0"
              >
                <div className="eyebrow">{a}</div>
                <div className="mt-2 text-sm">{b}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-white/40">
            No payment, live calendar or production booking was connected. This
            confirmation is stored locally in this browser.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <Link to="/">
              <Button variant="outline">HOME</Button>
            </Link>
            <Link to="/admin/bookings">
              <Button>VIEW IN ADMIN</Button>
            </Link>
          </div>
        </div>
        {toast && (
          <Toast
            message="Demo booking saved locally."
            onClose={() => setToast(false)}
          />
        )}
      </div>
    );
  return (
    <div className="section container-x">
      <div className="grid gap-12 lg:grid-cols-[1fr_330px]">
        <div>
          <div className="eyebrow">Demo availability</div>
          <h1 className="display mt-4 text-5xl sm:text-6xl">Book a session.</h1>
          <div className="mt-10 grid grid-cols-5 border-y border-white/10">
            {steps.map((x, i) => (
              <div
                key={x}
                className={cx(
                  "py-4 text-center text-[9px] uppercase tracking-[.12em]",
                  i === step ? "text-green" : "text-white/25",
                )}
              >
                {i + 1}. <span className="hidden sm:inline">{x}</span>
              </div>
            ))}
          </div>
          <div className="mt-12">
            {step === 0 && (
              <Choice
                title="Choose a service"
                items={services.map((s) => s.name)}
                value={service}
                setValue={setService}
                onContinue={() => setStep(1)}
              />
            )}{" "}
            {step === 1 && (
              <Choice
                title="Choose a studio"
                items={studios.map((s) => s.name)}
                value={studio}
                setValue={setStudio}
                onContinue={() => setStep(2)}
              />
            )}{" "}
            {step === 2 && (
              <div>
                <h2 className="display text-3xl">Choose a date and time.</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {slots.map((x) => (
                    <button
                      type="button"
                      key={x}
                      onClick={() => {
                        setSlot(x);
                        setStep(3);
                      }}
                      className={cx(
                        "focus-ring rounded-xl border p-5 text-left transition",
                        slot === x
                          ? "border-green/50 bg-green/[.04]"
                          : "border-white/10 bg-white/[.025] hover:border-white/20",
                      )}
                    >
                      <div className="text-sm">{x}</div>
                      <div className="mt-2 text-[10px] uppercase tracking-[.15em] text-green">
                        Available · demo
                      </div>
                    </button>
                  ))}
                </div>
                <Back onClick={() => setStep(1)} />
              </div>
            )}
            {step === 3 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(4);
                }}
              >
                <h2 className="display text-3xl">Your details.</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Name"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                  <Input
                    label="Email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                  <Input
                    label="Phone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                  <Select
                    label="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>3 hours</option>
                    <option>Half day</option>
                  </Select>
                  <Textarea
                    label="Project description"
                    required
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    rows={6}
                    className="sm:col-span-2"
                  />
                  <Button type="submit">
                    CONTINUE <ChevronRight size={15} />
                  </Button>
                </div>
              </form>
            )}
            {step === 4 && (
              <form onSubmit={confirm}>
                <h2 className="display text-3xl">Review your session.</h2>
                <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {[
                    ["Service", service],
                    ["Studio", studio],
                    ["Date", slot.split(" · ")[0]],
                    ["Time", slot.split(" · ")[1]],
                    ["Duration", duration],
                  ].map(([a, b]) => (
                    <div
                      key={a}
                      className="flex justify-between gap-6 py-4 text-sm"
                    >
                      <span className="text-white/35">{a}</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border border-green/15 bg-green/[.03] p-4 text-xs leading-5 text-white/45">
                  Demo availability only. Confirming does not reserve a real
                  studio slot.
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setStep(3)}
                  >
                    <ChevronLeft size={15} /> BACK
                  </Button>
                  <Button type="submit">
                    CONFIRM BOOKING <Check size={15} />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="border border-white/10 bg-white/[.025] p-5">
            <div className="eyebrow">Booking summary</div>
            <h2 className="display mt-4 text-2xl">{selectedService.name}</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/35">Studio</span>
                <span>{studio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/35">Session</span>
                <span>{slot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/35">Duration</span>
                <span>{duration}</span>
              </div>
            </div>
            <div className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-white/35">
              All availability shown here is demo data.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
function Choice({
  title,
  items,
  value,
  setValue,
  onContinue,
}: {
  title: string;
  items: string[];
  value: string;
  setValue: (x: string) => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <h2 className="display text-3xl">{title}</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((x) => (
          <button
            type="button"
            key={x}
            onClick={() => setValue(x)}
            className={cx(
              "focus-ring rounded-xl border p-5 text-left",
              value === x
                ? "border-green/60 bg-green/[.05]"
                : "border-white/10 bg-white/[.025] hover:border-white/20",
            )}
          >
            <span className="font-medium">{x}</span>
            <span className="mt-2 block text-xs text-white/35">
              Available · demo data
            </span>
          </button>
        ))}
      </div>
      <Button onClick={onContinue} className="mt-7">
        CONTINUE <ChevronRight size={15} />
      </Button>
    </div>
  );
}
function Back({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" onClick={onClick} className="mt-8">
      <ChevronLeft size={15} /> BACK
    </Button>
  );
}
