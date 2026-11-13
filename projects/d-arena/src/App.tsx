import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type Tab = "home" | "discover" | "competitions" | "wallet" | "profile";
type Screen = Tab | "competition" | "register" | "registered" | "challenge" | "submit" | "arena" | "creator" | "leaderboard" | "results" | "notifications" | "earnings" | "judgeInvite" | "judgeAccepted" | "judgeEntry" | "judgeAwarded" | "judgeThanks";
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
    id: "bdm", name: "Best Dance Moves", category: "Dance", cadence: "DARENA Talent Season 1", image: photos.dance, prize: "₦500,000", contestants: 124, totalRounds: 5, safe: 5,
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
    id: "dance", name: "Street Dance Cypher", category: "Dance", cadence: "Monthly", image: photos.dance, prize: "₦500,000", contestants: 1248, totalRounds: 3, safe: 5,
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
    id: "food", name: "Kitchen Masters", category: "Food", cadence: "Monthly", image: photos.chef, prize: "₦300,000", contestants: 642, totalRounds: 3, safe: 4,
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
  judge: Judge; setJudge: (f: (j: Judge) => Judge) => void; judging: (c: CompId) => boolean; replace: (r: Route) => void; push: (p: Push) => void; openJudgeSim: () => void; seat: string | null; setSeat: (s: string) => void;
};
const ArenaContext = createContext<ArenaCtx | null>(null);
const useArena = () => useContext(ArenaContext)!;

/* ───────────────────────── Splash ───────────────────────── */

function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const finish = () => { if (leaving) return; setLeaving(true); window.setTimeout(onDone, 650); };
  useEffect(() => { const t = window.setTimeout(finish, 3600); return () => window.clearTimeout(t); });
  return (
    <div className={`splash ${leaving ? "leaving" : ""}`} onClick={finish} role="button" aria-label="Enter D-Arena">
      <img className="splash-photo" src={photos.stage} alt="" />
      <div className="splash-veil" />
      <div className="splash-beam one" /><div className="splash-beam two" />
      <div className="splash-grain" />
      <div className="splash-center">
        <div className="splash-mark">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c9a45c" /><stop offset="1" stopColor="#8a7a5c" /></linearGradient></defs>
            <path className="mark-outline" d="M50 4 96 50 50 96 4 50Z" />
            <path className="mark-fill" d="M50 14 86 50 50 86 14 50Z" />
          </svg>
          <span>D</span>
        </div>
        <div className="splash-word" aria-label="D-Arena">{"D—ARENA".split("").map((ch, i) => <span key={i} style={{ animationDelay: `${1.05 + i * 0.07}s` }}>{ch}</span>)}</div>
        <p className="splash-tag">Where talent takes the stage</p>
      </div>
      <div className="splash-foot"><div className="splash-bar"><i /></div><span>SEASON 03 · LAGOS</span></div>
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

function HubCard({ c }: { c: Comp }) {
  const a = useArena();
  const saved = a.saved.includes(c.id);
  const left = c.phase === "upcoming" ? c.time : c.phase === "completed" ? "Ended" : c.time || phaseLabel(c.phase, c.round);
  return (
    <article className="hub-card" onClick={() => a.go({ screen: "competition", comp: c.id })}>
      <img src={c.image} alt="" />
      <div className="hub-shade" />
      <div className="hub-top">
        <span className="hub-time"><i className={`live-dot ${stageInfo(c).tone}`} />{arenaOpen(c.phase) ? stageInfo(c).label : left}</span>
        <button className={saved ? "hub-save on" : "hub-save"} aria-label={saved ? "Remove bookmark" : "Bookmark competition"} onClick={(ev) => { ev.stopPropagation(); a.toggleSave(c.id); }}><Icon name="bookmark" size={15} filled={saved} /></button>
      </div>
      <div className="hub-copy">
        <small>{c.category}</small>
        <h3>{c.name}</h3>
        <span className="hub-people"><Icon name="users" size={11} />{c.contestants.toLocaleString()} contestants</span>
        <div className="hub-foot"><strong>{c.prize}</strong><i><Icon name="arrow" size={14} /></i></div>
      </div>
      {c.id === "bdm" && a.journey.registered && <b className="hub-you">YOU’RE IN</b>}
    </article>
  );
}

function CompetitionsPage() {
  const a = useArena();
  const [tab, setTab] = useState("Ongoing");
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const groups: Record<string, CompId[]> = { Ongoing: ["bdm", "dance", "food", "voice", "comedy"], Upcoming: ["face"], Past: ["kings"] };
  const pool = groups[tab].map(a.comp);
  const cats = ["All", ...Array.from(new Set(pool.map((c) => c.category)))];
  const list = pool.filter((c) => (cat === "All" || c.category === cat) && (c.name + c.category).toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <>
      <header className="topbar">
        <div className="topbar-side"><div className="brand-mark"><span>D</span></div></div>
        <h1 className="page-title">Competitions</h1>
        <div className="topbar-side end"><button className="icon-button notify" aria-label="Notifications" onClick={() => a.go({ screen: "notifications" })}><Icon name="bell" /><i /></button></div>
      </header>
      <main className="page hub">
        <p className="hub-sub">Find a challenge. Watch the talent. Support your favourites.</p>
        <div className="search-box hub-search"><Icon name="search" size={18} /><input value={q} onChange={(ev) => setQ(ev.target.value)} placeholder="Search competitions" />{q && <button className="plain" onClick={() => setQ("")} aria-label="Clear"><Icon name="x" size={15} /></button>}</div>
        <div className="segmented">{Object.keys(groups).map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => { setTab(item); setCat("All"); }}>{item}</button>)}</div>
        {cats.length > 2 && <div className="chip-row">{cats.map((x) => <button key={x} className={cat === x ? "chip active" : "chip"} onClick={() => setCat(x)}>{x}</button>)}</div>}
        {list.length ? <div className="hub-grid">{list.map((c) => <HubCard key={c.id} c={c} />)}</div> : <EmptyState title={q ? "No competitions match" : "Nothing here yet"} copy={q ? `We couldn’t find “${q}”. Try a category like Dance or Food.` : "New competitions are announced every week. Check Upcoming."} action={q ? "Clear search" : "See ongoing"} onClick={() => { setQ(""); setTab("Ongoing"); }} />}
      </main>
    </>
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

function CompetitionDetail({ route }: { route: Route }) {
  const a = useArena();
  const c = a.comp(route.comp!);
  const j = a.journey;
  const isBdm = c.id === "bdm";
  const contestant = isBdm && j.registered;
  const areas: LobbyArea[] = ["Overview", "Rules", "Leaderboard", "Results", ...(contestant ? (["My Journey"] as LobbyArea[]) : [])];
  const [area, setAreaState] = useState<LobbyArea | null>(route.tab && areas.includes(route.tab as LobbyArea) ? (route.tab as LobbyArea) : null);
  const setArea = (t: LobbyArea | null) => { setAreaState(t); a.patch({ tab: t ?? undefined }); };
  const st = stageInfo(c);
  const open = arenaOpen(c.phase);
  const openArena = (entry?: number) => a.go({ screen: "arena", comp: c.id, entry });
  const join = () => a.go({ screen: "register", comp: c.id });
  const me = c.entries.find((x) => x.id === "me");
  const out = j.phase === "results" && j.outcome === "eliminated";
  const arenaCta: [string, () => void] = open ? ["Enter the Arena", () => openArena()] : ["Preview the Arena", () => openArena()];
  let second: [string, string, () => void] | null = null;
  if (contestant) {
    if (out) second = ["View Results", "Your journey has ended — take a seat in the audience", () => setArea("Results")];
    else if (j.submitted && j.review === "approved" && me) second = ["View My Entry", "Your entry is on stage", () => openArena(c.entries.indexOf(me))];
    else if (j.submitted) second = ["View My Entry", j.review === "rejected" ? "Needs attention" : "Under review", () => setArea("My Journey")];
    else second = ["Continue Competition", "Your challenge is waiting backstage", () => setArea("My Journey")];
  } else if (regOpen(c)) second = ["Register to Compete", c.phase === "showcase" ? "Late entries close when voting opens" : "Registration is open", join];
  const ranked = rankList(a.votesOf, c);
  const sched = lobbySchedule(c);
  const last = lastDoneRound(c);
  const live = c.phase === "showcase" || c.phase === "voting";
  const tilesRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = tilesRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: "0px 0px -28% 0px", threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const pick = (i: number) => openArena(i);
  const teasers: Record<string, React.ReactNode> = {
    Overview: `${isBdm ? "₦500,000" : c.prize} grand prize · ${c.totalRounds} rounds`,
    Rules: "How the show is judged",
    Leaderboard: <span className="lt-mini">{(votingVisible(c.phase) ? ranked : c.entries).slice(0, 3).map((x) => <img key={x.id} src={x.image} alt="" />)}<i className={`live-dot ${c.phase === "voting" ? "live" : "muted"}`} />{c.phase === "voting" ? "LIVE" : votingVisible(c.phase) ? "FINAL" : "Opens soon"}</span>,
    Results: last ? `Round ${last} results are in` : "First results after voting",
  };
  const content = (k: LobbyArea) => {
    switch (k) {
      case "Overview": return <Programme c={c} />;
      case "Rules": return <NoticeBoard c={c} />;
      case "Leaderboard": return <BigScreen c={c} onPick={pick} full={() => a.go({ screen: "leaderboard", comp: c.id })} />;
      case "Results": return <AnnouncementsStage c={c} onPick={pick} full={() => a.go({ screen: "results", comp: c.id })} />;
      default: return <div className="lp-journey"><JourneyPanel c={c} openArena={openArena} /></div>;
    }
  };
  return (
    <>
      <div className="cd-hero lobby-hero">
        <img src={c.image} alt={`${c.name} stage`} />
        <div className="cd-shade" />
        <span className="lh-beam b1" aria-hidden="true" /><span className="lh-beam b2" aria-hidden="true" /><span className="lh-beam b3" aria-hidden="true" />
        <button className="floating-back" onClick={a.back} aria-label="Go back"><Icon name="back" /></button>
        <div className="floating-right">{isBdm && <HostButton />}<button className="floating-round" onClick={() => a.toast("Show link copied")} aria-label="Share show"><Icon name="share" size={19} /></button></div>
        <div className="cd-title">
          <div className="lh-badges">
            {live ? <span className="lh-live"><i className="live-dot live" />LIVE</span> : <span className="cd-badge"><i className={`live-dot ${st.tone}`} />{st.label.toUpperCase()}</span>}
            <span className="lh-aud"><Icon name="users" size={12} />{open ? "12.4K in the audience" : "2.1K waiting at the gates"}</span>
          </div>
          <p className="lh-round">ROUND {c.round} · {rName(c.id, c.round).toUpperCase()}</p>
          <h1>{c.name}</h1>
          <p className="lh-season">{c.cadence}</p>
        </div>
      </div>
      <main className="venue-lobby">
        <div className="event-pass">
          <div><small>LIVE FROM</small><strong>Lagos</strong></div>
          <div><small>DATES</small><strong>{passDates(sched)}</strong></div>
          <div><small>ENTRY</small><strong className="gold">Free</strong></div>
        </div>
        <div className="lobby-label"><span>EXPLORE THE SHOW</span><p>Find out everything before the curtain goes up.</p></div>
        <div className="lobby-tiles" ref={tilesRef}>
          {lobbyTiles.map((t, i) => <LobbyTile key={t.k} t={t} i={i} inView={inView} teaser={teasers[t.k]} onOpen={() => setArea(t.k)} />)}
        </div>
        <section className="passes">
          <button className="pass audience" onClick={arenaCta[1]}>
            <div className="pass-main"><small>YOUR PLACE IN THE AUDIENCE</small><strong>{arenaCta[0]}</strong><p>{open ? "Watch, vote and send gifts. No registration needed." : "The showcase hasn’t started. Take a look inside."}</p></div>
            <div className="pass-stub"><span>{a.seat ? a.seat.replace(" · ", "\n") : "ANY\nSEAT"}</span><Icon name="arrow" size={16} /></div>
          </button>
          <button className="pass stage" data-tile="My Journey" disabled={!second} onClick={second?.[2]}>
            <div className="pass-main"><small>YOUR PLACE ON THE STAGE</small><strong>{second ? second[0] : "Register to Compete"}</strong><p>{second ? second[1] : "Registration is closed for this season."}</p></div>
            <div className="pass-stub"><span>{contestant ? "ON\nSTAGE" : second ? "ADMIT\nONE" : "SOLD\nOUT"}</span>{second ? <Icon name="arrow" size={16} /> : <Icon name="lock" size={14} />}</div>
          </button>
        </section>
      </main>
      <div className="sticky-action lobby">
        <button className="primary" onClick={arenaCta[1]}><Icon name="eye" size={17} /> {arenaCta[0]}</button>
        {second ? <button className="lobby-second" onClick={second[2]}><strong>{second[0]}</strong><small>{contestant ? "Backstage" : "Join as a contestant"}</small></button>
          : isBdm && !contestant ? <p className="lobby-note">Registration closed · watch, vote and support</p> : null}
      </div>
      {area && <LobbyPopup area={area} areas={areas} onClose={() => setArea(null)} onSwitch={(k) => setArea(k)}>{content(area)}</LobbyPopup>}
    </>
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
          return (
            <section key={x.id} className="slide" aria-label={`Contestant ${pos(i)}: ${x.handle}`}>
              <img className={`slide-media ${i === idx ? "on" : ""}`} src={x.image} alt={`${x.name} performing`} />
              <div className="slide-shade" />
              <div className="stage-light" />
              <div className="slide-rail">
                <button className={isLiked ? "on" : ""} onClick={() => setLiked((m) => ({ ...m, [x.id]: !isLiked }))}><Icon name="heart" filled={isLiked} size={26} /><span>{fmt(s.likes + (isLiked ? 1 : 0))}</span></button>
                <button onClick={() => setPanel("comments")}><Icon name="comment" size={25} /><span>{s.comments}</span></button>
                <button onClick={() => setPanel("share")}><Icon name="share" size={24} /><span>{s.shares}</span></button>
                <button className={isSaved ? "on" : ""} onClick={() => { setSaved((m) => ({ ...m, [x.id]: !isSaved })); a.toast(isSaved ? "Removed from saved" : "Saved to your profile"); }}><Icon name="bookmark" filled={isSaved} size={24} /><span>{isSaved ? "Saved" : "Save"}</span></button>
                <button className="gift-btn" onClick={() => setPanel("gift")} aria-label="Send a gift"><b><Icon name="gift" size={22} /></b><span>Gift</span></button>
              </div>
              <div className="slide-info">
                <div className="on-stage">{mine ? <span className="yours">YOUR ENTRY</span> : <span className="ns-tag">{last && showcase ? "FINAL PERFORMANCE" : "NOW ON STAGE"}</span>}<em>{String(pos(i)).padStart(2, "0")} / {total}</em></div>
                <div className="slide-creator">
                  <button className="sc-id" onClick={() => a.go({ screen: "creator", comp: c.id, handle: x.handle })}><img src={x.image} alt="" /><span><strong>{mine ? "You" : x.handle} <b className="verified">✓</b></strong><small>{x.name}</small></span></button>
                  {!mine && <button className={fol ? "sc-follow on" : "sc-follow"} onClick={() => { a.toggleCreator(x.handle); if (!fol) a.toast(`You’re following ${x.handle}`); }}>{fol ? "Following" : "Follow"}</button>}
                </div>
                <p className="slide-cap">{x.caption}</p>
                <div className="slide-comp">
                  <div className="sc-meta">
                    <span>{c.name} · Round {c.round}{c.id === "bdm" ? ` — ${rName(c.id, c.round)}` : ""}</span>
                    <div>{votingVisible(c.phase) ? <><strong>{a.votesOf(c.id, x).toLocaleString()} votes</strong><em>{fmt(s.views)} views</em></> : <><button className="cheering" onClick={() => setTray(!tray)}>👏 {fmt(cheering)} cheering</button><em>{fmt(s.likes)} likes · {s.comments} comments</em></>}</div>
                  </div>
                  {votingVisible(c.phase) && <div className="sc-rank"><small>RANK</small>#{rank}</div>}
                </div>
                {mine && (showcase || voting) ? (
                  <div className="slide-cta two">
                    <button className="vote-btn ghost" onClick={() => setPanel("share")}><Icon name="share" size={16} /> Share your entry</button>
                    <button className="vote-btn ghost" onClick={() => a.backTo({ screen: "competition", comp: c.id, tab: "My Journey" })}>My performance</button>
                  </div>
                ) : voting && judgeMode ? (
                  judgeAward ? <button className="vote-btn jd-locked" onClick={() => a.go({ screen: "judgeEntry", comp: c.id, pick: x.id })}><Icon name="lock" size={15} /> {judgeAward.id === x.id ? "Your pick · points awarded" : "You’ve awarded your points this round"}</button>
                    : <button className="vote-btn jd-judge" onClick={() => a.go({ screen: "judgeEntry", comp: c.id, pick: x.id })}><Icon name="star" size={16} /> JUDGE</button>
                ) : voting ? (
                  <button className={my ? "vote-btn voted" : "vote-btn"} onClick={() => setPanel("vote")}>{my ? <><Icon name="check" size={16} /> You voted · {my} — vote again</> : <>VOTE</>}</button>
                ) : showcase ? null : c.phase === "closed" || c.phase === "processing" ? (
                  <div className="vote-closed"><span><b>VOTING CLOSED</b>Results are being confirmed.</span><button onClick={() => a.go({ screen: "leaderboard", comp: c.id })}>View Leaderboard</button></div>
                ) : (
                  <div className="vote-closed"><span><b>{c.phase === "completed" ? "COMPETITION COMPLETE" : "RESULTS LIVE"}</b>See who moves on.</span><button onClick={() => a.go({ screen: "results", comp: c.id })}>View Results</button></div>
                )}
                {showcase && (nx ? (
                  <button className="up-next" onClick={next}>
                    <img src={nx.image} alt="" />
                    <span><small>UP NEXT</small><strong>{nx.id === "me" ? "You" : nx.handle}</strong></span>
                    <em>Next contestant <Icon name="arrow" size={14} /></em>
                  </button>
                ) : (
                  <button className="up-next final" onClick={next}><span><small>THAT’S EVERYONE</small><strong>The showcase is ending</strong></span><em>Finish showcase <Icon name="arrow" size={14} /></em></button>
                ))}
                {showcase && <p className="vote-note">Voting opens after the showcase.</p>}
              </div>
            </section>
          );
        })}
      </div>
      {header}
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

function EntrySequence({ c, onDone }: { c: Comp; onDone: () => void }) {
  const a = useArena();
  const [returning, setReturning] = useState(() => !!a.seat);
  const [doors, setDoors] = useState(true);
  const [step, setStep] = useState<"seat" | "seated" | "count" | "lights">(returning ? "count" : "seat");
  const [pick, setPick] = useState<[number, number] | null>(parseSeat(a.seat));
  const [n, setN] = useState(3);
  useEffect(() => { const t = window.setTimeout(() => setDoors(false), 1500); return () => window.clearTimeout(t); }, []);
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
      {step === "seat" && <div className="seq-seat">
        <header className="seq-head">
          <button className="at-btn" onClick={a.back} aria-label="Leave"><Icon name="back" size={20} /></button>
          <div><small>{c.name.toUpperCase()} · ROUND {c.round}</small><h2>Take your seat</h2><span><i className="live-dot live" /> 12,438 in the audience</span></div>
        </header>
        <Auditorium pick={pick} setPick={setPick} mode="choose" />
        <div className="seat-legend"><span><i className="free" />Free</span><span><i className="taken" />Taken</span><span><i className="mine" />Yours</span></div>
        <div className="seq-foot">
          {pick && <div className="ticket-stub" key={seatLabel(pick)}><div><small>ADMIT ONE · {c.name.toUpperCase()}</small><strong>{seatLabel(pick)}</strong></div><span>FREE</span></div>}
          <button className="primary" disabled={!pick} onClick={() => take()}>TAKE MY SEAT</button>
          <button className="ghost-btn" onClick={anywhere}>Seat me anywhere</button>
        </div>
      </div>}
      {step === "seated" && <div className="seq-seated">
        <Auditorium pick={pick} mode="seated" />
        <div className="seated-msg"><Icon name="check" size={22} /><h2>You’re seated</h2><p>{a.seat}</p><small>House lights are going down…</small></div>
      </div>}
      {step === "count" && <div className="seq-count">
        <div className="count-stage" />
        <div className="phone-lights" aria-hidden="true">{phoneLights.map((p, i) => <i key={i} style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.d}s` }} />)}</div>
        <p className="count-kicker">{returning ? `Welcome back · ${a.seat}` : `${a.seat} · The show is about to begin`}</p>
        {!doors && <strong className="count-num" key={n}>{n}</strong>}
        {returning && <button className="ghost-btn count-change" onClick={() => { setReturning(false); setStep("seat"); }}>Change seat</button>}
      </div>}
      {step === "lights" && <div className="seq-lights">
        <span className="spot s1" /><span className="spot s2" /><span className="spot s3" /><span className="spot s4" />
        <div className="curtain"><i /></div>
      </div>}
      {doors && <div className="doors" aria-hidden="true"><span className="door l" /><span className="door r" /><b>D</b></div>}
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
  const [tab, setTab] = useState("Competition Entries");
  if (!en) return <><SubBar title="Creator" onBack={a.back} /><main className="page"><LockedNote icon="user" title="Profile unavailable" copy="This creator’s profile couldn’t be loaded." /></main></>;
  const f = a.followsCreator(en.handle);
  const ranked = rankList(a.votesOf, c);
  const first = en.name.split(" ")[0];
  return (
    <>
      <SubBar title={en.handle} onBack={a.back} />
      <main className="page creator-page">
        <div className="cp-head">
          <img src={en.image} alt={en.name} />
          <h1>{en.name} <b className="verified">✓</b></h1>
          <p>{en.handle} · Dancer · Lagos, NG</p>
          <span>{first} moves with intention — Afro, contemporary and everything in between. Teaching Saturdays in Yaba.</span>
          <div className="profile-stats"><button><b>{fmt(Math.round(en.votes * 3.1) + (f ? 1 : 0))}</b><small>Followers</small></button><button><b>{200 + (en.votes % 400)}</b><small>Following</small></button><button><b>{fmt(en.votes * 9)}</b><small>Likes</small></button></div>
          <div className="cp-actions"><button className={f ? "ghost-btn" : "primary"} onClick={() => a.toggleCreator(en.handle)}>{f ? <><Icon name="check" size={15} /> Following</> : "Follow"}</button><button className="ghost-btn icon" onClick={() => a.toast("Profile link copied")} aria-label="Share"><Icon name="share" size={17} /></button></div>
        </div>
        <div className="tabs profile-tabs">{["Posts", "Competition Entries"].map((t) => <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>)}</div>
        {tab === "Competition Entries" ? (
          <button className="cp-entry" onClick={() => a.backTo({ screen: "arena", comp: c.id, entry: i })}>
            <img src={en.image} alt="" />
            <div className="tile-gradient" />
            <span className="tile-play"><Icon name="play" filled size={18} /></span>
            <div><p>{c.name.toUpperCase()}</p><strong>Round {c.round}</strong><span>{votingVisible(c.phase) ? `${fmt(a.votesOf(c.id, en))} votes · #${ranked.indexOf(en) + 1}` : "Showcased"} · Watch in Arena</span></div>
          </button>
        ) : <div className="profile-grid">{gallery.slice(i % 4, (i % 4) + 6).map((g) => <img key={g.title} src={g.image} alt="" />)}</div>}
      </main>
    </>
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
      <button className="primary" onClick={() => a.backTo({ screen: "competition", comp: "bdm", tab: "My Journey" })}>Go to My Journey <Icon name="arrow" /></button>
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
          <button className={`status-card ${st.tone}`} onClick={() => a.backTo({ screen: "competition", tab: "My Journey", comp: "bdm" })}>
            <img src={clips[j.clip]} alt="" />
            <div><small>ENTRY STATUS</small><strong>{st.label}</strong><span>{st.copy}</span></div>
            <Icon name="arrow" size={17} />
          </button>
        )}
        <section className="content-section flush"><p className="eyebrow">YOUR PROGRESS</p><RoundTimeline c={c} /></section>
      </main>
      <div className="sticky-action">
        {!j.submitted ? <button className="primary" disabled={!open} onClick={() => a.go({ screen: "submit", comp: "bdm" })}>{open ? <>Submit Entry <Icon name="arrow" /></> : notYet ? "Submissions open Oct 6" : "Submissions closed"}</button>
          : <button className="primary secondary" onClick={() => a.backTo({ screen: "competition", tab: "My Journey", comp: "bdm" })}>View My Entry <Icon name="arrow" /></button>}
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
      a.notify({ icon: "film", tone: "violet", title: "Your entry was received", body: `${roundNames[j.round - 1]} · Pending review`, route: { screen: "competition", tab: "My Journey", comp: "bdm" } });
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
          <button className="primary" onClick={() => a.backTo({ screen: "competition", tab: "My Journey", comp: "bdm" })}>View My Entry <Icon name="arrow" /></button>
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
        <span className="push-app"><span>D</span></span>
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
      showcase: { icon: "eye", tone: "violet", title: "Your entry is showcased", body: "Best Dance Moves · Voting starts tomorrow.", route: { screen: "competition", tab: "My Journey", comp: "bdm" } },
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
          <button disabled={!j.submitted} onClick={() => { a.setJourney((x) => ({ ...x, review: "approved" })); a.notify({ icon: "check", tone: "violet", title: "Your entry was approved", body: "You’re officially competing.", route: { screen: "competition", tab: "My Journey", comp: "bdm" } }); a.toast("Entry approved"); }}>Approve</button>
          <button disabled={!j.submitted} onClick={() => { a.setJourney((x) => ({ ...x, review: "rejected" })); a.notify({ icon: "alert", tone: "coral", title: "Your entry needs attention", body: "Update and resubmit before the deadline.", route: { screen: "competition", tab: "My Journey", comp: "bdm" } }); a.toast("Entry flagged"); }}>Needs attention</button>
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

const feedPosts = [
  { id: "p1", name: "Zuri Okafor", handle: "@zurimoves", time: "2h", image: photos.hero, caption: "Took this one-take routine from the studio to the Arena. Your support means everything.", likes: 8431, comments: 364, comp: "voice" as CompId, round: "Round 2" },
  { id: "p2", name: "Chef Bisi", handle: "@chefbisi", time: "4h", image: photos.chef, caption: "Sunday stew, my grandmother’s way. Low heat, long patience, no shortcuts.", likes: 2210, comments: 118 },
  { id: "p3", name: "Naya Ibe", handle: "@naya.art", time: "6h", image: photos.troupe, caption: "Rehearsal with the crew before tonight. Contemporary meets Shaku.", likes: 5120, comments: 201, comp: "dance" as CompId, round: "Round 1" },
  { id: "p4", name: "Amara Styles", handle: "@amarastyles", time: "9h", image: photos.fashion, caption: "Desert light, Lagos tailoring. Full lookbook drops Friday.", likes: 3980, comments: 96 },
];

function FeedPost({ p, onWatch }: { p: (typeof feedPosts)[number]; onWatch: () => void }) {
  const a = useArena();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [followed, setFollowed] = useState(false);
  return (
    <article className="post">
      <div className="post-user">
        <img src={p.image} alt="" />
        <div><h3>{p.name} <b>✓</b></h3><p>{p.handle} · {p.time}</p></div>
        <button className={followed ? "follow active" : "follow"} onClick={() => setFollowed(!followed)}>{followed ? "Following" : "Follow"}</button>
      </div>
      <button className="post-media" onClick={onWatch} aria-label={`Watch ${p.name}'s post`}>
        <img src={p.image} alt="" />
        {p.comp && <div className="entry-label"><span>COMPETITION ENTRY</span><strong>{a.comp(p.comp).name} · {p.round}</strong></div>}
        <div className="play"><Icon name="play" filled size={26} /></div>
      </button>
      <div className="post-body">
        <p><strong>{p.handle}</strong> {p.caption}</p>
        <div className="post-actions">
          <button className={liked ? "selected" : ""} onClick={() => setLiked(!liked)}><Icon name="heart" filled={liked} /><span>{(p.likes + (liked ? 1 : 0)).toLocaleString()}</span></button>
          <button onClick={() => a.toast("Comments opened")}><Icon name="comment" /><span>{p.comments}</span></button>
          <button onClick={() => a.toast("Share link copied")}><Icon name="share" /><span>Share</span></button>
          <button className={saved ? "selected push" : "push"} onClick={() => { setSaved(!saved); a.toast(saved ? "Removed from saved" : "Saved to your collection"); }}><Icon name="bookmark" filled={saved} /></button>
        </div>
      </div>
    </article>
  );
}

function Home({ openCompetitions, openNotifications }: { openCompetitions: () => void; openViewer: () => void; openNotifications: () => void; showToast: (s: string) => void }) {
  const a = useArena();
  const [feed, setFeed] = useState("For You");
  const posts = feed === "Following" ? feedPosts.filter((p) => p.id !== "p2") : feed === "Discover" ? [...feedPosts].reverse() : feedPosts;
  return (
    <>
      <header className="topbar home-bar">
        <div className="topbar-side"><div className="brand-mark"><span>D</span></div></div>
        <div className="wordmark">D—ARENA</div>
        <div className="topbar-side end home-actions"><button className="icon-button notify" onClick={openNotifications} aria-label="Notifications"><Icon name="bell" /><i /></button><button className="avatar-btn" onClick={() => a.setTab("profile")} aria-label="Your profile"><img src={photos.portrait} alt="" /></button></div>
      </header>
      <main>
        <div className="tabs">{["For You", "Following", "Discover"].map((tab) => <button key={tab} className={feed === tab ? "active" : ""} onClick={() => setFeed(tab)}>{tab}</button>)}</div>
        <section className="section">
          <div className="section-head"><div><h2>On the Arena</h2><p className="section-sub">Compete. Get noticed. Win.</p></div><button onClick={openCompetitions}>See all <Icon name="arrow" size={15} /></button></div>
          <div className="horizontal-cards hub-row">{(["bdm", "dance", "food", "face"] as CompId[]).map((id) => <HubCard key={id} c={a.comp(id)} />)}</div>
        </section>
        <div className="feed">{posts.map((p) => <FeedPost key={p.id} p={p} onWatch={() => (p.comp ? a.go({ screen: "arena", comp: p.comp, entry: 0 }) : a.toast("Playing post"))} />)}</div>
      </main>
    </>
  );
}

function EmptyState({ title, copy, action, onClick }: { title: string; copy: string; action: string; onClick: () => void }) {
  return <div className="empty-state"><div className="empty-icon"><Icon name="search" size={26} /></div><h2>{title}</h2><p>{copy}</p><button className="primary small" onClick={onClick}>{action}</button></div>;
}

const gallery = [
  { title: "Owambe footwork, slowed down", creator: "@zuri.moves", views: "89.2K", type: "Dance", image: photos.dance, comp: "dance" as CompId },
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
  const [more, setMore] = useState(false);
  const [open, setOpen] = useState<(typeof gallery)[number] | null>(null);
  const q = query.trim().toLowerCase();
  const filtered = gallery.filter((g) => (category === "Trending" || g.type === category) && (!q || (g.title + g.creator + g.type).toLowerCase().includes(q)));
  const compHits = q ? comps.filter((c) => (c.name + c.category).toLowerCase().includes(q)) : [];
  return (
    <>
      <TopBar title="Discover" />
      <main className="page">
        <p className="hub-sub">Explore amazing content, creators and communities.</p>
        <div className="search-box"><Icon name="search" size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search creators, videos, competitions" />{query && <button className="plain" onClick={() => setQuery("")} aria-label="Clear"><Icon name="x" size={15} /></button>}</div>
        <div className="cat-wrap">
          <div className="category-row">{discoverCats.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <button className="cat-more" onClick={() => setMore(!more)} aria-label="All categories"><Icon name="down" size={16} /></button>
          {more && <div className="cat-menu">{discoverCats.map((x) => <button key={x} className={category === x ? "active" : ""} onClick={() => { setCategory(x); setMore(false); }}>{x}{category === x && <Icon name="check" size={13} />}</button>)}</div>}
        </div>
        {compHits.length > 0 && <div className="search-results"><p className="eyebrow">COMPETITIONS</p>{compHits.map((c) => <button key={c.id} className="result" onClick={() => a.go({ screen: "competition", comp: c.id })}><img src={c.image} alt="" /><div><strong>{c.name}</strong><span>{c.category} · {phaseLabel(c.phase, c.round)}</span></div><Icon name="arrow" /></button>)}</div>}
        {filtered.length ? (
          <div className="masonry">
            {filtered.map((item, i) => (
              <button className={`m-tile ${i % 3 === 0 ? "tall" : ""}`} key={item.title} onClick={() => setOpen(item)}>
                <img src={item.image} alt={item.title} />
                <div className="tile-gradient" />
                {item.comp && <b className="entry-tag">COMPETITION ENTRY</b>}
                <span className="m-views"><Icon name="eye" size={11} /> {item.views}</span>
                <div className="tile-copy"><strong>{item.title}</strong><span>{item.creator} <b className="verified">✓</b></span></div>
              </button>
            ))}
          </div>
        ) : <EmptyState title="Nothing found" copy={q ? `No ${category === "Trending" ? "" : category.toLowerCase() + " "}posts match “${query}”.` : `No ${category.toLowerCase()} posts yet — check back soon.`} action="Show trending" onClick={() => { setCategory("Trending"); setQuery(""); }} />}
      </main>
      {open && (
        <div className="viewer post-viewer">
          <img className="viewer-img" src={open.image} alt={open.title} />
          <div className="viewer-shade" />
          <button className="floating-back" onClick={() => setOpen(null)} aria-label="Close"><Icon name="x" /></button>
          <div className="viewer-actions"><button><Icon name="heart" /><span>Like</span></button><button onClick={() => a.toast("Comments opened")}><Icon name="comment" /><span>212</span></button><button onClick={() => a.toast("Share link copied")}><Icon name="share" /><span>Share</span></button><button onClick={() => a.toast("Saved to your profile")}><Icon name="bookmark" /><span>Save</span></button></div>
          <div className="viewer-copy">
            <div className="creator-line"><img src={open.image} alt="" /><strong>{open.creator} <b>✓</b></strong><span className="round-tag">{open.type}</span></div>
            <p>{open.title} · {open.views} views</p>
            {open.comp && <div className="vote-panel"><div><span>Competition entry</span><small>{a.comp(open.comp).name}</small></div><button className="soft" onClick={() => { setOpen(null); a.go({ screen: "arena", comp: open.comp!, entry: 0 }); }}>Open entry</button></div>}
          </div>
        </div>
      )}
    </>
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
  const [profileTab, setProfileTab] = useState("Posts");
  const studio: [string, string, string, () => void][] = [
    ["trophy", "My Competitions", a.journey.registered ? "1 active" : "None active", () => setProfileTab("Competitions")],
    ["film", "My Entries", a.journey.submitted ? entryStatus(a.journey, a.journey.phase).label : "No entries yet", () => (a.journey.submitted ? a.backTo({ screen: "competition", tab: "My Journey", comp: "bdm" }) : a.setTab("competitions"))],
    ["wallet", "Earnings", "₦18,500 available", () => a.go({ screen: "earnings" })],
    ["check", "Verification", "Verified creator", () => showToast("You’re verified · ID confirmed Sep 12")],
    ["fire", "Live", "Unlocks at 1,000 followers", () => showToast("Go Live unlocks at 1,000 followers")],
    ["settings", "Settings", "Account, privacy, payouts", () => showToast("Settings opened")],
  ];
  return (
    <>
      <TopBar title="Profile" />
      <main className="page profile-page">
        <div className="profile-header"><div className="avatar-wrap"><img src={photos.portrait} alt="Ada Nwosu" /><i>✓</i></div><h1>Ada Nwosu</h1><p>@adanwosu · Creator</p><span>Movement artist. Finding rhythm in every story. Lagos, NG.</span><div className="profile-stats"><button><b>128</b><small>Posts</small></button><button><b>24.8K</b><small>Followers</small></button><button><b>842</b><small>Following</small></button></div><div className="profile-actions"><button onClick={() => showToast("Profile editor opened")}>Edit profile</button><button aria-label="Share profile" onClick={() => showToast("Profile link copied")}><Icon name="share" size={18} /></button><button aria-label="Settings" onClick={() => showToast("Settings opened")}><Icon name="settings" size={18} /></button></div></div>
        <p className="eyebrow studio-label">CREATOR STUDIO</p>
        <div className="studio-grid">{studio.map(([ic, t, sub, fn]) => <button key={t} onClick={fn}><Icon name={ic} size={18} /><strong>{t}</strong><small>{sub}</small></button>)}</div>
        <div className="tabs profile-tabs">{["Posts", "Competitions", "Supporting", "Saved"].map((t) => <button className={profileTab === t ? "active" : ""} key={t} onClick={() => setProfileTab(t)}>{t}</button>)}</div>
        {profileTab === "Competitions" ? <ProfileArenas /> : profileTab === "Supporting" ? <Supporting /> : profileTab === "Saved" ? (a.saved.length ? <div className="hub-grid">{a.saved.map((id) => <HubCard key={id} c={a.comp(id)} />)}</div> : <EmptyState title="Nothing saved yet" copy="Bookmark competitions and posts and they’ll wait for you here." action="Explore competitions" onClick={() => a.setTab("competitions")} />) : <div className="profile-grid">{gallery.slice(0, 9).map((g) => <img key={g.title} src={g.image} alt="" />)}</div>}
      </main>
    </>
  );
}

function Notifications() {
  const a = useArena();
  useEffect(() => () => a.readNotes(), []);
  const groups: [string, Note[]][] = [["New", a.notes.filter((n) => n.unread)], ["Earlier", a.notes.filter((n) => !n.unread)]];
  return (
    <>
      <SubBar title="Notifications" onBack={a.back} />
      <main className="page notifications">
        {a.notes.length === 0 && <EmptyState title="You’re all caught up" copy="Competition updates, votes and payouts will show up here." action="Back home" onClick={() => a.setTab("home")} />}
        {groups.filter(([, l]) => l.length).map(([g, l]) => (
          <section key={g}>
            <p className="eyebrow">{g.toUpperCase()}</p>
            {l.map((n) => (
              <button key={n.id} className={n.kind === "private" ? "note-private" : ""} onClick={() => a.go(n.route)}>
                <span className={`note-icon ${n.tone}`}><Icon name={n.icon} /></span>
                <p><strong>{n.title}</strong><span>{n.body}</span><small>{n.kind === "private" && <><Icon name="lock" size={9} /> Private · </>}{n.time}</small></p>
                {n.unread && <i />}
              </button>
            ))}
          </section>
        ))}
      </main>
    </>
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

function BottomNav({ active, setTab, openCreate }: { active: Tab; setTab: (t: Tab) => void; openCreate: () => void }) {
  const items: [Tab, string, string][] = [["home", "Home", "home"], ["discover", "Discover", "search"], ["competitions", "Competitions", "trophy"], ["wallet", "Wallet", "wallet"], ["profile", "Profile", "user"]];
  return <nav className="bottom-nav">{items.map(([tab, label, icon], index) => <div key={tab} className={index === 2 ? "nav-slot competition-slot" : "nav-slot"}>{index === 2 && <button className="fab" onClick={openCreate} aria-label="Create"><Icon name="plus" size={27} /></button>}<button className={active === tab ? "nav-button active" : "nav-button"} onClick={() => setTab(tab)}><Icon name={icon} filled={active === tab && tab !== "discover"} size={21} /><span>{label}</span></button></div>)}</nav>;
}

/* ───────────────────────── Account & authentication ───────────────────────── */

type AuthStep = "welcome" | "email" | "sent" | "verify" | "username" | "password" | "confirm" | "done" | "signin";

function Auth({ onDone }: { onDone: (username: string) => void }) {
  const [step, setStep] = useState<AuthStep>("welcome");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState("");
  const [codeState, setCodeState] = useState<"idle" | "checking" | "wrong" | "expired" | "resent" | "ok">("idle");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [username, setUsername] = useState("");
  const [nameState, setNameState] = useState<"empty" | "checking" | "available" | "taken" | "invalid" | "length">("empty");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pw2, setPw2] = useState("");
  const [pwErr, setPwErr] = useState("");
  const otpRef = useRef<HTMLInputElement>(null);
  const masked = email ? `${email.slice(0, 2)}•••@${email.split("@")[1] ?? ""}` : "";

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
  useEffect(() => { if (step === "done") { const t = window.setTimeout(() => onDone(username), 1700); return () => window.clearTimeout(t); } }, [step]);

  const submitEmail = () => {
    const v = email.trim();
    if (!v) return setEmailErr("Enter your email address.");
    if (!/^\S+@\S+\.\S+$/.test(v)) return setEmailErr("Enter a valid email address.");
    setEmailErr(""); setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      if (v.startsWith("taken@")) return setEmailErr("exists");
      if (v.startsWith("offline@")) return setEmailErr("Check your connection and try again.");
      setCooldown(30); setStep("sent");
    }, 900);
  };
  const verify = (value: string) => {
    setCodeState("checking");
    window.setTimeout(() => {
      if (value === "000000") return setCodeState("expired");
      if (value !== "123456") {
        const n = attempts + 1; setAttempts(n); setCode("");
        if (n >= 3) { setLocked(true); setCodeState("idle"); } else setCodeState("wrong");
        return;
      }
      setCodeState("ok");
      window.setTimeout(() => setStep("username"), 800);
    }, 900);
  };
  const onCode = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 6);
    setCode(d);
    if (codeState === "wrong" || codeState === "expired") setCodeState("idle");
    if (d.length === 6) verify(d);
  };
  const resend = () => { if (cooldown > 0) return; setCooldown(30); setCode(""); setCodeState("resent"); otpRef.current?.focus(); };
  const rules = [["8 characters", pw.length >= 8], ["1 letter and 1 number", /[a-z]/i.test(pw) && /\d/.test(pw)], ["1 special character", /[^a-z0-9]/i.test(pw)]] as [string, boolean][];
  const passed = rules.filter((r) => r[1]).length;
  const backMap: Partial<Record<AuthStep, AuthStep>> = { email: "welcome", sent: "email", verify: "sent", username: "verify", password: "username", confirm: "password", signin: "welcome" };
  const stepNo = { email: 1, sent: 2, verify: 2, username: 3, password: 4, confirm: 4 } as Partial<Record<AuthStep, number>>;

  if (step === "welcome") return (
    <div className="auth-welcome">
      <img src={photos.hero} alt="" />
      <div className="auth-welcome-shade" />
      <div className="auth-welcome-copy">
        <div className="brand-mark"><span>D</span></div>
        <p className="eyebrow">SEASON 03 IS LIVE</p>
        <h1>Your talent.<br />Their votes.<br /><em>Your stage.</em></h1>
        <span>Perform in competitions, vote for the creators you love, and rise through the rounds.</span>
        <button className="primary" onClick={() => setStep("email")}>Create account <Icon name="arrow" /></button>
        <button className="ghost-btn" onClick={() => setStep("signin")}>I already have an account</button>
      </div>
    </div>
  );

  if (step === "done") return (
    <main className="auth-done"><div className="celebrate-glow" /><div className="success-ring big"><Icon name="check" size={42} /></div><h1>You’re all set.</h1><span>Welcome to the Arena, @{username}.</span><div className="splash-bar"><i /></div></main>
  );

  return (
    <div className="auth">
      <header className="auth-bar">
        <button className="icon-button" onClick={() => setStep(backMap[step]!)} aria-label="Go back"><Icon name="back" /></button>
        {stepNo[step] && <div className="auth-progress">{[1, 2, 3, 4].map((n) => <i key={n} className={n <= stepNo[step]! ? "on" : ""} />)}</div>}
        <span />
      </header>
      <main className="auth-body">
        {step === "signin" && <>
          <h1>Welcome back.</h1><p className="subcopy">Sign in to pick up where you left off.</p>
          <label className="field"><span>Email address</span><input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="you@example.com" /></label>
          <label className="field"><span>Password</span><input type="password" value={pw} onChange={(ev) => setPw(ev.target.value)} placeholder="••••••••" /></label>
          <button className="primary" disabled={!email || !pw || busy} onClick={() => { setBusy(true); window.setTimeout(() => onDone(email.split("@")[0]), 900); }}>{busy ? <><span className="btn-spinner" /> Signing in…</> : "Sign in"}</button>
        </>}

        {step === "email" && <>
          <h1>What’s your email address?</h1>
          <p className="subcopy">We’ll use this to create and secure your account.</p>
          <label className={`field ${emailErr ? "error" : ""}`}><span>Email address</span><input autoFocus type="email" value={email} onChange={(ev) => { setEmail(ev.target.value); setEmailErr(""); }} onKeyDown={(ev) => ev.key === "Enter" && submitEmail()} placeholder="you@example.com" /></label>
          {emailErr === "exists" ? <p className="field-msg error">An account already exists with this email. <button onClick={() => setStep("signin")}>Sign in</button></p> : emailErr && <p className="field-msg error">{emailErr}</p>}
          <p className="demo-hint">Demo: try taken@… or offline@… to see errors.</p>
          <button className="primary" disabled={busy} onClick={submitEmail}>{busy ? <><span className="btn-spinner" /> Sending code…</> : "Continue"}</button>
        </>}

        {step === "sent" && <div className="auth-center">
          <div className="mail-icon"><Icon name="bell" size={28} /></div>
          <h1>Check your email</h1>
          <p className="subcopy">We’ve sent a verification code to <strong>{masked}</strong>.</p>
          <button className="primary" onClick={() => { setStep("verify"); window.setTimeout(() => otpRef.current?.focus(), 60); }}>Enter code</button>
          <p className="field-msg">Didn’t receive it? Check spam or <button disabled={cooldown > 0} onClick={() => setCooldown(30)}>{cooldown > 0 ? `resend in ${cooldown}s` : "resend"}</button></p>
        </div>}

        {step === "verify" && <>
          <h1>Enter the code we sent you</h1>
          <p className="subcopy">We sent a 6-digit code to <strong>{masked}</strong>.</p>
          <label className={`otp ${codeState === "wrong" || codeState === "expired" ? "error" : codeState === "ok" ? "ok" : ""}`} onClick={() => otpRef.current?.focus()}>
            <input ref={otpRef} inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(ev) => onCode(ev.target.value)} disabled={codeState === "checking" || codeState === "ok" || locked} aria-label="Verification code" />
            {Array.from({ length: 6 }).map((_, k) => <span key={k} className={k === code.length && codeState !== "checking" ? "cursor" : ""}>{code[k] ?? ""}</span>)}
          </label>
          {codeState === "checking" && <p className="field-msg"><span className="btn-spinner dark" /> Checking code…</p>}
          {codeState === "wrong" && <p className="field-msg error">That code doesn’t match. Try again. ({3 - attempts} left)</p>}
          {codeState === "expired" && <p className="field-msg error">This code has expired. <button onClick={resend} disabled={cooldown > 0}>Request a new code</button></p>}
          {codeState === "resent" && <p className="field-msg ok">New code sent. Use the latest code in your inbox.</p>}
          {codeState === "ok" && <p className="field-msg ok"><Icon name="check" size={14} /> Email verified</p>}
          <p className="demo-hint">Demo: 123456 is correct · 000000 is expired.</p>
          <div className="auth-links"><button onClick={resend} disabled={cooldown > 0}>{cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}</button><button onClick={() => { setCode(""); setCodeState("idle"); setStep("email"); }}>Change email</button></div>
          <button className="primary" disabled={code.length < 6 || codeState === "checking" || codeState === "ok"} onClick={() => verify(code)}>Verify</button>
        </>}

        {step === "username" && <>
          <h1>Choose a username</h1>
          <p className="subcopy">This is how people will find you on D-Arena.</p>
          <label className={`field prefix ${nameState === "taken" || nameState === "invalid" || nameState === "length" ? "error" : nameState === "available" ? "ok" : ""}`}><span>Username</span><div><b>@</b><input autoFocus maxLength={30} value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder="yourname" /><small>{username.length}/30</small></div></label>
          <p className={`field-msg ${nameState === "available" ? "ok" : ["taken", "invalid", "length"].includes(nameState) ? "error" : ""}`}>
            {{ empty: "Letters, numbers, dots and underscores.", checking: "Checking availability…", available: "Username is available", taken: "That username is taken. Try another.", invalid: "Use only letters, numbers, dots and underscores.", length: "Usernames are 3–30 characters." }[nameState]}
          </p>
          {nameState === "taken" && <div className="category-row tight">{[`${username}.moves`, `${username}_ng`, `the.${username}`].map((s) => <button key={s} onClick={() => setUsername(s)}>@{s}</button>)}</div>}
          <button className="primary" disabled={nameState !== "available"} onClick={() => setStep("password")}>Continue</button>
        </>}

        {step === "password" && <>
          <h1>Create a password</h1>
          <p className="subcopy">Keep your account and your coins secure.</p>
          <label className="field prefix"><span>Password</span><div><input autoFocus type={showPw ? "text" : "password"} value={pw} onChange={(ev) => setPw(ev.target.value)} placeholder="••••••••" /><button className="show-toggle" onClick={(ev) => { ev.preventDefault(); setShowPw(!showPw); }}>{showPw ? "Hide" : "Show"}</button></div></label>
          <div className={`strength s${pw ? passed : 0}`}><i /><i /><i /><span>{!pw ? "" : passed < 2 ? "Weak" : passed < 3 ? "Almost there" : "Strong"}</span></div>
          <ul className="pw-rules">{rules.map(([r, ok]) => <li key={r} className={ok ? "ok" : ""}><span><Icon name={ok ? "check" : "x"} size={11} /></span>{r}</li>)}</ul>
          <button className="primary" disabled={passed < 3} onClick={() => { setPw2(""); setPwErr(""); setStep("confirm"); }}>Continue</button>
        </>}

        {step === "confirm" && <>
          <h1>Confirm your password</h1>
          <p className="subcopy">Enter it again to make sure it matches.</p>
          <label className={`field ${pwErr ? "error" : ""}`}><span>Confirm password</span><input autoFocus type="password" value={pw2} onChange={(ev) => { setPw2(ev.target.value); setPwErr(""); }} placeholder="••••••••" /></label>
          {pwErr && <p className="field-msg error">{pwErr}</p>}
          <button className="primary" disabled={!pw2 || busy} onClick={() => { if (pw2 !== pw) return setPwErr("Passwords don’t match."); setBusy(true); window.setTimeout(() => { setBusy(false); setStep("done"); }, 1000); }}>{busy ? <><span className="btn-spinner" /> Creating account…</> : "Create account"}</button>
        </>}
      </main>
      {locked && <div className="sheet-backdrop"><div className="sheet"><div className="sheet-handle" /><div className="sheet-state"><div className="state-icon warn"><Icon name="lock" size={24} /></div><h2>Too many attempts</h2><p>You’ve tried too many times. Please wait before trying again.</p></div><button className="primary" onClick={() => { setLocked(false); setAttempts(0); setCodeState("idle"); setCooldown(30); }}>OK</button></div></div>}
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
      notify({ icon: "check", tone: "violet", title: "Your entry was approved", body: "You’re officially competing. Showcase begins when the round closes.", route: { screen: "competition", tab: "My Journey", comp: "bdm" } });
      showToast("Your entry was approved");
    }, 5000);
    return () => window.clearTimeout(t);
  }, [journey.review]);

  const act = (c: Comp, action: Action) => {
    const routes: Partial<Record<Action, Route>> = {
      register: { screen: "register", comp: c.id }, challenge: { screen: "challenge", comp: c.id }, submit: { screen: "submit", comp: c.id }, myEntry: { screen: "competition", tab: "My Journey", comp: c.id },
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
    push: (p) => setPush({ ...p, k: Date.now() }), openJudgeSim: () => setJudgeSim(true), seat, setSeat,
  };

  const isTab = ["home", "discover", "competitions", "wallet", "profile"].includes(route.screen);
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
    }
  })();

  return (
    <ArenaContext.Provider value={ctx}>
      <div className={`app-shell ${isTab && authed ? "with-nav" : ""} ${unread ? "" : "all-read"}`}>
        {!authed ? <Auth onDone={(u) => { setAuthed(true); setStack([{ screen: "home" }]); showToast(`Welcome to the Arena, @${u}`); window.setTimeout(() => setPush({ title: "You’ve been invited to judge Street Dance Cypher", body: "Private invitation. Tap to review the details.", route: { screen: "judgeInvite" }, k: Date.now() }), 3200); }} /> : <>
        <div className="screen-anim" key={`${route.screen}-${stack.length}`}>{content}</div>
        {isTab && <BottomNav active={route.screen as Tab} setTab={setTab} openCreate={() => setCreate(true)} />}
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
