import { fx } from "./fxAssets";
import "./fx.css";
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type Tab = "home" | "discover" | "competitions" | "wallet" | "profile";
type Screen = Tab | "competition" | "register" | "registered" | "challenge" | "submit" | "arena" | "creator" | "leaderboard" | "results" | "notifications" | "earnings" | "judgeInvite" | "judgeAccepted" | "judgeEntry" | "judgeAwarded" | "judgeThanks" | "fans";
type CompId = "bdm" | "dance" | "food" | "voice" | "comedy" | "face" | "kings";
type Phase = "upcoming" | "registration" | "challenge" | "showcase" | "voting" | "closed" | "processing" | "results" | "completed";
type Review = "none" | "pending" | "approved" | "rejected";
type Action = "register" | "challenge" | "submit" | "myEntry" | "entries" | "vote" | "leaderboard" | "results" | "notify" | "detail";
type Route = { screen: Screen; comp?: CompId; entry?: number; tab?: string; handle?: string; vote?: boolean; buy?: boolean; gift?: string; pick?: string };

const photos = {
  chef: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?auto=format&fit=crop&w=900&q=85",
  noodles: "https://images.unsplash.com/photo-1697659602792-31dcb2a5a4ec?auto=format&fit=crop&w=900&q=85",
  fashion: "https://images.unsplash.com/photo-1595882669314-919b3d51f2c7?auto=format&fit=crop&w=900&q=85",
  editorial: "https://images.unsplash.com/photo-1645437991584-03636b0aad0f?auto=format&fit=crop&w=900&q=85",
  fitness: "https://images.unsplash.com/photo-1676655079738-af54dfd6318e?auto=format&fit=crop&w=900&q=85",
  beauty: "https://images.unsplash.com/photo-1632828171122-10f0bac103b5?auto=format&fit=crop&w=900&q=85",
  beauty2: "https://images.unsplash.com/photo-1632828171016-1df58f7580b8?auto=format&fit=crop&w=900&q=85",
  warm: "https://images.unsplash.com/photo-1579539760267-b2e78d9d735e?auto=format&fit=crop&w=900&q=85",
  troupe: "https://images.unsplash.com/photo-1786452158131-a0da00183e45?auto=format&fit=crop&w=900&q=85",
  hero: "https://images.unsplash.com/photo-1773592618449-32f92e88d8eb?auto=format&fit=crop&w=900&q=85",
  dance: "https://images.unsplash.com/photo-1773592617447-18c997917ff4?auto=format&fit=crop&w=900&q=85",
  artist: "https://images.unsplash.com/photo-1777747269221-e20a82680979?auto=format&fit=crop&w=900&q=85",
  singer: "https://images.unsplash.com/photo-1765153045857-4cc4aaa55bb6?auto=format&fit=crop&w=900&q=85",
  portrait: "https://images.unsplash.com/photo-1620215175664-cb9a6f5b6103?auto=format&fit=crop&w=900&q=85",
  glow: "https://images.unsplash.com/photo-1773592620698-672a97954d2a?auto=format&fit=crop&w=900&q=85",
  mic: "https://images.unsplash.com/photo-1453090927415-5f45085b65c0?auto=format&fit=crop&w=900&q=85",
  crowd: "https://images.unsplash.com/photo-1577648884063-1d3d1477b8a7?auto=format&fit=crop&w=900&q=85",
  performer: "https://images.unsplash.com/photo-1559622023-04ca3ae5431d?auto=format&fit=crop&w=900&q=85",
  spotlight: "https://images.unsplash.com/photo-1554167725-89bf8ab26514?auto=format&fit=crop&w=900&q=85",
  stage: "https://images.unsplash.com/photo-1694720322566-f769f720de49?auto=format&fit=crop&w=900&q=85",
};

const iconPaths: Record<string, React.ReactNode> = {
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v4M8 20h8M9 17h6"/></>,
  wallet: <><path d="M3 7h16a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12v4"/><path d="M16 12h5v4h-5a2 2 0 0 1 0-4Z"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  heart: <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6l1.2 1.2L12 21l7.6-7.6 1.2-1.2a5.4 5.4 0 0 0 0-7.6Z"/>,
  comment: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>,
  share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></>,
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z"/>,
  arrow: <path d="m9 18 6-6-6-6"/>,
  back: <path d="m15 18-6-6 6-6"/>,
  play: <path d="m9 7 9 5-9 5V7Z"/>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  fire: <path d="M12 22c4 0 7-3 7-7 0-3-2-6-5-9 0 3-2 4-3 5 0-4-2-7-4-9 0 6-3 8-3 13 0 4 4 7 8 7Z"/>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
  camera: <><path d="M4 7h4l2-3h4l2 3h4v13H4V7Z"/><circle cx="12" cy="13" r="4"/></>,
  bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  up: <path d="m6 15 6-6 6 6"/>,
  down: <path d="m6 9 6 6 6-6"/>,
  rise: <><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></>,
  fall: <><path d="m3 7 6 6 4-4 8 8"/><path d="M15 17h6v-6"/></>,
  flat: <path d="M4 12h16M16 8l4 4-4 4"/>,
  crown: <path d="m3 7 4.5 4L12 4l4.5 7L21 7l-2 12H5L3 7Z"/>,
  users: <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></>,
  alert: <><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17v.5"/></>,
  film: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4"/></>,
  sliders: <><path d="M4 6h10M18 6h2M4 18h4M12 18h8M4 12h4M12 12h8"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="18" r="2"/><circle cx="10" cy="12" r="2"/></>,
  edit: <path d="M4 20h4L19 9l-4-4L4 16v4ZM14 6l4 4"/>,
  x: <path d="M6 6l12 12M18 6 6 18"/>,
  gift: <><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></>,
  grid: <><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  pause: <path d="M8 5v14M16 5v14"/>,
  ticket: <><path d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V6Z"/><path d="M14 6v2M14 11v2M14 16v2"/></>,
  scroll: <><path d="M7 4h11a2 2 0 0 1 2 2v1h-4"/><path d="M16 7v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h10"/><path d="M7 4a2 2 0 0 0-2 2v11M9 9h4M9 13h4"/></>,
  scoreboard: <><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M7 13V9M10.5 13V7M14 13v-3M17.5 13V8"/></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z"/>,
};

function Icon({ name, size = 22, filled = false }: { name: string; size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

function TopBar({ title, back, onBack, onNotify }: { title?: string; back?: boolean; onBack?: () => void; onNotify?: () => void }) {
  return (
    <header className="topbar">
      <div className="topbar-side">
        {back ? <button className="icon-button" onClick={onBack} aria-label="Go back"><Icon name="back" /></button> : <div className="brand-mark"><span>D</span></div>}
      </div>
      {title ? <h1 className="page-title">{title}</h1> : <div className="wordmark">D—ARENA</div>}
      <div className="topbar-side end">
        {onNotify ? <button className="icon-button notify" onClick={onNotify} aria-label="Notifications"><Icon name="bell" /><i /></button> : null}
      </div>
    </header>
  );
}

/* ───────────────────────── Competition model ───────────────────────── */

type Entry = { id: string; name: string; handle: string; image: string; votes: number; trend: "up" | "flat" | "down"; caption: string };
type Comp = {
  id: CompId; name: string; category: string; cadence: string; image: string; prize: string; contestants: number;
  totalRounds: number; safe: number; about: string; phase: Phase; round: number; time: string;
  schedule: [string, string][]; entries: Entry[];
};
type Journey = { phase: Phase; round: number; registered: boolean; submitted: boolean; review: Review; caption: string; clip: number; outcome: "advanced" | "eliminated" };
type Note = { id: number; icon: string; tone: string; title: string; body: string; time: string; route: Route; unread: boolean; kind?: "private" };

const isBdmId = (id: CompId) => id === "bdm";
const rName = (id: CompId, r: number) => (id === "bdm" ? roundNames[r - 1] : `Round ${r}`);
const roundNames = ["Freestyle", "Tell Your Story", "Challenge Remix", "Semi-Final", "Grand Final"];
const challenges = [
  { title: "Freestyle: show us who you are.", copy: "Any style, any song. Give us 60 seconds of movement that only you could make.", length: "30–60s", deadline: "Oct 7 · 11:59 PM", criteria: ["Originality", "Musicality", "Stage presence", "Clean, well-lit video"] },
  { title: "Tell your story.", copy: "Create a performance that tells a personal story.", length: "45–75s", deadline: "4d · Oct 22", criteria: ["Creativity", "Emotion", "Originality", "Execution"] },
  { title: "Remix the challenge.", copy: "We drop one sound for everyone. Make it yours — flip it, slow it, break it, rebuild it.", length: "30–60s", deadline: "Nov 2 · 11:59 PM", criteria: ["Creativity with the shared sound", "Musicality and timing", "Replay value"] },
  { title: "The Semi-Final.", copy: "Twenty creators left. Bring the performance that proves you belong in the final ten.", length: "60–90s", deadline: "Nov 12 · 11:59 PM", criteria: ["Technical skill", "Growth since Round 1", "Audience connection"] },
  { title: "Everything you have.", copy: "One take. Full-length performance. This is the night the Arena remembers.", length: "90–120s", deadline: "Nov 22 · 11:59 PM", criteria: ["A complete, polished performance", "Star quality", "A moment people will share"] },
];
const clips = [photos.hero, photos.glow, photos.portrait];

const e = (id: string, name: string, handle: string, image: string, votes: number, trend: Entry["trend"], caption: string): Entry => ({ id, name, handle, image, votes, trend, caption });

const comps: Comp[] = [
  {
    id: "bdm", name: "Best Dance Moves", category: "Dance", cadence: "DARENA Talent Season 1", image: fx.hubDance, prize: "₦500,000", contestants: 124, totalRounds: 5, safe: 5,
    about: "The Arena’s dance season. Afro, street, contemporary, freestyle — every style is welcome. Five rounds, a new challenge each time. Fans vote, the top dancers advance, and one Winner takes the crown.",
    phase: "registration", round: 1, time: "",
    schedule: [["Registration", "Oct 1–5"], ["Challenge", "Oct 6–10"], ["Showcase", "Oct 11"], ["Voting", "Oct 12–13"], ["Results", "Oct 14"]],
    entries: [
      e("lydia", "Lydia Okon", "@thee_lydia", photos.dance, 8420, "up", "Bringing Lagos energy to the stage."),
      e("mike_off", "Mike Offiong", "@mike_off", photos.performer, 7200, "up", "Calabar footwork, Lagos attitude."),
      e("kay", "Kay Bello", "@kaymoves", photos.artist, 15400, "flat", "Footwork first, everything else after."),
      e("temi", "Temi Ayo", "@temi_dance", photos.portrait, 13800, "down", "Lagos to the world, one count at a time."),
      e("naya", "Naya Ibe", "@naya", photos.spotlight, 11200, "up", "Contemporary with a little Shaku."),
      e("zuri", "Zuri Okafor", "@zuri", photos.hero, 12100, "flat", "One take. One stage. Everything I’ve got."),
      e("john", "John Ade", "@john", photos.glow, 9300, "down", "Grew up dancing at every owambe."),
      e("sam", "Sam Eze", "@sam", photos.fitness, 7600, "up", "Slowed it down to speed it up."),
      e("malik", "Malik Sule", "@malik", photos.crowd, 6900, "down", "Freestyle. No retakes."),
      e("amos", "Amos Duke", "@amos", photos.singer, 5800, "flat", "For the dreamers in the back row."),
      e("ife", "Ife Obi", "@ife", photos.editorial, 4700, "up", "Spotlight on, nerves off."),
      e("alex", "Alex Mensah", "@alexgrooves", photos.troupe, 14900, "up", "Accra came to play."),
    ],
  },
  {
    id: "dance", name: "Street Dance Cypher", category: "Dance", cadence: "Monthly", image: fx.arenaDance, prize: "₦500,000", contestants: 1248, totalRounds: 3, safe: 5,
    about: "Bring your most original routine to the Arena. Footwork, choreography and freestyle all count.",
    phase: "voting", round: 1, time: "2d 14h left",
    schedule: [["Submissions", "Oct 1–4"], ["Voting", "Oct 5–8"], ["Final", "Oct 20"]],
    entries: [
      e("d1", "Temi Ayo", "@temiayo", photos.troupe, 8200, "up", "Lagos to the world, one count at a time."),
      e("d2", "Naya Ibe", "@naya.art", photos.spotlight, 7100, "flat", "Contemporary with a little Shaku."),
      e("d3", "John Ade", "@johnade", photos.performer, 5300, "down", "Grew up dancing at every owambe."),
    ],
  },
  {
    id: "food", name: "Kitchen Masters", category: "Food", cadence: "Monthly", image: fx.arenaCooking, prize: "₦300,000", contestants: 642, totalRounds: 3, safe: 4,
    about: "One dish, sixty seconds, no filters. Show the Arena how you cook — from jollof to fine dining.",
    phase: "showcase", round: 1, time: "5d 3h left",
    schedule: [["Submissions", "Oct 1–6"], ["Showcase", "Oct 7"], ["Voting", "Oct 8–10"]],
    entries: [
      e("f1", "Chef Bisi", "@chefbisi", photos.chef, 0, "flat", "Party jollof, smoked the right way."),
      e("f2", "Uche Cooks", "@uchecooks", photos.noodles, 0, "flat", "Pepper soup noodles. Trust me."),
    ],
  },
  {
    id: "voice", name: "Afrobeat Arena", category: "Performance", cadence: "Season 3", image: photos.hero, prize: "₦750,000", contestants: 987, totalRounds: 4, safe: 4,
    about: "Singers, dancers and live acts perform to an Afrobeat brief. Top performers each round advance to the next stage.",
    phase: "voting", round: 2, time: "Ends in 18h",
    schedule: [["Round 1", "Apr 20–26"], ["Round 1 results", "Apr 28"], ["Round 2", "May 1–7"], ["Voting", "May 9–10"], ["Semi-Final", "May 14"]],
    entries: [
      e("zuri2", "Zuri Okafor", "@zurimoves", photos.hero, 12400, "up", "Took this one-take routine from the studio to the Arena."),
      e("tolu", "Tolu Vance", "@toluvoice", photos.singer, 10950, "up", "Wrote this hook at 3am. Hope it hits."),
      e("malik2", "Malik Sule", "@maliklive", photos.mic, 9310, "flat", "Live vocals, no autotune."),
      e("ada2", "Adaeze K.", "@adaeze", photos.glow, 8040, "down", "Bringing highlife back to the stage."),
      e("ife", "Ifeoma Obi", "@ifeoma", photos.spotlight, 6720, "up", "Spotlight on, nerves off."),
      e("dre", "Dre Bassey", "@drebeats", photos.performer, 5400, "down", "Talking drum meets 808."),
    ],
  },
  {
    id: "comedy", name: "Naija Laugh Cup", category: "Comedy", cadence: "Weekly Competition", image: photos.stage, prize: "₦250,000", contestants: 312, totalRounds: 3, safe: 3,
    about: "Sixty seconds to make the Arena laugh. Sketches, stand-up and skits all welcome.",
    phase: "showcase", round: 1, time: "Voting opens tomorrow",
    schedule: [["Submissions", "May 3–8"], ["Showcase", "May 9"], ["Voting", "May 10–11"], ["Results", "May 12"]],
    entries: [
      e("bimbo", "Bimbo Laughs", "@bimbolaughs", photos.portrait, 0, "flat", "When your mum finds your report card."),
      e("chidi", "Chidi Funny", "@chidifunny", photos.performer, 0, "flat", "Danfo conductor, the musical."),
      e("kemi", "Kemi Skits", "@kemiskits", photos.artist, 0, "flat", "POV: you said ‘I’m on my way’."),
      e("seun", "Seun Stand-up", "@seunstand", photos.mic, 0, "flat", "Five minutes on Lagos traffic, compressed."),
    ],
  },
  {
    id: "face", name: "Face of the Arena", category: "Creative", cadence: "Annual Competition", image: photos.artist, prize: "₦1,000,000", contestants: 1104, totalRounds: 4, safe: 10,
    about: "The yearly search for the creator who defines D-Arena. Content, character and community all count.",
    phase: "upcoming", round: 1, time: "Registration opens Fri",
    schedule: [["Registration", "May 17–24"], ["Round 1", "May 25–31"], ["Grand Final", "Jul 5"]], entries: [],
  },
  {
    id: "kings", name: "Street Kings", category: "Dance", cadence: "Season 2 · Finished", image: photos.performer, prize: "₦400,000", contestants: 1860, totalRounds: 4, safe: 1,
    about: "Four rounds of street dance. One crown.", phase: "completed", round: 4, time: "Ended Apr 30",
    schedule: [["Round 1", "Mar 2"], ["Semi-Final", "Apr 6"], ["Grand Final", "Apr 30"]],
    entries: [
      e("kz", "Kezia Ward", "@kez.moves", photos.spotlight, 41200, "up", "Crowned."),
      e("ob", "Obi Grey", "@obigrey", photos.glow, 38750, "flat", "Runner-up and grateful."),
      e("ta", "Tari James", "@tarij", photos.crowd, 30110, "down", "Top three, let’s go."),
    ],
  },
];

const phaseLabel = (p: Phase, r: number) => ({
  upcoming: "Upcoming", registration: "Registration Open", challenge: `Round ${r} · Challenge Open`, showcase: `Round ${r} · Showcase`,
  voting: `Round ${r} · Voting Live`, closed: `Round ${r} · Voting Closed`, processing: "Results Processing", results: "Results Published", completed: "Completed",
}[p]);
const phaseTone = (p: Phase) => (p === "voting" ? "live" : p === "registration" || p === "challenge" ? "open" : p === "showcase" ? "show" : p === "results" || p === "completed" ? "done" : "muted");
const bdmTime: Record<Phase, string> = { upcoming: "Starts in 2d 14h", registration: "Closes in 2d 6h", challenge: "3d 12h left to submit", showcase: "Voting opens tomorrow", voting: "Ends in 18h 24m", closed: "Ended 10 min ago", processing: "Results within 24h", results: "Published today", completed: "" };
const votingVisible = (p: Phase) => ["voting", "closed", "processing", "results", "completed"].includes(p);
const entriesVisible = (p: Phase) => ["showcase", "voting", "closed", "processing", "results", "completed"].includes(p);
const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`);

function getCta(c: Comp, j: Journey): { label: string; action: Action; hint: string } {
  const mine = c.id === "bdm";
  switch (c.phase) {
    case "upcoming": return { label: "Notify me", action: "notify", hint: c.time };
    case "registration": return mine && j.registered ? { label: "View Challenge", action: "challenge", hint: "You’re registered" } : { label: "Register", action: "register", hint: c.time };
    case "challenge":
      if (!mine || !j.registered) return { label: "View Competition", action: "detail", hint: "Registration has closed" };
      if (!j.submitted) return { label: "Submit Entry", action: "submit", hint: c.time };
      return { label: "View My Entry", action: "myEntry", hint: j.review === "rejected" ? "Your entry needs attention" : j.review === "approved" ? "Entry approved · Showcase next" : "Entry pending review" };
    case "showcase": return { label: "View Entries", action: "entries", hint: c.time };
    case "voting": return { label: "Vote now", action: "vote", hint: c.time };
    case "closed": return { label: "View Leaderboard", action: "leaderboard", hint: "Voting has ended" };
    case "processing": return { label: "View Leaderboard", action: "leaderboard", hint: "Results are being confirmed" };
    case "results": return { label: "View Results", action: "results", hint: c.time };
    default: return { label: "View Results", action: "results", hint: c.time };
  }
}

/* ───────────────────────── Arena context ───────────────────────── */

type ArenaCtx = {
  journey: Journey; setJourney: (f: (j: Journey) => Journey) => void; comp: (id: CompId) => Comp;
  go: (r: Route) => void; back: () => void; setTab: (t: Tab) => void; act: (c: Comp, a: Action) => void; toast: (s: string) => void;
  coins: number; setCoins: (n: number) => void; votesOf: (c: CompId, e: Entry) => number; myVotes: (c: CompId, e: Entry) => number;
  castVotes: (c: CompId, e: Entry, n: number, free: boolean) => void; freeUsed: (c: CompId) => boolean;
  notes: Note[]; notify: (n: Omit<Note, "id" | "time" | "unread">) => void; readNotes: () => void; openHost: () => void; following: CompId[]; toggleFollow: (c: CompId) => void; saved: CompId[]; toggleSave: (c: CompId) => void; patch: (p: Partial<Route>) => void; backTo: (r: Route) => void; followsCreator: (h: string) => boolean; toggleCreator: (h: string) => void; fanVotes: { c: CompId; en: Entry; n: number }[];
  judge: Judge; setJudge: (f: (j: Judge) => Judge) => void; judging: (c: CompId) => boolean; replace: (r: Route) => void; push: (p: Push) => void; openJudgeSim: () => void; openCreate: () => void; seat: string | null; setSeat: (s: string) => void;
};
const ArenaContext = createContext<ArenaCtx | null>(null);
const useArena = () => useContext(ArenaContext)!;

/* ───────────────────────── Hi-fi design layer (Figma "Hifi" page) ───────────────────────── */

const noiseVar = { "--fx-noise": `url("${fx.noise}")` } as React.CSSProperties;

function FxIcon({ src, size = 24, style }: { src: string; size?: number; style?: React.CSSProperties }) {
  return <span className="fxi" aria-hidden="true" style={{ width: size, height: size, WebkitMaskImage: `url("${src}")`, maskImage: `url("${src}")`, ...style }} />;
}

function Crop({ src, w, h, img, alt = "" }: { src: string; w: number; h: number; img: React.CSSProperties; alt?: string }) {
  return <span style={{ position: "relative", display: "inline-block", width: w, height: h, overflow: "hidden", flex: "none" }}><img src={src} alt={alt} style={{ position: "absolute", maxWidth: "none", ...img }} /></span>;
}
const LogoMark = ({ size = 32 }: { size?: number }) => <Crop src={fx.logoMark} w={size} h={size * 1.0667} img={{ height: "129.95%", left: "-61.41%", top: "-11.17%", width: "208.7%" }} />;
const LogoWord = () => <Crop src={fx.logoWordmark} w={132.9} h={24} alt="D-Arena" img={{ height: "367.31%", left: "-15.63%", top: "-213.46%", width: "132.64%" }} />;

function FxLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="fx-loader" role="status">
      <div className="fx-loader-spin"><img className="ring" src={fx.loaderRing} alt="" /><span style={{ position: "absolute", left: 30, top: 26 }}><Crop src={fx.logoMark} w={19.7} h={21} img={{ height: "129.95%", left: "-61.41%", top: "-11.17%", width: "208.7%" }} /></span></div>
      {label}
    </div>
  );
}
const FxBusy = ({ label }: { label?: string }) => <div className="fx-loading-veil"><FxLoader label={label} /></div>;

function FxEmpty({ art, bell, icon, title, copy, action, onClick }: { art?: string; bell?: boolean; icon?: string; title: string; copy: string; action?: string; onClick?: () => void }) {
  return (
    <div className="fx-empty">
      <div className="art">{bell ? <img className="bell" src={fx.bellOff} alt="" /> : art ? <img src={art} alt="" /> : <FxIcon src={icon ?? fx.iSearchNormal} size={34} style={{ color: "var(--gold50)" }} />}</div>
      <strong>{title}</strong>
      <p>{copy}</p>
      {action && onClick && <button className="fx-btn md" onClick={onClick}>{action}</button>}
    </div>
  );
}

const Verified = ({ size = 20 }: { size?: number }) => <img src={fx.verified} width={size} height={size} alt="Verified" />;
const Back = ({ onClick, ring, close }: { onClick: () => void; ring?: boolean; close?: boolean }) => (
  <button className={`fx-circle ${ring ? "ring-fill" : ""}`} onClick={onClick} aria-label={close ? "Close" : "Go back"}><FxIcon src={close ? fx.iClose : fx.iArrowLeft} /></button>
);
const kfmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : `${n}`);

type ViewItem = { image: string; handle: string; avatar: string; time: string; caption: string; tags?: string; likes: number; comments: number; shares: number; comp?: CompId };

const sampleComments: [string, string, string, string, number][] = [
  ["@alex", fx.fan1, "That footwork 🔥 you owned this stage", "2m", 24],
  ["@temi_dance", fx.fan2, "Round 2 is yours, no debate", "8m", 12],
  ["@ngozi.k", fx.fan3, "The transition at 0:22 😮‍💨", "21m", 9],
  ["@kemi.b", fx.fan4, "Lagos is proud of you!", "1h", 31],
  ["@tunde_r", fx.fan5, "Watched this five times already", "2h", 4],
  ["@sofiapatel", fx.fan6, "Voted. Let’s get you to the final 🙌", "3h", 17],
];

function FxComments({ count, onClose }: { count: number; onClose: () => void }) {
  const [list, setList] = useState(sampleComments.map(([h, av, t, time, likes]) => ({ h, av, t, time, likes, liked: false })));
  const [text, setText] = useState("");
  const [closing, setClosing] = useState(false);
  const close = () => { setClosing(true); window.setTimeout(onClose, 220); };
  const send = (t = text) => { if (!t.trim()) return; setList((l) => [{ h: "@adanwosu", av: fx.avatarAlexSm, t: t.trim(), time: "now", likes: 0, liked: false }, ...l]); setText(""); };
  return (
    <div className={`fx fx-csheet-wrap ${closing ? "closing" : ""}`} onClick={close}>
      <div className="fx-csheet" role="dialog" aria-label="Comments" onClick={(ev) => ev.stopPropagation()}>
        <span className="grab" />
        <header><b>{(count + list.length - sampleComments.length).toLocaleString()} comments</b><button className="x" onClick={close} aria-label="Close comments"><Icon name="x" size={18} /></button></header>
        <div className="list">
          {list.length === 0 ? <FxEmpty icon={fx.iMsg} title="No comments yet" copy="Start the conversation." /> : list.map((cm, i) => (
            <div className="cm" key={i}>
              <img src={cm.av} alt="" />
              <div><b>{cm.h} <small>{cm.time}</small></b><p>{cm.t}</p><button className="reply" onClick={() => setText(`${cm.h} `)}>Reply</button></div>
              <button className={`lk ${cm.liked ? "on" : ""}`} onClick={() => setList((l) => l.map((x, k) => (k === i ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x)))} aria-label="Like comment"><FxIcon src={cm.liked ? fx.iHeartBold : fx.iHeart} size={16} /><span>{cm.likes || ""}</span></button>
            </div>
          ))}
        </div>
        <div className="quick">{["🔥", "👏", "😍", "🙌", "💯", "😂"].map((e) => <button key={e} onClick={() => send(e)} aria-label={`Send ${e}`}>{e}</button>)}</div>
        <div className="input"><img src={fx.avatarAlexSm} alt="" /><input value={text} onChange={(ev) => setText(ev.target.value)} onKeyDown={(ev) => ev.key === "Enter" && send()} placeholder="Add a comment…" aria-label="Add a comment" /><button disabled={!text.trim()} onClick={() => send()}>Post</button></div>
      </div>
    </div>
  );
}

function FxViewer({ v, onClose }: { v: ViewItem; onClose: () => void }) {
  const a = useArena();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [burst, setBurst] = useState(0);
  const [comments, setComments] = useState(false);
  const [more, setMore] = useState(false);
  const last = useRef(0);
  const c = v.comp ? a.comp(v.comp) : null;
  const f = a.followsCreator(v.handle);
  const tap = () => { const now = Date.now(); if (now - last.current < 300) { setLiked(true); setBurst((b) => b + 1); } last.current = now; };
  return (
    <div className={`fx fx-viewer v2 ${comments ? "with-comments" : ""}`} role="dialog" aria-label={`Post by ${v.handle}`}>
      <img className="bg" src={v.image} alt="" onClick={tap} />
      {burst > 0 && <span className="burst" key={burst}><FxIcon src={fx.iHeartBold} size={96} /></span>}
      <div className="vtop"><Back onClick={onClose} />{c && <button className="ctx" onClick={() => { onClose(); a.go({ screen: "competition", comp: c.id }); }}><FxIcon src={fx.iCup} size={16} />{c.name}</button>}</div>
      <div className="info">
        <div className="who"><img className="fx-avatar" src={v.avatar} width={44} height={44} alt="" /><div><b>{v.handle}<Verified size={18} /></b><small>{v.time} ago</small></div><button className={`fol ${f ? "on" : ""}`} onClick={() => a.toggleCreator(v.handle)}>{f ? "Following" : "Follow"}</button></div>
        <p className={more ? "" : "clamp"} onClick={() => setMore(!more)}>{v.caption}{v.tags && <b> {v.tags}</b>}</p>
        {c && c.phase === "voting" && <button className="fx-btn" onClick={() => { onClose(); a.go({ screen: "arena", comp: c.id, entry: 0 }); }}><Icon name="star" size={18} filled /> Vote in {c.name}</button>}
      </div>
      <div className="vbar">
        <button className={liked ? "on" : ""} onClick={() => setLiked(!liked)} aria-label="Like"><FxIcon src={liked ? fx.iHeartBold : fx.iHeart} size={24} />{kfmt(v.likes + (liked ? 1 : 0))}</button>
        <button onClick={() => setComments(true)} aria-label="Comments"><FxIcon src={fx.iMsg} size={24} />{v.comments}</button>
        <button onClick={() => a.toast("Share link copied")} aria-label="Share"><FxIcon src={fx.iSend} size={24} />{v.shares}</button>
        <span className="sp" />
        <button className={saved ? "on" : ""} onClick={() => { setSaved(!saved); a.toast(saved ? "Removed from saved" : "Saved to your collection"); }} aria-label="Save"><FxIcon src={fx.iBookmark} size={24} /></button>
      </div>
      <i className="vprog" aria-hidden="true" />
      {comments && <FxComments count={v.comments} onClose={() => setComments(false)} />}
    </div>
  );
}

const CROWD = Array.from({ length: 34 }, (_, k) => ({ x: 6 + k * 11.6 + ((k * 37) % 7), y: 70 + ((k * 53) % 18), r: 7 + ((k * 13) % 4), arm: k % 4 === 1 ? -1 : k % 5 === 2 ? 1 : 0 }));
function ConcertBackdrop() {
  return (
    <span className="concert" aria-hidden="true">
      <span className="rig">{Array.from({ length: 14 }, (_, k) => <i key={k} style={{ animationDelay: `${(k % 5) * 0.4}s` }} />)}</span>
      <span className="beams">{[-38, -24, -12, 0, 12, 24, 38].map((d, k) => <i key={k} className={k % 2 ? "p" : "g"} style={{ transform: `rotate(${d}deg)`, animationDelay: `${k * 0.3}s` }} />)}</span>
      <span className="screens"><i /><i /></span>
      <svg className="crowd" viewBox="0 0 400 120" preserveAspectRatio="none">
        {CROWD.map((p, k) => <g key={k} fill="#07050a">
          <circle cx={p.x} cy={p.y} r={p.r} />
          <path d={`M${p.x - p.r * 1.9} 120 Q${p.x} ${p.y + p.r * 0.6} ${p.x + p.r * 1.9} 120Z`} />
          {p.arm !== 0 && <path d={`M${p.x + p.arm * p.r * 0.8} ${p.y + p.r} L${p.x + p.arm * p.r * 1.6} ${p.y - p.r * 2.6}`} stroke="#07050a" strokeWidth="4" strokeLinecap="round" />}
        </g>)}
      </svg>
    </span>
  );
}

function ProfileSpotlight({ img, name, handle, tagline, bio, stats, kicker, back, onMore, children }: { img: string; name: string; handle: string; tagline: string; bio: string; stats: [string, string, (() => void)?][]; kicker: string; back?: () => void; onMore: () => void; children: React.ReactNode }) {
  return (
    <section className="fx-spot">
      <ConcertBackdrop />
      <span className="cone" aria-hidden="true" /><span className="floor" aria-hidden="true" />
      <div className="top">{back ? <Back onClick={back} /> : <span />}<button className="fx-circle" onClick={onMore} aria-label="More options"><FxIcon src={fx.iMore} /></button></div>
      <p className="kick">{kicker}</p>
      <div className="ring"><img src={img} alt={name} /></div>
      <h1>{name}<Verified size={22} /></h1>
      <p className="handle">{handle} · {tagline}</p>
      <p className="bio">{bio}</p>
      <div className="fx-pstats">{stats.map(([n, l, fn]) => <button key={l} onClick={fn} disabled={!fn}><b>{n}</b><small>{l}</small></button>)}</div>
      <div className="acts">{children}</div>
    </section>
  );
}


/* ───────────────────────── Splash ───────────────────────── */

function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const finish = () => { if (leaving) return; setLeaving(true); window.setTimeout(onDone, 650); };
  useEffect(() => { const t = window.setTimeout(finish, 3600); return () => window.clearTimeout(t); });
  return (
    <div className={`splash fx-splash ${leaving ? "leaving" : ""}`} onClick={finish} role="button" aria-label="Enter D-Arena">
      <img className="fx-splash-bg" src={fx.splashBg} alt="" />
      <img className="fx-splash-logo" src={fx.logoFull} alt="D-Arena. Where talent ignites the world" />
    </div>
  );
}


/* ───────────────────────── Shared pieces ───────────────────────── */

function StatePill({ c }: { c: Comp }) {
  return <span className={`state-pill ${phaseTone(c.phase)}`}>{c.phase === "voting" && <i />}{phaseLabel(c.phase, c.round).toUpperCase()}</span>;
}

function ArenaCard({ c, compact }: { c: Comp; compact?: boolean }) {
  const a = useArena();
  const cta = getCta(c, a.journey);
  const followed = a.following.includes(c.id);
  const label = cta.action === "notify" && followed ? "Following" : cta.action === "vote" && a.judging(c.id) ? "Open" : cta.label;
  return (
    <article className={`arena-card ${compact ? "compact" : ""}`}>
      <button className="arena-card-hit" onClick={() => a.go({ screen: "competition", comp: c.id })} aria-label={`Open ${c.name}`} />
      <img src={c.image} alt="" />
      <div className="card-shade" />
      <div className="arena-card-top"><StatePill c={c} />{!compact && <span className="prize-chip">{c.prize}</span>}</div>
      <div className="arena-card-copy">
        <small>{c.category} · {c.cadence}</small>
        <h3>{c.name}</h3>
        <div className="arena-meta"><span><Icon name="clock" size={12} />{c.time}</span><span><Icon name="users" size={12} />{c.contestants.toLocaleString()}</span></div>
        <div className="arena-card-foot">
          {c.id === "bdm" && a.journey.registered ? <span className="you-chip"><Icon name="check" size={12} /> You’re competing</span> : <span className="round-chip">{c.phase === "upcoming" ? `${c.totalRounds} rounds` : c.phase === "completed" ? "Winner crowned" : `${rName(c.id, c.round)} of ${c.totalRounds}`}</span>}
          <button className={`card-cta ${cta.action === "vote" && !a.judging(c.id) ? "hot" : ""} ${followed && cta.action === "notify" ? "ghost" : ""}`} onClick={() => a.act(c, cta.action)}>{label}</button>
        </div>
      </div>
    </article>
  );
}

function SubBar({ title, sub, onBack, right }: { title: string; sub?: string; onBack: () => void; right?: React.ReactNode }) {
  return (
    <header className="subbar">
      <button className="icon-button" onClick={onBack} aria-label="Go back"><Icon name="back" /></button>
      <div><strong>{title}</strong>{sub && <span>{sub}</span>}</div>
      <div className="subbar-right">{right}</div>
    </header>
  );
}

function HostButton() {
  const a = useArena();
  return <button className="host-chip" onClick={a.openHost}><Icon name="sliders" size={14} /> Host</button>;
}

function StageTracker({ c }: { c: Comp }) {
  const steps = ["Register", "Challenge", "Showcase", "Voting", "Results"];
  const idx = { upcoming: -1, registration: 0, challenge: 1, showcase: 2, voting: 3, closed: 3.5, processing: 4, results: 4, completed: 5 }[c.phase];
  return (
    <div className="tracker">
      {steps.map((s, i) => {
        const state = i < Math.floor(idx) || idx === 5 || (i === 3 && idx === 3.5) ? "done" : i === Math.floor(idx) ? "now" : "";
        return <div key={s} className={`tracker-step ${state}`}><i>{state === "done" ? <Icon name="check" size={10} /> : null}</i><span>{s}</span></div>;
      })}
    </div>
  );
}

function RoundTimeline({ c }: { c: Comp }) {
  return (
    <div className="round-timeline">
      {Array.from({ length: c.totalRounds }).map((_, i) => {
        const r = i + 1;
        const done = r < c.round || c.phase === "completed" || (r === c.round && c.phase === "results");
        const now = r === c.round && !done && c.phase !== "upcoming";
        return (
          <div key={r} className={done ? "done" : now ? "now" : ""}>
            <i>{done ? <Icon name="check" size={11} /> : null}</i>
            <strong>{rName(c.id, i + 1)}</strong>
            <span>{done ? "Complete" : now ? "Current" : "Upcoming"}</span>
          </div>
        );
      })}
    </div>
  );
}

function Accordion({ items, startClosed }: { items: [string, string][]; startClosed?: boolean }) {
  const [open, setOpen] = useState<number | null>(startClosed ? null : 0);
  return (
    <div className="accordion">
      {items.map(([q, body], i) => (
        <div key={q} className={open === i ? "open" : ""}>
          <button onClick={() => setOpen(open === i ? null : i)}><span>{q}</span><Icon name="down" size={16} /></button>
          {open === i && <p>{body}</p>}
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── Competitions hub ───────────────────────── */

function ArenaRailCard({ c }: { c: Comp }) {
  const a = useArena();
  const cta = getCta(c, a.journey);
  const followed = a.following.includes(c.id);
  const label = cta.action === "register" ? "Join" : cta.action === "notify" ? (followed ? "Following" : "Notify me") : cta.action === "vote" ? "Vote" : cta.label.replace("View ", "");
  const open = () => a.go({ screen: "competition", comp: c.id });
  return (
    <div className="fx-arena-card" role="button" tabIndex={0} onClick={open} onKeyDown={(ev) => ev.key === "Enter" && open()} aria-label={`Open ${c.name}`}>
      <img className="bg" src={c.image} alt="" />
      <span className="time"><FxIcon src={fx.iClock} size={20} />{c.time || stageInfo(c).label}</span>
      <div className="bottom">
        <strong>{c.name}</strong>
        <div className="row"><span className="joined"><FxIcon src={fx.iUsers} size={16} />{kfmt(c.contestants)} joined</span><button className="join" onClick={(ev) => { ev.stopPropagation(); a.act(c, cta.action); }}>{label}</button></div>
      </div>
    </div>
  );
}

function CompCard({ c }: { c: Comp }) {
  const a = useArena();
  const st = stageInfo(c);
  return (
    <button className="fx-comp-card" onClick={() => a.go({ screen: "competition", comp: c.id })} aria-label={`Open ${c.name}`}>
      <img className="bg" src={c.image} alt="" />
      <span className="tag"><i className={c.phase === "voting" ? "live" : ""} />{st.label}</span>
      {c.id === "bdm" && a.journey.registered && <span className="you">YOU’RE IN</span>}
      <span className="foot">
        <span className="ci">
          <strong>{c.name}</strong>
          <span className="fx-meta"><FxIcon src={fx.iCalendar} size={20} />Date: <em>{passDates(lobbySchedule(c))}</em></span>
          <span className="fx-meta"><FxIcon src={fx.iTicket} size={20} />Fee: <em>FREE</em></span>
        </span>
        <span className="go"><FxIcon src={fx.iArrowRight} /></span>
      </span>
    </button>
  );
}

function HubCard({ c }: { c: Comp }) {
  return <CompCard c={c} />;
}

function CompetitionsPage() {
  const a = useArena();
  const [tab, setTab] = useState("Ongoing");
  const [q, setQ] = useState("");
  const groups: Record<string, CompId[]> = { Ongoing: ["bdm", "dance", "food", "voice", "comedy"], Upcoming: ["face"], Past: ["kings"] };
  const list = groups[tab].map(a.comp).filter((c) => (c.name + c.category).toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div className="fx">
      <header className="fx-pagehead with-action"><div><h1>Competitions Hub</h1><p>Find a challenge. Watch the talent.</p></div><button className="fx-create" onClick={a.openCreate} aria-label="Create or enter a competition"><FxIcon src={fx.iAdd} size={26} /></button></header>
      <div style={{ display: "grid", gap: 24, marginTop: 24 }}>
        <label className="fx-search"><FxIcon src={fx.iSearchNormal} size={18} /><input value={q} onChange={(ev) => setQ(ev.target.value)} placeholder="Search for competitions" aria-label="Search for competitions" />{q && <button onClick={() => setQ("")} aria-label="Clear search"><FxIcon src={fx.iClose} size={18} /></button>}</label>
        <nav className="fx-tabs even">{Object.keys(groups).map((t) => <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t} ({groups[t].length})</button>)}</nav>
      </div>
      {list.length ? (
        <div className="fx-hub-list">{list.map((c, i) => <div key={c.id} style={{ display: "grid", gap: 18 }}>{i > 0 && <div className="fx-hub-sep" />}<CompCard c={c} /></div>)}</div>
      ) : (
        <FxEmpty icon={fx.iCup} title={q ? "No competitions match" : "No competitions here yet"} copy={q ? `We couldn’t find “${q}”. Try a category like Dance or Comedy.` : "New competitions are announced every week."} action={q ? "Clear search" : "View ongoing competitions"} onClick={() => { setQ(""); setTab("Ongoing"); }} />
      )}
    </div>
  );
}


/* ───────────────────────── Competition detail ───────────────────────── */


const stats = (en: Entry) => ({ views: Math.round(en.votes * 1.48 + 900), likes: Math.round(en.votes * 1.47 + 300), comments: Math.round(en.votes / 30 + 12), shares: Math.round(en.votes / 210 + 3) });
const arenaOpen = (p: Phase) => !["upcoming", "registration", "challenge"].includes(p);
const rankList = (votesOf: (c: CompId, e: Entry) => number, c: Comp) => [...c.entries].sort((x, y) => votesOf(c.id, y) - votesOf(c.id, x));
const VOTE_COST = 5;

function stageInfo(c: Comp): { label: string; tone: string; time: string } {
  switch (c.phase) {
    case "voting": return { label: "Voting Live", tone: "live", time: c.time };
    case "showcase": return { label: "Showcase Live", tone: "show", time: "Voting opens after the showcase" };
    case "challenge": return { label: "Challenge Open", tone: "open", time: "Showcase starts when submissions close" };
    case "closed": case "processing": return { label: "Voting Closed", tone: "muted", time: "Results are being confirmed" };
    case "results": return { label: "Results Live", tone: "done", time: "Round complete" };
    case "completed": return { label: "Competition complete", tone: "done", time: c.time };
    case "registration": return { label: "Registration Open", tone: "open", time: c.time };
    default: return { label: "Upcoming", tone: "muted", time: c.time || "Starts in 2d 14h" };
  }
}

const regOpen = (c: Comp) => c.id === "bdm" && c.round === 1 && ["upcoming", "registration", "challenge", "showcase"].includes(c.phase);

/* ───────────────────────── Venue lobby (show detail) ───────────────────────── */

type LobbyArea = "Overview" | "Rules" | "Leaderboard" | "Results" | "My Journey";
const lobbyTiles: { k: LobbyArea; kicker: string; title: string; icon: string; from: string }[] = [
  { k: "Overview", kicker: "OVERVIEW", title: "The Programme", icon: "ticket", from: "left" },
  { k: "Rules", kicker: "RULES", title: "House Rules", icon: "scroll", from: "right" },
  { k: "Leaderboard", kicker: "LEADERBOARD", title: "The Big Screen", icon: "scoreboard", from: "bl" },
  { k: "Results", kicker: "RESULTS", title: "Announcements", icon: "mic", from: "br" },
];
const houseRules = (c: Comp): [string, string][] => [
  ["Eligibility", "Open to D-Arena creators aged 18+ living in Nigeria. One account per person. A verified profile is required to receive prize money or gifts."],
  ["Submission requirements", "Vertical video (9:16), 30–90 seconds, filmed for this round. No watermarks from other apps. Licensed or original audio only."],
  ["Challenge requirements", "Each round has its own brief, released only to registered contestants. Your entry must respond to that round’s brief."],
  ["Judging criteria", "Originality, musicality, stage presence and execution. The host may remove entries that don’t meet the brief before the showcase."],
  ["Voting rules", "Voting opens only after every contestant has been showcased. Votes cost 5 Coins each. You may vote for as many contestants as you like, as often as you like."],
  ["Gift rules", "Gifts are a way to appreciate a creator. They are not votes and don’t affect rankings. Contestants receive gift value in their Earnings."],
  ["Elimination & advancement", `The top ${c.safe * 4} contestants by votes advance each round. Everyone else is eliminated and their entry stays on their profile.`],
  ["Disqualification", "Stolen content, vote manipulation, or harassment leads to removal from the competition and forfeiture of votes."],
  ["Important dates", "Registration Sep 28 – Oct 5 · Showcase Oct 7 – 8 · Voting Oct 8 – 9 · Results Oct 10."],
];
const lobbySchedule = (c: Comp): [string, string][] => (c.id === "bdm" ? [["Registration", "Sep 28 – Oct 5"], ["Showcase", "Oct 7 – Oct 8"], ["Voting", "Oct 8 – Oct 9"], ["Results", "Oct 10"]] : c.schedule);
const lobbyNow = (c: Comp) => ({ upcoming: -1, registration: 0, challenge: 0, showcase: 1, voting: 2, closed: 2, processing: 3, results: 3, completed: 3 }[c.phase]);
const roundDone = (c: Comp, r: number) => r < c.round || (r === c.round && ["results", "completed"].includes(c.phase));
const lastDoneRound = (c: Comp) => { for (let r = c.totalRounds; r >= 1; r--) if (roundDone(c, r)) return r; return 0; };
const passDates = (s: [string, string][]) => {
  if (!s.length) return "TBA";
  const first = s[0][1].split(/\s?[–-]\s?/)[0].trim();
  const lastRaw = s[s.length - 1][1];
  let last = lastRaw.split(/\s?[–-]\s?/).pop()!.trim();
  if (!/[A-Za-z]/.test(last)) last = `${lastRaw.split(" ")[0]} ${last}`;
  return first === last ? first : `${first} – ${last}`;
};
const journeySteps = ["Register", "Complete challenge", "Submit entry", "Get approved", "Take the stage", "Receive votes", "Advance"];

function useFitText(ref: React.RefObject<HTMLElement | null>, max: number, min: number, dep: unknown) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      let size = max;
      el.style.fontSize = `${size}px`;
      const words = el.textContent?.split(/\s+/) ?? [];
      const widest = () => { const r = document.createRange(); let w = 0; el.childNodes.forEach((n) => { r.selectNodeContents(n); w = Math.max(w, r.getBoundingClientRect().width); }); return words.length > 1 ? el.scrollWidth : w; };
      while (size > min && (el.scrollWidth > el.clientWidth + 1 || widest() > el.clientWidth + 1)) { size -= 1; el.style.fontSize = `${size}px`; }
    };
    fit();
    document.fonts?.ready.then(fit);
  }, [dep]);
}

function Sparks() {
  return <span className="tile-sparks" aria-hidden="true">{Array.from({ length: 7 }).map((_, i) => <i key={i} style={{ ["--a" as string]: `${i * 51 + 10}deg` }} />)}</span>;
}

function LobbyTile({ t, i, inView, teaser, onOpen }: { t: (typeof lobbyTiles)[number]; i: number; inView: boolean; teaser: React.ReactNode; onOpen: () => void }) {
  const title = useRef<HTMLElement>(null);
  useFitText(title, 26, 16, t.title);
  return (
    <button data-tile={t.k} className={`lobby-tile from-${t.from} ${inView ? "in" : ""}`} style={{ ["--d" as string]: `${i * 120}ms` }} onClick={onOpen} aria-label={`Open ${t.title}`}>
      <span className="lt-bulbs" aria-hidden="true">{Array.from({ length: 9 }).map((_, k) => <i key={k} />)}</span>
      <span className="lt-glow" aria-hidden="true" />
      <span className="lt-icon"><Icon name={t.icon} size={24} /></span>
      <small className="lt-kicker">{t.kicker}</small>
      <strong className="lt-title" ref={title}>{t.title}</strong>
      <span className="lt-teaser">{teaser}</span>
      <em className="lt-hint">Tap to enter <Icon name="arrow" size={12} /></em>
      <Sparks />
    </button>
  );
}

function LobbyPopup({ area, areas, onClose, onSwitch, children }: { area: LobbyArea; areas: LobbyArea[]; onClose: () => void; onSwitch: (k: LobbyArea) => void; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const closing = useRef(false);
  const [drag, setDrag] = useState(0);
  const reduce = typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const clipFor = (k: LobbyArea) => {
    const tile = document.querySelector(`[data-tile="${k}"]`);
    const p = panel.current;
    if (!tile || !p) return null;
    const r = tile.getBoundingClientRect();
    const b = p.getBoundingClientRect();
    return `inset(${r.top - b.top}px ${b.right - r.right}px ${b.bottom - r.bottom}px ${r.left - b.left}px round 22px)`;
  };
  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    const p = panel.current;
    const from = clipFor(area);
    if (p && from && !reduce) p.animate([{ clipPath: from, filter: "brightness(1.4)" }, { clipPath: "inset(0px 0px 0px 0px round 0px)", filter: "brightness(1)" }], { duration: 560, easing: "cubic-bezier(.2,.85,.25,1)" });
    return () => { document.body.style.overflow = ""; };
  }, []);
  useEffect(() => { body.current?.scrollTo({ top: 0 }); }, [area]);
  useEffect(() => {
    const key = (ev: KeyboardEvent) => { if (ev.key === "Escape") close(); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });
  const close = () => {
    if (closing.current) return;
    closing.current = true;
    root.current?.classList.add("closing");
    const p = panel.current;
    if (!p || reduce) { window.setTimeout(onClose, reduce ? 200 : 0); return; }
    const dy = drag;
    p.style.transform = "none";
    const to = clipFor(area);
    if (!to) { onClose(); return; }
    const an = p.animate([{ clipPath: "inset(0px 0px 0px 0px round 0px)", transform: `translateY(${dy}px)` }, { clipPath: to, transform: "translateY(0px)", opacity: 0.5 }], { duration: 420, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" });
    an.onfinish = onClose;
  };
  const down = (ev: React.PointerEvent) => { if ((body.current?.scrollTop ?? 0) <= 2) { startY.current = ev.clientY; (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId); } };
  const move = (ev: React.PointerEvent) => { if (startY.current !== null) setDrag(Math.max(0, ev.clientY - startY.current)); };
  const up = () => { if (startY.current === null) return; startY.current = null; if (drag > 110) close(); else setDrag(0); };
  const meta: Record<LobbyArea, [string, string]> = { Overview: ["OVERVIEW", "The Programme"], Rules: ["RULES", "House Rules"], Leaderboard: ["LEADERBOARD", "The Big Screen"], Results: ["RESULTS", "Announcements"], "My Journey": ["BACKSTAGE", "Your Journey"] };
  const others = areas.filter((x) => x !== area && x !== "My Journey");
  const titleRef = useRef<HTMLHeadingElement>(null);
  useFitText(titleRef, 46, 26, area);
  return (
    <div className="lp-root" ref={root} role="dialog" aria-modal="true" aria-label={meta[area][1]}>
      <div className="lp-dim" onClick={close} />
      <div className={`lp-panel lp-${area.replace(" ", "").toLowerCase()}`} ref={panel} style={drag ? { transform: `translateY(${drag}px) scale(${1 - drag / 2400})`, transition: "none" } : undefined}>
        <span className="lp-sweep" key={area} aria-hidden="true" />
        <header className="lp-head" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
          <span className="lp-grab" />
          <div><small>{meta[area][0]}</small><h2 ref={titleRef}>{meta[area][1]}</h2></div>
          <button className="lp-close" onClick={close} onPointerDown={(ev) => ev.stopPropagation()} aria-label="Close"><Icon name="x" size={18} /></button>
        </header>
        <div className="lp-body" ref={body}>
          <div className="lp-content" key={area}>{children}</div>
          <nav className="lp-jump">
            <span>ALSO IN THE LOBBY</span>
            <div>{others.map((k) => <button key={k} onClick={() => onSwitch(k)}>{meta[k][1]}<small>{k}</small></button>)}</div>
          </nav>
        </div>
      </div>
    </div>
  );
}

function Programme({ c }: { c: Comp }) {
  const isBdm = c.id === "bdm";
  const lines = [`Welcome to ${c.name}.`, ...c.about.split(/(?<=[.!?])\s+/).filter(Boolean)];
  const [playing, setPlaying] = useState(false);
  const [line, setLine] = useState(-1);
  const [page, setPage] = useState(0);
  const [secs, setSecs] = useState(18 * 3600 + 24 * 60 + 9);
  const pagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!playing) return;
    let i = 0; setLine(0);
    const t = window.setInterval(() => { i++; if (i >= lines.length) { window.clearInterval(t); setPlaying(false); return; } setLine(i); }, 2600);
    return () => window.clearInterval(t);
  }, [playing]);
  useEffect(() => { const t = window.setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000); return () => window.clearInterval(t); }, []);
  const sched = lobbySchedule(c);
  const nowKey = lobbyNow(c);
  const hms = [Math.floor(secs / 3600), Math.floor((secs % 3600) / 60), secs % 60].map((n) => String(n).padStart(2, "0")).join(":");
  const go = (i: number) => { const el = pagesRef.current; if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" }); };
  return (
    <>
      <section className={`host-spot ${playing ? "on" : ""}`}>
        <span className="hs-cone" aria-hidden="true" />
        <img src={photos.singer} alt="Funke Adeyemi, show host" />
        <strong>Funke Adeyemi</strong>
        <small>Your host tonight</small>
        <button className="hs-play" onClick={() => setPlaying(!playing)}>
          <Icon name={playing ? "pause" : "play"} filled={!playing} size={15} />
          {playing ? "Pause welcome" : line >= lines.length - 1 ? "Play again" : "Play welcome"}
          <span className="hs-wave" aria-hidden="true">{Array.from({ length: 14 }).map((_, i) => <i key={i} style={{ animationDelay: `${(i % 5) * 0.11}s` }} />)}</span>
        </button>
        <p className="hs-caption" aria-live="polite">{line >= 0 ? <span key={line}>{lines[line]}</span> : <em>Tap play to hear a welcome from the host.</em>}</p>
      </section>
      <div className="prog-pages" ref={pagesRef} onScroll={(ev) => setPage(Math.round(ev.currentTarget.scrollLeft / ev.currentTarget.clientWidth))}>
        <article className="prog-page">
          <p className="eyebrow">PAGE 1 · ABOUT THE SHOW</p>
          <div className="pp-about"><img src={photos.performer} alt="Performer on stage" /><span>{c.cadence}</span></div>
          <p className="lede">{c.about}</p>
        </article>
        <article className="prog-page">
          <p className="eyebrow">PAGE 2 · WHAT’S AT STAKE</p>
          <div className="pp-prize"><Icon name="trophy" size={34} /><small>GRAND PRIZE</small><strong>{isBdm ? "₦500,000" : c.prize}</strong></div>
          <div className="pp-facts"><div><strong>{c.contestants.toLocaleString()}</strong><small>Contestants</small></div><div><strong>{c.totalRounds}</strong><small>Rounds</small></div><div><strong>{c.category}</strong><small>Category</small></div></div>
          <div className="rewards"><div><span>Runner-up</span><strong>₦150,000 + homepage feature</strong></div><div><span>Top 10</span><strong>Verified creator badge</strong></div><div><span>Every round</span><strong>Gifts go straight to contestants</strong></div></div>
        </article>
        <article className="prog-page">
          <p className="eyebrow">PAGE 3 · THE RUNNING ORDER</p>
          <ol className="pp-order">{sched.map(([k, v], i) => {
            const now = i === nowKey, past = i < nowKey;
            return <li key={k} className={now ? "now" : past ? "past" : ""}><i />{<div><strong>{k}{now && <b>NOW</b>}</strong><span>{v}</span>{now && <em>Next stage in <span className="pp-clock">{hms}</span></em>}</div>}</li>;
          })}</ol>
        </article>
        <article className="prog-page">
          <p className="eyebrow">PAGE 4 · THE CONTESTANT’S JOURNEY</p>
          <ol className="pp-path">{journeySteps.map((s, i) => <li key={s} style={{ animationDelay: `${i * 90}ms` }}><b>{i + 1}</b><span>{s}</span></li>)}<li className="trophy"><b><Icon name="trophy" size={16} /></b><span>Winner crowned</span></li></ol>
        </article>
      </div>
      <div className="prog-dots">{[0, 1, 2, 3].map((i) => <button key={i} className={page === i ? "on" : ""} onClick={() => go(i)} aria-label={`Programme page ${i + 1}`} />)}</div>
    </>
  );
}

function NoticeBoard({ c }: { c: Comp }) {
  return (
    <section className="notice">
      <div className="notice-crest"><Icon name="scroll" size={20} /><span>OFFICIAL NOTICE · {c.name.toUpperCase()}</span></div>
      <ol>{houseRules(c).map(([t, b], i) => <li key={t}><b>{String(i + 1).padStart(2, "0")}</b><div><strong>{t}</strong><p>{b}</p></div></li>)}</ol>
      <div className="notice-stamp"><span>LAST UPDATED</span><strong>Sep 28 · D-Arena House</strong></div>
    </section>
  );
}

function BigScreen({ c, onPick, full }: { c: Comp; onPick: (i: number) => void; full: () => void }) {
  const a = useArena();
  const ranked = rankList(a.votesOf, c);
  const live = c.phase === "voting";
  if (!votingVisible(c.phase)) return (
    <section className="led off">
      <div className="led-head"><span className="led-badge muted">STANDBY</span><small>Round {c.round}</small></div>
      <div className="led-ticker"><span>VOTING OPENS AFTER THE SHOWCASE · VOTING OPENS AFTER THE SHOWCASE ·</span></div>
      <LockedNote icon="clock" title={c.phase === "showcase" ? "Voting not open yet" : "No rankings yet"} copy={c.phase === "showcase" ? "Voting opens after every contestant has taken the stage." : "The scoreboard goes live the moment the audience starts voting."} />
    </section>
  );
  const pod = [ranked[1], ranked[0], ranked[2]];
  return (
    <section className="led">
      <div className="led-head">{live ? <span className="led-badge"><i className="live-dot live" />LIVE</span> : <span className="led-badge muted">FINAL</span>}<small>{live ? "Updated just now" : "Voting has ended"}</small></div>
      <div className="led-podium">{pod.map((en, k) => en && (
        <button key={en.id} className={`lp-pod p${[2, 1, 3][k]}`} onClick={() => onPick(c.entries.indexOf(en))}>
          <span className="pod-light" /><img src={en.image} alt="" /><b>{[2, 1, 3][k]}</b><strong>{en.id === "me" ? "You" : en.handle}</strong><em>{fmt(a.votesOf(c.id, en))}</em><span className="pod-block" />
        </button>
      ))}</div>
      <div className="led-rows">{ranked.slice(3).map((en, i) => (
        <button key={en.id} className={en.id === "me" ? "me" : ""} onClick={() => onPick(c.entries.indexOf(en))}>
          <b>{i + 4}</b><img src={en.image} alt="" /><div><strong>{en.id === "me" ? "You" : en.handle}</strong><small>{en.name}</small></div><em>{a.votesOf(c.id, en).toLocaleString()}</em><i className={`mv ${en.trend}`}>{en.trend === "up" ? "▲" : en.trend === "down" ? "▼" : "–"}</i>
        </button>
      ))}</div>
      <button className="text-link" onClick={full}>Full leaderboard <Icon name="arrow" size={14} /></button>
    </section>
  );
}

function AnnouncementsStage({ c, onPick, full }: { c: Comp; onPick: (i: number) => void; full: () => void }) {
  const a = useArena();
  const j = a.journey;
  const ranked = rankList(a.votesOf, c);
  const last = lastDoneRound(c);
  const winner = c.phase === "completed" || (c.phase === "results" && c.round === c.totalRounds) ? ranked[0] : null;
  const k = Math.max(1, Math.min(c.safe * 4, Math.ceil(ranked.length * 0.6)));
  const advIds = new Set(ranked.slice(0, k).map((x) => x.id));
  const me = ranked.find((x) => x.id === "me");
  if (me && c.id === "bdm") { if (j.outcome === "eliminated") advIds.delete("me"); else advIds.add("me"); }
  const all = Array.from({ length: c.totalRounds }, (_, i) => i + 1);
  const rounds = [...all.filter((r) => roundDone(c, r)).reverse(), ...all.filter((r) => !roundDone(c, r))];
  return (
    <section className="announce">
      {winner && <div className="ann-winner">
        <span className="ann-cone" />
        <img src={winner.image} alt="" />
        <div><span><Icon name="trophy" size={14} /> {c.phase === "completed" ? "CHAMPION" : "WINNER"}</span><strong>{winner.id === "me" ? "You" : winner.name}</strong><small>{winner.handle} · {a.votesOf(c.id, winner).toLocaleString()} votes{c.phase === "completed" ? ` · Won ${c.prize}` : ""}</small></div>
      </div>}
      {!roundDone(c, c.round) && <div className="ann-pending">
        <i className={`live-dot ${c.phase === "voting" ? "live" : "open"}`} />
        <div><small>ROUND {c.round} · {rName(c.id, c.round).toUpperCase()}</small><strong>{c.phase === "closed" || c.phase === "processing" ? "Voting closed. Results are being confirmed." : "No results yet. Results are published after voting closes."}</strong></div>
      </div>}
      {rounds.map((r) => {
        const done = roundDone(c, r);
        const latest = r === last;
        if (!done) return r > c.round ? <div key={r} className="ann-locked"><Icon name="lock" size={12} /><span>{r === c.totalRounds ? "FINAL" : `ROUND ${r}`} · {rName(c.id, r)}</span><em>{r === c.round + 1 ? "Upcoming" : "Locked"}</em></div> : null;
        return (
          <div key={r} className={`ann-round ${latest ? "latest" : ""}`}>
            {latest && <span className="ann-spot" />}
            <div className="ann-round-head"><small>{r === c.totalRounds ? "FINAL" : `ROUND ${r}`}</small><strong>{rName(c.id, r)}</strong><span>{latest ? "Just announced" : "Completed"}</span></div>
            {latest ? <>
              <p className="ann-label">ADVANCED · TOP {c.safe * 4}</p>
              <div className="ann-grid">{ranked.filter((x) => advIds.has(x.id)).map((x) => <button key={x.id} className="lit" onClick={() => onPick(c.entries.indexOf(x))}><img src={x.image} alt="" /><strong>{x.id === "me" ? "You" : x.handle}</strong><small>{fmt(a.votesOf(c.id, x))}</small></button>)}</div>
              {ranked.some((x) => !advIds.has(x.id)) && <><p className="ann-label dim">ELIMINATED</p>
              <div className="ann-grid">{ranked.filter((x) => !advIds.has(x.id)).map((x) => <button key={x.id} className="out" onClick={() => onPick(c.entries.indexOf(x))}><img src={x.image} alt="" /><strong>{x.id === "me" ? "You" : x.handle}</strong><small>{fmt(a.votesOf(c.id, x))}</small></button>)}</div></>}
              <p className="rr-q">Qualified: Top {c.safe * 4} · <button onClick={full}>Full results</button></p>
            </> : <ol className="ann-top">{ranked.slice(0, 3).map((x, n) => <li key={x.id}><b>{n + 1}</b>{x.id === "me" ? "You" : x.handle}<em>{fmt(a.votesOf(c.id, x))}</em></li>)}</ol>}
          </div>
        );
      })}
    </section>
  );
}

/* ───────── Competition page: signposts into the show ───────── */

type ShowArea = "Overview" | "Rules" | "Leaderboard" | "Results";
const SHOW_AREAS: ShowArea[] = ["Overview", "Rules", "Leaderboard", "Results"];
const HOST = { name: "Funke Adeyemi", role: "Your host" };
const votingDateOf = (c: Comp) => (lobbySchedule(c).find(([k]) => /voting/i.test(k))?.[1] ?? "after the showcase");

function useCountUp(target: number, run: boolean, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / ms); setV(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return v;
}

function signTeaser(c: Comp, k: ShowArea, top3: Entry[]): { title: string; line: string; locked?: boolean; live?: boolean } {
  switch (k) {
    case "Overview": return { title: "Meet the show", line: `${c.prize} prize · ${c.totalRounds} rounds` };
    case "Rules": return { title: "House rules", line: `${houseRules(c).length} rules, read by your host` };
    case "Leaderboard": return votingVisible(c.phase)
      ? { title: "The big screen", line: top3[0] ? `${top3[0].handle} is leading` : "Rankings are in", live: c.phase === "voting" }
      : { title: "The big screen", line: `Lights up when voting opens · ${votingDateOf(c)}`, locked: true };
    default: { const last = lastDoneRound(c); return last ? { title: "Announcements", line: `Round ${last} results are in` } : { title: "Announcements", line: "Sealed until voting closes", locked: true }; }
  }
}

function Signposts({ c, onOpen }: { c: Comp; onOpen: (k: ShowArea) => void }) {
  const a = useArena();
  const top3 = rankList(a.votesOf, c).slice(0, 3);
  const icons: Record<ShowArea, string> = { Overview: "ticket", Rules: "scroll", Leaderboard: "scoreboard", Results: "mic" };
  const ref = useRef<HTMLElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setGo(true); return; }
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -230px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className={`fx-signs ${go ? "go" : ""}`} aria-label="Explore the show">
      <p className="fx-signs-kicker">FOLLOW THE SIGNS INTO THE SHOW</p>
      <div className="fx-signs-post">
        <span className="pole" aria-hidden="true"><i /></span>
        {SHOW_AREAS.map((k, i) => {
          const t = signTeaser(c, k, top3);
          const side = i % 2 === 0 ? "l" : "r";
          return (
            <button key={k} className={`fx-sign ${side} ${t.locked ? "locked" : ""}`} style={{ "--d": `${0.45 + i * 0.22}s` } as React.CSSProperties} onClick={() => onOpen(k)} aria-label={`${k}: ${t.title}. ${t.line}`}>
              <span className="nail a" /><span className="nail b" />
              <span className="ic"><Icon name={icons[k]} size={18} /></span>
              <span className="txt"><small>{k.toUpperCase()}{t.live && <b><i />LIVE</b>}</small><strong>{t.title}</strong><em>{t.locked && <Icon name="lock" size={11} />}{t.line}</em></span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function HostLine({ lines, autoplay }: { lines: string[]; autoplay: boolean }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => { if (i < lines.length - 1) setI(i + 1); else setPlaying(false); }, 2600);
    return () => window.clearTimeout(t);
  }, [i, playing]);
  const done = !playing && i === lines.length - 1;
  return (
    <div className={`fx-host ${playing ? "speaking" : ""}`}>
      <div className="who"><span className="av"><img src={photos.singer} alt="" /></span><div><b>{HOST.name}</b><small>{HOST.role}</small></div>
        <button className="fx-circle" onClick={() => { if (done) { setI(0); setPlaying(true); } else setPlaying(!playing); }} aria-label={playing ? "Pause host" : done ? "Replay host" : "Play host"}><Icon name={playing ? "pause" : done ? "rise" : "play"} filled={!playing && !done} size={18} /></button>
      </div>
      <p className="bubble" aria-live="polite"><span key={i}>{lines[i]}</span></p>
      <div className="steps">{lines.map((_, k) => <i key={k} className={k <= i ? "on" : ""} />)}</div>
    </div>
  );
}

/* ───────── Original host character (SVG) ───────── */
function HostFigure({ pose = "talk", talking = false, walking = false }: { pose?: "talk" | "card"; talking?: boolean; walking?: boolean }) {
  const skin = "#8a5a3b", skinD = "#714629", hair = "#1b120c", gold = "#e9b52f", goldD = "#b98513", ink = "#161616";
  return (
    <svg className={`hostfig ${walking ? "walking" : ""} ${talking ? "talking" : ""} pose-${pose}`} viewBox="0 0 170 320" aria-hidden="true">
      <ellipse cx="82" cy="312" rx="46" ry="6" fill="rgba(0,0,0,.45)" />
      <g className="leg l"><rect x="60" y="186" width="19" height="104" rx="8" fill={ink} /><path d="M56 290h26v8a4 4 0 0 1-4 4H58a6 6 0 0 1-6-6c0-3 2-6 4-6z" fill={gold} /></g>
      <g className="leg r"><rect x="84" y="186" width="19" height="104" rx="8" fill="#202020" /><path d="M82 290h26v6a6 6 0 0 1-6 6H86a4 4 0 0 1-4-4z" fill={gold} /></g>
      <g className="arm back">
        <path d="M56 116c-10 10-16 30-15 48" stroke={goldD} strokeWidth="15" strokeLinecap="round" fill="none" />
        <path d="M41 162c0 10 2 18 6 24" stroke={skin} strokeWidth="10" strokeLinecap="round" fill="none" />
      </g>
      <path d="M52 112c8-6 18-9 30-9s22 3 30 9l6 76H46z" fill={gold} />
      <path d="M82 104l-12 0 12 40 12-40z" fill={ink} />
      <path d="M70 104l12 40-16-6-6-30zM94 104l-12 40 16-6 6-30z" fill={goldD} />
      <rect x="46" y="182" width="72" height="10" rx="3" fill={ink} />
      <rect x="76" y="92" width="12" height="14" rx="4" fill={skinD} />
      <circle cx="82" cy="32" r="25" fill={hair} />
      <rect x="62" y="44" width="40" height="7" rx="3.5" fill={gold} />
      <ellipse cx="82" cy="70" rx="22" ry="25" fill={skin} />
      <path d="M60 64c2-16 12-22 22-22s20 6 22 22c-6-8-14-11-22-11s-16 3-22 11z" fill={hair} />
      <circle cx="59" cy="76" r="5" fill="none" stroke={gold} strokeWidth="2" />
      <circle cx="105" cy="76" r="5" fill="none" stroke={gold} strokeWidth="2" />
      <path d="M68 62l7-1.5M89 60.5l7 1.5" stroke={hair} strokeWidth="2" strokeLinecap="round" />
      <g className="eyes"><ellipse cx="73" cy="69" rx="2.6" ry="3.2" fill={hair} /><ellipse cx="91" cy="69" rx="2.6" ry="3.2" fill={hair} /></g>
      <path d="M80 72q2 6 0 8" stroke={skinD} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse className="mouth" cx="82" cy="85" rx="6" ry="3" fill="#5b1f1f" />
      {pose === "talk" ? (
        <g className="arm front mic">
          <path d="M110 116c8 10 12 22 8 34" stroke={goldD} strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M118 150c-4 10-12 16-20 18" stroke={skin} strokeWidth="10" strokeLinecap="round" fill="none" />
          <rect x="91" y="132" width="7" height="34" rx="3.5" fill={ink} transform="rotate(-24 94 150)" />
          <circle cx="89" cy="128" r="7.5" fill="#3a3a3a" stroke={goldD} strokeWidth="1.5" />
        </g>
      ) : (
        <g className="arm front hold">
          <path d="M110 116c12 4 22 12 30 20" stroke={goldD} strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M140 136c6 5 10 8 16 9" stroke={skin} strokeWidth="10" strokeLinecap="round" fill="none" />
          <circle cx="158" cy="145" r="6" fill={skin} />
        </g>
      )}
    </svg>
  );
}

function hostLines(c: Comp) {
  const sched = lobbySchedule(c);
  const now = sched[Math.max(0, lobbyNow(c))]?.[0];
  const about = c.about.split(/(?<=[.!?])\s+/).filter(Boolean);
  return [
    `Welcome to ${c.name}! I’m ${HOST.name}, your host.`,
    about[0] ?? c.about,
    `${c.contestants.toLocaleString()} contestants, ${c.totalRounds} rounds, and one winner.`,
    `The winner takes home ${c.prize}.`,
    c.phase === "upcoming" ? "Doors open soon. Set a reminder so you don’t miss it." : `We’re in the ${now ?? "showcase"} stage right now.`,
    "Everything you need is below. Enjoy the show!",
  ];
}

function HostStage({ c }: { c: Comp }) {
  const lines = hostLines(c);
  const [walking, setWalking] = useState(true);
  const [i, setI] = useState(-1);
  const [paused, setPaused] = useState(false);
  useEffect(() => { const t = window.setTimeout(() => { setWalking(false); setI(0); }, 1700); return () => window.clearTimeout(t); }, []);
  useEffect(() => {
    if (i < 0 || paused || i >= lines.length - 1) return;
    const t = window.setTimeout(() => setI(i + 1), 3200);
    return () => window.clearTimeout(t);
  }, [i, paused]);
  const talking = i >= 0 && !paused;
  return (
    <div className="hv-stage" onClick={() => { if (i >= 0) setI(i >= lines.length - 1 ? 0 : i + 1); }}>
      <span className="hv-valance" /><span className="hv-cur l" /><span className="hv-cur r" />
      <span className="hv-spot" /><span className="hv-floor" />
      <div className={`hv-host ${walking ? "in" : ""}`}><HostFigure talking={talking && !walking} walking={walking} /></div>
      {i >= 0 && <div className="hv-bubble" key={i} role="status" aria-live="polite"><p>{lines[i]}</p>
        <div className="foot"><span className="dots">{lines.map((_, k) => <i key={k} className={k === i ? "on" : ""} />)}</span>
          <button onClick={(ev) => { ev.stopPropagation(); if (i >= lines.length - 1) { setI(0); setPaused(false); } else setPaused(!paused); }}>{i >= lines.length - 1 ? "Replay" : paused ? "Play" : "Pause"}</button></div>
      </div>}
      {i < 0 && <p className="hv-enter">Your host is walking in…</p>}
    </div>
  );
}

/* ───────── Live show pieces ───────── */
const liveLines = (h: string, voting: boolean): [string, string][] => [
  ["@kemi.b", "joined 👋"], ["@tunde_r", "sent Fire 🔥"], ["@ngozi.k", "This is so clean"],
  voting ? ["@alex", `voted for ${h} ⭐`] : ["@alex", "the energy!!"], ["@sofiapatel", "Let’s goooo"], ["@sam", "joined 👋"],
  ["@ife", "❤️❤️❤️"], ["@temi_dance", "sent Applause 👏 x5"], voting ? ["@maria", `sent 10 votes to ${h}`] : ["@maria", "who taught you this?"], ["@liam", "Lagos stand up 🙌"],
];

function LiveChat({ seed, handle, voting }: { seed: number; handle: string; voting: boolean }) {
  const [n, setN] = useState(4);
  useEffect(() => { const t = window.setInterval(() => setN((x) => x + 1), 1700); return () => window.clearInterval(t); }, []);
  const lines = liveLines(handle, voting);
  const from = Math.max(0, n - 5);
  return (
    <div className="lv-chat" aria-live="off">
      {Array.from({ length: n - from }, (_, k) => from + k).map((m) => { const [u, t] = lines[(m + seed * 3) % lines.length]; const sys = /joined|sent|voted/.test(t); return <p key={m} className={sys ? "sys" : ""}><b>{u}</b> {t}</p>; })}
    </div>
  );
}

function QuickVote({ c, en, my, more }: { c: Comp; en: Entry; my: number; more: () => void }) {
  const a = useArena();
  const [combo, setCombo] = useState(0);
  const [pops, setPops] = useState<number[]>([]);
  const idle = useRef(0);
  const press = useRef(0);
  const vote = () => {
    if (a.coins < VOTE_COST) { more(); return; }
    a.setCoins(a.coins - VOTE_COST);
    a.castVotes(c.id, en, 1, false);
    setCombo((k) => k + 1);
    const id = Date.now() + Math.random();
    setPops((p) => [...p.slice(-6), id]);
    window.setTimeout(() => setPops((p) => p.filter((x) => x !== id)), 900);
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => setCombo(0), 1600);
  };
  return (
    <div className="lv-vote-wrap">
      {combo > 1 && <span className="lv-combo" key={combo}>x{combo}</span>}
      {pops.map((p) => <span key={p} className="lv-pop">+1</span>)}
      <button className={`lv-vote ${my ? "voted" : ""}`}
        onPointerDown={() => { press.current = window.setTimeout(() => { press.current = -1; more(); }, 550); }}
        onPointerUp={() => { if (press.current === -1) { press.current = 0; return; } window.clearTimeout(press.current); press.current = 0; vote(); }}
        onPointerLeave={() => { if (press.current > 0) window.clearTimeout(press.current); }}
        onContextMenu={(ev) => ev.preventDefault()}
        aria-label={`Vote for ${en.handle}. Tap to vote, hold for more`}>
        <Icon name="star" size={18} filled /><span><b>Vote</b><small>{VOTE_COST} coins</small></span>
      </button>
    </div>
  );
}

/* ───────── Host show: round avatar narrates Overview → House rules → Join ───────── */
type HostSlide = { ch: "Overview" | "House rules" | "Join"; t: string; say: string; v: React.ReactNode };

function buildHostSlides(c: Comp, a: ArenaCtx, enter: () => void, register: (() => void) | null, replay: () => void): HostSlide[] {
  const sched = lobbySchedule(c);
  const nowKey = Math.max(0, lobbyNow(c));
  const about = c.about.split(/(?<=[.!?])\s+/).filter(Boolean);
  const rules = houseRules(c);
  const icons = ["users", "film", "bolt", "star", "trophy", "gift", "rise", "shield", "calendar"];
  const out: HostSlide[] = [
    { ch: "Overview", t: "Welcome to the show", say: `Good evening and welcome to ${c.name}! I’m ${HOST.name}, your host.`, v: <div className="hv-cover"><img src={c.image} alt="" /><span><b>{c.name}</b><small>{c.category} · {c.cadence}</small></span></div> },
    { ch: "Overview", t: "About the show", say: about.slice(0, 2).join(" "), v: <div className="hv-about"><p>{c.about}</p><div className="hv-chips"><span>{c.category}</span><span>{c.cadence}</span><span>{stageInfo(c).label}</span></div></div> },
    { ch: "Overview", t: "By the numbers", say: `${c.contestants.toLocaleString()} contestants. ${c.totalRounds} rounds. Only one winner.`, v: <div className="hv-stats"><div><b>{c.contestants.toLocaleString()}</b><small>Contestants</small></div><div><b>{c.totalRounds}</b><small>Rounds</small></div><div><b>1</b><small>Winner</small></div></div> },
    { ch: "Overview", t: "The prize", say: `The winner takes home ${c.prize}. The runner-up gets one hundred and fifty thousand naira and a homepage feature.`, v: <div className="hv-prize"><small>GRAND PRIZE</small><b>{c.prize}</b><span>Runner-up · ₦150,000 + homepage feature</span></div> },
    { ch: "Overview", t: "Where we are", say: c.phase === "upcoming" ? `It all starts soon. ${sched[0]?.[0] ?? "Registration"} opens ${sched[0]?.[1] ?? "soon"}.` : `Right now we’re in the ${sched[nowKey]?.[0] ?? "showcase"} stage. ${sched[nowKey + 1] ? `${sched[nowKey + 1][0]} comes next.` : ""}`,
      v: <div className="hv-sched">{sched.map(([k, d], i) => <div key={k} className={i === nowKey ? "now" : i < nowKey ? "past" : ""}><i /><b>{k}</b><small>{d}</small></div>)}</div> },
  ];
  if (c.entries.length) out.push({ ch: "Overview", t: "On the line-up", say: "Here are some of the faces you’ll see on stage. Tap any of them to watch.", v: <div className="hv-faces">{c.entries.slice(0, 6).map((p, i) => <button key={p.id} onClick={(ev) => { ev.stopPropagation(); a.go({ screen: "arena", comp: c.id, entry: i }); }}><img src={p.image} alt="" /><small>{p.id === "me" ? "You" : p.handle.replace("@", "")}</small></button>)}</div> });
  out.push({ ch: "House rules", t: "House rules", say: `Now, the house rules. There are ${rules.length} of them, and they keep things fair for everyone.`, v: <div className="hv-rule intro"><Icon name="scroll" size={28} /><b>{rules.length} house rules</b></div> });
  rules.forEach(([t, body], k) => out.push({ ch: "House rules", t: `Rule ${k + 1} of ${rules.length}`, say: body, v: <div className="hv-rule"><span className="ic"><Icon name={icons[k % icons.length]} size={18} /></span><small>RULE {k + 1} OF {rules.length}</small><b>{t}</b><p>{body}</p></div> }));
  out.push({ ch: "Join", t: "Your move", say: register ? "That’s everything. Want to watch? Enter the Arena. Want to compete? Register now." : "That’s everything. Take your seat and enjoy the show!",
    v: <div className="hv-join" onClick={(ev) => ev.stopPropagation()}>
      <button className="fx-btn" onClick={enter}>{arenaOpen(c.phase) ? "Enter the Arena" : "Preview the Arena"}</button>
      {register && <button className="fx-btn md grey" onClick={register}>Register to compete</button>}
      <button className="fx-link" onClick={replay}><Icon name="rise" size={14} /> Replay from the start</button>
    </div> });
  return out;
}

/* One voice for the whole show: prefer Nigerian English, then other West/South African English, then UK English. */
let cachedHostVoice: SpeechSynthesisVoice | null = null;
function pickHostVoice(): SpeechSynthesisVoice | null {
  if (cachedHostVoice) return cachedHostVoice;
  try {
    const vs = window.speechSynthesis?.getVoices() ?? [];
    if (!vs.length) return null;
    const score = (v: SpeechSynthesisVoice) => (v.lang === "en-NG" || /nigeria/i.test(v.name) ? 1000 : 0) + (/ezinne|abeo/i.test(v.name) ? 50 : 0)
      + (/^en-(GH|KE|ZA)/i.test(v.lang) ? 300 : 0) + (/^en-GB/i.test(v.lang) ? 120 : 0) + (/female|ezinne|leah|libby|sonia|hazel|susan|zira|aria|jenny/i.test(v.name) ? 30 : 0)
      + (/natural|online/i.test(v.name) ? 20 : 0) + (v.lang.toLowerCase().startsWith("en") ? 10 : -500);
    cachedHostVoice = [...vs].sort((x, y) => score(y) - score(x))[0] ?? null;
    return cachedHostVoice;
  } catch { return null; }
}

function HostShow({ c, start, onClose }: { c: Comp; start: "Overview" | "Rules"; onClose: () => void }) {
  const a = useArena();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(() => pickHostVoice());
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => {
    const ss = window.speechSynthesis;
    if (!ss || voice) return;
    const on = () => setVoice(pickHostVoice());
    ss.addEventListener?.("voiceschanged", on);
    const t = window.setTimeout(on, 400);
    return () => { ss.removeEventListener?.("voiceschanged", on); window.clearTimeout(t); };
  }, []);
  const enter = () => { onClose(); a.go({ screen: "arena", comp: c.id }); };
  const register = regOpen(c) && !(c.id === "bdm" && a.journey.registered) ? () => { onClose(); a.go({ screen: "register", comp: c.id }); } : null;
  const slides = buildHostSlides(c, a, enter, register, () => { setI(0); setPaused(false); });
  const rulesAt = slides.findIndex((s) => s.ch === "House rules");
  useEffect(() => { if (start === "Rules") setI(rulesAt); }, []);
  const last = i === slides.length - 1;
  const s = slides[i];
  const dur = Math.max(4200, s.say.length * 70);
  useEffect(() => { if (paused || last) return; const t = window.setTimeout(() => setI((x) => Math.min(x + 1, slides.length - 1)), dur); return () => window.clearTimeout(t); }, [i, paused]);
  useEffect(() => {
    try {
      const ss = window.speechSynthesis; if (!ss) return;
      ss.cancel(); setSpeaking(false);
      if (!voiceOn || paused) return;
      const u = new SpeechSynthesisUtterance(s.say);
      if (voice) { u.voice = voice; u.lang = voice.lang; }
      u.rate = 0.97; u.pitch = 1;
      u.onstart = () => setSpeaking(true); u.onend = () => setSpeaking(false);
      ss.speak(u);
    } catch { /* speech not available */ }
  }, [i, voiceOn, paused, voice]);
  useEffect(() => () => { try { window.speechSynthesis?.cancel(); } catch { /* ignore */ } }, []);
  const tap = (ev: React.MouseEvent<HTMLDivElement>) => { const r = ev.currentTarget.getBoundingClientRect(); if (ev.clientX - r.left < r.width * 0.3) setI(Math.max(0, i - 1)); else if (!last) setI(i + 1); };
  const chapters: HostSlide["ch"][] = ["Overview", "House rules", "Join"];
  const talking = !paused && !last && (speaking || !voiceOn);
  return (
    <div className="hs tv">
      <div className="hs-bars">{slides.map((_, k) => <i key={k} className={k < i ? "done" : ""}>{k === i && <b key={`${i}-${paused}`} className={paused || last ? "hold" : ""} style={{ animationDuration: `${dur}ms` }} />}</i>)}</div>
      <div className="tv-top">
        <span className="bug"><LogoMark size={18} /><span><b>{c.name}</b><small>{s.ch}</small></span></span>
        <span className="onair"><i />ON AIR</span>
        <div className="hs-ctrl">
          <button onClick={() => setVoiceOn(!voiceOn)} aria-label={voiceOn ? "Mute host" : "Unmute host"}>{voiceOn ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="m17 9 5 5M22 9l-5 5" /></svg>}</button>
          <button onClick={onClose} aria-label="Close"><Icon name="x" size={20} /></button>
        </div>
      </div>
      <div className="tv-screen" onClick={tap}>
        <h3 key={`t${i}`}>{s.t}</h3>
        <div className="hs-vis" key={`v${i}`}>{s.v}</div>
      </div>
      <div className="tv-lower">
        <div className={`tv-anchor ${talking ? "speaking" : ""}`}><span className="r1" /><span className="r2" /><span className="face"><img src={fx.fan8} alt={HOST.name} /></span>{talking && <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>}</div>
        <div className="tv-strap">
          <span className="name"><b>{HOST.name.toUpperCase()}</b><small>YOUR HOST</small></span>
          <p className="cap" key={`c${i}`}>{s.say}</p>
        </div>
      </div>
      <div className="hs-foot">
        <button className="fx-circle" disabled={i === 0} onClick={() => setI(i - 1)} aria-label="Previous"><FxIcon src={fx.iArrowLeft} /></button>
        <div className="hs-ch">{chapters.map((ch) => <button key={ch} className={s.ch === ch ? "on" : ""} onClick={() => setI(slides.findIndex((x) => x.ch === ch))}>{ch}</button>)}</div>
        <button className="fx-circle" onClick={() => (last ? (setI(0), setPaused(false)) : setPaused(!paused))} aria-label={last ? "Replay" : paused ? "Play" : "Pause"}>{last ? <Icon name="rise" size={18} /> : paused ? <Icon name="play" size={18} filled /> : <Icon name="pause" size={18} />}</button>
      </div>
    </div>
  );
}

function CompSocialBar({ c }: { c: Comp }) {
  const a = useArena();
  const f = a.following.includes(c.id);
  const faces = c.entries.length ? c.entries.slice(0, 4).map((e) => e.image) : [fx.fan1, fx.fan2, fx.fan3, fx.fan4];
  const watching = 12438 + (c.contestants % 900);
  const timeLine = c.time || stageInfo(c).time;
  return (
    <div className="cs-bar">
      <div className="row">
        <span className="stack">{faces.map((s, k) => <img key={k} src={s} alt="" />)}</span>
        <span className="t"><b>{kfmt(c.contestants)}</b> contestants · <b>{kfmt(watching)}</b> watching</span>
        <button className={`fol ${f ? "on" : ""}`} onClick={() => { a.toggleFollow(c.id); a.toast(f ? `Unfollowed ${c.name}` : `You’ll get updates from ${c.name}`); }}>{f ? <><Icon name="check" size={14} /> Following</> : <><Icon name="bell" size={14} /> Follow</>}</button>
      </div>
      {timeLine && <span className="time"><Icon name="clock" size={13} />{timeLine}</span>}
    </div>
  );
}

function CompFeed({ c }: { c: Comp }) {
  const a = useArena();
  const ranked = rankList(a.votesOf, c);
  const showEntries = entriesVisible(c.phase) && ranked.length > 0;
  const list = votingVisible(c.phase) ? ranked : c.entries;
  const acts: [string, string, string][] = c.entries.length ? [
    [c.entries[0].image, `${c.entries[0].handle} posted a new entry`, "2m"],
    [fx.fan2, `@mariagonzalez ${c.phase === "voting" ? `voted for ${c.entries[1 % c.entries.length].handle}` : "followed this competition"}`, "6m"],
    [c.entries[2 % c.entries.length].image, `${c.entries[2 % c.entries.length].handle} is ${votingVisible(c.phase) ? `up ${2 + (c.contestants % 3)} places` : "warming up backstage"}`, "14m"],
    [fx.fan5, `${(1840 + (c.contestants % 400)).toLocaleString()} people joined the audience today`, "1h"],
  ] : [
    [fx.fan2, "@mariagonzalez followed this competition", "4m"],
    [fx.fan3, `${c.contestants.toLocaleString()} creators have registered so far`, "1h"],
    [fx.fan5, "Registration closes soon. Spots are filling up.", "2h"],
  ];
  return (
    <div className="cs-feed">
      <section>
        <div className="cs-h"><h4>{votingVisible(c.phase) ? "Top entries" : "Entries"}</h4>{showEntries && <button onClick={() => a.go({ screen: "arena", comp: c.id, entry: 0 })}>Watch all</button>}</div>
        {showEntries ? (
          <div className="cs-reels">{list.slice(0, 8).map((en, k) => (
            <button key={en.id} onClick={() => a.go({ screen: "arena", comp: c.id, entry: c.entries.indexOf(en) })}>
              <img src={en.image} alt="" />
              {votingVisible(c.phase) && <span className={`rk ${k < 3 ? "top" : ""}`}>#{k + 1}</span>}
              <span className="ov"><b>{en.id === "me" ? "You" : en.handle}</b><small><Icon name={votingVisible(c.phase) ? "star" : "play"} size={11} filled />{votingVisible(c.phase) ? `${fmt(a.votesOf(c.id, en))} votes` : `${fmt(stats(en).views)} views`}</small></span>
            </button>
          ))}</div>
        ) : (
          <div className="cs-empty"><span className="ic"><Icon name="film" size={20} /></span><div><b>{c.phase === "upcoming" ? "No entries yet" : "Entries go live at the showcase"}</b><small>{regOpen(c) ? "Register now and be one of the first on stage." : "Follow the competition to know when they drop."}</small></div></div>
        )}
      </section>
      <section>
        <div className="cs-h"><h4><i className="dot" />Happening now</h4></div>
        <div className="cs-acts">{acts.map(([img, t, time], k) => <div key={k} style={{ animationDelay: `${k * 0.08}s` }}><img src={img} alt="" /><p>{t}</p><time>{time}</time></div>)}</div>
      </section>
      <section className="cs-friends">
        <span className="stack">{[fx.fan6, fx.fan7, fx.fan8].map((s) => <img key={s} src={s} alt="" />)}</span>
        <p><b>Nia, Elijah and Sophia</b> are watching this competition</p>
        <button className="fx-btn md grey" onClick={() => a.toast("Invite link copied. Share it with your friends")}>Invite</button>
      </section>
    </div>
  );
}

function CreatePostSheet({ close }: { close: () => void }) {
  const a = useArena();
  const [pick, setPick] = useState<{ src: string; video: boolean } | null>(null);
  const [cap, setCap] = useState("");
  const [cat, setCat] = useState("Dance");
  const [tag, setTag] = useState<CompId | null>(null);
  const [posting, setPosting] = useState(false);
  const recents = [[fx.feed1, true, "0:42"], [fx.feed2, true, "1:05"], [fx.arenaDance, false, ""], [fx.hubDance, true, "0:28"], [fx.ob1Img1, false, ""], [fx.ob1Img3, true, "0:57"], [fx.ob1Img2, false, ""], [fx.arenaCooking, true, "0:33"]] as [string, boolean, string][];
  const open = (["bdm", "voice", "dance"] as CompId[]).map(a.comp);
  const post = () => { setPosting(true); window.setTimeout(() => { setPosting(false); close(); a.toast(tag ? `Posted and tagged to ${a.comp(tag).name}` : "Posted to your profile"); }, 1100); };
  return (
    <div className="fx fx-csheet-wrap" onClick={close}>
      <div className="fx-csheet fx-create-sheet" role="dialog" aria-label="Create a post" onClick={(ev) => ev.stopPropagation()}>
        <span className="grab" />
        <header>{pick ? <button className="x l" onClick={() => setPick(null)} aria-label="Back"><Icon name="back" size={20} /></button> : null}<b>{pick ? "New post" : "Create"}</b><button className="x" onClick={close} aria-label="Close"><Icon name="x" size={18} /></button></header>
        {!pick ? (
          <div className="list">
            <div className="cp-opts">
              <button onClick={() => setPick({ src: fx.feed1, video: true })}><span className="ic gold"><Icon name="camera" size={22} /></span><b>Record</b><small>Use your camera</small></button>
              <button onClick={() => setPick({ src: fx.feed2, video: true })}><span className="ic"><Icon name="film" size={22} /></span><b>Video</b><small>From your gallery</small></button>
              <button onClick={() => setPick({ src: fx.arenaDance, video: false })}><span className="ic"><Icon name="grid" size={22} /></span><b>Photo</b><small>Share an image</small></button>
              <button onClick={() => a.toast("Go Live unlocks at 1,000 followers")}><span className="ic red"><Icon name="fire" size={22} /></span><b>Go Live</b><small><Icon name="lock" size={10} /> 1,000 followers</small></button>
            </div>
            <div className="cp-h"><b>Recents</b><small>Tap to select</small></div>
            <div className="cp-grid">{recents.map(([src, video, d]) => <button key={src} onClick={() => setPick({ src, video })}><img src={src} alt="" />{video && <span>{d}</span>}</button>)}</div>
          </div>
        ) : (
          <div className="list cp-compose">
            <div className="cp-prev"><img src={pick.src} alt="" />{pick.video && <span className="play"><Icon name="play" size={22} filled /></span>}</div>
            <label className="cp-cap"><textarea value={cap} onChange={(ev) => setCap(ev.target.value.slice(0, 220))} placeholder="Write a caption… add #hashtags" rows={3} aria-label="Caption" /><small>{cap.length}/220</small></label>
            <div className="cp-h"><b>Category</b></div>
            <div className="fx-chips" style={{ padding: 0, flexWrap: "wrap" }}>{["Dance", "Music", "Gospel", "Comedy", "Spoken word", "Fashion"].map((x) => <button key={x} className={cat === x ? "on" : ""} onClick={() => setCat(x)}>{x}</button>)}</div>
            <div className="cp-h"><b>Add to a competition</b><small>Optional</small></div>
            <div className="cp-tags">{open.map((oc) => <button key={oc.id} className={tag === oc.id ? "on" : ""} onClick={() => setTag(tag === oc.id ? null : oc.id)}><img src={oc.image} alt="" /><span><b>{oc.name}</b><small>{stageInfo(oc).label}</small></span><i>{tag === oc.id && <Icon name="check" size={12} />}</i></button>)}</div>
          </div>
        )}
        {pick && <div className="cp-post"><button className="fx-btn" disabled={posting} onClick={post}>{posting ? "Posting…" : "Post"}</button></div>}
      </div>
    </div>
  );
}

function StageOverview({ c, openEntry }: { c: Comp; openEntry: (i: number) => void }) {
  const a = useArena();
  const [more, setMore] = useState(false);
  const sched = lobbySchedule(c);
  const nowKey = lobbyNow(c);
  const people = c.entries.slice(0, 12);
  const prizes: [string, string, string][] = [["trophy", "Winner", c.prize], ["star", "Runner-up", "₦150,000 + homepage feature"], ["shield", "Top 10", "Verified creator badge"]];
  return (
    <div className="sx">
      <HostStage c={c} />
      <section><h4>About</h4><p className={`sx-text ${more ? "" : "clamp"}`}>{c.about}</p><button className="sx-more" onClick={() => setMore(!more)}>{more ? "Show less" : "Read more"}</button></section>
      <div className="sx-facts">
        <div><small>Grand prize</small><b className="gold">{c.prize}</b></div>
        <div><small>Contestants</small><b>{c.contestants.toLocaleString()}</b></div>
        <div><small>Rounds</small><b>{c.totalRounds}</b></div>
        <div><small>Entry fee</small><b>Free</b></div>
      </div>
      <section>
        <div className="sx-h"><h4>Contestants</h4>{people.length > 0 && votingVisible(c.phase) && <button onClick={() => a.go({ screen: "leaderboard", comp: c.id })}>See all</button>}</div>
        {people.length ? <div className="sx-people">{people.map((p, i) => <button key={p.id} onClick={() => openEntry(i)}><span className="ring"><img src={p.image} alt="" /></span><small>{p.id === "me" ? "You" : p.handle.replace("@", "")}</small></button>)}</div>
          : <p className="sx-muted">Contestants are revealed when registration closes.{regOpen(c) ? " Register now to be one of them." : ""}</p>}
      </section>
      <section><h4>Prizes</h4><div className="sx-list">{prizes.map(([ic, k, v], i) => <div key={k}><span className={`ic ${i === 0 ? "gold" : ""}`}><Icon name={ic} size={18} /></span><span><small>{k}</small><b>{v}</b></span></div>)}</div></section>
      <section><h4>Schedule</h4><div className="fx-sched">{sched.map(([k, v], i) => <div key={k} className={i === nowKey ? "now" : i < nowKey ? "past" : ""}><span>{k}</span><i /><span>{v}</span></div>)}</div></section>
      <section className="sx-host"><img src={photos.singer} alt="" /><div><small>HOSTED BY</small><b>{HOST.name}</b><p>“{c.about.split(/(?<=[.!?])\s+/)[0]}”</p></div></section>
    </div>
  );
}

function StageRules({ c, onDone }: { c: Comp; onDone: () => void }) {
  const rules = houseRules(c);
  const n = rules.length;
  const [i, setI] = useState(0);
  const [drag, setDrag] = useState(0);
  const [walking, setWalking] = useState(true);
  const start = useRef<number | null>(null);
  useEffect(() => { const t = window.setTimeout(() => setWalking(false), 1500); return () => window.clearTimeout(t); }, []);
  const go = (k: number) => { if (k >= 0 && k <= n) setI(k); };
  const icons = ["users", "film", "bolt", "star", "trophy", "gift", "rise", "shield", "calendar"];
  const down = (ev: React.PointerEvent) => { start.current = ev.clientX; (ev.currentTarget as HTMLElement).setPointerCapture?.(ev.pointerId); };
  const move = (ev: React.PointerEvent) => { if (start.current !== null) setDrag(ev.clientX - start.current); };
  const up = () => { if (start.current === null) return; start.current = null; if (Math.abs(drag) > 60) go(drag < 0 ? i + 1 : i - 1); setDrag(0); };
  const say = i === 0 ? "Here are the house rules. Swipe the card when you’re ready." : i === n ? "That’s everything. Have fun out there!" : i === n - 1 ? "Last one. This one matters." : `Rule ${i + 1}. Keep going.`;
  return (
    <div className="sx sx-rules">
      <div className="hv-stage rules">
        <span className="hv-valance" /><span className="hv-cur l" /><span className="hv-cur r" />
        <span className="hv-spot" /><span className="hv-floor" />
        <div className={`hv-host card ${walking ? "in" : ""}`}><HostFigure pose="card" talking={!walking} walking={walking} /></div>
        {!walking && <div className="hv-say" key={i}>{say}</div>}
        <div className={`hv-deck ${walking ? "hidden" : ""}`}>
          {Array.from({ length: n + 1 }, (_, k) => k).filter((k) => k >= i - 1 && k <= i + 2).map((k) => {
            const pos = k - i;
            const style: React.CSSProperties = pos < 0 ? { transform: "translate(140%, -10%) rotate(18deg)", opacity: 0, zIndex: 20 }
              : pos === 0 ? { transform: `translateX(${drag}px) rotate(${-3 + drag / 16}deg)`, zIndex: 10, transition: drag ? "none" : undefined }
              : { transform: `translate(${pos * 6}px, ${pos * 6}px) rotate(${-3 + pos * 4}deg)`, zIndex: 10 - pos };
            const end = k === n;
            return (
              <article key={k} className={`hv-card ${end ? "end" : ""} ${pos > 0 ? "behind" : ""}`} style={style} onPointerDown={pos === 0 ? down : undefined} onPointerMove={pos === 0 ? move : undefined} onPointerUp={pos === 0 ? up : undefined} onPointerCancel={pos === 0 ? up : undefined} aria-hidden={pos !== 0}>
                {end ? <><span className="ic big"><Icon name="check" size={22} /></span><h3>You’re all set</h3><p>Fair play keeps the Arena fun for everyone.</p></>
                  : <><div className="top"><small>RULE {k + 1}/{n}</small><span className="ic"><Icon name={icons[k % icons.length]} size={16} /></span></div><h3>{rules[k][0]}</h3><p>{rules[k][1]}</p></>}
              </article>
            );
          })}
        </div>
      </div>
      <div className="sx-dots" aria-hidden="true">{Array.from({ length: n + 1 }, (_, k) => <i key={k} className={k === i ? "on" : ""} />)}</div>
      <div className="sx-nav">
        <button className="fx-circle" disabled={i === 0} onClick={() => go(i - 1)} aria-label="Previous rule"><FxIcon src={fx.iArrowLeft} /></button>
        {i === n ? <button className="fx-btn md" onClick={onDone}>Done</button> : <button className="fx-btn md" onClick={() => go(i + 1)}>{i === n - 1 ? "Finish" : "Next rule"}</button>}
      </div>
    </div>
  );
}

function StageBoard({ c, openEntry }: { c: Comp; openEntry: (i: number) => void }) {
  const a = useArena();
  const base = rankList(a.votesOf, c);
  const [bump, setBump] = useState<Record<string, number>>({});
  const [flash, setFlash] = useState<string | null>(null);
  const live = c.phase === "voting";
  useEffect(() => {
    if (!live || !base.length) return;
    const t = window.setInterval(() => {
      const en = base[Math.floor(Math.random() * Math.min(base.length, 6))];
      setBump((b) => ({ ...b, [en.id]: (b[en.id] ?? 0) + 3 + Math.floor(Math.random() * 40) }));
      setFlash(en.id);
    }, 1700);
    return () => window.clearInterval(t);
  }, [c.id, live]);
  if (!votingVisible(c.phase)) {
    const following = a.following.includes(c.id);
    return (
      <div className="sx sx-off">
        <div className="art"><img src={fx.voteClosed} alt="" /></div>
        <h3>{c.phase === "showcase" ? "Voting opens soon" : "No rankings yet"}</h3>
        <p>{c.phase === "showcase" ? "Voting opens after every contestant has taken the stage. The leaderboard goes live the moment it does." : `Rankings appear once voting opens · ${votingDateOf(c)}.`}</p>
        <div className="row">
          <button className={`fx-btn md ${following ? "grey" : ""}`} onClick={() => { a.toggleFollow(c.id); a.toast(following ? "Reminder removed" : "We’ll tell you when voting opens"); }}>{following ? "Reminder on" : "Remind me"}</button>
          {entriesVisible(c.phase) && <button className="fx-btn md grey" onClick={() => openEntry(0)}>Watch the entries</button>}
        </div>
      </div>
    );
  }
  const v = (en: Entry) => a.votesOf(c.id, en) + (bump[en.id] ?? 0);
  const list = [...base].sort((x, y) => v(y) - v(x));
  const max = v(list[0]) || 1;
  const cut = Math.max(1, Math.min(c.safe * 4, Math.ceil(list.length * 0.6)));
  const pod = [list[1], list[0], list[2]].filter(Boolean) as Entry[];
  return (
    <div className="sx sx-board">
      <div className="sx-boardhead">{live ? <span className="live"><i />LIVE</span> : <span>FINAL</span>}<small>{live ? (c.time || "Voting is open") : "Voting has ended"}</small></div>
      <div className="sx-podium">{pod.map((en) => { const r = list.indexOf(en) + 1; return (
        <button key={en.id} className={`p${r}`} onClick={() => openEntry(c.entries.indexOf(en))}>
          <span className="ring"><img src={en.image} alt="" /><b>{r}</b></span>
          <strong>{en.id === "me" ? "You" : en.handle}</strong>
          <em className={flash === en.id ? "flash" : ""} key={v(en)}>{v(en).toLocaleString()}</em>
        </button>); })}</div>
      <div className="sx-rows">{list.map((en, idx) => (
        <div key={en.id} style={{ display: "contents" }}>
          {idx === cut && <div className="sx-cut"><span>Advancing line · top {cut} go through</span></div>}
          <button className={`sx-row ${idx >= cut ? "risk" : ""} ${en.id === "me" ? "me" : ""} ${flash === en.id ? "flash" : ""}`} onClick={() => openEntry(c.entries.indexOf(en))}>
            <b>{idx + 1}</b><img src={en.image} alt="" />
            <span className="n"><strong>{en.id === "me" ? "You" : en.handle}</strong><span className="track"><i style={{ width: `${Math.max(6, (v(en) / max) * 100)}%` }} /></span></span>
            <span className="v"><strong>{fmt(v(en))}</strong><small className={en.trend}>{en.trend === "up" ? "▲ Rising" : en.trend === "down" ? "▼ Falling" : "– Stable"}</small></span>
          </button>
        </div>
      ))}</div>
      {live ? <button className="fx-btn md" onClick={() => openEntry(c.entries.indexOf(list[0]))}>Watch and vote</button> : <button className="fx-btn md grey" onClick={() => a.go({ screen: "leaderboard", comp: c.id })}>Full leaderboard</button>}
    </div>
  );
}

function StageResults({ c, openEntry }: { c: Comp; openEntry: (i: number) => void }) {
  const a = useArena();
  const ranked = rankList(a.votesOf, c);
  const [open, setOpen] = useState<number | null>(lastDoneRound(c) || null);
  const k = Math.max(1, Math.min(c.safe * 4, Math.ceil(ranked.length * 0.6)));
  if (c.phase === "upcoming" || !ranked.length && !lastDoneRound(c)) return (
    <div className="sx sx-off"><div className="art"><img src={fx.bellOff} alt="" className="bell" /></div><h3>No results yet</h3><p>Results for each round are published here after voting closes.</p></div>
  );
  return (
    <div className="sx sx-results">
      {Array.from({ length: c.totalRounds }, (_, i) => i + 1).map((r) => {
        const done = roundDone(c, r);
        const cur = r === c.round && !done;
        const final = c.phase === "completed" && r === c.totalRounds;
        const shown = ranked.slice(0, final ? 1 : Math.min(k, 6));
        const isOpen = done && open === r;
        return (
          <div key={r} className={`sx-round ${done ? "done" : cur ? "cur" : "later"}`}>
            <button className="head" onClick={() => done && setOpen(isOpen ? null : r)} disabled={!done}>
              <span className="num">{r}</span>
              <span className="t"><strong>{rName(c.id, r)}</strong><small>{done ? (final ? `Winner · ${ranked[0]?.handle}` : `Top ${k} advanced`) : cur ? (c.phase === "closed" || c.phase === "processing" ? "Results being confirmed" : "Results after voting closes") : "Upcoming"}</small></span>
              {done ? <span className="stack">{shown.slice(0, 3).map((x) => <img key={x.id} src={x.image} alt="" />)}</span> : <Icon name="lock" size={16} />}
              {done && <span className={`chev ${isOpen ? "up" : ""}`}><Icon name="down" size={18} /></span>}
            </button>
            {isOpen && <div className="list">
              {shown.map((x, n) => <button key={x.id} onClick={() => openEntry(c.entries.indexOf(x))} style={{ animationDelay: `${n * 0.06}s` }}><b>{n + 1}</b><img src={x.image} alt="" /><span>{x.id === "me" ? "You" : x.handle}</span><em>{fmt(a.votesOf(c.id, x))} votes</em></button>)}
              <button className="fx-link" onClick={() => a.go({ screen: "results", comp: c.id })}>View full results</button>
            </div>}
          </div>
        );
      })}
    </div>
  );
}

function ShowStage({ c, area, setArea, onClose }: { c: Comp; area: ShowArea; setArea: (k: ShowArea) => void; onClose: () => void }) {
  const a = useArena();
  const titles: Record<ShowArea, string> = { Overview: "Overview", Rules: "House rules", Leaderboard: "Leaderboard", Results: "Results" };
  const openEntry = (e: number) => { onClose(); a.go({ screen: "arena", comp: c.id, entry: Math.max(0, e) }); };
  const [closing, setClosing] = useState(false);
  const close = () => { setClosing(true); window.setTimeout(onClose, 220); };
  void setArea;
  if (area === "Overview" || area === "Rules") return <div className={`fx sx-stage hs-wrap ${closing ? "closing" : ""}`} role="dialog" aria-modal="true" aria-label={`${c.name} with your host`}><HostShow c={c} start={area === "Rules" ? "Rules" : "Overview"} onClose={close} /></div>;
  return (
    <div className={`fx sx-stage ${closing ? "closing" : ""}`} role="dialog" aria-modal="true" aria-label={titles[area]}>
      <header className="fx-navhead"><Back onClick={close} /><h1>{titles[area]}</h1><span /></header>
      <div className="sx-body">
        {area === "Leaderboard" && <StageBoard c={c} openEntry={openEntry} />}
        {area === "Results" && <StageResults c={c} openEntry={openEntry} />}
      </div>
    </div>
  );
}


function CompetitionDetail({ route }: { route: Route }) {
  const a = useArena();
  const c = a.comp(route.comp!);
  const j = a.journey;
  const isBdm = c.id === "bdm";
  const contestant = isBdm && j.registered;
  const [area, setAreaState] = useState<ShowArea | null>(route.tab && SHOW_AREAS.includes(route.tab as ShowArea) ? (route.tab as ShowArea) : null);
  const setArea = (k: ShowArea | null) => { setAreaState(k); a.patch({ tab: k ?? undefined }); };
  const open = arenaOpen(c.phase);
  const live = c.phase === "voting";
  const sched = lobbySchedule(c);
  const onsite = isBdm || c.id === "kings" || c.id === "voice";
  const me = c.entries.find((x) => x.id === "me");
  const st = contestant ? entryStatus(j, j.phase) : null;
  const myAction = () => (j.submitted && j.review === "approved" && me ? a.go({ screen: "arena", comp: c.id, entry: c.entries.indexOf(me) }) : a.go({ screen: "challenge", comp: c.id }));
  const crowd = [fx.fan1, fx.fan2, fx.fan3, fx.fan4];
  const audience = open ? `${(12438 + (c.contestants % 900)).toLocaleString()} people are taking their seats` : c.phase === "upcoming" ? `Doors open ${sched[0]?.[1] ?? "soon"}` : "Doors open at the showcase";
  return (
    <div className="fx fx-detail">
      <div className="fx-hero">
        <img className="bg" src={c.image} alt={`${c.name} stage`} />
        <div className="bar"><Back ring onClick={a.back} /><div>{isBdm && <HostButton />}<button className="fx-circle ring-fill" onClick={() => a.toast("Competition link copied")} aria-label="Share competition"><FxIcon src={fx.iShare} /></button></div></div>
        <span className="fx-status"><i className={live ? "live" : ""} />{phaseLabel(c.phase, c.round)}</span>
      </div>
      <div className="fx-dhead">
        <div>
          <h1>{c.name}</h1>
          <div className="meta">
            <span className="fx-meta"><FxIcon src={fx.iLocation} />Location: <b>{onsite ? "Onsite" : "Online"}</b></span>
            <span className="fx-meta"><FxIcon src={fx.iCalendar} />Date: <b>{passDates(sched)}</b></span>
          </div>
        </div>
        <span className="fee"><FxIcon src={fx.iMoneys} />FREE</span>
      </div>
      {contestant && st && <button className={`fx-mystatus ${st.tone}`} onClick={myAction}><span className="dot" /><span><small>YOU’RE COMPETING</small><b>{st.label}</b></span><Icon name="arrow" size={18} /></button>}
      <CompSocialBar c={c} />
      <Signposts c={c} onOpen={setArea} />
      <CompFeed c={c} />
      <div className="fx-cta">
        <div className="crowd"><span className="stack">{crowd.map((s) => <img key={s} src={s} alt="" />)}</span><span>{open && <i />}{audience}</span></div>
        <button className="fx-btn dark" onClick={() => a.go({ screen: "arena", comp: c.id })}>{open ? "Enter the Arena" : "Preview the Arena"}</button>
        {!contestant && (regOpen(c) ? <button className="second" onClick={() => a.go({ screen: "register", comp: c.id })}>Want to compete? <b>Register now</b></button> : <span className="note">Registration closed · watch, vote and support</span>)}
      </div>
      {area && <ShowStage c={c} area={area} setArea={(k) => setArea(k)} onClose={() => setArea(null)} />}
    </div>
  );
}


function LockedNote({ icon, title, copy }: { icon: string; title: string; copy: string }) {
  return <div className="locked-note"><span><Icon name={icon} size={22} /></span><strong>{title}</strong><p>{copy}</p></div>;
}

function Scoreboard({ c, limit, onPick }: { c: Comp; limit?: number; onPick: (i: number) => void }) {
  const a = useArena();
  const ranked = rankList(a.votesOf, c);
  return (
    <div className="scoreboard">
      {ranked.slice(0, limit ?? ranked.length).map((en, i) => (
        <button key={en.id} className={`sb-row ${i < 3 ? "top" : ""} ${en.id === "me" ? "me" : ""}`} onClick={() => onPick(c.entries.indexOf(en))}>
          <b>{i + 1}</b>
          <img src={en.image} alt="" />
          <div><strong>{en.id === "me" ? "You" : en.handle}{a.followsCreator(en.handle) && en.id !== "me" && <small>Following</small>}</strong><span>{en.name}</span></div>
          <em>{fmt(a.votesOf(c.id, en))}<small>votes</small></em>
          <i className={`trend ${en.trend}`}><Icon name={en.trend === "up" ? "rise" : en.trend === "down" ? "fall" : "flat"} size={13} /></i>
        </button>
      ))}
    </div>
  );
}

function LeaderboardScreen({ route }: { route: Route }) {
  const a = useArena();
  const c = a.comp(route.comp!);
  const ranked = rankList(a.votesOf, c);
  const me = c.entries.find((x) => x.id === "me");
  const live = c.phase === "voting";
  const pick = (i: number) => a.backTo({ screen: "arena", comp: c.id, entry: i });
  return (
    <>
      <SubBar title="Leaderboard" sub={c.name} onBack={a.back} />
      <main className="page lb-page">
        <div className="lb-head">
          <p>{c.name.toUpperCase()}</p>
          <h1>Round {c.round}</h1>
          <div><span className={live ? "live-chip" : "live-chip off"}>{live ? "● LIVE" : "FINAL"}</span><small>{live ? `Updated moments ago · ${c.time}` : "Voting has ended"}</small></div>
        </div>
        {votingVisible(c.phase) ? <>
          <div className="lb-top3">{[ranked[1], ranked[0], ranked[2]].map((en, k) => en && (
            <button key={en.id} className={`lb-p p${[2, 1, 3][k]}`} onClick={() => pick(c.entries.indexOf(en))}>
              <img src={en.image} alt="" /><b>{[2, 1, 3][k]}</b><strong>{en.id === "me" ? "You" : en.handle}</strong><span>{fmt(a.votesOf(c.id, en))}</span>
            </button>
          ))}</div>
          <p className="eyebrow">LIVE LEADERBOARD</p>
          <Scoreboard c={c} onPick={pick} />
          {me && <button className="lb-pin" onClick={() => pick(c.entries.indexOf(me))}><span>YOUR POSITION</span><strong>#{ranked.indexOf(me) + 1}</strong><em>{a.votesOf(c.id, me).toLocaleString()} votes</em><Icon name="arrow" size={15} /></button>}
        </> : <LockedNote icon="clock" title="Voting opens after the showcase." copy="The scoreboard goes live the moment the audience starts voting." />}
      </main>
    </>
  );
}

/* ───────────────────────── The Arena ───────────────────────── */

type ArenaPanel = null | "vote" | "gift" | "comments" | "share" | "gallery" | "search";

function Arena({ route }: { route: Route }) {
  const a = useArena();
  const c = a.comp(route.comp ?? "bdm");
  const list = c.entries;
  const st = stageInfo(c);
  const ranked = rankList(a.votesOf, c);
  const showcase = c.phase === "showcase";
  const voting = c.phase === "voting";
  const judgeMode = a.judging(c.id);
  const judgeAward = judgeMode ? a.judge.awards[a.judge.round] : undefined;
  const total = c.round === 1 ? c.contestants : list.length;
  const pos = (i: number) => (i === list.length - 1 ? total : i + 1);
  const [intro, setIntro] = useState(route.entry === undefined && !route.vote && !route.gift);
  const [loading, setLoading] = useState(!intro);
  const [failed, setFailed] = useState(typeof navigator !== "undefined" && !navigator.onLine);
  const [idx, setIdx] = useState(Math.max(0, Math.min(route.entry ?? 0, list.length - 1)));
  const [panel, setPanel] = useState<ArenaPanel>(route.vote ? "vote" : route.gift ? "gift" : null);
  const [giftPick] = useState(route.gift);
  const [giftSent, setGiftSent] = useState<{ g: (typeof gifts)[number]; to: string; k: number } | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [cheers, setCheers] = useState<Record<string, number>>({});
  const [tray, setTray] = useState(false);
  const [bursts, setBursts] = useState<{ id: number; e: string; x: number }[]>([]);
  const [complete, setComplete] = useState<0 | 1 | 2>(0);
  const [stageCard, setStageCard] = useState(!intro);
  const ref = useRef<HTMLDivElement>(null);
  const burstId = useRef(0);
  useEffect(() => {
    if (route.vote || route.gift) a.patch({ vote: false, gift: undefined });
    if (!intro) { const t = window.setTimeout(() => setLoading(false), 550); return () => window.clearTimeout(t); }
  }, []);
  useEffect(() => { if (!loading && !intro && ref.current) ref.current.scrollTop = idx * ref.current.clientHeight; }, [loading, intro]);
  useEffect(() => { if (intro || loading) return; setStageCard(true); const t = window.setTimeout(() => setStageCard(false), 1500); return () => window.clearTimeout(t); }, [idx, intro, loading, c.phase]);
  useEffect(() => {
    const key = (ev: KeyboardEvent) => { if (panel || intro) return; if (ev.key === "ArrowDown") next(); if (ev.key === "ArrowUp") jump(Math.max(idx - 1, 0)); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const i = Math.round(el.scrollTop / el.clientHeight);
    if (i !== idx && i >= 0 && i < list.length) { setIdx(i); setTray(false); a.patch({ entry: i }); }
  };
  const jump = (i: number) => {
    setPanel(null); setIdx(i); a.patch({ entry: i });
    const el = ref.current;
    if (el) el.scrollTo({ top: i * el.clientHeight, behavior: "smooth" });
  };
  const next = () => { if (idx < list.length - 1) jump(idx + 1); else if (showcase) setComplete(1); };
  const cheer = (emoji: string) => {
    const en = list[idx];
    setCheers((m) => ({ ...m, [en.id]: (m[en.id] ?? 0) + 1 }));
    const fresh = Array.from({ length: 5 }, (_, k) => ({ id: ++burstId.current, e: emoji, x: 10 + k * 9 + Math.random() * 10 }));
    setBursts((b) => [...b, ...fresh]);
    window.setTimeout(() => setBursts((b) => b.filter((x) => !fresh.includes(x))), 1600);
    setTray(false);
  };
  const startVoting = () => {
    if (c.id === "bdm") {
      a.setJourney((x) => ({ ...x, phase: "voting" }));
      a.notify({ icon: "bolt", tone: "coral", title: "Voting is now open", body: "Best Dance Moves · Round 1. The audience decides.", route: { screen: "arena", comp: "bdm", entry: 0 } });
    } else a.toast("We’ll tell you the moment voting opens");
    setComplete(0); jump(0);
  };
  const en = list[idx];

  const header = (
    <header className="arena-top">
      <button className="at-btn" onClick={a.back} aria-label="Leave the Arena"><Icon name="back" size={20} /></button>
      <div className="at-title">
        <strong>{c.name.toUpperCase()} <em>· ROUND {c.round}</em></strong>
        <span><i className={`live-dot ${st.tone}`} /><b className={st.tone}>{st.label.toUpperCase()}</b>{voting ? ` · ${c.time.replace("Ends in ", "")} remaining` : showcase && list.length ? ` · ${pos(idx)} / ${total}` : ""}</span>
      </div>
      <div className="at-right">
        {c.id === "bdm" && <button className="at-btn" onClick={a.openHost} aria-label="Host controls"><Icon name="sliders" size={17} /></button>}
        <button className="at-btn" onClick={() => setPanel("search")} aria-label="Search contestants"><Icon name="search" size={19} /></button>
        <button className="at-btn" onClick={() => setPanel("gallery")} aria-label="All entries"><Icon name="grid" size={18} /></button>
      </div>
      {showcase && list.length > 0 && <div className="show-progress"><i style={{ width: `${(pos(idx) / total) * 100}%` }} /></div>}
      {(judgeMode || a.seat) && <div className="at-chips">{a.seat && <span className="seat-chip"><Icon name="users" size={11} /> 12.4K watching<b>{a.seat}</b></span>}{judgeMode && <span className="jd-arena-chip"><Icon name="lock" size={11} /> Judge mode · Only you can see this</span>}</div>}
    </header>
  );

  if (failed) return <div className="arena arena-state">{header}<div className="as-body"><span className="as-icon"><Icon name="alert" size={26} /></span><h2>Something went wrong.</h2><p>We couldn’t load the Arena. Check your connection and try again.</p><button className="primary small" onClick={() => setFailed(!navigator.onLine)}>Try again</button></div></div>;
  if (!arenaOpen(c.phase) || !list.length) return (
    <div className="arena arena-state">
      <img className="as-tease" src={c.image} alt="" />
      {header}
      <div className="as-body">
        <p className="as-kicker">{c.name.toUpperCase()} · ROUND {c.round}</p>
        <h2>{c.phase === "upcoming" ? "Starts in 2d 14h" : c.phase === "challenge" ? "Contestants are rehearsing" : "The stage is empty"}</h2>
        <p>{c.phase === "upcoming" ? "No contestants yet. Registration opens soon — the stage fills once entries are approved." : c.phase === "registration" ? `${c.contestants} contestants registered. The showcase hasn’t started yet.` : "Entries will appear here once contestants begin submitting."}</p>
        <button className="primary small" onClick={() => a.act(c, "notify")}>{a.following.includes(c.id) ? "Reminder set" : "Set Reminder"}</button>
        <button className="ghost-btn" onClick={a.back}>Back to competition</button>
      </div>
    </div>
  );

  return (
    <div className="arena">
      <div className="arena-scroll" ref={ref} onScroll={onScroll}>
        {list.map((x, i) => {
          const mine = x.id === "me";
          const s = stats(x);
          const rank = ranked.indexOf(x) + 1;
          const my = a.myVotes(c.id, x);
          const isLiked = !!liked[x.id];
          const isSaved = !!saved[x.id];
          const fol = a.followsCreator(x.handle);
          const nx = list[i + 1];
          const last = i === list.length - 1;
          const cheering = Math.round(x.votes * 0.97) + (cheers[x.id] ?? 0);
          const viewers = 12438 + ((x.votes * 7) % 3000);
          const leader = ranked[0];
          const gap = leader && leader.id !== x.id ? a.votesOf(c.id, leader) - a.votesOf(c.id, x) : 0;
          return (
            <section key={x.id} className="slide lv" aria-label={`Contestant ${pos(i)}: ${x.handle}`} onDoubleClick={() => { setLiked((m) => ({ ...m, [x.id]: true })); cheer("❤️"); }}>
              <img className={`slide-media ${i === idx ? "on" : ""}`} src={x.image} alt={`${x.name} performing`} />
              <div className="lv-shade" />
              <div className="lv-top">
                <button className="lv-host" onClick={() => a.go({ screen: "creator", comp: c.id, handle: x.handle })}>
                  <img src={x.image} alt="" />
                  <span><b>{mine ? "You" : x.handle}</b><small>{fmt(s.likes + (isLiked ? 1 : 0))} likes</small></span>
                  {!mine && <span role="button" tabIndex={0} className={`plus ${fol ? "on" : ""}`} onClick={(ev) => { ev.stopPropagation(); a.toggleCreator(x.handle); if (!fol) a.toast(`You’re following ${x.handle}`); }} aria-label={fol ? "Following" : "Follow"}>{fol ? <Icon name="check" size={13} /> : <Icon name="plus" size={14} />}</span>}
                </button>
                <div className="lv-right">
                  <span className="lv-viewers"><span>{ranked.slice(0, 3).map((r) => <img key={r.id} src={r.image} alt="" />)}</span><b>{fmt(viewers)}</b></span>
                  <button className="lv-x" onClick={a.back} aria-label="Leave the Arena"><Icon name="x" size={20} /></button>
                </div>
              </div>
              <div className="lv-tags">
                <span className="lv-live">LIVE</span>
                <button onClick={() => setPanel("gallery")}><Icon name="trophy" size={12} />{c.name}</button>
                {votingVisible(c.phase) ? <span>#{rank} · {fmt(a.votesOf(c.id, x))} votes</span> : <span>{pos(i)}/{total} on stage</span>}
              </div>
              {voting && !mine && !judgeMode && (
                <div className="lv-goal">
                  <div className="bar"><i style={{ width: `${leader ? Math.max(8, (a.votesOf(c.id, x) / Math.max(1, a.votesOf(c.id, leader))) * 100) : 100}%` }} /></div>
                  <small>{gap > 0 ? `${gap.toLocaleString()} votes to #1` : "Leading the round"} · {c.time.replace("Ends in ", "")} left</small>
                </div>
              )}
              {i === idx && <LiveChat seed={i} handle={x.handle} voting={voting} />}
              {(showcase || voting) && (nx ? (
                <button className="lv-next" onClick={next}><img src={nx.image} alt="" /><span><small>Up next</small><b>{nx.id === "me" ? "You" : nx.handle}</b></span><Icon name="down" size={14} /></button>
              ) : showcase ? (
                <button className="lv-next end" onClick={next}><span><small>That’s everyone</small><b>Finish showcase</b></span><Icon name="arrow" size={14} /></button>
              ) : null)}
              <div className="lv-bar">
                <button className="lv-input" onClick={() => setPanel("comments")}>Add comment…</button>
                <button className="lv-ic" onClick={() => setPanel("share")} aria-label="Share"><FxIcon src={fx.iSend} size={22} /></button>
                <button className="lv-ic" onClick={() => { setLiked((m) => ({ ...m, [x.id]: true })); cheer("❤️"); }} aria-label="Like"><FxIcon src={isLiked ? fx.iHeartBold : fx.iHeart} size={22} /></button>
                <button className="lv-ic gift" onClick={() => setPanel("gift")} aria-label="Send a gift"><Icon name="gift" size={22} /></button>
                {mine && (showcase || voting) ? <button className="lv-cta ghost" onClick={() => setPanel("share")}>Share</button>
                  : voting && judgeMode ? (judgeAward ? <button className="lv-cta ghost" onClick={() => a.go({ screen: "judgeEntry", comp: c.id, pick: x.id })}><Icon name="lock" size={13} /> Judged</button> : <button className="lv-cta" onClick={() => a.go({ screen: "judgeEntry", comp: c.id, pick: x.id })}>JUDGE</button>)
                  : voting ? <QuickVote c={c} en={x} my={my} more={() => setPanel("vote")} />
                  : showcase ? null
                  : <button className="lv-cta ghost" onClick={() => a.go({ screen: c.phase === "closed" || c.phase === "processing" ? "leaderboard" : "results", comp: c.id })}>{c.phase === "closed" || c.phase === "processing" ? "Leaderboard" : "Results"}</button>}
              </div>
              {showcase && i === idx && <p className="lv-note">Voting opens after the showcase · double-tap to cheer</p>}
            </section>
          );
        })}
      </div>
      {showcase && list.length > 0 && <div className="lv-progress"><i style={{ width: `${(pos(idx) / total) * 100}%` }} /></div>}
      {c.id === "bdm" && <button className="lv-hostbtn" onClick={a.openHost} aria-label="Host controls"><Icon name="sliders" size={15} /> Host</button>}
      {tray && <div className="cheer-tray">{["👏", "🔥", "❤️", "🙌"].map((e) => <button key={e} onClick={() => cheer(e)}>{e}</button>)}</div>}
      <div className="bursts">{bursts.map((b) => <span key={b.id} style={{ left: `${b.x}%` }}>{b.e}</span>)}</div>
      {stageCard && en && (showcase || voting) && <div className="stage-card" key={`${idx}-${c.phase}`}><small>{voting ? "ON STAGE · VOTING LIVE" : idx === list.length - 1 ? "FINAL PERFORMANCE" : "NOW ON STAGE"}</small><strong>{en.id === "me" ? "You" : en.handle}</strong><em>{String(pos(idx)).padStart(2, "0")} / {total}</em></div>}
      <div className="arena-steps">
        <button disabled={idx === 0} onClick={() => jump(idx - 1)} aria-label="Previous contestant"><Icon name="up" size={16} /></button>
        <button disabled={idx === list.length - 1 && !showcase} onClick={next} aria-label="Next contestant"><Icon name="down" size={16} /></button>
      </div>
      {votingVisible(c.phase) && <button className="arena-lb" onClick={() => a.go({ screen: "leaderboard", comp: c.id })}><Icon name="trophy" size={14} /> Leaderboard</button>}
      {intro && <EntrySequence c={c} onDone={() => setIntro(false)} />}
      {loading && <div className="arena-loading"><div className="sk sk-a" /><div className="sk sk-b" /><div className="sk sk-c" /><span>Taking your seat…</span></div>}
      {complete > 0 && (
        <div className="show-complete">
          <div className="sc-curtain" />
          <div className="sc-body">
            <p>{c.name.toUpperCase()} · ROUND {c.round}</p>
            <h1>Showcase complete</h1>
            <span>{total} contestants have taken the stage.<br />The audience can now decide who moves forward.</span>
            {complete === 1 ? <button className="primary" onClick={() => setComplete(2)}>Continue <Icon name="arrow" /></button> : <div className="vote-open">
              <i className="live-dot live" /><strong>VOTING IS NOW OPEN</strong>
              <small>Ends in 18h 24m · 5 Coins per vote</small>
              <button className="primary" onClick={startVoting}>Start Voting <Icon name="arrow" /></button>
            </div>}
            {complete === 2 && <button className="ghost-btn" onClick={() => { startVoting(); a.go({ screen: "leaderboard", comp: c.id }); }}>View Leaderboard</button>}
            {complete === 1 && <button className="ghost-btn" onClick={() => setComplete(0)}>Keep watching</button>}
          </div>
        </div>
      )}
      {panel === "vote" && en && !judgeMode && <VoteSheet c={c} en={en} close={() => setPanel(null)} buyCoins={() => { a.patch({ entry: idx, vote: true }); a.go({ screen: "wallet", buy: true }); }} />}
      {panel === "gift" && en && <GiftSheet en={en} initial={giftPick} close={() => setPanel(null)} getCoins={(g) => { a.patch({ entry: idx, gift: g }); a.go({ screen: "wallet", buy: true }); }} sent={(g) => { setGiftSent({ g, to: en.handle, k: Date.now() }); const fresh = Array.from({ length: 6 }, (_, k) => ({ id: ++burstId.current, e: g.e, x: 8 + k * 8 })); setBursts((b) => [...b, ...fresh]); window.setTimeout(() => setBursts((b) => b.filter((x) => !fresh.includes(x))), 1600); window.setTimeout(() => setGiftSent(null), 3200); }} />}
      {giftSent && <div className="gift-sent" key={giftSent.k}><div className="gsent-card"><b>{giftSent.g.e}</b><div><strong>Gift sent</strong><span>{giftSent.g.cost.toLocaleString()} Coins to {giftSent.to}</span></div></div><p className="gsent-public"><b>@adanwosu</b> sent a {giftSent.g.name} {giftSent.g.e}</p></div>}
      {panel === "comments" && en && <CommentsSheet en={en} close={() => setPanel(null)} />}
      {panel === "share" && en && <ShareSheet en={en} close={() => setPanel(null)} />}
      {panel === "gallery" && <GalleryPanel c={c} close={() => setPanel(null)} pick={jump} />}
      {panel === "search" && <SearchPanel c={c} close={() => setPanel(null)} pick={jump} />}
    </div>
  );
}

/* ───────────────────────── Arena entry: take your seat ───────────────────────── */

const SEAT_ROWS = "ABCDEFGH".split("");
const seatsIn = (r: number) => 10 + r;
const seatTaken = (r: number, s: number) => (r * 7 + s * 13 + r * s * 3) % 10 < 7;
const seatFaces = [photos.portrait, photos.artist, photos.singer, photos.glow, photos.spotlight, photos.editorial, photos.fitness, photos.crowd];
const seatLabel = (p: [number, number]) => `Row ${SEAT_ROWS[p[0]]} · Seat ${p[1] + 1}`;
const parseSeat = (s: string | null): [number, number] | null => { const m = s?.match(/Row (\w) · Seat (\d+)/); return m ? [SEAT_ROWS.indexOf(m[1]), Number(m[2]) - 1] : null; };
const phoneLights = Array.from({ length: 34 }, (_, i) => ({ x: (i * 37) % 100, y: 52 + ((i * 53) % 44), d: (i % 7) * 0.32 }));

function Auditorium({ pick, setPick, mode }: { pick: [number, number] | null; setPick?: (p: [number, number]) => void; mode: "choose" | "seated" }) {
  return (
    <div className={`audit ${mode}`}>
      <div className="audit-stage"><span>STAGE</span></div>
      <div className="audit-rows">
        {SEAT_ROWS.map((row, r) => {
          const n = seatsIn(r);
          return (
            <div key={row} className="audit-row">
              <em>{row}</em>
              <div>{Array.from({ length: n }).map((_, s) => {
                const t = (s - (n - 1) / 2) / ((n - 1) / 2);
                const taken = seatTaken(r, s);
                const mine = pick?.[0] === r && pick?.[1] === s;
                const face = taken && (r + s) % 3 === 0;
                return (
                  <button key={s} disabled={taken || !setPick} className={`seat ${taken ? "taken" : "free"} ${mine ? "mine" : ""}`} style={{ transform: `translateY(${-t * t * (10 + r * 2)}px) rotate(${t * 14}deg)` }} onClick={() => setPick?.([r, s])} aria-label={`Row ${row} seat ${s + 1}${taken ? ", taken" : ""}`}>
                    {face && <img src={seatFaces[(r * 3 + s) % seatFaces.length]} alt="" />}
                  </button>
                );
              })}</div>
              <em>{row}</em>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SEAT_PICK_ROWS = 7;
const seatShort = (p: [number, number]) => `${SEAT_ROWS[p[0]]}${p[1] + 1}`;
const seatVip = (r: number, s: number) => { const n = seatsIn(r); const mid = (n - 1) / 2; return r === 0 || (r === 1 && Math.abs(s - mid) <= 2); };
function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg className="laurel" width="22" height="42" viewBox="0 0 34 64" style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true">
      <path d="M26 62C10 52 6 34 12 4" stroke="url(#lg)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {[10, 20, 30, 40, 50].map((y, k) => <g key={y}><ellipse cx={k < 2 ? 12 : 10 + k} cy={y} rx="7" ry="3.4" transform={`rotate(-38 ${k < 2 ? 12 : 10 + k} ${y})`} fill="url(#lg)" /><ellipse cx={k < 2 ? 18 : 16 + k} cy={y + 4} rx="6" ry="3" transform={`rotate(32 ${k < 2 ? 18 : 16 + k} ${y + 4})`} fill="url(#lg)" /></g>)}
      <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe58a" /><stop offset="1" stopColor="#b98513" /></linearGradient></defs>
    </svg>
  );
}

function SeatPicker({ c, pick, setPick, take, anywhere }: { c: Comp; pick: [number, number] | null; setPick: (p: [number, number]) => void; take: () => void; anywhere: () => void }) {
  const a = useArena();
  const vip = pick ? seatVip(pick[0], pick[1]) : false;
  const faces = c.entries.slice(0, 3).map((e) => e.image);
  return (
    <div className="sp">
      <div className="sp-hero">
        <img className="bg" src={c.image} alt="" />
        <span className="beams" aria-hidden="true"><i /><i /><i /><i /></span>
        <div className="bar">
          <button className="fx-circle ring-fill" onClick={a.back} aria-label="Leave"><FxIcon src={fx.iArrowLeft} /></button>
          <button className="fx-circle ring-fill" onClick={() => a.toast("Show link copied")} aria-label="Share"><FxIcon src={fx.iShare} /></button>
        </div>
        <div className="ttl">
          <small>{c.name.toUpperCase()} · ROUND {c.round}</small>
          <div className="row"><Laurel /><h2>TAKE YOUR SEAT</h2><Laurel flip /></div>
          <span className="aud"><span className="stack">{(faces.length ? faces : [fx.fan2, fx.fan3, fx.fan4]).map((f, k) => <img key={k} src={f} alt="" />)}</span><i />12,438 in the audience</span>
        </div>
      </div>
      <div className="sp-stage"><span>STAGE</span></div>
      <div className="sp-map">
        {SEAT_ROWS.slice(0, SEAT_PICK_ROWS).map((row, r) => {
          const n = seatsIn(r);
          return (
            <div key={row} className="sp-row">
              <em>{row}</em>
              <div>{Array.from({ length: n }).map((_, k) => {
                const t = (k - (n - 1) / 2) / ((n - 1) / 2);
                const taken = seatTaken(r, k) && (r * 3 + k) % 4 === 0;
                const v = seatVip(r, k);
                const mine = pick?.[0] === r && pick?.[1] === k;
                return (
                  <button key={k} disabled={taken} className={`ch ${taken ? "taken" : v ? "vip" : "free"} ${mine ? "mine" : ""}`} style={{ transform: `translateY(${-t * t * (6 + r * 2)}px) rotate(${t * 9}deg)` }} onClick={() => setPick([r, k])} aria-label={`Row ${row} seat ${k + 1}${taken ? ", taken" : v ? ", VIP" : ""}`}>
                    {mine && <Icon name="check" size={12} />}
                  </button>
                );
              })}</div>
              <em>{row}</em>
            </div>
          );
        })}
      </div>
      <div className="sp-legend"><span><i className="free" />Free</span><span><i className="vip" />VIP</span><span><i className="mine"><Icon name="check" size={9} /></i>Selected</span><span><i className="taken" />Taken</span></div>
      <div className="sp-ticket">
        <div className="tk" key={pick ? seatShort(pick) : "none"}>
          <span className="ic"><Icon name="ticket" size={22} /></span>
          <div><small>Your Seat</small><b>{pick ? seatShort(pick) : "--"}</b></div>
          <div><small>Seat Type</small><b>{pick ? (vip ? "VIP" : "Regular") : "--"}</b></div>
          <div><small>Price</small><b>{pick ? (vip ? "20 coins" : "Free") : "--"}</b></div>
        </div>
        <button className="chg" onClick={anywhere}><Icon name="rise" size={16} />{pick ? "Change" : "Seat me"}</button>
      </div>
      <button className="sp-take" disabled={!pick} onClick={take}><Icon name="ticket" size={22} /> TAKE MY SEAT</button>
      <p className="sp-note"><Icon name="info" size={15} /> You can change your seat anytime before the show starts.</p>
    </div>
  );
}

function EntrySequence({ c, onDone }: { c: Comp; onDone: () => void }) {
  const a = useArena();
  const [returning, setReturning] = useState(() => !!a.seat);
  const [doors, setDoors] = useState(true);
  const [step, setStep] = useState<"seat" | "seated" | "count" | "lights">(returning ? "count" : "seat");
  const [pick, setPick] = useState<[number, number] | null>(parseSeat(a.seat));
  const [n, setN] = useState(3);
  useEffect(() => { const t = window.setTimeout(() => setDoors(false), 2600); return () => window.clearTimeout(t); }, []);
  useEffect(() => { if (step !== "seated") return; const t = window.setTimeout(() => setStep("count"), 2400); return () => window.clearTimeout(t); }, [step]);
  useEffect(() => {
    if (step !== "count" || doors) return;
    setN(3); let k = 3;
    const t = window.setInterval(() => { k--; if (k <= 0) { window.clearInterval(t); setStep("lights"); } else setN(k); }, 1000);
    return () => window.clearInterval(t);
  }, [step, doors]);
  useEffect(() => { if (step !== "lights") return; const t = window.setTimeout(onDone, 2700); return () => window.clearTimeout(t); }, [step]);
  const take = (p: [number, number] | null = pick) => { if (!p) return; a.setSeat(seatLabel(p)); setStep("seated"); };
  const anywhere = () => {
    const free: [number, number][] = [];
    SEAT_ROWS.forEach((_, r) => { for (let s = 0; s < seatsIn(r); s++) if (!seatTaken(r, s)) free.push([r, s]); });
    const mid = free.filter(([r]) => r >= 2 && r <= 5);
    const pool = mid.length ? mid : free;
    const p = pool[Math.floor(Math.random() * pool.length)];
    setPick(p);
    window.setTimeout(() => take(p), 750);
  };
  return (
    <div className={`seq step-${step}`}>
      {step === "seat" && <SeatPicker c={c} pick={pick} setPick={setPick} take={() => take()} anywhere={anywhere} />}
      {step === "seated" && <div className="seq-seated">
        <Auditorium pick={pick} mode="seated" />
        <div className="seated-msg"><Icon name="check" size={22} /><h2>You’re seated</h2><p>{a.seat}</p><small>Get ready. The show starts in a moment.</small></div>
      </div>}
      {step === "count" && <div className="seq-count">
        <div className="count-stage" />
        <div className="phone-lights" aria-hidden="true">{phoneLights.map((p, i) => <i key={i} style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.d}s` }} />)}</div>
        <p className="count-kicker">{returning ? `Welcome back · ${a.seat}` : "Get ready"}</p><p className="count-sub">{a.seat} · {c.name}</p>
        {!doors && <strong className="count-num" key={n}>{n}</strong>}
        {returning && <button className="ghost-btn count-change" onClick={() => { setReturning(false); setStep("seat"); }}>Change seat</button>}
      </div>}
      {step === "lights" && <div className="seq-lights">
        <span className="spot s1" /><span className="spot s2" /><span className="spot s3" /><span className="spot s4" />
        <div className="curtain"><i /></div>
      </div>}
      {doors && <div className="fx-curtains" aria-hidden="true"><span className="cur l" /><span className="cur r" /><span className="valance" /><span className="halo" /></div>}
    </div>
  );
}

const gifts = [
  { id: "applause", e: "👏", name: "Applause", cost: 10 },
  { id: "fire", e: "🔥", name: "Fire", cost: 50 },
  { id: "heart", e: "❤️", name: "Heart", cost: 100 },
  { id: "crown", e: "👑", name: "Crown", cost: 500 },
  { id: "champion", e: "🏆", name: "Champion", cost: 1000 },
];

function GiftSheet({ en, initial, close, getCoins, sent }: { en: Entry; initial?: string; close: () => void; getCoins: (g: string) => void; sent: (g: (typeof gifts)[number]) => void }) {
  const a = useArena();
  const [sel, setSel] = useState(initial ?? "fire");
  const [step, setStep] = useState<"pick" | "sending" | "short">("pick");
  const g = gifts.find((x) => x.id === sel)!;
  const send = () => {
    if (g.cost > a.coins) { setStep("short"); return; }
    setStep("sending");
    window.setTimeout(() => { a.setCoins(a.coins - g.cost); sent(g); close(); }, 900);
  };
  return (
    <div className="sheet-backdrop clear" onClick={step === "sending" ? undefined : close}>
      <div className="sheet gift-sheet" onClick={(ev) => ev.stopPropagation()}>
        <div className="sheet-handle" />
        {step === "short" ? <div className="v2-state">
          <div className="state-icon warn"><Icon name="wallet" size={24} /></div>
          <h2>Not enough Coins</h2>
          <p>You need {g.cost.toLocaleString()} Coins to send this gift.</p>
          <div className="v2-tally"><span>Your balance</span><strong>{a.coins.toLocaleString()} Coins</strong></div>
          <button className="primary" onClick={() => getCoins(sel)}>Get Coins</button>
          <button className="ghost-btn" onClick={() => setStep("pick")}>Cancel</button>
        </div> : <>
          <div className="gs-head"><div><span>SUPPORT THE CREATOR</span><h2>Send a Gift to {en.id === "me" ? "yourself" : en.handle}</h2></div><em>🪙 {a.coins.toLocaleString()}</em></div>
          <p className="gs-note">Gifts appreciate a creator. They aren’t votes and don’t change the ranking.</p>
          <div className="gift-grid">{gifts.map((x) => (
            <button key={x.id} className={sel === x.id ? "on" : ""} onClick={() => setSel(x.id)}>
              <b>{x.e}</b><strong>{x.name}</strong><small>{x.cost.toLocaleString()} Coins</small>
            </button>
          ))}</div>
          <button className="primary" disabled={step === "sending"} onClick={send}>{step === "sending" ? <><span className="btn-spinner" /> Sending {g.name}…</> : <>Send {g.name} · {g.cost.toLocaleString()} Coins</>}</button>
          <button className="ghost-btn" onClick={() => getCoins(sel)}>+ Get Coins</button>
        </>}
      </div>
    </div>
  );
}

function VoteSheet({ c, en, close, buyCoins }: { c: Comp; en: Entry; close: () => void; buyCoins: () => void }) {
  const a = useArena();
  const [n, setN] = useState(10);
  const [step, setStep] = useState<"choose" | "processing" | "done" | "short">("choose");
  const cost = n * VOTE_COST;
  const my = a.myVotes(c.id, en);
  const confirm = () => {
    if (cost > a.coins) { setStep("short"); return; }
    setStep("processing");
    window.setTimeout(() => { a.setCoins(a.coins - cost); a.castVotes(c.id, en, n, false); setStep("done"); }, 1100);
  };
  return (
    <div className="sheet-backdrop clear" onClick={step === "processing" ? undefined : close}>
      <div className="sheet vote2" onClick={(ev) => ev.stopPropagation()}>
        <div className="sheet-handle" />
        {step === "choose" && <>
          <div className="v2-head"><img src={en.image} alt="" /><div><span>ROUND {c.round} · {c.name.toUpperCase()}</span><h2>VOTE FOR {en.handle}</h2></div></div>
          <div className="v2-current"><span>Current votes</span><strong>{a.votesOf(c.id, en).toLocaleString()}</strong></div>
          {my > 0 && <div className="v2-already"><Icon name="check" size={15} /><p><strong>You voted for {en.handle} · {my} votes</strong>You can vote again — this round allows extra votes.</p></div>}
          <p className="v2-label">How many votes?</p>
          <div className="stepper"><button onClick={() => setN(Math.max(1, n - (n > 10 ? 5 : 1)))} aria-label="Fewer votes">−</button><strong>{n}</strong><button onClick={() => setN(Math.min(500, n + (n >= 10 ? 5 : 1)))} aria-label="More votes">+</button></div>
          <div className="v2-quick">{[10, 50, 100].map((q) => <button key={q} className={n === q ? "on" : ""} onClick={() => setN(q)}>{q}</button>)}</div>
          <div className="v2-coins"><div><span>{n} Votes</span><strong>{cost} Coins</strong></div><em>Balance {a.coins.toLocaleString()}</em></div>
          <button className="primary" onClick={confirm}>Confirm Votes</button>
        </>}
        {step === "processing" && <div className="v2-state"><span className="btn-spinner big" /><h2>Voting…</h2><p>Recording {n} votes for {en.handle}.</p></div>}
        {step === "done" && <div className="v2-state">
          <div className="state-icon ok"><Icon name="check" size={26} /></div>
          <h2>Votes recorded</h2>
          <p>+{n} votes for {en.handle}. Your support has been counted.</p>
          <div className="v2-tally"><span>{en.handle}</span><strong>{a.votesOf(c.id, en).toLocaleString()} votes</strong></div>
          <button className="primary" onClick={close}>Continue watching</button>
        </div>}
        {step === "short" && <div className="v2-state">
          <div className="state-icon warn"><Icon name="wallet" size={24} /></div>
          <h2>Not enough Coins</h2>
          <p>You need {cost} Coins to vote. You’re short {(cost - a.coins).toLocaleString()} Coins.</p>
          <button className="primary" onClick={buyCoins}>Buy Coins</button>
          <button className="ghost-btn" onClick={() => setStep("choose")}>Cancel</button>
        </div>}
      </div>
    </div>
  );
}

function CommentsSheet({ en, close }: { en: Entry; close: () => void }) {
  const [list, setList] = useState<[string, string, string][]>(en.id === "me" ? [] : [["@alex", "That footwork 🔥", "2m"], ["@temi", "She killed this!", "8m"], ["@sam", "Round 2 is yours!", "14m"], ["@ngozi.k", "That transition at 0:22 😮‍💨", "21m"], ["@kemi.b", "Lagos is proud of you", "1h"], ["@tunde_r", "Watched this five times already", "2h"]]);
  const [t, setT] = useState("");
  const total = en.id === "me" ? list.length : stats(en).comments + list.length - 6;
  const send = () => { if (!t.trim()) return; setList((l) => [["@adanwosu", t.trim(), "now"], ...l]); setT(""); };
  return (
    <div className="sheet-backdrop clear" onClick={close}>
      <div className="sheet comments" onClick={(ev) => ev.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="cm-head"><strong>COMMENTS <span className="cm-count">{total}</span></strong><button onClick={close} aria-label="Close"><Icon name="x" size={18} /></button></div>
        <div className="cm-list">{!list.length && <p className="cm-empty">No comments yet.<br />Be the first to cheer them on.</p>}{list.map(([h, body, time], i) => <div key={i} className="cm"><span>{h.slice(1, 2).toUpperCase()}</span><p><strong>{h} <small>{time}</small></strong>{body}</p><button aria-label="Like comment"><Icon name="heart" size={14} /></button></div>)}</div>
        <div className="cm-input"><input value={t} onChange={(ev) => setT(ev.target.value)} onKeyDown={(ev) => ev.key === "Enter" && send()} placeholder="Add a comment..." /><button disabled={!t.trim()} onClick={send}>Post</button></div>
      </div>
    </div>
  );
}

function ShareSheet({ en, close }: { en: Entry; close: () => void }) {
  const a = useArena();
  const opts: [string, string][] = [["share", "Copy link"], ["comment", "WhatsApp"], ["camera", "Instagram"], ["users", "Send to friends"]];
  return (
    <div className="sheet-backdrop clear" onClick={close}>
      <div className="sheet share" onClick={(ev) => ev.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="cm-head"><strong>Share {en.id === "me" ? "your entry" : `${en.handle}’s entry`}</strong><button onClick={close} aria-label="Close"><Icon name="x" size={18} /></button></div>
        <div className="share-grid">{opts.map(([ic, l]) => <button key={l} onClick={() => { close(); a.toast(l === "Copy link" ? "Link copied" : `Shared to ${l}`); }}><span><Icon name={ic} size={20} /></span>{l}</button>)}</div>
      </div>
    </div>
  );
}

function GalleryPanel({ c, close, pick }: { c: Comp; close: () => void; pick: (i: number) => void }) {
  const a = useArena();
  const [f, setF] = useState("All");
  let items = c.entries.map((en, i) => ({ en, i }));
  if (f === "Following") items = items.filter(({ en }) => a.followsCreator(en.handle));
  if (f === "Top") items = [...items].sort((x, y) => a.votesOf(c.id, y.en) - a.votesOf(c.id, x.en));
  if (f === "Rising") items = items.filter(({ en }) => en.trend === "up");
  return (
    <div className="arena-panel">
      <header className="ap-head"><button className="at-btn" onClick={close} aria-label="Back to the Arena"><Icon name="x" size={19} /></button><div><p>ROUND {c.round}</p><h2>All entries</h2></div><span>{c.contestants} entries</span></header>
      <div className="lite-filters">{["All", "Following", "Top", "Rising"].map((x) => <button key={x} className={f === x ? "on" : ""} onClick={() => setF(x)}>{x}</button>)}</div>
      {items.length ? <div className="ag-grid">{items.map(({ en, i }) => (
        <button key={en.id} className="ag-tile" onClick={() => pick(i)}>
          <img src={en.image} alt={`Entry by ${en.handle}`} />
          <div className="tile-gradient" />
          {en.id === "me" && <b className="entry-tag">YOU</b>}
          <div className="ag-copy"><img src={en.image} alt="" /><strong>{en.id === "me" ? "You" : en.handle}</strong><span>{votingVisible(c.phase) ? <><Icon name="bolt" size={10} />{fmt(a.votesOf(c.id, en))}</> : <><Icon name="eye" size={10} />{fmt(stats(en).views)}</>}</span></div>
        </button>
      ))}</div> : <div className="as-body small"><h2>{f === "Following" ? "No one you follow is competing" : "No entries found."}</h2><p>{f === "Following" ? "Follow contestants from the Arena and their entries collect here." : "Try another filter."}</p></div>}
    </div>
  );
}

function SearchPanel({ c, close, pick }: { c: Comp; close: () => void; pick: (i: number) => void }) {
  const a = useArena();
  const [q, setQ] = useState("");
  const t = q.trim().toLowerCase().replace(/^@/, "");
  const res = c.entries.map((en, i) => ({ en, i })).filter(({ en }) => !t || (en.handle + en.name + en.caption).toLowerCase().includes(t));
  return (
    <div className="arena-panel">
      <header className="ap-head search"><div className="search-box"><Icon name="search" size={17} /><input autoFocus value={q} onChange={(ev) => setQ(ev.target.value)} placeholder="Search contestants" /></div><button className="plain-link" onClick={close}>Cancel</button></header>
      <p className="eyebrow sp-label">{t ? "RESULTS" : "IN THIS ROUND"}</p>
      {res.length ? <div className="sp-list">{res.map(({ en, i }) => (
        <button key={en.id} onClick={() => pick(i)}><img src={en.image} alt="" /><div><strong>{en.id === "me" ? "You" : en.handle} <b className="verified">✓</b></strong><span>Round {c.round}{votingVisible(c.phase) ? ` · ${fmt(a.votesOf(c.id, en))} votes` : ` · ${en.name}`}</span></div><Icon name="play" size={15} filled /></button>
      ))}</div> : <div className="as-body small"><h2>No entries found.</h2><p>No contestant matches “{q}”. Check the spelling of their username.</p></div>}
    </div>
  );
}

function CreatorProfile({ route }: { route: Route }) {
  const a = useArena();
  const c = a.comp(route.comp ?? "bdm");
  const i = c.entries.findIndex((x) => x.handle === route.handle);
  const en = c.entries[i];
  const [tab, setTab] = useState("Activity");
  const [view, setView] = useState<ViewItem | null>(null);
  if (!en) return <div className="fx"><header className="fx-navhead"><Back onClick={a.back} /><h1>Creator</h1><span /></header><FxEmpty title="Profile unavailable" copy="This creator’s profile couldn’t be loaded." /></div>;
  const f = a.followsCreator(en.handle);
  const ranked = rankList(a.votesOf, c);
  const first = en.name.split(" ")[0];
  return (
    <div className="fx fx-prof">
      <ProfileSpotlight img={en.image} name={en.name} handle={en.handle} tagline={`${c.category} · Lagos`} kicker={`INTRODUCING · ${c.name.toUpperCase()}`} back={a.back} onMore={() => a.toast("Profile link copied")}
        bio={`${first} moves with intention: Afro, contemporary and everything in between. Teaching Saturdays in Yaba.`}
        stats={[[kfmt(Math.round(en.votes * 3.1) + (f ? 1 : 0)), "fans"], [String(40 + (en.votes % 60)), "posts", () => setTab("Posts")], [votingVisible(c.phase) ? `#${ranked.indexOf(en) + 1}` : "R" + c.round, votingVisible(c.phase) ? "rank" : "round"]]}>
        <button className={`fx-btn md ${f ? "grey" : ""}`} onClick={() => a.toggleCreator(en.handle)}>{f ? "Following" : "Follow"}</button><button className="fx-btn md grey" onClick={() => a.backTo({ screen: "arena", comp: c.id, entry: i })}>Watch entry</button>
      </ProfileSpotlight>
      <nav className="fx-tabs even fx-prof-tabs">{["Activity", "Posts"].map((t) => <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}</nav>
      {tab === "Activity" ? (
        <div className="fx-activity">
          <div className="fx-act">
            <span className="kind"><FxIcon src={fx.iMagic} size={18} />Competition entry · {c.name}</span>
            <div className="uh"><img src={en.image} alt="" /><div><b>{en.name}<span>{en.handle}</span></b><small>Round {c.round} · {votingVisible(c.phase) ? `${fmt(a.votesOf(c.id, en))} votes · #${ranked.indexOf(en) + 1}` : "Showcased"}</small></div></div>
            <p>{en.caption}</p>
            <button className="fx-media" onClick={() => a.backTo({ screen: "arena", comp: c.id, entry: i })} aria-label="Watch in the Arena"><img className="bg" src={en.image} alt="" /><span className="ctrl"><img src={fx.iPlayCircle} alt="" /><span className="vol"><img src={fx.iVolume} alt="" /></span></span></button>
          </div>
        </div>
      ) : (
        <div className="fx-grid2" style={{ margin: "0 -16px" }}>{gallery.slice(i % 4, (i % 4) + 6).map((g, k) => (
          <button className="fx-ccard" key={g.title} onClick={() => setView({ image: g.image, handle: en.handle, avatar: en.image, time: `${k + 1}d`, caption: g.title, likes: 300 + k * 41, comments: 12 + k, shares: 4 + k })}>
            <span className="m"><img src={g.image} alt={g.title} /><span className="views"><FxIcon src={fx.iPlay} size={18} />{g.views}</span></span>
            <span className="i"><p>{g.title}</p><span className="u"><img className="fx-avatar" src={en.image} width={30} height={30} alt="" /><span>{en.handle}</span></span></span>
          </button>
        ))}</div>
      )}
      {view && <FxViewer v={view} onClose={() => setView(null)} />}
    </div>
  );
}


function JourneyPanel({ c, openArena }: { c: Comp; openArena: (i?: number) => void }) {
  const a = useArena();
  const j = a.journey;
  const [allSup, setAllSup] = useState(false);
  const me = c.entries.find((x) => x.id === "me");
  const ranked = rankList(a.votesOf, c);
  const pos = me ? ranked.indexOf(me) + 1 : 0;
  const adv = j.phase === "results" && j.outcome === "advanced";
  const out = j.phase === "results" && j.outcome === "eliminated";
  const ch = challenges[j.round - 1];
  const nextRound = () => {
    a.setJourney((x) => ({ ...x, round: Math.min(x.round + 1, 5), phase: "challenge", submitted: false, review: "none", caption: "" }));
    a.go({ screen: "challenge", comp: "bdm" });
  };
  const sup: [string, number][] = [["@alex", 120], ["@temi", 80], ["@sam", 45], ["@ngozi.k", 38], ["@kemi.b", 30], ["@tunde_r", 22]];
  let card: React.ReactNode;
  if (adv && j.round === 5) card = <div className="jc win"><p>GRAND FINAL · COMPLETE</p><h3>You won Best Dance Moves.</h3><span>Five rounds. One Winner. {c.prize} is on its way to your Earnings.</span><button className="primary" onClick={() => a.go({ screen: "results", comp: "bdm" })}>View Final Results <Icon name="arrow" /></button></div>;
  else if (adv) card = <div className="jc ok"><p>ROUND {j.round} ✓</p><h3>You advanced.</h3><span>Round {j.round + 1} · {roundNames[j.round]} — challenge unlocked.</span><button className="primary" onClick={nextRound}>View Round {j.round + 1} <Icon name="arrow" /></button><button className="ghost-btn" onClick={() => a.go({ screen: "results", comp: "bdm" })}>See Round {j.round} results</button></div>;
  else if (out) card = <div className="jc ended"><p>ROUND {j.round} · COMPLETED</p><h3>Your journey has ended.</h3><span>Final position <b>#18</b> of {c.contestants}. Your competition journey has ended — your entry stays on your profile.</span><button className="ghost-btn" onClick={() => a.go({ screen: "results", comp: "bdm" })}>View Results</button><button className="ghost-btn" onClick={() => openArena()}>Keep watching the Arena</button></div>;
  else if (!j.submitted && (j.phase === "challenge" || (j.phase === "showcase" && j.round === 1))) card = <div className="jc now"><p>ROUND {j.round} · CHALLENGE ACTIVE</p><h3>{roundNames[j.round - 1]}</h3><span>{ch.copy}</span><div className="jc-dead"><Icon name="clock" size={14} /> Deadline {ch.deadline} · {j.round === 1 ? "3d 12h" : "4d"} left</div><button className="primary" onClick={() => a.go({ screen: "challenge", comp: "bdm" })}>View Challenge Brief <Icon name="arrow" /></button></div>;
  else if (!j.submitted && j.phase === "registration") card = <div className="jc"><p>ROUND 1 · OPENS SOON</p><h3>Freestyle</h3><span>Round 1 starts in 2 days. You can read the brief now.</span><button className="ghost-btn" onClick={() => a.go({ screen: "challenge", comp: "bdm" })}>Preview the brief</button></div>;
  else if (!j.submitted) card = <div className="jc ended"><p>ROUND {j.round}</p><h3>Submissions closed</h3><span>You didn’t submit an entry before the deadline. You can still watch and vote in the Arena.</span><button className="ghost-btn" onClick={() => openArena()}>Explore Arena</button></div>;
  else if (j.review === "pending") card = <div className="jc"><p>ENTRY SUBMITTED</p><h3>Pending review</h3><span>We’re checking your entry against the requirements. This usually takes under 24 hours.</span><img className="jc-thumb" src={clips[j.clip]} alt="" /></div>;
  else if (j.review === "rejected") card = <div className="jc bad"><p>ENTRY NEEDS ATTENTION</p><h3>Rejected · fixable</h3><span>The audio track isn’t licensed for use. Replace it and resubmit before {ch.deadline}.</span><button className="primary" onClick={() => a.go({ screen: "submit", comp: "bdm" })}>Update &amp; resubmit</button></div>;
  else if (!votingVisible(j.phase)) card = <div className="jc ok"><p>ENTRY APPROVED</p><h3>Your entry is now in the Arena.</h3><span>{j.phase === "showcase" ? "Fans can watch it now. Voting opens tomorrow." : "It goes on show to fans when submissions close."}</span><button className="primary" onClick={() => openArena(me ? c.entries.indexOf(me) : 0)}>View My Entry <Icon name="arrow" /></button></div>;
  else if (me) card = <>
    <div className="perf">
      <div className="perf-head"><p>MY PERFORMANCE</p><span className={j.phase === "voting" ? "live-chip" : "live-chip off"}>{j.phase === "voting" ? "● VOTING LIVE" : "VOTING CLOSED"}</span></div>
      <div className="perf-grid">
        <div className="big"><small>Current position</small><strong>#{pos}</strong></div>
        <div><small>Votes</small><strong>{fmt(a.votesOf("bdm", me))}</strong></div>
        <div><small>Views</small><strong>{fmt(stats(me).views)}</strong></div>
        <div><small>Likes</small><strong>{fmt(stats(me).likes)}</strong></div>
        <div><small>Supporters</small><strong>248</strong></div>
        <div><small>Voting ends</small><strong>{j.phase === "voting" ? "18h" : "Ended"}</strong></div>
      </div>
      {j.phase !== "voting" && <p className="perf-note">Voting has ended. Results are being confirmed.</p>}
      <button className="primary" onClick={() => openArena(c.entries.indexOf(me))}>View My Entry <Icon name="arrow" /></button>
    </div>
    <p className="eyebrow">LIVE LEADERBOARD</p>
    <div className="mini-board">{ranked.slice(Math.max(0, pos - 3), pos + 2).map((x) => <div key={x.id} className={x.id === "me" ? "me" : ""}><b>#{ranked.indexOf(x) + 1}</b><span>{x.id === "me" ? "You" : x.handle}</span><em>{fmt(a.votesOf("bdm", x))}</em></div>)}</div>
    <button className="text-link" onClick={() => a.go({ screen: "leaderboard", comp: "bdm" })}>Full leaderboard <Icon name="arrow" size={14} /></button>
    <p className="eyebrow">YOUR SUPPORTERS</p>
    <ul className="supporters">{sup.slice(0, allSup ? 6 : 3).map(([h, v]) => <li key={h}><span>{h.slice(1, 2).toUpperCase()}</span><strong>{h}</strong><em>{v} votes</em></li>)}</ul>
    <button className="text-link" onClick={() => setAllSup(!allSup)}>{allSup ? "Show less" : "View all supporters"} <Icon name={allSup ? "up" : "down"} size={14} /></button>
  </>;
  return (
    <section className="journey">
      <div className="j-head"><p>MY JOURNEY</p><h2>{c.name}</h2></div>
      <div className="j-rail">{roundNames.map((n, k) => {
        const r = k + 1;
        const state = r < j.round || (r === j.round && adv) ? "done" : r === j.round ? (out ? "ended" : "now") : "locked";
        return <div key={n} className={state}><i>{state === "done" ? "✓" : state === "now" ? "●" : state === "ended" ? "–" : <Icon name="lock" size={11} />}</i><strong>{r === 5 ? "Final" : `Round ${r}`}</strong><span>{state === "now" ? (votingVisible(j.phase) ? "Voting" : n) : state === "locked" ? "Locked" : n}</span></div>;
      })}</div>
      {card}
    </section>
  );
}

function RegisterScreen() {
  const a = useArena();
  const c = a.comp("bdm");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [unverified, setUnverified] = useState(false);
  const confirm = () => {
    setBusy(true);
    window.setTimeout(() => {
      a.setJourney((j) => ({ ...j, registered: true, phase: j.phase === "registration" || j.phase === "upcoming" ? "challenge" : j.phase }));
      a.notify({ icon: "check", tone: "violet", title: "You’re registered", body: "Best Dance Moves · Your Round 1 challenge is ready.", route: { screen: "challenge", comp: "bdm" } });
      a.go({ screen: "registered", comp: "bdm" });
    }, 900);
  };
  return (
    <>
      <SubBar title="Register" sub={c.name} onBack={a.back} />
      <main className="page flow-page">
        <div className="competition-mini"><img src={c.image} alt="" /><div><span>{phaseLabel(c.phase, c.round).toUpperCase()}</span><strong>{c.name}</strong></div></div>
        <h1>Become a contestant.</h1>
        <p className="subcopy">Registration gives you access to each round’s challenge. Watching, voting and gifting never require it.</p>
        <div className="reg-summary">
          {[["Competition", "Best Dance Moves · DARENA Talent Season 1"], ["Dates", "Showcase Oct 7 – 8 · Voting Oct 8 – 9 · Results Oct 10"], ["Round 1 challenge", "Freestyle — 30–60s of movement only you could make"], ["Grand prize", "₦500,000 + additional rewards"], ["Commitment", "Up to 5 rounds over 7 weeks · one entry per round"]].map(([k, v]) => <div key={k}><small>{k}</small><strong>{v}</strong></div>)}
        </div>
        <p className="eyebrow reg-elig">ELIGIBILITY</p>
        <div className="check-list">
          {[["Verified creator account", unverified ? "Verify your identity to compete" : "Your account is verified", !unverified], ["Age 18 or over", "Confirmed on your profile", true], ["Resident in Nigeria", "Lagos, NG", true], ["One entry per round", "You can replace it until the deadline", false]].map(([t, s, ok]) => (
            <div key={t as string}><span className={ok ? "ok" : "neutral"}><Icon name={ok ? "check" : "info"} size={15} /></span><p><strong>{t}</strong><small>{s}</small></p></div>
          ))}
        </div>
        <button className="text-link" onClick={() => setUnverified((x) => !x)}>{unverified ? "Preview: eligible account" : "Preview: not eligible"}</button>
        {unverified && <div className="info-note"><Icon name="alert" size={18} /><p><strong>You’re not eligible yet.</strong> Verify your account to register. You can still watch, vote and send gifts in the Arena.</p></div>}
        <div className="info-note"><Icon name="info" size={18} /><p>Submitting an entry is not the same as voting. Your entry is reviewed and showcased first; fans vote only once the host opens voting.</p></div>
        <label className="agree"><input type="checkbox" checked={agree} onChange={(ev) => setAgree(ev.target.checked)} /><span>I’ve read the competition rules and agree to the content guidelines.</span></label>
      </main>
      <div className="sticky-action"><button className="primary" disabled={!agree || busy || unverified} onClick={confirm}>{unverified ? "Verify account to register" : busy ? <><span className="btn-spinner" /> Confirming…</> : <>Confirm Registration <Icon name="arrow" /></>}</button></div>
    </>
  );
}

function RegisteredScreen() {
  const a = useArena();
  const live = a.journey.phase === "challenge" || a.journey.phase === "showcase";
  return (
    <main className="page celebrate">
      <div className="celebrate-glow" />
      <div className="success-ring big"><Icon name="check" size={44} /></div>
      <p className="success-eyebrow">DARENA TALENT SEASON 1</p>
      <h1>You’re in.</h1>
      <span>You’re officially registered for Best Dance Moves. {live ? "Your Round 1 challenge is waiting." : "We’ll notify you the moment the challenge drops."}</span>
      <div className="next-card"><small>NEXT MILESTONE</small><strong>Round 1 · Freestyle</strong><em>{live ? "3d 12h left to submit" : "Opens Oct 6 · 10:00 AM"}</em></div>
      <button className="primary" onClick={() => a.backTo({ screen: "challenge", comp: "bdm" })}>View my challenge <Icon name="arrow" /></button>
      <button className="ghost-btn" onClick={() => a.go({ screen: "challenge", comp: "bdm" })}>Open Round 1 challenge</button>
    </main>
  );
}

/* ───────────────────────── Challenge workspace ───────────────────────── */

function entryStatus(j: Journey, p: Phase): { label: string; tone: string; copy: string } {
  if (!j.submitted) return { label: "Not submitted", tone: "muted", copy: "Submit your entry before the deadline." };
  if (j.review === "rejected") return { label: "Entry needs attention", tone: "danger", copy: "The audio track isn’t licensed for use. Replace it and resubmit before the deadline." };
  if (j.review === "pending") return { label: "Pending review", tone: "pending", copy: "We’re checking your entry against the competition requirements." };
  if (p === "challenge") return { label: "Approved", tone: "ok", copy: "Your entry is now part of the competition. It’ll be showcased when the round closes." };
  if (p === "showcase") return { label: "Showcased", tone: "show", copy: "Your entry is visible to fans. Voting starts tomorrow." };
  if (p === "voting") return { label: "Competing", tone: "live", copy: "Voting is live. Share your entry to rally support." };
  if (p === "closed" || p === "processing") return { label: "Awaiting results", tone: "muted", copy: "Voting has ended. Results are being confirmed." };
  return j.outcome === "advanced" ? { label: "Advanced", tone: "ok", copy: `You’re moving to ${roundNames[j.round]}.` } : { label: "Eliminated", tone: "muted", copy: "Your journey in this competition has ended." };
}

function ChallengeScreen() {
  const a = useArena();
  const j = a.journey;
  const c = a.comp("bdm");
  const ch = challenges[j.round - 1];
  const st = entryStatus(j, c.phase);
  const open = c.phase === "challenge" || (c.phase === "showcase" && c.round === 1);
  const notYet = c.phase === "registration" || c.phase === "upcoming";
  const expired = !open && !notYet && !j.submitted;
  return (
    <>
      <SubBar title={roundNames[j.round - 1]} sub="Best Dance Moves" onBack={a.back} right={<HostButton />} />
      <main className="page flow-page challenge">
        <p className="eyebrow">CHALLENGE · {roundNames[j.round - 1].toUpperCase()}</p>
        <h1 className="challenge-title">{ch.title}</h1>
        <p className="lede">{ch.copy}</p>
        <div className="round-dots">{roundNames.map((n, i) => <span key={n} className={i + 1 < j.round ? "done" : i + 1 === j.round ? "now" : ""} title={n}>{i + 1 < j.round ? "✓" : i + 1 === j.round ? "●" : "○"}</span>)}<em>Round {j.round} of 5</em></div>
        {expired && <div className="banner danger"><Icon name="alert" size={17} /><p><strong>The deadline has passed</strong>Submissions for {roundNames[j.round - 1]} closed on {ch.deadline}. You can still watch the entries.</p></div>}
        {notYet && <div className="banner show"><Icon name="clock" size={17} /><p><strong>Round 1 opens in 2 days</strong>Read the brief now and start planning. Submissions open Oct 6.</p></div>}
        <div className="countdown">
          <div><span>TIME REMAINING</span><strong>{open ? <>3<small>d</small> 12<small>h</small> 40<small>m</small></> : notYet ? "Opens in 2d" : "Closed"}</strong></div>
          <em>Deadline<br />{ch.deadline}</em>
        </div>
        <p className="eyebrow">WHAT WE’RE LOOKING FOR</p>
        <ul className="criteria">{ch.criteria.map((x) => <li key={x}><Icon name="check" size={13} />{x}</li>)}</ul>
        <p className="eyebrow">REQUIREMENTS</p>
        <div className="requirements">
          <div><b>{ch.length}</b><span>Video duration</span></div><div><b>9:16</b><span>Vertical format</span></div><div><b>1</b><span>Entry per round</span></div>
        </div>
        <ul className="req-list"><li>Original work — no reposted content</li><li>Licensed or original audio</li><li>Face visible for at least 5 seconds</li></ul>
        {j.submitted && (
          <button className={`status-card ${st.tone}`} onClick={() => a.backTo({ screen: "challenge", comp: "bdm" })}>
            <img src={clips[j.clip]} alt="" />
            <div><small>ENTRY STATUS</small><strong>{st.label}</strong><span>{st.copy}</span></div>
            <Icon name="arrow" size={17} />
          </button>
        )}
        <section className="content-section flush"><p className="eyebrow">YOUR PROGRESS</p><RoundTimeline c={c} /></section>
      </main>
      <div className="sticky-action">
        {!j.submitted ? <button className="primary" disabled={!open} onClick={() => a.go({ screen: "submit", comp: "bdm" })}>{open ? <>Submit Entry <Icon name="arrow" /></> : notYet ? "Submissions open Oct 6" : "Submissions closed"}</button>
          : <button className="primary secondary" onClick={() => a.backTo({ screen: "challenge", comp: "bdm" })}>View My Entry <Icon name="arrow" /></button>}
      </div>
    </>
  );
}

/* ───────────────────────── Submit entry ───────────────────────── */

let uploadFailedOnce = false;

function SubmitFlow() {
  const a = useArena();
  const j = a.journey;
  const [step, setStep] = useState(1);
  const [clip, setClip] = useState<number | null>(j.review === "rejected" ? j.clip : null);
  const [caption, setCaption] = useState(j.caption);
  const [style, setStyle] = useState("Dance");
  const [original, setOriginal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const captionRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (step !== 4 || failed) return;
    const t = window.setInterval(() => setProgress((p) => {
      if (p >= 100) { window.clearInterval(t); return 100; }
      if (p >= 60 && !uploadFailedOnce) { uploadFailedOnce = true; window.clearInterval(t); setFailed(true); return p; }
      return p + 4;
    }), 70);
    return () => window.clearInterval(t);
  }, [step, failed]);
  useEffect(() => {
    if (step === 4 && progress >= 100) {
      a.setJourney((x) => ({ ...x, submitted: true, review: "pending", caption, clip: clip ?? 0 }));
      a.notify({ icon: "film", tone: "violet", title: "Your entry was received", body: `${roundNames[j.round - 1]} · Pending review`, route: { screen: "challenge", comp: "bdm" } });
      setStep(5);
    }
  }, [progress, step]);
  const titles = ["Choose your video", "Add the details", "Review submission"];
  return (
    <>
      {step < 4 && <SubBar title="Submit entry" sub={`Best Dance Moves · ${roundNames[j.round - 1]}`} onBack={() => (step > 1 ? setStep(step - 1) : a.back())} />}
      <main className="page flow-page entry-page">
        {step < 4 && <div className="progress-head"><span>STEP {step} OF 3 · {titles[step - 1].toUpperCase()}</span><div><i style={{ width: `${step * 33.34}%` }} /></div></div>}
        {step === 1 && <>
          <h1>{challenges[j.round - 1].title}</h1>
          <p className="subcopy">Pick one vertical video for {roundNames[j.round - 1]}. {challenges[j.round - 1].length}, 9:16.</p>
          <button className="upload-zone" onClick={() => a.toast("Camera opens on device")}><span><Icon name="camera" size={26} /></span><strong>Record a new take</strong><small>Opens your camera</small></button>
          <p className="eyebrow pick-label">OR CHOOSE FROM YOUR LIBRARY</p>
          <div className="clip-picker">{clips.map((src, i) => <button key={src} className={clip === i ? "active" : ""} onClick={() => setClip(i)}><img src={src} alt={`Clip ${i + 1}`} /><span>0:{[48, 56, 41][i]}</span>{clip === i && <b><Icon name="check" size={14} /></b>}</button>)}</div>
        </>}
        {step === 2 && clip !== null && <>
          <div className="preview-video short"><img src={clips[clip]} alt="Selected video preview" /><div className="play"><Icon name="play" filled size={24} /></div><button onClick={() => setStep(1)}>Replace</button></div>
          <label className="caption-field"><span>CAPTION</span><textarea ref={captionRef} maxLength={180} value={caption} onChange={(ev) => setCaption(ev.target.value)} placeholder="What inspired this performance?" /><small>{caption.length}/180</small></label>
          <p className="field-label">YOUR CRAFT</p>
          <div className="category-row tight">{["Dance", "Music", "Comedy", "Food", "Spoken word"].map((s) => <button key={s} className={style === s ? "active" : ""} onClick={() => setStyle(s)}>{s}</button>)}</div>
        </>}
        {step === 3 && clip !== null && <>
          <h1>Is this the one?</h1>
          <p className="subcopy">This is exactly what the host and fans will see.</p>
          <div className="review-card">
            <div className="review-media"><img src={clips[clip]} alt="Entry preview" /><div className="play"><Icon name="play" filled size={22} /></div></div>
            <dl>
              <div><dt>Competition</dt><dd>Best Dance Moves</dd></div>
              <div><dt>Round</dt><dd>{roundNames[j.round - 1]} · {challenges[j.round - 1].title}</dd></div>
              <div><dt>Craft</dt><dd>{style}</dd></div>
              <div><dt>Caption</dt><dd>{caption ? `“${caption}”` : <em>No caption</em>}</dd></div>
            </dl>
            <div className="review-actions"><button onClick={() => setStep(1)}><Icon name="film" size={15} /> Replace video</button><button onClick={() => { setStep(2); window.setTimeout(() => captionRef.current?.focus(), 50); }}><Icon name="edit" size={15} /> Edit caption</button></div>
          </div>
          <label className="agree"><input type="checkbox" checked={original} onChange={(ev) => setOriginal(ev.target.checked)} /><span>This is my original performance and follows the competition rules.</span></label>
        </>}
        {step === 4 && failed && <div className="processing failed"><div className="fail-icon"><Icon name="alert" size={30} /></div><h1>Upload interrupted</h1><p>Your connection dropped at {progress}%. Nothing was lost — your video and caption are saved as a draft on this device.</p><button className="primary" onClick={() => setFailed(false)}>Retry upload</button><button className="ghost-btn" onClick={() => { a.toast("Draft saved — finish before the deadline"); a.back(); }}>Save as draft</button></div>}
        {step === 4 && !failed && <div className="processing"><div className="ring-progress" style={{ ["--p" as string]: `${progress * 3.6}deg` }}><span>{progress}%</span></div><h1>Sending to the Arena…</h1><p>Uploading your entry. Keep D-Arena open for a moment.</p></div>}
        {step === 5 && <div className="success-state">
          <div className="success-ring"><Icon name="check" size={40} /></div>
          <p>ENTRY SUBMITTED</p>
          <h1>Your entry is in.</h1>
          <span>Best Dance Moves · {roundNames[j.round - 1]}<br />Your entry has been received.</span>
          <div className="pending-card"><div><small>STATUS</small><b>Pending review</b><em>Usually under 24 hours. Voting hasn’t opened yet.</em></div><i /></div>
          <button className="primary" onClick={() => a.backTo({ screen: "challenge", comp: "bdm" })}>View My Entry <Icon name="arrow" /></button>
        </div>}
      </main>
      {step === 1 && <div className="sticky-action"><button className="primary" disabled={clip === null} onClick={() => setStep(2)}>Continue <Icon name="arrow" /></button></div>}
      {step === 2 && <div className="sticky-action"><button className="primary" onClick={() => setStep(3)}>Review Submission <Icon name="arrow" /></button></div>}
      {step === 3 && <div className="sticky-action"><button className="primary" disabled={!original} onClick={() => { setProgress(0); setStep(4); }}>Submit Entry</button></div>}
    </>
  );
}

/* ───────────────────────── My entry ───────────────────────── */

function ResultsBody({ c }: { c: Comp }) {
  const a = useArena();
  const ranked = [...c.entries].sort((x, y) => a.votesOf(c.id, y) - a.votesOf(c.id, x));
  const w = ranked[0];
  if (!w) return null;
  return (
    <>
      <div className="winner-card">
        <img src={w.image} alt="" />
        <div className="winner-shade" />
        <span className="winner-badge"><Icon name="crown" size={13} filled /> {c.phase === "completed" ? "CHAMPION" : `${rName(c.id, c.round).toUpperCase()} WINNER`}</span>
        <div><strong>{w.id === "me" ? "You" : w.name}</strong><span>{w.handle} · {a.votesOf(c.id, w).toLocaleString()} votes</span>{c.phase === "completed" && <em>Won {c.prize}</em>}</div>
      </div>
      <p className="eyebrow results-label">{c.phase === "completed" ? "FINAL STANDINGS" : `${rName(c.id, c.round).toUpperCase()} RESULTS`}</p>
      <Scoreboard c={c} onPick={(i) => a.backTo({ screen: "arena", comp: c.id, entry: i })} />
    </>
  );
}

function ResultsScreen({ route }: { route: Route }) {
  const a = useArena();
  const c = a.comp(route.comp!);
  const j = a.journey;
  const me = c.entries.find((x) => x.id === "me");
  const ranked = [...c.entries].sort((x, y) => a.votesOf(c.id, y) - a.votesOf(c.id, x));
  const nextRound = () => {
    a.setJourney((x) => ({ ...x, round: Math.min(x.round + 1, 5), phase: "challenge", submitted: false, review: "none", caption: "" }));
    a.notify({ icon: "trophy", tone: "coral", title: "Your challenge is open", body: `Best Dance Moves · ${roundNames[j.round]}: ${challenges[j.round].title}`, route: { screen: "challenge", comp: "bdm" } });
    a.go({ screen: "challenge", comp: "bdm" });
  };
  return (
    <>
      <SubBar title="Results" sub={c.name} onBack={a.back} />
      <main className="page results">
        {c.id === "bdm" && <div className="result-steps">{["Voting has ended", "Results are being confirmed", "Results are live"].map((x, k) => <span key={x} className={k <= (c.phase === "closed" ? 0 : c.phase === "processing" ? 1 : 2) ? "on" : ""}><i />{x}</span>)}</div>}
        {me && c.id === "bdm" && j.outcome === "advanced" && j.round === 5 ? (
          <div className="outcome advanced winner">
            <div className="celebrate-glow" />
            <p>WINNER · DARENA TALENT SEASON 1</p>
            <h1>You won the season.</h1>
            <span>Five rounds, {a.votesOf(c.id, me).toLocaleString()} votes in the Grand Final. {c.prize} is on its way to your Earnings.</span>
            <button className="primary" onClick={() => a.go({ screen: "wallet" })}>View Earnings <Icon name="arrow" /></button>
          </div>
        ) : me && c.id === "bdm" && (j.outcome === "advanced" ? (
          <div className="outcome advanced">
            <div className="celebrate-glow" />
            <p>YOU ADVANCED</p>
            <h1>{roundNames[j.round - 1]} complete.</h1>
            <span>You finished #{ranked.indexOf(me) + 1} with {a.votesOf(c.id, me).toLocaleString()} votes. You’re moving to {roundNames[j.round]}.</span>
            <button className="primary" onClick={nextRound}>View Round {j.round + 1} <Icon name="arrow" /></button>
          </div>
        ) : (
          <div className="outcome ended">
            <p>YOUR JOURNEY ENDS HERE</p>
            <h1>You finished #18</h1>
            <span>Thank you for performing. In {roundNames[j.round - 1]} you earned {a.votesOf(c.id, me).toLocaleString()} votes. Your entry stays on your profile.</span>
            <button className="primary secondary" onClick={() => document.querySelector(".results-label")?.scrollIntoView({ behavior: "smooth" })}>View Final Standing</button>
          </div>
        ))}
        <ResultsBody c={c} />
      </main>
    </>
  );
}

/* ───────────────────────── Judge experience ───────────────────────── */

type JudgeStatus = "invited" | "accepted" | "declined" | "expired" | "withdrawn" | "finished";
type JudgeWindow = "before" | "open" | "closing" | "closed";
type JudgeAward = { id: string; comment: string; video: "none" | "received" | "skipped" };
type Judge = { status: JudgeStatus; round: number; window: JudgeWindow; awards: Record<number, JudgeAward>; failNext: boolean; list: "ok" | "empty" | "error"; fresh: boolean };
type Push = { title: string; body: string; route: Route };

const JUDGE_COMP: CompId = "dance";
const JUDGE_POINTS = 10;
const JUDGE_FEE = "₦150,000";
const initialJudge: Judge = { status: "invited", round: 1, window: "open", awards: {}, failNext: false, list: "ok", fresh: false };
const judgeRounds = [
  { name: "Open Cypher", criterion: "Creativity", opens: "Oct 5 · 10:00 AM", dates: "Oct 5 – Oct 8", challenge: "Your signature style in 60 seconds.", copy: "One take, any song. Show the Arena the move that only you could make — and why it’s yours.", instructions: ["30–60 seconds, vertical 9:16", "One continuous take, no cuts", "Original or licensed audio"], desc: "Originality of ideas, choreography choices and how the dancer makes the brief their own.", look: ["Unexpected but intentional choices", "A clear personal style", "Fresh use of the music"] },
  { name: "Switch It Up", criterion: "Flexibility", opens: "Oct 12 · 10:00 AM", dates: "Oct 12 – Oct 15", challenge: "Two styles, one routine.", copy: "Start in one style and land in another. The switch should feel like a story, not a stitch.", instructions: ["45–75 seconds, vertical 9:16", "At least two distinct styles", "Transitions must be on camera"], desc: "Range of motion, control through extensions and how easily the dancer moves between levels and styles.", look: ["Control at full extension", "Smooth level changes", "Range across both styles"] },
  { name: "Final Cypher", criterion: "Skill", opens: "Oct 18 · 10:00 AM", dates: "Oct 18 – Oct 20", challenge: "Full routine, one take.", copy: "Everything you have. A complete routine that proves you’re the best dancer in the cypher.", instructions: ["60–90 seconds, vertical 9:16", "Full body in frame throughout", "One take, no edits"], desc: "Technical precision — timing, footwork, balance and clean execution from start to finish.", look: ["Clean, on-beat timing", "Footwork precision", "Balance and finish"] },
];
const judgeExtra: Entry[] = [
  e("d4", "Kay Bello", "@kaymoves", photos.artist, 4900, "up", "Footwork first, everything else after."),
  e("d5", "Zuri Okafor", "@zurimoves", photos.hero, 4620, "flat", "One take. One stage. Everything I’ve got."),
  e("d6", "Alex Mensah", "@alexgrooves", photos.dance, 4100, "up", "Accra came to play."),
  e("d7", "Sam Eze", "@sam", photos.fitness, 3800, "down", "Slowed it down to speed it up."),
  e("d8", "Ife Obi", "@ife", photos.editorial, 3240, "up", "Spotlight on, nerves off."),
];
const judgeAll = () => [...comps.find((c) => c.id === JUDGE_COMP)!.entries, ...judgeExtra];
const judgePool = (r: number) => judgeAll().slice(0, [8, 6, 4][r - 1] ?? 4);
const judgeEntry = (id?: string) => judgeAll().find((x) => x.id === id);
const clipLen = (id: string) => [58, 46, 52, 41, 55, 49, 38, 59][Number(id.slice(1)) - 1] ?? 50;
const windowInfo = (j: Judge): { label: string; tone: string; sub: string } => {
  const r = judgeRounds[j.round - 1];
  if (j.window === "before") return { label: `Judging opens ${r.opens}`, tone: "muted", sub: `Round ${j.round} judging window · ${r.dates}` };
  if (j.window === "closing") return { label: "Judging closes in 5h 59m", tone: "urgent", sub: "Award your points before the window closes" };
  if (j.window === "closed") return { label: "Judging closed", tone: "done", sub: `Round ${j.round} judging window has ended` };
  return { label: "Judging closes in 2d 5h", tone: "open", sub: `Round ${j.round} judging window · ${r.dates}` };
};

function JudgeSimChip() {
  const a = useArena();
  return <button className="host-chip" onClick={a.openJudgeSim}><Icon name="sliders" size={14} /> Judge sim</button>;
}

function PrivateTag() {
  return <div className="jd-private"><Icon name="lock" size={13} /><strong>Judge mode</strong><i />Only you can see this</div>;
}

function JudgeInvite() {
  const a = useArena();
  const j = a.judge;
  const c = a.comp(JUDGE_COMP);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  const [confirmDecline, setConfirmDecline] = useState(false);
  if (j.status === "declined" || j.status === "expired" || j.status === "withdrawn") return <JudgeInviteState status={j.status} />;
  const done = j.status === "accepted" || j.status === "finished";
  const accept = () => {
    setBusy(true); setErr(false);
    window.setTimeout(() => {
      setBusy(false);
      if (j.failNext) { a.setJudge((x) => ({ ...x, failNext: false })); setErr(true); return; }
      a.setJudge((x) => ({ ...x, status: "accepted", round: 1, window: "open" }));
      a.replace({ screen: "judgeAccepted" });
    }, 1000);
  };
  return (
    <>
      <div className="cd-hero jd-hero">
        <img src={c.image} alt={`${c.name} cover`} />
        <div className="cd-shade" />
        <button className="floating-back" onClick={a.back} aria-label="Go back"><Icon name="back" /></button>
        <div className="floating-right"><JudgeSimChip /></div>
        <div className="cd-title">
          <span className="cd-badge"><Icon name="mail" size={12} /> PRIVATE INVITATION</span>
          <h1>{c.name}</h1>
          <p className="cd-season">You’ve been invited to judge this competition</p>
          <div className="cd-facts"><span>{c.category}</span><span>Oct 1 – Oct 20</span><span>{c.totalRounds} rounds</span></div>
        </div>
      </div>
      <main className="cd-main with-cta jd-invite">
        {err && <div className="banner danger jd-err"><Icon name="alert" size={17} /><p><strong>Couldn’t accept the invite. Try again.</strong>Check your connection. Your answer hasn’t been sent.</p></div>}
        {done && <div className="banner ok jd-err"><Icon name="check" size={17} /><p><strong>You accepted this invite</strong>You’re on the judging panel for {c.name}.</p></div>}
        <section className="cd-sec">
          <p className="eyebrow">YOUR ROLE</p>
          <div className="jd-role">
            <div className="jd-role-top"><span className="jd-role-icon"><Icon name="shield" size={20} /></span><div><small>Role</small><strong>Judge</strong></div><span className="jd-only"><Icon name="lock" size={11} /> Private</span></div>
            <div className="jd-role-crit"><small>ROUND 1 CRITERION</small><strong>Creativity</strong><p>{judgeRounds[0].desc}</p></div>
            <p className="jd-role-note"><Icon name="info" size={13} /> Your criterion may change in later rounds.</p>
          </div>
        </section>
        <section className="cd-sec">
          <p className="eyebrow">REWARD</p>
          <div className="jd-reward"><strong>{JUDGE_FEE}</strong><span>Paid to your Arena wallet after the competition.</span></div>
        </section>
        <section className="cd-sec">
          <p className="eyebrow">HOW JUDGING WORKS</p>
          <ol className="jd-how">
            <li><b>1</b><span>Each round, you award your <strong>{JUDGE_POINTS} points</strong> to one contestant, based on your criterion.</span></li>
            <li><b>2</b><span>Once you submit, your award is locked. You can’t change it.</span></li>
            <li><b>3</b><span>You judge within each round’s judging window. We’ll remind you before it closes.</span></li>
            <li><b>4</b><span>Optionally add a short verdict video. It’s only shown when results are revealed.</span></li>
          </ol>
        </section>
        <section className="cd-sec">
          <div className="jd-confidential">
            <div className="jd-conf-head"><Icon name="lock" size={16} /><strong>Confidentiality &amp; conflict rules</strong></div>
            <ul>
              <li>Keep your role private. Don’t tell anyone, post, or hint that you’re judging this competition.</li>
              <li>You can’t vote as a fan in this competition while you’re a judge.</li>
              <li>If your role is disclosed, your invite will be withdrawn and the reward forfeited.</li>
            </ul>
          </div>
          {!done && <label className="agree"><input type="checkbox" checked={agree} onChange={(ev) => setAgree(ev.target.checked)} /><span>I agree to keep my role confidential and not vote in this competition.</span></label>}
          {!done && <p className="jd-expiry"><Icon name="clock" size={13} /> Respond by <strong>Oct 3 · 11:59 PM</strong></p>}
        </section>
      </main>
      <div className="sticky-action dual">
        {done ? <button className="primary" onClick={() => a.go({ screen: "competition", comp: JUDGE_COMP })}>Go to competition <Icon name="arrow" /></button> : <>
          <button className="ghost-btn" disabled={busy} onClick={() => setConfirmDecline(true)}>Decline</button>
          <button className="primary" disabled={!agree || busy} onClick={accept}>{busy ? <><span className="btn-spinner dark" /> Accepting…</> : err ? "Try again" : "Accept invite"}</button>
        </>}
      </div>
      {confirmDecline && <div className="sheet-backdrop" onClick={() => setConfirmDecline(false)}>
        <div className="sheet" onClick={(ev) => ev.stopPropagation()}>
          <div className="sheet-handle" />
          <div className="v2-state">
            <div className="state-icon warn"><Icon name="alert" size={24} /></div>
            <h2>Decline this invite?</h2>
            <p>You won’t judge {c.name}. This can’t be undone, and no one else will be told.</p>
            <button className="primary" onClick={() => { a.setJudge((x) => ({ ...x, status: "declined" })); setConfirmDecline(false); }}>Decline invite</button>
            <button className="ghost-btn" onClick={() => setConfirmDecline(false)}>Keep invite</button>
          </div>
        </div>
      </div>}
    </>
  );
}

function JudgeInviteState({ status }: { status: "declined" | "expired" | "withdrawn" }) {
  const a = useArena();
  const c = a.comp(JUDGE_COMP);
  const copy = {
    declined: { icon: "x", title: "You’ve declined this invite.", body: `You won’t be judging ${c.name}. You can still watch and support as a fan.`, reason: "" },
    expired: { icon: "clock", title: "This invite has expired.", body: `The response window for ${c.name} closed on Oct 3 · 11:59 PM.`, reason: "" },
    withdrawn: { icon: "lock", title: "This invite has been withdrawn.", body: `You’re no longer on the judging panel for ${c.name}, and the ${JUDGE_FEE} reward has been forfeited.`, reason: "Confidentiality rules were not followed." },
  }[status];
  return (
    <>
      <SubBar title="Judge invite" sub={c.name} onBack={a.back} right={<JudgeSimChip />} />
      <main className="page jd-state">
        <div className="jd-state-card">
          <img src={c.image} alt="" />
          <div><small>{c.category} · {c.totalRounds} rounds</small><strong>{c.name}</strong></div>
          <span className={`jd-state-pill ${status}`}>{status.toUpperCase()}</span>
        </div>
        <div className={`jd-state-icon ${status}`}><Icon name={copy.icon} size={26} /></div>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        {copy.reason && <div className="jd-reason"><small>REASON</small><strong>{copy.reason}</strong></div>}
        <button className="primary secondary" onClick={() => a.go({ screen: "competition", comp: JUDGE_COMP })}>View competition</button>
        <button className="ghost-btn" onClick={() => a.setTab("home")}>Back home</button>
      </main>
    </>
  );
}

function JudgeAccepted() {
  const a = useArena();
  const c = a.comp(JUDGE_COMP);
  return (
    <main className="page celebrate jd-accepted">
      <div className="celebrate-glow" />
      <div className="success-ring big jd-ring"><Icon name="shield" size={40} /></div>
      <p className="success-eyebrow">PRIVATE · JUDGING PANEL</p>
      <h1>You’re a judge for {c.name}.</h1>
      <span>Round 1 judging is open. Your criterion is Creativity.</span>
      <div className="jd-recap">
        <div><small>REWARD</small><strong className="gold">{JUDGE_FEE}</strong><em>Paid to your Arena wallet after the competition</em></div>
        <div><small>ROUND 1</small><strong>Creativity · {JUDGE_POINTS} pts</strong><em>Award them to one contestant</em></div>
      </div>
      <div className="jd-confidential compact">
        <div className="jd-conf-head"><Icon name="lock" size={15} /><strong>Keep it confidential</strong></div>
        <ul>
          <li>Don’t tell anyone, post, or hint that you’re judging.</li>
          <li>Fan voting is turned off for you in this competition.</li>
          <li>Disclosure withdraws your invite and forfeits the reward.</li>
        </ul>
      </div>
      <button className="primary" onClick={() => a.replace({ screen: "competition", comp: JUDGE_COMP })}>Go to competition <Icon name="arrow" /></button>
    </main>
  );
}

function JudgeWindowCard() {
  const j = useArena().judge;
  const w = windowInfo(j);
  return (
    <div className={`jd-window ${w.tone}`}>
      <span className="jd-window-icon"><Icon name={j.window === "closed" ? "lock" : "clock"} size={18} /></span>
      <div><strong>{w.label}</strong><small>{w.sub}</small></div>
      {(j.window === "open" || j.window === "closing") && <i className={`live-dot ${j.window === "closing" ? "live" : "open"}`} />}
    </div>
  );
}

function JudgeCompetition() {
  const a = useArena();
  const j = a.judge;
  const c = a.comp(JUDGE_COMP);
  const r = judgeRounds[j.round - 1];
  const award = j.awards[j.round];
  const pool = judgePool(j.round);
  const chosen = award ? judgeEntry(award.id) : undefined;
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  useEffect(() => { setLoading(true); const t = window.setTimeout(() => setLoading(false), 700); return () => window.clearTimeout(t); }, [retry, j.round, j.list]);
  useEffect(() => { if (!j.fresh) return; const t = window.setTimeout(() => a.setJudge((x) => ({ ...x, fresh: false })), 8000); return () => window.clearTimeout(t); }, [j.fresh]);
  const open = (id: string) => a.go({ screen: "judgeEntry", comp: JUDGE_COMP, pick: id });
  const btn = (x: Entry) => {
    if (award) return x.id === award.id ? <span className="jd-btn pick"><Icon name="star" size={12} filled /> Your pick</span> : <span className="jd-btn locked"><Icon name="lock" size={12} /> Locked</span>;
    if (j.window === "before") return <span className="jd-btn locked"><Icon name="clock" size={12} /> Opens {r.opens.split(" · ")[0]}</span>;
    if (j.window === "closed") return <span className="jd-btn locked"><Icon name="lock" size={12} /> Closed</span>;
    return <span className="jd-btn"><Icon name="star" size={12} /> Judge</span>;
  };
  return (
    <>
      <div className="cd-hero jd-hero short">
        <img src={c.image} alt={`${c.name} competition`} />
        <div className="cd-shade" />
        <button className="floating-back" onClick={a.back} aria-label="Go back"><Icon name="back" /></button>
        <div className="floating-right"><JudgeSimChip /></div>
        <div className="cd-title">
          <span className="cd-badge"><i className="live-dot live" />ROUND {j.round} · VOTING LIVE</span>
          <h1>{c.name}</h1>
          <div className="cd-facts"><span>{c.category}</span><span>Round {j.round} of {c.totalRounds}</span><span>{c.contestants.toLocaleString()} contestants</span></div>
        </div>
      </div>
      <main className="cd-main jd-main">
        <PrivateTag />
        <JudgeWindowCard />
        <section className={`jd-criterion ${j.fresh ? "fresh" : ""}`}>
          <div className="jd-crit-top"><small>ROUND {j.round} · {r.name.toUpperCase()}</small>{j.fresh && <b>NEW CRITERION</b>}</div>
          <p className="jd-crit-line">Your criterion this round: <strong>{r.criterion}</strong><i /><em>{JUDGE_POINTS} points to award</em></p>
          <p className="jd-crit-desc">{r.desc}</p>
          <div className="jd-rounds">{judgeRounds.map((x, i) => {
            const n = i + 1;
            const st = j.awards[n] ? "done" : n === j.round ? "now" : n < j.round ? "missed" : "";
            return <div key={x.name} className={st}><i>{j.awards[n] ? <Icon name="check" size={10} /> : n}</i><span>{n <= j.round ? x.criterion : "TBA"}</span></div>;
          })}</div>
        </section>
        {award && chosen && <div className="jd-awarded">
          <div className="jd-aw-head"><Icon name="lock" size={15} /><strong>You’ve awarded your points this round.</strong></div>
          <div className="jd-aw-pick"><img src={chosen.image} alt="" /><div><strong>{chosen.handle}</strong><small>{r.criterion} · {JUDGE_POINTS} points · Locked</small></div><span className="jd-only"><Icon name="lock" size={10} /> Only you</span></div>
          {award.video !== "received" && <button className="jd-verdict-prompt" onClick={() => a.go({ screen: "judgeAwarded", comp: JUDGE_COMP, pick: award.id })}><Icon name="camera" size={16} /><span><strong>Add a verdict video</strong><small>Optional · shown only when results are revealed</small></span><Icon name="arrow" size={15} /></button>}
          {award.video === "received" && <p className="jd-aw-note"><Icon name="check" size={13} /> Verdict video received · sealed until results</p>}
        </div>}
        {!award && j.window === "closed" && <div className="banner danger jd-err"><Icon name="alert" size={17} /><p><strong>Judging closed</strong>You didn’t award your points in Round {j.round}, so no award was recorded for this round.</p></div>}
        <section className="jd-list">
          <div className="jd-list-head"><div><p className="eyebrow">CONTESTANTS</p><h2>{loading || j.list !== "ok" ? `Round ${j.round}` : `${pool.length} in Round ${j.round}`}</h2></div><small>Fan votes are public</small></div>
          {loading ? <div className="jd-grid">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="jd-card sk-card"><div className="sk jd-sk-img" /><div className="sk sk-a" /><div className="sk sk-b" /></div>)}</div>
            : j.list === "error" ? <div className="jd-fail"><span><Icon name="alert" size={22} /></span><strong>Couldn’t load contestants.</strong><p>Something went wrong on our side. Your judging window isn’t affected.</p><button className="primary small" onClick={() => { a.setJudge((x) => ({ ...x, list: "ok" })); setRetry((n) => n + 1); }}>Try again</button></div>
            : j.list === "empty" ? <LockedNote icon="film" title="No contestants yet" copy={`Entries for ${r.name} appear here once they’re approved. We’ll let you know when they’re ready to judge.`} />
            : <div className="jd-grid">{pool.map((x) => (
              <button key={x.id} className={`jd-card ${award?.id === x.id ? "chosen" : ""} ${award && award.id !== x.id ? "dim" : ""}`} onClick={() => open(x.id)}>
                <div className="jd-thumb"><img src={x.image} alt={`${x.name} entry`} /><span className="jd-play"><Icon name="play" filled size={13} /></span><em>0:{clipLen(x.id)}</em></div>
                <div className="jd-card-copy"><strong>{x.handle}</strong><small>{x.name}</small><span className="jd-votes">{a.votesOf(JUDGE_COMP, x).toLocaleString()} fan votes</span></div>
                {btn(x)}
              </button>
            ))}</div>}
        </section>
        <section className="cd-sec jd-foot">
          <div className="jd-nofan"><Icon name="info" size={15} /><p><strong>Fan voting is off for you</strong>As a judge, you can’t vote or buy votes in this competition. Fan features return after the competition ends.</p></div>
          <button className="primary secondary" onClick={() => a.go({ screen: "arena", comp: JUDGE_COMP })}><Icon name="eye" size={16} /> Watch in the Arena</button>
        </section>
      </main>
    </>
  );
}

function JudgeEntryScreen({ route }: { route: Route }) {
  const a = useArena();
  const j = a.judge;
  const en = judgeEntry(route.pick);
  const r = judgeRounds[j.round - 1];
  const award = j.awards[j.round];
  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(0);
  const [sheet, setSheet] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setProg((p) => { if (p >= 100) { setPlaying(false); return 100; } return p + 1; }), 60);
    return () => window.clearInterval(t);
  }, [playing]);
  if (!en) return <><SubBar title="Contestant" onBack={a.back} /><main className="page"><LockedNote icon="alert" title="Entry unavailable" copy="This entry may have been removed by the host. Go back and choose another contestant." /></main></>;
  const mine = award?.id === en.id;
  const len = clipLen(en.id);
  const secs = Math.round((prog / 100) * len);
  const cta = award ? <button className="primary secondary jd-locked-cta" disabled><Icon name="lock" size={15} /> {mine ? `You awarded your ${JUDGE_POINTS} points to ${en.handle}` : "You’ve awarded your points this round"}</button>
    : j.window === "before" ? <button className="primary" disabled><Icon name="clock" size={15} /> Judging opens {r.opens}</button>
    : j.window === "closed" ? <button className="primary" disabled><Icon name="lock" size={15} /> Judging closed</button>
    : <button className="primary" onClick={() => setSheet(true)}><Icon name="star" size={16} /> Award my {JUDGE_POINTS} points for {r.criterion}</button>;
  return (
    <>
      <SubBar title={en.handle} sub={`Round ${j.round} · ${r.name}`} onBack={a.back} right={<JudgeSimChip />} />
      <main className="page jd-entry">
        <PrivateTag />
        <div className={`jd-player ${playing ? "playing" : ""}`}>
          <img src={en.image} alt={`${en.name} submission`} />
          <div className="jd-player-shade" />
          {mine && <span className="jd-player-pick"><Icon name="star" size={11} filled /> YOUR PICK</span>}
          <button className="play" onClick={() => { if (prog >= 100) setProg(0); setPlaying(!playing); }} aria-label={playing ? "Pause" : "Play submission"}><Icon name={playing ? "pause" : "play"} filled={!playing} size={22} /></button>
          <div className="jd-scrub"><span>0:{String(secs).padStart(2, "0")}</span><div><i style={{ width: `${prog}%` }} /></div><span>0:{len}</span></div>
        </div>
        <div className="jd-who">
          <img src={en.image} alt="" />
          <div><strong>{en.handle} <b className="verified">✓</b></strong><small>{en.name}</small></div>
          <em>{a.votesOf(JUDGE_COMP, en).toLocaleString()}<small>fan votes</small></em>
        </div>
        <p className="jd-cap">“{en.caption}”</p>
        <section className="jd-block">
          <p className="eyebrow">ROUND {j.round} CHALLENGE</p>
          <h3>{r.challenge}</h3>
          <p>{r.copy}</p>
          <ul className="req-list">{r.instructions.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>
        <section className="jd-block crit">
          <p className="eyebrow">YOUR CRITERION · {r.criterion.toUpperCase()}</p>
          <p>{r.desc}</p>
          <ul className="criteria">{r.look.map((x) => <li key={x}><Icon name="check" size={13} />{x}</li>)}</ul>
          <small className="jd-block-note">Judge only on {r.criterion}. Fan votes don’t count toward your award.</small>
        </section>
      </main>
      <div className="sticky-action">{cta}</div>
      {sheet && <AwardSheet en={en} close={() => setSheet(false)} />}
    </>
  );
}

function AwardSheet({ en, close }: { en: Entry; close: () => void }) {
  const a = useArena();
  const j = a.judge;
  const r = judgeRounds[j.round - 1];
  const [note, setNote] = useState("");
  const [step, setStep] = useState<"confirm" | "sending" | "error">("confirm");
  const submit = () => {
    setStep("sending");
    window.setTimeout(() => {
      if (j.failNext) { a.setJudge((x) => ({ ...x, failNext: false })); setStep("error"); return; }
      a.setJudge((x) => ({ ...x, awards: { ...x.awards, [x.round]: { id: en.id, comment: note.trim(), video: "none" } } }));
      a.replace({ screen: "judgeAwarded", comp: JUDGE_COMP, pick: en.id });
    }, 1200);
  };
  return (
    <div className="sheet-backdrop" onClick={step === "sending" ? undefined : close}>
      <div className="sheet jd-sheet" onClick={(ev) => ev.stopPropagation()}>
        <div className="sheet-handle" />
        {step === "error" ? <div className="v2-state">
          <div className="state-icon warn"><Icon name="alert" size={24} /></div>
          <h2>Couldn’t submit your award. Try again.</h2>
          <p>Your points haven’t been awarded yet. Nothing was saved.</p>
          <button className="primary" onClick={submit}>Try again</button>
          <button className="ghost-btn" onClick={close}>Cancel</button>
        </div> : <>
          <div className="sheet-title"><div><span>ROUND {j.round} · CONFIRM AWARD</span><h2>Award your points</h2></div>{step === "confirm" && <button onClick={close} aria-label="Close">×</button>}</div>
          <div className="jd-sheet-pick">
            <img src={en.image} alt="" />
            <div><strong>{en.handle}</strong><small>{en.name}</small></div>
          </div>
          <div className="jd-sheet-facts"><div><small>Criterion</small><strong>{r.criterion}</strong></div><div><small>Points</small><strong className="gold">{JUDGE_POINTS}</strong></div></div>
          <div className="jd-warn"><Icon name="alert" size={15} /><p>This can’t be changed. You can award your points to only one contestant this round.</p></div>
          <label className="jd-note"><span>WHY THIS CONTESTANT? <em>Optional · internal only</em></span><textarea maxLength={240} value={note} disabled={step === "sending"} onChange={(ev) => setNote(ev.target.value)} placeholder="Only the competition admins will see this." /><small>{note.length}/240</small></label>
          <button className="primary" disabled={step === "sending"} onClick={submit}>{step === "sending" ? <><span className="btn-spinner dark" /> Submitting…</> : "Confirm award"}</button>
          <button className="ghost-btn" disabled={step === "sending"} onClick={close}>Cancel</button>
        </>}
      </div>
    </div>
  );
}

function JudgeAwarded({ route }: { route: Route }) {
  const a = useArena();
  const j = a.judge;
  const r = judgeRounds[j.round - 1];
  const award = j.awards[j.round];
  const en = judgeEntry(route.pick ?? award?.id);
  const [mode, setMode] = useState<"prompt" | "recording" | "uploading" | "failed" | "received" | "skipped">(award?.video === "received" ? "received" : "prompt");
  const [secs, setSecs] = useState(0);
  const [prog, setProg] = useState(0);
  const failRef = useRef(false);
  useEffect(() => {
    if (mode !== "recording") return;
    const t = window.setInterval(() => setSecs((s) => Math.min(s + 1, 60)), 1000);
    return () => window.clearInterval(t);
  }, [mode]);
  useEffect(() => {
    if (mode !== "uploading") return;
    const t = window.setInterval(() => setProg((p) => Math.min(p + 3, 100)), 60);
    return () => window.clearInterval(t);
  }, [mode]);
  useEffect(() => {
    if (mode !== "uploading") return;
    if (failRef.current && prog >= 55) { failRef.current = false; setMode("failed"); return; }
    if (prog >= 100) { a.setJudge((x) => ({ ...x, awards: { ...x.awards, [x.round]: { ...x.awards[x.round], video: "received" } } })); setMode("received"); }
  }, [prog, mode]);
  const startUpload = () => {
    if (j.failNext) { failRef.current = true; a.setJudge((x) => ({ ...x, failNext: false })); }
    setProg(0); setMode("uploading");
  };
  const skip = () => { a.setJudge((x) => ({ ...x, awards: { ...x.awards, [x.round]: { ...x.awards[x.round], video: "skipped" } } })); setMode("skipped"); };
  const backToComp = () => a.backTo({ screen: "competition", comp: JUDGE_COMP });
  if (!award || !en) return <><SubBar title="Award" onBack={a.back} /><main className="page"><LockedNote icon="star" title="No award yet" copy="Choose a contestant from the competition page to award your points." /></main></>;
  return (
    <>
      <SubBar title="Points awarded" sub={`Round ${j.round} · ${r.name}`} onBack={backToComp} right={<JudgeSimChip />} />
      <main className="page jd-done">
        <div className="jd-done-hero">
          <div className="celebrate-glow" />
          <div className="success-ring big"><Icon name="check" size={40} /></div>
          <p className="success-eyebrow">ROUND {j.round} · AWARD LOCKED</p>
          <h1>Your points have been awarded.</h1>
        </div>
        <div className="jd-sheet-pick summary">
          <img src={en.image} alt="" />
          <div><strong>{en.handle}</strong><small>{r.criterion} · {JUDGE_POINTS} points</small></div>
          <span className="jd-only"><Icon name="lock" size={10} /> Only you</span>
        </div>
        {award.comment && <p className="jd-comment"><small>YOUR NOTE · INTERNAL</small>“{award.comment}”</p>}
        <section className="jd-verdict">
          <div className="jd-verdict-head"><span><Icon name="film" size={18} /></span><div><strong>Verdict video</strong><small>Optional</small></div></div>
          {mode === "prompt" && <>
            <p>Record or upload a short verdict video (optional). It will only be shown when results are revealed.</p>
            <div className="jd-verdict-actions">
              <button onClick={() => { setSecs(0); setMode("recording"); }}><Icon name="camera" size={18} />Record</button>
              <button onClick={startUpload}><Icon name="upload" size={18} />Upload</button>
              <button onClick={skip}><Icon name="arrow" size={18} />Skip</button>
            </div>
            <small className="jd-verdict-tip">Up to 60 seconds. Keep it to yourself until the reveal.</small>
          </>}
          {mode === "recording" && <div className="jd-rec">
            <div className="jd-rec-view"><img src={photos.portrait} alt="Camera preview" /><span><i /> REC 0:{String(secs).padStart(2, "0")}</span></div>
            <button className="primary" onClick={startUpload}>Stop &amp; use this take</button>
            <button className="ghost-btn" onClick={() => setMode("prompt")}>Discard</button>
          </div>}
          {mode === "uploading" && <div className="jd-up">
            <div className="jd-up-bar"><i style={{ width: `${prog}%` }} /></div>
            <div className="jd-up-row"><span><span className="btn-spinner" /> Uploading verdict…</span><strong>{prog}%</strong></div>
          </div>}
          {mode === "failed" && <div className="jd-up failed">
            <p><Icon name="alert" size={15} /> Upload interrupted at {prog}%. Your award is safe — only the video didn’t send.</p>
            <button className="primary small" onClick={startUpload}>Retry upload</button>
          </div>}
          {mode === "received" && <div className="jd-up ok"><span className="state-icon ok pop"><Icon name="check" size={20} /></span><div><strong>Received</strong><small>Your verdict is sealed until results are revealed.</small></div></div>}
          {mode === "skipped" && <div className="jd-up"><p>No verdict video for now. You can still add one from the competition page before results.</p></div>}
        </section>
      </main>
      <div className="sticky-action"><button className="primary" onClick={backToComp}>Back to competition <Icon name="arrow" /></button></div>
    </>
  );
}

function JudgeThanks() {
  const a = useArena();
  const j = a.judge;
  const c = a.comp(JUDGE_COMP);
  const judged = judgeRounds.map((x, i) => ({ x, n: i + 1, aw: j.awards[i + 1] })).filter((r) => r.n <= j.round);
  return (
    <main className="page celebrate jd-thanks">
      <div className="celebrate-glow" />
      <div className="success-ring big jd-ring"><Icon name="crown" size={38} /></div>
      <p className="success-eyebrow">RESULTS REVEALED</p>
      <h1>Thanks for judging {c.name}.</h1>
      <span>Your awards are now public alongside the results.</span>
      <div className="jd-paid">
        <small>CREDITED TO YOUR WALLET</small>
        <strong>{JUDGE_FEE}</strong>
        <em>Judging fee · {c.name}</em>
        <button className="text-link" onClick={() => a.setTab("wallet")}>View wallet <Icon name="arrow" size={14} /></button>
      </div>
      <div className="jd-history">
        {judged.map(({ x, n, aw }) => { const p = judgeEntry(aw?.id); return <div key={n}><small>R{n}</small><span>{x.criterion}</span><strong>{p ? p.handle : "No award"}</strong></div>; })}
      </div>
      <p className="jd-ended"><Icon name="info" size={13} /> Judge mode has ended. Voting, gifts and every fan feature are back.</p>
      <button className="primary" onClick={() => a.replace({ screen: "competition", comp: JUDGE_COMP })}>View competition <Icon name="arrow" /></button>
    </main>
  );
}

function PushBanner({ p, open, close }: { p: Push; open: () => void; close: () => void }) {
  useEffect(() => { const t = window.setTimeout(close, 6500); return () => window.clearTimeout(t); }, [p]);
  return (
    <div className="push" role="alert">
      <button className="push-hit" onClick={open}>
        <span className="push-app"><LogoMark size={22} /></span>
        <div><small>D-ARENA <em>now</em></small><strong>{p.title}</strong><span>{p.body}</span></div>
      </button>
      <button className="push-x" onClick={close} aria-label="Dismiss"><Icon name="x" size={14} /></button>
    </div>
  );
}

function JudgeSim({ close }: { close: () => void }) {
  const a = useArena();
  const j = a.judge;
  const set = (p: Partial<Judge>, msg: string) => { a.setJudge((x) => ({ ...x, ...p })); a.toast(msg); };
  const note = (n: Omit<Note, "id" | "time" | "unread">) => { a.notify(n); a.push({ title: n.title, body: n.body, route: n.route }); };
  const remind = () => {
    if (j.awards[j.round]) { a.toast("Already awarded — no reminder needed"); return; }
    a.setJudge((x) => ({ ...x, window: "closing" }));
    note({ icon: "clock", tone: "neutral", kind: "private", title: `Judging for Round ${j.round} closes in 6 hours`, body: "You haven’t awarded your points yet.", route: { screen: "competition", comp: JUDGE_COMP } });
    close();
  };
  const nextRound = () => {
    const n = j.round + 1;
    a.setJudge((x) => ({ ...x, round: n, window: "open", list: "ok", fresh: true }));
    note({ icon: "lock", tone: "neutral", kind: "private", title: `Round ${n} judging is open`, body: `Your criterion: ${judgeRounds[n - 1].criterion}.`, route: { screen: "competition", comp: JUDGE_COMP } });
    close();
  };
  const reveal = () => {
    a.setJudge((x) => ({ ...x, status: "finished", window: "closed" }));
    a.notify({ icon: "crown", tone: "neutral", kind: "private", title: "Thanks for judging Street Dance Cypher", body: `Results are live. ${JUDGE_FEE} has been credited to your wallet.`, route: { screen: "judgeThanks" } });
    close();
    a.go({ screen: "judgeThanks" });
  };
  const resetInvite = () => {
    a.setJudge(() => initialJudge);
    note({ icon: "mail", tone: "neutral", kind: "private", title: "You’ve been invited to judge Street Dance Cypher", body: "Private invitation · Respond by Oct 3.", route: { screen: "judgeInvite" } });
    close();
  };
  const active = j.status === "accepted";
  return (
    <div className="sheet-backdrop" onClick={close}>
      <div className="sheet host-sheet" onClick={(ev) => ev.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title"><div><span>PROTOTYPE · JUDGE SIMULATOR</span><h2>Judge states</h2></div><button onClick={close}>×</button></div>
        <p>Status: <strong>{j.status}</strong> · Round {j.round} · {windowInfo(j).label}. In production, admins and the schedule drive these states.</p>
        <p className="sheet-kicker">INVITE</p>
        <div className="host-row">
          <button onClick={resetInvite}>New invite</button>
          <button disabled={j.status !== "invited"} onClick={() => set({ status: "expired" }, "Invite expired")}>Expire</button>
          <button disabled={j.status === "withdrawn" || j.status === "finished" || j.status === "declined"} onClick={() => { a.setJudge((x) => ({ ...x, status: "withdrawn" })); a.notify({ icon: "lock", tone: "neutral", kind: "private", title: "Your judge invite was withdrawn", body: "Confidentiality rules were not followed.", route: { screen: "judgeInvite" } }); close(); a.go({ screen: "judgeInvite" }); }}>Withdraw</button>
        </div>
        <p className="sheet-kicker">JUDGING WINDOW</p>
        <div className="host-row">{(["before", "open", "closing", "closed"] as JudgeWindow[]).map((w) => <button key={w} disabled={!active} className={j.window === w ? "active" : ""} onClick={() => set({ window: w }, windowInfo({ ...j, window: w }).label)}>{{ before: "Before", open: "Open", closing: "6h left", closed: "Closed" }[w]}</button>)}</div>
        <p className="sheet-kicker">EVENTS</p>
        <div className="host-row">
          <button disabled={!active} onClick={remind}>Reminder</button>
          <button disabled={!active || j.round >= 3} onClick={nextRound}>Next round</button>
          <button disabled={!active} onClick={reveal}>Reveal results</button>
        </div>
        <p className="sheet-kicker">EDGE STATES</p>
        <div className="host-row">
          <button className={j.list === "empty" ? "active" : ""} onClick={() => set({ list: j.list === "empty" ? "ok" : "empty" }, j.list === "empty" ? "Contestants restored" : "Empty round")}>Empty list</button>
          <button className={j.list === "error" ? "active" : ""} onClick={() => set({ list: j.list === "error" ? "ok" : "error" }, j.list === "error" ? "Contestants restored" : "Load error on")}>Load error</button>
          <button className={j.failNext ? "active" : ""} onClick={() => set({ failNext: !j.failNext }, j.failNext ? "Next action will succeed" : "Next submit / upload will fail")}>Fail next</button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Host simulator ───────────────────────── */

function HostSheet({ close }: { close: () => void }) {
  const a = useArena();
  const j = a.journey;
  const phases: [Phase, string, string][] = [
    ["upcoming", "Upcoming", "Not started · reminders"],
    ["registration", "Registration open", "Contestants can register"], ["challenge", "Challenge open", "Contestants submit entries"], ["showcase", "Start showcase", "Contestants take the stage · no voting"],
    ["voting", "Open voting", "Fans vote · leaderboard live"], ["closed", "Close voting", "Votes locked"], ["processing", "Process results", "Standings being verified"], ["results", "Publish results", "Advance / eliminate"],
  ];
  const set = (p: Phase) => {
    a.setJourney((x) => ({ ...x, phase: p, review: entriesVisible(p) && x.submitted && x.review === "pending" ? "approved" : x.review }));
    const msgs: Partial<Record<Phase, Omit<Note, "id" | "time" | "unread">>> = {
      showcase: { icon: "eye", tone: "violet", title: "Your entry is showcased", body: "Best Dance Moves · Voting starts tomorrow.", route: { screen: "challenge", comp: "bdm" } },
      voting: { icon: "bolt", tone: "coral", title: "Voting is now live", body: `${roundNames[j.round - 1]} of Best Dance Moves is open. Support your favourite entries before voting closes.`, route: { screen: "arena", comp: "bdm", entry: 0 } },
      closed: { icon: "clock", tone: "violet", title: "Voting has ended", body: "Results are being confirmed.", route: { screen: "leaderboard", comp: "bdm" } },
      results: { icon: "crown", tone: "coral", title: j.outcome === "advanced" ? "You advanced" : "Results are published", body: j.outcome === "advanced" ? `You’re moving to ${roundNames[j.round]}.` : "See where you finished.", route: { screen: "results", comp: "bdm" } },
    };
    if (msgs[p]) a.notify(msgs[p]!);
    a.toast(`Host set: ${phaseLabel(p, j.round)}`);
  };
  return (
    <div className="sheet-backdrop" onClick={close}>
      <div className="sheet host-sheet" onClick={(ev) => ev.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title"><div><span>PROTOTYPE · HOST SIMULATOR</span><h2>Competition stage</h2></div><button onClick={close}>×</button></div>
        <p>In production the admin console controls these stages. The app only reflects the resulting state.</p>
        <div className="host-phases">{phases.map(([p, t, s]) => <button key={p} className={j.phase === p ? "active" : ""} onClick={() => set(p)}><i />{t}<small>{s}</small></button>)}</div>
        <p className="sheet-kicker">ENTRY REVIEW</p>
        <div className="host-row">
          <button disabled={!j.submitted} onClick={() => { a.setJourney((x) => ({ ...x, review: "approved" })); a.notify({ icon: "check", tone: "violet", title: "Your entry was approved", body: "You’re officially competing.", route: { screen: "challenge", comp: "bdm" } }); a.toast("Entry approved"); }}>Approve</button>
          <button disabled={!j.submitted} onClick={() => { a.setJourney((x) => ({ ...x, review: "rejected" })); a.notify({ icon: "alert", tone: "coral", title: "Your entry needs attention", body: "Update and resubmit before the deadline.", route: { screen: "challenge", comp: "bdm" } }); a.toast("Entry flagged"); }}>Needs attention</button>
        </div>
        <p className="sheet-kicker">RESULT OUTCOME</p>
        <div className="host-row">
          {(["advanced", "eliminated"] as const).map((o) => <button key={o} className={j.outcome === o ? "active" : ""} onClick={() => a.setJourney((x) => ({ ...x, outcome: o }))}>{o === "advanced" ? "Advance" : "Eliminate"}</button>)}
          <button onClick={() => { a.setJourney(() => initialJourney); a.toast("Journey reset"); close(); }}>Reset</button>
        </div>
      </div>
    </div>
  );
}

const initialJourney: Journey = { phase: "showcase", round: 1, registered: false, submitted: false, review: "none", caption: "", clip: 0, outcome: "advanced" };

/* ───────────────────────── Profile competitions ───────────────────────── */

function Supporting() {
  const a = useArena();
  const fan = a.fanVotes;
  const list = fan;
  const lydia = a.comp("bdm").entries.find((x) => x.handle === "@thee_lydia")!;
  const rows = list.some((x) => x.en.handle === "@thee_lydia") ? list : [{ c: "bdm" as CompId, en: lydia, n: 20 }, ...list];
  return (
    <section className="supporting">
      <p className="eyebrow">PEOPLE I SUPPORT</p>
      {rows.map(({ c, en, n }) => {
        const comp = a.comp(c);
        const i = comp.entries.indexOf(comp.entries.find((x) => x.id === en.id)!);
        return <button key={c + en.id} className="sup-row" onClick={() => a.go({ screen: "arena", comp: c, entry: Math.max(i, 0) })}><img src={en.image} alt="" /><div><strong>{en.handle}</strong><span>{comp.name} · {fmt(a.votesOf(c, en))} votes</span></div><em>My votes<b>{n}</b></em></button>;
      })}
    </section>
  );
}

function ProfileArenas() {
  const a = useArena();
  const j = a.journey;
  const bdm = a.comp("bdm");
  const me = bdm.entries.find((x) => x.id === "me");
  const ranked = [...bdm.entries].sort((x, y) => a.votesOf("bdm", y) - a.votesOf("bdm", x));
  const cta = getCta(bdm, j);
  const rows = [
    ...(j.registered ? [{ c: bdm, round: roundNames[j.round - 1], status: entryStatus(j, bdm.phase).label, rank: me && votingVisible(bdm.phase) ? `#${ranked.indexOf(me) + 1}` : "—", votes: me && votingVisible(bdm.phase) ? fmt(a.votesOf("bdm", me)) : "—", next: cta.label, go: () => a.act(bdm, cta.action) }] : []),
    { c: a.comp("kings"), round: "Semi-Final", status: "Eliminated", rank: "#14", votes: "6.2K", next: "View results", go: () => a.go({ screen: "results", comp: "kings" }) },
  ];
  return (
    <div className="profile-arenas">
      {!j.registered && <EmptyState title="You haven’t entered a competition yet." copy="Enter a competition and your journey will live here." action="Browse competitions" onClick={() => a.setTab("competitions")} />}
      {rows.map((r) => (
        <button key={r.c.id} className="mc-row" onClick={r.go}>
          <img src={r.c.image} alt="" />
          <div className="mc-main"><strong>{r.c.name}</strong><span>{r.round} · {r.status}</span>
            <div className="mc-stats"><em><small>Rank</small>{r.rank}</em><em><small>Votes</small>{r.votes}</em><em className="next"><small>Next</small>{r.next}</em></div></div>
          <Icon name="arrow" size={16} />
        </button>
      ))}
    </div>
  );
}

const feedPosts: { id: string; name: string; handle: string; time: string; image: string; avatar: string; caption: string; tags?: string; likes: number; comments: number; shares: number; comp?: CompId; round?: string }[] = [
  { id: "p1", name: "Mike Offiong", handle: "@mike_off", time: "2h", image: fx.feed1, avatar: fx.avatarMike, caption: "Just my entry for the competition. This one’s for the dreamers. Let’s go....", tags: "#BestDanceMovesCompetition", likes: 2200, comments: 282, shares: 40, comp: "dance", round: "Round 1" },
  { id: "p2", name: "Zuri Okafor", handle: "@zurimoves", time: "3h", image: photos.hero, avatar: fx.avatarSam, caption: "Took this one-take routine from the studio to the Arena. Your support means everything.", tags: "#AfrobeatArena", likes: 8431, comments: 364, shares: 51, comp: "voice", round: "Round 2" },
  { id: "p3", name: "Samantha Kels", handle: "@samantha_kels", time: "4h", image: fx.feed2, avatar: fx.avatarDisc, caption: "Worship that comes from the heart.", tags: "#WorshipInSpirit", likes: 2200, comments: 282, shares: 40 },
  { id: "p4", name: "Chef Bisi", handle: "@chefbisi", time: "5h", image: photos.chef, avatar: fx.avatarMike, caption: "Sunday stew, my grandmother’s way. Low heat, long patience, no shortcuts.", likes: 2210, comments: 118, shares: 22 },
  { id: "p5", name: "Naya Ibe", handle: "@naya.art", time: "6h", image: photos.troupe, avatar: fx.avatarSam, caption: "Rehearsal with the crew before tonight. Contemporary meets Shaku.", tags: "#StreetDanceCypher", likes: 5120, comments: 201, shares: 33, comp: "dance", round: "Round 1" },
];

function FeedPost({ p, onWatch }: { p: (typeof feedPosts)[number]; onWatch: () => void }) {
  const a = useArena();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const f = a.followsCreator(p.handle);
  const [cm, setCm] = useState(false);
  return (
    <article className="fx-post">
      {cm && <FxComments count={p.comments} onClose={() => setCm(false)} />}
      <div className="fx-post-head">
        <img className="fx-avatar" src={p.avatar} width={50} height={50} alt="" />
        <button className="who" onClick={onWatch}><b>{p.handle}<Verified /></b><small>{p.time} ago</small></button>
        <button className={f ? "follow on" : "follow"} onClick={() => a.toggleCreator(p.handle)}>{f ? "Following" : "Follow"}</button>
      </div>
      <p className="cap">{p.caption}{p.tags && <b>{p.tags}</b>}</p>
      {p.comp && <span className="fx-entry-tag">COMPETITION ENTRY <small>{a.comp(p.comp).name} · {p.round}</small></span>}
      <button className="fx-media" onClick={onWatch} aria-label={`Watch ${p.name}'s post`}>
        <img className="bg" src={p.image} alt="" />
        <span className="ctrl"><img src={fx.iPlayCircle} alt="" /><span className="vol"><img src={fx.iVolume} alt="" /></span></span>
        <i className="progress" />
      </button>
      <div className="fx-actions">
        <div>
          <button className={liked ? "on" : ""} onClick={() => setLiked(!liked)} aria-label="Like"><FxIcon src={liked ? fx.iHeartBold : fx.iHeart} />{kfmt(p.likes + (liked ? 1 : 0))}</button>
          <button onClick={() => setCm(true)} aria-label="Comments"><FxIcon src={fx.iMsg} />{p.comments}</button>
          <button onClick={() => a.toast("Share link copied")} aria-label="Share"><FxIcon src={fx.iSend} />{p.shares}</button>
        </div>
        <button className={saved ? "on" : ""} onClick={() => { setSaved(!saved); a.toast(saved ? "Removed from saved" : "Saved to your collection"); }} aria-label="Save"><FxIcon src={fx.iBookmark} /></button>
      </div>
    </article>
  );
}

function Home({ openCompetitions, openNotifications }: { openCompetitions: () => void; openViewer: () => void; openNotifications: () => void; showToast: (s: string) => void }) {
  const a = useArena();
  const [feed, setFeed] = useState("For You");
  const [slide, setSlide] = useState(0);
  const [view, setView] = useState<ViewItem | null>(null);
  const [post, setPost] = useState(false);
  const unread = a.notes.some((n) => n.unread);
  const rail = (["food", "dance", "bdm", "voice", "face"] as CompId[]).map(a.comp);
  const posts = feed === "Following" ? feedPosts.filter((p) => a.followsCreator(p.handle)) : feed === "Competitions" ? feedPosts.filter((p) => p.comp) : feedPosts;
  return (
    <div className="fx">
      <header className="fx-home-head">
        <button className="fx-create" onClick={() => setPost(true)} aria-label="Create a post"><FxIcon src={fx.iAdd} size={26} /></button>
        <span className="logo-c"><LogoMark size={28} /><LogoWord /></span>
        <div className="right">
          <button className="bell" onClick={openNotifications} aria-label="Notifications"><FxIcon src={fx.iBell} size={26} />{unread && <i />}</button>
          <button className="me" onClick={() => a.setTab("profile")} aria-label="Your profile"><img src={fx.avatarMe} alt="" /></button>
        </div>
      </header>
      <div className="fx-chips" style={{ marginTop: 18 }}>{["For You", "Competitions", "Following"].map((t) => <button key={t} className={feed === t ? "on" : ""} onClick={() => setFeed(t)}>{t}</button>)}</div>
      <div className="fx-sec-head"><h2>On the Arena</h2><button onClick={openCompetitions}>See all <FxIcon src={fx.iArrowRight} size={20} /></button></div>
      <div className="fx-rail" onScroll={(ev) => setSlide(Math.min(rail.length - 1, Math.round(ev.currentTarget.scrollLeft / 256)))}>{rail.map((c) => <ArenaRailCard key={c.id} c={c} />)}</div>
      <div className="fx-rail-dots" aria-hidden="true">{rail.map((c, i) => <i key={c.id} className={i === slide ? "on" : ""} />)}</div>
      <div className="fx-feed">
        {posts.length ? posts.map((p) => <FeedPost key={p.id} p={p} onWatch={() => setView(p)} />)
          : <FxEmpty icon={fx.iUsers} title="No posts to show yet" copy="Follow creators and their posts will show up here." action="Explore Discover" onClick={() => a.setTab("discover")} />}
      </div>
      {view && <FxViewer v={view} onClose={() => setView(null)} />}
      {post && <CreatePostSheet close={() => setPost(false)} />}
    </div>
  );
}

function EmptyState({ title, copy, action, onClick }: { title: string; copy: string; action: string; onClick: () => void }) {
  return <FxEmpty title={title} copy={copy} action={action} onClick={onClick} />;
}


const gallery = [
  { title: "Owambe footwork, slowed down", creator: "@zuri.moves", views: "89.2K", type: "Dance", image: fx.arenaDance, comp: "dance" as CompId },
  { title: "Wrote this hook at 3am", creator: "@toluvoice", views: "24.8K", type: "Music", image: photos.singer },
  { title: "Party jollof, smoked right", creator: "@chefbisi", views: "41.0K", type: "Food", image: photos.chef, comp: "food" as CompId },
  { title: "Desert light lookbook", creator: "@amarastyles", views: "18.3K", type: "Fashion", image: photos.fashion },
  { title: "Gold hour glam in 5 steps", creator: "@lola.beats", views: "52.7K", type: "Beauty", image: photos.beauty },
  { title: "POV: you said ‘I’m on my way’", creator: "@kemiskits", views: "112K", type: "Comedy", image: photos.stage },
  { title: "Calisthenics at midnight", creator: "@obi.trains", views: "15.4K", type: "Fitness", image: photos.fitness },
  { title: "Sunday in Ikoyi", creator: "@naya.art", views: "12.1K", type: "Lifestyle", image: photos.artist },
  { title: "Charcoal portraits, live", creator: "@inkbyfemi", views: "9.8K", type: "Art", image: photos.editorial },
  { title: "Live vocals, no autotune", creator: "@maliklive", views: "47.5K", type: "Music", image: photos.mic },
  { title: "Pepper soup noodles", creator: "@uchecooks", views: "20.6K", type: "Food", image: photos.noodles },
  { title: "Braids, beads and patience", creator: "@adaeze", views: "30.2K", type: "Beauty", image: photos.beauty2 },
  { title: "Street magic in Yaba", creator: "@trickytayo", views: "7.6K", type: "Other", image: photos.crowd },
];
const discoverCats = ["Trending", "Dance", "Food", "Music", "Fashion", "Beauty", "Comedy", "Fitness", "Lifestyle", "Art", "Other"];

function DiscoverPage() {
  const a = useArena();
  const [category, setCategory] = useState("Trending");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<(typeof gallery)[number] | null>(null);
  const q = query.trim().toLowerCase();
  const filtered = gallery.filter((g) => (category === "Trending" || g.type === category) && (!q || (g.title + g.creator + g.type).toLowerCase().includes(q)));
  const compHits = q ? comps.filter((c) => (c.name + c.category).toLowerCase().includes(q)) : [];
  const avatars = [fx.avatarMike, fx.avatarDisc, fx.avatarSam, fx.avatarAlexSm];
  return (
    <div className="fx">
      <header className="fx-pagehead"><h1>Discover</h1><p>Explore amazing content, creators and communities.</p></header>
      <div style={{ display: "grid", gap: 24, marginTop: 24 }}>
        <label className="fx-search"><FxIcon src={fx.iSearchNormal} size={18} /><input value={query} onChange={(ev) => setQuery(ev.target.value)} placeholder="Search for competitions, creators, etc." aria-label="Search" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><FxIcon src={fx.iClose} size={18} /></button>}</label>
        <nav className="fx-tabs text">{discoverCats.map((item) => <button key={item} className={category === item ? "on" : ""} onClick={() => setCategory(item)}>{item}</button>)}</nav>
      </div>
      {compHits.length > 0 && <div className="fx-results"><small>COMPETITIONS</small>{compHits.map((c) => <button key={c.id} onClick={() => a.go({ screen: "competition", comp: c.id })}><img src={c.image} alt="" /><div><b>{c.name}</b><span>{c.category} · {phaseLabel(c.phase, c.round)}</span></div><FxIcon src={fx.iArrowRight} /></button>)}</div>}
      {filtered.length ? (
        <div className="fx-grid2">
          {filtered.map((item, i) => (
            <button className="fx-ccard" key={item.title} onClick={() => setOpen(item)}>
              <span className="m"><img src={item.image} alt={item.title} />{item.comp && <span className="badge">ENTRY</span>}<span className="views"><FxIcon src={fx.iPlay} size={18} />{item.views}</span></span>
              <span className="i"><p>{item.title}</p><span className="u"><img className="fx-avatar" src={avatars[i % avatars.length]} width={30} height={30} alt="" /><span>{item.creator}</span></span></span>
            </button>
          ))}
        </div>
      ) : <FxEmpty title="Nothing here yet" copy={q ? `No ${category === "Trending" ? "" : category.toLowerCase() + " "}posts match “${query}”.` : `No ${category.toLowerCase()} posts yet. Explore another category.`} action="Show trending" onClick={() => { setCategory("Trending"); setQuery(""); }} />}
      {open && <FxViewer v={{ image: open.image, handle: open.creator, avatar: avatars[gallery.indexOf(open) % avatars.length], time: "2h", caption: open.title, tags: `#${open.type.replace(/\s/g, "")} #D-Arena`, likes: Math.round(parseFloat(open.views) * 90), comments: 282, shares: 40, comp: open.comp }} onClose={() => setOpen(null)} />}
    </div>
  );
}


function WalletPage({ resume, coins, setCoins, showToast, openEarnings }: { resume?: boolean; coins: number; setCoins: (n: number) => void; showToast: (s: string) => void; openEarnings: () => void }) {
  const a = useArena();
  const [buying, setBuying] = useState(!!resume);
  const [selected, setSelected] = useState(500);
  const [state, setState] = useState<"idle" | "paying">("idle");
  const price: Record<number, string> = { 500: "₦800", 2000: "₦2,800", 5000: "₦6,500" };
  const buy = () => { setState("paying"); window.setTimeout(() => { setCoins(coins + selected); setState("idle"); setBuying(false); showToast(`${selected.toLocaleString()} coins added`); if (resume) a.back(); }, 1200); };
  return (
    <>
      <TopBar title="Wallet" />
      <main className="page wallet-page">
        {resume && <div className="banner show"><Icon name="info" size={17} /><p><strong>Top up to keep voting</strong>After you buy coins we’ll take you straight back to the entry.</p></div>}
        <div className="wallet-card"><div className="wallet-glow" /><span>COINS</span><strong>{coins.toLocaleString()}</strong><small>For voting and gifting · not withdrawable</small><button onClick={() => setBuying(true)}><Icon name="plus" size={17} /> Buy coins</button></div>
        <button className="earnings-card" onClick={openEarnings}><div><span>EARNINGS</span><strong>₦18,500</strong><small>Withdrawable · ₦2,400 pending</small></div><div className="earnings-arrow"><Icon name="arrow" /></div></button>
        <div className="section-head wallet-head"><div><h2>Recent activity</h2></div></div>
        <div className="activity">
          {[["bolt", "Coins purchased", "Today, 9:42 AM", "+2,000 coins", "positive"], ["heart", "Voted for @zurimoves", "Yesterday, 8:10 PM", "−50 coins", ""], ["wallet", "Withdrawal approved", "Oct 2, 3:16 PM", "−₦20,000", "money"], ["trophy", "Competition reward", "Sep 28", "+₦5,000", "money"]].map((x) => <div key={x[1]}><span className="activity-icon"><Icon name={x[0]} size={19} /></span><p><strong>{x[1]}</strong><small>{x[2]}</small></p><b className={x[4]}>{x[3]}</b></div>)}
        </div>
      </main>
      {buying && <div className="sheet-backdrop" onClick={() => setBuying(false)}><div className="sheet" onClick={(e) => e.stopPropagation()}><div className="sheet-handle" /><div className="sheet-title"><div><span>COINS</span><h2>Buy coins</h2></div><button onClick={() => setBuying(false)}>×</button></div><p>Coins let you vote beyond your free daily vote and send gifts during live performances.</p><div className="coin-packages">{[500, 2000, 5000].map((p) => <button key={p} className={selected === p ? "active" : ""} onClick={() => setSelected(p)}><b>{p.toLocaleString()}</b><span>COINS</span><small>{price[p]}</small>{p === 2000 && <i>POPULAR</i>}</button>)}</div><button className="primary" disabled={state === "paying"} onClick={buy}>{state === "paying" ? "Processing payment…" : `Pay ${price[selected]}`}</button><small className="secure">Secure payment · Balance updates instantly</small></div></div>}
    </>
  );
}

function Earnings({ onBack, showToast }: { onBack: () => void; showToast: (s: string) => void }) {
  const [withdraw, setWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  const over = Number(amount) > 18500;
  return <><TopBar title="Earnings" back onBack={onBack} /><main className="page"><div className="balance-block"><span>AVAILABLE TO WITHDRAW</span><h1>₦18,500</h1><p>₦2,400 pending clearance · Coins are not withdrawable</p><button className="primary" onClick={() => setWithdraw(true)}>Withdraw</button></div><div className="stat-grid"><div><span>TOTAL EARNED</span><strong>₦62,900</strong></div><div><span>THIS MONTH</span><strong>₦14,250</strong></div></div><div className="content-section"><p className="eyebrow">EARNINGS HISTORY</p><div className="activity"><div><span className="activity-icon"><Icon name="trophy" size={19} /></span><p><strong>Street Kings · Top 20 reward</strong><small>Sep 28 · Competition</small></p><b className="money">+₦5,000</b></div><div><span className="activity-icon"><Icon name="fire" size={19} /></span><p><strong>Live gifts</strong><small>Sep 24 · Creator support</small></p><b className="money">+₦3,250</b></div></div></div></main>{withdraw && <div className="sheet-backdrop" onClick={() => setWithdraw(false)}><div className="sheet" onClick={(e) => e.stopPropagation()}><div className="sheet-handle" /><div className="sheet-title"><div><span>AVAILABLE ₦18,500</span><h2>Withdraw earnings</h2></div><button onClick={() => setWithdraw(false)}>×</button></div><label className="amount-input"><span>₦</span><input autoFocus inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))} placeholder="0" /></label>{over && <p className="field-error">That’s more than your available balance.</p>}<div className="payout-row"><span>GTBank</span><strong>•••• 4208</strong></div><button className="primary" disabled={!amount || over} onClick={() => { setWithdraw(false); showToast("Withdrawal requested · usually approved within 24h"); }}>Withdraw ₦{Number(amount || 0).toLocaleString()}</button></div></div>}</>;
}

function ProfilePage({ showToast }: { showToast: (s: string) => void }) {
  const a = useArena();
  const [tab, setTab] = useState("Activity");
  const [studio, setStudio] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [view, setView] = useState<ViewItem | null>(null);
  const studioItems: [string, string, string, () => void][] = [
    ["trophy", "My Competitions", a.journey.registered ? "1 active" : "None active", () => setSub("Competitions")],
    ["film", "My Entries", a.journey.submitted ? entryStatus(a.journey, a.journey.phase).label : "No entries yet", () => { setStudio(false); a.journey.submitted ? a.backTo({ screen: "challenge", comp: "bdm" }) : a.setTab("competitions"); }],
    ["heart", "Supporting", "Creators you’ve voted for", () => setSub("Supporting")],
    ["bookmark", "Saved", `${a.saved.length} saved`, () => setSub("Saved")],
    ["wallet", "Earnings", "₦18,500 available", () => { setStudio(false); a.go({ screen: "earnings" }); }],
    ["check", "Verification", "Verified creator", () => showToast("You’re verified · ID confirmed Sep 12")],
    ["fire", "Live", "Unlocks at 1,000 followers", () => showToast("Go Live unlocks at 1,000 followers")],
    ["settings", "Settings", "Account, privacy, payouts", () => showToast("Settings opened")],
  ];
  const joined = a.comp(a.journey.registered ? "bdm" : "food");
  const latest: ViewItem = { image: fx.feed1, handle: "@adanwosu", avatar: fx.avatarAlexSm, time: "10s", caption: "Just my entry for the competition. This one’s for the dreamers. Let’s go....", likes: 200, comments: 4, shares: 10 };
  const liked: ViewItem = { image: fx.arenaDance, handle: "@calistrinx", avatar: fx.avatarMike, time: "2h", caption: "This is a tribute to all the passionate dancers out there. Let’s break it down!", likes: 100, comments: 10, shares: 14 };
  const act = (kind: React.ReactNode, name: string, v: ViewItem) => (
    <div className="fx-act">
      <span className="kind">{kind}</span>
      <div className="uh"><img src={v.avatar} alt="" /><div><b>{name}<span>{v.handle}</span></b><small>{v.time} ago</small></div></div>
      <p>{v.caption}</p>
      <button className="fx-media" onClick={() => setView(v)} aria-label="Play post"><img className="bg" src={v.image} alt="" /><span className="ctrl"><img src={fx.iPlayCircle} alt="" /><span className="vol"><img src={fx.iVolume} alt="" /></span></span></button>
      <div className="fx-actions"><div><button aria-label="Likes"><FxIcon src={fx.iHeart} />{v.likes}</button><button aria-label="Comments"><FxIcon src={fx.iMsg} />{v.comments}</button><button aria-label="Shares"><FxIcon src={fx.iSend} />{v.shares}</button></div><button aria-label="Save"><FxIcon src={fx.iBookmark} /></button></div>
    </div>
  );
  return (
    <div className="fx fx-prof">
      <ProfileSpotlight img={fx.avatarAlex} name="Ada Nwosu" handle="@adanwosu" tagline="Dancer · Lagos" kicker="NOW ON STAGE" bio="Movement artist. Finding rhythm in every story. Lagos, NG." onMore={() => setStudio(true)}
        stats={[["24.8k", "fans", () => a.go({ screen: "fans", tab: "Fans" })], ["842", "following", () => a.go({ screen: "fans", tab: "Following" })], ["128", "posts", () => setTab("Posts")], [a.journey.registered ? "1" : "0", "competing", () => { setSub("Competitions"); setStudio(true); }]]}>
        <button className="fx-btn md" onClick={() => showToast("Profile link copied")}>Share</button><button className="fx-btn md grey" onClick={() => showToast("Profile editor opened")}>Edit</button>
      </ProfileSpotlight>
      <button className="fx-stat-card" onClick={() => setStudio(true)}><div><span className="ic"><FxIcon src={fx.iGrid} /></span><span><b>Creator Stats</b><small>View Stats</small></span></div><FxIcon src={fx.iArrowRight} /></button>
      <nav className="fx-tabs even fx-prof-tabs">{["Activity", "Posts"].map((t) => <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}</nav>
      {tab === "Activity" ? (
        <div className="fx-activity">
          {act(<><FxIcon src={fx.iMagic} size={18} />Latest post</>, "Ada Nwosu", latest)}
          <div className="fx-act">
            <span className="kind"><FxIcon src={fx.iShareArrow} size={18} />Ada Nwosu joined competition</span>
            <div className="uh"><img src={fx.avatarAlexSm} alt="" /><div><b>Ada Nwosu<span>@adanwosu</span></b><small>2h ago</small></div></div>
            <button className="fx-act-comp" onClick={() => a.go({ screen: "competition", comp: joined.id })}><img src={joined.image} alt="" /><span className="cap"><strong>{joined.name}</strong><span><FxIcon src={fx.iUsers} size={16} />{kfmt(joined.contestants)} joined</span></span></button>
          </div>
          {act(<><FxIcon src={fx.iHeartBold} size={18} />Ada Nwosu liked</>, "Calistrinx", liked)}
        </div>
      ) : (
        <div className="fx-grid2" style={{ margin: "0 -16px" }}>{gallery.slice(0, 6).map((g, i) => (
          <button className="fx-ccard" key={g.title} onClick={() => setView({ image: g.image, handle: "@adanwosu", avatar: fx.avatarAlexSm, time: `${i + 1}d`, caption: g.title, likes: 120 + i * 37, comments: 8 + i, shares: 3 + i })}>
            <span className="m"><img src={g.image} alt={g.title} /><span className="views"><FxIcon src={fx.iPlay} size={18} />{g.views}</span></span>
            <span className="i"><p>{g.title}</p><span className="u"><img className="fx-avatar" src={fx.avatarAlexSm} width={30} height={30} alt="" /><span>@adanwosu</span></span></span>
          </button>
        ))}</div>
      )}
      {view && <FxViewer v={view} onClose={() => setView(null)} />}
      {studio && (
        <div className="sheet-backdrop" onClick={() => { setStudio(false); setSub(null); }}>
          <div className="sheet fx" onClick={(ev) => ev.stopPropagation()} style={{ maxHeight: "86vh", overflowY: "auto" }}>
            <div className="sheet-handle" />
            <div className="sheet-title"><div><span>{sub ? "CREATOR STUDIO" : "MENU"}</span><h2>{sub ?? "Creator Studio"}</h2></div><button onClick={() => (sub ? setSub(null) : setStudio(false))}>{sub ? "‹" : "×"}</button></div>
            {sub === "Competitions" ? <ProfileArenas /> : sub === "Supporting" ? <Supporting /> : sub === "Saved" ? (a.saved.length ? <div style={{ display: "grid", gap: 16 }}>{a.saved.map((id) => <CompCard key={id} c={a.comp(id)} />)}</div> : <FxEmpty title="No saved posts" copy="Bookmark competitions and posts and they’ll wait for you here." action="Explore competitions" onClick={() => { setStudio(false); a.setTab("competitions"); }} />)
              : <div className="fx-sheet-studio">{studioItems.map(([ic, t, s, fn]) => <button key={t} onClick={fn}><span className="ic"><Icon name={ic} size={19} /></span><span><b>{t}</b><small>{s}</small></span></button>)}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

const fanList: [string, string, string][] = [
  ["Alex Yemi", "@alexyemi", fx.fan1], ["Maria Gonzalez", "@mariagonzalez", fx.fan2], ["Liam Chen", "@liamchen", fx.fan3], ["Sofia Patel", "@sofiapatel", fx.fan4],
  ["Ethan Brooks", "@ethanbrooks", fx.fan5], ["Nia Johnson", "@niajohnson", fx.fan6], ["Elijah Martinez", "@elijahm", fx.fan7], ["Sophia Lee", "@sophialee", fx.fan8],
];

function FansScreen({ route }: { route: Route }) {
  const a = useArena();
  const [tab, setTab] = useState(route.tab === "Following" ? "Following" : "Fans");
  const [mine, setMine] = useState<string[]>(fanList.slice(2, 6).map((f) => f[1]));
  const list = tab === "Fans" ? fanList : fanList.filter((f) => mine.includes(f[1]));
  const toggle = (h: string) => { const on = mine.includes(h); setMine(on ? mine.filter((x) => x !== h) : [...mine, h]); a.toast(on ? `Unfollowed ${h}` : `Following ${h}`); };
  return (
    <div className="fx">
      <header className="fx-navhead"><Back onClick={a.back} /><h1>Ada Nwosu</h1><span /></header>
      <nav className="fx-tabs even">{["Fans", "Following"].map((t) => <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}</nav>
      {list.length ? (
        <div className="fx-follow-list">{list.map(([n, h, img]) => {
          const on = mine.includes(h);
          return <div key={h} className="fx-frow"><div><img className="av" src={img} alt="" /><span><b>{n}<img src={fx.verifyBold} alt="Verified" /></b><small>{h}</small></span></div><button className={`fx-btn md ${on ? "grey" : "solid"}`} onClick={() => toggle(h)}>{on ? "Following" : "Follow"}</button></div>;
        })}</div>
      ) : <FxEmpty icon={fx.iUsers} title="Not following anyone yet" copy="Follow creators you love and they’ll show up here." action="Discover creators" onClick={() => a.setTab("discover")} />}
    </div>
  );
}


function Notifications() {
  const a = useArena();
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [cleared, setCleared] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 800);
    const on = () => setScrolled(window.scrollY > 90);
    window.addEventListener("scroll", on);
    return () => { window.clearTimeout(t); window.removeEventListener("scroll", on); a.readNotes(); };
  }, []);
  const notes = cleared ? [] : a.notes;
  const groups: [string, Note[]][] = [["New", notes.filter((n) => n.unread)], ["Earlier", notes.filter((n) => !n.unread)]];
  return (
    <div className={`fx fx-notif ${scrolled ? "scrolled" : ""}`}>
      <div className="fx-sticky" aria-hidden={!scrolled}><Back onClick={a.back} /><h2>Notifications</h2><span /></div>
      <Back onClick={a.back} />
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}><h1 className="fx-title-lg">Notifications</h1>{!loading && notes.length > 0 && <button className="fx-link" style={{ marginBottom: 6 }} onClick={() => setCleared(true)}>Clear all</button>}</div>
      {loading ? <div className="fx-inline-loader"><FxLoader /></div>
        : notes.length === 0 ? <div style={{ paddingTop: 120 }}><FxEmpty bell title="No notifications yet" copy="No notifications now. Stay tuned for updates after contestants showcase their talents." /></div>
        : groups.filter(([, l]) => l.length).map(([g, l]) => (
          <section key={g}>
            <h3>{g}</h3>
            {l.map((n) => (
              <button key={n.id} className={`fx-nrow2 ${n.unread ? "unread" : ""}`} onClick={() => a.go(n.route)}>
                <span className="av">{["heart", "users"].includes(n.icon) ? <span className="fx-pair"><img src={fx.notifA} alt="" /><img src={fx.notifB} alt="" /></span> : <span className={`ti ${n.tone}`}><Icon name={n.icon} size={18} /></span>}</span>
                <span className="t"><b>{n.title}</b><span>{n.body}</span>{n.kind === "private" && <small><Icon name="lock" size={10} /> Private invitation</small>}</span>
                <span className="meta"><time>{n.time}</time>{n.unread && <i />}</span>
              </button>
            ))}
          </section>
        ))}
    </div>
  );
}


function CreateSheet({ close }: { close: () => void }) {
  const a = useArena();
  const [pick, setPick] = useState(false);
  const joinable = (["bdm", "face", "voice"] as CompId[]).map(a.comp);
  return (
    <div className="sheet-backdrop" onClick={close}>
      <div className="sheet create-sheet" onClick={(ev) => ev.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title"><div><span>{pick ? "ENTER A COMPETITION" : "TAKE THE STAGE"}</span><h2>{pick ? "Choose an arena" : "Create something"}</h2></div><button onClick={pick ? () => setPick(false) : close}>{pick ? "‹" : "×"}</button></div>
        {!pick ? (
          <div className="create-options">
            <button onClick={() => { close(); a.toast("Post creator opened — you can tag a competition optionally"); }}><span className="coral-bg"><Icon name="camera" /></span><div><strong>Create a post</strong><small>Share a performance · optional competition tag</small></div><Icon name="arrow" /></button>
            <button onClick={() => setPick(true)}><span className="violet-bg"><Icon name="trophy" /></span><div><strong>Enter a competition</strong><small>Register or continue your entry</small></div><Icon name="arrow" /></button>
            <button onClick={() => a.toast("Go Live unlocks when you meet creator eligibility")}><span className="muted-bg"><Icon name="fire" /></span><div><strong>Go live</strong><small>Complete eligibility to unlock</small></div><b>LOCKED</b></button>
          </div>
        ) : (
          <div className="create-options">
            {joinable.map((c) => {
              const cta = getCta(c, a.journey);
              return <button key={c.id} onClick={() => { close(); a.go({ screen: "competition", comp: c.id }); }}><img className="pick-thumb" src={c.image} alt="" /><div><strong>{c.name}</strong><small>{phaseLabel(c.phase, c.round)}</small></div><b className="pick-cta">{cta.label.toUpperCase()}</b></button>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function BottomNav({ active, setTab }: { active: Tab; setTab: (t: Tab) => void; openCreate?: () => void }) {
  const items: [Tab, string, string][] = [["home", "Home", fx.iHome], ["discover", "Discover", fx.iSearch], ["competitions", "Arena", fx.iCup], ["wallet", "Wallet", fx.iWallet], ["profile", "Menu", fx.iMenu]];
  return (
    <>
      <nav className="fx-nav fx" aria-label="Main">{items.map(([tab, label, ic]) => <button key={tab} className={active === tab ? "on" : ""} onClick={() => setTab(tab)} aria-current={active === tab ? "page" : undefined}><span className="pad"><FxIcon src={ic} /></span>{label}</button>)}</nav>
    </>
  );
}


/* ───────────────────────── Account & authentication ───────────────────────── */

type AuthStep = "onboard" | "email" | "sent" | "verify" | "password" | "username" | "done" | "signin";
const obSlides = [
  { t1: "Your talent", t2: "Deserves", word: "Stage", wide: false, dark: true },
  { t1: "Discover", t2: "Amazing", word: "Talent", wide: false, dark: true },
  { t1: "Compete &", t2: "Win", word: "Rewards", wide: true, dark: false },
];

function OnboardArt() {
  const card = (src: string, w: number, h: number, deg: number, border: number, radius: number): React.CSSProperties => ({ width: w, height: h, transform: `rotate(${deg}deg)`, border: `${border}px solid #f7f7f7`, borderRadius: radius, overflow: "hidden", backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" });
  return (
    <div className="fx-ob-art" aria-hidden="true">
      <img src={fx.ob1Swirl} alt="" style={{ left: -62.8, top: 78.6, width: 525.6, height: 525.6 }} />
      <img src={fx.ob1Bg} alt="" style={{ left: -186, top: -398, width: 736, height: 1308, objectFit: "cover" }} />
      <img src={fx.ob1Overlay} alt="" style={{ left: -186, top: -398, width: 736, height: 1308, objectFit: "cover" }} />
      <div style={{ left: 42, top: 123, ...card(fx.ob1Img3, 120, 133.3, -11.68, 2, 8) }} />
      <div style={{ left: 263, top: 219, ...card(fx.ob1Img2, 120, 133.3, 7.75, 2, 8) }} />
      <img src={fx.ob1Ring} alt="" style={{ left: -7, top: 408, width: 422, height: 126 }} />
      <img src={fx.ob1Character} alt="" style={{ left: 17, top: 131, width: 368, height: 373, objectFit: "cover", transform: "scaleX(-1)" }} />
      <div style={{ left: 20, top: 371, ...card(fx.ob1Img1, 100, 111.1, -12, 1.667, 6.667) }} />
      <div style={{ left: -126, top: 471, width: 648, height: 403, filter: "blur(42.65px)", backgroundImage: "linear-gradient(182.93deg, rgb(242,177,66) 2.78%, rgb(13,13,13) 34%)" }} />
    </div>
  );
}

function Auth({ onDone }: { onDone: (username: string) => void }) {
  const [step, setStep] = useState<AuthStep>("onboard");
  const [slide, setSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState("");
  const [codeState, setCodeState] = useState<"idle" | "checking" | "wrong" | "expired" | "resent" | "ok">("idle");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [username, setUsername] = useState("");
  const [nameState, setNameState] = useState("empty");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwTouched, setPwTouched] = useState(false);
  const otpRef = useRef<HTMLInputElement>(null);
  const touchX = useRef<number | null>(null);
  const masked = email ? `${email.slice(0, 2)}*@${email.split("@")[1] ?? ""}` : "";

  useEffect(() => { if (cooldown <= 0) return; const t = window.setTimeout(() => setCooldown(cooldown - 1), 1000); return () => window.clearTimeout(t); }, [cooldown]);
  useEffect(() => {
    const u = username.trim();
    if (!u) return setNameState("empty");
    if (!/^[a-z0-9._]+$/i.test(u)) return setNameState("invalid");
    if (u.length < 3 || u.length > 30) return setNameState("length");
    setNameState("checking");
    const t = window.setTimeout(() => setNameState(["zurimoves", "admin", "darena", "ada"].includes(u.toLowerCase()) ? "taken" : "available"), 700);
    return () => window.clearTimeout(t);
  }, [username]);
  useEffect(() => { if (step === "done") { const t = window.setTimeout(() => onDone(username || "guest"), 1700); return () => window.clearTimeout(t); } }, [step]);

  const after = (ms: number, fn: () => void) => { setBusy(true); window.setTimeout(() => { setBusy(false); fn(); }, ms); };
  const submitEmail = () => {
    const v = email.trim();
    if (!v) return setEmailErr("Enter your email address.");
    if (!/^\S+@\S+\.\S+$/.test(v)) return setEmailErr("Enter a valid email address.");
    setEmailErr("");
    after(900, () => {
      if (v.startsWith("taken@")) return setEmailErr("exists");
      if (v.startsWith("offline@")) return setEmailErr("Check your connection and try again.");
      setCooldown(20); setStep("sent");
    });
  };
  const verify = (value: string) => {
    setCodeState("checking");
    window.setTimeout(() => {
      if (value === "00000") return setCodeState("expired");
      if (value !== "12345") {
        const n = attempts + 1; setAttempts(n);
        if (n >= 3) { setLocked(true); setCode(""); setCodeState("idle"); } else setCodeState("wrong");
        return;
      }
      setCodeState("ok");
      window.setTimeout(() => setStep("password"), 500);
    }, 900);
  };
  const bad = codeState === "wrong" || codeState === "expired";
  const onCode = (v: string) => {
    let d = v.replace(/\D/g, "");
    if (bad) d = d.length > code.length ? d.slice(-1) : "";
    d = d.slice(0, 5);
    setCode(d);
    if (bad || codeState === "resent") setCodeState("idle");
    if (d.length === 5) verify(d);
  };
  const resend = () => { if (cooldown > 0) return; setCooldown(20); setCode(""); setCodeState("resent"); otpRef.current?.focus(); };
  const rules = [["8 characters (20 max)", pw.length >= 8 && pw.length <= 20], ["1 Letter and 1 number", /[a-z]/i.test(pw) && /\d/.test(pw)], ["1 special character (Eg, “£$%&!)", /[^a-z0-9]/i.test(pw)]] as [string, boolean][];
  const passed = rules.filter((r) => r[1]).length;
  const pwBad = pwTouched && pw.length > 0 && passed < 3;
  const backMap: Partial<Record<AuthStep, AuthStep>> = { email: "onboard", sent: "email", verify: "sent", password: "verify", username: "password", signin: "onboard" };
  const back = () => { if (step === "email" || step === "signin") setSlide(2); setStep(backMap[step]!); };
  const top = (close?: boolean, skip = true) => (
    <div className="fx-auth-top">
      <button className="fx-circle ring" onClick={back} aria-label={close ? "Close" : "Go back"}><FxIcon src={close ? fx.iClose : fx.iArrowLeft} /></button>
      {skip && <button className="fx-skip" onClick={() => onDone(username || "guest")}>Skip</button>}
    </div>
  );
  const pwField = (
    <div>
      <label className={`fx-input ${pwBad ? "error" : ""}`}>
        <input type={showPw ? "text" : "password"} value={pw} onChange={(ev) => setPw(ev.target.value)} onBlur={() => setPwTouched(true)} placeholder="Password" aria-label="Password" maxLength={20} />
        <button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Hide password" : "Show password"}><FxIcon src={fx.iEye} size={20} /></button>
      </label>
      <p className={`fx-help ${pwBad ? "error" : ""}`}>Your password must at least:</p>
      <ul className={`fx-rules ${pwBad ? "error" : ""}`}>{rules.map(([r, ok]) => <li key={r} className={ok ? "ok" : ""}><FxIcon src={fx.iTick} size={16} />{r}</li>)}</ul>
    </div>
  );

  if (step === "onboard") {
    const s = obSlides[slide];
    const next = () => (slide < 2 ? setSlide(slide + 1) : setStep("email"));
    return (
      <div className="fx fx-ob fx-noise" style={noiseVar}
        onTouchStart={(ev) => { touchX.current = ev.touches[0].clientX; }}
        onTouchEnd={(ev) => { if (touchX.current === null) return; const dx = ev.changedTouches[0].clientX - touchX.current; touchX.current = null; if (dx < -40 && slide < 2) setSlide(slide + 1); if (dx > 40 && slide > 0) setSlide(slide - 1); }}>
        {slide === 0 && <OnboardArt />}
        <div className="fx-ob-copy">
          <div className="fx-dots">{obSlides.map((_, i) => <button key={i} className={i === slide ? "on" : ""} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1} of 3`} />)}</div>
          <div className="fx-ob-title" key={slide}>
            <span className="t1">{s.t1}</span>
            <span className="t2">{s.t2}</span>
            <div className="fx-ob-word" style={{ width: s.wide ? 228 : 208 }}>
              <img src={s.wide ? fx.brush3 : fx.brush1} alt="" style={s.wide ? { left: 7.8, top: 7, width: 223, height: 66 } : { left: -1.7, top: 8, width: 221, height: 63.7 }} />
              <span style={{ color: s.dark ? "#1d1d1d" : "#f7f7f7" }}>{s.word}</span>
            </div>
          </div>
          <button className="fx-btn" onClick={next}>{slide < 2 ? "Continue" : "Get Started"}</button>
          {slide === 2 && <button className="fx-ob-alt" onClick={() => setStep("signin")}>I already have an account</button>}
        </div>
      </div>
    );
  }

  if (step === "done") return <div className="fx fx-auth fx-noise" style={noiseVar}><div style={{ margin: "auto" }}><FxLoader label="You’re all set." /></div></div>;

  return (
    <div className="fx fx-auth fx-noise" style={noiseVar}>
      {step === "signin" && <>
        {top(false, false)}
        <h1 className="xl">Welcome back.</h1>
        <p className="fx-lede">Sign in to pick up where you left off.</p>
        <div className="form">
          <label className="fx-input"><input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Email address" aria-label="Email address" /></label>
          {pwField}
        </div>
        <div className="grow" />
        <button className="fx-btn" disabled={!/^\S+@\S+\.\S+$/.test(email) || passed < 3 || busy} onClick={() => after(900, () => onDone(email.split("@")[0]))}>Sign in</button>
      </>}

      {step === "email" && <>
        {top()}
        <h1>What’s your email address?</h1>
        <div className="form">
          <div>
            <label className={`fx-input ${emailErr ? "error" : ""}`}><input autoFocus type="email" value={email} onChange={(ev) => { setEmail(ev.target.value); setEmailErr(""); }} onKeyDown={(ev) => ev.key === "Enter" && submitEmail()} placeholder="Email address" aria-label="Email address" /></label>
            {emailErr === "exists" ? <p className="fx-help error">An account already exists with this email. <button className="fx-link" onClick={() => setStep("signin")}>Sign in</button></p> : emailErr && <p className="fx-help error">{emailErr}</p>}
            <p className="demo">Demo: try taken@… or offline@… to see errors.</p>
          </div>
        </div>
        <div className="grow" />
        <button className="fx-btn" disabled={!email.trim() || busy} onClick={submitEmail}>Continue</button>
      </>}

      {step === "sent" && <div className="fx-inbox" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {top(true)}
        <div className="fx-inbox-art"><img src={fx.inbox1} alt="" /><img src={fx.inbox2} alt="" /></div>
        <h1>Check your inbox</h1>
        <p className="body">Haven’t received an email? Try searching your spam folder. If you don’t receive the message in the next hour, you can <button onClick={() => { setCooldown(20); setCodeState("resent"); }}>request another verification email.</button></p>
        <button className="fx-btn" onClick={() => { setStep("verify"); window.setTimeout(() => otpRef.current?.focus(), 60); }}>Continue</button>
        <p className="after">Wrong email? <button onClick={() => setStep("email")}>Change it here</button></p>
      </div>}

      {step === "verify" && <>
        {top()}
        <h1>Enter the code we sent you</h1>
        <p className="sub">We sent a 5-digit code to <b>{masked}</b></p>
        <label className={`fx-otp ${bad ? "error" : ""}`}>
          <input ref={otpRef} inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(ev) => onCode(ev.target.value)} disabled={codeState === "checking" || codeState === "ok" || locked} aria-label="Verification code" />
          {Array.from({ length: 5 }).map((_, k) => <span key={k} className={!bad && k === code.length && codeState !== "checking" ? "cur" : code[k] ? "filled" : ""}>{code[k] ?? ""}</span>)}
        </label>
        {codeState === "wrong" && <p className="fx-help error">That code is incorrect. Please try again.</p>}
        {codeState === "expired" && <p className="fx-help error">This code has expired. Request a new code.</p>}
        {codeState === "resent" && <p className="fx-help ok">New code sent. Use the latest code in your inbox.</p>}
        <div className="fx-resend">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5" /></svg>
          {cooldown > 0 ? <span>Resend in {cooldown} seconds</span> : <button onClick={resend}>Resend Code</button>}
        </div>
        <p className="demo">Demo: 12345 is correct · 00000 is expired.</p>
        <div className="grow" />
        <button className="fx-btn" disabled={code.length < 5 || codeState === "checking" || codeState === "ok"} onClick={() => verify(code)}>Done</button>
      </>}

      {step === "password" && <>
        {top()}
        <h1>Create password</h1>
        <div className="form">{pwField}</div>
        <div className="grow" />
        <button className="fx-btn" disabled={passed < 3 || busy} onClick={() => after(800, () => setStep("username"))}>Continue</button>
      </>}

      {step === "username" && <>
        {top()}
        <h1>Choose a username</h1>
        <div className="form">
          <div>
            <label className={`fx-input ${["taken", "invalid", "length"].includes(nameState) ? "error" : ""}`}>
              <input autoFocus maxLength={30} value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder="Username" aria-label="Username" />
              {username && <button type="button" onClick={() => setUsername("")} aria-label="Clear username"><Icon name="x" size={18} /></button>}
            </label>
            <p className="fx-counter">{username.length}/30</p>
            {nameState !== "empty" && <p className={`fx-help ${nameState === "available" ? "ok" : ["taken", "invalid", "length"].includes(nameState) ? "error" : ""}`}>
              {{ checking: "Checking availability…", available: "Username is available", taken: "That username is taken. Try another.", invalid: "Use only letters, numbers, dots and underscores.", length: "Usernames are 3–30 characters." }[nameState]}
            </p>}
            {nameState === "taken" && <div className="fx-chips" style={{ padding: 0, marginTop: 12 }}>{[`${username}.moves`, `${username}_ng`, `the.${username}`].map((s) => <button key={s} onClick={() => setUsername(s)}>@{s}</button>)}</div>}
          </div>
        </div>
        <div className="grow" />
        <button className="fx-btn" disabled={nameState !== "available" || busy} onClick={() => after(800, () => setStep("done"))}>Continue</button>
      </>}

      {(busy || codeState === "checking") && <FxBusy />}
      {locked && <div className="sheet-backdrop"><div className="sheet"><div className="sheet-handle" /><div className="sheet-state"><div className="state-icon warn"><Icon name="lock" size={24} /></div><h2>Too many attempts</h2><p>You’ve tried too many times. Please wait before trying again.</p></div><button className="fx-btn" onClick={() => { setLocked(false); setAttempts(0); setCodeState("idle"); setCooldown(20); }}>OK</button></div></div>}
    </div>
  );
}


let noteId = 10;

export default function App() {
  const [splash, setSplash] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [stack, setStack] = useState<Route[]>([{ screen: "home" }]);
  const [journey, setJourneyState] = useState<Journey>(initialJourney);
  const [coins, setCoins] = useState(120);
  const [extra, setExtra] = useState<Record<string, number>>({});
  const [mine, setMine] = useState<Record<string, number>>({});
  const [free, setFree] = useState<string[]>([]);
  const [following, setFollowing] = useState<CompId[]>([]);
  const [saved, setSaved] = useState<CompId[]>(["food"]);
  const [creators, setCreators] = useState<string[]>(["@thee_lydia", "@alex"]);
  const [offline, setOffline] = useState(typeof navigator !== "undefined" && !navigator.onLine);
  useEffect(() => {
    const on = () => setOffline(false), off = () => setOffline(true);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);
  const [create, setCreate] = useState(false);
  const [host, setHost] = useState(false);
  const [judge, setJudgeState] = useState<Judge>(initialJudge);
  const [judgeSim, setJudgeSim] = useState(false);
  const [seat, setSeat] = useState<string | null>(null);
  const [push, setPush] = useState<(Push & { k: number }) | null>(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(0);
  const [notes, setNotes] = useState<Note[]>([
    { id: 0, icon: "mail", tone: "neutral", kind: "private", title: "You’ve been invited to judge Street Dance Cypher", body: "Private invitation · Respond by Oct 3.", time: "Just now", route: { screen: "judgeInvite" }, unread: true },
    { id: 1, icon: "bolt", tone: "coral", title: "Voting is now live", body: "Round 2 of Afrobeat Arena is open. Support your favourite entries before voting closes.", time: "12 min ago", route: { screen: "arena", comp: "voice", entry: 0 }, unread: true },
    { id: 2, icon: "eye", tone: "violet", title: "Naija Laugh Cup showcase", body: "Round 1 entries are up. Voting opens tomorrow.", time: "1h ago", route: { screen: "competition", comp: "comedy", tab: "Arena" }, unread: true },
    { id: 4, icon: "wallet", tone: "violet", title: "Your withdrawal was approved", body: "₦20,000 is on its way to GTBank •••• 4208.", time: "3h ago", route: { screen: "wallet" }, unread: true },
    { id: 5, icon: "heart", tone: "violet", title: "@alex voted for your post", body: "And 23 others supported creators you follow today.", time: "Yesterday", route: { screen: "profile" }, unread: false },
    { id: 3, icon: "crown", tone: "violet", title: "Street Kings has a champion", body: "@kez.moves won Season 2. See the final standings.", time: "Yesterday", route: { screen: "results", comp: "kings" }, unread: false },
  ]);
  const route = stack[stack.length - 1];

  const showToast = (message: string) => { setToast(message); window.clearTimeout(toastTimer.current); toastTimer.current = window.setTimeout(() => setToast(""), 2600); };
  const setTab = (tab: Tab) => { setStack([{ screen: tab }]); window.scrollTo({ top: 0 }); };
  const go = (r: Route) => { setCreate(false); setStack((s) => [...s, r]); window.scrollTo({ top: 0 }); };
  const back = () => { setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)); window.scrollTo({ top: 0 }); };
  const notify = (n: Omit<Note, "id" | "time" | "unread">) => setNotes((list) => [{ ...n, id: ++noteId, time: "Just now", unread: true }, ...list]);

  const comp = (id: CompId): Comp => {
    const base = comps.find((c) => c.id === id)!;
    if (id !== "bdm") return base;
    const p = journey.phase;
    const showMe = journey.submitted && journey.review === "approved" && arenaOpen(p);
    const meVotes = p === "results" ? (journey.outcome === "advanced" ? 9800 : 3400) : 8640;
    const rot = (journey.round - 1) % base.entries.length;
    const pool = (journey.round > 1 ? base.entries.slice(0, 8) : base.entries).map((x, i) => ({ ...x, image: base.entries[(i + rot) % base.entries.length].image }));
    const meEntry = { id: "me", name: "Ada Nwosu", handle: "@adanwosu", image: clips[journey.clip], votes: meVotes, trend: "up" as const, caption: journey.caption || "My entry for Best Dance Moves." };
    const entries = showMe ? [...pool.slice(0, 2), meEntry, ...pool.slice(2)] : pool;
    return { ...base, phase: p, round: journey.round, time: bdmTime[p], entries };
  };
  const key = (c: CompId, en: Entry) => `${c}:${en.id}`;
  const votesOf = (c: CompId, en: Entry) => en.votes + (extra[key(c, en)] ?? 0);
  const myVotes = (c: CompId, en: Entry) => mine[key(c, en)] ?? 0;
  const castVotes = (c: CompId, en: Entry, n: number, isFree: boolean) => {
    setExtra((x) => ({ ...x, [key(c, en)]: (x[key(c, en)] ?? 0) + n }));
    setMine((x) => ({ ...x, [key(c, en)]: (x[key(c, en)] ?? 0) + n }));
    if (isFree) setFree((f) => [...f, c]);
  };

  // Auto-approve pending entries to mimic host review.
  useEffect(() => {
    if (journey.review !== "pending") return;
    const t = window.setTimeout(() => {
      setJourneyState((j) => (j.review === "pending" ? { ...j, review: "approved" } : j));
      notify({ icon: "check", tone: "violet", title: "Your entry was approved", body: "You’re officially competing. Showcase begins when the round closes.", route: { screen: "challenge", comp: "bdm" } });
      showToast("Your entry was approved");
    }, 5000);
    return () => window.clearTimeout(t);
  }, [journey.review]);

  const act = (c: Comp, action: Action) => {
    const routes: Partial<Record<Action, Route>> = {
      register: { screen: "register", comp: c.id }, challenge: { screen: "challenge", comp: c.id }, submit: { screen: "submit", comp: c.id }, myEntry: { screen: "challenge", comp: c.id },
      entries: { screen: "competition", comp: c.id, tab: "Arena" }, detail: { screen: "competition", comp: c.id }, vote: { screen: "arena", comp: c.id, entry: 0 },
      leaderboard: { screen: "leaderboard", comp: c.id }, results: { screen: "results", comp: c.id },
    };
    if (action === "vote" && judge.status === "accepted" && c.id === JUDGE_COMP) { go({ screen: "competition", comp: c.id }); return; }
    if (action === "notify") {
      const on = following.includes(c.id);
      setFollowing((f) => (on ? f.filter((x) => x !== c.id) : [...f, c.id]));
      showToast(on ? "Reminder removed" : `We’ll notify you when ${c.name} registration opens`);
      return;
    }
    go(routes[action]!);
  };

  const ctx: ArenaCtx = {
    journey, setJourney: (f) => setJourneyState(f), comp, go, back, setTab, act, toast: showToast, coins, setCoins, votesOf, myVotes, castVotes,
    freeUsed: (c) => free.includes(c), notes, notify, readNotes: () => setNotes((l) => l.map((n) => ({ ...n, unread: false }))), openHost: () => setHost(true),
    patch: (p) => setStack((s) => [...s.slice(0, -1), { ...s[s.length - 1], ...p }]),
    backTo: (r) => setStack((s) => { for (let i = s.length - 1; i >= 0; i--) if (s[i].screen === r.screen && s[i].comp === r.comp) return [...s.slice(0, i), { ...s[i], ...r }]; return [...s, r]; }),
    followsCreator: (h) => creators.includes(h), toggleCreator: (h) => setCreators((l) => (l.includes(h) ? l.filter((x) => x !== h) : [...l, h])),
    fanVotes: Object.entries(mine).map(([k, n]) => { const [c, id] = k.split(":") as [CompId, string]; return { c, en: comp(c).entries.find((x) => x.id === id)!, n }; }).filter((x) => x.en),
    saved, toggleSave: (c) => { const on = saved.includes(c); setSaved((f) => (on ? f.filter((x) => x !== c) : [...f, c])); showToast(on ? "Removed from saved" : "Competition saved"); },
    following, toggleFollow: (c) => setFollowing((f) => (f.includes(c) ? f.filter((x) => x !== c) : [...f, c])),
    judge, setJudge: (f) => setJudgeState(f), judging: (c) => c === JUDGE_COMP && judge.status === "accepted",
    replace: (r) => { setStack((s) => [...s.slice(0, -1), r]); window.scrollTo({ top: 0 }); },
    push: (p) => setPush({ ...p, k: Date.now() }), openJudgeSim: () => setJudgeSim(true), openCreate: () => setCreate(true), seat, setSeat,
  };

  const isTab = ["home", "discover", "competitions", "wallet", "profile"].includes(route.screen);
  const navTab = (isTab ? route.screen : route.screen === "notifications" ? "home" : null) as Tab | null;
  const unread = notes.some((n) => n.unread);
  const content = (() => {
    switch (route.screen) {
      case "home": return <Home openCompetitions={() => setTab("competitions")} openViewer={() => go({ screen: "arena", comp: "voice", entry: 0 })} openNotifications={() => go({ screen: "notifications" })} showToast={showToast} />;
      case "discover": return <DiscoverPage />;
      case "competitions": return <CompetitionsPage />;
      case "competition": return judge.status === "accepted" && route.comp === JUDGE_COMP ? <JudgeCompetition key={`j-${stack.length}`} /> : <CompetitionDetail key={`${route.comp}-${stack.length}`} route={route} />;
      case "register": return <RegisterScreen />;
      case "registered": return <RegisteredScreen />;
      case "challenge": return <ChallengeScreen />;
      case "submit": return <SubmitFlow key={stack.length} />;
      case "arena": return <Arena key={stack.length} route={route} />;
      case "creator": return <CreatorProfile route={route} />;
      case "leaderboard": return <LeaderboardScreen route={route} />;
      case "results": return <ResultsScreen route={route} />;
      case "wallet": return <WalletPage resume={!!route.buy} coins={coins} setCoins={setCoins} showToast={showToast} openEarnings={() => go({ screen: "earnings" })} />;
      case "earnings": return <Earnings onBack={back} showToast={showToast} />;
      case "profile": return <ProfilePage showToast={showToast} />;
      case "notifications": return <Notifications />;
      case "judgeInvite": return <JudgeInvite key={`${judge.status}-${stack.length}`} />;
      case "judgeAccepted": return <JudgeAccepted />;
      case "judgeEntry": return <JudgeEntryScreen key={route.pick} route={route} />;
      case "judgeAwarded": return <JudgeAwarded key={route.pick} route={route} />;
      case "judgeThanks": return <JudgeThanks />;
      case "fans": return <FansScreen route={route} />;
    }
  })();

  return (
    <ArenaContext.Provider value={ctx}>
      <div className={`app-shell fx-shell ${navTab && authed ? "with-nav" : ""} ${unread ? "" : "all-read"}`}>
        {!authed ? <Auth onDone={(u) => { setAuthed(true); setStack([{ screen: "home" }]); showToast(`Welcome to the Arena, @${u}`); window.setTimeout(() => setPush({ title: "You’ve been invited to judge Street Dance Cypher", body: "Private invitation. Tap to review the details.", route: { screen: "judgeInvite" }, k: Date.now() }), 3200); }} /> : <>
        <div className="screen-anim" key={`${route.screen}-${stack.length}`}>{content}</div>
        {navTab && <BottomNav active={navTab} setTab={setTab} openCreate={() => setCreate(true)} />}
        {create && <CreateSheet close={() => setCreate(false)} />}
        {host && <HostSheet close={() => setHost(false)} />}
        {judgeSim && <JudgeSim close={() => setJudgeSim(false)} />}
        {push && <PushBanner key={push.k} p={push} close={() => setPush(null)} open={() => { const r = push.route; setPush(null); go(r); }} />}
        </>}
        {offline && <div className="offline-bar"><Icon name="alert" size={14} /> You’re offline · showing saved content</div>}
        {toast && <div className="toast"><Icon name="check" size={17} />{toast}</div>}
        {splash && <Splash onDone={() => setSplash(false)} />}
      </div>
    </ArenaContext.Provider>
  );
}
