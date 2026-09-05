import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  MessageSquare,
  Settings,
  Building2,
  Image as ImageIcon,
  SlidersHorizontal,
  Music2,
  Search,
  ChevronRight,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";
import {
  Button,
  Input,
  Textarea,
  Select,
  Status,
  EmptyState,
  Toast,
  cx,
  Modal,
  Logo,
} from "../components/UI";
import { demoBookings } from "../config/brand";
import {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  type Room,
  getPortfolio,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  type PortfolioItem,
  getServices,
  addService,
  updateService,
  deleteService,
  type ServiceItem,
  getContact,
  saveContact,
  type ContactInfo,
} from "../lib/content";
import { setDemoAuthed, clearDemoAuthed } from "../lib/auth";

const adminNav = [
  ["Overview", LayoutDashboard, "/admin"],
  ["Rooms", Building2, "/admin/rooms"],
  ["Portfolio", ImageIcon, "/admin/portfolio"],
  ["Services", SlidersHorizontal, "/admin/services"],
  ["Bookings", CalendarDays, "/admin/bookings"],
  ["Clients", Users, "/admin/clients"],
  ["Projects", Music2, "/admin/projects"],
  ["Messages", MessageSquare, "/admin/messages"],
  ["Site settings", Settings, "/admin/settings"],
] as const;

export function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter your owner email and password.");
      return;
    }
    setDemoAuthed();
    nav("/admin");
  };
  return (
    <div className="min-h-screen grid place-items-center bg-ink p-5">
      <div className="w-full max-w-md">
        <Link to="/">
          <Logo />
        </Link>
        <div className="mt-10 border border-white/10 bg-white/[.025] p-7 sm:p-9">
          <div className="eyebrow">Studio owner access · Demo environment</div>
          <h1 className="display mt-4 text-4xl">Welcome back.</h1>
          <p className="mt-3 text-sm leading-6 text-white/40">
            This is the owner's admin console for audio arts — manage rooms,
            portfolio, services and contact details from here. It is not
            production authentication.
          </p>
          <form onSubmit={login} className="mt-8 space-y-5">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-xs text-red-300">{error}</p>}
            <Button className="w-full" type="submit">
              SIGN IN
            </Button>
          </form>
          <button
            type="button"
            className="mt-5 w-full text-xs text-white/40 hover:text-green"
            onClick={() => {
              setEmail("owner@audioarts.example");
              setPassword("demo-only");
            }}
          >
            Use demo owner account
          </button>
          <div className="mt-6 border-t border-white/10 pt-5 text-xs text-white/25">
            No real credentials are stored or transmitted.
          </div>
        </div>
        <Link to="/" className="mt-6 block text-center text-xs text-white/35">
          ← Return to website
        </Link>
      </div>
    </div>
  );
}

export function AdminHome() {
  const [rooms] = useState(getRooms);
  const [portfolio] = useState(getPortfolio);
  const [services] = useState(getServices);
  return (
    <AdminPage title="Overview">
      <DemoBanner />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Today's bookings", String(demoBookings.length)],
          ["Rooms published", String(rooms.length)],
          ["Portfolio items", String(portfolio.length)],
          ["Services listed", String(services.length)],
        ].map(([a, b]) => (
          <Metric key={a} label={a} value={b} />
        ))}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <AdminBookingPanel />
        <AdminProjectPanel />
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <QuickLink
          to="/admin/rooms"
          title="Manage rooms"
          copy="Add, edit or remove studio spaces shown on the public site."
        />
        <QuickLink
          to="/admin/portfolio"
          title="Manage portfolio"
          copy="Publish or take down selected work shown to visitors."
        />
        <QuickLink
          to="/admin/settings"
          title="Site & contact details"
          copy="Keep phone, email, address and hours up to date."
        />
      </div>
    </AdminPage>
  );
}

function QuickLink({
  to,
  title,
  copy,
}: {
  to: string;
  title: string;
  copy: string;
}) {
  return (
    <Link
      to={to}
      className="group border border-white/10 bg-white/[.025] p-5 transition hover:border-green/30"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="display text-lg">{title}</h3>
        <ChevronRight
          size={16}
          className="text-white/25 transition group-hover:translate-x-1 group-hover:text-green"
        />
      </div>
      <p className="mt-2 text-sm leading-6 text-white/40">{copy}</p>
    </Link>
  );
}

export function AdminBookings() {
  const [bookings, setBookings] = useState(demoBookings.map((b) => ({ ...b })));
  const [selected, setSelected] = useState<null | (typeof demoBookings)[number]>(
    null,
  );
  const update = (id: string, status: string) =>
    setBookings((rows) =>
      rows.map((r) => (r.id === id ? { ...r, status: status as any } : r)),
    );
  return (
    <AdminPage title="Bookings">
      <DemoBanner />
      <Panel title="Booking register">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="field flex items-center gap-2">
            <Search size={15} />
            <input
              aria-label="Search bookings"
              placeholder="Search client or booking ID"
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
          </div>
          <Select label="Filter">
            <option>All statuses</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="text-xs text-white/25">
              <tr>
                {[
                  "Booking ID",
                  "Client",
                  "Service",
                  "Studio",
                  "Date",
                  "Time",
                  "Status",
                ].map((x) => (
                  <th key={x} className="border-b border-white/10 pb-3">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="py-4">{b.id}</td>
                  <td>{b.client}</td>
                  <td className="text-white/45">{b.service}</td>
                  <td className="text-white/45">{b.studio}</td>
                  <td className="text-white/45">{b.date}</td>
                  <td className="text-white/45">{b.time}</td>
                  <td>
                    <select
                      aria-label={`Status for ${b.id}`}
                      value={b.status}
                      onChange={(e) => {
                        update(b.id, e.target.value);
                        setSelected(b);
                      }}
                      className="focus-ring rounded-lg border border-white/10 bg-charcoal px-2 py-2 text-xs"
                    >
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      {selected && (
        <Toast
          message={`${selected.id} status updated locally.`}
          onClose={() => setSelected(null)}
        />
      )}
    </AdminPage>
  );
}

export function AdminClients() {
  return (
    <AdminPage title="Clients">
      <DemoBanner />
      <Panel title="Client directory">
        <div className="mb-5 flex items-center gap-2 field">
          <Search size={15} />
          <input
            aria-label="Search clients"
            placeholder="Search clients"
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        {["Aarav Mehta", "Riya Sharma"].map((n, i) => (
          <div
            key={n}
            className="grid gap-3 border-b border-white/10 py-5 sm:grid-cols-[1fr_1fr_100px]"
          >
            <div>
              {n}
              <div className="text-xs text-white/30">[EMAIL ADDRESS]</div>
            </div>
            <div className="text-sm text-white/45">
              {i ? "1" : "1"} project · {i ? "1" : "1"} booking
            </div>
            <Status>Active · Demo</Status>
          </div>
        ))}
      </Panel>
    </AdminPage>
  );
}

export function AdminProjects() {
  const [status, setStatus] = useState("Mixing");
  return (
    <AdminPage title="Projects">
      <DemoBanner />
      <Panel title="Project register">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="text-xs text-white/25">
              <tr>
                {["Project", "Client", "Engineer", "Status", "Deadline"].map(
                  (x) => (
                    <th key={x} className="border-b border-white/10 pb-3">
                      {x}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-5">MIDNIGHT</td>
                <td>Aarav Mehta</td>
                <td>[ENGINEER]</td>
                <td>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="focus-ring rounded-lg border border-white/10 bg-charcoal px-2 py-2 text-xs"
                  >
                    <option>Recording</option>
                    <option>Editing</option>
                    <option>Mixing</option>
                    <option>Mastering</option>
                    <option>Completed</option>
                  </select>
                </td>
                <td>26 Sep 2026</td>
              </tr>
              <tr>
                <td className="py-5">Echoes</td>
                <td>Riya Sharma</td>
                <td>[ENGINEER]</td>
                <td>
                  <Status tone="muted">Editing</Status>
                </td>
                <td>30 Sep 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-white/25">
          MIDNIGHT status: {status} · demo-local.
        </p>
      </Panel>
    </AdminPage>
  );
}

// ---------------- Rooms (owner-managed) ----------------
export function AdminRooms() {
  const [rooms, setRooms] = useState(getRooms);
  const [editing, setEditing] = useState<Room | "new" | null>(null);
  const [toast, setToast] = useState("");

  const save = (room: Omit<Room, "id"> & { id?: string }) => {
    if (room.id) {
      setRooms(updateRoom(room.id, room));
      setToast("Room updated.");
    } else {
      setRooms(addRoom(room));
      setToast("Room added.");
    }
    setEditing(null);
  };
  const remove = (id: string, name: string) => {
    if (!window.confirm(`Remove "${name}" from the public site?`)) return;
    setRooms(deleteRoom(id));
    setToast("Room removed.");
  };

  return (
    <AdminPage title="Rooms">
      <DemoBanner />
      <Panel
        title="Studio rooms"
        action={
          <Button onClick={() => setEditing("new")}>
            <Plus size={14} /> ADD ROOM
          </Button>
        }
      >
        {rooms.length ? (
          <div className="grid gap-3">
            {rooms.map((r) => (
              <div
                key={r.id}
                className="grid gap-3 border-b border-white/10 py-5 sm:grid-cols-[1.2fr_1fr_auto] sm:items-center"
              >
                <div>
                  <div className="font-medium">{r.name}</div>
                  <p className="mt-1 max-w-md text-xs text-white/40">
                    {r.description}
                  </p>
                </div>
                <div className="text-sm text-green">{r.capability}</div>
                <div className="flex gap-2 sm:justify-end">
                  <IconTextButton
                    label="Edit"
                    icon={<Pencil size={13} />}
                    onClick={() => setEditing(r)}
                  />
                  <IconTextButton
                    label="Delete"
                    icon={<Trash2 size={13} />}
                    onClick={() => remove(r.id, r.name)}
                    danger
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No rooms published."
            copy="Add a room so it appears on the public Studio page and in the booking flow."
            action={
              <Button onClick={() => setEditing("new")}>
                <Plus size={14} /> ADD ROOM
              </Button>
            }
          />
        )}
      </Panel>
      <RoomModal
        room={editing === "new" ? null : editing}
        open={editing !== null}
        onClose={() => setEditing(null)}
        onSave={save}
      />
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AdminPage>
  );
}

function RoomModal({
  room,
  open,
  onClose,
  onSave,
}: {
  room: Room | null;
  open: boolean;
  onClose: () => void;
  onSave: (room: Omit<Room, "id"> & { id?: string }) => void;
}) {
  const [name, setName] = useState(room?.name ?? "");
  const [capability, setCapability] = useState(room?.capability ?? "");
  const [description, setDescription] = useState(room?.description ?? "");
  const [image, setImage] = useState(room?.image ?? "");
  useEffect(() => {
    setName(room?.name ?? "");
    setCapability(room?.capability ?? "");
    setDescription(room?.description ?? "");
    setImage(room?.image ?? "");
  }, [room, open]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={room ? "Edit room" : "Add a room"}
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !description.trim() || !capability.trim())
            return;
          onSave({
            id: room?.id,
            name: name.trim(),
            capability: capability.trim(),
            description: description.trim(),
            image: image.trim() || undefined,
          });
        }}
      >
        <Input
          label="Room name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Capability tags (e.g. Vocals · Instruments · Voice)"
          value={capability}
          onChange={(e) => setCapability(e.target.value)}
          required
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
        <Input
          label="Image path (optional, e.g. /images/rooms/control-room.jpg)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            CANCEL
          </Button>
          <Button type="submit">
            <Save size={14} /> SAVE ROOM
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// ---------------- Portfolio (owner-managed) ----------------
export function AdminPortfolio() {
  const [items, setItems] = useState(getPortfolio);
  const [editing, setEditing] = useState<PortfolioItem | "new" | null>(null);
  const [toast, setToast] = useState("");

  const save = (item: Omit<PortfolioItem, "id"> & { id?: string }) => {
    if (item.id) {
      setItems(updatePortfolioItem(item.id, item));
      setToast("Portfolio item updated.");
    } else {
      setItems(addPortfolioItem(item));
      setToast("Portfolio item published.");
    }
    setEditing(null);
  };
  const remove = (id: string, title: string) => {
    if (!window.confirm(`Remove "${title}" from the portfolio?`)) return;
    setItems(deletePortfolioItem(id));
    setToast("Portfolio item removed.");
  };

  return (
    <AdminPage title="Portfolio">
      <DemoBanner />
      <Panel
        title="Portfolio items"
        action={
          <Button onClick={() => setEditing("new")}>
            <Plus size={14} /> ADD ITEM
          </Button>
        }
      >
        {items.length ? (
          <div className="grid gap-3">
            {items.map((p) => (
              <div
                key={p.id}
                className="grid gap-3 border-b border-white/10 py-5 sm:grid-cols-[1.2fr_1fr_auto] sm:items-center"
              >
                <div>
                  <div className="font-medium">{p.title}</div>
                  <p className="mt-1 max-w-md text-xs text-white/40">
                    {p.description}
                  </p>
                </div>
                <div className="text-sm text-green">{p.category}</div>
                <div className="flex gap-2 sm:justify-end">
                  <IconTextButton
                    label="Edit"
                    icon={<Pencil size={13} />}
                    onClick={() => setEditing(p)}
                  />
                  <IconTextButton
                    label="Delete"
                    icon={<Trash2 size={13} />}
                    onClick={() => remove(p.id, p.title)}
                    danger
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No portfolio items published."
            copy="Add a project so it appears on the public Portfolio page."
            action={
              <Button onClick={() => setEditing("new")}>
                <Plus size={14} /> ADD ITEM
              </Button>
            }
          />
        )}
      </Panel>
      <PortfolioModal
        item={editing === "new" ? null : editing}
        open={editing !== null}
        onClose={() => setEditing(null)}
        onSave={save}
      />
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AdminPage>
  );
}

const portfolioCategories = [
  "Music",
  "Dubbing",
  "Film",
  "Advertisement",
  "Voice",
];

function PortfolioModal({
  item,
  open,
  onClose,
  onSave,
}: {
  item: PortfolioItem | null;
  open: boolean;
  onClose: () => void;
  onSave: (item: Omit<PortfolioItem, "id"> & { id?: string }) => void;
}) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? "Music");
  const [description, setDescription] = useState(item?.description ?? "");
  useEffect(() => {
    setTitle(item?.title ?? "");
    setCategory(item?.category ?? "Music");
    setDescription(item?.description ?? "");
  }, [item, open]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={item ? "Edit portfolio item" : "Add a portfolio item"}
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() || !description.trim()) return;
          onSave({
            id: item?.id,
            title: title.trim(),
            category,
            description: description.trim(),
          });
        }}
      >
        <Input
          label="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {portfolioCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            CANCEL
          </Button>
          <Button type="submit">
            <Save size={14} /> SAVE ITEM
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// ---------------- Services (owner-managed) ----------------
export function AdminServices() {
  const [services, setServices] = useState(getServices);
  const [editing, setEditing] = useState<ServiceItem | "new" | null>(null);
  const [toast, setToast] = useState("");

  const save = (data: { slug?: string; name: string; description: string }) => {
    if (data.slug) {
      setServices(updateService(data.slug, data));
      setToast("Service updated.");
    } else {
      setServices(addService(data));
      setToast("Service added.");
    }
    setEditing(null);
  };
  const remove = (slug: string, name: string) => {
    if (!window.confirm(`Remove "${name}" from the services list?`)) return;
    setServices(deleteService(slug));
    setToast("Service removed.");
  };

  return (
    <AdminPage title="Services">
      <DemoBanner />
      <Panel
        title="Service catalogue"
        action={
          <Button onClick={() => setEditing("new")}>
            <Plus size={14} /> ADD SERVICE
          </Button>
        }
      >
        <div className="grid gap-3">
          {services.map((s) => (
            <div
              key={s.slug}
              className="grid gap-3 border-b border-white/10 py-4 sm:grid-cols-[1.3fr_auto] sm:items-center"
            >
              <div>
                <div>{s.name}</div>
                <p className="mt-1 max-w-md text-xs text-white/35">
                  {s.description}
                </p>
              </div>
              <div className="flex gap-2 sm:justify-end">
                <IconTextButton
                  label="Edit"
                  icon={<Pencil size={13} />}
                  onClick={() => setEditing(s)}
                />
                <IconTextButton
                  label="Delete"
                  icon={<Trash2 size={13} />}
                  onClick={() => remove(s.slug, s.name)}
                  danger
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <ServiceModal
        service={editing === "new" ? null : editing}
        open={editing !== null}
        onClose={() => setEditing(null)}
        onSave={save}
      />
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </AdminPage>
  );
}

function ServiceModal({
  service,
  open,
  onClose,
  onSave,
}: {
  service: ServiceItem | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: { slug?: string; name: string; description: string }) => void;
}) {
  const [name, setName] = useState(service?.name ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  useEffect(() => {
    setName(service?.name ?? "");
    setDescription(service?.description ?? "");
  }, [service, open]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={service ? "Edit service" : "Add a service"}
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !description.trim()) return;
          onSave({
            slug: service?.slug,
            name: name.trim(),
            description: description.trim(),
          });
        }}
      >
        <Input
          label="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          label="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
        {!service && (
          <p className="text-xs text-white/30">
            Use cases and deliverables can be refined later — a new service
            starts with placeholder scope text on its detail page.
          </p>
        )}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            CANCEL
          </Button>
          <Button type="submit">
            <Save size={14} /> SAVE SERVICE
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function AdminMessages() {
  return (
    <AdminPage title="Messages">
      <DemoBanner />
      <Panel title="Client conversations">
        <div className="grid gap-3">
          {["Aarav Mehta", "Riya Sharma"].map((n) => (
            <Link
              key={n}
              to="/admin/messages"
              className="flex items-center justify-between border-b border-white/10 py-5"
            >
              <div>
                <div>{n}</div>
                <div className="mt-1 text-xs text-white/30">
                  Last message · demo data
                </div>
              </div>
              <ChevronRight size={16} />
            </Link>
          ))}
        </div>
      </Panel>
    </AdminPage>
  );
}

// ---------------- Site / contact settings (owner-managed) ----------------
export function AdminSettings() {
  const [contact, setContact] = useState<ContactInfo>(getContact);
  const [toast, setToast] = useState(false);
  const field = (k: keyof ContactInfo) => ({
    value: contact[k],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setContact((c) => ({ ...c, [k]: e.target.value })),
  });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveContact(contact);
    setToast(true);
  };
  return (
    <AdminPage title="Site settings">
      <DemoBanner />
      <Panel title="Studio & contact details">
        <p className="text-sm leading-6 text-white/45">
          These details power the Contact page and site footer. Update them
          here as the owner — changes are saved to this browser immediately.
        </p>
        <form
          onSubmit={submit}
          className="mt-6 grid gap-5 sm:grid-cols-2"
        >
          <Input label="Studio name" {...field("name")} />
          <Input label="Phone" {...field("phone")} />
          <Input label="Email" type="email" {...field("email")} />
          <Input label="WhatsApp" {...field("whatsapp")} />
          <Input label="Instagram" {...field("instagram")} />
          <Input label="Business hours" {...field("businessHours")} />
          <Textarea
            label="Studio address"
            className="sm:col-span-2"
            rows={3}
            {...field("address")}
          />
          <div className="sm:col-span-2">
            <Button type="submit">
              <Save size={14} /> SAVE SITE DETAILS
            </Button>
          </div>
        </form>
      </Panel>
      {toast && (
        <Toast
          message="Site details updated."
          onClose={() => setToast(false)}
        />
      )}
    </AdminPage>
  );
}

function AdminBookingPanel() {
  return (
    <Panel title="Today's bookings">
      <div className="space-y-3">
        {demoBookings.map((b) => (
          <div
            key={b.id}
            className="flex justify-between gap-5 border-b border-white/10 py-4"
          >
            <div>
              <div>{b.client}</div>
              <div className="text-xs text-white/30">
                {b.time} · {b.service}
              </div>
            </div>
            <Status>{b.status}</Status>
          </div>
        ))}
      </div>
    </Panel>
  );
}
function AdminProjectPanel() {
  return (
    <Panel title="Projects">
      <div className="space-y-4">
        <Detail a="MIDNIGHT" b="Aarav Mehta · Mixing · 26 Sep 2026" />
        <Detail a="Echoes" b="Riya Sharma · Editing · 30 Sep 2026" />
      </div>
    </Panel>
  );
}
function DemoBanner() {
  return (
    <div className="mb-6 border border-green/15 bg-green/[.03] px-4 py-3 text-xs leading-5 text-white/40">
      OWNER DEMO MODE · Content changes (rooms, portfolio, services, contact
      details) are saved to this browser and reflected on the live site.
      Operational data (bookings, clients) stays local to this demo.
    </div>
  );
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[.025] p-5">
      <div className="eyebrow">{label}</div>
      <div className="display mt-3 text-3xl">{value}</div>
    </div>
  );
}
function Detail({ a, b }: { a: string; b: string }) {
  return (
    <div className="border-b border-white/10 pb-4 last:border-0">
      <div className="text-xs text-white/30">{a}</div>
      <div className="mt-1 text-sm">{b}</div>
    </div>
  );
}
function IconTextButton({
  label,
  icon,
  onClick,
  danger,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "focus-ring inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs",
        danger
          ? "border-red-400/20 text-red-300/80 hover:border-red-400/50 hover:text-red-300"
          : "border-white/10 text-white/55 hover:border-green/40 hover:text-green",
      )}
    >
      {icon} {label}
    </button>
  );
}
function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border border-white/10 bg-white/[.025] p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="display text-2xl">{title}</h2>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
function AdminPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <PortalShell title={title} nav={adminNav}>
      {children}
    </PortalShell>
  );
}
function PortalShell({
  title,
  children,
  nav,
}: {
  title: string;
  children: ReactNode;
  nav: readonly (readonly [string, any, string])[];
}) {
  useEffect(() => {
    let m = document.querySelector('meta[name="robots"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "robots");
      document.head.appendChild(m);
    }
    m.setAttribute("content", "noindex, nofollow");
  }, []);
  return (
    <div className="min-h-screen bg-ink">
      <aside className="portal-sidebar">
        <div className="portal-sidebar-head">
          <Link to="/">
            <Logo />
          </Link>
          <div className="eyebrow mt-3">Studio owner · Admin</div>
        </div>
        <nav className="portal-sidebar-nav mt-8 space-y-1">
          {nav.map(([n, I, p]) => (
            <Link key={p} to={p} className="portal-link">
              <I size={16} />
              {n}
            </Link>
          ))}
        </nav>
        <div className="portal-sidebar-foot">
          <Link
            to="/"
            onClick={clearDemoAuthed}
            className="flex items-center gap-2 text-xs text-white/35 transition hover:text-white"
          >
            <LogOut size={14} /> Exit admin
          </Link>
        </div>
      </aside>
      <main className="portal-main studio-glow">
        <div className="portal-topbar">
          <Link to="/" className="lg:hidden">
            <Logo size="text-lg" />
          </Link>
          <span className="text-xs text-white/30">
            Studio owner · Admin · Demo environment
          </span>
        </div>
        <nav className="portal-mobile-nav lg:hidden" aria-label="Admin navigation">
          {nav.map(([n, I, p]) => (
            <Link key={p} to={p} className="portal-mobile-link">
              <I size={14} />
              <span>{n}</span>
            </Link>
          ))}
        </nav>
        <div className="container-x max-w-none py-10 lg:px-10">
          <h1 className="display text-4xl tracking-[-.04em] sm:text-5xl">
            {title}
          </h1>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
