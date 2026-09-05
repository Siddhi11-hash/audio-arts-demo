// Owner-editable site content.
// Everything the Studio Admin can add/edit/delete (rooms, portfolio items,
// services, contact details) lives here. It reads defaults from
// src/config/brand.ts and persists owner changes to localStorage, so the
// public site always reflects what the studio owner has configured.
// This is a demo-grade content layer (see README "Security limitations") —
// there is no server, so "publishing" means "saved in this browser".

import { readStorage, writeStorage } from "./storage";
import {
  brand,
  studios,
  portfolio,
  services as serviceDefaults,
} from "../config/brand";

export type Room = {
  id: string;
  name: string;
  description: string;
  capability: string;
  image?: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
};

export type ServiceItem = {
  slug: string;
  name: string;
  description: string;
  detail: string;
  uses: string[];
  deliverables: string[];
};

export type ContactInfo = {
  name: string;
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  whatsapp: string;
  instagram: string;
};

const KEYS = {
  rooms: "audioArtsRooms",
  portfolio: "audioArtsPortfolio",
  services: "audioArtsServices",
  contact: "audioArtsContact",
} as const;

const uid = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`;

const slugify = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || uid("item");

// ---------- defaults, seeded from brand.ts ----------
const defaultRooms: Room[] = studios.map((s, i) => ({
  id: `room-${i}`,
  name: s.name,
  description: s.description,
  capability: s.capability,
  image: (s as any).image,
}));

const defaultPortfolio: PortfolioItem[] = portfolio.map((p, i) => ({
  id: `portfolio-${i}`,
  title: p[0],
  category: p[1],
  description: p[2],
}));

const defaultServices: ServiceItem[] = serviceDefaults.map((s) => ({
  slug: s.slug,
  name: s.name,
  description: s.description,
  detail: s.detail,
  uses: [...s.uses],
  deliverables: [...s.deliverables],
}));

const defaultContact: ContactInfo = {
  name: brand.name,
  phone: brand.phone,
  email: brand.email,
  address: brand.address,
  businessHours: brand.businessHours,
  whatsapp: brand.whatsapp,
  instagram: brand.instagram,
};

// ---------- Rooms ----------
export function getRooms(): Room[] {
  return readStorage(KEYS.rooms, defaultRooms);
}
export function addRoom(room: Omit<Room, "id">): Room[] {
  const rooms = [...getRooms(), { ...room, id: uid("room") }];
  writeStorage(KEYS.rooms, rooms);
  return rooms;
}
export function updateRoom(id: string, patch: Partial<Room>): Room[] {
  const rooms = getRooms().map((r) => (r.id === id ? { ...r, ...patch } : r));
  writeStorage(KEYS.rooms, rooms);
  return rooms;
}
export function deleteRoom(id: string): Room[] {
  const rooms = getRooms().filter((r) => r.id !== id);
  writeStorage(KEYS.rooms, rooms);
  return rooms;
}
export function resetRooms(): Room[] {
  writeStorage(KEYS.rooms, defaultRooms);
  return defaultRooms;
}

// ---------- Portfolio ----------
export function getPortfolio(): PortfolioItem[] {
  return readStorage(KEYS.portfolio, defaultPortfolio);
}
export function addPortfolioItem(
  item: Omit<PortfolioItem, "id">,
): PortfolioItem[] {
  const items = [...getPortfolio(), { ...item, id: uid("portfolio") }];
  writeStorage(KEYS.portfolio, items);
  return items;
}
export function updatePortfolioItem(
  id: string,
  patch: Partial<PortfolioItem>,
): PortfolioItem[] {
  const items = getPortfolio().map((p) =>
    p.id === id ? { ...p, ...patch } : p,
  );
  writeStorage(KEYS.portfolio, items);
  return items;
}
export function deletePortfolioItem(id: string): PortfolioItem[] {
  const items = getPortfolio().filter((p) => p.id !== id);
  writeStorage(KEYS.portfolio, items);
  return items;
}
export function resetPortfolio(): PortfolioItem[] {
  writeStorage(KEYS.portfolio, defaultPortfolio);
  return defaultPortfolio;
}

// ---------- Services ----------
export function getServices(): ServiceItem[] {
  return readStorage(KEYS.services, defaultServices);
}
function uniqueSlug(name: string) {
  const base = slugify(name);
  const existing = new Set(getServices().map((s) => s.slug));
  let slug = base;
  let n = 2;
  while (existing.has(slug)) slug = `${base}-${n++}`;
  return slug;
}
export function addService(item: {
  name: string;
  description: string;
}): ServiceItem[] {
  const items = [
    ...getServices(),
    {
      slug: uniqueSlug(item.name),
      name: item.name,
      description: item.description,
      detail: item.description,
      uses: ["Scope to be confirmed with the studio"],
      deliverables: ["Deliverables to be confirmed with the studio"],
    },
  ];
  writeStorage(KEYS.services, items);
  return items;
}
export function updateService(
  slug: string,
  patch: Partial<Omit<ServiceItem, "slug">>,
): ServiceItem[] {
  const items = getServices().map((s) =>
    s.slug === slug ? { ...s, ...patch } : s,
  );
  writeStorage(KEYS.services, items);
  return items;
}
export function deleteService(slug: string): ServiceItem[] {
  const items = getServices().filter((s) => s.slug !== slug);
  writeStorage(KEYS.services, items);
  return items;
}
export function resetServices(): ServiceItem[] {
  writeStorage(KEYS.services, defaultServices);
  return defaultServices;
}

// ---------- Contact / site details ----------
export function getContact(): ContactInfo {
  return readStorage(KEYS.contact, defaultContact);
}
export function saveContact(info: ContactInfo): ContactInfo {
  writeStorage(KEYS.contact, info);
  return info;
}
export function resetContact(): ContactInfo {
  writeStorage(KEYS.contact, defaultContact);
  return defaultContact;
}
