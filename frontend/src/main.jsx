import React, { useEffect, useRef, useState } from "react";
import AdminDashboard, { ADMIN_ROUTE } from "./AdminDashboard";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  FileCheck2,
  FileText,
  Flag,
  HeartHandshake,
  Mail,
  MapPin,
  Medal,
  MessageCircle,
  Send,
  Menu,
  MoveRight,
  Newspaper,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Bot,
  Trophy,
  Users,
  X,
} from "lucide-react";
import "./styles.css";

const RealisticTrophy = ({ type }) => {
  const gradients = {
    first: { g1: "#f9e97a", g2: "#d4af37", g3: "#8a6200" },
    second: { g1: "#ffffff", g2: "#b8b8b8", g3: "#555555" },
    third: { g1: "#f5c08a", g2: "#cd7f32", g3: "#6e3508" },
    special: { g1: "#82c8f9", g2: "#42a5f5", g3: "#0a3060" }
  };
  const g = gradients[type] || gradients.first;

  return (
    <svg viewBox="0 0 100 120" width="85" height="102" fill="currentColor">
      <defs>
        <linearGradient id={`trophy-grad-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={g.g3} />
          <stop offset="30%" stopColor={g.g1} />
          <stop offset="70%" stopColor={g.g2} />
          <stop offset="100%" stopColor={g.g3} />
        </linearGradient>
      </defs>
      <path d="M 20 110 L 80 110 L 75 90 L 25 90 Z" fill={`url(#trophy-grad-${type})`} />
      <path d="M 40 90 L 60 90 L 55 60 L 45 60 Z" fill={`url(#trophy-grad-${type})`} />
      <path d="M 10 20 C 10 70 40 85 50 85 C 60 85 90 70 90 20 Z" fill={`url(#trophy-grad-${type})`} />
      <path d="M 10 20 C -15 20 -15 65 25 55" fill="none" stroke={`url(#trophy-grad-${type})`} strokeWidth="8" strokeLinecap="round" />
      <path d="M 90 20 C 115 20 115 65 75 55" fill="none" stroke={`url(#trophy-grad-${type})`} strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="50" cy="20" rx="40" ry="12" fill={g.g3} />
    </svg>
  );
};

const RealisticWreath = ({ flipped }) => (
  <svg className="aw-wreath" viewBox="0 0 100 250" xmlns="http://www.w3.org/2000/svg" style={flipped ? { transform: 'scaleX(-1)' } : {}}>
    <g fill="currentColor">
      <path d="M50 240 Q40 120 50 10" stroke="currentColor" strokeWidth="6" fill="none" />
      <path d="M48 210 Q10 180 5 210 Q25 240 48 210 Z" />
      <path d="M46 170 Q0 140 -5 170 Q15 200 46 170 Z" />
      <path d="M45 130 Q-5 100 -10 130 Q10 160 45 130 Z" />
      <path d="M46 90 Q0 60 -5 90 Q15 120 46 90 Z" />
      <path d="M48 50 Q10 20 5 50 Q25 80 48 50 Z" />
      <path d="M50 10 Q25 -10 20 20 Q35 40 50 10 Z" />
    </g>
  </svg>
);

// Single official category from flyer
const categoriesData = [
  {
    id: "10k",
    name: "शौर्य 10K (Shaurya 10K)",
    tagline: "आधिकारिक 10 किमी मैराथन · Flagship Race",
    distance: "10 km",
    eligibility: "18 वर्ष और अधिक | मार्कशीट, पैन वेरिफिकेशन आवश्यक",
    price: 1100,
    originalPrice: 1100,
    earlyBird: false,
    badge: "मुख्य स्पर्धा",
    theme: "primary-maroon",
    includes: [
      "ड्राई-फिट प्रीमियम रनिंग टी-शर्ट",
      "आधिकारिक बीब (Bib) + टाइमिंग चिप",
      "आधिकारिक फिनिशर पदक (Finisher Medal)",
      "15 चेकपॉइंट्स पर हाइड्रेशन व मेडिकल सहायता",
      "रन के बाद पौष्टिक नाश्ता व रिफ्रेशमेंट्स",
      "सत्यापन व भागीदारी प्रमाणपत्र",
    ],
  },
];

// 15 Official Checkpoints from the flyer
const routeCheckpoints = [
  { id: 1, name: "ग्रेन मंडी पिपलानी", note: "आरंभ बिंदु (Start Line)", highlight: false },
  { id: 2, name: "महात्मा गांधी सर्किल", note: "चेकपॉइंट", highlight: false },
  { id: 3, name: "BHEL स्पोर्ट्स क्लब", note: "चेकपॉइंट", highlight: false },
  { id: 4, name: "अन्ना नगर सर्किल", note: "चेकपॉइंट", highlight: false },
  { id: 5, name: "ISBT सर्किल", note: "प्रमुख जंक्शन (Major Hub)", highlight: true },
  { id: 6, name: "चेतक ब्रिज", note: "चेकपॉइंट", highlight: false },
  { id: 7, name: "महाराणा प्रताप सर्किल (ज्योति)", note: "चेकपॉइंट", highlight: false },
  { id: 8, name: "अंबेडकर सर्किल", note: "चेकपॉइंट", highlight: false },
  { id: 9, name: "श्यामा प्रसाद मुखर्जी सर्किल", note: "चेकपॉइंट", highlight: false },
  { id: 10, name: "महावीर सर्किल (7 नं. स्टॉप)", note: "चेकपॉइंट", highlight: false },
  { id: 11, name: "नेताजी सुभाष चंद्र सर्किल", note: "चेकपॉइंट", highlight: false },
  { id: 12, name: "मानसरोवर हनुमान मंदिर (S. No)", note: "प्रमुख स्थल (Landmark)", highlight: true },
  { id: 13, name: "चेहर इमली सर्किल", note: "चेकपॉइंट", highlight: false },
  { id: 14, name: "शिवाजी महाराज प्रतिमा", note: "चेकपॉइंट", highlight: false },
  { id: 15, name: "शौर्य स्मारक (समापन)", note: "फिनिश लाइन (Finish Line)", highlight: false, isFinish: true },
];

// 3 Required Verification Documents from flyer
const verificationDocs = [
  {
    id: "age",
    title: "आयु प्रमाण (18+ years)",
    desc: "18 वर्ष या उससे अधिक आयु का वैध सरकारी प्रमाण (आधार कार्ड / वोटर आईडी / ड्राइविंग लाइसेंस)।",
  },
  {
    id: "marksheet",
    title: "मार्कशीट (Marksheet)",
    desc: "शैक्षणिक योग्यता एवं जन्मतिथि सत्यापन हेतु वैध 10वीं अथवा 12वीं की मार्कशीट।",
  },
  {
    id: "pan",
    title: "पैन कार्ड (PAN Card)",
    desc: "आधिकारिक पहचान एवं पंजीकरण सत्यापन हेतु वैध स्थायी खाता संख्या (PAN)।",
  },
];

// 3 Organizers from flyer
const contactOrganizers = [
  {
    name: "Satish Vishwakarma Ji",
    phone: "7691949999",
    tel: "+917691949999",
    role: "इवेंट कोऑर्डिनेटर",
  },
  {
    name: "Nishant Shukla Ji",
    phone: "7771888561",
    tel: "+917771888561",
    role: "पंजीकरण व सहायता",
  },
  {
    name: "Praveen Bhura Ji",
    phone: "8708584578",
    tel: "+918708584578",
    role: "मार्ग व स्थल व्यवस्था",
  },
  {
    name: "Avinash Anand Ji",
    phone: "7415524353",
    tel: "+917415524353",
    role: "सहयोग",
  }
];

// Event Films
const videos = [
  {
    title: "शौर्य दौड़ — राष्ट्रभक्ति और खेल भावना का उत्सव",
    meta: "आधिकारिक इवेंट फ़िल्म · 2026",
    id: "ScMzIvxBSi4",
  },
  {
    title: "हर कदम में वीरों की गाथा — भोपाल मैराथन",
    meta: "कम्युनिटी डाक्यूमेंट्री · 2026",
    id: "ysz5S6PUM-U",
  },
];

// Sponsors & Supporters
const sponsors = [
  [
    "जय बालाजी ग्रुप (Jai Balaji Group)",
    "jaibalajigroup.com",
    "https://jaibalajigroup.com/",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    "मुख्य प्रायोजक · TITLE SPONSOR",
  ],
  [
    "पंजाब एंड सिंध बैंक (Punjab & Sind Bank)",
    "punjabandsindbank.co.in",
    "https://punjabandsindbank.co.in/",
    "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
    "सह-प्रायोजक · CO-SPONSOR",
  ],
];

// Movement Partners
const movementPartners = [
  [
    "फिट इंडिया (Fit India)",
    "Movement Partner · राष्ट्रीय फिटनेस अभियान",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  ],
  [
    "युवा शक्ति (Yuva Shakti)",
    "Youth Partner · भारतीय युवाओं का संकल्प",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  ],
  [
    "राष्ट्र शक्ति (Rashtra Shakti)",
    "National Spirit · स्वाभिमान और एकता",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  ],
  [
    "भोपाल (City of Lakes)",
    "Host City · मध्य प्रदेश",
    "https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80",
  ],
];

// Indian States and Union Territories
const prizes = [
  {
    id: 1,
    rank: "1",
    title: "प्रथम पुरस्कार (1ST)",
    amount: "₹51,000",
    type: "first",
    icon: <RealisticTrophy type="first" />,
  },
  {
    id: 2,
    rank: "2",
    title: "द्वितीय पुरस्कार (2ND)",
    amount: "₹31,000",
    type: "second",
    icon: <RealisticTrophy type="second" />,
  },
  {
    id: 3,
    rank: "3",
    title: "तृतीय पुरस्कार (3RD)",
    amount: "₹11,000",
    type: "third",
    icon: <RealisticTrophy type="third" />,
  },
  {
    id: 4,
    rank: "",
    title: "सांत्वना पुरस्कार (2)",
    amount: "₹5,000",
    type: "special",
    icon: <Medal size={60} fill="#4ba6f5" color="#1673c4" strokeWidth={1.5} />,
  },
];

const indianStates = [
  "Madhya Pradesh (मध्य प्रदेश)",
  "West Bengal (पश्चिम बंगाल)",
  "Delhi NCR (दिल्ली)",
  "Maharashtra (महाराष्ट्र)",
  "Uttar Pradesh (उत्तर प्रदेश)",
  "Rajasthan (राजस्थान)",
  "Gujarat (गुजरात)",
  "Bihar (बिहार)",
  "Chhattisgarh (छत्तीसगढ़)",
  "Haryana (हरियाणा)",
  "Punjab (पंजाब)",
  "Jharkhand (झारखंड)",
  "Odisha (ओडिशा)",
  "Andhra Pradesh (आंध्र प्रदेश)",
  "Telangana (तेलंगाना)",
  "Karnataka (कर्नाटक)",
  "Tamil Nadu (तमिलनाडु)",
  "Kerala (केरल)",
  "Assam (असम)",
  "Himachal Pradesh (हिमाचल प्रदेश)",
  "Uttarakhand (उत्तराखंड)",
  "Goa (गोवा)",
  "Jammu and Kashmir (जम्मू और कश्मीर)",
  "Ladakh (लद्दाख)",
  "Chandigarh (चंडीगढ़)",
  "Puducherry (पुडुचेरी)",
  "Arunachal Pradesh (अरुणाचल प्रदेश)",
  "Manipur (मणिपुर)",
  "Meghalaya (मेघालय)",
  "Mizoram (मिज़ोरम)",
  "Nagaland (नागालैंड)",
  "Sikkim (सिक्किम)",
  "Tripura (त्रिपुरा)",
  "Other (अन्य राज्य / केंद्र शासित प्रदेश)",
];

function App() {
  const [registration, setRegistration] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith("/register")) {
        setRegistration(true);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      } else {
        setRegistration(false);
      }
    };
    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openRegistration = () => {
    window.history.pushState({}, "", "/register-10k");
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <>
      {registration ? <Registration /> : <Home onSelectCategory={openRegistration} />}
    </>
  );
}

function Home({ onSelectCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [playingVideo, setPlayingVideo] = useState(null);

  // Live Countdown logic inside Hero
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2026-09-27T05:30:00+05:30").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Tracking all integrated sections
      const sections = [
        "home",
        "about",
        "details",
        "category",
        "documents",
        "route",
        "films",
        "gallery",
        "news",
        "sponsors",
        "contact",
      ];
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec) {
          const top = sec.getBoundingClientRect().top;
          if (top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const goRegister = () => {
    onSelectCategory();
    setMenuOpen(false);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      {/* NAVBAR: Transparent in Hero section, stuck with blur animation in other sections */}
      <header className={`new-nav ${scrolled ? "scrolled" : "transparent"}`}>
        <a className="new-brand" href="/" aria-label="Home">
          <img src="/logo.png" alt="Logo" className="brand-logo-img" />
          <div className="new-brand-text">
            <b>शौर्य दौड़</b>
            <small>स्वस्थ युवा • सशक्त भारत</small>
          </div>
        </a>
        <nav className={menuOpen ? "new-nav-links open" : "new-nav-links"}>
          <button
            className={activeSection === "home" ? "active" : ""}
            onClick={() => scrollTo("home")}
          >
            होम
          </button>
          <button
            className={activeSection === "about" ? "active" : ""}
            onClick={() => scrollTo("about")}
          >
            परिचय
          </button>
          <button
            className={activeSection === "details" ? "active" : ""}
            onClick={() => scrollTo("details")}
          >
            समय-सारणी
          </button>
          <button
            className={activeSection === "category" ? "active" : ""}
            onClick={() => scrollTo("category")}
          >
            10 km श्रेणी
          </button>
          <button
            className={activeSection === "documents" ? "active" : ""}
            onClick={() => scrollTo("documents")}
          >
            दस्तावेज
          </button>
          <button
            className={activeSection === "route" ? "active" : ""}
            onClick={() => scrollTo("route")}
          >
            मार्ग विवरण
          </button>
          <button
            className={activeSection === "films" ? "active" : ""}
            onClick={() => scrollTo("films")}
          >
            फ़िल्म्स
          </button>
          <button
            className={activeSection === "gallery" ? "active" : ""}
            onClick={() => scrollTo("gallery")}
          >
            गैलरी
          </button>
          <button
            className={activeSection === "news" ? "active" : ""}
            onClick={() => scrollTo("news")}
          >
            समाचार
          </button>
          <button
            className={activeSection === "sponsors" ? "active" : ""}
            onClick={() => scrollTo("sponsors")}
          >
            सहयोगी
          </button>
          <button
            className={activeSection === "contact" ? "active" : ""}
            onClick={() => scrollTo("contact")}
          >
            संपर्क
          </button>
          <button
            type="button"
            className="new-nav-cta-mobile"
            onClick={goRegister}
          >
            आज ही पंजीकरण करें! <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </nav>
        <div className="nav-right-actions">
          <button className="new-nav-cta" onClick={goRegister}>
            आज ही पंजीकरण करें! <ArrowRight size={15} strokeWidth={2.5} />
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION: Untouched Left & Branding, Enhanced with custom athletic race clock in right column */}
        <section className="new-hero" id="home">
          <div className="new-hero-container">
            {/* Left Content Column */}
            <div className="new-hero-left">
              <div className="hero-top-sponsor-wrap">
                <span className="new-hero-subtitle">JAI BALAJI GROUP | Nasha Mukti Andolan (नशा मुक्ति आंदोलन)</span>
                <svg
                  className="tricolor-wave-accent"
                  viewBox="0 0 280 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 16C45 4 95 24 150 10C195 0 240 16 276 6"
                    stroke="#E8720C"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 19C49 7 99 27 154 13C199 3 244 19 272 9"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 22C53 10 103 30 158 16C203 6 248 22 268 12"
                    stroke="#1C7A3B"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="hero-title-container">
                <h1 className="hero-title-hindi">शौर्य दौड़</h1>
                <div className="hero-slogan-ribbon">
                  <span>स्वस्थ युवा</span>
                  <span className="ribbon-dot">•</span>
                  <span>सशक्त भारत</span>
                </div>
              </div>

              <p className="hero-dedication">देश के वीरों को समर्पित एक दौड़</p>

              {/* 4-Stat Info Card */}
              <div className="hero-info-card">
                <div className="info-col">
                  <div className="info-icon-circle">
                    <Users size={17} strokeWidth={2.5} />
                  </div>
                  <div className="info-col-details">
                    <strong className="info-title">आयु सीमा</strong>
                    <span className="info-val">18 वर्ष और अधिक</span>
                  </div>
                </div>

                <div className="info-divider"></div>

                <div className="info-col">
                  <div className="info-icon-plain">
                    <MapPin size={24} strokeWidth={2.4} color="#5c1417" />
                  </div>
                  <div className="info-col-details">
                    <strong className="info-title">दूरी</strong>
                    <span className="info-val">10 km</span>
                  </div>
                </div>

                <div className="info-divider"></div>

                <div className="info-col">
                  <div className="info-icon-circle rupee-circle">₹</div>
                  <div className="info-col-details">
                    <strong className="info-title">पंजीकरण शुल्क</strong>
                    <span className="info-val">₹ 1100/-</span>
                  </div>
                </div>

                <div className="info-divider"></div>

                <div className="info-col">
                  <div className="info-icon-plain">
                    <CalendarDays size={23} strokeWidth={2.2} color="#5c1417" />
                  </div>
                  <div className="info-col-details">
                    <strong className="info-title highlight-red">
                      आयोजन तिथि
                    </strong>
                    <span className="info-val">27 सितंबर, 2026</span>
                    <span className="info-sub">(सोमवार)</span>
                  </div>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="new-hero-actions">
                <button className="btn-hero-register" onClick={goRegister}>
                  आज ही पंजीकरण करें! <ArrowRight size={16} strokeWidth={2.5} />
                </button>
                <button
                  className="btn-hero-details"
                  onClick={() => scrollTo("about")}
                >
                  विवरण देखें <span className="play-triangle">▶</span>
                </button>
              </div>
            </div>

            {/* Right Column: Poetic quote + Custom Athletic Race Clock */}
            <div className="new-hero-right">
              <div className="hero-poetic-badge">
                <div className="poetic-lines">
                  <div>हर कदम में</div>
                  <div>वीरों की गाथा</div>
                  <div>हर धड़कन में</div>
                  <div>भारत माता</div>
                </div>
                <svg
                  className="poetic-brush-curve"
                  viewBox="0 0 160 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 11C40 4 95 15 156 7"
                    stroke="#E8720C"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* CUSTOM ATHLETIC HERO RACE CLOCK (Properly integrated, different style) */}
              <div className="hero-race-clock-card">
                <div className="clock-card-header">
                  <div className="clock-live-indicator">
                    <span className="clock-live-dot" />
                    <span className="clock-live-title">
                      फ्लैग-ऑफ काउंटडाउन · RACE CLOCK
                    </span>
                  </div>
                  <span className="clock-event-date">
                    27 सितंबर 2026 · भोपाल
                  </span>
                </div>

                <div className="clock-tiles-grid">
                  <div className="clock-tile">
                    <div className="clock-tile-box">
                      <span className="clock-tile-number">{timeLeft.days}</span>
                    </div>
                    <span className="clock-tile-label">दिन (Days)</span>
                  </div>
                  <div className="clock-tile-sep">:</div>
                  <div className="clock-tile">
                    <div className="clock-tile-box">
                      <span className="clock-tile-number">
                        {timeLeft.hours}
                      </span>
                    </div>
                    <span className="clock-tile-label">घंटे (Hrs)</span>
                  </div>
                  <div className="clock-tile-sep">:</div>
                  <div className="clock-tile">
                    <div className="clock-tile-box">
                      <span className="clock-tile-number">
                        {timeLeft.minutes}
                      </span>
                    </div>
                    <span className="clock-tile-label">मिनट (Min)</span>
                  </div>
                  <div className="clock-tile-sep">:</div>
                  <div className="clock-tile">
                    <div className="clock-tile-box">
                      <span className="clock-tile-number">
                        {timeLeft.seconds}
                      </span>
                    </div>
                    <span className="clock-tile-label">सेकंड (Sec)</span>
                  </div>
                </div>

                <div className="clock-card-footer">
                  <div className="clock-route-pill">
                    <MapPin size={13} color="#E8720C" />
                    <span>ग्रेन मंडी पिपलानी ➔ शौर्य स्मारक (10 km)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Bottom Ticker Strip */}
          <div className="hero-bottom-floating-bar">
            <div className="bottom-bar-features">
              <div className="bottom-feature-item">
                <svg
                  className="feature-svg-icon"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                  <path d="m7 21 3-5-2-4 4-2 3 3 4-2" />
                  <path d="m10 12 2 3 4 1" />
                </svg>
                <span className="feature-text">फिट इंडिया</span>
              </div>
              <span className="bar-pipe">|</span>
              <div className="bottom-feature-item">
                <Users
                  size={20}
                  strokeWidth={2.4}
                  className="feature-svg-icon"
                />
                <span className="feature-text">युवा शक्ति</span>
              </div>
              <span className="bar-pipe">|</span>
              <div className="bottom-feature-item">
                <Flag
                  size={20}
                  strokeWidth={2.4}
                  className="feature-svg-icon"
                />
                <span className="feature-text">राष्ट्र शक्ति</span>
              </div>
            </div>

            <div className="bottom-bar-pipe-mid"></div>

            <div className="bottom-bar-motto">
              <div>आइए, इतिहास से प्रेरणा लेकर</div>
              <div>एक स्वस्थ और सशक्त भारत का निर्माण करें !</div>
            </div>
          </div>
        </section>

        {/* TRICOLOR THREAD DIVIDER */}
        <div className="tricolor-thread"></div>

        {/* SECTION 1: ABOUT & EVENT OVERVIEW */}
        <section className="about-editorial-wrap" id="about">
          <div className="about-editorial-container">
            {/* Left Narrative */}
            <div className="about-editorial-left">
              <h2 className="about-main-heading">
                दौड़ सिर्फ कदमों की नहीं, <br />
                <span className="heading-accent">देशभक्ति की है</span>
              </h2>

              <div className="editorial-lead-quote">
                “देश के वीरों को समर्पित एक दौड़ — भोपाल के शौर्य स्मारक की ओर
                10 किलोमीटर का गौरवमयी सफर।”
              </div>

              <p className="editorial-body-para">
                शौर्य दौड़ देश के अमर वीरों को नमन करते हुए युवाओं को स्वास्थ्य,
                संकल्प और राष्ट्रभक्ति के सूत्र में पिरोने का एक ऐतिहासिक आयोजन
                है। ग्रेन मंडी पिपलानी से आरंभ होकर शौर्य स्मारक तक की यह 11
                किलोमीटर की यात्रा फिट इंडिया अभियान को नई ऊर्जा प्रदान करती है।
              </p>

              {/* 4 Pillars Grid matching flyer badging */}
              <div className="about-facts-docket">
                <div className="fact-item">
                  <div className="fact-badge">18+</div>
                  <div className="fact-meta">
                    <b>आयु सीमा</b>
                    <span>18 वर्ष और अधिक</span>
                  </div>
                </div>
                <div className="fact-separator" />
                <div className="fact-item">
                  <div className="fact-badge">10 km</div>
                  <div className="fact-meta">
                    <b>दूरी</b>
                    <span>एकल मुख्य स्पर्धा</span>
                  </div>
                </div>
                <div className="fact-separator" />
                <div className="fact-item">
                  <div className="fact-badge">₹ 1100</div>
                  <div className="fact-meta">
                    <b>पंजीकरण शुल्क</b>
                    <span>आधिकारिक स्लॉट</span>
                  </div>
                </div>
                <div className="fact-separator" />
                <div className="fact-item">
                  <div className="fact-badge">27 SEP</div>
                  <div className="fact-meta">
                    <b>आयोजन तिथि</b>
                    <span>27 सितंबर, 2026 (सोमवार)</span>
                  </div>
                </div>
              </div>

              <div className="about-editorial-actions">
                <button onClick={goRegister} className="btn-brand-primary">
                  आज ही पंजीकरण करें! <ArrowRight size={16} strokeWidth={2.4} />
                </button>
                <button
                  onClick={() => scrollTo("route")}
                  className="btn-brand-outline"
                >
                  15 चेकपॉइंट्स मार्ग देखें ↓
                </button>
              </div>
            </div>

            {/* Right Card: Authentic flyer quote and visual badge */}
            <div className="about-editorial-right">
              <div className="editorial-media-frame">
                <img
                  src="/event-banner.png"
                  alt="शौर्य दौड़"
                  className="editorial-image"
                />
                <div className="media-overlay-gradient"></div>

                <div className="media-stamp-badge">
                  <span className="stamp-city">भोपाल (BHOPAL)</span>
                  <span className="stamp-venue">शौर्य स्मारक समापन</span>
                </div>

                <div className="media-bottom-caption">
                  <span className="caption-tag">RUN · REMEMBER · RESPECT</span>
                  <strong className="caption-title">
                    हर कदम में वीरों की गाथा, हर धड़कन में भारत माता
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: EVENT DETAILS & SCHEDULE (Restored with Human-Crafted Editorial UI) */}


        <section className="awards-section" id="awards">
          <div className="wrap">
            <div className="aw-head">
              <div className="aw-eyebrow">
                <span>विजेताओं के लिए</span>
                <span className="aw-eyebrow-en">(FOR WINNERS)</span>
              </div>
              <h2 className="aw-h">पुरस्कार राशि</h2>
              <h3 className="aw-sub">Award Money</h3>
            </div>

            <div className="aw-feature">
              <div className="medal">
                <span className="rank-num">1</span>
                <span className="rank-txt">प्रथम</span>
              </div>
              <div className="medal-ribbon"></div>
              <div className="aw-feature-label">
                <div className="aw-feature-title">प्रथम पुरस्कार (1ST)</div>
                <div className="aw-feature-amount">₹51,000</div>
                <div className="aw-winner-badge">★ &nbsp; WINNER &nbsp; ★</div>
              </div>
            </div>

            <div className="rack">
              <div className="rack-item silver">
                <div className="medal-sm">
                  <span className="rank-num">2</span>
                  <span className="rank-txt">द्वितीय</span>
                </div>
                <div className="rack-title">द्वितीय पुरस्कार (2ND)</div>
                <div className="rack-amount">₹31,000</div>
              </div>
              <div className="rack-item bronze">
                <div className="medal-sm">
                  <span className="rank-num">3</span>
                  <span className="rank-txt">तृतीय</span>
                </div>
                <div className="rack-title">तृतीय पुरस्कार (3RD)</div>
                <div className="rack-amount">₹11,000</div>
              </div>
              <div className="rack-item consol">
                <div className="medal-sm">
                  <span className="rank-num">4</span>
                  <span className="rank-txt">सांत्वना</span>
                </div>
                <div className="rack-title">सांत्वना पुरस्कार (2)</div>
                <div className="rack-amount">₹5,000</div>
              </div>
            </div>

            <p className="aw-footline">हर कदम में वीरों की गाथा &nbsp;•&nbsp; हर धड़कन में भारत माता</p>
          </div>
        </section>


        <section className="details-docket-section" id="details">
          <div className="details-docket-inner">
            <div className="docket-header">
              {/* <span className="docket-subtag">
                <Clock3 size={16} /> दौड़ दिवस समय-सारणी व व्यवस्थाएं
              </span> */}
              <h2 className="docket-heading">
                दौड़ने आइए।{" "}
                <span className="highlight-maroon">बाकी हम संभाल लेंगे।</span>
              </h2>
              <p className="docket-lead">
                एक सुरक्षित, आधिकारिक और प्रेरणादायी 10 किमी मैराथन अनुभव के लिए
                सभी व्यवस्थाएं सुनिश्चित की गई हैं।
              </p>
            </div>

            <div className="docket-content-layout">
              {/* Left: Essential Runner Checklist Docket */}
              <div className="docket-checklist-column">
                <div className="docket-card-title">
                  {/* <Sparkles size={18} color="#E8720C" /> */}
                  <span>इवेंट मुख्य प्रावधान व सुविधाएँ</span>
                </div>

                <div className="docket-list">
                  <div className="docket-row">
                    <div className="docket-number-badge">01</div>
                    <div className="docket-row-text">
                      <h4>आधिकारिक फिनिशर पदक</h4>
                      <p>
                        शौर्य स्मारक समापन पर प्रत्येक प्रतिभागी के लिए शौर्य
                        गाथा से प्रेरित पदक।
                      </p>
                    </div>
                  </div>

                  <div className="docket-row">
                    <div className="docket-number-badge">02</div>
                    <div className="docket-row-text">
                      <h4>15 चेकपॉइंट्स पर सहायता</h4>
                      <p>
                        प्रत्येक चेकपॉइंट पर पर्याप्त पेयजल, एनर्जी ड्रिंक्स, और
                        प्राथमिक चिकित्सा उपलब्ध।
                      </p>
                    </div>
                  </div>

                  <div className="docket-row">
                    <div className="docket-number-badge">03</div>
                    <div className="docket-row-text">
                      <h4>एक सार्थक राष्ट्रभक्ति संकल्प</h4>
                      <p>
                        स्वस्थ युवा, सशक्त भारत — देश के अमर शहीदों के प्रति
                        सम्मान और स्वाभिमान।
                      </p>
                    </div>
                  </div>

                  <div className="docket-row">
                    <div className="docket-number-badge">04</div>
                    <div className="docket-row-text">
                      <h4>सत्यापित एवं सुरक्षित मार्ग</h4>
                      <p>
                        भोपाल ट्रैफिक पुलिस व प्रशासन के सहयोग से पूर्णतः
                        सुव्यवस्थित दौड़ मार्ग।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Event Schedule & Date Anchor */}
              <div className="docket-schedule-column">
                <div className="schedule-panel">
                  <div className="schedule-badge-head">
                    <CalendarDays size={18} />
                    <span>इवेंट दिवस समय-सारणी (27 सितंबर 2026)</span>
                  </div>

                  <div className="schedule-timeline">
                    <div className="timeline-step">
                      <span className="step-time">05:00 AM</span>
                      <div className="step-body">
                        <strong>एकत्रण व रिपोर्टिंग</strong>
                        <small>
                          ग्रेन मंडी पिपलानी · बीब चेकिंग व वार्म-अप
                        </small>
                      </div>
                    </div>
                    <div className="timeline-step active-step">
                      <span className="step-time">05:30 AM</span>
                      <div className="step-body">
                        <strong>आधिकारिक फ्लैग-ऑफ</strong>
                        <small>10 किमी मुख्य दौड़ का भव्य शुभारंभ</small>
                      </div>
                    </div>
                    <div className="timeline-step">
                      <span className="step-time">07:30 AM</span>
                      <div className="step-body">
                        <strong>शौर्य स्मारक समापन व जलपान</strong>
                        <small>फिनिशर लाउंज · नाश्ता व रिफ्रेशमेंट्स</small>
                      </div>
                    </div>
                    <div className="timeline-step">
                      <span className="step-time">08:30 AM</span>
                      <div className="step-body">
                        <strong>सम्मान व पदक वितरण समारोह</strong>
                        <small>वीरों को नमन व धावकों का सम्मान</small>
                      </div>
                    </div>
                  </div>

                  <div className="schedule-footer-bar">
                    <div className="footer-bar-date">
                      <span className="date-num">27</span>
                      <div className="date-month">
                        <b>सितंबर, 2026</b>
                        <small>सोमवार · सुबह 05:30 बजे</small>
                      </div>
                    </div>
                    <div className="footer-bar-location">
                      <MapPin size={17} color="#E8720C" />
                      <span>ग्रेन मंडी पिपलानी से शौर्य स्मारक</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: RACE CATEGORY (10 km as per flyer) */}
        {/* SECTION 3: RACE CATEGORY (10 km) — matching documents header style */}
        <section className="categories-modern-section" id="category">
          <style>{`
    .categories-modern-section {
      background: #f6f3ef;
      padding: 3rem 1.5rem;
      font-family: 'Inter', system-ui, sans-serif;
      color: #1e1e2a;
    }
    .categories-container { max-width: 1280px; margin: 0 auto; }

    /* ===== HEADER (same as documents-docket) ===== */
    .cat-section-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }
    .cat-headline {
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.02em;
      color: #0f0f15;
      margin-bottom: 0.8rem;
    }
    .highlight-maroon { color: #9b2c2c; }
    .cat-lead-sub {
      font-size: 1rem;
      color: #4a4a5a;
      max-width: 640px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* ===== REST OF THE SECTION ===== */
    .editorial-race-split {
      display: grid; grid-template-columns: 1.1fr 0.9fr;
      gap: 2rem; align-items: stretch;
    }
    .editorial-race-card {
      background: #fff; border-radius: 24px;
      box-shadow: 0 25px 40px -20px rgba(0,0,0,0.25), 0 0 0 1px rgba(28,122,59,0.08);
      padding: 1.6rem; position: relative;
      display: flex; flex-direction: column;
    }
    .editorial-race-card::after {
      content: ""; position: absolute; top: 1.2rem; bottom: 1.2rem; left: 0;
      width: 5px; background: #1C7A3B; border-radius: 0 8px 8px 0;
    }
    .editorial-card-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;
    }
    .editorial-card-header h3 {
      font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; color: #0b0b12;
    }
    .editorial-card-header h3 small {
      display: block; font-size: 0.85rem; font-weight: 500;
      color: #1C7A3B; margin-top: 0.2rem;
    }
    .editorial-distance-chip {
      background: #1C7A3B; color: #fff; padding: 0.4rem 1.1rem;
      border-radius: 40px; font-weight: 700; font-size: 1.1rem;
      box-shadow: 0 8px 14px -6px rgba(28,122,59,0.4); white-space: nowrap;
    }
    .editorial-meta-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem 1.2rem;
      background: #f9fbf9; border-radius: 16px; padding: 1rem 1.2rem;
      margin: 1.2rem 0; border: 1px solid #e2ede4;
    }
    .editorial-meta-item { display: flex; align-items: flex-start; gap: 0.7rem; }
    .editorial-meta-item i {
      font-size: 1.2rem; color: #1C7A3B; width: 1.5rem;
      text-align: center; margin-top: 0.1rem;
    }
    .meta-label {
      display: block; font-size: 0.7rem; text-transform: uppercase;
      letter-spacing: 0.06em; font-weight: 600; color: #6d6d7e;
    }
    .meta-value { font-weight: 700; font-size: 0.95rem; color: #111; }
    .meta-value small { font-weight: 400; font-size: 0.8rem; color: #3f3f4e; }
    .editorial-price-big {
      grid-column: span 2; background: #fff; border-radius: 12px;
      padding: 0.6rem 1rem; display: flex; align-items: center;
      justify-content: space-between; border: 1.5px dashed #1C7A3B;
    }
    .price-label {
      font-size: 0.8rem; text-transform: uppercase;
      font-weight: 600; color: #2f2f3a;
    }
    .price-amount {
      font-size: 1.7rem; font-weight: 800; color: #1C7A3B;
      letter-spacing: -0.02em; line-height: 1;
    }
    .price-amount small {
      font-size: 0.9rem; font-weight: 500; color: #4d4d60; margin-left: 0.2rem;
    }
    .editorial-inclusion-list {
      margin: 1.2rem 0; display: grid;
      grid-template-columns: 1fr 1fr; gap: 0.6rem 1rem;
    }
    .inc-check-item {
      display: flex; align-items: center; gap: 0.5rem;
      font-size: 0.85rem; font-weight: 500; color: #23232e;
    }
    .inc-check-item i {
      color: #1C7A3B; font-size: 0.75rem; background: #e2f0e5;
      border-radius: 50%; width: 1.2rem; height: 1.2rem;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .editorial-verification-note {
      background: #fef8e7; border-left: 5px solid #d4a11e;
      padding: 0.7rem 1rem; border-radius: 10px;
      display: flex; align-items: center; gap: 0.8rem;
      font-size: 0.85rem; font-weight: 500; color: #3d3d2b;
      margin-bottom: 1rem;
    }
    .editorial-verification-note i { color: #d4a11e; font-size: 1.1rem; }
    .editorial-cta-register {
      width: 100%; background: #1C7A3B; border: none; color: #fff;
      font-weight: 700; font-size: 1rem; padding: 0.9rem 1.5rem;
      border-radius: 60px; display: flex; align-items: center;
      justify-content: center; gap: 0.6rem; cursor: pointer;
      transition: all 0.2s; box-shadow: 0 15px 25px -10px rgba(28,122,59,0.5);
      margin-top: auto;
    }
    .editorial-cta-register:hover { background: #14612e; transform: scale(1.01); }
    .editorial-visual-panel {
      display: flex; flex-direction: column; gap: 1.2rem;
    }
    .editorial-image-frame {
      border-radius: 24px; overflow: hidden; position: relative;
      box-shadow: 0 30px 40px -20px rgba(0,0,0,0.4);
      flex: 1;
    }
    .editorial-image-frame img {
      width: 100%; height: 100%; min-height: 200px;
      object-fit: cover; display: block; transition: transform 0.4s;
    }
    .editorial-image-frame:hover img { transform: scale(1.02); }
    .editorial-image-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%);
      display: flex; flex-direction: column; justify-content: flex-end;
      padding: 1.4rem; color: #fff;
    }
    .editorial-city-date {
      font-size: 0.85rem; letter-spacing: 0.1em; font-weight: 500;
      text-transform: uppercase; margin-bottom: 0.2rem;
    }
    .editorial-image-overlay h3 {
      font-size: 1.6rem; font-weight: 700; letter-spacing: -0.02em;
    }
    .editorial-highlight-strip {
      background: #fff; border-radius: 20px; padding: 1.2rem 1.4rem;
      box-shadow: 0 8px 24px -12px rgba(0,0,0,0.2);
      border: 1px solid #ececec;
      display: flex; flex-direction: column; gap: 0.7rem;
    }
    .editorial-strip-item {
      display: flex; align-items: center; gap: 0.8rem;
      font-weight: 500; font-size: 0.9rem; color: #17171f;
    }
    .editorial-strip-item i {
      width: 1.6rem; font-size: 1.15rem; color: #1C7A3B;
    }
    .editorial-badge {
      background: #1C7A3B; color: #fff; font-size: 0.65rem;
      font-weight: 700; padding: 0.15rem 0.7rem;
      border-radius: 30px; margin-left: 0.4rem;
    }
    .editorial-footnote {
      font-size: 0.75rem; color: #7a7a8a; text-align: right;
    }

    @media (max-width: 900px) {
      .editorial-race-split { grid-template-columns: 1fr; gap: 1.5rem; }
      .editorial-inclusion-list { grid-template-columns: 1fr; }
      .editorial-meta-grid { grid-template-columns: 1fr; }
      .editorial-price-big { grid-column: span 1; }
    }
    @media (max-width: 480px) {
      .editorial-race-card { padding: 1.2rem; }
      .editorial-card-header h3 { font-size: 1.3rem; }
      .editorial-distance-chip { font-size: 0.9rem; padding: 0.35rem 0.9rem; }
      .price-amount { font-size: 1.5rem; }
      .cat-lead-sub { font-size: 0.9rem; }
    }
  `}</style>

          <div className="categories-container">
            {/* ===== HEADER (same style as documents section) ===== */}
            <div className="cat-section-header">
              <div className="cat-tag-ribbon">
                रेस की कैटेगिरी (Categories)
              </div>
              <h2 className="cat-headline">
                10 km —{" "}
                <span className="highlight-maroon">18 वर्ष और अधिक</span>
              </h2>
              <p className="cat-lead-sub">
                मार्कशीट, पैन वेरिफिकेशन आवश्यक · आधिकारिक रूप से प्रमाणित 11
                किमी दौड़
              </p>
            </div>

            {/* ===== Split layout ===== */}
            <div className="editorial-race-split">
              {/* LEFT: Detail card */}
              <div className="editorial-race-card">
                <div className="editorial-card-header">
                  <h3>
                    शौर्य 10K मैराथन
                    <small>फ्लैगशिप दौड़ · भोपाल</small>
                  </h3>
                  <div className="editorial-distance-chip">10 km</div>
                </div>

                <div className="editorial-meta-grid">
                  <div className="editorial-meta-item">
                    <i>📅</i>
                    <div>
                      <span className="meta-label">आयु सीमा</span>
                      <span className="meta-value">
                        18+ <small>वर्ष</small>
                      </span>
                    </div>
                  </div>
                  <div className="editorial-meta-item">
                    <i>✅</i>
                    <div>
                      <span className="meta-label">वेरिफिकेशन</span>
                      <span className="meta-value">
                        मार्कशीट <small>+ पैन</small>
                      </span>
                    </div>
                  </div>
                  <div className="editorial-price-big">
                    <span className="price-label">🏷️ पंजीकरण शुल्क</span>
                    <span className="price-amount">
                      ₹1100 <small>/–</small>
                    </span>
                  </div>
                </div>

                <div className="editorial-inclusion-list">
                  <div className="inc-check-item">
                    <i>✓</i> ड्राई-फिट प्रीमियम टी-शर्ट
                  </div>
                  <div className="inc-check-item">
                    <i>✓</i> आधिकारिक बीब + टाइमिंग चिप
                  </div>
                  <div className="inc-check-item">
                    <i>✓</i> फिनिशर मेडल (शौर्य स्मारक)
                  </div>
                  <div className="inc-check-item">
                    <i>✓</i> 15 हाइड्रेशन + मेडिकल पॉइंट्स
                  </div>
                  <div className="inc-check-item">
                    <i>✓</i> पौष्टिक नाश्ता & रिफ्रेशमेंट
                  </div>
                  <div className="inc-check-item">
                    <i>✓</i> डिजिटल प्रमाणपत्र + सत्यापन
                  </div>
                </div>

                <div className="editorial-verification-note">
                  <i>🛡️</i>
                  <span>
                    दौड़ दिवस से पूर्व मार्कशीट और पैन कार्ड का सत्यापन अनिवार्य
                    है।
                  </span>
                </div>

                <button className="editorial-cta-register" onClick={goRegister}>
                  <span>आज ही पंजीकरण करें</span>
                  <i>→</i>
                </button>
              </div>

              {/* RIGHT: Image + highlights */}
              <div className="editorial-visual-panel">
                <div className="editorial-image-frame">
                  <img
                    src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80"
                    alt="10 km Race"
                  />
                  <div className="editorial-image-overlay">
                    <div className="editorial-city-date">
                      📍 भोपाल · 27 SEP 2026
                    </div>
                    <h3>शौर्य 10K</h3>
                  </div>
                </div>

                <div className="editorial-highlight-strip">
                  <div className="editorial-strip-item">
                    <i>📡</i> आधिकारिक टाइम्ड चिप
                  </div>
                  <div className="editorial-strip-item">
                    <i>🏅</i> फिनिशर पदक
                  </div>
                  <div className="editorial-strip-item">
                    <i>👕</i> ड्राई-फिट टी-शर्ट
                    <span className="editorial-badge">प्रीमियम</span>
                  </div>
                </div>
                {/* <div className="editorial-footnote">
                  * सभी समावेशन शुल्क में शामिल
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: REQUIRED DOCUMENTS DOCKET */}
        <section className="documents-docket-section" id="documents">
          <div className="documents-inner">
            <div className="documents-header">
              {/* <div className="docs-badge">
                <FileCheck2 size={16} /> आधिकारिक सत्यापन डेस्क · OFFICIAL VERIFICATION
              </div> */}
              <h2 className="docs-title">
                सत्यापन हेतु{" "}
                <span className="highlight-maroon">अनिवार्य दस्तावेज</span>
              </h2>
              <p className="docs-sub">
                दौड़ की पारदर्शिता, निष्पक्षता और आधिकारिक नियमों के तहत
                प्रत्येक प्रतिभागी के लिए निम्नलिखित 3 दस्तावेजों का सत्यापन
                अनिवार्य है:
              </p>
            </div>

            {/* Official Verification Kit Showcase Banner */}
            <div className="docs-kit-showcase">
              <div className="docs-kit-img-wrap">
                <img
                  src="/documents-verification.jpg"
                  alt="सत्यापन हेतु अनिवार्य दस्तावेज किट"
                  className="docs-kit-photo"
                />
                <div className="docs-kit-seal">
                  <ShieldCheck size={18} />
                  {/* <span>100% आधिकारिक सत्यापन प्रणाली</span> */}
                </div>
              </div>
              <div className="docs-kit-details">
                <div className="docs-kit-tag">
                  फ्लाईयर दिशानिर्देश · MANDATORY DOCUMENTS
                </div>
                <h3 className="docs-kit-heading">
                  बीब किट संकलन व सत्यापन प्रोटोकॉल
                </h3>
                <p className="docs-kit-desc">
                  मैराथन एक्सपो में आधिकारिक बीब किट प्राप्त करते समय
                  प्रतिभागियों को अपने मूल दस्तावेज या स्व-प्रमाणित प्रतिलिपि
                  प्रस्तुत करना अनिवार्य होगा।
                </p>
                <div className="docs-kit-pills">
                  <div className="kit-pill-item">
                    <Check size={15} />
                    <span>आयु प्रमाण (18+ वर्ष)</span>
                  </div>
                  <div className="kit-pill-item">
                    <Check size={15} />
                    <span>10वीं / 12वीं मार्कशीट</span>
                  </div>
                  <div className="kit-pill-item">
                    <Check size={15} />
                    <span>वैध पैन कार्ड</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="documents-grid">
              {verificationDocs.map((doc, idx) => (
                <div key={doc.id} className="doc-item-card">
                  <div className="doc-card-top-bar">
                    <span className="doc-num-tag">दस्तावेज #0{idx + 1}</span>
                    {/* <span className="doc-status-pill">अनिवार्य · Mandatory</span> */}
                  </div>
                  <div className="doc-check-circle">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <div className="doc-info-content">
                    <h3 className="doc-name">{doc.title}</h3>
                    <p className="doc-explanation">{doc.desc}</p>
                    <div className="doc-verify-rule">
                      <FileText size={13} />
                      <span>सत्यापन: मूल प्रति अथवा स्व-प्रमाणित कॉपी</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="docs-guideline-box">
              <div className="guideline-badge">महत्वपूर्ण सूचना</div>
              <p>
                पंजीकरण फॉर्म भरते समय मार्कशीट का रोल नंबर एवं वैध पैन कार्ड
                नंबर दर्ज करें। इवेंट एक्सपो के दौरान बीब किट प्राप्त करते समय
                मूल दस्तावेज या स्व-प्रमाणित प्रतिलिपि दिखाना अनिवार्य होगा।
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: 15 ROUTE CHECKPOINTS */}
        <section className="route-section-refined" id="route">
          <div className="route-header-wrap">
            {/* <div className="route-sub-tag">
              <Compass size={16} /> कार्यक्रम स्थल एवं मार्ग विवरण
            </div> */}
            <h2 className="route-title">
              10 किमी का संपूर्ण मार्ग —{" "}
              <span className="highlight-maroon">15 ऐतिहासिक चेकपॉइंट्स</span>
            </h2>
            <p className="route-subtext">
              ग्रेन मंडी पिपलानी से आरंभ होकर भोपाल के हृदय स्थल से गुजरते हुए
              शौर्य स्मारक तक की संपूर्ण यात्रा।
            </p>
          </div>

          {/* Visual Route Landmarks Anchor Cards */}
          <div className="route-visual-anchors-grid">
            <div className="route-anchor-card">
              <div className="anchor-img-wrap">
                <img
                  src="/start-line.jpg"
                  alt="ग्रेन मंडी पिपलानी"
                  className="anchor-photo"
                />
                <div className="anchor-gradient-scrim" />
                <span className="anchor-tag start">
                  प्रारंभ स्थल · START LINE
                </span>
              </div>
              <div className="anchor-content">
                <div className="anchor-step-num">01</div>
                <div>
                  <h4>ग्रेन मंडी पिपलानी, भोपाल</h4>
                  <p>सुबह 05:30 बजे फ्लैग-ऑफ · बीब चेकिंग व एकत्रण स्थल</p>
                </div>
              </div>
            </div>

            <div className="route-anchor-card">
              <div className="anchor-img-wrap">
                <img
                  src="/event-banner.png"
                  alt="शौर्य स्मारक"
                  className="anchor-photo"
                />
                <div className="anchor-gradient-scrim" />
                <span className="anchor-tag finish">
                  समापन स्थल · FINISH LINE
                </span>
              </div>
              <div className="anchor-content">
                <div className="anchor-step-num finish">15</div>
                <div>
                  <h4>शौर्य स्मारक (Shaurya Smarak)</h4>
                  <p>10 किमी फिनिश लाइन · मेडल वितरण व सम्मान समारोह</p>
                </div>
              </div>
            </div>
          </div>

          <div className="checkpoints-official-grid">
            {routeCheckpoints.map((cp) => (
              <div
                key={cp.id}
                className={`checkpoint-node-card ${cp.highlight ? "highlight-amber" : ""} ${cp.isFinish ? "finish-node" : ""}`}
              >
                <div className="cp-index-badge">
                  {String(cp.id).padStart(2, "0")}
                </div>
                <div className="cp-details-block">
                  <h4 className="cp-location-name">{cp.name}</h4>
                  <span className="cp-badge-note">{cp.note}</span>
                </div>
                {cp.isFinish && (
                  <div className="finish-medal-chip">
                    <Medal size={16} /> समापन
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="route-metrics-bar">
            <div className="metric-cell">
              <b>10.0 km</b>
              <span>कुल दूरी</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-cell">
              <b>15</b>
              <span>आधिकारिक चेकपॉइंट्स</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-cell">
              <b>शौर्य स्मारक</b>
              <span>समापन स्थल (भोपाल)</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-cell">
              <b>100%</b>
              <span>सुरक्षित व मेडिकल सहायता युक्त</span>
            </div>
          </div>
        </section>

        {/* SECTION 6: FILMS (Restored with Upgraded Human-Designed Cinema Layout) */}
        <section className="films-cinema-section" id="films">
          <div className="films-header">
            <div className="films-tag">
              <Play size={14} fill="#E8720C" color="#E8720C" /> शौर्य दौड़
              वृत्तचित्र व फ़िल्म्स
            </div>
            <h2 className="films-title">
              देखिए क्या होता है{" "}
              <span className="accent-saffron">जब एक शहर साथ दौड़ता है।</span>
            </h2>
            <p className="films-desc">
              पहले कदम से पहले एक एहसास होता है — एक शहर की जागती धड़कन, भीड़ की
              एक साझा लय, और हर कहानी का इंतज़ार करती शौर्य स्मारक की फिनिश
              लाइन।
            </p>
          </div>

          <div className="films-cinema-grid">
            {videos.map((vid) => (
              <div className="cinema-card" key={vid.id}>
                <div
                  className="cinema-viewport"
                  onClick={() =>
                    setPlayingVideo(playingVideo === vid.id ? null : vid.id)
                  }
                >
                  {playingVideo === vid.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&rel=0`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ width: "100%", height: "100%", border: 0 }}
                    />
                  ) : (
                    <div className="cinema-poster-wrap">
                      <img
                        src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                        alt={vid.title}
                        className="cinema-poster-img"
                      />
                      <div className="cinema-play-btn" aria-label="Play video">
                        <svg
                          width="24"
                          height="28"
                          viewBox="0 0 20 24"
                          fill="currentColor"
                        >
                          <path d="M2 2L18 12L2 22V2Z" />
                        </svg>
                      </div>
                      <span className="cinema-badge-stamp">{vid.meta}</span>
                    </div>
                  )}
                </div>

                <div
                  className="cinema-meta-strip"
                  onClick={() =>
                    setPlayingVideo(playingVideo === vid.id ? null : vid.id)
                  }
                >
                  <div>
                    <span className="cinema-meta-tag">{vid.meta}</span>
                    <h3 className="cinema-meta-title">{vid.title}</h3>
                  </div>
                  <div className="cinema-link-arrow">
                    <ArrowUpRight size={18} strokeWidth={2.4} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: GALLERY (Restored with Human-Designed Photo Showcase) */}
        <section className="gallery-section-editorial" id="gallery">
          <div className="gallery-container">
            <div className="gallery-heading-wrap">
              <span className="gallery-eyebrow">इवेंट झलकियाँ · GALLERY</span>
              <h2 className="gallery-title">
                सड़क, संकल्प और{" "}
                <span className="highlight-maroon">गौरव के जीवंत पल</span>
              </h2>
              <p className="gallery-subtitle">
                शौर्य दौड़ के प्रामाणिक दृश्य — अदम्य उत्साह, फिटनेस और भारतीय
                खेल भावना का साक्षात अनुभव।
              </p>
            </div>

            <div className="gallery-masonry-layout">
              <div className="gallery-item item-large">
                <img
                  src="/event-banner.png"
                  alt="मैराथन शुरुआत"
                  className="gallery-img"
                />
                <div className="gallery-caption-overlay">
                  <span className="gallery-chip">
                    ग्रेन मंडी से शौर्य स्मारक
                  </span>
                  <h4>हजारों कदमों की साझा गूंज</h4>
                </div>
              </div>

              <div className="gallery-item item-tall">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80"
                  alt="धावक अभ्यास"
                  className="gallery-img"
                />
                <div className="gallery-caption-overlay">
                  <span className="gallery-chip">फिटनेस व लगन</span>
                  <h4>तैयारी शुरुआती रेखा की</h4>
                </div>
              </div>

              <div className="gallery-item">
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
                  alt="फिट इंडिया मूवमेंट"
                  className="gallery-img"
                />
                <div className="gallery-caption-overlay">
                  <span className="gallery-chip">फिट इंडिया</span>
                  <h4>स्वस्थ युवा, सशक्त भारत</h4>
                </div>
              </div>

              <div className="gallery-item item-wide">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                  alt="सामुदायिक भागीदारी"
                  className="gallery-img"
                />
                <div className="gallery-caption-overlay">
                  <span className="gallery-chip">राष्ट्र शक्ति</span>
                  <h4>एकजुट होकर दौड़ता समाज</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: NEWS & BULLETINS (Restored with Human-Designed Press Desk) */}
        <section className="news-bulletin-section" id="news">
          <div className="news-container">
            <div className="news-header">
              <span className="news-eyebrow">
                ताज़ा समाचार व घोषणाएं
              </span>
              <h2 className="news-title">
                शौर्य दौड़{" "}
                <span className="highlight-maroon">
                  अपडेट्स व प्रेस विज्ञप्ति
                </span>
              </h2>
            </div>

            <div className="news-layout-grid">
              {/* Featured Main Story */}
              <div className="news-featured-card">
                <span className="news-badge-live">नवीनतम सूचना</span>
                <span className="news-date">27 सितंबर, 2026 (सोमवार)</span>
                <h3 className="news-featured-headline">
                  शौर्य दौड़ 2026: 10 किमी मुख्य स्पर्धा के लिए आधिकारिक पंजीकरण
                  आरंभ
                </h3>
                <p className="news-featured-excerpt">
                  फिट इंडिया अभियान के तहत देश के वीरों को समर्पित 10 किमी
                  मैराथन का आयोजन भोपाल में किया जा रहा है। ग्रेन मंडी पिपलानी
                  से शौर्य स्मारक तक 15 प्रमुख चेकपॉइंट्स पर विशेष व्यवस्थाएं की
                  गई हैं।
                </p>
                <button className="news-read-cta" onClick={goRegister}>
                  पंजीकरण विवरण देखें <ArrowRight size={15} />
                </button>
              </div>

              {/* Secondary Bulletins */}
              <div className="news-side-bulletins">
                <div className="bulletin-row">
                  <span className="bulletin-date">अपडेट #01 · वेरिफिकेशन</span>
                  <h4>मार्कशीट व पैन कार्ड सत्यापन प्रक्रिया</h4>
                  <p>
                    पंजीकरण के समय सही दस्तावेज विवरण दर्ज करें। बीब संकलन
                    एक्सपो के दौरान सत्यापन अनिवार्य होगा।
                  </p>
                </div>

                <div className="bulletin-row">
                  <span className="bulletin-date">
                    अपडेट #02 · मार्ग सुरक्षा
                  </span>
                  <h4>15 चेकपॉइंट्स पर हाइड्रेशन व मेडिकल दल की तैनाती</h4>
                  <p>
                    ISBT सर्किल, मानसरोवर हनुमान मंदिर सहित सभी प्रमुख स्थानों
                    पर एम्बुलेंस व प्राथमिक उपचार केंद्र सक्रिय रहेंगे।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>{/* INDIAN POLITICAL BANNER SECTION - CHIEF GUEST & ORGANISERS */}
        <section className="political-banner-section" style={{
          padding: "2rem 2%",
          background: "linear-gradient(to bottom, #ff9933 0%, #ffffff 50%, #138808 100%)",
          position: "relative",
          overflow: "hidden",
          borderTop: "6px solid #ffd700",
          borderBottom: "6px solid #ffd700",
          boxShadow: "inset 0 0 50px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh" // Try to fit within a single view
        }}>
          {/* Subtle pattern / texture overlay */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>

          <div className="banner-container" style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,240,220,0.95))",
            border: "4px solid #d4af37", // Gold border
            borderRadius: "12px",
            padding: "1.5rem 2rem",
            position: "relative",
            boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            {/* Top Decorative Elements */}
            <div style={{ position: "absolute", top: "-15px", left: "50%", transform: "translateX(-50%)", background: "#d4af37", color: "#fff", padding: "3px 20px", borderRadius: "50px", fontWeight: "bold", fontSize: "1rem", letterSpacing: "1px", boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}>
              || जय हिन्द ||
            </div>

            <div style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#d32f2f", textShadow: "1px 1px 3px rgba(0,0,0,0.2)", margin: "0 0 0.2rem", letterSpacing: "1px" }}>
                शौर्य दौड़ 2026
              </h2>
              <h3 style={{ fontSize: "1.2rem", color: "#f57c00", fontWeight: 700, margin: "0", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}>
                भव्य मैराथन में आपका हार्दिक स्वागत है
              </h3>
            </div>

            {/* Chief Guest */}
            <div className="chief-guest-highlight" style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "0.5rem",
              marginBottom: "1.5rem"
            }}>
              {/* Sun burst behind leader */}
              <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,255,255,0) 70%)", zIndex: 0 }}></div>

              <div style={{ position: "relative", zIndex: 1, padding: "6px", background: "#fff", borderRadius: "50%", border: "3px solid #f57c00", display: "inline-block", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Shivraj_Singh_Chouhan_2025.jpg" alt="Chief Guest" style={{ width: "160px", height: "160px", objectFit: "cover", borderRadius: "50%", border: "2px solid #d4af37" }} />
              </div>
              <div style={{ position: "relative", zIndex: 2, marginTop: "-15px", background: "#d32f2f", color: "#fff", padding: "6px 20px", borderRadius: "25px", border: "2px solid #ffd700", boxShadow: "0 5px 15px rgba(0,0,0,0.3)", display: "inline-block" }}>
                <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "2px" }}>मुख्य अतिथि</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: "2px" }}>माननीय शिवराज सिंह चौहान</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>केंद्रीय कृषि मंत्री, भारत सरकार</div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: "90%", height: "2px", background: "linear-gradient(to right, transparent, #d4af37, transparent)", margin: "0 auto 1rem" }}></div>

            {/* Organisers (Nivedak) */}
            <div className="nivedak-section" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", width: "100%", padding: "0 10px" }}>

              {/* Left Side Info / Quotes */}
              <div style={{ textAlign: "left", marginBottom: "0.5rem" }}>
                <h4 style={{ color: "#d32f2f", fontSize: "1.2rem", fontWeight: 800, borderBottom: "2px solid #f57c00", display: "inline-block", paddingBottom: "2px", margin: "0 0 5px" }}>आयोजन स्थल</h4>
                <p style={{ fontSize: "1rem", fontWeight: 600, color: "#333", margin: "0 0 5px" }}>ग्रेन मंडी पिपलानी से शौर्य स्मारक<br />भोपाल, मध्य प्रदेश</p>
                <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#138808", margin: "0" }}>27 सितंबर 2026</p>
              </div>

              {/* Right Side Organisers Photos */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(255,255,255,0.8)", padding: "10px", borderRadius: "10px", border: "2px solid #ffd700", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", marginBottom: "0.5rem" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#d32f2f", marginBottom: "8px" }}>निवेदक / आयोजक</div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: "70px", height: "70px", borderRadius: "8px", overflow: "hidden", border: "2px solid #f57c00", boxShadow: "0 3px 8px rgba(0,0,0,0.2)" }}>
                      <img src="/organizer1.jpeg" alt="Organiser 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: "0.75rem", color: "#333", marginTop: "3px" }}>Nishant Shukla</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: "70px", height: "70px", borderRadius: "8px", overflow: "hidden", border: "2px solid #138808", boxShadow: "0 3px 8px rgba(0,0,0,0.2)", position: "relative", background: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img src="/organiser2.webp" alt="Organiser 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: "0.75rem", color: "#333", marginTop: "3px" }}>Praveen Bhura</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        {/* SECTION 9: SPONSORS & MOVEMENT PARTNERS (Restored with High-End Wall) */}
        <section className="sponsors-refined-section" id="sponsors">
          <div className="sponsors-inner-wrap">
            <div className="sponsors-headline-block">
              <span className="sponsors-eyebrow">सहयोग व सहभागिता</span>
              <h2 className="sponsors-heading">
                मजबूत तब होते हैं{" "}
                <span className="highlight-maroon">
                  जब हम साथ खड़े होते हैं।
                </span>
              </h2>
              <p className="sponsors-sub">
                यह दौड़ उन संस्थाओं के सहयोग से संभव हुई है जो मानते हैं कि एक
                स्वस्थ और सशक्त भारत की शुरुआत सक्रिय और एकजुट समाज से होती है।
              </p>
            </div>

            {/* Title Sponsor Card */}
            <div className="title-partner-panel">
              <div className="title-partner-label">
                मुख्य प्रायोजक · TITLE SPONSOR
              </div>
              <div className="title-partner-card">
                <div className="title-sponsor-media">
                  <img
                    src={sponsors[0][3]}
                    alt={sponsors[0][0]}
                    className="title-sponsor-img"
                  />
                  <span className="title-sponsor-tag">JAI BALAJI GROUP</span>
                </div>
                <div className="title-partner-brand">
                  <h3>{sponsors[0][0]}</h3>
                  <small>
                    LEADING THE INDUSTRIAL VISION · राष्ट्र निर्माण में समर्पित
                  </small>
                  <p className="title-partner-desc">
                    शौर्य दौड़ 2026 के मुख्य संरक्षक के रूप में, जय बालाजी ग्रुप
                    भारतीय युवाओं के स्वास्थ्य, संकल्प और खेल प्रतिभा को सशक्त
                    बनाने के लिए प्रतिबद्ध है।
                  </p>
                  <a
                    href={sponsors[0][2]}
                    target="_blank"
                    rel="noreferrer"
                    className="partner-external-link"
                  >
                    आधिकारिक वेबसाइट देखें <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>

            {/* Associate Sponsors */}
            <div className="partner-group-title">
              सहयोगी प्रायोजक · ASSOCIATE SPONSORS
            </div>
            <div className="sponsors-logo-wall">
              {sponsors.slice(1).map(([name, site, href, image, tag]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="sponsor-logo-box"
                  title={`${name} · ${site}`}
                >
                  <div className="sponsor-logo-frame">
                    <img
                      src={image}
                      alt={name}
                      className="sponsor-logo-photo"
                    />
                  </div>
                  <div className="sponsor-logo-label">
                    <span className="sponsor-org-name">{name}</span>
                    <small className="sponsor-org-site">{tag || site}</small>
                  </div>
                </a>
              ))}
            </div>

            {/* Movement Partners */}
            <div className="partner-group-title">
              सामुदायिक व अभियान भागीदार · MOVEMENT PARTNERS
            </div>
            <div className="partners-logo-grid">
              {movementPartners.map(([name, role, image]) => (
                <div key={name} className="partner-logo-box">
                  <div className="partner-logo-frame">
                    <img
                      src={image}
                      alt={name}
                      className="partner-logo-photo"
                    />
                  </div>
                  <div className="partner-meta-box">
                    <span className="partner-title-text">{name}</span>
                    <small className="partner-subtitle-text">{role}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: CONTACT INFORMATION (संपर्क जानकारी) */}
        <section className="contact-helpdesk-section" id="contact">
          <div className="contact-container">
            <div className="contact-header">
              <span className="contact-eyebrow">
                संपर्क जानकारी (Contact Info)
              </span>
              <h2 className="contact-title">
                आयोजन समिति —{" "}
                <span className="highlight-maroon">हेल्पलाइन व मार्गदर्शन</span>
              </h2>
              <p className="contact-lead">
                शौर्य दौड़ 2026 के पंजीकरण, मार्ग विवरण अथवा किसी भी प्रकार की
                सहायता के लिए हमारे अधिकृत प्रतिनिधियों से सीधे संपर्क करें:
              </p>
            </div>

            <div className="contact-organizers-grid">
              {contactOrganizers.map((org) => (
                <div key={org.phone} className="organizer-contact-card">
                  <div className="org-phone-circle"><Phone size={22} /></div>
                  <div className="org-info-col">
                    <span className="org-role-label">{org.role}</span>
                    <h3 className="org-person-name">{org.name}</h3>
                    <a href={`tel:${org.tel}`} className="org-phone-dial">
                      {org.phone}
                    </a>
                  </div>
                  <div className="org-action-buttons">
                    <a href={`tel:${org.tel}`} className="org-btn-call">
                      कॉल करें
                    </a>
                    <a
                      href={`https://wa.me/91${org.phone}?text=Namaste,%20I%20want%20information%20regarding%20Shaurya%20Daur%202026`}
                      target="_blank"
                      rel="noreferrer"
                      className="org-btn-whatsapp"
                    >
                      व्हाट्सएप
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: MOVEMENT & NATIONAL PRIDE PILLARS (RUN · REMEMBER · RESPECT WITH RICH IMAGERY) */}
        <section className="movement-pillars-section">
          <div className="movement-inner">
            <div className="movement-header-block">
              <span className="movement-eyebrow">
                फिट इंडिया · युवा शक्ति · राष्ट्र शक्ति
              </span>
              <h2 className="movement-main-title">
                RUN · REMEMBER ·{" "}
                <span className="highlight-maroon">RESPECT</span>
              </h2>
              <p className="movement-sub-lead">
                यह सिर्फ एक दौड़ नहीं, बल्कि भारतीय युवाओं के अदम्य साहस, वीरों
                के प्रति कृतज्ञता और एक सशक्त भारत के निर्माण का पावन संकल्प है।
              </p>
            </div>

            <div className="movement-cards-showcase">
              {/* Card 1: RUN */}
              <div className="movement-image-card">
                <div className="m-card-image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80"
                    alt="RUN - फिट इंडिया"
                    className="m-card-bg-img"
                  />
                  <div className="m-card-scrim-gradient" />
                  <div className="m-pill-tag tag-run">
                    <span>RUN</span>
                  </div>
                </div>
                <div className="m-card-content">
                  <span className="m-hindi-badge">फिट इंडिया अभियान</span>
                  <h3 className="m-card-heading">
                    दौड़िए अपने स्वास्थ्य और संकल्प के लिए
                  </h3>
                  <p className="m-card-text">
                    हर एक कदम आपके अनुशासन, आत्मबल और शारीरिक ऊर्जा का प्रमाण
                    है। 10 किलोमीटर की यह यात्रा स्वस्थ जीवनशैली की राष्ट्रीय
                    प्रेरणा है।
                  </p>
                </div>
              </div>

              {/* Card 2: REMEMBER */}
              <div className="movement-image-card">
                <div className="m-card-image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&q=80"
                    alt="REMEMBER - युवा शक्ति"
                    className="m-card-bg-img"
                  />
                  <div className="m-card-scrim-gradient" />
                  <div className="m-pill-tag tag-remember">
                    <span>REMEMBER</span>
                  </div>
                </div>
                <div className="m-card-content">
                  <span className="m-hindi-badge">अमर वीर व युवा शक्ति</span>
                  <h3 className="m-card-heading">
                    याद रखिए उन वीरों को, जिन्होंने सब न्योछावर किया
                  </h3>
                  <p className="m-card-text">
                    शहीद-ए-आज़म भगत सिंह से लेकर शौर्य स्मारक तक, अमर शहीदों का
                    बलिदान हमारी प्रेरणा है। हर कदम में वीरों की गाथा गूंजती है।
                  </p>
                </div>
              </div>

              {/* Card 3: RESPECT */}
              <div className="movement-image-card">
                <div className="m-card-image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                    alt="RESPECT - राष्ट्र शक्ति"
                    className="m-card-bg-img"
                  />
                  <div className="m-card-scrim-gradient" />
                  <div className="m-pill-tag tag-respect">
                    <span>RESPECT</span>
                  </div>
                </div>
                <div className="m-card-content">
                  <span className="m-hindi-badge">
                    राष्ट्र शक्ति व स्वाभिमान
                  </span>
                  <h3 className="m-card-heading">
                    सम्मान कीजिए तिरंगे का, एक सशक्त भारत के साथ
                  </h3>
                  <p className="m-card-text">
                    एकजुट समाज और राष्ट्रभक्ति से ओतप्रोत नागरिक ही देश की
                    वास्तविक शक्ति हैं। आइए, इतिहास से प्रेरणा लेकर सशक्त भारत
                    का निर्माण करें।
                  </p>
                </div>
              </div>
            </div>

            <div className="movement-motto-banner">
              “आइए, इतिहास से प्रेरणा लेकर एक स्वस्थ और सशक्त भारत का निर्माण
              करें !”
            </div>
          </div>
        </section>

        {/* SECTION 12: FINAL CALL TO ACTION (आज ही पंजीकरण करें!) */}
        <section className="final-cta-section" id="register-cta">
          <div className="cta-container">
            <div className="cta-ambient-glow" aria-hidden="true" />
            <div className="cta-content">
              <div className="cta-badge">
                {/* <Sparkles size={15} /> */}
                <span>27 सितंबर 2026 (सोमवार) · भोपाल</span>
              </div>

              <h2 className="cta-headline">
                दौड़ सिर्फ कदमों की नहीं, <br />
                <span className="accent">देशभक्ति की है।</span>
              </h2>

              <p className="cta-subheading-hi">
                हर कदम में वीरों की गाथा, हर धड़कन में भारत माता
              </p>

              <p className="cta-description">
                10 किलोमीटर की यह दौड़ आपके संकल्प, फिटनेस और राष्ट्र के प्रति
                सम्मान का प्रतीक है। आज ही पंजीकरण करें और इस अविस्मरणीय गौरव
                यात्रा का हिस्सा बनें।
              </p>

              <div className="cta-actions">
                <button className="cta-primary-btn" onClick={goRegister}>
                  <span>आज ही पंजीकरण करें! (REGISTER NOW)</span>
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>

              <div className="cta-perks-strip">
                <div className="cta-perk-item">
                  <Check size={15} className="perk-icon" />
                  <span>दूरी: 10 km</span>
                </div>
                <div className="cta-perk-dot" />
                <div className="cta-perk-item">
                  <Check size={15} className="perk-icon" />
                  <span>शुल्क: ₹ 1100/-</span>
                </div>
                <div className="cta-perk-dot" />
                <div className="cta-perk-item">
                  <Check size={15} className="perk-icon" />
                  <span>आयु सीमा: 18+ वर्ष</span>
                </div>
                <div className="cta-perk-dot" />
                <div className="cta-perk-item">
                  <Check size={15} className="perk-icon" />
                  <span>मार्कशीट व पैन आवश्यक</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" id="footer">
        <div className="tricolor-thread" />
        <div className="footer-inner">
          <div className="footer-brand-col">
            <div className="footer-logo-wrap">
              <img
                src="/logo.png"
                alt="शौर्य दौड़"
                className="footer-logo"
              />
              <div className="footer-brand-text">
                <span className="brand-title">शौर्य दौड़</span>
                <span className="brand-sub">RUN. REMEMBER. RESPECT.</span>
              </div>
            </div>
            <p className="footer-bio">
              देश के वीरों को समर्पित एक ऐतिहासिक 10 किमी दौड़। ग्रेन मंडी
              पिपलानी से शौर्य स्मारक, भोपाल तक — स्वस्थ युवा, सशक्त भारत।
            </p>
            <div className="footer-badge-flag">
              <span>🇮🇳 भारतीय स्वाभिमान की दौड़</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">इवेंट विवरण (EVENT INFO)</h4>
            <ul className="footer-info-list">
              <li>
                <CalendarDays size={16} />
                <div>
                  <strong>27 सितंबर, 2026</strong>
                  <span>सोमवार · सुबह 05:30 बजे</span>
                </div>
              </li>
              <li>
                <MapPin size={16} />
                <div>
                  <strong>ग्रेन मंडी पिपलानी से शौर्य स्मारक</strong>
                  <span>भोपाल, मध्य प्रदेश, भारत</span>
                </div>
              </li>
              <li>
                <Medal size={16} />
                <div>
                  <strong>10 km आधिकारिक दौड़</strong>
                  <span>18 वर्ष और अधिक · शुल्क ₹ 1100/-</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-links-col">
            <h4 className="footer-col-title">त्वरित लिंक्स (QUICK LINKS)</h4>
            <div className="footer-nav-grid">
              <div className="footer-nav-group">
                <span className="footer-group-heading">इवेंट व दौड़ मार्ग</span>
                <ul className="footer-nav-list">
                  <li>
                    <button onClick={() => scrollTo("home")}>
                      मुख्य पृष्ठ (Home)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo("about")}>
                      परिचय (About)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo("details")}>
                      समय-सारणी (Schedule)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo("category")}>
                      10 km श्रेणी (Category)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo("documents")}>
                      आवश्यक दस्तावेज (Docs)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo("route")}>
                      15 चेकपॉइंट्स (Route)
                    </button>
                  </li>
                </ul>
              </div>
              <div className="footer-nav-group">
                <span className="footer-group-heading">मीडिया व संपर्क</span>
                <ul className="footer-nav-list">
                  <li>
                    <button onClick={() => scrollTo("films")}>
                      इवेंट फ़िल्म्स (Films)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo("gallery")}>
                      गैलरी (Gallery)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo("news")}>
                      समाचार (News)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo("sponsors")}>
                      सहयोगी व प्रायोजक
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo("contact")}>
                      संपर्क जानकारी (Contact)
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">हेल्पलाइन व संपर्क</h4>
            <p className="footer-contact-note" style={{ marginBottom: "5px" }}>
              <a href="mailto:Shauryadaud@gmail.com" style={{ color: "#fff", textDecoration: "none" }}>📧 Shauryadaud@gmail.com</a>
            </p>
            <p className="footer-contact-note">
              इवेंट समन्वयकों से सीधे बात करें:
            </p>
            <div className="footer-phones">
              <a href="tel:+917691949999" className="footer-phone-link">
                <Phone size={14} /> Satish Vishwakarma Ji: 7691949999
              </a>
              <a href="tel:+917771888561" className="footer-phone-link">
                <Phone size={14} /> Nishant Shukla Ji: 7771888561
              </a>
              <a href="tel:+918708584578" className="footer-phone-link">
                <Phone size={14} /> Praveen Bhura Ji: 8708584578
              </a>
              <a href="tel:+917415524353" className="footer-phone-link">
                <Phone size={14} /> Avinash Anand Ji: 7415524353
              </a>
            </div>
            <button className="footer-reg-btn" onClick={goRegister}>
              आज ही पंजीकरण करें! <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2026 <b>शौर्य दौड़ (Shaurya Daur)</b>. स्वस्थ युवा • सशक्त भारत.
            सर्वाधिकार सुरक्षित।
          </div>
          <div className="footer-national-tag">
            Made with pride in India · जय हिन्द 🇮🇳
          </div>
        </div>
      </footer>
    </div>
  );
}

// REGISTRATION FORM: Aligned strictly to flyer requirements
function Registration() {
  const formWrapRef = useRef(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [failReason, setFailReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const activeCategory = categoriesData[0];

  const [verificationStatus, setVerificationStatus] = useState('idle'); // idle, verifying, verified, failed
  const [verificationToken, setVerificationToken] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    state: '',
    city: '',
    photo: null,
    proofOfAge: null,
    proofOfAgeType: ''
  });

  const handleGenderChange = (selectedGender) => {
    setFormData({
      fullName: '',
      fatherName: '',
      email: '',
      phone: '',
      dob: '',
      state: '',
      city: '',
      photo: null,
      proofOfAge: null,
      proofOfAgeType: '',
      gender: selectedGender
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (files && files[0]) {
        if (files[0].size > 5 * 1024 * 1024) {
          alert('फाइल का आकार 5MB से कम होना चाहिए। (File size must be less than 5MB)');
          e.target.value = '';
          return;
        }
        setFormData(prev => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      // Reset verification state if the user changes the document type
      if (name === 'proofOfAgeType') {
        setVerificationStatus('idle');
        setVerificationToken(null);
        setVerificationMessage('');
      }
    }
  };

  const handleProofOfAgeUpload = async (e) => {
    handleInputChange(e); // First update local state
    const file = e.target.files[0];
    if (!file || !formData.proofOfAgeType) return;

    setVerificationStatus('verifying');
    setVerificationMessage('⏳ Document verify ho raha hai...');

    const vData = new FormData();
    vData.append('proofOfAgeType', formData.proofOfAgeType);
    vData.append('proofOfAge', file);
        vData.append('dob', formData.dob);   // 👈


    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/document-verification/verify`, {
        method: 'POST',
        body: vData
      });
      const data = await res.json();

      if (res.ok && data.verified) {
        setVerificationStatus('verified');
        setVerificationMessage(`✅ ${data.message || 'Verified'}`);
        setVerificationToken(data.token);
      } else {
        setVerificationStatus('failed');
        setVerificationMessage(`❌ ${data.message || 'Verification Failed. Please re-upload.'}`);
        setVerificationToken(null);
      }
    } catch (err) {
      console.error(err);
      setVerificationStatus('failed');
      setVerificationMessage('❌ Error communicating with verification server.');
      setVerificationToken(null);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (formWrapRef.current) {
      formWrapRef.current.scrollTop = 0;
    }
  }, []);

  const nextStep = () => {
    // Age Validation before proceeding from Step 2
    if (step === 2 && formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        alert("आयु सीमा (Age Limit): आपकी आयु 18 वर्ष या उससे अधिक होनी चाहिए। (18 Years & Above only)");
        return;
      }
    }

    setStep((s) => Math.min(s + 1, 3));
    if (formWrapRef.current) {
      formWrapRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    if (formWrapRef.current) {
      formWrapRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Age Validation before proceeding
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        alert('क्षमा करें, इस श्रेणी में भाग लेने के लिए आपकी आयु 18 वर्ष या उससे अधिक होनी चाहिए। (Sorry, you must be 18 or older to participate.)');
        setLoading(false);
        return;
      }
    }

    try {
      // 1. Register User using FormData for file uploads
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) data.append(key, formData[key]);
      });
      data.append('categoryId', activeCategory.id);

      if (verificationToken) {
        data.append('verificationToken', verificationToken);
      } else {
        alert('Please wait for document verification to complete successfully before submitting.');
        setLoading(false);
        return;
      }

      const regResponse = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        body: data
      });
      const regData = await regResponse.json();

      if (!regData.success) throw new Error(regData.message || 'Registration failed');

      const registrationId = regData.registrationId;

      // 2. Create Razorpay Order
      const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId })
      });
      const orderData = await orderResponse.json();

      if (!orderData.success) throw new Error(orderData.message || 'Failed to create order');

      // 3. Mock Payment bypass for local dev
      if (orderData.keyId === 'your_key_id') {
        alert('Mock Payment Successful (Local Dev Mode)');
        setRegistrationData({ id: registrationId, ref: `SD26-${registrationId.toString().padStart(4, '0')}` });
        setSubmitted(true);
        if (formWrapRef.current) formWrapRef.current.scrollTop = 0;
        return;
      }

      // 4. Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) throw new Error('Razorpay SDK failed to load. Are you online?');

      // 5. Open Razorpay Checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "शौर्य दौड़ (Shaurya Daur)",
        description: activeCategory.name,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // 5. Verify Payment
            const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                registrationId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setRegistrationData({ id: registrationId, ref: `SD26-${registrationId.toString().padStart(4, '0')}` });
              setSubmitted(true);
              if (formWrapRef.current) formWrapRef.current.scrollTop = 0;
            } else {
              alert('Payment verification failed!');
            }
          } catch (err) {
            alert('Error verifying payment.');
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#1C7A3B"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', async function (response) {
        // Send failure to backend
        try {
          await fetch(`${import.meta.env.VITE_API_URL}/fail-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              registrationId,
              razorpay_order_id: response.error.metadata.order_id,
              razorpay_payment_id: response.error.metadata.payment_id
            })
          });
        } catch (e) {
          console.error("Failed to notify backend of failure", e);
        }

        // Remove Razorpay UI from DOM forcefully since we are bypassing its default behavior
        const rzpContainer = document.querySelector('.razorpay-container');
        if (rzpContainer) {
          rzpContainer.remove();
        }
        document.body.style.overflow = 'auto';

        setFailReason(response.error.description || 'Technical Error');
        setFailed(true);
      });
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const backToHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const retryPayment = () => {
    setFailed(false);
    setFailReason("");
    setStep(2); // Take them back to the form so they can click submit again without losing data
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (failed) {
    return (
      <div className="registration-page">
        <div className="registration-art">
          <div className="registration-art-bg" aria-hidden="true" />
          <button className="back-link" onClick={backToHome}>
            <ChevronLeft size={18} /> होमपेज पर वापस जाएँ
          </button>
          <div className="registration-left-content">
            <span className="reg-eyebrow" style={{ color: '#ffb3b3' }}>पंजीकरण विफल · REGISTRATION FAILED</span>
            <h1>
              क्षमा करें, भुगतान<br />
              <em style={{ color: '#ff4d4f' }}>विफल रहा।</em>
            </h1>
            <p>
              आपके बैंक द्वारा भुगतान अस्वीकार कर दिया गया है या कोई तकनीकी समस्या आई है।
            </p>
          </div>
          <div className="art-bottom">
            27 सितंबर 2026 (सोमवार) <i>✦</i> सुबह 05:30 बजे
          </div>
        </div>
        <div className="registration-form-wrap" ref={formWrapRef}>
          <div className="success-state">
            <div className="success-icon" style={{ background: '#ff4d4f', color: '#fff', border: 'none' }}>
              <X size={36} strokeWidth={3} />
            </div>
            <h2>
              भुगतान<br />
              <em style={{ color: '#ff4d4f' }}>अपूर्ण (Incomplete)</em>
            </h2>
            <p>
              <strong>त्रुटि (Error):</strong> {failReason}
            </p>

            <div className="docs-reminder-box" style={{ background: "#fff1f0", border: "1px solid #ffa39e", borderRadius: "10px", padding: "14px 18px", margin: "20px 0", textAlign: "left", fontSize: "13px", color: "#cf1322" }}>
              <strong>ध्यान दें:</strong> आपकी जानकारी सुरक्षित है। कृपया किसी अन्य भुगतान माध्यम का उपयोग करके पुनः प्रयास करें।
            </div>

            <button
              onClick={retryPayment}
              className="primary-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                margin: "24px auto 0",
                background: "#000",
                color: "#fff"
              }}
            >
              पुनः प्रयास करें (Retry) <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="registration-page">
        <div className="registration-art">
          <div className="registration-art-bg" aria-hidden="true" />
          <button className="back-link" onClick={backToHome}>
            <ChevronLeft size={18} /> होमपेज पर वापस जाएँ
          </button>
          <div className="registration-left-content">
            <span className="reg-eyebrow">पंजीकरण पुष्ट · REGISTRATION CONFIRMED</span>
            <h1>
              आप शुरुआती रेखा<br />
              <em>पर पहुँच चुके हैं।</em>
            </h1>
            <p>
              हमें आपका पंजीकरण प्राप्त हो गया है। आपका बीब नंबर और वेरिफिकेशन दिशानिर्देश आपके ईमेल पर भेजे जा रहे हैं।
            </p>
          </div>
          <div className="art-bottom">
            27 सितंबर 2026 (सोमवार) <i>✦</i> सुबह 05:30 बजे
          </div>
        </div>
        <div className="registration-form-wrap" ref={formWrapRef}>
          <div className="success-state">
            <div className="success-icon">
              <Check size={36} strokeWidth={3} />
            </div>
            <h2>
              पंजीकरण के लिए<br />
              <em>हार्दिक धन्यवाद!</em>
            </h2>
            <p>
              <strong>{activeCategory.name}</strong> के लिए आपकी प्रविष्टि सफलतापूर्वक दर्ज हो चुकी है।
            </p>
            <div className="success-summary">
              <div>
                <small>दौड़ श्रेणी</small>
                <b>10 km (Shaurya 10K)</b>
              </div>
              <div>
                <small>दूरी</small>
                <b>10 km</b>
              </div>
              <div>
                <small>पंजीकरण शुल्क</small>
                <b>₹ 1100/-</b>
              </div>
              <div>
                <small>रेफ़रेंस आईडी</small>
                <b>{registrationData?.ref || `SD26-${Date.now().toString().slice(-6)}`}</b>
              </div>
            </div>

            <div className="docs-reminder-box" style={{ background: "#fff8e6", border: "1px solid #f6d289", borderRadius: "10px", padding: "14px 18px", margin: "20px 0", textAlign: "left", fontSize: "13px", color: "#664d03" }}>
              <strong>आवश्यक दस्तावेज स्मरण:</strong> बीब किट संकलन के समय आयु प्रमाण (18+), मार्कशीट और पैन कार्ड का सत्यापन आवश्यक होगा।
            </div>

            <button
              onClick={backToHome}
              className="primary-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                margin: "24px auto 0",
              }}
            >
              होमपेज पर वापस जाएँ <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page">
      {/* LEFT: Event info */}
      <div className="registration-art">
        <div className="registration-art-bg" aria-hidden="true" />
        <button className="back-link" onClick={backToHome}>
          <ChevronLeft size={18} /> होमपेज पर वापस जाएँ
        </button>
        <div className="registration-left-content">
          <span className="reg-eyebrow">शौर्य दौड़ 2026 · 10 km · भोपाल</span>
          <h1>
            शौर्य दौड़ के लिए<br />
            <em>पंजीकरण करें।</em>
          </h1>
          <p>
            दौड़ सिर्फ कदमों की नहीं, देशभक्ति की है। स्वस्थ युवा, सशक्त भारत।
          </p>

          <div className="reg-event-info">
            <div className="reg-info-item">
              <CalendarDays size={18} />
              <div>
                <small>इवेंट तारीख</small>
                <b>27 सितंबर, 2026 (सोमवार)</b>
              </div>
            </div>
            <div className="reg-info-item">
              <Clock3 size={18} />
              <div>
                <small>फ्लैग-ऑफ</small>
                <b>सुबह 05:30 बजे · ग्रेन मंडी पिपलानी</b>
              </div>
            </div>
            <div className="reg-info-item">
              <MapPin size={18} />
              <div>
                <small>दौड़ मार्ग</small>
                <b>पिपलानी से शौर्य स्मारक (10 km)</b>
              </div>
            </div>
            <div className="reg-info-item">
              <Phone size={18} />
              <div>
                <small>हेल्पलाइन</small>
                <b>76919 49999</b>
              </div>
            </div>
          </div>
        </div>
        <div className="art-bottom">
          27 सितंबर 2026 <i>✦</i> सुबह 05:30 बजे
        </div>
      </div>

      {/* RIGHT: Multi-step form */}
      <div className="registration-form-wrap" ref={formWrapRef}>
        {/* Progress bar */}
        <div className="reg-progress">
          <div className={`reg-progress-step ${step >= 1 ? "active" : ""}`}>
            <span>1</span>
            <small>श्रेणी (Category)</small>
          </div>
          <div className="reg-progress-bar">
            <i style={{ width: `${((step - 1) / 2) * 100}%` }} />
          </div>
          <div className={`reg-progress-step ${step >= 2 ? "active" : ""}`}>
            <span>2</span>
            <small>विवरण व दस्तावेज</small>
          </div>
          <div className="reg-progress-bar">
            <i style={{ width: `${step >= 3 ? 100 : 0}%` }} />
          </div>
          <div className={`reg-progress-step ${step >= 3 ? "active" : ""}`}>
            <span>3</span>
            <small>पुष्टि (Confirm)</small>
          </div>
        </div>

        {/* STEP 1 — Choose category */}
        {step === 1 && (
          <div className="reg-step-content">
            <div className="form-heading">
              <span className="form-step">चरण 1 / 2</span>
              <h2>
                दौड़ श्रेणी विवरण<br />
                <em>शौर्य 10K</em>
              </h2>
              <p>
                इवेंट का आधिकारिक 10 किमी प्रारूप, 18 वर्ष या उससे अधिक आयु के धावकों के लिए खुला है।
              </p>
            </div>

            <div className="category-list">
              <div className="category-card selected">
                <div className="category-head">
                  <div>
                    <h3>{activeCategory.name}</h3>
                    <small>{activeCategory.distance}</small>
                  </div>
                  <div className="category-price">
                    <b>₹ {activeCategory.price}/-</b>
                  </div>
                </div>
                <p className="category-eligibility">{activeCategory.eligibility}</p>
                <ul className="category-includes">
                  {activeCategory.includes.map((inc) => (
                    <li key={inc}>
                      <Check size={14} /> {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ background: "#fff3cd", border: "1px solid #ffeeba", borderRadius: "8px", padding: "16px", margin: "16px 0", display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ color: "#856404", marginTop: "2px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              </div>
              <div>
                <h4 style={{ margin: "0 0 4px 0", color: "#856404", fontSize: "16px", fontWeight: "bold" }}>CASH AWARDS</h4>
                <p style={{ margin: 0, color: "#856404", fontSize: "14px", lineHeight: "1.5" }}>
                  For first three winners in MEN and Women Category and consolation prize upto first 10 finishers.
                </p>
              </div>
            </div>

            <div className="reg-notice-box" style={{ background: "#f8f9fa", border: "1px solid #e9ecef", borderRadius: "8px", padding: "12px 16px", margin: "16px 0", fontSize: "13px", color: "#495057" }}>
              <strong>सूचना:</strong> अगले चरण में मार्कशीट एवं पैन कार्ड का विवरण दर्ज करना अनिवार्य है।
            </div>

            <button
              type="button"
              className="primary-button submit-button"
              onClick={nextStep}
            >
              आगे बढ़ें (Continue) <ArrowRight size={19} />
            </button>
          </div>
        )}

        {/* STEP 2 — Participant details & Mandatory Document info */}
        {step === 2 && (
          <div className="reg-step-content">
            <div className="form-heading">
              <span className="form-step">चरण 2 / 2</span>
              <h2>
                प्रतिभागी विवरण व<br />
                <em>सत्यापन दस्तावेज</em>
              </h2>
              <p>फ्लाईयर में निर्दिष्ट मार्कशीट और पैन कार्ड विवरण दर्ज करें।</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row" style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>लिंग चुनें (SELECT GENDER) *</span>
                  <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                    <button
                      type="button"
                      onClick={() => handleGenderChange('पुरुष (Male)')}
                      style={{ flex: 1, padding: '16px', borderRadius: '8px', border: formData.gender === 'पुरुष (Male)' ? '2px solid #5c1417' : '1px solid #ccc', background: formData.gender === 'पुरुष (Male)' ? '#fcfaf7' : '#fff', fontWeight: 'bold', color: '#5c1417' }}
                    >MEN (पुरुष)</button>
                    <button
                      type="button"
                      onClick={() => handleGenderChange('महिला (Female)')}
                      style={{ flex: 1, padding: '16px', borderRadius: '8px', border: formData.gender === 'महिला (Female)' ? '2px solid #5c1417' : '1px solid #ccc', background: formData.gender === 'महिला (Female)' ? '#fcfaf7' : '#fff', fontWeight: 'bold', color: '#5c1417' }}
                    >WOMEN (महिला)</button>
                  </div>
                </label>
              </div>

              {formData.gender && (
                <>
                  <div className="form-row">
                    <label>
                      पूरा नाम (FULL NAME) *
                      <input required name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="उदा. राहुल शर्मा" />
                    </label>
                    <label>
                      पिता का नाम (FATHER'S NAME) *
                      <input required name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="पिता का नाम" />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      ईमेल पता (EMAIL ADDRESS) *
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@email.com" />
                    </label>
                    <label>
                      मोबाइल नंबर (PHONE NUMBER) *
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      जन्मतिथि (DATE OF BIRTH - 18+ अनिवार्य) *
                      <input required type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
                    </label>

                  </div>

                  <div className="form-row">
                    <label>
                      राज्य / केंद्र शासित प्रदेश (STATE / UT) *
                      <select required name="state" value={formData.state} onChange={handleInputChange}>
                        <option value="" disabled>
                          राज्य चुनें (Select State)
                        </option>
                        {indianStates.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      शहर (CITY) *
                      <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="उदा. भोपाल / इंदौर / ग्वालियर" />
                    </label>
                  </div>

                  {/* MANDATORY VERIFICATION FIELDS FROM FLYER */}
                  <div style={{ background: "#fcfaf7", border: "1px solid #ebd9c5", borderRadius: "10px", padding: "16px", margin: "16px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", color: "#5c1417", fontWeight: 700, fontSize: "14px" }}>
                      <FileText size={18} />
                      <span>अनिवार्य दस्तावेज सत्यापन (Flyer Requirement)</span>
                    </div>



                    <div style={{ marginTop: "16px" }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: '#333' }}>आयु प्रमाण चुनें (Select Proof of Age) *</p>
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        {['10th Marksheet', '12th Marksheet', 'PAN CARD'].map(docType => (
                          <label key={docType} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="proofOfAgeType"
                              value={docType}
                              checked={formData.proofOfAgeType === docType}
                              onChange={handleInputChange}
                              required
                            />
                            {docType}
                          </label>
                        ))}
                      </div>

                      {formData.proofOfAgeType && (
                        <div className="proof-photo-row">
                          <label style={{ overflow: "hidden", maxWidth: "100%" }}>
                            {formData.proofOfAgeType} अपलोड करें (Upload {formData.proofOfAgeType}) *
                            <input required type="file" name="proofOfAge" accept="image/jpeg,image/png,image/jpg" onChange={handleProofOfAgeUpload} style={{ padding: "10px", background: "#fff", maxWidth: "100%", borderColor: verificationStatus === 'failed' ? 'red' : verificationStatus === 'verified' ? 'green' : '#ccc' }} />

                            {verificationStatus !== 'idle' && (
                              <div style={{ marginTop: '8px', fontSize: '13px', fontWeight: 'bold', color: verificationStatus === 'failed' ? '#d32f2f' : verificationStatus === 'verified' ? '#2e7d32' : '#f57c00' }}>
                                {verificationMessage}
                              </div>
                            )}
                          </label>
                          <label style={{ overflow: "hidden", maxWidth: "100%" }}>
                            अपनी फोटो अपलोड करें (Photo - Upload file) *
                            <small style={{ color: "#d32f2f", fontWeight: "bold", display: "block", marginBottom: "5px", marginTop: "2px" }}>(Max file size: 5 MB)</small>
                            <input required type="file" name="photo" accept="image/*" onChange={handleInputChange} style={{ padding: "10px", background: "#fff", maxWidth: "100%" }} />
                          </label>
                        </div>
                      )}
                    </div>
                    <small style={{ color: "#7a6e69", fontSize: "12px", display: "block", marginTop: "12px" }}>
                      * बीब संकलन के दौरान मूल दस्तावेज का सत्यापन किया जाएगा।
                    </small>
                  </div>



                </>
              )}


              {/* Declaration Checkboxes */}
              <div style={{ background: "#fcfaf7", border: "1px solid #ebd9c5", borderRadius: "10px", padding: "16px", margin: "16px 0" }}>
                <label className="check-label" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', marginBottom: '12px' }}>
                  <input type="checkbox" required style={{ marginTop: '5px' }} />
                  <span style={{ fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
                    <strong>DECLARATION:</strong> I hereby declare that the above given information is true to my knowledge and I submit this form with my full consciousness.
                  </span>
                </label>
                <label className="check-label" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                  <input type="checkbox" required style={{ marginTop: '5px' }} />
                  <span style={{ fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
                    <strong>AGREEMENT:</strong> I hereby promise that I will abide by Rules and Regulations during the competition. I agree to participate at my own risk and if any casualty or injury happens, it will be my own responsibility. I will not claim anything from organisers.
                  </span>
                </label>
              </div>

              <div className="reg-step-actions">
                <button
                  type="button"
                  className="ghost-button"
                  onClick={prevStep}
                >
                  <ChevronLeft size={17} /> पीछे (Back)
                </button>
                <button type="submit" className="primary-button" disabled={loading || verificationStatus !== 'verified'} style={{ background: verificationStatus === 'verified' && !loading ? "#5c1417" : "#ccc", cursor: verificationStatus === 'verified' && !loading ? "pointer" : "not-allowed" }}>
                  {loading ? 'Processing...' : 'पंजीकरण पूरा करें (Submit)'} <Check size={19} />
                </button>
              </div>
            </form>
          </div>
        )}


      </div>
    </div>
  );
}


function RootApp() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentRoute(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (currentRoute === ADMIN_ROUTE) {
    return <AdminDashboard />;
  }

  return <App />;
}

createRoot(document.getElementById("root")).render(<RootApp />);
