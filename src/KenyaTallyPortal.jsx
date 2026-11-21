import React, { useState, useMemo, useEffect } from "react";
import {
  Shield,
  Radio,
  Search,
  LogIn,
  LogOut,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  MapPin,
  Users,
  FileCheck,
  ChevronRight,
  RotateCcw,
  PlusCircle,
  X,
  Building2,
  Award,
  TrendingUp,
  Clock,
  Filter,
} from "lucide-react";

// ============================================================================
// PARTY DEFINITIONS & NEUTRAL ELECTION BROADCAST PALETTE
// ============================================================================
const PARTIES = {
  UDA: {
    id: "UDA",
    name: "United Democratic Alliance",
    short: "UDA",
    coalition: "Kenya Kwanza",
    color: "#F59E0B", // Amber / Gold
    lightBg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-400",
    badge: "bg-amber-500 text-slate-950",
  },
  ODM: {
    id: "ODM",
    name: "Orange Democratic Movement",
    short: "ODM",
    coalition: "Azimio / People’s Alliance",
    color: "#2563EB", // Royal Blue
    lightBg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-400",
    badge: "bg-blue-600 text-white",
  },
  JUBILEE: {
    id: "JUBILEE",
    name: "Jubilee / Progressive Alliance",
    short: "JUBILEE",
    coalition: "Progressive Coalition",
    color: "#DC2626", // Crimson Red
    lightBg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-400",
    badge: "bg-red-600 text-white",
  },
  WIPER: {
    id: "WIPER",
    name: "Wiper Democratic Movement",
    short: "WIPER",
    coalition: "One Kenya / Ukambani",
    color: "#0D9488", // Teal
    lightBg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-400",
    badge: "bg-teal-600 text-white",
  },
  DCP: {
    id: "DCP",
    name: "Democracy for the Citizens Party",
    short: "DCP",
    coalition: "Mt. Kenya Alliance",
    color: "#7C3AED", // Royal Purple
    lightBg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-400",
    badge: "bg-purple-600 text-white",
  },
  DAP: {
    id: "DAP",
    name: "Democratic Action Party-K",
    short: "DAP-K",
    coalition: "Western Alliance",
    color: "#16A34A", // Emerald Green
    lightBg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-400",
    badge: "bg-emerald-600 text-white",
  },
  IND: {
    id: "IND",
    name: "Independent / Regional Parties",
    short: "IND",
    coalition: "Non-Aligned",
    color: "#64748B", // Slate
    lightBg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-400",
    badge: "bg-slate-600 text-white",
  },
};

const PRESIDENTIAL_CANDIDATES = [
  {
    id: "pres_1",
    name: "William Ruto",
    party: "UDA",
    runningMate: "Kithure Kindiki",
  },
  {
    id: "pres_2",
    name: "Edwin Sifuna",
    party: "ODM",
    runningMate: "Babu Owino / Coalition",
  },
  {
    id: "pres_3",
    name: "Fred Matiang’i",
    party: "JUBILEE",
    runningMate: "Jeremiah Kioni",
  },
  {
    id: "pres_4",
    name: "Kalonzo Musyoka",
    party: "WIPER",
    runningMate: "Eugene Wamalwa",
  },
  {
    id: "pres_5",
    name: "Rigathi Gachagua",
    party: "DCP",
    runningMate: "Cleophas Malala",
  },
];

// Fallback authentic geographic silhouette of Kenya (synced with kenya-counties.svg)
const KENYA_NATIONAL_OUTLINE =
  "M 68,54 L 138,24 L 176,58 L 204,116 L 236,120 L 298,118 L 352,108 L 418,96 L 472,74 L 542,60 L 556,68 L 526,116 L 502,138 L 464,142 L 452,150 L 456,214 L 468,266 L 472,334 L 460,394 L 500,464 L 494,504 L 468,512 L 444,536 L 416,588 L 396,626 L 372,666 L 350,656 L 348,622 L 294,584 L 222,550 L 156,518 L 94,490 L 54,474 L 62,438 L 86,422 L 56,414 L 54,386 L 66,348 L 94,336 L 102,292 L 116,284 L 114,224 L 84,148 Z";

// ============================================================================
// ALL 47 KENYAN COUNTIES WITH TESSELLATED NON-OVERLAPPING KENYA MAP GEOMETRY
// ============================================================================
const INITIAL_COUNTIES = [
  // NORTH-WEST & RIFT VALLEY NORTH
  {
    code: "023",
    name: "Turkana",
    region: "Rift Valley",
    x: 136,
    y: 132,
    path: "M 68,54 L 138,24 L 176,58 L 204,116 L 204,196 L 172,226 L 114,224 L 84,148 Z",
    registeredVoters: 238528,
    reportingPct: 89.4,
    presVotes: {
      UDA: 92400,
      ODM: 84100,
      JUBILEE: 6100,
      WIPER: 4200,
      DCP: 3100,
    },
    governor: [
      { name: "Jeremiah Lomorukai", party: "ODM", votes: 89200 },
      { name: "John Munyes", party: "JUBILEE", votes: 61400 },
      { name: "Ekal Lokaale", party: "UDA", votes: 42100 },
    ],
    senate: [
      { name: "James Lomenen", party: "UDA", votes: 84500 },
      { name: "Malachy Ekal", party: "ODM", votes: 79800 },
    ],
    womanRep: [
      { name: "Cecilia Ngitit", party: "UDA", votes: 88100 },
      { name: "Joyce Emanikor", party: "JUBILEE", votes: 74200 },
    ],
    constituencies: [
      {
        name: "Turkana North",
        winner: "ODM",
        mp: "Paul Nabuin",
        votes: 21400,
        runnerUp: "UDA",
        runnerUpVotes: 19800,
        reporting: 91,
      },
      {
        name: "Turkana West",
        winner: "UDA",
        mp: "Daniel Epuyo",
        votes: 24500,
        runnerUp: "ODM",
        runnerUpVotes: 21200,
        reporting: 88,
      },
      {
        name: "Turkana Central",
        winner: "ODM",
        mp: "Joseph Namuar",
        votes: 19800,
        runnerUp: "UDA",
        runnerUpVotes: 18400,
        reporting: 94,
      },
      {
        name: "Loima",
        winner: "ODM",
        mp: "Protus Akuja",
        votes: 14200,
        runnerUp: "UDA",
        runnerUpVotes: 12900,
        reporting: 86,
      },
      {
        name: "Turkana South",
        winner: "UDA",
        mp: "John Ariko",
        votes: 18900,
        runnerUp: "ODM",
        runnerUpVotes: 16100,
        reporting: 90,
      },
      {
        name: "Turkana East",
        winner: "UDA",
        mp: "Nicholas Ngikolong",
        votes: 11200,
        runnerUp: "ODM",
        runnerUpVotes: 9800,
        reporting: 87,
      },
    ],
  },
  {
    code: "024",
    name: "West Pokot",
    region: "Rift Valley",
    x: 136,
    y: 254,
    path: "M 114,224 L 172,226 L 164,284 L 116,284 Z",
    registeredVoters: 220026,
    reportingPct: 94.2,
    presVotes: {
      UDA: 128400,
      ODM: 41200,
      JUBILEE: 5400,
      WIPER: 3100,
      DCP: 2800,
    },
    governor: [
      { name: "Simon Kachapin", party: "UDA", votes: 112300 },
      { name: "John Lonyangapuo", party: "IND", votes: 68400 },
    ],
    senate: [
      { name: "Julius Murgor", party: "UDA", votes: 118900 },
      { name: "Samuel Poghisio", party: "IND", votes: 59200 },
    ],
    womanRep: [
      { name: "Rael Kasiwai", party: "UDA", votes: 121000 },
      { name: "Lilian Tomitom", party: "IND", votes: 57100 },
    ],
    constituencies: [
      {
        name: "Kapenguria",
        winner: "UDA",
        mp: "Samuel Moroto",
        votes: 38200,
        runnerUp: "IND",
        runnerUpVotes: 21400,
        reporting: 96,
      },
      {
        name: "Sigor",
        winner: "UDA",
        mp: "Peter Lochakapong",
        votes: 29400,
        runnerUp: "ODM",
        runnerUpVotes: 12100,
        reporting: 93,
      },
      {
        name: "Kacheliba",
        winner: "UDA",
        mp: "Titus Lotee",
        votes: 31800,
        runnerUp: "IND",
        runnerUpVotes: 18900,
        reporting: 92,
      },
      {
        name: "Pokot South",
        winner: "IND",
        mp: "David Pkosing",
        votes: 27900,
        runnerUp: "UDA",
        runnerUpVotes: 24100,
        reporting: 95,
      },
    ],
  },
  {
    code: "025",
    name: "Samburu",
    region: "Rift Valley",
    x: 218,
    y: 242,
    path: "M 204,196 L 266,204 L 270,276 L 186,282 L 164,284 L 172,226 Z",
    registeredVoters: 100014,
    reportingPct: 91.0,
    presVotes: {
      UDA: 44100,
      ODM: 35800,
      JUBILEE: 4200,
      WIPER: 1900,
      DCP: 2400,
    },
    governor: [
      { name: "Lati Lelelit", party: "UDA", votes: 43200 },
      { name: "Richard Lesiyampe", party: "ODM", votes: 38900 },
    ],
    senate: [
      { name: "Steve Lelegwe", party: "UDA", votes: 45100 },
      { name: "Naisula Lesuuda", party: "IND", votes: 36400 },
    ],
    womanRep: [
      { name: "Pauline Lenguris", party: "UDA", votes: 44800 },
      { name: "Maison Leshoomo", party: "ODM", votes: 36900 },
    ],
    constituencies: [
      {
        name: "Samburu West",
        winner: "IND",
        mp: "Naisula Lesuuda",
        votes: 18400,
        runnerUp: "UDA",
        runnerUpVotes: 16200,
        reporting: 92,
      },
      {
        name: "Samburu North",
        winner: "UDA",
        mp: "Dominic Letipila",
        votes: 15900,
        runnerUp: "ODM",
        runnerUpVotes: 14100,
        reporting: 89,
      },
      {
        name: "Samburu East",
        winner: "ODM",
        mp: "Jackson Lekumontare",
        votes: 14800,
        runnerUp: "UDA",
        runnerUpVotes: 13200,
        reporting: 91,
      },
    ],
  },

  // NORTH & NORTH-EASTERN
  {
    code: "010",
    name: "Marsabit",
    region: "Eastern",
    x: 278,
    y: 158,
    path: "M 204,116 L 236,120 L 298,118 L 352,108 L 354,190 L 266,204 L 204,196 Z",
    registeredVoters: 166912,
    reportingPct: 88.7,
    presVotes: {
      UDA: 64200,
      ODM: 58900,
      JUBILEE: 8900,
      WIPER: 4100,
      DCP: 3200,
    },
    governor: [
      { name: "Mohamud Ali", party: "UDA", votes: 67400 },
      { name: "Ukur Yatani", party: "ODM", votes: 64100 },
    ],
    senate: [
      { name: "Mohamed Chute", party: "UDA", votes: 66800 },
      { name: "Godana Hargura", party: "ODM", votes: 62300 },
    ],
    womanRep: [
      { name: "Naomi Waqo", party: "UDA", votes: 68100 },
      { name: "Safia Sheikh", party: "ODM", votes: 61500 },
    ],
    constituencies: [
      {
        name: "Moyale",
        winner: "UDA",
        mp: "Guyo Jaldesa",
        votes: 24100,
        runnerUp: "ODM",
        runnerUpVotes: 21900,
        reporting: 90,
      },
      {
        name: "North Horr",
        winner: "ODM",
        mp: "Wario Adhe",
        votes: 16800,
        runnerUp: "UDA",
        runnerUpVotes: 15200,
        reporting: 87,
      },
      {
        name: "Saku",
        winner: "UDA",
        mp: "Dido Raso",
        votes: 15900,
        runnerUp: "ODM",
        runnerUpVotes: 14100,
        reporting: 91,
      },
      {
        name: "Laisamis",
        winner: "ODM",
        mp: "Joseph Lekuton",
        votes: 16400,
        runnerUp: "UDA",
        runnerUpVotes: 15100,
        reporting: 88,
      },
    ],
  },
  {
    code: "009",
    name: "Mandera",
    region: "North Eastern",
    x: 494,
    y: 100,
    path: "M 418,96 L 472,74 L 542,60 L 556,68 L 526,116 L 502,138 L 452,144 L 428,136 Z",
    registeredVoters: 217030,
    reportingPct: 86.5,
    presVotes: {
      UDA: 81200,
      ODM: 79400,
      JUBILEE: 9400,
      WIPER: 6200,
      DCP: 2100,
    },
    governor: [
      { name: "Mohamed Adan Khalif", party: "ODM", votes: 84200 },
      { name: "Hassan Noor Hassan", party: "UDA", votes: 81900 },
    ],
    senate: [
      { name: "Ali Roba", party: "UDA", votes: 86500 },
      { name: "Mohamed Mahamud", party: "ODM", votes: 79200 },
    ],
    womanRep: [
      { name: "Umulkheir Kassim", party: "ODM", votes: 85100 },
      { name: "Amina Gedow", party: "UDA", votes: 80400 },
    ],
    constituencies: [
      {
        name: "Mandera West",
        winner: "ODM",
        mp: "Yussuf Adan",
        votes: 15400,
        runnerUp: "UDA",
        runnerUpVotes: 14200,
        reporting: 88,
      },
      {
        name: "Banissa",
        winner: "UDA",
        mp: "Hassan Maalim",
        votes: 14900,
        runnerUp: "ODM",
        runnerUpVotes: 13800,
        reporting: 85,
      },
      {
        name: "Mandera North",
        winner: "ODM",
        mp: "Bashir Abdullahi",
        votes: 16800,
        runnerUp: "UDA",
        runnerUpVotes: 15100,
        reporting: 87,
      },
      {
        name: "Mandera South",
        winner: "UDA",
        mp: "Abdul Haro",
        votes: 17200,
        runnerUp: "ODM",
        runnerUpVotes: 16400,
        reporting: 86,
      },
      {
        name: "Mandera East",
        winner: "ODM",
        mp: "Hussein Weytan",
        votes: 16100,
        runnerUp: "UDA",
        runnerUpVotes: 15500,
        reporting: 89,
      },
      {
        name: "Lafey",
        winner: "UDA",
        mp: "Mohamed Abdiker",
        votes: 13900,
        runnerUp: "ODM",
        runnerUpVotes: 12800,
        reporting: 84,
      },
    ],
  },
  {
    code: "008",
    name: "Wajir",
    region: "North Eastern",
    x: 404,
    y: 184,
    path: "M 352,108 L 418,96 L 428,136 L 452,144 L 452,150 L 456,214 L 468,266 L 366,256 L 354,190 Z",
    registeredVoters: 207758,
    reportingPct: 87.9,
    presVotes: {
      UDA: 78500,
      ODM: 82100,
      JUBILEE: 7600,
      WIPER: 4800,
      DCP: 1900,
    },
    governor: [
      { name: "Ahmed Abdullahi", party: "ODM", votes: 85400 },
      { name: "Hassan Mohamed", party: "UDA", votes: 79100 },
    ],
    senate: [
      { name: "Abbas Sheikh", party: "UDA", votes: 83200 },
      { name: "Abdullahi Ali", party: "ODM", votes: 80900 },
    ],
    womanRep: [
      { name: "Fatuma Jehow", party: "ODM", votes: 84600 },
      { name: "Nasri Sahal", party: "UDA", votes: 79500 },
    ],
    constituencies: [
      {
        name: "Wajir North",
        winner: "ODM",
        mp: "Ibrahim Saney",
        votes: 15200,
        runnerUp: "UDA",
        runnerUpVotes: 14100,
        reporting: 89,
      },
      {
        name: "Wajir East",
        winner: "UDA",
        mp: "Aden Daudi",
        votes: 16100,
        runnerUp: "ODM",
        runnerUpVotes: 15300,
        reporting: 90,
      },
      {
        name: "Tarbaj",
        winner: "UDA",
        mp: "Hussein Barre",
        votes: 13800,
        runnerUp: "ODM",
        runnerUpVotes: 12900,
        reporting: 86,
      },
      {
        name: "Wajir West",
        winner: "ODM",
        mp: "Yussuf Farah",
        votes: 15900,
        runnerUp: "UDA",
        runnerUpVotes: 14400,
        reporting: 88,
      },
      {
        name: "Eldas",
        winner: "JUBILEE",
        mp: "Adan Keynan",
        votes: 13400,
        runnerUp: "ODM",
        runnerUpVotes: 12100,
        reporting: 87,
      },
      {
        name: "Wajir South",
        winner: "ODM",
        mp: "Mohamed Adow",
        votes: 16500,
        runnerUp: "UDA",
        runnerUpVotes: 15200,
        reporting: 88,
      },
    ],
  },
  {
    code: "011",
    name: "Isiolo",
    region: "Eastern",
    x: 318,
    y: 246,
    path: "M 266,204 L 354,190 L 366,256 L 362,332 L 336,302 L 278,286 L 270,276 Z",
    registeredVoters: 89504,
    reportingPct: 93.1,
    presVotes: {
      UDA: 38200,
      ODM: 34900,
      JUBILEE: 4100,
      WIPER: 2400,
      DCP: 2100,
    },
    governor: [
      { name: "Abdi Guyo", party: "JUBILEE", votes: 39800 },
      { name: "Godana Doyo", party: "IND", votes: 36400 },
    ],
    senate: [
      { name: "Fatuma Dullo", party: "JUBILEE", votes: 40200 },
      { name: "Nuh Ibrahim", party: "UDA", votes: 35900 },
    ],
    womanRep: [
      { name: "Mumina Bonaya", party: "JUBILEE", votes: 41100 },
      { name: "Rehema Jaldesa", party: "UDA", votes: 35100 },
    ],
    constituencies: [
      {
        name: "Isiolo North",
        winner: "JUBILEE",
        mp: "Joseph Samal",
        votes: 25400,
        runnerUp: "UDA",
        runnerUpVotes: 22900,
        reporting: 94,
      },
      {
        name: "Isiolo South",
        winner: "JUBILEE",
        mp: "Mohamed Tubi",
        votes: 16200,
        runnerUp: "UDA",
        runnerUpVotes: 14800,
        reporting: 92,
      },
    ],
  },
  {
    code: "007",
    name: "Garissa",
    region: "North Eastern",
    x: 414,
    y: 328,
    path: "M 366,256 L 468,266 L 472,334 L 460,394 L 418,402 L 372,395 L 352,368 L 362,332 Z",
    registeredVoters: 201473,
    reportingPct: 89.2,
    presVotes: {
      UDA: 84200,
      ODM: 76800,
      JUBILEE: 6400,
      WIPER: 5100,
      DCP: 1800,
    },
    governor: [
      { name: "Nathif Jama", party: "ODM", votes: 86100 },
      { name: "Ali Korane", party: "JUBILEE", votes: 78400 },
    ],
    senate: [
      { name: "Abdul Haji", party: "JUBILEE", votes: 88900 },
      { name: "Farah Maalim", party: "WIPER", votes: 74200 },
    ],
    womanRep: [
      { name: "Udgoon Siyad", party: "JUBILEE", votes: 85200 },
      { name: "Anab Gure", party: "UDA", votes: 79100 },
    ],
    constituencies: [
      {
        name: "Garissa Township",
        winner: "UDA",
        mp: "Dekow Mohamed",
        votes: 21400,
        runnerUp: "ODM",
        runnerUpVotes: 18900,
        reporting: 92,
      },
      {
        name: "Balambala",
        winner: "ODM",
        mp: "Abdi Shurie",
        votes: 14800,
        runnerUp: "UDA",
        runnerUpVotes: 13600,
        reporting: 88,
      },
      {
        name: "Lagdera",
        winner: "ODM",
        mp: "Abdikhaim Osman",
        votes: 15200,
        runnerUp: "UDA",
        runnerUpVotes: 14100,
        reporting: 87,
      },
      {
        name: "Dadaab",
        winner: "WIPER",
        mp: "Farah Maalim",
        votes: 16400,
        runnerUp: "UDA",
        runnerUpVotes: 14900,
        reporting: 89,
      },
      {
        name: "Fafi",
        winner: "UDA",
        mp: "Salah Yakub",
        votes: 15800,
        runnerUp: "ODM",
        runnerUpVotes: 14200,
        reporting: 90,
      },
      {
        name: "Ijara",
        winner: "ODM",
        mp: "Abdi Ali",
        votes: 13900,
        runnerUp: "UDA",
        runnerUpVotes: 12700,
        reporting: 88,
      },
    ],
  },

  // WESTERN KENYA
  {
    code: "039",
    name: "Bungoma",
    region: "Western",
    x: 108,
    y: 312,
    path: "M 102,292 L 116,284 L 122,284 L 128,334 L 94,336 Z",
    registeredVoters: 646598,
    reportingPct: 95.4,
    presVotes: {
      UDA: 238400,
      ODM: 244200,
      JUBILEE: 14800,
      WIPER: 12400,
      DCP: 18200,
    },
    governor: [
      { name: "Kenneth Lusaka", party: "UDA", votes: 274500 },
      { name: "Wycliffe Wangamati", party: "DAP", votes: 228900 },
    ],
    senate: [
      { name: "David Wakoli", party: "UDA", votes: 269100 },
      { name: "Wafula Wamunyinyi", party: "DAP", votes: 231400 },
    ],
    womanRep: [
      { name: "Catherine Wambilianga", party: "UDA", votes: 271800 },
      { name: "Reginalda Wanyonyi", party: "DAP", votes: 226400 },
    ],
    constituencies: [
      {
        name: "Mt. Elgon",
        winner: "UDA",
        mp: "Fred Kapondi",
        votes: 32400,
        runnerUp: "ODM",
        runnerUpVotes: 24100,
        reporting: 96,
      },
      {
        name: "Sirisia",
        winner: "IND",
        mp: "John Waluke",
        votes: 26800,
        runnerUp: "UDA",
        runnerUpVotes: 23400,
        reporting: 95,
      },
      {
        name: "Kabuchai",
        winner: "UDA",
        mp: "Majimbo Kalasinga",
        votes: 29400,
        runnerUp: "DAP",
        runnerUpVotes: 22100,
        reporting: 96,
      },
      {
        name: "Bumula",
        winner: "DAP",
        mp: "Jack Wamboka",
        votes: 33200,
        runnerUp: "UDA",
        runnerUpVotes: 28900,
        reporting: 94,
      },
      {
        name: "Kanduyi",
        winner: "DAP",
        mp: "John Makali",
        votes: 42100,
        runnerUp: "UDA",
        runnerUpVotes: 38400,
        reporting: 97,
      },
      {
        name: "Webuye East",
        winner: "UDA",
        mp: "Martin Wanyonyi",
        votes: 24900,
        runnerUp: "DAP",
        runnerUpVotes: 21200,
        reporting: 95,
      },
      {
        name: "Webuye West",
        winner: "UDA",
        mp: "Dan Wanyama",
        votes: 27600,
        runnerUp: "DAP",
        runnerUpVotes: 23800,
        reporting: 96,
      },
      {
        name: "Kimilili",
        winner: "UDA",
        mp: "Didmus Barasa",
        votes: 34800,
        runnerUp: "DAP",
        runnerUpVotes: 25100,
        reporting: 95,
      },
      {
        name: "Tongaren",
        winner: "DAP",
        mp: "John Chikati",
        votes: 31900,
        runnerUp: "UDA",
        runnerUpVotes: 29400,
        reporting: 94,
      },
    ],
  },
  {
    code: "040",
    name: "Busia",
    region: "Western",
    x: 74,
    y: 360,
    path: "M 66,348 L 94,336 L 88,382 L 54,386 Z",
    registeredVoters: 416756,
    reportingPct: 96.1,
    presVotes: {
      UDA: 68400,
      ODM: 252100,
      JUBILEE: 6100,
      WIPER: 6400,
      DCP: 4200,
    },
    governor: [
      { name: "Paul Otuoma", party: "ODM", votes: 238400 },
      { name: "John Sakwa Bunyasi", party: "UDA", votes: 92100 },
    ],
    senate: [
      { name: "Okiya Omtatah", party: "IND", votes: 184200 },
      { name: "Hillary Itela", party: "ODM", votes: 141900 },
    ],
    womanRep: [
      { name: "Catherine Omanyo", party: "ODM", votes: 229400 },
      { name: "Susan Mangeni", party: "UDA", votes: 96200 },
    ],
    constituencies: [
      {
        name: "Teso North",
        winner: "ODM",
        mp: "Oku Kaunya",
        votes: 28400,
        runnerUp: "UDA",
        runnerUpVotes: 21200,
        reporting: 96,
      },
      {
        name: "Teso South",
        winner: "ODM",
        mp: "Mary Emaase",
        votes: 26900,
        runnerUp: "UDA",
        runnerUpVotes: 22400,
        reporting: 95,
      },
      {
        name: "Nambale",
        winner: "IND",
        mp: "Geoffrey Mulanya",
        votes: 24100,
        runnerUp: "ODM",
        runnerUpVotes: 21800,
        reporting: 97,
      },
      {
        name: "Matayos",
        winner: "ODM",
        mp: "Geoffrey Odanga",
        votes: 31200,
        runnerUp: "UDA",
        runnerUpVotes: 16400,
        reporting: 96,
      },
      {
        name: "Butula",
        winner: "ODM",
        mp: "Joseph Oyula",
        votes: 29800,
        runnerUp: "DAP",
        runnerUpVotes: 14200,
        reporting: 96,
      },
      {
        name: "Funyula",
        winner: "ODM",
        mp: "Wilberforce Oundo",
        votes: 25400,
        runnerUp: "UDA",
        runnerUpVotes: 12100,
        reporting: 97,
      },
      {
        name: "Budalangi",
        winner: "ODM",
        mp: "Raphael Wanjala",
        votes: 21900,
        runnerUp: "UDA",
        runnerUpVotes: 13800,
        reporting: 95,
      },
    ],
  },
  {
    code: "037",
    name: "Kakamega",
    region: "Western",
    x: 110,
    y: 358,
    path: "M 94,336 L 128,334 L 128,372 L 118,382 L 88,382 Z",
    registeredVoters: 844551,
    reportingPct: 95.8,
    presVotes: {
      UDA: 204100,
      ODM: 438800,
      JUBILEE: 12400,
      WIPER: 14200,
      DCP: 21600,
    },
    governor: [
      { name: "Fernandes Barasa", party: "ODM", votes: 398400 },
      { name: "Cleophas Malala", party: "UDA", votes: 264100 },
    ],
    senate: [
      { name: "Boni Khalwale", party: "UDA", votes: 338200 },
      { name: "Brian Lishenga", party: "ODM", votes: 321400 },
    ],
    womanRep: [
      { name: "Elsie Muhanda", party: "ODM", votes: 389200 },
      { name: "Hadija Nganyi", party: "UDA", votes: 258900 },
    ],
    constituencies: [
      {
        name: "Lugari",
        winner: "DAP",
        mp: "Nabii Nabwera",
        votes: 34200,
        runnerUp: "UDA",
        runnerUpVotes: 26100,
        reporting: 96,
      },
      {
        name: "Likuyani",
        winner: "ODM",
        mp: "Innocent Mugabe",
        votes: 28900,
        runnerUp: "UDA",
        runnerUpVotes: 23400,
        reporting: 95,
      },
      {
        name: "Malava",
        winner: "UDA",
        mp: "Malulu Injendi",
        votes: 36400,
        runnerUp: "DAP",
        runnerUpVotes: 29800,
        reporting: 96,
      },
      {
        name: "Lurambi",
        winner: "ODM",
        mp: "Titus Khamala",
        votes: 38100,
        runnerUp: "UDA",
        runnerUpVotes: 27400,
        reporting: 97,
      },
      {
        name: "Navakholo",
        winner: "ODM",
        mp: "Emmanuel Wangwe",
        votes: 29400,
        runnerUp: "UDA",
        runnerUpVotes: 22100,
        reporting: 95,
      },
      {
        name: "Mumias West",
        winner: "ODM",
        mp: "Johnson Naicca",
        votes: 27800,
        runnerUp: "UDA",
        runnerUpVotes: 16200,
        reporting: 96,
      },
      {
        name: "Mumias East",
        winner: "DAP",
        mp: "Peter Salasya",
        votes: 26400,
        runnerUp: "UDA",
        runnerUpVotes: 18900,
        reporting: 96,
      },
      {
        name: "Matungu",
        winner: "ODM",
        mp: "Peter Nabulindo",
        votes: 31200,
        runnerUp: "UDA",
        runnerUpVotes: 19400,
        reporting: 95,
      },
      {
        name: "Butere",
        winner: "ODM",
        mp: "Tindi Mwale",
        votes: 32900,
        runnerUp: "UDA",
        runnerUpVotes: 17100,
        reporting: 96,
      },
      {
        name: "Khwisero",
        winner: "ODM",
        mp: "Christopher Aseka",
        votes: 26100,
        runnerUp: "UDA",
        runnerUpVotes: 15800,
        reporting: 95,
      },
      {
        name: "Shinyalu",
        winner: "ODM",
        mp: "Fred Ikana",
        votes: 33400,
        runnerUp: "UDA",
        runnerUpVotes: 24200,
        reporting: 96,
      },
      {
        name: "Ikolomani",
        winner: "ODM",
        mp: "Bernard Shinali",
        votes: 25800,
        runnerUp: "UDA",
        runnerUpVotes: 19100,
        reporting: 95,
      },
    ],
  },
  {
    code: "038",
    name: "Vihiga",
    region: "Western",
    x: 104,
    y: 392,
    path: "M 88,382 L 118,382 L 120,402 L 86,402 Z",
    registeredVoters: 310043,
    reportingPct: 96.4,
    presVotes: {
      UDA: 88400,
      ODM: 152600,
      JUBILEE: 5100,
      WIPER: 5200,
      DCP: 8400,
    },
    governor: [
      { name: "Wilber Ottichilo", party: "ODM", votes: 138400 },
      { name: "Alfred Agoi", party: "UDA", votes: 104200 },
    ],
    senate: [
      { name: "Godfrey Osotsi", party: "ODM", votes: 141200 },
      { name: "Kennedy Butiko", party: "UDA", votes: 99800 },
    ],
    womanRep: [
      { name: "Beatrice Adagala", party: "UDA", votes: 126400 },
      { name: "Violet Bagada", party: "ODM", votes: 118900 },
    ],
    constituencies: [
      {
        name: "Vihiga",
        winner: "ODM",
        mp: "Ernest Kagesi",
        votes: 24800,
        runnerUp: "UDA",
        runnerUpVotes: 18400,
        reporting: 97,
      },
      {
        name: "Sabatia",
        winner: "UDA",
        mp: "Clement Sloya",
        votes: 31200,
        runnerUp: "ODM",
        runnerUpVotes: 25400,
        reporting: 96,
      },
      {
        name: "Hamisi",
        winner: "UDA",
        mp: "Charles Gimose",
        votes: 33800,
        runnerUp: "ODM",
        runnerUpVotes: 28100,
        reporting: 96,
      },
      {
        name: "Luanda",
        winner: "DAP",
        mp: "Dick Maungu",
        votes: 24100,
        runnerUp: "ODM",
        runnerUpVotes: 21900,
        reporting: 97,
      },
      {
        name: "Emuhaya",
        winner: "ODM",
        mp: "Omboko Milemba",
        votes: 26400,
        runnerUp: "UDA",
        runnerUpVotes: 19200,
        reporting: 96,
      },
    ],
  },

  // NYANZA (LAKE VICTORIA BASIN)
  {
    code: "041",
    name: "Siaya",
    region: "Nyanza",
    x: 68,
    y: 400,
    path: "M 54,386 L 88,382 L 86,402 L 84,422 L 56,414 Z",
    registeredVoters: 533595,
    reportingPct: 97.2,
    presVotes: {
      UDA: 12200,
      ODM: 422900,
      JUBILEE: 2800,
      WIPER: 2100,
      DCP: 1400,
    },
    governor: [
      { name: "James Orengo", party: "ODM", votes: 394200 },
      { name: "Nicholas Gumbo", party: "IND", votes: 41800 },
    ],
    senate: [
      { name: "Oburu Oginga", party: "ODM", votes: 402100 },
      { name: "Julius Okinda", party: "IND", votes: 31200 },
    ],
    womanRep: [
      { name: "Christine Ombaka", party: "ODM", votes: 408900 },
      { name: "Sellah Odhiambo", party: "IND", votes: 26400 },
    ],
    constituencies: [
      {
        name: "Ugenya",
        winner: "ODM",
        mp: "David Ochieng",
        votes: 38400,
        runnerUp: "IND",
        runnerUpVotes: 12100,
        reporting: 98,
      },
      {
        name: "Ugunja",
        winner: "ODM",
        mp: "Opiyo Wandayi",
        votes: 41200,
        runnerUp: "UDA",
        runnerUpVotes: 2400,
        reporting: 97,
      },
      {
        name: "Alego Usonga",
        winner: "ODM",
        mp: "Samuel Atandi",
        votes: 68400,
        runnerUp: "IND",
        runnerUpVotes: 8900,
        reporting: 97,
      },
      {
        name: "Gem",
        winner: "ODM",
        mp: "Elisha Odhiambo",
        votes: 54200,
        runnerUp: "IND",
        runnerUpVotes: 6100,
        reporting: 98,
      },
      {
        name: "Bondo",
        winner: "ODM",
        mp: "Gideon Ochanda",
        votes: 62100,
        runnerUp: "IND",
        runnerUpVotes: 5400,
        reporting: 97,
      },
      {
        name: "Rarieda",
        winner: "ODM",
        mp: "Otiende Amollo",
        votes: 51800,
        runnerUp: "UDA",
        runnerUpVotes: 2100,
        reporting: 97,
      },
    ],
  },
  {
    code: "042",
    name: "Kisumu",
    region: "Nyanza",
    x: 106,
    y: 414,
    path: "M 86,402 L 120,402 L 124,426 L 98,426 L 84,422 Z",
    registeredVoters: 606754,
    reportingPct: 97.8,
    presVotes: {
      UDA: 22800,
      ODM: 481200,
      JUBILEE: 4900,
      WIPER: 3400,
      DCP: 2800,
    },
    governor: [
      { name: "Anyang’ Nyong’o", party: "ODM", votes: 448200 },
      { name: "Jack Ranguma", party: "IND", votes: 58400 },
    ],
    senate: [
      { name: "Tom Ojienda", party: "ODM", votes: 459100 },
      { name: "Enos Okolo", party: "IND", votes: 42100 },
    ],
    womanRep: [
      { name: "Ruth Odinga", party: "ODM", votes: 464200 },
      { name: "Valentine Anyango", party: "IND", votes: 38900 },
    ],
    constituencies: [
      {
        name: "Kisumu East",
        winner: "ODM",
        mp: "Shakeel Shabbir",
        votes: 58400,
        runnerUp: "IND",
        runnerUpVotes: 14200,
        reporting: 98,
      },
      {
        name: "Kisumu West",
        winner: "ODM",
        mp: "Rosa Buyu",
        votes: 54100,
        runnerUp: "IND",
        runnerUpVotes: 11800,
        reporting: 98,
      },
      {
        name: "Kisumu Central",
        winner: "ODM",
        mp: "Joshua Oron",
        votes: 62800,
        runnerUp: "IND",
        runnerUpVotes: 16400,
        reporting: 99,
      },
      {
        name: "Seme",
        winner: "ODM",
        mp: "James Nyikal",
        votes: 42100,
        runnerUp: "IND",
        runnerUpVotes: 4800,
        reporting: 97,
      },
      {
        name: "Nyando",
        winner: "ODM",
        mp: "Jared Okello",
        votes: 56400,
        runnerUp: "IND",
        runnerUpVotes: 6200,
        reporting: 98,
      },
      {
        name: "Muhoroni",
        winner: "ODM",
        mp: "Onyango Koyoo",
        votes: 51900,
        runnerUp: "IND",
        runnerUpVotes: 7400,
        reporting: 97,
      },
      {
        name: "Nyakach",
        winner: "ODM",
        mp: "Aduma Owuor",
        votes: 53200,
        runnerUp: "IND",
        runnerUpVotes: 5100,
        reporting: 98,
      },
    ],
  },
  {
    code: "043",
    name: "Homa Bay",
    region: "Nyanza",
    x: 76,
    y: 440,
    path: "M 62,438 L 86,422 L 98,426 L 98,458 L 56,454 Z",
    registeredVoters: 551071,
    reportingPct: 96.5,
    presVotes: {
      UDA: 11900,
      ODM: 441400,
      JUBILEE: 2500,
      WIPER: 1900,
      DCP: 1100,
    },
    governor: [
      { name: "Gladys Wanga", party: "ODM", votes: 412800 },
      { name: "Evans Kidero", party: "IND", votes: 44100 },
    ],
    senate: [
      { name: "Moses Kajwang", party: "ODM", votes: 424100 },
      { name: "Kenneth Kambona", party: "IND", votes: 29400 },
    ],
    womanRep: [
      { name: "Joyce Osogo", party: "ODM", votes: 428900 },
      { name: "Tabitha Nyandiek", party: "IND", votes: 24100 },
    ],
    constituencies: [
      {
        name: "Kasipul",
        winner: "ODM",
        mp: "Ong’ondo Were",
        votes: 48200,
        runnerUp: "IND",
        runnerUpVotes: 6400,
        reporting: 97,
      },
      {
        name: "Kabondo Kasipul",
        winner: "ODM",
        mp: "Eve Obara",
        votes: 44100,
        runnerUp: "IND",
        runnerUpVotes: 5100,
        reporting: 96,
      },
      {
        name: "Karachuonyo",
        winner: "ODM",
        mp: "Adipo Okuome",
        votes: 58400,
        runnerUp: "IND",
        runnerUpVotes: 7800,
        reporting: 97,
      },
      {
        name: "Rangwe",
        winner: "ODM",
        mp: "Lilian Gogo",
        votes: 42900,
        runnerUp: "IND",
        runnerUpVotes: 4900,
        reporting: 96,
      },
      {
        name: "Homa Bay Town",
        winner: "ODM",
        mp: "Peter Kaluma",
        votes: 46800,
        runnerUp: "IND",
        runnerUpVotes: 8200,
        reporting: 98,
      },
      {
        name: "Ndhiwa",
        winner: "ODM",
        mp: "Martin Owino",
        votes: 64200,
        runnerUp: "IND",
        runnerUpVotes: 7100,
        reporting: 96,
      },
      {
        name: "Suba North",
        winner: "ODM",
        mp: "Millie Odhiambo",
        votes: 45100,
        runnerUp: "IND",
        runnerUpVotes: 5800,
        reporting: 97,
      },
      {
        name: "Suba South",
        winner: "ODM",
        mp: "Caroli Omondi",
        votes: 41800,
        runnerUp: "IND",
        runnerUpVotes: 6200,
        reporting: 96,
      },
    ],
  },
  {
    code: "044",
    name: "Migori",
    region: "Nyanza",
    x: 76,
    y: 474,
    path: "M 56,454 L 98,458 L 98,492 L 54,474 Z",
    registeredVoters: 469019,
    reportingPct: 95.1,
    presVotes: {
      UDA: 38100,
      ODM: 332400,
      JUBILEE: 6100,
      WIPER: 2400,
      DCP: 2800,
    },
    governor: [
      { name: "Ochilo Ayacko", party: "ODM", votes: 312400 },
      { name: "John Pesa", party: "DAP", votes: 61800 },
    ],
    senate: [
      { name: "Eddy Oketch", party: "ODM", votes: 324100 },
      { name: "Wilfred Machage Jr", party: "UDA", votes: 48900 },
    ],
    womanRep: [
      { name: "Fatuma Mohamed", party: "ODM", votes: 318900 },
      { name: "Lilian Akugo", party: "IND", votes: 52400 },
    ],
    constituencies: [
      {
        name: "Rongo",
        winner: "ODM",
        mp: "Paul Abuor",
        votes: 44200,
        runnerUp: "IND",
        runnerUpVotes: 6400,
        reporting: 96,
      },
      {
        name: "Awendo",
        winner: "ODM",
        mp: "Walter Owino",
        votes: 42800,
        runnerUp: "IND",
        runnerUpVotes: 5900,
        reporting: 95,
      },
      {
        name: "Suna East",
        winner: "ODM",
        mp: "Junet Mohamed",
        votes: 46100,
        runnerUp: "IND",
        runnerUpVotes: 7200,
        reporting: 96,
      },
      {
        name: "Suna West",
        winner: "ODM",
        mp: "Peter Masara",
        votes: 41900,
        runnerUp: "IND",
        runnerUpVotes: 6800,
        reporting: 95,
      },
      {
        name: "Uriri",
        winner: "ODM",
        mp: "Mark Nyamita",
        votes: 48400,
        runnerUp: "IND",
        runnerUpVotes: 7100,
        reporting: 95,
      },
      {
        name: "Nyatike",
        winner: "ODM",
        mp: "Tom Odege",
        votes: 52100,
        runnerUp: "IND",
        runnerUpVotes: 8400,
        reporting: 94,
      },
      {
        name: "Kuria West",
        winner: "UDA",
        mp: "Mathias Robi",
        votes: 28400,
        runnerUp: "ODM",
        runnerUpVotes: 16200,
        reporting: 95,
      },
      {
        name: "Kuria East",
        winner: "UDA",
        mp: "Marwa Kitayama",
        votes: 24100,
        runnerUp: "ODM",
        runnerUpVotes: 13800,
        reporting: 95,
      },
    ],
  },
  {
    code: "045",
    name: "Kisii",
    region: "Nyanza",
    x: 114,
    y: 464,
    path: "M 98,448 L 130,448 L 130,482 L 98,492 Z",
    registeredVoters: 637010,
    reportingPct: 95.6,
    presVotes: {
      UDA: 114200,
      ODM: 148400,
      JUBILEE: 234200,
      WIPER: 8400,
      DCP: 6800,
    },
    governor: [
      { name: "Simba Arati", party: "ODM", votes: 298400 },
      { name: "Ezekiel Machogu", party: "UDA", votes: 194200 },
    ],
    senate: [
      { name: "Richard Onyonka", party: "ODM", votes: 284100 },
      { name: "Joel Onsare", party: "UDA", votes: 201400 },
    ],
    womanRep: [
      { name: "Dorice Donya", party: "ODM", votes: 291200 },
      { name: "Teresa Bitutu", party: "UDA", votes: 196800 },
    ],
    constituencies: [
      {
        name: "Bonchari",
        winner: "ODM",
        mp: "Charles Onchoke",
        votes: 28400,
        runnerUp: "UDA",
        runnerUpVotes: 21200,
        reporting: 96,
      },
      {
        name: "South Mugirango",
        winner: "UDA",
        mp: "Sylvanus Osoro",
        votes: 34200,
        runnerUp: "ODM",
        runnerUpVotes: 27900,
        reporting: 96,
      },
      {
        name: "Bomachoge Borabu",
        winner: "ODM",
        mp: "Obadiah Barongo",
        votes: 26800,
        runnerUp: "UDA",
        runnerUpVotes: 22400,
        reporting: 95,
      },
      {
        name: "Bobasi",
        winner: "UDA",
        mp: "Innocent Obiri",
        votes: 35100,
        runnerUp: "ODM",
        runnerUpVotes: 31800,
        reporting: 96,
      },
      {
        name: "Bomachoge Chache",
        winner: "UDA",
        mp: "Alfah Miruka",
        votes: 24900,
        runnerUp: "ODM",
        runnerUpVotes: 21600,
        reporting: 95,
      },
      {
        name: "Nyaribari Masaba",
        winner: "ODM",
        mp: "Daniel Manduku",
        votes: 31400,
        runnerUp: "UDA",
        runnerUpVotes: 26800,
        reporting: 96,
      },
      {
        name: "Nyaribari Chache",
        winner: "UDA",
        mp: "Zaheer Jhanda",
        votes: 33800,
        runnerUp: "ODM",
        runnerUpVotes: 31200,
        reporting: 97,
      },
      {
        name: "Kitutu Chache North",
        winner: "UDA",
        mp: "Japheth Nyakundi",
        votes: 27400,
        runnerUp: "ODM",
        runnerUpVotes: 24900,
        reporting: 95,
      },
      {
        name: "Kitutu Chache South",
        winner: "ODM",
        mp: "Anthony Kibagendi",
        votes: 32100,
        runnerUp: "UDA",
        runnerUpVotes: 25400,
        reporting: 96,
      },
    ],
  },
  {
    code: "046",
    name: "Nyamira",
    region: "Nyanza",
    x: 114,
    y: 437,
    path: "M 98,426 L 124,426 L 130,434 L 130,448 L 98,448 Z",
    registeredVoters: 323283,
    reportingPct: 96.0,
    presVotes: {
      UDA: 56400,
      ODM: 72200,
      JUBILEE: 129800,
      WIPER: 4200,
      DCP: 3100,
    },
    governor: [
      { name: "Amos Nyaribo", party: "IND", votes: 112400 },
      { name: "Walter Nyambati", party: "UDA", votes: 98200 },
      { name: "Timothy Bosire", party: "ODM", votes: 54100 },
    ],
    senate: [
      { name: "Okong’o Omogeni", party: "ODM", votes: 144200 },
      { name: "Adams Nyambati", party: "UDA", votes: 102800 },
    ],
    womanRep: [
      { name: "Jerusha Momanyi", party: "JUBILEE", votes: 128400 },
      { name: "Emily Nyagarama", party: "ODM", votes: 119200 },
    ],
    constituencies: [
      {
        name: "Kitutu Masaba",
        winner: "ODM",
        mp: "Clive Gisairo",
        votes: 38400,
        runnerUp: "UDA",
        runnerUpVotes: 32100,
        reporting: 96,
      },
      {
        name: "West Mugirango",
        winner: "JUBILEE",
        mp: "Stephen Mogaka",
        votes: 34200,
        runnerUp: "UDA",
        runnerUpVotes: 28900,
        reporting: 96,
      },
      {
        name: "North Mugirango",
        winner: "UDA",
        mp: "Joash Nyamoko",
        votes: 29800,
        runnerUp: "ODM",
        runnerUpVotes: 24100,
        reporting: 96,
      },
      {
        name: "Borabu",
        winner: "UDA",
        mp: "Patrick Osero",
        votes: 27400,
        runnerUp: "ODM",
        runnerUpVotes: 23800,
        reporting: 95,
      },
    ],
  },

  // RIFT VALLEY CENTRAL & SOUTH
  {
    code: "026",
    name: "Trans Nzoia",
    region: "Rift Valley",
    x: 142,
    y: 312,
    path: "M 122,284 L 164,284 L 160,332 L 128,334 Z",
    registeredVoters: 398981,
    reportingPct: 95.3,
    presVotes: {
      UDA: 158200,
      ODM: 154900,
      JUBILEE: 7400,
      WIPER: 6200,
      DCP: 9900,
    },
    governor: [
      { name: "George Natembeya", party: "DAP", votes: 184200 },
      { name: "Chris Wamalwa", party: "UDA", votes: 146800 },
    ],
    senate: [
      { name: "Allan Chesang", party: "UDA", votes: 168400 },
      { name: "Henry Ole Ndiema", party: "DAP", votes: 159200 },
    ],
    womanRep: [
      { name: "Lilian Siyoi", party: "UDA", votes: 171200 },
      { name: "Phanice Khatundi", party: "DAP", votes: 154800 },
    ],
    constituencies: [
      {
        name: "Kwanza",
        winner: "UDA",
        mp: "Ferdinand Wanyonyi",
        votes: 34200,
        runnerUp: "DAP",
        runnerUpVotes: 28900,
        reporting: 95,
      },
      {
        name: "Endebess",
        winner: "UDA",
        mp: "Robert Pukose",
        votes: 28400,
        runnerUp: "DAP",
        runnerUpVotes: 19200,
        reporting: 96,
      },
      {
        name: "Saboti",
        winner: "ODM",
        mp: "Caleb Amisi",
        votes: 39800,
        runnerUp: "UDA",
        runnerUpVotes: 31400,
        reporting: 96,
      },
      {
        name: "Kiminini",
        winner: "DAP",
        mp: "Maurice Kakai",
        votes: 38200,
        runnerUp: "UDA",
        runnerUpVotes: 33900,
        reporting: 95,
      },
      {
        name: "Cherangany",
        winner: "DAP",
        mp: "Patrick Simiyu",
        votes: 35400,
        runnerUp: "UDA",
        runnerUpVotes: 32800,
        reporting: 94,
      },
    ],
  },
  {
    code: "027",
    name: "Uasin Gishu",
    region: "Rift Valley",
    x: 148,
    y: 352,
    path: "M 128,334 L 160,332 L 166,332 L 166,370 L 128,372 Z",
    registeredVoters: 506138,
    reportingPct: 96.8,
    presVotes: {
      UDA: 368400,
      ODM: 64200,
      JUBILEE: 4800,
      WIPER: 3100,
      DCP: 6200,
    },
    governor: [
      { name: "Jonathan Bii", party: "UDA", votes: 348200 },
      { name: "Zedekiah Bundotich", party: "IND", votes: 89400 },
    ],
    senate: [
      { name: "Jackson Mandago", party: "UDA", votes: 356100 },
      { name: "Robert Kemei", party: "IND", votes: 78200 },
    ],
    womanRep: [
      { name: "Gladys Boss Shollei", party: "UDA", votes: 361400 },
      { name: "Moira Chepkok", party: "IND", votes: 71900 },
    ],
    constituencies: [
      {
        name: "Soy",
        winner: "UDA",
        mp: "David Kiplagat",
        votes: 62400,
        runnerUp: "IND",
        runnerUpVotes: 12100,
        reporting: 97,
      },
      {
        name: "Turbo",
        winner: "UDA",
        mp: "Janet Sitienei",
        votes: 68900,
        runnerUp: "ODM",
        runnerUpVotes: 16400,
        reporting: 97,
      },
      {
        name: "Moiben",
        winner: "UDA",
        mp: "Phylis Bartoo",
        votes: 54200,
        runnerUp: "IND",
        runnerUpVotes: 8900,
        reporting: 96,
      },
      {
        name: "Ainabkoi",
        winner: "UDA",
        mp: "Samuel Chepkonga",
        votes: 48100,
        runnerUp: "IND",
        runnerUpVotes: 9400,
        reporting: 97,
      },
      {
        name: "Kapseret",
        winner: "UDA",
        mp: "Oscar Sudi",
        votes: 64800,
        runnerUp: "ODM",
        runnerUpVotes: 11200,
        reporting: 97,
      },
      {
        name: "Kesses",
        winner: "UDA",
        mp: "Julius Rutto",
        votes: 58400,
        runnerUp: "IND",
        runnerUpVotes: 14800,
        reporting: 96,
      },
    ],
  },
  {
    code: "028",
    name: "Elgeyo Marakwet",
    region: "Rift Valley",
    x: 176,
    y: 328,
    path: "M 164,284 L 186,282 L 184,364 L 166,370 L 166,332 L 160,332 Z",
    registeredVoters: 213884,
    reportingPct: 97.1,
    presVotes: {
      UDA: 174200,
      ODM: 11400,
      JUBILEE: 2100,
      WIPER: 900,
      DCP: 2400,
    },
    governor: [
      { name: "Wisley Rotich", party: "UDA", votes: 168400 },
      { name: "Anthony Chelimo", party: "IND", votes: 19800 },
    ],
    senate: [
      { name: "William Kisang", party: "UDA", votes: 164200 },
      { name: "Tim Kipchumba", party: "IND", votes: 24100 },
    ],
    womanRep: [
      { name: "Caroline Ng’elechei", party: "IND", votes: 102400 },
      { name: "Jane Chebaibai", party: "UDA", votes: 86900 },
    ],
    constituencies: [
      {
        name: "Marakwet East",
        winner: "UDA",
        mp: "Kangogo Bowen",
        votes: 34200,
        runnerUp: "IND",
        runnerUpVotes: 8100,
        reporting: 97,
      },
      {
        name: "Marakwet West",
        winner: "IND",
        mp: "Timothy Toroitich",
        votes: 29800,
        runnerUp: "UDA",
        runnerUpVotes: 24100,
        reporting: 97,
      },
      {
        name: "Keiyo North",
        winner: "UDA",
        mp: "Adams Kipsanai",
        votes: 41200,
        runnerUp: "IND",
        runnerUpVotes: 7400,
        reporting: 98,
      },
      {
        name: "Keiyo South",
        winner: "UDA",
        mp: "Gideon Kimaiyo",
        votes: 48900,
        runnerUp: "IND",
        runnerUpVotes: 9200,
        reporting: 97,
      },
    ],
  },
  {
    code: "029",
    name: "Nandi",
    region: "Rift Valley",
    x: 144,
    y: 386,
    path: "M 120,372 L 128,372 L 166,370 L 170,400 L 120,402 Z",
    registeredVoters: 406288,
    reportingPct: 96.9,
    presVotes: {
      UDA: 318400,
      ODM: 28900,
      JUBILEE: 3200,
      WIPER: 1400,
      DCP: 4100,
    },
    governor: [
      { name: "Stephen Sang", party: "UDA", votes: 284100 },
      { name: "Cleophas Lagat", party: "IND", votes: 68400 },
    ],
    senate: [
      { name: "Samson Cherarkey", party: "UDA", votes: 298400 },
      { name: "Henry Kosgey", party: "IND", votes: 54200 },
    ],
    womanRep: [
      { name: "Cynthia Muge", party: "UDA", votes: 304200 },
      { name: "Tecla Tum", party: "IND", votes: 48900 },
    ],
    constituencies: [
      {
        name: "Tinderet",
        winner: "UDA",
        mp: "Julius Melly",
        votes: 48200,
        runnerUp: "IND",
        runnerUpVotes: 8400,
        reporting: 97,
      },
      {
        name: "Aldai",
        winner: "UDA",
        mp: "Marianne Kitany",
        votes: 54100,
        runnerUp: "IND",
        runnerUpVotes: 9800,
        reporting: 97,
      },
      {
        name: "Nandi Hills",
        winner: "UDA",
        mp: "Bernard Kitur",
        votes: 46800,
        runnerUp: "IND",
        runnerUpVotes: 12400,
        reporting: 96,
      },
      {
        name: "Chesumei",
        winner: "UDA",
        mp: "Paul Biego",
        votes: 58400,
        runnerUp: "IND",
        runnerUpVotes: 11200,
        reporting: 97,
      },
      {
        name: "Emgwen",
        winner: "UDA",
        mp: "Josses Lelmengit",
        votes: 52900,
        runnerUp: "IND",
        runnerUpVotes: 9100,
        reporting: 97,
      },
      {
        name: "Mosop",
        winner: "UDA",
        mp: "Abraham Kirwa",
        votes: 56100,
        runnerUp: "IND",
        runnerUpVotes: 8700,
        reporting: 97,
      },
    ],
  },
  {
    code: "030",
    name: "Baringo",
    region: "Rift Valley",
    x: 204,
    y: 324,
    path: "M 186,282 L 222,282 L 220,358 L 184,364 Z",
    registeredVoters: 281053,
    reportingPct: 95.8,
    presVotes: {
      UDA: 204200,
      ODM: 28400,
      JUBILEE: 6400,
      WIPER: 1600,
      DCP: 3200,
    },
    governor: [
      { name: "Benjamin Cheboi", party: "UDA", votes: 192400 },
      { name: "Stanley Kiptis", party: "IND", votes: 48200 },
    ],
    senate: [
      { name: "William Cheptumo", party: "UDA", votes: 188900 },
      { name: "Gideon Moi", party: "IND", votes: 54100 },
    ],
    womanRep: [
      { name: "Florence Jematiah", party: "UDA", votes: 196400 },
      { name: "Gladwell Cheruiyot", party: "IND", votes: 44800 },
    ],
    constituencies: [
      {
        name: "Tiaty",
        winner: "IND",
        mp: "William Kamket",
        votes: 24800,
        runnerUp: "UDA",
        runnerUpVotes: 18400,
        reporting: 93,
      },
      {
        name: "Baringo North",
        winner: "UDA",
        mp: "Joseph Makilap",
        votes: 36400,
        runnerUp: "IND",
        runnerUpVotes: 8900,
        reporting: 96,
      },
      {
        name: "Baringo Central",
        winner: "UDA",
        mp: "Joshua Kandie",
        votes: 34200,
        runnerUp: "IND",
        runnerUpVotes: 7800,
        reporting: 97,
      },
      {
        name: "Baringo South",
        winner: "UDA",
        mp: "Charles Kamuren",
        votes: 31800,
        runnerUp: "IND",
        runnerUpVotes: 9100,
        reporting: 96,
      },
      {
        name: "Mogotio",
        winner: "UDA",
        mp: "Reuben Kiborek",
        votes: 32900,
        runnerUp: "IND",
        runnerUpVotes: 6400,
        reporting: 97,
      },
      {
        name: "Eldama Ravine",
        winner: "UDA",
        mp: "Musa Sirma",
        votes: 44100,
        runnerUp: "IND",
        runnerUpVotes: 8200,
        reporting: 97,
      },
    ],
  },
  {
    code: "031",
    name: "Laikipia",
    region: "Rift Valley",
    x: 250,
    y: 318,
    path: "M 222,282 L 270,276 L 278,286 L 278,348 L 220,358 Z",
    registeredVoters: 263012,
    reportingPct: 95.2,
    presVotes: {
      UDA: 112400,
      ODM: 38100,
      JUBILEE: 14800,
      WIPER: 2400,
      DCP: 64900,
    },
    governor: [
      { name: "Joshua Irungu", party: "UDA", votes: 148200 },
      { name: "Ndiritu Muriithi", party: "JUBILEE", votes: 72400 },
    ],
    senate: [
      { name: "John Kinyua", party: "UDA", votes: 154100 },
      { name: "Maina Njenga", party: "JUBILEE", votes: 66800 },
    ],
    womanRep: [
      { name: "Jane Kagiri", party: "UDA", votes: 158400 },
      { name: "Catherine Waruguru", party: "IND", votes: 61200 },
    ],
    constituencies: [
      {
        name: "Laikipia West",
        winner: "UDA",
        mp: "Wachira Karani",
        votes: 68400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 24100,
        reporting: 96,
      },
      {
        name: "Laikipia East",
        winner: "UDA",
        mp: "Mwangi Kiunjuri",
        votes: 48200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 28900,
        reporting: 95,
      },
      {
        name: "Laikipia North",
        winner: "ODM",
        mp: "Sarah Korere",
        votes: 21400,
        runnerUp: "UDA",
        runnerUpVotes: 19800,
        reporting: 94,
      },
    ],
  },
  {
    code: "035",
    name: "Kericho",
    region: "Rift Valley",
    x: 150,
    y: 418,
    path: "M 124,402 L 170,400 L 174,436 L 130,434 L 124,426 Z",
    registeredVoters: 428067,
    reportingPct: 97.4,
    presVotes: {
      UDA: 342800,
      ODM: 24100,
      JUBILEE: 2400,
      WIPER: 1200,
      DCP: 3100,
    },
    governor: [
      { name: "Eric Mutai", party: "UDA", votes: 328400 },
      { name: "Charles Keter", party: "IND", votes: 41200 },
    ],
    senate: [
      { name: "Aaron Cheruiyot", party: "UDA", votes: 336100 },
      { name: "Paul Sang", party: "IND", votes: 32800 },
    ],
    womanRep: [
      { name: "Beatrice Kemei", party: "UDA", votes: 334200 },
      { name: "Florence Bore", party: "IND", votes: 34900 },
    ],
    constituencies: [
      {
        name: "Kipkelion East",
        winner: "UDA",
        mp: "Joseph Cherorot",
        votes: 48200,
        runnerUp: "IND",
        runnerUpVotes: 5400,
        reporting: 97,
      },
      {
        name: "Kipkelion West",
        winner: "UDA",
        mp: "Hilary Kosgei",
        votes: 44100,
        runnerUp: "IND",
        runnerUpVotes: 4900,
        reporting: 98,
      },
      {
        name: "Ainamoi",
        winner: "UDA",
        mp: "Benjamin Langat",
        votes: 64200,
        runnerUp: "ODM",
        runnerUpVotes: 8400,
        reporting: 98,
      },
      {
        name: "Bureti",
        winner: "UDA",
        mp: "Kibet Komingoi",
        votes: 68900,
        runnerUp: "IND",
        runnerUpVotes: 6100,
        reporting: 97,
      },
      {
        name: "Belgut",
        winner: "UDA",
        mp: "Nelson Koech",
        votes: 62400,
        runnerUp: "IND",
        runnerUpVotes: 5800,
        reporting: 97,
      },
      {
        name: "Sigowet/Soin",
        winner: "UDA",
        mp: "Justice Kemei",
        votes: 46800,
        runnerUp: "IND",
        runnerUpVotes: 4200,
        reporting: 97,
      },
    ],
  },
  {
    code: "036",
    name: "Bomet",
    region: "Rift Valley",
    x: 152,
    y: 456,
    path: "M 130,434 L 174,436 L 174,462 L 130,482 Z",
    registeredVoters: 376985,
    reportingPct: 97.0,
    presVotes: {
      UDA: 304200,
      ODM: 16400,
      JUBILEE: 1900,
      WIPER: 900,
      DCP: 2800,
    },
    governor: [
      { name: "Hillary Barchok", party: "UDA", votes: 278400 },
      { name: "Isaac Ruto", party: "IND", votes: 46200 },
    ],
    senate: [
      { name: "Hillary Sigei", party: "UDA", votes: 294100 },
      { name: "Wilson Sossion", party: "IND", votes: 31400 },
    ],
    womanRep: [
      { name: "Linet Chepkorir Toto", party: "UDA", votes: 298400 },
      { name: "Joyce Korir", party: "IND", votes: 28100 },
    ],
    constituencies: [
      {
        name: "Sotik",
        winner: "UDA",
        mp: "Francis Sigei",
        votes: 64200,
        runnerUp: "IND",
        runnerUpVotes: 8100,
        reporting: 97,
      },
      {
        name: "Chepalungu",
        winner: "UDA",
        mp: "Victor Koech",
        votes: 58400,
        runnerUp: "IND",
        runnerUpVotes: 9400,
        reporting: 97,
      },
      {
        name: "Bomet East",
        winner: "UDA",
        mp: "Richard Yegon",
        votes: 52100,
        runnerUp: "IND",
        runnerUpVotes: 6800,
        reporting: 97,
      },
      {
        name: "Bomet Central",
        winner: "UDA",
        mp: "Richard Kilel",
        votes: 56800,
        runnerUp: "IND",
        runnerUpVotes: 7200,
        reporting: 97,
      },
      {
        name: "Konoin",
        winner: "UDA",
        mp: "Brighton Yegon",
        votes: 61200,
        runnerUp: "ODM",
        runnerUpVotes: 7900,
        reporting: 97,
      },
    ],
  },
  {
    code: "032",
    name: "Nakuru",
    region: "Rift Valley",
    x: 198,
    y: 404,
    path: "M 166,370 L 184,364 L 220,358 L 224,418 L 236,446 L 236,466 L 218,468 L 174,436 L 170,400 Z",
    registeredVoters: 1054856,
    reportingPct: 95.9,
    presVotes: {
      UDA: 478400,
      ODM: 228900,
      JUBILEE: 34200,
      WIPER: 12400,
      DCP: 154100,
    },
    governor: [
      { name: "Susan Kihika", party: "UDA", votes: 594200 },
      { name: "Lee Kinyanjui", party: "JUBILEE", votes: 284100 },
    ],
    senate: [
      { name: "Tabitha Karanja", party: "UDA", votes: 602400 },
      { name: "Lawrence Karanja", party: "JUBILEE", votes: 271800 },
    ],
    womanRep: [
      { name: "Liza Chelule", party: "UDA", votes: 608900 },
      { name: "Agnes Njeri", party: "JUBILEE", votes: 264200 },
    ],
    constituencies: [
      {
        name: "Molo",
        winner: "UDA",
        mp: "Kuria Kimani",
        votes: 54200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 18400,
        reporting: 96,
      },
      {
        name: "Njoro",
        winner: "UDA",
        mp: "Charity Kathambi",
        votes: 62800,
        runnerUp: "JUBILEE",
        runnerUpVotes: 24100,
        reporting: 96,
      },
      {
        name: "Naivasha",
        winner: "UDA",
        mp: "Jayne Kihara",
        votes: 84200,
        runnerUp: "ODM",
        runnerUpVotes: 46800,
        reporting: 95,
      },
      {
        name: "Gilgil",
        winner: "UDA",
        mp: "Martha Wangari",
        votes: 51400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 21200,
        reporting: 96,
      },
      {
        name: "Kuresoi South",
        winner: "UDA",
        mp: "Joseph Tonui",
        votes: 48900,
        runnerUp: "IND",
        runnerUpVotes: 6400,
        reporting: 97,
      },
      {
        name: "Kuresoi North",
        winner: "UDA",
        mp: "Alfred Mutai",
        votes: 52100,
        runnerUp: "IND",
        runnerUpVotes: 7100,
        reporting: 97,
      },
      {
        name: "Subukia",
        winner: "UDA",
        mp: "Samuel Gachobe",
        votes: 38400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 14200,
        reporting: 96,
      },
      {
        name: "Rongai",
        winner: "UDA",
        mp: "Paul Chebor",
        votes: 49800,
        runnerUp: "IND",
        runnerUpVotes: 21400,
        reporting: 96,
      },
      {
        name: "Bahati",
        winner: "JUBILEE",
        mp: "Irene Njoki",
        votes: 44200,
        runnerUp: "UDA",
        runnerUpVotes: 41800,
        reporting: 96,
      },
      {
        name: "Nakuru Town West",
        winner: "ODM",
        mp: "Samuel Arama",
        votes: 48900,
        runnerUp: "UDA",
        runnerUpVotes: 44100,
        reporting: 95,
      },
      {
        name: "Nakuru Town East",
        winner: "UDA",
        mp: "David Gikaria",
        votes: 56400,
        runnerUp: "ODM",
        runnerUpVotes: 42800,
        reporting: 96,
      },
    ],
  },
  {
    code: "033",
    name: "Narok",
    region: "Rift Valley",
    x: 158,
    y: 496,
    path: "M 94,490 L 130,482 L 174,462 L 174,436 L 218,468 L 184,540 L 156,518 Z",
    registeredVoters: 398784,
    reportingPct: 93.4,
    presVotes: {
      UDA: 184200,
      ODM: 138400,
      JUBILEE: 8200,
      WIPER: 4100,
      DCP: 5400,
    },
    governor: [
      { name: "Patrick Ole Ntutu", party: "UDA", votes: 188400 },
      { name: "Moitalel Ole Kenta", party: "ODM", votes: 146200 },
    ],
    senate: [
      { name: "Ledama Olekina", party: "ODM", votes: 174200 },
      { name: "Samuel Tunai", party: "UDA", votes: 159800 },
    ],
    womanRep: [
      { name: "Rebecca Tonkei", party: "UDA", votes: 184900 },
      { name: "Lydia Naneu", party: "ODM", votes: 148100 },
    ],
    constituencies: [
      {
        name: "Kilgoris",
        winner: "UDA",
        mp: "Julius Sunkuli",
        votes: 36400,
        runnerUp: "ODM",
        runnerUpVotes: 29800,
        reporting: 93,
      },
      {
        name: "Emurua Dikirr",
        winner: "UDA",
        mp: "Johana Ngeno",
        votes: 38200,
        runnerUp: "ODM",
        runnerUpVotes: 8400,
        reporting: 95,
      },
      {
        name: "Narok North",
        winner: "ODM",
        mp: "Agnes Pareyio",
        votes: 41200,
        runnerUp: "UDA",
        runnerUpVotes: 34800,
        reporting: 94,
      },
      {
        name: "Narok East",
        winner: "UDA",
        mp: "Ken Aramat",
        votes: 26400,
        runnerUp: "ODM",
        runnerUpVotes: 22100,
        reporting: 93,
      },
      {
        name: "Narok South",
        winner: "UDA",
        mp: "Kitilai Ole Ntutu",
        votes: 38900,
        runnerUp: "ODM",
        runnerUpVotes: 28400,
        reporting: 92,
      },
      {
        name: "Narok West",
        winner: "UDA",
        mp: "Gabriel Tongoyo",
        votes: 34100,
        runnerUp: "ODM",
        runnerUpVotes: 25900,
        reporting: 93,
      },
    ],
  },
  {
    code: "034",
    name: "Kajiado",
    region: "Rift Valley",
    x: 244,
    y: 516,
    path: "M 218,468 L 236,466 L 268,466 L 274,486 L 294,584 L 222,550 L 184,540 Z",
    registeredVoters: 463273,
    reportingPct: 94.8,
    presVotes: {
      UDA: 166400,
      ODM: 184200,
      JUBILEE: 12400,
      WIPER: 18800,
      DCP: 16800,
    },
    governor: [
      { name: "Joseph Ole Lenku", party: "ODM", votes: 194200 },
      { name: "Katoo Ole Metito", party: "UDA", votes: 184800 },
    ],
    senate: [
      { name: "Seki Kanar", party: "UDA", votes: 191400 },
      { name: "Judith Pareno", party: "ODM", votes: 186200 },
    ],
    womanRep: [
      { name: "Leah Sankaire", party: "UDA", votes: 192800 },
      { name: "Jennifer Moinkett", party: "ODM", votes: 184100 },
    ],
    constituencies: [
      {
        name: "Kajiado North",
        winner: "UDA",
        mp: "Onesmus Ngogoyo",
        votes: 58400,
        runnerUp: "ODM",
        runnerUpVotes: 54200,
        reporting: 96,
      },
      {
        name: "Kajiado Central",
        winner: "ODM",
        mp: "Elijah Memusi",
        votes: 32400,
        runnerUp: "UDA",
        runnerUpVotes: 29800,
        reporting: 94,
      },
      {
        name: "Kajiado East",
        winner: "ODM",
        mp: "Kakuta Maimai",
        votes: 48200,
        runnerUp: "UDA",
        runnerUpVotes: 44100,
        reporting: 95,
      },
      {
        name: "Kajiado West",
        winner: "UDA",
        mp: "George Sunkuyia",
        votes: 36800,
        runnerUp: "ODM",
        runnerUpVotes: 31200,
        reporting: 94,
      },
      {
        name: "Kajiado South",
        winner: "UDA",
        mp: "Samuel Parashina",
        votes: 34100,
        runnerUp: "ODM",
        runnerUpVotes: 32900,
        reporting: 94,
      },
    ],
  },

  // MOUNT KENYA & CENTRAL
  {
    code: "012",
    name: "Meru",
    region: "Eastern",
    x: 314,
    y: 336,
    path: "M 278,286 L 336,302 L 362,332 L 352,368 L 296,368 L 278,348 Z",
    registeredVoters: 772139,
    reportingPct: 95.7,
    presVotes: {
      UDA: 312400,
      ODM: 108200,
      JUBILEE: 28400,
      WIPER: 14200,
      DCP: 201200,
    },
    governor: [
      { name: "Kawira Mwangaza", party: "IND", votes: 254200 },
      { name: "Mithika Linturi", party: "UDA", votes: 218400 },
      { name: "Kiraitu Murungi", party: "JUBILEE", votes: 164800 },
    ],
    senate: [
      { name: "Kathuri Murungi", party: "UDA", votes: 468200 },
      { name: "Mugambi Imanyara", party: "JUBILEE", votes: 154100 },
    ],
    womanRep: [
      { name: "Elizabeth Karambu", party: "UDA", votes: 474100 },
      { name: "Edith Mwirigi", party: "JUBILEE", votes: 148900 },
    ],
    constituencies: [
      {
        name: "Igembe South",
        winner: "UDA",
        mp: "John Paul Mwirigi",
        votes: 44200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 16400,
        reporting: 96,
      },
      {
        name: "Igembe Central",
        winner: "UDA",
        mp: "Dan Kiili",
        votes: 48900,
        runnerUp: "JUBILEE",
        runnerUpVotes: 18200,
        reporting: 95,
      },
      {
        name: "Igembe North",
        winner: "UDA",
        mp: "Julius Taitumu",
        votes: 42100,
        runnerUp: "JUBILEE",
        runnerUpVotes: 15800,
        reporting: 95,
      },
      {
        name: "Tigania West",
        winner: "UDA",
        mp: "John Mutunga",
        votes: 38400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 14100,
        reporting: 96,
      },
      {
        name: "Tigania East",
        winner: "JUBILEE",
        mp: "Mpuru Aburi",
        votes: 36800,
        runnerUp: "UDA",
        runnerUpVotes: 34200,
        reporting: 95,
      },
      {
        name: "North Imenti",
        winner: "JUBILEE",
        mp: "Rahim Dawood",
        votes: 46100,
        runnerUp: "UDA",
        runnerUpVotes: 42800,
        reporting: 97,
      },
      {
        name: "Buuri",
        winner: "UDA",
        mp: "Mugambi Rindikiri",
        votes: 44800,
        runnerUp: "JUBILEE",
        runnerUpVotes: 19200,
        reporting: 96,
      },
      {
        name: "Central Imenti",
        winner: "UDA",
        mp: "Moses Kirima",
        votes: 41200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 17400,
        reporting: 96,
      },
      {
        name: "South Imenti",
        winner: "UDA",
        mp: "Shadrack Mwiti",
        votes: 54200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 24800,
        reporting: 96,
      },
    ],
  },
  {
    code: "013",
    name: "Tharaka Nithi",
    region: "Eastern",
    x: 324,
    y: 382,
    path: "M 296,368 L 352,368 L 372,395 L 324,398 L 296,396 Z",
    registeredVoters: 231932,
    reportingPct: 96.8,
    presVotes: {
      UDA: 112400,
      ODM: 16400,
      JUBILEE: 8900,
      WIPER: 2400,
      DCP: 65100,
    },
    governor: [
      { name: "Muthomi Njuki", party: "UDA", votes: 164200 },
      { name: "Erastus Muriuki", party: "JUBILEE", votes: 32400 },
    ],
    senate: [
      { name: "Mwenda Gataya", party: "UDA", votes: 168400 },
      { name: "Samuel Ragwa", party: "JUBILEE", votes: 28900 },
    ],
    womanRep: [
      { name: "Susan Ngugi", party: "UDA", votes: 166800 },
      { name: "Beatrice Nkatha", party: "JUBILEE", votes: 30100 },
    ],
    constituencies: [
      {
        name: "Maara",
        winner: "UDA",
        mp: "Kareke Mbiuki",
        votes: 54200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 11200,
        reporting: 97,
      },
      {
        name: "Chuka/Igambang’ombe",
        winner: "UDA",
        mp: "Patrick Munene",
        votes: 62800,
        runnerUp: "JUBILEE",
        runnerUpVotes: 12400,
        reporting: 97,
      },
      {
        name: "Tharaka",
        winner: "UDA",
        mp: "George Murugara",
        votes: 51400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 9800,
        reporting: 96,
      },
    ],
  },
  {
    code: "014",
    name: "Embu",
    region: "Eastern",
    x: 300,
    y: 414,
    path: "M 280,396 L 296,396 L 324,398 L 322,430 L 280,426 Z",
    registeredVoters: 334302,
    reportingPct: 96.4,
    presVotes: {
      UDA: 114800,
      ODM: 32400,
      JUBILEE: 14200,
      WIPER: 8200,
      DCP: 126800,
    },
    governor: [
      { name: "Cecily Mbarire", party: "UDA", votes: 214200 },
      { name: "Lenny Kivuti", party: "IND", votes: 72400 },
    ],
    senate: [
      { name: "Alexander Mundigi", party: "UDA", votes: 224800 },
      { name: "Njeru Ndwiga", party: "JUBILEE", votes: 58900 },
    ],
    womanRep: [
      { name: "Pamela Njoki", party: "UDA", votes: 228400 },
      { name: "Jane Wanjuki", party: "JUBILEE", votes: 54200 },
    ],
    constituencies: [
      {
        name: "Manyatta",
        winner: "UDA",
        mp: "Gitonga Mukunji",
        votes: 68400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 18200,
        reporting: 97,
      },
      {
        name: "Runyenjes",
        winner: "UDA",
        mp: "Eric Muchangi",
        votes: 64200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 15400,
        reporting: 96,
      },
      {
        name: "Mbeere South",
        winner: "UDA",
        mp: "Nebart Muriuki",
        votes: 48900,
        runnerUp: "IND",
        runnerUpVotes: 24100,
        reporting: 96,
      },
      {
        name: "Mbeere North",
        winner: "UDA",
        mp: "Geoffrey Ruku",
        votes: 44100,
        runnerUp: "IND",
        runnerUpVotes: 19800,
        reporting: 96,
      },
    ],
  },
  {
    code: "019",
    name: "Nyeri",
    region: "Central",
    x: 260,
    y: 370,
    path: "M 238,348 L 278,348 L 278,368 L 274,368 L 274,392 L 246,392 L 246,358 L 238,358 Z",
    registeredVoters: 481632,
    reportingPct: 97.5,
    presVotes: {
      UDA: 92800,
      ODM: 34200,
      JUBILEE: 26400,
      WIPER: 3400,
      DCP: 269200,
    },
    governor: [
      { name: "Mutahi Kahiga", party: "UDA", votes: 328400 },
      { name: "Thuo Mathenge", party: "JUBILEE", votes: 84200 },
    ],
    senate: [
      { name: "Wahome Wamatinga", party: "UDA", votes: 334100 },
      { name: "Ephraim Maina", party: "JUBILEE", votes: 78900 },
    ],
    womanRep: [
      { name: "Rahab Mukami", party: "UDA", votes: 338200 },
      { name: "Priscilla Nyokabi", party: "JUBILEE", votes: 74100 },
    ],
    constituencies: [
      {
        name: "Tetu",
        winner: "UDA",
        mp: "Geoffrey Wandeto",
        votes: 38400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 9200,
        reporting: 98,
      },
      {
        name: "Kieni",
        winner: "UDA",
        mp: "Njoroge Wainaina",
        votes: 78200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 18400,
        reporting: 97,
      },
      {
        name: "Mathira",
        winner: "UDA",
        mp: "Eric Wamumbi",
        votes: 74100,
        runnerUp: "JUBILEE",
        runnerUpVotes: 14200,
        reporting: 98,
      },
      {
        name: "Othaya",
        winner: "UDA",
        mp: "Wambugu Wainaina",
        votes: 44800,
        runnerUp: "JUBILEE",
        runnerUpVotes: 11400,
        reporting: 98,
      },
      {
        name: "Mukurweini",
        winner: "UDA",
        mp: "John Kaguchia",
        votes: 41200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 10800,
        reporting: 97,
      },
      {
        name: "Nyeri Town",
        winner: "UDA",
        mp: "Duncan Mathenge",
        votes: 62400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 19200,
        reporting: 98,
      },
    ],
  },
  {
    code: "020",
    name: "Kirinyaga",
    region: "Central",
    x: 285,
    y: 382,
    path: "M 274,368 L 278,368 L 296,368 L 296,396 L 280,396 L 274,392 Z",
    registeredVoters: 376001,
    reportingPct: 97.2,
    presVotes: {
      UDA: 98200,
      ODM: 28800,
      JUBILEE: 18400,
      WIPER: 2800,
      DCP: 186100,
    },
    governor: [
      { name: "Anne Waiguru", party: "UDA", votes: 218400 },
      { name: "Wangui Ngirici", party: "IND", votes: 108200 },
    ],
    senate: [
      { name: "James Murango", party: "UDA", votes: 258400 },
      { name: "Daniel Karaba", party: "JUBILEE", votes: 64100 },
    ],
    womanRep: [
      { name: "Njeri Maina", party: "UDA", votes: 264200 },
      { name: "Rose Wachira", party: "JUBILEE", votes: 58900 },
    ],
    constituencies: [
      {
        name: "Mwea",
        winner: "UDA",
        mp: "Mary Maingi",
        votes: 94200,
        runnerUp: "IND",
        runnerUpVotes: 28400,
        reporting: 97,
      },
      {
        name: "Gichugu",
        winner: "UDA",
        mp: "Gichimu Githinji",
        votes: 64800,
        runnerUp: "JUBILEE",
        runnerUpVotes: 16200,
        reporting: 97,
      },
      {
        name: "Ndia",
        winner: "UDA",
        mp: "George Kariuki",
        votes: 52100,
        runnerUp: "JUBILEE",
        runnerUpVotes: 14100,
        reporting: 97,
      },
      {
        name: "Kirinyaga Central",
        winner: "UDA",
        mp: "Gachoki Gitari",
        votes: 58400,
        runnerUp: "IND",
        runnerUpVotes: 18900,
        reporting: 98,
      },
    ],
  },
  {
    code: "021",
    name: "Murang’a",
    region: "Central",
    x: 262,
    y: 406,
    path: "M 246,392 L 274,392 L 280,396 L 280,426 L 272,418 L 246,418 Z",
    registeredVoters: 620929,
    reportingPct: 97.1,
    presVotes: {
      UDA: 168200,
      ODM: 54100,
      JUBILEE: 31200,
      WIPER: 4200,
      DCP: 296400,
    },
    governor: [
      { name: "Irungu Kang’ata", party: "UDA", votes: 418400 },
      { name: "Jamleck Kamau", party: "JUBILEE", votes: 112400 },
    ],
    senate: [
      { name: "Joe Nyutu", party: "UDA", votes: 428900 },
      { name: "Kembi Gitura", party: "JUBILEE", votes: 104200 },
    ],
    womanRep: [
      { name: "Betty Maina", party: "UDA", votes: 432100 },
      { name: "Waithira Muithirania", party: "JUBILEE", votes: 98400 },
    ],
    constituencies: [
      {
        name: "Kangema",
        winner: "UDA",
        mp: "Peter Kihungi",
        votes: 38400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 9800,
        reporting: 97,
      },
      {
        name: "Mathioya",
        winner: "UDA",
        mp: "Edwin Mugo",
        votes: 41200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 10400,
        reporting: 97,
      },
      {
        name: "Kiharu",
        winner: "UDA",
        mp: "Ndindi Nyoro",
        votes: 92400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 14200,
        reporting: 98,
      },
      {
        name: "Kigumo",
        winner: "UDA",
        mp: "Joseph Munyoro",
        votes: 54800,
        runnerUp: "JUBILEE",
        runnerUpVotes: 13800,
        reporting: 97,
      },
      {
        name: "Maragwa",
        winner: "UDA",
        mp: "Mary Wamaua",
        votes: 68200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 18400,
        reporting: 97,
      },
      {
        name: "Kandara",
        winner: "UDA",
        mp: "Chege Njuguna",
        votes: 74100,
        runnerUp: "JUBILEE",
        runnerUpVotes: 16200,
        reporting: 97,
      },
      {
        name: "Gatanga",
        winner: "UDA",
        mp: "Edward Muriu",
        votes: 69400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 19100,
        reporting: 97,
      },
    ],
  },
  {
    code: "018",
    name: "Nyandarua",
    region: "Central",
    x: 232,
    y: 386,
    path: "M 220,358 L 246,358 L 246,418 L 224,418 Z",
    registeredVoters: 361165,
    reportingPct: 96.6,
    presVotes: {
      UDA: 108400,
      ODM: 28200,
      JUBILEE: 21400,
      WIPER: 2400,
      DCP: 159800,
    },
    governor: [
      { name: "Kiarie Badilisha", party: "UDA", votes: 238400 },
      { name: "Francis Kimemia", party: "JUBILEE", votes: 74200 },
    ],
    senate: [
      { name: "John Methu", party: "UDA", votes: 248900 },
      { name: "Mwangi Githiomi", party: "JUBILEE", votes: 64100 },
    ],
    womanRep: [
      { name: "Faith Gitau", party: "UDA", votes: 244200 },
      { name: "Wanjiku Muhia", party: "JUBILEE", votes: 68400 },
    ],
    constituencies: [
      {
        name: "Kinangop",
        winner: "UDA",
        mp: "Kwenya Thuku",
        votes: 78400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 18400,
        reporting: 97,
      },
      {
        name: "Kipipiri",
        winner: "UDA",
        mp: "Wanjiku Muhia",
        votes: 42100,
        runnerUp: "JUBILEE",
        runnerUpVotes: 16800,
        reporting: 96,
      },
      {
        name: "Ol Kalou",
        winner: "UDA",
        mp: "David Kiaraho",
        votes: 54800,
        runnerUp: "JUBILEE",
        runnerUpVotes: 14200,
        reporting: 97,
      },
      {
        name: "Ol Jorok",
        winner: "UDA",
        mp: "Michael Muchira",
        votes: 44200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 12100,
        reporting: 96,
      },
      {
        name: "Ndaragwa",
        winner: "UDA",
        mp: "George Gachagua",
        votes: 41900,
        runnerUp: "JUBILEE",
        runnerUpVotes: 15400,
        reporting: 97,
      },
    ],
  },
  {
    code: "022",
    name: "Kiambu",
    region: "Central",
    x: 252,
    y: 432,
    path: "M 224,418 L 272,418 L 280,426 L 268,446 L 236,446 L 228,446 Z",
    registeredVoters: 1275008,
    reportingPct: 96.8,
    presVotes: {
      UDA: 322100,
      ODM: 174200,
      JUBILEE: 54800,
      WIPER: 14200,
      DCP: 546400,
    },
    governor: [
      { name: "Kimani Wamatangi", party: "UDA", votes: 748200 },
      { name: "William Kabogo", party: "IND", votes: 214800 },
      { name: "James Nyoro", party: "JUBILEE", votes: 118400 },
    ],
    senate: [
      { name: "Karungo Thang’wa", party: "UDA", votes: 794200 },
      { name: "George Maara", party: "JUBILEE", votes: 224100 },
    ],
    womanRep: [
      { name: "Anne Wamuratha", party: "UDA", votes: 802400 },
      { name: "Gladys Chania", party: "JUBILEE", votes: 218900 },
    ],
    constituencies: [
      {
        name: "Gatundu South",
        winner: "UDA",
        mp: "Gabriel Kagombe",
        votes: 48200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 19400,
        reporting: 97,
      },
      {
        name: "Gatundu North",
        winner: "UDA",
        mp: "Elijah Kururia",
        votes: 44100,
        runnerUp: "JUBILEE",
        runnerUpVotes: 16800,
        reporting: 96,
      },
      {
        name: "Juja",
        winner: "UDA",
        mp: "George Koimburi",
        votes: 84200,
        runnerUp: "ODM",
        runnerUpVotes: 24100,
        reporting: 97,
      },
      {
        name: "Thika Town",
        winner: "UDA",
        mp: "Alice Ng’ang’a",
        votes: 88900,
        runnerUp: "ODM",
        runnerUpVotes: 28400,
        reporting: 97,
      },
      {
        name: "Ruiru",
        winner: "UDA",
        mp: "Simon King’ara",
        votes: 112400,
        runnerUp: "ODM",
        runnerUpVotes: 38200,
        reporting: 97,
      },
      {
        name: "Githunguri",
        winner: "UDA",
        mp: "Gathoni Wamuchomba",
        votes: 68400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 18900,
        reporting: 97,
      },
      {
        name: "Kiambu",
        winner: "UDA",
        mp: "Machua Waithaka",
        votes: 54200,
        runnerUp: "JUBILEE",
        runnerUpVotes: 16400,
        reporting: 97,
      },
      {
        name: "Kiambaa",
        winner: "UDA",
        mp: "John Njuguna Wanjiku",
        votes: 64800,
        runnerUp: "JUBILEE",
        runnerUpVotes: 17200,
        reporting: 97,
      },
      {
        name: "Kabete",
        winner: "UDA",
        mp: "Githua Wamacukuru",
        votes: 62100,
        runnerUp: "ODM",
        runnerUpVotes: 18400,
        reporting: 97,
      },
      {
        name: "Kikuyu",
        winner: "UDA",
        mp: "Kimani Ichung’wah",
        votes: 78400,
        runnerUp: "ODM",
        runnerUpVotes: 19200,
        reporting: 98,
      },
      {
        name: "Limuru",
        winner: "UDA",
        mp: "John Kiragu",
        votes: 58900,
        runnerUp: "JUBILEE",
        runnerUpVotes: 18100,
        reporting: 96,
      },
      {
        name: "Lari",
        winner: "UDA",
        mp: "Mburu Kahangara",
        votes: 52400,
        runnerUp: "JUBILEE",
        runnerUpVotes: 14800,
        reporting: 97,
      },
    ],
  },

  // NAIROBI METROPOLITAN
  {
    code: "047",
    name: "Nairobi",
    region: "Nairobi",
    x: 252,
    y: 456,
    path: "M 236,446 L 268,446 L 268,466 L 236,466 Z",
    registeredVoters: 2415310,
    reportingPct: 95.4,
    presVotes: {
      UDA: 542800,
      ODM: 914200,
      JUBILEE: 44100,
      WIPER: 58200,
      DCP: 98400,
    },
    governor: [
      { name: "Johnson Sakaja", party: "UDA", votes: 748200 },
      { name: "Polycarp Igathe", party: "JUBILEE", votes: 694100 },
    ],
    senate: [
      { name: "Edwin Sifuna", party: "ODM", votes: 842100 },
      { name: "Margaret Wanjiru", party: "UDA", votes: 618400 },
    ],
    womanRep: [
      { name: "Esther Passaris", party: "ODM", votes: 824800 },
      { name: "Millicent Omanga", party: "UDA", votes: 634200 },
    ],
    constituencies: [
      {
        name: "Westlands",
        winner: "ODM",
        mp: "Tim Wanyonyi",
        votes: 64200,
        runnerUp: "UDA",
        runnerUpVotes: 48900,
        reporting: 96,
      },
      {
        name: "Dagoretti North",
        winner: "ODM",
        mp: "Beatrice Elachi",
        votes: 58400,
        runnerUp: "UDA",
        runnerUpVotes: 44100,
        reporting: 95,
      },
      {
        name: "Dagoretti South",
        winner: "UDA",
        mp: "John Kiarie",
        votes: 48900,
        runnerUp: "ODM",
        runnerUpVotes: 42100,
        reporting: 96,
      },
      {
        name: "Lang’ata",
        winner: "ODM",
        mp: "Phelix Odiwuor (Jalang’o)",
        votes: 51200,
        runnerUp: "UDA",
        runnerUpVotes: 44800,
        reporting: 96,
      },
      {
        name: "Kibra",
        winner: "ODM",
        mp: "Peter Orero",
        votes: 49800,
        runnerUp: "UDA",
        runnerUpVotes: 24100,
        reporting: 97,
      },
      {
        name: "Roysambu",
        winner: "UDA",
        mp: "Augustine Kamande",
        votes: 78400,
        runnerUp: "ODM",
        runnerUpVotes: 54200,
        reporting: 95,
      },
      {
        name: "Kasarani",
        winner: "UDA",
        mp: "Ronald Karauri",
        votes: 74100,
        runnerUp: "ODM",
        runnerUpVotes: 61800,
        reporting: 95,
      },
      {
        name: "Ruaraka",
        winner: "ODM",
        mp: "TJ Kajwang",
        votes: 54800,
        runnerUp: "UDA",
        runnerUpVotes: 32400,
        reporting: 96,
      },
      {
        name: "Embakasi South",
        winner: "WIPER",
        mp: "Julius Mawathe",
        votes: 58200,
        runnerUp: "UDA",
        runnerUpVotes: 46100,
        reporting: 95,
      },
      {
        name: "Embakasi North",
        winner: "UDA",
        mp: "James Gakuya",
        votes: 46800,
        runnerUp: "ODM",
        runnerUpVotes: 38400,
        reporting: 96,
      },
      {
        name: "Embakasi Central",
        winner: "UDA",
        mp: "Benjamin Gathiru",
        votes: 56400,
        runnerUp: "ODM",
        runnerUpVotes: 44200,
        reporting: 95,
      },
      {
        name: "Embakasi East",
        winner: "ODM",
        mp: "Babu Owino",
        votes: 68900,
        runnerUp: "UDA",
        runnerUpVotes: 48200,
        reporting: 96,
      },
      {
        name: "Embakasi West",
        winner: "JUBILEE",
        mp: "Mark Mwenje",
        votes: 51400,
        runnerUp: "UDA",
        runnerUpVotes: 48900,
        reporting: 95,
      },
      {
        name: "Makadara",
        winner: "ODM",
        mp: "George Aladwa",
        votes: 46200,
        runnerUp: "UDA",
        runnerUpVotes: 39800,
        reporting: 96,
      },
      {
        name: "Kamukunji",
        winner: "JUBILEE",
        mp: "Yusuf Hassan",
        votes: 42800,
        runnerUp: "UDA",
        runnerUpVotes: 38400,
        reporting: 95,
      },
      {
        name: "Starehe",
        winner: "UDA",
        mp: "Amos Mwago",
        votes: 52100,
        runnerUp: "ODM",
        runnerUpVotes: 46800,
        reporting: 95,
      },
      {
        name: "Mathare",
        winner: "ODM",
        mp: "Anthony Oluoch",
        votes: 48400,
        runnerUp: "UDA",
        runnerUpVotes: 36200,
        reporting: 96,
      },
    ],
  },

  // LOWER EASTERN (UKAMBANI & KITUI)
  {
    code: "016",
    name: "Machakos",
    region: "Eastern",
    x: 296,
    y: 462,
    path: "M 268,446 L 280,426 L 322,430 L 324,500 L 274,486 L 268,466 Z",
    registeredVoters: 687565,
    reportingPct: 96.2,
    presVotes: {
      UDA: 98400,
      ODM: 122100,
      JUBILEE: 12400,
      WIPER: 314200,
      DCP: 18900,
    },
    governor: [
      { name: "Wavinya Ndeti", party: "WIPER", votes: 312400 },
      { name: "Nzioka Waita", party: "IND", votes: 148200 },
      { name: "Johnson Muthama", party: "UDA", votes: 94100 },
    ],
    senate: [
      { name: "Agnes Kavindu", party: "WIPER", votes: 324800 },
      { name: "Urbanus Ngengele", party: "UDA", votes: 164200 },
    ],
    womanRep: [
      { name: "Joyce Kamene", party: "WIPER", votes: 318400 },
      { name: "Rita Ndunge", party: "UDA", votes: 158900 },
    ],
    constituencies: [
      {
        name: "Masinga",
        winner: "WIPER",
        mp: "Joshua Mwalyo",
        votes: 34200,
        runnerUp: "UDA",
        runnerUpVotes: 16400,
        reporting: 96,
      },
      {
        name: "Yatta",
        winner: "WIPER",
        mp: "Robert Basil",
        votes: 38400,
        runnerUp: "UDA",
        runnerUpVotes: 18200,
        reporting: 96,
      },
      {
        name: "Kangundo",
        winner: "WIPER",
        mp: "Fabian Muli",
        votes: 32100,
        runnerUp: "UDA",
        runnerUpVotes: 14800,
        reporting: 97,
      },
      {
        name: "Matungulu",
        winner: "WIPER",
        mp: "Stephen Mule",
        votes: 36800,
        runnerUp: "UDA",
        runnerUpVotes: 15400,
        reporting: 96,
      },
      {
        name: "Kathiani",
        winner: "WIPER",
        mp: "Robert Mbui",
        votes: 34900,
        runnerUp: "UDA",
        runnerUpVotes: 12100,
        reporting: 97,
      },
      {
        name: "Mavoko",
        winner: "WIPER",
        mp: "Patrick Makau",
        votes: 68400,
        runnerUp: "UDA",
        runnerUpVotes: 38200,
        reporting: 96,
      },
      {
        name: "Machakos Town",
        winner: "WIPER",
        mp: "Caleb Mule",
        votes: 54200,
        runnerUp: "UDA",
        runnerUpVotes: 24100,
        reporting: 97,
      },
      {
        name: "Mwala",
        winner: "IND",
        mp: "Vincent Musyoka",
        votes: 39800,
        runnerUp: "WIPER",
        runnerUpVotes: 34200,
        reporting: 96,
      },
    ],
  },
  {
    code: "015",
    name: "Kitui",
    region: "Eastern",
    x: 348,
    y: 448,
    path: "M 324,398 L 372,395 L 376,502 L 324,500 L 322,430 Z",
    registeredVoters: 532758,
    reportingPct: 94.9,
    presVotes: {
      UDA: 84200,
      ODM: 98400,
      JUBILEE: 9800,
      WIPER: 244800,
      DCP: 11400,
    },
    governor: [
      { name: "Julius Malombe", party: "WIPER", votes: 238400 },
      { name: "David Musila", party: "JUBILEE", votes: 124200 },
      { name: "Jonathan Mueke", party: "UDA", votes: 78400 },
    ],
    senate: [
      { name: "Enoch Wambua", party: "WIPER", votes: 248900 },
      { name: "Stephen Kilonzo", party: "UDA", votes: 142100 },
    ],
    womanRep: [
      { name: "Irene Kasalu", party: "WIPER", votes: 244200 },
      { name: "Esther Muia", party: "UDA", votes: 138400 },
    ],
    constituencies: [
      {
        name: "Mwingi North",
        winner: "WIPER",
        mp: "Paul Nzengu",
        votes: 31200,
        runnerUp: "UDA",
        runnerUpVotes: 16400,
        reporting: 94,
      },
      {
        name: "Mwingi West",
        winner: "WIPER",
        mp: "Charles Nguna",
        votes: 28400,
        runnerUp: "UDA",
        runnerUpVotes: 14200,
        reporting: 95,
      },
      {
        name: "Mwingi Central",
        winner: "WIPER",
        mp: "Gideon Mulyungi",
        votes: 34100,
        runnerUp: "UDA",
        runnerUpVotes: 15800,
        reporting: 95,
      },
      {
        name: "Kitui West",
        winner: "WIPER",
        mp: "Edith Nyenze",
        votes: 29800,
        runnerUp: "UDA",
        runnerUpVotes: 12100,
        reporting: 96,
      },
      {
        name: "Kitui Rural",
        winner: "WIPER",
        mp: "David Mboni",
        votes: 27400,
        runnerUp: "UDA",
        runnerUpVotes: 13400,
        reporting: 95,
      },
      {
        name: "Kitui Central",
        winner: "WIPER",
        mp: "Makali Mulu",
        votes: 36800,
        runnerUp: "UDA",
        runnerUpVotes: 14900,
        reporting: 96,
      },
      {
        name: "Kitui East",
        winner: "UDA",
        mp: "Nimrod Mbai",
        votes: 28900,
        runnerUp: "WIPER",
        runnerUpVotes: 24100,
        reporting: 94,
      },
      {
        name: "Kitui South",
        winner: "JUBILEE",
        mp: "Rachael Nyamai",
        votes: 34200,
        runnerUp: "WIPER",
        runnerUpVotes: 29800,
        reporting: 94,
      },
    ],
  },
  {
    code: "017",
    name: "Makueni",
    region: "Eastern",
    x: 312,
    y: 524,
    path: "M 274,486 L 324,500 L 376,502 L 368,546 L 294,584 Z",
    registeredVoters: 479401,
    reportingPct: 95.8,
    presVotes: {
      UDA: 58400,
      ODM: 88200,
      JUBILEE: 7400,
      WIPER: 254100,
      DCP: 8100,
    },
    governor: [
      { name: "Mutula Kilonzo Jr", party: "WIPER", votes: 268400 },
      { name: "Patrick Musimba", party: "IND", votes: 94200 },
    ],
    senate: [
      { name: "Dan Maanzo", party: "WIPER", votes: 254100 },
      { name: "Urbanus Muthama", party: "UDA", votes: 98400 },
    ],
    womanRep: [
      { name: "Rose Museo", party: "WIPER", votes: 258900 },
      { name: "Lilian Ndinda", party: "UDA", votes: 92100 },
    ],
    constituencies: [
      {
        name: "Mbooni",
        winner: "WIPER",
        mp: "Erastus Kivasu",
        votes: 44200,
        runnerUp: "UDA",
        runnerUpVotes: 14800,
        reporting: 96,
      },
      {
        name: "Kilome",
        winner: "WIPER",
        mp: "Thaddeus Nzambia",
        votes: 28400,
        runnerUp: "UDA",
        runnerUpVotes: 11200,
        reporting: 96,
      },
      {
        name: "Kaiti",
        winner: "WIPER",
        mp: "Joshua Kimilu",
        votes: 34100,
        runnerUp: "UDA",
        runnerUpVotes: 12400,
        reporting: 96,
      },
      {
        name: "Makueni",
        winner: "WIPER",
        mp: "Suzanne Kiamba",
        votes: 48900,
        runnerUp: "UDA",
        runnerUpVotes: 16200,
        reporting: 96,
      },
      {
        name: "Kibwezi West",
        winner: "IND",
        mp: "Mwengi Mutuse",
        votes: 38200,
        runnerUp: "WIPER",
        runnerUpVotes: 34100,
        reporting: 95,
      },
      {
        name: "Kibwezi East",
        winner: "WIPER",
        mp: "Jessica Mbalu",
        votes: 36400,
        runnerUp: "UDA",
        runnerUpVotes: 15800,
        reporting: 95,
      },
    ],
  },

  // COAST REGION
  {
    code: "004",
    name: "Tana River",
    region: "Coast",
    x: 408,
    y: 462,
    path: "M 372,395 L 418,402 L 460,394 L 460,472 L 434,522 L 376,502 Z",
    registeredVoters: 141096,
    reportingPct: 91.2,
    presVotes: {
      UDA: 44200,
      ODM: 58400,
      JUBILEE: 4100,
      WIPER: 6400,
      DCP: 2100,
    },
    governor: [
      { name: "Dhadho Godhana", party: "ODM", votes: 54200 },
      { name: "Hussein Dado", party: "UDA", votes: 48900 },
    ],
    senate: [
      { name: "Danson Mungatana", party: "UDA", votes: 52100 },
      { name: "Juma Wario", party: "ODM", votes: 49800 },
    ],
    womanRep: [
      { name: "Amina Dika", party: "ODM", votes: 53400 },
      { name: "Rehema Hassan", party: "UDA", votes: 48200 },
    ],
    constituencies: [
      {
        name: "Garsen",
        winner: "ODM",
        mp: "Ali Wario",
        votes: 21400,
        runnerUp: "UDA",
        runnerUpVotes: 18900,
        reporting: 92,
      },
      {
        name: "Galole",
        winner: "ODM",
        mp: "Said Hiribae",
        votes: 18200,
        runnerUp: "UDA",
        runnerUpVotes: 16400,
        reporting: 91,
      },
      {
        name: "Bura",
        winner: "UDA",
        mp: "Yakub Adow",
        votes: 19800,
        runnerUp: "ODM",
        runnerUpVotes: 17100,
        reporting: 90,
      },
    ],
  },
  {
    code: "005",
    name: "Lamu",
    region: "Coast",
    x: 474,
    y: 492,
    path: "M 460,472 L 500,464 L 494,504 L 468,512 L 434,522 Z",
    registeredVoters: 81453,
    reportingPct: 93.8,
    presVotes: {
      UDA: 28400,
      ODM: 31200,
      JUBILEE: 3100,
      WIPER: 2400,
      DCP: 1400,
    },
    governor: [
      { name: "Issa Timamy", party: "IND", votes: 26400 },
      { name: "Fahim Twaha", party: "JUBILEE", votes: 22100 },
      { name: "Umra Omar", party: "ODM", votes: 14800 },
    ],
    senate: [
      { name: "Joseph Githuku", party: "JUBILEE", votes: 28900 },
      { name: "Anwar Loitiptip", party: "UDA", votes: 26400 },
    ],
    womanRep: [
      { name: "Monica Muthoni", party: "UDA", votes: 29400 },
      { name: "Ruweida Obo", party: "JUBILEE", votes: 25800 },
    ],
    constituencies: [
      {
        name: "Lamu East",
        winner: "JUBILEE",
        mp: "Ruweida Obo",
        votes: 11400,
        runnerUp: "ODM",
        runnerUpVotes: 10200,
        reporting: 93,
      },
      {
        name: "Lamu West",
        winner: "UDA",
        mp: "Stanley Muthama",
        votes: 21800,
        runnerUp: "ODM",
        runnerUpVotes: 18400,
        reporting: 94,
      },
    ],
  },
  {
    code: "006",
    name: "Taita Taveta",
    region: "Coast",
    x: 334,
    y: 584,
    path: "M 294,584 L 368,546 L 368,595 L 348,622 Z",
    registeredVoters: 181827,
    reportingPct: 95.1,
    presVotes: {
      UDA: 46200,
      ODM: 78400,
      JUBILEE: 5400,
      WIPER: 14200,
      DCP: 4100,
    },
    governor: [
      { name: "Andrew Mwadime", party: "IND", votes: 68400 },
      { name: "Grantone Samboja", party: "JUBILEE", votes: 42100 },
      { name: "John Mruttu", party: "UDA", votes: 31200 },
    ],
    senate: [
      { name: "Johnes Mwaruma", party: "ODM", votes: 74200 },
      { name: "Anania Mwaboza", party: "UDA", votes: 54800 },
    ],
    womanRep: [
      { name: "Lydia Haika", party: "UDA", votes: 68900 },
      { name: "Joyce Lay", party: "ODM", votes: 64200 },
    ],
    constituencies: [
      {
        name: "Taveta",
        winner: "ODM",
        mp: "John Bwire",
        votes: 18400,
        runnerUp: "UDA",
        runnerUpVotes: 15200,
        reporting: 95,
      },
      {
        name: "Wundanyi",
        winner: "ODM",
        mp: "Danson Mwashako",
        votes: 17200,
        runnerUp: "UDA",
        runnerUpVotes: 11400,
        reporting: 96,
      },
      {
        name: "Mwatate",
        winner: "JUBILEE",
        mp: "Peter Shake",
        votes: 18900,
        runnerUp: "ODM",
        runnerUpVotes: 16800,
        reporting: 95,
      },
      {
        name: "Voi",
        winner: "WIPER",
        mp: "Abdi Chome",
        votes: 22400,
        runnerUp: "UDA",
        runnerUpVotes: 18100,
        reporting: 95,
      },
    ],
  },
  {
    code: "003",
    name: "Kilifi",
    region: "Coast",
    x: 404,
    y: 552,
    path: "M 376,502 L 434,522 L 444,536 L 416,588 L 392,595 L 368,595 L 368,546 Z",
    registeredVoters: 588602,
    reportingPct: 94.6,
    presVotes: {
      UDA: 142200,
      ODM: 274400,
      JUBILEE: 8900,
      WIPER: 12400,
      DCP: 11200,
    },
    governor: [
      { name: "Gideon Mung’aro", party: "ODM", votes: 254200 },
      { name: "Aisha Jumwa", party: "UDA", votes: 168400 },
    ],
    senate: [
      { name: "Stewart Madzayo", party: "ODM", votes: 264800 },
      { name: "Francis Baya", party: "UDA", votes: 154100 },
    ],
    womanRep: [
      { name: "Gertrude Mbeyu", party: "ODM", votes: 259400 },
      { name: "Christine Zawadi", party: "UDA", votes: 161200 },
    ],
    constituencies: [
      {
        name: "Kilifi North",
        winner: "ODM",
        mp: "Owen Baya",
        votes: 44200,
        runnerUp: "UDA",
        runnerUpVotes: 36800,
        reporting: 95,
      },
      {
        name: "Kilifi South",
        winner: "ODM",
        mp: "Ken Chonga",
        votes: 42100,
        runnerUp: "UDA",
        runnerUpVotes: 29400,
        reporting: 95,
      },
      {
        name: "Kaloleni",
        winner: "ODM",
        mp: "Paul Katana",
        votes: 34800,
        runnerUp: "UDA",
        runnerUpVotes: 21200,
        reporting: 94,
      },
      {
        name: "Rabai",
        winner: "ODM",
        mp: "Kenga Mupe",
        votes: 26400,
        runnerUp: "UDA",
        runnerUpVotes: 15800,
        reporting: 95,
      },
      {
        name: "Ganze",
        winner: "ODM",
        mp: "Kenneth Tungule",
        votes: 28900,
        runnerUp: "UDA",
        runnerUpVotes: 18400,
        reporting: 94,
      },
      {
        name: "Malindi",
        winner: "ODM",
        mp: "Amina Mnyazi",
        votes: 39400,
        runnerUp: "UDA",
        runnerUpVotes: 28100,
        reporting: 95,
      },
      {
        name: "Magarini",
        winner: "ODM",
        mp: "Harrison Kombe",
        votes: 36200,
        runnerUp: "UDA",
        runnerUpVotes: 24900,
        reporting: 94,
      },
    ],
  },
  {
    code: "001",
    name: "Mombasa",
    region: "Coast",
    x: 402,
    y: 608,
    path: "M 392,595 L 416,588 L 404,622 L 388,618 Z",
    registeredVoters: 641913,
    reportingPct: 95.8,
    presVotes: {
      UDA: 158400,
      ODM: 288200,
      JUBILEE: 9200,
      WIPER: 18400,
      DCP: 12100,
    },
    governor: [
      { name: "Abdulswamad Nassir", party: "ODM", votes: 264200 },
      { name: "Hassan Omar", party: "UDA", votes: 184100 },
    ],
    senate: [
      { name: "Mohamed Faki", party: "ODM", votes: 271400 },
      { name: "Hamisi Mwaguya", party: "UDA", votes: 174800 },
    ],
    womanRep: [
      { name: "Zamzam Mohamed", party: "ODM", votes: 268900 },
      { name: "Fatma Bakari", party: "UDA", votes: 179200 },
    ],
    constituencies: [
      {
        name: "Changamwe",
        winner: "ODM",
        mp: "Omar Mwinyi",
        votes: 38400,
        runnerUp: "UDA",
        runnerUpVotes: 24100,
        reporting: 96,
      },
      {
        name: "Jomvu",
        winner: "ODM",
        mp: "Badi Twalib",
        votes: 34200,
        runnerUp: "UDA",
        runnerUpVotes: 21800,
        reporting: 96,
      },
      {
        name: "Kisauni",
        winner: "ODM",
        mp: "Rashid Bedzimba",
        votes: 54800,
        runnerUp: "UDA",
        runnerUpVotes: 36400,
        reporting: 96,
      },
      {
        name: "Nyali",
        winner: "UDA",
        mp: "Mohamed Ali",
        votes: 48900,
        runnerUp: "ODM",
        runnerUpVotes: 42100,
        reporting: 96,
      },
      {
        name: "Likoni",
        winner: "ODM",
        mp: "Mishi Mboko",
        votes: 44100,
        runnerUp: "UDA",
        runnerUpVotes: 26800,
        reporting: 95,
      },
      {
        name: "Mvita",
        winner: "ODM",
        mp: "Mohamed Machele",
        votes: 46800,
        runnerUp: "UDA",
        runnerUpVotes: 31200,
        reporting: 96,
      },
    ],
  },
  {
    code: "002",
    name: "Kwale",
    region: "Coast",
    x: 372,
    y: 634,
    path: "M 368,595 L 392,595 L 388,618 L 404,622 L 396,626 L 372,666 L 350,656 L 348,622 Z",
    registeredVoters: 328253,
    reportingPct: 94.3,
    presVotes: {
      UDA: 84400,
      ODM: 146800,
      JUBILEE: 4200,
      WIPER: 8400,
      DCP: 5100,
    },
    governor: [
      { name: "Fatuma Achani", party: "UDA", votes: 118400 },
      { name: "Hamadi Boga", party: "ODM", votes: 108200 },
    ],
    senate: [
      { name: "Issa Boy", party: "ODM", votes: 134200 },
      { name: "Mshenga Ruga", party: "UDA", votes: 96400 },
    ],
    womanRep: [
      { name: "Fatuma Masito", party: "ODM", votes: 131800 },
      { name: "Zuleikha Hassan", party: "UDA", votes: 98900 },
    ],
    constituencies: [
      {
        name: "Msambweni",
        winner: "UDA",
        mp: "Feisal Bader",
        votes: 36400,
        runnerUp: "ODM",
        runnerUpVotes: 32100,
        reporting: 95,
      },
      {
        name: "Lunga Lunga",
        winner: "ODM",
        mp: "Chiforomodo Mangale",
        votes: 29800,
        runnerUp: "UDA",
        runnerUpVotes: 24100,
        reporting: 94,
      },
      {
        name: "Matuga",
        winner: "ODM",
        mp: "Kassim Tandaza",
        votes: 32400,
        runnerUp: "UDA",
        runnerUpVotes: 26800,
        reporting: 94,
      },
      {
        name: "Kinango",
        winner: "ODM",
        mp: "Gonzi Rai",
        votes: 38200,
        runnerUp: "UDA",
        runnerUpVotes: 28900,
        reporting: 94,
      },
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS FOR TALLY COMPUTATION
// ============================================================================
function getCountyWinnerForRace(county, race) {
  if (race === "PRESIDENTIAL") {
    const entries = Object.entries(county.presVotes).sort(
      (a, b) => b[1] - a[1],
    );
    const total = entries.reduce((acc, [, v]) => acc + v, 0);
    const [topParty, topVotes] = entries[0];
    const [secondParty, secondVotes] = entries[1];
    const marginPct = total > 0 ? ((topVotes - secondVotes) / total) * 100 : 0;
    const topCand = PRESIDENTIAL_CANDIDATES.find((c) => c.party === topParty);
    return {
      winnerParty: topParty,
      winnerName: topCand ? topCand.name : topParty,
      winnerVotes: topVotes,
      runnerUpParty: secondParty,
      runnerUpVotes: secondVotes,
      totalVotes: total,
      marginPct,
      breakdown: entries.map(([p, v]) => {
        const cand = PRESIDENTIAL_CANDIDATES.find((c) => c.party === p);
        return {
          name: cand ? cand.name : PARTIES[p]?.name || p,
          party: p,
          votes: v,
          pct: total > 0 ? (v / total) * 100 : 0,
        };
      }),
    };
  }

  if (race === "MP") {
    // Tally constituencies won inside this county
    const seatCounts = {};
    let totalVotes = 0;
    county.constituencies.forEach((c) => {
      seatCounts[c.winner] = (seatCounts[c.winner] || 0) + 1;
      totalVotes += c.votes + c.runnerUpVotes;
    });
    const sorted = Object.entries(seatCounts).sort((a, b) => b[1] - a[1]);
    const [topParty, topSeats] = sorted[0] || ["IND", 0];
    const [secondParty, secondSeats] = sorted[1] || ["IND", 0];
    const marginPct =
      county.constituencies.length > 0
        ? ((topSeats - secondSeats) / county.constituencies.length) * 100
        : 0;
    return {
      winnerParty: topParty,
      winnerName: `${topSeats} of ${county.constituencies.length} Seats`,
      winnerVotes: topSeats,
      runnerUpParty: secondParty,
      runnerUpVotes: secondSeats,
      totalVotes,
      marginPct,
      breakdown: sorted.map(([p, seats]) => ({
        name: `${PARTIES[p]?.short || p} (${seats} Constituencies)`,
        party: p,
        votes: seats,
        pct: (seats / county.constituencies.length) * 100,
      })),
    };
  }

  const list =
    race === "GOVERNOR"
      ? county.governor
      : race === "SENATE"
        ? county.senate
        : county.womanRep;

  const sorted = [...list].sort((a, b) => b.votes - a.votes);
  const total = sorted.reduce((acc, c) => acc + c.votes, 0);
  const top = sorted[0];
  const second = sorted[1] || { party: "IND", votes: 0 };
  const marginPct = total > 0 ? ((top.votes - second.votes) / total) * 100 : 0;

  return {
    winnerParty: top.party,
    winnerName: top.name,
    winnerVotes: top.votes,
    runnerUpParty: second.party,
    runnerUpVotes: second.votes,
    totalVotes: total,
    marginPct,
    breakdown: sorted.map((c) => ({
      name: c.name,
      party: c.party,
      votes: c.votes,
      pct: total > 0 ? (c.votes / total) * 100 : 0,
    })),
  };
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Core Election State
  const [counties, setCounties] = useState(INITIAL_COUNTIES);
  const [activeRace, setActiveRace] = useState("PRESIDENTIAL"); // PRESIDENTIAL | GOVERNOR | SENATE | WOMAN_REP | MP
  const [selectedCountyCode, setSelectedCountyCode] = useState("047"); // Default Nairobi
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [hoveredCounty, setHoveredCounty] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mapZoom, setMapZoom] = useState(1);
  const [svgOutlinePath, setSvgOutlinePath] = useState(KENYA_NATIONAL_OUTLINE);

  // Parse the separated SVG county definitions (<script type="image/svg+xml">) at runtime
  useEffect(() => {
    try {
      const svgSourceEl = document.getElementById("kenya-counties-svg-source");
      const svgText = svgSourceEl?.textContent || "";
      if (!svgText.includes("<svg")) return;

      const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
      const outlineEl = doc.getElementById("kenya-silhouette");
      if (outlineEl?.getAttribute("d")) {
        setSvgOutlinePath(outlineEl.getAttribute("d"));
      }

      const pathMap = {};
      doc
        .querySelectorAll('#kenya-counties path[id^="county-"]')
        .forEach((p) => {
          const code = p.id.replace("county-", "");
          pathMap[code] = {
            d: p.getAttribute("d"),
            x: Number(p.getAttribute("data-x")),
            y: Number(p.getAttribute("data-y")),
          };
        });

      if (Object.keys(pathMap).length > 0) {
        setCounties((prev) =>
          prev.map((c) =>
            pathMap[c.code]
              ? {
                  ...c,
                  path: pathMap[c.code].d || c.path,
                  x: pathMap[c.code].x || c.x,
                  y: pathMap[c.code].y || c.y,
                }
              : c,
          ),
        );
      }
    } catch {
      // Fallback to default county geometry if DOMParser is unavailable
    }
  }, []);

  // Map Visualization & Filter State
  const [mapMode, setMapMode] = useState("PARTY"); // PARTY | MARGIN | REPORTING
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("ALL");

  // Authentication & Official Form 34A/34B Tally Submission State
  const [user, setUser] = useState(null); // { name, role, badgeId, station }
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTallyDrawer, setShowTallyDrawer] = useState(false);

  // Login Form Inputs
  const [loginRole, setLoginRole] = useState("RETURNING_OFFICER");
  const [loginId, setLoginId] = useState("IEBC-RO-2027-047");
  const [loginPin, setLoginPin] = useState("2027");

  // Tally Submission Form State (Matches exact 5 Presidential Candidates)
  const [tallyCountyCode, setTallyCountyCode] = useState("047");
  const [tallyRace, setTallyRace] = useState("PRESIDENTIAL");
  const [tallyVotesInput, setTallyVotesInput] = useState({
    UDA: 15000,
    ODM: 18500,
    JUBILEE: 4200,
    WIPER: 3100,
    DCP: 6400,
  });
  const [tallySuccessMsg, setTallySuccessMsg] = useState("");

  // Live Incoming Form 34A/34B Feed
  const [liveFeed, setLiveFeed] = useState([
    {
      id: 1,
      time: "18:36 EAT",
      form: "Form 34B Verified",
      unit: "Kisumu Central, Kisumu",
      detail: "ODM leads with 62,800 votes (99.0% reporting)",
      party: "ODM",
    },
    {
      id: 2,
      time: "18:34 EAT",
      form: "Form 34B Verified",
      unit: "Kikuyu, Kiambu",
      detail: "UDA leads with 78,400 votes (98.0% reporting)",
      party: "UDA",
    },
    {
      id: 3,
      time: "18:31 EAT",
      form: "Form 34B Verified",
      unit: "Machakos Town, Machakos",
      detail: "WIPER leads with 54,200 votes (97.0% reporting)",
      party: "WIPER",
    },
    {
      id: 4,
      time: "18:28 EAT",
      form: "Form 34A Batch",
      unit: "Westlands, Nairobi",
      detail: "142/148 polling streams transmitted",
      party: "ODM",
    },
  ]);

  // Selected County Object
  const selectedCounty = useMemo(
    () => counties.find((c) => c.code === selectedCountyCode) || counties[0],
    [counties, selectedCountyCode],
  );

  // Reset constituency selection when changing county
  useEffect(() => {
    setSelectedConstituency(null);
  }, [selectedCountyCode]);

  // ============================================================================
  // NATIONAL AGGREGATES & CONSTITUTIONAL THRESHOLDS
  // ============================================================================
  const nationalStats = useMemo(() => {
    let totalRegistered = 0;
    let totalPresVotes = 0;
    const presTotals = { UDA: 0, ODM: 0, JUBILEE: 0, WIPER: 0, DCP: 0 };
    const pres25Counties = { UDA: 0, ODM: 0, JUBILEE: 0, WIPER: 0, DCP: 0 };
    const countiesWon = {
      UDA: 0,
      ODM: 0,
      JUBILEE: 0,
      WIPER: 0,
      DCP: 0,
      DAP: 0,
      IND: 0,
    };
    const mpSeats = {
      UDA: 0,
      ODM: 0,
      JUBILEE: 0,
      WIPER: 0,
      DCP: 0,
      DAP: 0,
      IND: 0,
    };
    let totalConstituencies = 0;
    let reportingSum = 0;

    counties.forEach((county) => {
      totalRegistered += county.registeredVoters;
      reportingSum += county.reportingPct;

      // Presidential vote aggregation + 25% in 24 counties rule
      const countyPresTotal = Object.values(county.presVotes).reduce(
        (a, b) => a + b,
        0,
      );
      totalPresVotes += countyPresTotal;
      Object.entries(county.presVotes).forEach(([party, v]) => {
        presTotals[party] = (presTotals[party] || 0) + v;
        if (countyPresTotal > 0 && v / countyPresTotal >= 0.25) {
          pres25Counties[party] = (pres25Counties[party] || 0) + 1;
        }
      });

      // Race-specific county/seat winners
      const outcome = getCountyWinnerForRace(county, activeRace);
      countiesWon[outcome.winnerParty] =
        (countiesWon[outcome.winnerParty] || 0) + 1;

      // MP constituencies count
      county.constituencies.forEach((con) => {
        totalConstituencies += 1;
        mpSeats[con.winner] = (mpSeats[con.winner] || 0) + 1;
      });
    });

    const avgReporting = (reportingSum / counties.length).toFixed(1);
    const totalStations = 46229;
    const reportedStations = Math.round(
      (parseFloat(avgReporting) / 100) * totalStations,
    );
    const turnoutPct = ((totalPresVotes / totalRegistered) * 100).toFixed(1);

    return {
      totalRegistered,
      totalPresVotes,
      presTotals,
      pres25Counties,
      countiesWon,
      mpSeats,
      totalConstituencies,
      avgReporting,
      reportedStations,
      totalStations,
      turnoutPct,
    };
  }, [counties, activeRace]);

  // Filtered counties for search / region highlight
  const matchingCountyCodes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return new Set(
      counties
        .filter((c) => {
          const matchesRegion =
            regionFilter === "ALL" || c.region === regionFilter;
          const matchesText =
            !q ||
            c.name.toLowerCase().includes(q) ||
            c.code.includes(q) ||
            c.constituencies.some((con) => con.name.toLowerCase().includes(q));
          return matchesRegion && matchesText;
        })
        .map((c) => c.code),
    );
  }, [counties, searchQuery, regionFilter]);

  // ============================================================================
  // HANDLERS: AUTH & LIVE FORM 34A/34B SUBMISSION
  // ============================================================================
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const roleLabels = {
      RETURNING_OFFICER: "IEBC Returning Officer",
      PARTY_AGENT: "Chief Party Tally Agent",
      MEDIA_OBSERVER: "Accredited Media Observer",
    };
    setUser({
      name:
        loginRole === "RETURNING_OFFICER"
          ? "RO. David Kiprop"
          : loginRole === "PARTY_AGENT"
            ? "Agent Grace Wanjiku"
            : "Observer Brian Omondi",
      role: roleLabels[loginRole],
      roleKey: loginRole,
      badgeId: loginId || "IEBC-2027-VERIFIED",
    });
    setShowLoginModal(false);
    setShowTallyDrawer(true);
  };

  const handleQuickDemoLogin = (roleKey) => {
    const profiles = {
      RETURNING_OFFICER: {
        name: "RO. Sarah Chebet",
        role: "IEBC Returning Officer",
        roleKey: "RETURNING_OFFICER",
        badgeId: "IEBC-RO-001",
      },
      PARTY_AGENT: {
        name: "Agent Kevin Otieno",
        role: "Chief Coalition Agent",
        roleKey: "PARTY_AGENT",
        badgeId: "AGT-2027-884",
      },
    };
    setUser(profiles[roleKey]);
    setShowLoginModal(false);
    setShowTallyDrawer(true);
  };

  const handleTallySubmit = (e) => {
    e.preventDefault();
    const targetCounty = counties.find((c) => c.code === tallyCountyCode);
    if (!targetCounty) return;

    setCounties((prev) =>
      prev.map((county) => {
        if (county.code !== tallyCountyCode) return county;

        const updatedPres = { ...county.presVotes };
        Object.entries(tallyVotesInput).forEach(([p, addVotes]) => {
          updatedPres[p] = (updatedPres[p] || 0) + Number(addVotes || 0);
        });

        // Also boost top candidates in Governor/Senate/WomanRep proportionally if selected
        const boostCandidateList = (list) =>
          list.map((cand) => ({
            ...cand,
            votes: cand.votes + Number(tallyVotesInput[cand.party] || 0),
          }));

        return {
          ...county,
          reportingPct: Math.min(
            100,
            Number((county.reportingPct + 1.4).toFixed(1)),
          ),
          presVotes:
            tallyRace === "PRESIDENTIAL" ? updatedPres : county.presVotes,
          governor:
            tallyRace === "GOVERNOR"
              ? boostCandidateList(county.governor)
              : county.governor,
          senate:
            tallyRace === "SENATE"
              ? boostCandidateList(county.senate)
              : county.senate,
          womanRep:
            tallyRace === "WOMAN_REP"
              ? boostCandidateList(county.womanRep)
              : county.womanRep,
        };
      }),
    );

    // Determine highest added party for the ticker
    const topAddedParty = Object.entries(tallyVotesInput).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes(),
    ).padStart(2, "0")} EAT`;

    setLiveFeed((prev) => [
      {
        id: Date.now(),
        time: timeStr,
        form:
          tallyRace === "PRESIDENTIAL"
            ? "Form 34B Updated"
            : `Form 35B (${tallyRace})`,
        unit: `${targetCounty.name} County`,
        detail: `Verified batch added (+${Object.values(tallyVotesInput)
          .reduce((a, b) => a + Number(b || 0), 0)
          .toLocaleString()} votes)`,
        party: topAddedParty,
      },
      ...prev.slice(0, 7),
    ]);

    setSelectedCountyCode(tallyCountyCode);
    setTallySuccessMsg(
      `Form 34B/35B tally committed for ${targetCounty.name} County!`,
    );
    setTimeout(() => setTallySuccessMsg(""), 4000);
  };

  // ============================================================================
  // MAP FILL COLOR LOGIC (AMERICAN ELECTION NIGHT STYLE)
  // ============================================================================
  const getCountyFillProps = (county) => {
    const isMatched = matchingCountyCodes.has(county.code);
    if (!isMatched) {
      return { fill: "#E2E8F0", fillOpacity: 0.35 };
    }

    if (mapMode === "REPORTING") {
      const pct = county.reportingPct;
      if (pct >= 96) return { fill: "#0F172A", fillOpacity: 0.9 };
      if (pct >= 92) return { fill: "#1E3A8A", fillOpacity: 0.78 };
      if (pct >= 88) return { fill: "#3B82F6", fillOpacity: 0.65 };
      return { fill: "#93C5FD", fillOpacity: 0.65 };
    }

    const outcome = getCountyWinnerForRace(county, activeRace);
    const partyObj = PARTIES[outcome.winnerParty] || PARTIES.IND;

    if (mapMode === "MARGIN") {
      // Darker/more saturated = landslide (>20%), lighter = competitive (<5%)
      const opacity =
        outcome.marginPct >= 25
          ? 0.95
          : outcome.marginPct >= 12
            ? 0.78
            : outcome.marginPct >= 5
              ? 0.58
              : 0.38;
      return { fill: partyObj.color, fillOpacity: opacity };
    }

    // Default: PARTY WINNER (Solid American-style broadcast shading with subtle call-status opacity)
    const callOpacity = outcome.marginPct < 4 ? 0.65 : 0.92;
    return { fill: partyObj.color, fillOpacity: callOpacity };
  };

  const selectedOutcome = useMemo(
    () => getCountyWinnerForRace(selectedCounty, activeRace),
    [selectedCounty, activeRace],
  );

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      {/* =====================================================================
          1. TOP ELECTION BROADCAST HEADER & AUTH BAR
      ===================================================================== */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand & Live Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-2.5 py-1.5 rounded-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-4" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-red-400 ml-1">
                LIVE TALLY
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight uppercase">
                  KENYA <span className="text-amber-400">DECISION</span> 2027
                </h1>
                <span className="hidden md:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  National Tallying Center • Bomas
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Independent Electoral &amp; Boundaries Commission (IEBC) Public
                Results Portal
              </p>
            </div>
          </div>

          {/* Right Auth & Agent Controls */}
          <div className="flex items-center gap-2.5">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTallyDrawer(true)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition shadow"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Submit Form 34A/34B</span>
                  <span className="sm:hidden">Tally Entry</span>
                </button>
                <div className="hidden lg:flex flex-col text-right px-2 border-l border-slate-800">
                  <span className="text-xs font-bold text-white">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-emerald-400">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setUser(null);
                    setShowTallyDrawer(false);
                  }}
                  title="Sign Out"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-lg transition shadow-md"
              >
                <LogIn className="w-4 h-4" />
                <span>Official / Agent Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Race Selector Sub-Navbar (American Election Center Tabs) */}
        <div className="bg-slate-900 border-t border-slate-800">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto no-scrollbar">
            <nav
              className="flex items-center gap-1 py-1.5"
              aria-label="Election Races"
            >
              {[
                {
                  id: "PRESIDENTIAL",
                  label: "President",
                  sub: "50%+1 & 24 Counties",
                },
                { id: "GOVERNOR", label: "Governors", sub: "47 Counties" },
                { id: "SENATE", label: "Senate", sub: "47 Counties" },
                { id: "WOMAN_REP", label: "Woman Rep", sub: "47 Counties" },
                {
                  id: "MP",
                  label: "National Assembly (MPs)",
                  sub: "290 Constituencies",
                },
              ].map((tab) => {
                const isActive = activeRace === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRace(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-left transition whitespace-nowrap flex flex-col ${
                      isActive
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-extrabold tracking-tight">
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] font-medium ${
                        isActive ? "text-slate-600" : "text-slate-400"
                      }`}
                    >
                      {tab.sub}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden xl:flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                KIEMS Transmission:{" "}
                <strong className="text-white">
                  {nationalStats.avgReporting}%
                </strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Est. Turnout:{" "}
                <strong className="text-white">
                  {nationalStats.turnoutPct}%
                </strong>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. NATIONAL SCOREBOARD BANNER (AMERICAN ELECTION BROADCAST STYLE)
      ===================================================================== */}
      <section className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
          {activeRace === "PRESIDENTIAL" ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded">
                    Presidential Race
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    Constitutional Requirement: <strong>50% + 1 Vote</strong>{" "}
                    AND <strong>&ge;25% in at least 24 Counties</strong>
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-semibold">
                  {nationalStats.reportedStations.toLocaleString()} of{" "}
                  {nationalStats.totalStations.toLocaleString()} Polling
                  Stations Reporting ({nationalStats.avgReporting}%)
                </div>
              </div>

              {/* Candidate Scorecards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-3">
                {PRESIDENTIAL_CANDIDATES.map((cand) => {
                  const votes = nationalStats.presTotals[cand.party] || 0;
                  const pct =
                    nationalStats.totalPresVotes > 0
                      ? ((votes / nationalStats.totalPresVotes) * 100).toFixed(
                          2,
                        )
                      : "0.00";
                  const counties25 =
                    nationalStats.pres25Counties[cand.party] || 0;
                  const party = PARTIES[cand.party];
                  const meetsThreshold =
                    parseFloat(pct) > 50 && counties25 >= 24;

                  return (
                    <div
                      key={cand.id}
                      className="rounded-xl border border-slate-200 p-3 bg-slate-50/70 flex flex-col justify-between relative overflow-hidden"
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1.5"
                        style={{ backgroundColor: party.color }}
                      />
                      <div className="flex items-start justify-between gap-2 pl-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className="text-[10px] font-black px-1.5 py-0.5 rounded uppercase"
                              style={{
                                backgroundColor: party.color,
                                color:
                                  cand.party === "UDA" ? "#0F172A" : "#FFFFFF",
                              }}
                            >
                              {party.short}
                            </span>
                            {meetsThreshold && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3" /> THRESHOLD
                                MET
                              </span>
                            )}
                          </div>
                          <h2 className="text-sm font-extrabold text-slate-900 mt-1 leading-tight">
                            {cand.name}
                          </h2>
                          <p className="text-[11px] text-slate-500">
                            DP: {cand.runningMate}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-black text-slate-900">
                            {pct}%
                          </div>
                          <div className="text-xs font-bold text-slate-600">
                            {votes.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 pl-2 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-medium">
                          &ge;25% Counties Rule:{" "}
                          <strong
                            className={
                              counties25 >= 24
                                ? "text-emerald-700"
                                : "text-slate-900"
                            }
                          >
                            {counties25} / 24
                          </strong>
                        </span>
                        <span className="text-slate-500">
                          Won:{" "}
                          <strong>
                            {nationalStats.countiesWon[cand.party] || 0}
                          </strong>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stacked National Vote Bar with 50%+1 Center Marker */}
              <div className="relative pt-1">
                <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                  {Object.entries(nationalStats.presTotals)
                    .sort((a, b) => b[1] - a[1])
                    .map(([partyKey, votes]) => {
                      const widthPct =
                        nationalStats.totalPresVotes > 0
                          ? (votes / nationalStats.totalPresVotes) * 100
                          : 0;
                      return (
                        <div
                          key={partyKey}
                          style={{
                            width: `${widthPct}%`,
                            backgroundColor:
                              PARTIES[partyKey]?.color || "#64748B",
                          }}
                          className="h-full transition-all duration-500 border-r border-white/30"
                          title={`${PARTIES[partyKey]?.short}: ${widthPct.toFixed(1)}%`}
                        />
                      );
                    })}
                </div>
                {/* 50% + 1 Marker */}
                <div
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                  title="50% + 1 Constitutional Majority"
                >
                  <div className="w-0.5 h-6 bg-slate-950" />
                  <span className="text-[9px] font-black uppercase tracking-wider bg-slate-950 text-white px-1.5 py-0.2 rounded">
                    50%+1 TO WIN
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* NON-PRESIDENTIAL SCOREBOARD (GOVERNORS, SENATE, WOMAN REP, MPs) */
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded">
                    {activeRace === "GOVERNOR"
                      ? "Gubernatorial Seats (47 Counties)"
                      : activeRace === "SENATE"
                        ? "Senate Seats (47 Counties)"
                        : activeRace === "WOMAN_REP"
                          ? "County Woman Representatives (47)"
                          : `National Assembly / MPs (${nationalStats.totalConstituencies} Tracked Constituencies)`}
                  </span>
                  <span className="text-xs text-slate-600">
                    {activeRace === "MP"
                      ? "Majority Threshold: 175 of 349 National Assembly Seats"
                      : "Control Threshold: 24 of 47 Counties"}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Reporting: {nationalStats.avgReporting}% of Polling Stations
                </span>
              </div>

              {/* Seat Count Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-3">
                {Object.keys(PARTIES).map((pKey) => {
                  const party = PARTIES[pKey];
                  const count =
                    activeRace === "MP"
                      ? nationalStats.mpSeats[pKey] || 0
                      : nationalStats.countiesWon[pKey] || 0;
                  return (
                    <div
                      key={pKey}
                      className="rounded-lg border border-slate-200 px-3 py-2 bg-slate-50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-sm shrink-0"
                          style={{ backgroundColor: party.color }}
                        />
                        <div>
                          <div className="text-xs font-extrabold text-slate-900">
                            {party.short}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate max-w-[90px]">
                            {party.coalition}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-black text-slate-900">
                        {count}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Seat Distribution Bar */}
              <div className="h-3.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                {Object.keys(PARTIES)
                  .sort((a, b) => {
                    const valA =
                      activeRace === "MP"
                        ? nationalStats.mpSeats[a] || 0
                        : nationalStats.countiesWon[a] || 0;
                    const valB =
                      activeRace === "MP"
                        ? nationalStats.mpSeats[b] || 0
                        : nationalStats.countiesWon[b] || 0;
                    return valB - valA;
                  })
                  .map((pKey) => {
                    const count =
                      activeRace === "MP"
                        ? nationalStats.mpSeats[pKey] || 0
                        : nationalStats.countiesWon[pKey] || 0;
                    const denom =
                      activeRace === "MP"
                        ? nationalStats.totalConstituencies
                        : counties.length;
                    const pct = denom > 0 ? (count / denom) * 100 : 0;
                    return (
                      <div
                        key={pKey}
                        style={{
                          width: `${pct}%`,
                          backgroundColor: PARTIES[pKey].color,
                        }}
                        className="h-full transition-all duration-500 border-r border-white/40"
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          3. MAIN WORKSPACE: INTERACTIVE KENYA MAP (LEFT) + INSPECTOR (RIGHT)
      ===================================================================== */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT 7 COLUMNS: INTERACTIVE KENYA ADMINISTRATIVE MAP */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Map Toolbar */}
          <div className="p-3.5 sm:p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
            {/* Search County / Constituency */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find county or constituency..."
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* Region Filter & Choropleth Mode */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none"
              >
                <option value="ALL">All 8 Regions (47 Counties)</option>
                <option value="Nairobi">Nairobi Metro</option>
                <option value="Central">Central / Mt. Kenya</option>
                <option value="Rift Valley">Rift Valley</option>
                <option value="Western">Western</option>
                <option value="Nyanza">Nyanza</option>
                <option value="Eastern">Eastern</option>
                <option value="Coast">Coast</option>
                <option value="North Eastern">North Eastern</option>
              </select>

              <div className="inline-flex rounded-lg bg-slate-200/80 p-0.5 text-xs font-bold">
                {[
                  { id: "PARTY", label: "Party Color" },
                  { id: "MARGIN", label: "Win Margin" },
                  { id: "REPORTING", label: "% Reporting" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMapMode(m.id)}
                    className={`px-2.5 py-1 rounded-md transition ${
                      mapMode === m.id
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {(searchQuery || regionFilter !== "ALL") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setRegionFilter("ALL");
                  }}
                  title="Reset Map Filters"
                  className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* SVG Map Canvas Container */}
          <div
            className="relative flex-1 bg-slate-950 flex items-center justify-center p-2 sm:p-4 min-h-[540px] select-none overflow-hidden"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
          >
            {/* Subtle Map Grid & Compass Watermark */}
            <div className="absolute top-3 left-4 z-10 text-slate-400 pointer-events-none">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Republic of Kenya • 47 Administrative Counties
              </div>
              <div className="text-xs font-extrabold text-white">
                {activeRace === "PRESIDENTIAL"
                  ? "Presidential Leading Party by County"
                  : activeRace === "GOVERNOR"
                    ? "Gubernatorial Leading Party by County"
                    : activeRace === "SENATE"
                      ? "Senatorial Leading Party by County"
                      : activeRace === "WOMAN_REP"
                        ? "Woman Representative Leading Party"
                        : "National Assembly Majority by County (Click County for MPs)"}
              </div>
            </div>

            {/* Map Zoom & Reset Controls */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl p-1 shadow-lg">
              <button
                type="button"
                onClick={() =>
                  setMapZoom((z) =>
                    Math.min(1.6, Number((z + 0.15).toFixed(2))),
                  )
                }
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-black text-sm flex items-center justify-center transition"
                title="Zoom In"
              >
                +
              </button>
              <button
                type="button"
                onClick={() =>
                  setMapZoom((z) =>
                    Math.max(0.85, Number((z - 0.15).toFixed(2))),
                  )
                }
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-black text-sm flex items-center justify-center transition"
                title="Zoom Out"
              >
                −
              </button>
              {mapZoom !== 1 && (
                <button
                  type="button"
                  onClick={() => setMapZoom(1)}
                  className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center transition"
                  title="Reset Zoom"
                >
                  1x
                </button>
              )}
            </div>

            {/* Lake Victoria & Indian Ocean Labels */}
            <svg
              viewBox="0 0 600 720"
              style={{ transform: `scale(${mapZoom})` }}
              className="w-full h-full max-h-[640px] drop-shadow-2xl transition-transform duration-200"
              role="img"
              aria-label="Interactive Election Map of Kenya"
            >
              <defs>
                <filter
                  id="selectedGlow"
                  x="-15%"
                  y="-15%"
                  width="130%"
                  height="130%"
                >
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="3.5"
                    floodColor="#FFFFFF"
                    floodOpacity="0.85"
                  />
                </filter>
                <clipPath id="kenyaMapClip">
                  <path d={svgOutlinePath} />
                </clipPath>
              </defs>

              {/* Water bodies context */}
              <path
                d="M 10,378 L 54,386 L 56,414 L 86,422 L 62,438 L 54,474 L 10,474 Z"
                fill="#0C4A6E"
                opacity="0.5"
              />
              <text
                x="22"
                y="435"
                fill="#38BDF8"
                fontSize="8"
                fontWeight="700"
                opacity="0.75"
                transform="rotate(-90 22,435)"
              >
                LAKE VICTORIA
              </text>

              <text
                x="468"
                y="605"
                fill="#38BDF8"
                fontSize="9"
                fontWeight="700"
                opacity="0.7"
                transform="rotate(-48 468,605)"
              >
                INDIAN OCEAN
              </text>

              {/* Outer National Boundary Silhouette Base */}
              <path d={svgOutlinePath} fill="#1E293B" />

              {/* Clipped County Layer so every outer coast & international border matches Kenya's true silhouette */}
              <g clipPath="url(#kenyaMapClip)">
                {/* Render All 47 Counties with Crisp High-Contrast Borders */}
                {counties
                  .filter(
                    (c) =>
                      c.code !== selectedCountyCode &&
                      c.code !== hoveredCounty?.code,
                  )
                  .map((county) => {
                    const { fill, fillOpacity } = getCountyFillProps(county);
                    return (
                      <g
                        key={county.code}
                        onClick={() => setSelectedCountyCode(county.code)}
                        onMouseEnter={() => setHoveredCounty(county)}
                        onMouseLeave={() => setHoveredCounty(null)}
                        className="cursor-pointer"
                      >
                        <path
                          d={county.path}
                          fill={fill}
                          fillOpacity={fillOpacity}
                          stroke="#F8FAFC"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <text
                          x={county.x}
                          y={county.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#FFFFFF"
                          fontSize={county.name.length > 10 ? "6.2" : "7.2"}
                          fontWeight="800"
                          className="pointer-events-none"
                          style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.9)" }}
                        >
                          {county.name.length > 11
                            ? county.code
                            : county.name.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}

                {/* Render Hovered & Selected Counties on Top so their borders never clip */}
                {counties
                  .filter(
                    (c) =>
                      c.code === selectedCountyCode ||
                      c.code === hoveredCounty?.code,
                  )
                  .map((county) => {
                    const { fill, fillOpacity } = getCountyFillProps(county);
                    const isSelected = county.code === selectedCountyCode;
                    return (
                      <g
                        key={county.code}
                        onClick={() => setSelectedCountyCode(county.code)}
                        onMouseEnter={() => setHoveredCounty(county)}
                        onMouseLeave={() => setHoveredCounty(null)}
                        className="cursor-pointer"
                        filter={isSelected ? "url(#selectedGlow)" : undefined}
                      >
                        <path
                          d={county.path}
                          fill={fill}
                          fillOpacity={fillOpacity}
                          stroke={isSelected ? "#FFFFFF" : "#FDE047"}
                          strokeWidth={isSelected ? "3.2" : "2.4"}
                          strokeLinejoin="round"
                        />
                        <text
                          x={county.x}
                          y={county.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#FFFFFF"
                          fontSize={county.name.length > 10 ? "6.5" : "7.5"}
                          fontWeight="900"
                          className="pointer-events-none"
                          style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.95)" }}
                        >
                          {county.name.length > 11
                            ? county.code
                            : county.name.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
              </g>

              {/* Crisp Outer National Border Drawn on Top */}
              <path
                d={svgOutlinePath}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinejoin="round"
                className="pointer-events-none"
              />
            </svg>

            {/* Floating Broadcast Tooltip on Hover */}
            {hoveredCounty && (
              <div
                style={{
                  left: Math.min(mousePos.x + 14, 340),
                  top: Math.max(mousePos.y - 20, 12),
                }}
                className="absolute z-30 pointer-events-none bg-slate-900/95 backdrop-blur-md text-white border border-slate-700 rounded-xl p-3 shadow-2xl w-64"
              >
                {(() => {
                  const info = getCountyWinnerForRace(
                    hoveredCounty,
                    activeRace,
                  );
                  const party = PARTIES[info.winnerParty] || PARTIES.IND;
                  return (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            County {hoveredCounty.code} • {hoveredCounty.region}
                          </span>
                          <h4 className="text-sm font-black text-white">
                            {hoveredCounty.name}
                          </h4>
                        </div>
                        <span className="text-[11px] font-bold bg-slate-800 px-2 py-0.5 rounded text-emerald-400">
                          {hoveredCounty.reportingPct}% In
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {info.breakdown.slice(0, 3).map((row, idx) => {
                          const p = PARTIES[row.party] || PARTIES.IND;
                          return (
                            <div key={idx} className="text-xs">
                              <div className="flex justify-between items-center mb-0.5">
                                <span className="font-bold truncate max-w-[145px] flex items-center gap-1.5">
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: p.color }}
                                  />
                                  {row.name}
                                </span>
                                <span className="font-mono font-bold">
                                  {row.pct.toFixed(1)}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  style={{
                                    width: `${row.pct}%`,
                                    backgroundColor: p.color,
                                  }}
                                  className="h-full"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-slate-800 flex justify-between text-[10px] text-slate-400">
                        <span>Lead: {party.short}</span>
                        <span>Margin: +{info.marginPct.toFixed(1)}%</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Map Legend Overlay (Bottom Left) */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl p-2.5 text-white">
              {mapMode === "REPORTING" ? (
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="font-bold text-slate-400">Stations In:</span>
                  <span className="flex items-center gap-1">
                    <i className="w-3 h-3 rounded-sm bg-blue-300 inline-block" />{" "}
                    &lt;88%
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />{" "}
                    88–92%
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="w-3 h-3 rounded-sm bg-blue-900 inline-block" />{" "}
                    92–96%
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="w-3 h-3 rounded-sm bg-slate-950 border border-slate-600 inline-block" />{" "}
                    &gt;96%
                  </span>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                  {Object.values(PARTIES).map((p) => (
                    <span
                      key={p.id}
                      className="flex items-center gap-1.5 font-semibold"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: p.color }}
                      />
                      {p.short}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: COUNTY & CONSTITUENCY INSPECTOR + LIVE TICKER */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Selected County / Constituency Detail Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header Banner colored by leading party */}
            <div
              className="p-4 text-white flex items-center justify-between"
              style={{
                backgroundColor:
                  PARTIES[selectedOutcome.winnerParty]?.color || "#0F172A",
                color:
                  selectedOutcome.winnerParty === "UDA" ? "#0F172A" : "#FFFFFF",
              }}
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase opacity-90">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    County {selectedCounty.code} • {selectedCounty.region}{" "}
                    Region
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight mt-0.5">
                  {selectedCounty.name} County
                </h2>
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold uppercase opacity-90">
                  {selectedCounty.reportingPct}% Reporting
                </div>
                <div className="text-xs font-semibold opacity-85">
                  Reg. Voters:{" "}
                  {selectedCounty.registeredVoters.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Candidate / Party Breakdown Table */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  {activeRace === "PRESIDENTIAL"
                    ? "Presidential Tally in County"
                    : activeRace === "GOVERNOR"
                      ? "Gubernatorial Candidates"
                      : activeRace === "SENATE"
                        ? "Senatorial Candidates"
                        : activeRace === "WOMAN_REP"
                          ? "Woman Representative Candidates"
                          : "Parliamentary Seats Won in County"}
                </h3>
                <span className="text-xs font-bold text-slate-700">
                  {activeRace === "MP"
                    ? `${selectedCounty.constituencies.length} Constituencies`
                    : `${selectedOutcome.totalVotes.toLocaleString()} Votes Cast`}
                </span>
              </div>

              <div className="space-y-3">
                {selectedOutcome.breakdown.map((item, idx) => {
                  const party = PARTIES[item.party] || PARTIES.IND;
                  const isLeader = idx === 0;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border ${
                        isLeader
                          ? "bg-slate-50 border-slate-300 shadow-xs"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0"
                            style={{
                              backgroundColor: party.color,
                              color:
                                item.party === "UDA" ? "#0F172A" : "#FFFFFF",
                            }}
                          >
                            {party.short}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-extrabold text-slate-900 truncate">
                                {item.name}
                              </span>
                              {isLeader && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500">
                              {party.name}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-base font-black text-slate-900">
                            {item.pct.toFixed(1)}%
                          </div>
                          <div className="text-xs font-semibold text-slate-600">
                            {activeRace === "MP"
                              ? `${item.votes} Seat${item.votes === 1 ? "" : "s"}`
                              : item.votes.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          style={{
                            width: `${item.pct}%`,
                            backgroundColor: party.color,
                          }}
                          className="h-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CONSTITUENCIES DRILL-DOWN SECTION (MPs & SUB-UNITS) */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    Constituencies in {selectedCounty.name} (
                    {selectedCounty.constituencies.length})
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Click constituency for MP tally
                  </span>
                </div>

                {/* Selected Constituency Detail Box */}
                {selectedConstituency && (
                  <div className="mb-3 p-3 rounded-xl bg-slate-900 text-white border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                          National Assembly Constituency
                        </span>
                        <h5 className="text-base font-black">
                          {selectedConstituency.name}
                        </h5>
                      </div>
                      <button
                        onClick={() => setSelectedConstituency(null)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-800/80 p-2 rounded-lg border-l-4 border-emerald-400">
                        <div className="text-[10px] text-slate-400">
                          Leading MP Candidate
                        </div>
                        <div className="font-bold text-white">
                          {selectedConstituency.mp}
                        </div>
                        <div className="text-[11px] font-extrabold text-emerald-400">
                          {PARTIES[selectedConstituency.winner]?.short} •{" "}
                          {selectedConstituency.votes.toLocaleString()} votes
                        </div>
                      </div>
                      <div className="bg-slate-800/80 p-2 rounded-lg border-l-4 border-slate-500">
                        <div className="text-[10px] text-slate-400">
                          Runner-Up Party
                        </div>
                        <div className="font-bold text-slate-200">
                          {PARTIES[selectedConstituency.runnerUp]?.name}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-400">
                          {selectedConstituency.runnerUpVotes.toLocaleString()}{" "}
                          votes
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grid of Constituency Pills painted by MP Winning Party */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {selectedCounty.constituencies.map((con) => {
                    const p = PARTIES[con.winner] || PARTIES.IND;
                    const isConSelected =
                      selectedConstituency?.name === con.name;
                    return (
                      <button
                        key={con.name}
                        onClick={() => setSelectedConstituency(con)}
                        className={`text-left p-2.5 rounded-lg border transition flex items-center justify-between ${
                          isConSelected
                            ? "ring-2 ring-slate-900 border-slate-900 bg-slate-50"
                            : "border-slate-200 hover:border-slate-400 bg-white"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-extrabold text-slate-900 truncate">
                            {con.name}
                          </div>
                          <div className="text-[11px] text-slate-600 truncate">
                            MP: <strong>{con.mp}</strong>
                          </div>
                        </div>
                        <span
                          className="text-[10px] font-black px-2 py-0.5 rounded shrink-0"
                          style={{
                            backgroundColor: p.color,
                            color: con.winner === "UDA" ? "#0F172A" : "#FFFFFF",
                          }}
                        >
                          {p.short}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Live IEBC Form 34A / 34B Incoming Stream */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-600 animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Live Form 34A / 34B Transmission Stream
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500">
                KIEMS REAL-TIME
              </span>
            </div>

            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {liveFeed.map((item) => {
                const party = PARTIES[item.party] || PARTIES.IND;
                return (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: party.color }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-900">
                            {item.unit}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                            {item.form}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-500 shrink-0">
                      {item.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* =====================================================================
          4. OFFICIAL / AGENT AUTHENTICATION MODAL
      ===================================================================== */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-slate-950 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Shield className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-base font-black uppercase tracking-tight">
                    IEBC &amp; Party Agent Portal
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sign in to verify &amp; transmit Form 34A/34B tallies
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Accreditation Role
                </label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-semibold border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="RETURNING_OFFICER">
                    IEBC Presiding / Returning Officer
                  </option>
                  <option value="PARTY_AGENT">
                    Chief Political Party / Coalition Agent
                  </option>
                  <option value="MEDIA_OBSERVER">
                    Accredited Election Observer / Media
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Accreditation Badge / Staff ID
                </label>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="e.g., IEBC-RO-2027-047"
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  KIEMS Security PIN
                </label>
                <input
                  type="password"
                  required
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  placeholder="••••"
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition shadow"
              >
                Authenticate &amp; Open Tally Console
              </button>

              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-semibold text-slate-500 text-center mb-2">
                  Quick Demo Access (1-Click Verification)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin("RETURNING_OFFICER")}
                    className="py-2 px-3 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition"
                  >
                    Demo Returning Officer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin("PARTY_AGENT")}
                    className="py-2 px-3 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-bold transition"
                  >
                    Demo Party Agent
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          5. LOGGED-IN OFFICIAL TALLY SUBMISSION DRAWER
      ===================================================================== */}
      {user && showTallyDrawer && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                {user.role} • {user.badgeId}
              </span>
              <h3 className="text-base font-black">
                Transmit Verified Tally Batch
              </h3>
            </div>
            <button
              onClick={() => setShowTallyDrawer(false)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={handleTallySubmit}
            className="p-5 flex-1 overflow-y-auto space-y-4"
          >
            {tallySuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{tallySuccessMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Select County (Form 34B / 35B)
              </label>
              <select
                value={tallyCountyCode}
                onChange={(e) => setTallyCountyCode(e.target.value)}
                className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl bg-slate-50"
              >
                {counties.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name} County ({c.reportingPct}% In)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Elective Seat Category
              </label>
              <select
                value={tallyRace}
                onChange={(e) => setTallyRace(e.target.value)}
                className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl bg-slate-50"
              >
                <option value="PRESIDENTIAL">Presidential (Form 34B)</option>
                <option value="GOVERNOR">County Governor (Form 35B)</option>
                <option value="SENATE">County Senate (Form 35B)</option>
                <option value="WOMAN_REP">County Woman Rep (Form 35B)</option>
              </select>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-200">
              <div className="text-xs font-bold uppercase text-slate-700">
                Add Verified Votes by Candidate / Party
              </div>
              {PRESIDENTIAL_CANDIDATES.map((cand) => {
                const pKey = cand.party;
                const party = PARTIES[pKey];
                return (
                  <div
                    key={cand.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-3 h-3 rounded-sm shrink-0"
                        style={{ backgroundColor: party.color }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold text-slate-900 truncate">
                          {cand.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {party.short} • {party.coalition}
                        </div>
                      </div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={tallyVotesInput[pKey] ?? 0}
                      onChange={(e) =>
                        setTallyVotesInput((prev) => ({
                          ...prev,
                          [pKey]: Number(e.target.value),
                        }))
                      }
                      className="w-28 px-2.5 py-1.5 text-right text-sm font-mono font-bold border border-slate-300 rounded-lg bg-white shrink-0"
                    />
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>Commit Tally &amp; Repaint Map</span>
            </button>
          </form>
        </div>
      )}

      {/* Separated SVG County Vector Source Parsed at Runtime */}
      <script type="image/svg+xml" id="kenya-counties-svg-source">
        {`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 720" width="600" height="720">
          <defs>
            <path id="kenya-silhouette" d="
              M 68,54 L 138,24 L 176,58 L 204,116 L 236,120 L 298,118 L 352,108
              L 418,96 L 472,74 L 542,60 L 556,68 L 526,116 L 502,138 L 464,142
              L 452,150 L 456,214 L 468,266 L 472,334 L 460,394
              L 500,464 L 494,504 L 468,512 L 444,536
              L 416,588 L 396,626 L 372,666 L 350,656 L 348,622 L 294,584 L 222,550
              L 156,518 L 94,490 L 54,474 L 62,438 L 86,422 L 56,414 L 54,386
              L 66,348 L 94,336 L 102,292 L 116,284 L 114,224 L 84,148 Z
            " />
          </defs>
          <g id="kenya-counties">
            <path id="county-023" data-name="Turkana" data-x="136" data-y="132" d="M 68,54 L 138,24 L 176,58 L 204,116 L 204,196 L 172,226 L 114,224 L 84,148 Z" />
            <path id="county-024" data-name="West Pokot" data-x="136" data-y="254" d="M 114,224 L 172,226 L 164,284 L 116,284 Z" />
            <path id="county-025" data-name="Samburu" data-x="218" data-y="242" d="M 204,196 L 266,204 L 270,276 L 186,282 L 164,284 L 172,226 Z" />
            <path id="county-010" data-name="Marsabit" data-x="278" data-y="158" d="M 204,116 L 236,120 L 298,118 L 352,108 L 354,190 L 266,204 L 204,196 Z" />
            <path id="county-009" data-name="Mandera" data-x="494" data-y="100" d="M 418,96 L 472,74 L 542,60 L 556,68 L 526,116 L 502,138 L 452,144 L 428,136 Z" />
            <path id="county-008" data-name="Wajir" data-x="404" data-y="184" d="M 352,108 L 418,96 L 428,136 L 452,144 L 452,150 L 456,214 L 468,266 L 366,256 L 354,190 Z" />
            <path id="county-011" data-name="Isiolo" data-x="318" data-y="246" d="M 266,204 L 354,190 L 366,256 L 362,332 L 336,302 L 278,286 L 270,276 Z" />
            <path id="county-007" data-name="Garissa" data-x="414" data-y="328" d="M 366,256 L 468,266 L 472,334 L 460,394 L 418,402 L 372,395 L 352,368 L 362,332 Z" />
            <path id="county-039" data-name="Bungoma" data-x="108" data-y="312" d="M 102,292 L 116,284 L 122,284 L 128,334 L 94,336 Z" />
            <path id="county-037" data-name="Kakamega" data-x="110" data-y="358" d="M 94,336 L 128,334 L 128,372 L 118,382 L 88,382 Z" />
            <path id="county-038" data-name="Vihiga" data-x="104" data-y="392" d="M 88,382 L 118,382 L 120,402 L 86,402 Z" />
            <path id="county-041" data-name="Siaya" data-x="68" data-y="400" d="M 54,386 L 88,382 L 86,402 L 84,422 L 56,414 Z" />
            <path id="county-042" data-name="Kisumu" data-x="106" data-y="414" d="M 86,402 L 120,402 L 124,426 L 98,426 L 84,422 Z" />
            <path id="county-043" data-name="Homa Bay" data-x="76" data-y="440" d="M 62,438 L 86,422 L 98,426 L 98,458 L 56,454 Z" />
            <path id="county-044" data-name="Migori" data-x="76" data-y="474" d="M 56,454 L 98,458 L 98,492 L 54,474 Z" />
            <path id="county-045" data-name="Kisii" data-x="114" data-y="464" d="M 98,448 L 130,448 L 130,482 L 98,492 Z" />
            <path id="county-046" data-name="Nyamira" data-x="114" data-y="437" d="M 98,426 L 124,426 L 130,434 L 130,448 L 98,448 Z" />
            <path id="county-026" data-name="Trans Nzoia" data-x="142" data-y="312" d="M 122,284 L 164,284 L 160,332 L 128,334 Z" />
            <path id="county-027" data-name="Uasin Gishu" data-x="148" data-y="352" d="M 128,334 L 160,332 L 166,332 L 166,370 L 128,372 Z" />
            <path id="county-028" data-name="Elgeyo Marakwet" data-x="176" data-y="328" d="M 164,284 L 186,282 L 184,364 L 166,370 L 166,332 L 160,332 Z" />
            <path id="county-029" data-name="Nandi" data-x="144" data-y="386" d="M 120,372 L 128,372 L 166,370 L 170,400 L 120,402 Z" />
            <path id="county-030" data-name="Baringo" data-x="204" data-y="324" d="M 186,282 L 222,282 L 220,358 L 184,364 Z" />
            <path id="county-031" data-name="Laikipia" data-x="250" data-y="318" d="M 222,282 L 270,276 L 278,286 L 278,348 L 220,358 Z" />
            <path id="county-035" data-name="Kericho" data-x="150" data-y="418" d="M 124,402 L 170,400 L 174,436 L 130,434 L 124,426 Z" />
            <path id="county-036" data-name="Bomet" data-x="152" data-y="456" d="M 130,434 L 174,436 L 174,462 L 130,482 Z" />
            <path id="county-032" data-name="Nakuru" data-x="198" data-y="404" d="M 166,370 L 184,364 L 220,358 L 224,418 L 236,446 L 236,466 L 218,468 L 174,436 L 170,400 Z" />
            <path id="county-033" data-name="Narok" data-x="158" data-y="496" d="M 94,490 L 130,482 L 174,462 L 174,436 L 218,468 L 184,540 L 156,518 Z" />
            <path id="county-034" data-name="Kajiado" data-x="244" data-y="516" d="M 218,468 L 236,466 L 268,466 L 274,486 L 294,584 L 222,550 L 184,540 Z" />
            <path id="county-012" data-name="Meru" data-x="314" data-y="336" d="M 278,286 L 336,302 L 362,332 L 352,368 L 296,368 L 278,348 Z" />
            <path id="county-013" data-name="Tharaka Nithi" data-x="324" data-y="382" d="M 296,368 L 352,368 L 372,395 L 324,398 L 296,396 Z" />
            <path id="county-014" data-name="Embu" data-x="300" data-y="414" d="M 280,396 L 296,396 L 324,398 L 322,430 L 280,426 Z" />
            <path id="county-019" data-name="Nyeri" data-x="260" data-y="370" d="M 238,348 L 278,348 L 278,368 L 274,368 L 274,392 L 246,392 L 246,358 L 238,358 Z" />
            <path id="county-020" data-name="Kirinyaga" data-x="285" data-y="382" d="M 274,368 L 278,368 L 296,368 L 296,396 L 280,396 L 274,392 Z" />
            <path id="county-021" data-name="Murang'a" data-x="262" data-y="406" d="M 246,392 L 274,392 L 280,396 L 280,426 L 272,418 L 246,418 Z" />
            <path id="county-018" data-name="Nyandarua" data-x="232" data-y="386" d="M 220,358 L 246,358 L 246,418 L 224,418 Z" />
            <path id="county-022" data-name="Kiambu" data-x="252" data-y="432" d="M 224,418 L 272,418 L 280,426 L 268,446 L 236,446 L 228,446 Z" />
            <path id="county-047" data-name="Nairobi" data-x="252" data-y="456" d="M 236,446 L 268,446 L 268,466 L 236,466 Z" />
            <path id="county-016" data-name="Machakos" data-x="296" data-y="462" d="M 268,446 L 280,426 L 322,430 L 324,500 L 274,486 L 268,466 Z" />
            <path id="county-015" data-name="Kitui" data-x="348" data-y="448" d="M 324,398 L 372,395 L 376,502 L 324,500 L 322,430 Z" />
            <path id="county-017" data-name="Makueni" data-x="312" data-y="524" d="M 274,486 L 324,500 L 376,502 L 368,546 L 294,584 Z" />
            <path id="county-004" data-name="Tana River" data-x="408" data-y="462" d="M 372,395 L 418,402 L 460,394 L 460,472 L 434,522 L 376,502 Z" />
            <path id="county-005" data-name="Lamu" data-x="474" data-y="492" d="M 460,472 L 500,464 L 494,504 L 468,512 L 434,522 Z" />
            <path id="county-006" data-name="Taita Taveta" data-x="334" data-y="584" d="M 294,584 L 368,546 L 368,595 L 348,622 Z" />
            <path id="county-003" data-name="Kilifi" data-x="404" data-y="552" d="M 376,502 L 434,522 L 444,536 L 416,588 L 392,595 L 368,595 L 368,546 Z" />
            <path id="county-001" data-name="Mombasa" data-x="402" data-y="608" d="M 392,595 L 416,588 L 404,622 L 388,618 Z" />
            <path id="county-002" data-name="Kwale" data-x="372" data-y="634" d="M 368,595 L 392,595 L 388,618 L 404,622 L 396,626 L 372,666 L 350,656 L 348,622 Z" />
          </g>
        </svg>`}
      </script>
    </div>
  );
}
