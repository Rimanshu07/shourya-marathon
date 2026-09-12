import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  Clock3,
  Compass,
  Flag,
  HeartHandshake,
  Mail,
  MapPin,
  Medal,
  Menu,
  MoveRight,
  Newspaper,
  Phone,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";
import "./styles.css";

// Existing real categories from registration
const categoriesData = [
  {
    id: "11k",
    name: "शौर्य 11K (Shaurya 11K)",
    tagline: "मुख्य स्पर्धा · Flagship Race",
    distance: "11 किमी (11 KM)",
    eligibility: "18 वर्ष और अधिक | सभी के लिए खुली",
    price: 1100,
    originalPrice: 1400,
    earlyBird: true,
    badge: "अर्ली बर्ड छूट",
    theme: "primary-maroon",
    includes: [
      "ड्राई-फिट प्रीमियम रनिंग टी-शर्ट",
      "पर्सनलाइज़्ड बीब (Bib) + टाइमिंग चिप",
      "आधिकारिक फिनिशर पदक (Finisher Medal)",
      "रन के बाद पौष्टिक नाश्ता (Breakfast)",
      "हाई-रेज़ोल्यूशन इवेंट फोटोग्राफी",
    ],
  },
  {
    id: "5k",
    name: "स्पिरिट 5K (Spirit 5K)",
    tagline: "फिटनेस व युवा धावक · Timed Run",
    distance: "5 किमी (5 KM)",
    eligibility: "14 वर्ष और अधिक | सभी के लिए खुली",
    price: 700,
    originalPrice: 900,
    earlyBird: true,
    badge: "अर्ली बर्ड छूट",
    theme: "accent-green",
    includes: [
      "ड्राई-फिट इवेंट टी-शर्ट",
      "आधिकारिक बीब नंबर",
      "फिनिशर पदक",
      "पोस्ट-रन रिफ्रेशमेंट्स",
    ],
  },
  {
    id: "fun",
    name: "फन रन 3K (Fun Run)",
    tagline: "पारिवारिक व सामुदायिक दौड़",
    distance: "3 किमी (3 KM Non-timed)",
    eligibility: "12 वर्ष और अधिक | सभी के लिए खुली",
    price: 400,
    originalPrice: 500,
    earlyBird: false,
    badge: null,
    theme: "accent-saffron",
    includes: [
      "आधिकारिक बीब नंबर",
      "ड्राई-फिट टी-शर्ट",
      "पार्टिसिपेशन सर्टिफिकेट",
      "रिफ्रेशमेंट्स",
    ],
  },
];

// Indian States and Union Territories
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
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Other (अन्य राज्य / देश)"
];

// Existing real sponsor data
const sponsors = [
  [
    "जय बालाजी ग्रुप",
    "jaibalajigroup.com",
    "https://jaibalajigroup.com/",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  ],
  [
    "TIO SPORTS",
    "tiosports.com",
    "https://tiosports.com/",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  ],
  [
    "CHARNOCK",
    "charnockhospitals.com",
    "https://charnockhospitals.com/",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  ],
  [
    "ZANDU",
    "zandu.in",
    "https://zandu.in/",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  ],
  [
    "INDIA CARES",
    "indiacares.org",
    "https://indiacares.org/",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
  ],
  [
    "FAST&UP",
    "fastandup.in",
    "https://fastandup.in/",
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
  ],
  [
    "THE TELEGRAPH",
    "telegraphindia.com",
    "https://www.telegraphindia.com/",
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  ],
];

// Existing real partner data
const partners = [
  [
    "फिट इंडिया",
    "Movement partner",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  ],
  [
    "युवा शक्ति",
    "Youth partner",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  ],
  [
    "राष्ट्र शक्ति",
    "Community partner",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  ],
  [
    "कोलकाता",
    "City partner",
    "https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80",
  ],
];

// Existing real video data
const videos = [
  {
    title: "The spirit of Shaurya Daur",
    meta: "Event film · 2026",
    id: "ScMzIvxBSi4",
  },
  {
    title: "Every step, one shared story",
    meta: "Community film · 2026",
    id: "ysz5S6PUM-U",
  },
];

function App() {
  const [registration, setRegistration] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("11k");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#register")) {
        setRegistration(true);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        if (hash.includes("5k")) setSelectedCategory("5k");
        else if (hash.includes("fun") || hash.includes("3k")) setSelectedCategory("fun");
        else setSelectedCategory("11k");
      } else {
        setRegistration(false);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const openRegistration = (catId = "11k") => {
    setSelectedCategory(catId);
    window.location.hash = `register-${catId}`;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return registration ? (
    <Registration initialCategory={selectedCategory} />
  ) : (
    <Home onSelectCategory={openRegistration} />
  );
}

function Home({ onSelectCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("home");
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        // Transparent throughout the Hero section.
        // As soon as hero bottom edge reaches navbar height (<= 90px),
        // we have transitioned into the other sections -> stuck with blur!
        setScrolled(heroRect.bottom <= 90);
      } else {
        setScrolled(window.scrollY > 400);
      }

      // Dynamic active section tracking
      const sections = ["home", "about", "details", "categories", "route", "films", "gallery", "news", "sponsors", "contact"];
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

  const goRegister = (catId = "11k") => {
    onSelectCategory(catId);
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
          <img src="/logo-clean.png" alt="Logo" className="brand-logo-img" />
          <div className="new-brand-text">
            <b>शौर्य दौड़</b>
            <small>स्वस्थ युवा • सशक्त भारत</small>
          </div>
        </a>
        <nav className={menuOpen ? "new-nav-links open" : "new-nav-links"}>
          <button className={activeSection === "home" ? "active" : ""} onClick={() => scrollTo("home")}>Home</button>
          <button className={activeSection === "about" ? "active" : ""} onClick={() => scrollTo("about")}>About Us</button>
          <button className={activeSection === "details" ? "active" : ""} onClick={() => scrollTo("details")}>Event Details</button>
          <button className={activeSection === "categories" ? "active" : ""} onClick={() => scrollTo("categories")}>Categories</button>
          <button className={activeSection === "route" ? "active" : ""} onClick={() => scrollTo("route")}>Route</button>
          <button className={activeSection === "films" ? "active" : ""} onClick={() => scrollTo("films")}>Films</button>
          <button className={activeSection === "gallery" ? "active" : ""} onClick={() => scrollTo("gallery")}>Gallery</button>
          <button className={activeSection === "news" ? "active" : ""} onClick={() => scrollTo("news")}>News</button>
          <button className={activeSection === "sponsors" ? "active" : ""} onClick={() => scrollTo("sponsors")}>Partners</button>
          <button className={activeSection === "contact" ? "active" : ""} onClick={() => scrollTo("contact")}>Contact Us</button>
        </nav>
        <div className="nav-right-actions">
          <button className="new-nav-cta" onClick={() => goRegister("11k")}>
            Register Now <ArrowRight size={15} strokeWidth={2.5} />
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
        {/* HERO SECTION: Fully preserved; ONLY .hero-emblem-wrap removed from right column */}
        <section className="new-hero" id="home">
          <div className="new-hero-container">
            {/* Left Content Column */}
            <div className="new-hero-left">
              <div className="hero-top-sponsor-wrap">
                <span className="new-hero-subtitle">JAI BALAJI GROUP</span>
                {/* Flowing tricolor wave accent that arcs over the title */}
                <svg className="tricolor-wave-accent" viewBox="0 0 280 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16C45 4 95 24 150 10C195 0 240 16 276 6" stroke="#E8720C" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M8 19C49 7 99 27 154 13C199 3 244 19 272 9" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <path d="M12 22C53 10 103 30 158 16C203 6 248 22 268 12" stroke="#1C7A3B" strokeWidth="4.5" strokeLinecap="round" />
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

              <p className="hero-dedication">
                देश के वीरों को समर्पित एक दौड़
              </p>

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
                    <span className="info-val">11 km</span>
                  </div>
                </div>

                <div className="info-divider"></div>

                <div className="info-col">
                  <div className="info-icon-circle rupee-circle">
                    ₹
                  </div>
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
                    <strong className="info-title highlight-red">आयोजन तिथि</strong>
                    <span className="info-val">28 सितंबर, 2026</span>
                    <span className="info-sub">(सोमवार)</span>
                  </div>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="new-hero-actions">
                <button className="btn-hero-register" onClick={() => goRegister("11k")}>
                  Register Now <ArrowRight size={16} strokeWidth={2.5} />
                </button>
                <button className="btn-hero-details" onClick={() => scrollTo("details")}>
                  View Details <span className="play-triangle">▶</span>
                </button>
              </div>
            </div>

            {/* Right Column: Emblem removed; Poetic quote preserved and balanced */}
            <div className="new-hero-right">
              <div className="hero-poetic-badge">
                <div className="poetic-lines">
                  <div>हर कदम में</div>
                  <div>वीरों की गाथा</div>
                  <div>हर धड़कन में</div>
                  <div>भारत माता</div>
                </div>
                {/* Saffron brush curve under Bharat Mata */}
                <svg className="poetic-brush-curve" viewBox="0 0 160 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 11C40 4 95 15 156 7" stroke="#E8720C" strokeWidth="5.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Floating Bottom Ticker Strip */}
          <div className="hero-bottom-floating-bar">
            <div className="bottom-bar-features">
              <div className="bottom-feature-item">
                <svg className="feature-svg-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                  <path d="m7 21 3-5-2-4 4-2 3 3 4-2" />
                  <path d="m10 12 2 3 4 1" />
                </svg>
                <span className="feature-text">फिट इंडिया</span>
              </div>
              <span className="bar-pipe">|</span>
              <div className="bottom-feature-item">
                <Users size={20} strokeWidth={2.4} className="feature-svg-icon" />
                <span className="feature-text">युवा शक्ति</span>
              </div>
              <span className="bar-pipe">|</span>
              <div className="bottom-feature-item">
                <Flag size={20} strokeWidth={2.4} className="feature-svg-icon" />
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

        {/* ABOUT SECTION: Editorial Magazine Layout */}
        <section className="about-editorial-wrap" id="about">
          <div className="about-editorial-container">
            {/* Left Editorial Narrative */}
            <div className="about-editorial-left">
              <div className="editorial-eyebrow-pill">
                <span className="pill-dot"></span>
                <span>जय बालाजी ग्रुप प्रस्तुत करता है</span>
              </div>

              <h2 className="about-main-heading">
                शौर्य दौड़ के बारे में —<br />
                <span className="heading-accent">स्वस्थ युवा, सशक्त भारत</span>
              </h2>

              <div className="editorial-lead-quote">
                “देश के वीरों को समर्पित एक ऐसी दौड़, जो केवल कदमों की नहीं, भारतीय स्वाभिमान की यात्रा है।”
              </div>

              <p className="editorial-body-para">
                शौर्य दौड़ देश के वीरों को समर्पित एक दौड़ है, जो हावड़ा ब्रिज के ऐतिहासिक मार्ग पर आयोजित की जाएगी। 
                11 किलोमीटर की यह दौड़ फिट इंडिया आंदोलन की भावना को आगे बढ़ाते हुए युवा शक्ति और राष्ट्र शक्ति का उत्सव मनाती है। 
                हर कदम इतिहास से प्रेरणा लेकर एक स्वस्थ और सशक्त भारत के निर्माण की ओर बढ़ता है।
              </p>

              {/* Factual Milestone Docket */}
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
                  <div className="fact-badge">11 KM</div>
                  <div className="fact-meta">
                    <b>दूरी</b>
                    <span>मुख्य दौड़ मार्ग</span>
                  </div>
                </div>
                <div className="fact-separator" />
                <div className="fact-item">
                  <div className="fact-badge">₹ 1100</div>
                  <div className="fact-meta">
                    <b>पंजीकरण शुल्क</b>
                    <span>अर्ली बर्ड स्लॉट</span>
                  </div>
                </div>
              </div>

              <div className="about-editorial-actions">
                <button onClick={() => goRegister("11k")} className="btn-brand-primary">
                  अभी पंजीकरण करें <ArrowRight size={16} strokeWidth={2.4} />
                </button>
                <button onClick={() => scrollTo("details")} className="btn-brand-outline">
                  पूरी जानकारी देखें →
                </button>
              </div>
            </div>

            {/* Right Editorial Media Showcase */}
            <div className="about-editorial-right">
              <div className="editorial-media-frame">
                <img
                  src="/event-banner.png"
                  alt="शौर्य दौड़"
                  className="editorial-image"
                />
                <div className="media-overlay-gradient"></div>
                
                {/* Stamp Tag */}
                <div className="media-stamp-badge">
                  <span className="stamp-city">28 सितंबर, 2026 (सोमवार)</span>
                  <span className="stamp-venue">हावड़ा ब्रिज, कोलकाता</span>
                </div>

                {/* Film Teaser Trigger */}
                <button
                  className="media-play-floater"
                  onClick={() => scrollTo("films")}
                  aria-label="Play video"
                >
                  <span className="play-triangle-gold">▶</span>
                  <span className="play-label">इवेंट फ़िल्म देखें</span>
                </button>

                <div className="media-bottom-caption">
                  <span className="caption-tag">शौर्य दौड़ 2026</span>
                  <strong className="caption-title">देश के वीरों को समर्पित एक दौड़</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVENT DETAILS: Information Docket & Timeline Architecture */}
        <section className="details-docket-section" id="details">
          <div className="details-docket-inner">
            <div className="docket-header">
              <span className="docket-subtag">जो कुछ जानना ज़रूरी है</span>
              <h2 className="docket-heading">
                दौड़ने आइए। <span className="highlight-maroon">बाकी हम संभाल लेंगे।</span>
              </h2>
              <p className="docket-lead">
                एक सुरक्षित, आधिकारिक और प्रेरणादायी मैराथन अनुभव के लिए सभी व्यवस्थाएं पूर्ण की गई हैं।
              </p>
            </div>

            <div className="docket-content-layout">
              {/* Left: Essential Runner Checklist Docket */}
              <div className="docket-checklist-column">
                <div className="docket-card-title">
                  <Sparkles size={18} color="#E8720C" />
                  <span>इवेंट मुख्य प्रावधान व सुविधाएँ</span>
                </div>

                <div className="docket-list">
                  <div className="docket-row">
                    <div className="docket-number-badge">01</div>
                    <div className="docket-row-text">
                      <h4>एक सार्थक पदक</h4>
                      <p>सड़क पर पाई गई हिम्मत की एक निशानी घर ले जाइए। आधिकारिक फिनिशर मेडल।</p>
                    </div>
                  </div>

                  <div className="docket-row">
                    <div className="docket-number-badge">02</div>
                    <div className="docket-row-text">
                      <h4>साथ देने वाली भीड़</h4>
                      <p>उन लोगों के साथ दौड़िए जो हर कदम को मायने देते हैं। युवा ऊर्जा और उत्साह।</p>
                    </div>
                  </div>

                  <div className="docket-row">
                    <div className="docket-number-badge">03</div>
                    <div className="docket-row-text">
                      <h4>एक सार्थक उद्देश्य</h4>
                      <p>एक स्वस्थ, सशक्त भारत की शुरुआत आपके एक कदम से होती है। राष्ट्र शक्ति का सम्मान।</p>
                    </div>
                  </div>

                  <div className="docket-row">
                    <div className="docket-number-badge">04</div>
                    <div className="docket-row-text">
                      <h4>सुरक्षित और प्रमाणित मार्ग</h4>
                      <p>पूरी तरह सुरक्षित, चिकित्सा सहायता व आपातकालीन एम्बुलेंस से लैस दौड़ मार्ग।</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Event Schedule & Date Anchor */}
              <div className="docket-schedule-column">
                <div className="schedule-panel">
                  <div className="schedule-badge-head">
                    <CalendarDays size={18} />
                    <span>इवेंट दिवस समय-सारणी</span>
                  </div>

                  <div className="schedule-timeline">
                    <div className="timeline-step">
                      <span className="step-time">05:00 AM</span>
                      <div className="step-body">
                        <strong>एकत्रण व रिपोर्टिंग</strong>
                        <small>शौर्य चौक · वार्म-अप सत्र व बीब चेकिंग</small>
                      </div>
                    </div>
                    <div className="timeline-step active-step">
                      <span className="step-time">05:30 AM</span>
                      <div className="step-body">
                        <strong>आधिकारिक फ्लैग-ऑफ</strong>
                        <small>11K व 5K मुख्य दौड़ का शुभारंभ</small>
                      </div>
                    </div>
                    <div className="timeline-step">
                      <span className="step-time">07:30 AM</span>
                      <div className="step-body">
                        <strong>फिनिशर लाउंज व नाश्ता</strong>
                        <small>पौष्टिक रिफ्रेशमेंट्स व पदक वितरण</small>
                      </div>
                    </div>
                    <div className="timeline-step">
                      <span className="step-time">08:30 AM</span>
                      <div className="step-body">
                        <strong>समापन व सम्मान समारोह</strong>
                        <small>विजयी धावकों व अतिथियों का सम्मान</small>
                      </div>
                    </div>
                  </div>

                  {/* Date Card Strip */}
                  <div className="schedule-footer-bar">
                    <div className="footer-bar-date">
                      <span className="date-num">28</span>
                      <div className="date-month">
                        <b>सितंबर, 2026</b>
                        <small>सोमवार · सुबह 05:30 बजे</small>
                      </div>
                    </div>
                    <div className="footer-bar-location">
                      <MapPin size={17} color="#E8720C" />
                      <span>हावड़ा ब्रिज, कोलकाता</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RACE CATEGORIES: Differentiated Visual Cards for 11K, 5K, and 3K */}
        <section className="categories-modern-section" id="categories">
          <div className="categories-container">
            <div className="cat-section-header">
              <div className="cat-tag-ribbon">रेस श्रेणियाँ · 2026</div>
              <h2 className="cat-headline">
                अपनी दूरी चुनें, <span className="highlight-maroon">अपने संकल्प के साथ दौड़ें</span>
              </h2>
              <p className="cat-lead-sub">
                सभी श्रेणियों में आधिकारिक बीब नंबर और ड्राई-फिट रनिंग टी-शर्ट शामिल हैं।
              </p>
            </div>

            <div className="category-cards-grid">
              {categoriesData.map((cat) => (
                <div
                  key={cat.id}
                  className={`category-differentiated-card ${cat.theme} ${cat.id === "11k" ? "featured-flagship" : ""}`}
                >
                  {cat.earlyBird && (
                    <div className="card-top-pill">{cat.badge}</div>
                  )}

                  <div className="card-header-block">
                    <span className="category-tagline">{cat.tagline}</span>
                    <h3 className="category-card-name">{cat.name}</h3>
                    <div className="category-distance-chip">
                      <Flag size={14} />
                      <span>{cat.distance}</span>
                    </div>
                  </div>

                  <div className="category-pricing-box">
                    <div className="price-main">
                      <span className="rupee-sign">₹</span>
                      <span className="price-number">{cat.price}</span>
                      <span className="price-tax">/-</span>
                    </div>
                    {cat.originalPrice > cat.price && (
                      <span className="price-striked">मूल ₹{cat.originalPrice}</span>
                    )}
                  </div>

                  <div className="category-eligibility-note">
                    <small>पात्रता:</small> {cat.eligibility}
                  </div>

                  <div className="category-inclusions-list">
                    <strong className="inclusions-title">शामिल सुविधाएँ:</strong>
                    <ul>
                      {cat.includes.map((inc, idx) => (
                        <li key={idx}>
                          <Check size={14} className="check-svg" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className="category-select-cta"
                    onClick={() => goRegister(cat.id)}
                  >
                    <span>{cat.id === "11k" ? "11K चुनें और रजिस्टर करें" : `${cat.id.toUpperCase()} रजिस्टर करें`}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE ROUTE: Milestone Flow & Course Architecture */}
        <section className="route-section-refined" id="route">
          <div className="route-watermark" aria-hidden="true">11K</div>

          <div className="route-header-wrap">
            <div className="route-sub-tag">
              <Compass size={16} /> आधिकारिक दौड़ मार्ग
            </div>
            <h2 className="route-title">
              पूरा शहर बनेगा <span className="highlight-maroon">आपकी फिनिश लाइन।</span>
            </h2>
            <p className="route-subtext">
              एक सुबह। भोपाल के दिल से गुज़रता एक अविस्मरणीय लूप। दौड़िए, और उस एहसास के लिए रुक जाइए।
            </p>
          </div>

          <div className="route-docket-wrap">
            {/* Horizontal Timeline Flow */}
            <div className="route-timeline-flow">
              <div className="route-checkpoint-card">
                <div className="checkpoint-marker start-point">01</div>
                <div className="checkpoint-info">
                  <span className="checkpoint-time">शुरुआत · सुबह 05:30 बजे</span>
                  <h4>शौर्य चौक</h4>
                  <p>फ्लैग-ऑफ पॉइंट · हाइड्रेशन स्टेशन #1 · एकत्रण स्थल</p>
                </div>
              </div>

              <div className="route-flow-connector" />

              <div className="route-checkpoint-card">
                <div className="checkpoint-marker mid-point">02</div>
                <div className="checkpoint-info">
                  <span className="checkpoint-time">चेकपॉइंट · सुबह 06:15 बजे</span>
                  <h4>अपर लेक</h4>
                  <p>झील किनारे का सुंदर मार्ग · चीयरिंग ज़ोन · मेडिकल सहायता</p>
                </div>
              </div>

              <div className="route-flow-connector" />

              <div className="route-checkpoint-card">
                <div className="checkpoint-marker mid-point">03</div>
                <div className="checkpoint-info">
                  <span className="checkpoint-time">चेकपॉइंट · सुबह 07:20 बजे</span>
                  <h4>पुराना भोपाल</h4>
                  <p>ऐतिहासिक इलाक़ा · लाइव संगीत · एनर्जी ड्रिंक्स</p>
                </div>
              </div>

              <div className="route-flow-connector" />

              <div className="route-checkpoint-card">
                <div className="checkpoint-marker finish-point">04</div>
                <div className="checkpoint-info">
                  <span className="checkpoint-time">समापन · सुबह 08:30 बजे</span>
                  <h4>शौर्य चौक</h4>
                  <p>पदक समारोह · फोटो वॉल · रिकवरी ज़ोन</p>
                </div>
              </div>
            </div>

            {/* Course Metrics Dashboard */}
            <div className="route-metrics-bar">
              <div className="metric-cell">
                <b>11.0 किमी</b>
                <span>शहर जितनी बड़ी चुनौती</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-cell">
                <b>02:30 घंटे</b>
                <span>अधिकतम समय (Cut-off)</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-cell">
                <b>+ 15</b>
                <span>हाइड्रेशन पॉइंट्स</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-cell">
                <b>100%</b>
                <span>सुरक्षित व ट्रैफिक-मुक्त मार्ग</span>
              </div>
            </div>
          </div>
        </section>

        {/* FILMS: Cinematic Video Showcase */}
        <section className="films-cinema-section" id="films">
          <div className="films-header">
            <div className="films-tag">
              <span className="dot"></span> शौर्य दौड़ फिल्म
            </div>
            <h2 className="films-title">
              देखिए क्या होता है <span className="accent-saffron">जब हम साथ दौड़ते हैं।</span>
            </h2>
            <p className="films-desc">
              पहले कदम से पहले एक एहसास होता है — एक शहर की जागती धड़कन, भीड़ की एक साझा लय,
              और हर कहानी का इंतज़ार करती एक फिनिश लाइन।
            </p>
          </div>

          <div className="films-cinema-grid">
            {videos.map((vid) => (
              <div className="cinema-card" key={vid.id}>
                <div
                  className="cinema-viewport"
                  onClick={() => setPlayingVideo(playingVideo === vid.id ? null : vid.id)}
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
                        <svg width="26" height="30" viewBox="0 0 20 24" fill="currentColor">
                          <path d="M2 2L18 12L2 22V2Z" />
                        </svg>
                      </div>
                      <span className="cinema-badge-stamp">{vid.meta}</span>
                    </div>
                  )}
                </div>

                <div
                  className="cinema-meta-strip"
                  onClick={() => setPlayingVideo(playingVideo === vid.id ? null : vid.id)}
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

        {/* GALLERY: Editorial Masonry Showcase (Nav #gallery target) */}
        <section className="gallery-section-editorial" id="gallery">
          <div className="gallery-container">
            <div className="gallery-heading-wrap">
              <span className="gallery-eyebrow">इवेंट झलकियाँ</span>
              <h2 className="gallery-title">
                सड़क, संकल्प और <span className="highlight-maroon">गौरव के पल</span>
              </h2>
              <p className="gallery-subtitle">
                शौर्य दौड़ के जीवंत दृश्य — उत्साह, एकता और खेल भावना का प्रामाणिक दस्तावेज़।
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
                  <span className="gallery-chip">हावड़ा ब्रिज लूप</span>
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

        {/* NEWS & BULLETINS: Editorial Announcement Desk (Nav #news target) */}
        <section className="news-bulletin-section" id="news">
          <div className="news-container">
            <div className="news-header">
              <span className="news-eyebrow">
                <Newspaper size={16} /> ताज़ा समाचार व घोषणाएं
              </span>
              <h2 className="news-title">
                शौर्य दौड़ <span className="highlight-maroon">अपडेट्स व सूचनाएं</span>
              </h2>
            </div>

            <div className="news-layout-grid">
              {/* Featured Main Story */}
              <div className="news-featured-card">
                <span className="news-badge-live">नवीनतम सूचना</span>
                <span className="news-date">28 सितंबर, 2026</span>
                <h3 className="news-featured-headline">
                  शौर्य दौड़ 2026: 11 किमी, 5 किमी और 3 किमी श्रेणियों के लिए पंजीकरण आरंभ
                </h3>
                <p className="news-featured-excerpt">
                  फिट इंडिया आंदोलन की भावना को आगे बढ़ाते हुए हावड़ा ब्रिज के ऐतिहासिक मार्ग पर देश के वीरों को समर्पित मैराथन का आयोजन किया जा रहा है। सीमित अर्ली बर्ड स्लॉट उपलब्ध हैं।
                </p>
                <button className="news-read-cta" onClick={() => goRegister("11k")}>
                  पंजीकरण विवरण देखें <ArrowRight size={15} />
                </button>
              </div>

              {/* Secondary Bulletins */}
              <div className="news-side-bulletins">
                <div className="bulletin-row">
                  <span className="bulletin-date">अपडेट #01</span>
                  <h4>आधिकारिक ड्राई-फिट टी-शर्ट व बीब किट का अनावरण</h4>
                  <p>सभी पंजीकृत प्रतिभागियों को आधिकारिक बीब नंबर और प्रीमियम टाइमिंग चिप प्रदान की जाएगी।</p>
                </div>

                <div className="bulletin-row">
                  <span className="bulletin-date">अपडेट #02</span>
                  <h4>मार्ग सुरक्षा व चिकित्सा दल की तैनाती</h4>
                  <p>पूरे 11 किमी मार्ग पर प्रत्येक किलोमीटर पर प्राथमिक चिकित्सा व हाइड्रेशन स्टेशन सुनिश्चित किए गए हैं।</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPONSORS & PARTNERS: Institutional Tiered Layout */}
        <section className="sponsors-refined-section" id="sponsors">
          <div className="sponsors-inner-wrap">
            <div className="sponsors-headline-block">
              <span className="sponsors-eyebrow">एक साथ निर्मित</span>
              <h2 className="sponsors-heading">
                मजबूत तब होते हैं <span className="highlight-maroon">जब हम साथ खड़े होते हैं।</span>
              </h2>
              <p className="sponsors-sub">
                यह दौड़ उन संस्थाओं की वजह से संभव हो पाई है, जो मानते हैं कि एक स्वस्थ भारत
                की शुरुआत सक्रिय और जुड़े हुए समुदायों से होती है।
              </p>
            </div>

            {/* 1. Title / Primary Sponsor */}
            <div className="title-partner-panel">
              <div className="title-partner-label">मुख्य प्रायोजक · TITLE SPONSOR</div>
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
                  <small>LEADING THE INDUSTRIAL VISION · राष्ट्र निर्माण में समर्पित</small>
                  <p className="title-partner-desc">
                    शौर्य दौड़ 2026 के मुख्य संरक्षक के रूप में, जय बालाजी ग्रुप भारतीय युवाओं के स्वास्थ्य, संकल्प और खेल प्रतिभा को सशक्त बनाने के लिए प्रतिबद्ध है।
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

            {/* 2. Supporting Sponsors with Actual Logo Images */}
            <div className="partner-group-title">सहयोगी प्रायोजक · ASSOCIATE SPONSORS</div>
            <div className="sponsors-logo-wall">
              {sponsors.slice(1).map(([name, site, href, image]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="sponsor-logo-box"
                  title={`${name} · ${site}`}
                >
                  <div className="sponsor-logo-frame">
                    <img src={image} alt={name} className="sponsor-logo-photo" />
                  </div>
                  <div className="sponsor-logo-label">
                    <span className="sponsor-org-name">{name}</span>
                    <small className="sponsor-org-site">{site}</small>
                  </div>
                </a>
              ))}
            </div>

            {/* 3. Community & Movement Partners with Actual Logo Images */}
            <div className="partner-group-title">सामुदायिक व अभियान भागीदार · MOVEMENT PARTNERS</div>
            <div className="partners-logo-grid">
              {partners.map(([name, role, image]) => (
                <div key={name} className="partner-logo-box">
                  <div className="partner-logo-frame">
                    <img src={image} alt={name} className="partner-logo-photo" />
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

        {/* CONTACT US: Practical Runner Helpdesk (Nav #contact target) */}
        <section className="contact-helpdesk-section" id="contact">
          <div className="contact-container">
            <div className="contact-header">
              <span className="contact-eyebrow">धावक सहायता केंद्र</span>
              <h2 className="contact-title">
                हमसे संपर्क करें — <span className="highlight-maroon">हेल्पडेस्क 24x7</span>
              </h2>
              <p className="contact-lead">
                पंजीकरण, किट वितरण अथवा दौड़ मार्ग संबंधी किसी भी जानकारी के लिए हमारे हेल्पडेस्क से जुड़ें।
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-phone-card">
                <div className="phone-icon-circle">
                  <Phone size={20} />
                </div>
                <div className="phone-details">
                  <span className="phone-label">हेल्पलाइन नंबर 1</span>
                  <a href="tel:+917691949999" className="phone-number">76919 49999</a>
                  <small>कॉल / व्हाट्सएप सहायता</small>
                </div>
              </div>

              <div className="contact-phone-card">
                <div className="phone-icon-circle">
                  <Phone size={20} />
                </div>
                <div className="phone-details">
                  <span className="phone-label">हेल्पलाइन नंबर 2</span>
                  <a href="tel:+917771888651" className="phone-number">77718 88651</a>
                  <small>तकनीकी व पंजीकरण सहायता</small>
                </div>
              </div>

              <div className="contact-phone-card">
                <div className="phone-icon-circle">
                  <Phone size={20} />
                </div>
                <div className="phone-details">
                  <span className="phone-label">हेल्पलाइन नंबर 3</span>
                  <a href="tel:+918708584578" className="phone-number">87085 84578</a>
                  <small>इवेंट डे कोऑर्डिनेशन</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL HERO CTA: Strong Conversion Strip */}
        <section className="final-cta-section" id="register-cta">
          <div className="cta-container">
            <div className="cta-ambient-glow" aria-hidden="true" />
            <div className="cta-watermark-text" aria-hidden="true">
              SHAURYA
            </div>

            <div className="cta-content">
              <div className="cta-badge">
                <Sparkles size={15} />
                <span>28 सितंबर 2026 · भोपाल</span>
              </div>

              <h2 className="cta-headline">
                YOUR NEXT CHAPTER<br />
                <span className="accent">STARTS HERE.</span>
              </h2>

              <p className="cta-subheading-hi">
                आपकी नई कहानी यहीं से शुरू होती है।
              </p>

              <p className="cta-description">
                सड़क तैयार है, भीड़ इंतज़ार कर रही है, और आपकी हिम्मत आपकी पहचान बनेगी।
                आज ही शौर्य दौड़ 2026 में अपना स्थान सुरक्षित करें और इस ऐतिहासिक उत्सव का हिस्सा बनें।
              </p>

              <div className="cta-actions">
                <button className="cta-primary-btn" onClick={() => goRegister("11k")}>
                  <span>अभी रजिस्टर करें · REGISTER NOW</span>
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
                <button onClick={() => scrollTo("details")} className="cta-secondary-link">
                  इवेंट की जानकारी देखें <MoveRight size={16} />
                </button>
              </div>

              <div className="cta-perks-strip">
                <div className="cta-perk-item">
                  <Check size={15} className="perk-icon" />
                  <span>सीमित स्लॉट्स</span>
                </div>
                <div className="cta-perk-dot" />
                <div className="cta-perk-item">
                  <Check size={15} className="perk-icon" />
                  <span>ड्राई-फिट टी-शर्ट और बीब</span>
                </div>
                <div className="cta-perk-dot" />
                <div className="cta-perk-item">
                  <Check size={15} className="perk-icon" />
                  <span>आधिकारिक फिनिशर पदक</span>
                </div>
                <div className="cta-perk-dot" />
                <div className="cta-perk-item">
                  <Check size={15} className="perk-icon" />
                  <span>तुरंत पुष्टिकरण</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PATRIOTIC FOOTER: Preserved */}
      <footer className="footer" id="footer">
        <div className="tricolor-thread" />
        <div className="footer-inner">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-logo-wrap">
              <img src="/logo-clean.png" alt="शौर्य दौड़" className="footer-logo" />
              <div className="footer-brand-text">
                <span className="brand-title">शौर्य दौड़</span>
                <span className="brand-sub">RUN. REMEMBER. RESPECT.</span>
              </div>
            </div>
            <p className="footer-bio">
              देश के वीर सपूतों और भारत की अदम्य भावना को समर्पित एक ऐतिहासिक 11 किमी मैराथन। 
              एक कदम स्वस्थ, सशक्त और एकजुट भारत की ओर।
            </p>
            <div className="footer-badge-flag">
              <span>🇮🇳 भारतीय स्वाभिमान की दौड़</span>
            </div>
          </div>

          {/* Event Details Col */}
          <div className="footer-col">
            <h4 className="footer-col-title">इवेंट विवरण (EVENT)</h4>
            <ul className="footer-info-list">
              <li>
                <CalendarDays size={16} />
                <div>
                  <strong>28 सितंबर, 2026</strong>
                  <span>सोमवार · सुबह 05:30 बजे</span>
                </div>
              </li>
              <li>
                <MapPin size={16} />
                <div>
                  <strong>शौर्य चौक, भोपाल</strong>
                  <span>मध्य प्रदेश, भारत</span>
                </div>
              </li>
              <li>
                <Medal size={16} />
                <div>
                  <strong>11 किमी मुख्य दौड़</strong>
                  <span>18+ वर्ष · आधिकारिक रूप से टाइम्ड</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation Links Col */}
          <div className="footer-col">
            <h4 className="footer-col-title">त्वरित लिंक्स (LINKS)</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => scrollTo("about")}>हमारे बारे में (About)</button></li>
              <li><button onClick={() => scrollTo("categories")}>दौड़ श्रेणियाँ (Categories)</button></li>
              <li><button onClick={() => scrollTo("details")}>मुख्य बिंदु (Event Info)</button></li>
              <li><button onClick={() => scrollTo("route")}>दौड़ मार्ग (Route)</button></li>
              <li><button onClick={() => scrollTo("films")}>इवेंट फ़िल्म्स (Films)</button></li>
              <li><button onClick={() => scrollTo("gallery")}>गैलरी (Gallery)</button></li>
              <li><button onClick={() => scrollTo("news")}>समाचार (News)</button></li>
              <li><button onClick={() => scrollTo("sponsors")}>भागीदार (Sponsors)</button></li>
              <li><button onClick={() => scrollTo("contact")}>संपर्क (Contact)</button></li>
            </ul>
          </div>

          {/* Contact / Helpdesk Col */}
          <div className="footer-col">
            <h4 className="footer-col-title">हेल्पडेस्क व संपर्क</h4>
            <p className="footer-contact-note">किसी भी प्रश्न या सहायता के लिए संपर्क करें:</p>
            <div className="footer-phones">
              <a href="tel:+917691949999" className="footer-phone-link">
                <Phone size={14} /> 76919 49999
              </a>
              <a href="tel:+917771888651" className="footer-phone-link">
                <Phone size={14} /> 77718 88651
              </a>
              <a href="tel:+918708584578" className="footer-phone-link">
                <Phone size={14} /> 87085 84578
              </a>
            </div>
            <button className="footer-reg-btn" onClick={() => goRegister("11k")}>
              रजिस्ट्रेशन करें <MoveRight size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2026 <b>शौर्य दौड़ (Shaurya Daur)</b>. सर्वाधिकार सुरक्षित।
          </div>
          <div className="footer-national-tag">
            Made with pride in India · जय हिन्द 🇮🇳
          </div>
        </div>
      </footer>
    </div>
  );
}

function Registration({ initialCategory = "11k" }) {
  const formWrapRef = useRef(null);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (formWrapRef.current) {
      formWrapRef.current.scrollTop = 0;
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const activeCategory =
    categoriesData.find((c) => c.id === selectedCategory) || categoriesData[0];
  const savings = activeCategory.originalPrice - activeCategory.price;

  const nextStep = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (formWrapRef.current) {
      formWrapRef.current.scrollTop = 0;
    }
  };

  const backToHome = () => {
    window.location.hash = "";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

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
              हमें आपका पंजीकरण प्राप्त हो गया है। आपके बीब और टाइमिंग चिप का विवरण आपके ईमेल पर भेजा जा रहा है।
            </p>
          </div>
          <div className="art-bottom">
            28 सितंबर 2026 <i>✦</i> सुबह 05:30 बजे
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
              <strong>{activeCategory.name}</strong> के लिए आपकी प्रविष्टि सफलतापूर्वक दर्ज हो चुकी है। सभी ताज़ा अपडेट्स के लिए अपना ईमेल इनबॉक्स देखते रहें।
            </p>
            <div className="success-summary">
              <div>
                <small>दौड़ श्रेणी</small>
                <b>{activeCategory.name}</b>
              </div>
              <div>
                <small>कुल दूरी</small>
                <b>{activeCategory.distance}</b>
              </div>
              <div>
                <small>भुगतान राशि</small>
                <b>₹{activeCategory.price}</b>
              </div>
              <div>
                <small>रेफ़रेंस आईडी</small>
                <b>SD26-{Date.now().toString().slice(-6)}</b>
              </div>
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
          <span className="reg-eyebrow">शौर्य दौड़ 2026 · 11 किमी · भोपाल</span>
          <h1>
            शौर्य दौड़ के लिए<br />
            <em>पंजीकरण करें।</em>
          </h1>
          <p>एक फ़ॉर्म। एक फ़ैसला। एक ऐसी सुबह जिसे आप ज़िंदगी भर याद रखेंगे।</p>

          <div className="reg-event-info">
            <div className="reg-info-item">
              <CalendarDays size={18} />
              <div>
                <small>इवेंट तारीख</small>
                <b>28 सितंबर 2026</b>
              </div>
            </div>
            <div className="reg-info-item">
              <Clock3 size={18} />
              <div>
                <small>फ्लैग ऑफ</small>
                <b>सुबह 05:30 बजे · शौर्य चौक</b>
              </div>
            </div>
            <div className="reg-info-item">
              <MapPin size={18} />
              <div>
                <small>दौड़ स्थल</small>
                <b>भोपाल, मध्य प्रदेश</b>
              </div>
            </div>
            <div className="reg-info-item">
              <Phone size={18} />
              <div>
                <small>हेल्पडेस्क</small>
                <b>76919 49999</b>
              </div>
            </div>
          </div>
        </div>
        <div className="art-bottom">
          28 सितंबर 2026 <i>✦</i> सुबह 05:30 बजे
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
            <small>विवरण (Details)</small>
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
              <span className="form-step">चरण 1 / 3</span>
              <h2>
                अपनी दौड़ श्रेणी<br />
                <em>चुनें।</em>
              </h2>
              <p>
                अपनी क्षमता और उत्साह के अनुसार दूरी चुनें। सभी श्रेणियाँ आधिकारिक पदक व किट के साथ उपलब्ध हैं।
              </p>
            </div>

            <div className="category-list">
              {categoriesData.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-card ${selectedCategory === cat.id ? "selected" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {/* {cat.earlyBird && (
                    <span className="category-badge">{cat.badge || "अर्ली बर्ड"}</span>
                  )} */}
                  <div className="category-head">
                    <div>
                      <h3>{cat.name}</h3>
                      <small>{cat.distance}</small>
                    </div>
                    <div className="category-price">
                      {cat.originalPrice > cat.price && (
                        <s>₹{cat.originalPrice}</s>
                      )}
                      <b>₹{cat.price}</b>
                    </div>
                  </div>
                  <p className="category-eligibility">{cat.eligibility}</p>
                  <ul className="category-includes">
                    {cat.includes.slice(0, 3).map((inc) => (
                      <li key={inc}>
                        <Check size={14} /> {inc}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
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

        {/* STEP 2 — Participant details */}
        {step === 2 && (
          <div className="reg-step-content">
            <div className="form-heading">
              <span className="form-step">चरण 2 / 3</span>
              <h2>
                प्रतिभागी का विवरण<br />
                <em>भरें।</em>
              </h2>
              <p>हम आपका स्थान सुरक्षित करेंगे और पुष्टि आपके ईमेल पर भेजेंगे।</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                nextStep();
              }}
            >
              <label>
                पूरा नाम (FULL NAME)
                <input required placeholder="उदा. अर्जुन शर्मा" />
              </label>
              <div className="form-row">
                <label>
                  ईमेल पता (EMAIL ADDRESS)
                  <input required type="email" placeholder="you@email.com" />
                </label>
                <label>
                  मोबाइल नंबर (PHONE NUMBER)
                  <input required type="tel" placeholder="+91 98765 43210" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  जन्मतिथि (DATE OF BIRTH)
                  <input required type="date" />
                </label>
                <label>
                  लिंग (GENDER)
                  <select defaultValue="" required>
                    <option value="" disabled>
                      चुनें (Select)
                    </option>
                    <option>पुरुष (Male)</option>
                    <option>महिला (Female)</option>
                    <option>अन्य (Prefer not to say)</option>
                  </select>
                </label>
              </div>
              <div className="form-row">
                <label>
                  राज्य / केंद्र शासित प्रदेश (STATE / UT)
                  <select required defaultValue="">
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
                  शहर (CITY)
                  <input required placeholder="उदा. भोपाल / इंदौर / ग्वालियर" />
                </label>
              </div>
              <label>
                आपातकालीन संपर्क नंबर (EMERGENCY CONTACT)
                <input required type="tel" placeholder="+91 98765 43210" />
              </label>
              <label>
                दौड़ का अनुभव (RUNNING EXPERIENCE)
                <select defaultValue="">
                  <option value="" disabled>
                    अपना अनुभव बताएं
                  </option>
                  <option>पहली बार दौड़ रहे हैं (First ever run)</option>
                  <option>नियमित धावक (Casual runner)</option>
                  <option>अनुभवी मैराथनर (Regular marathoner)</option>
                </select>
              </label>

              <div className="reg-step-actions">
                <button
                  type="button"
                  className="ghost-button"
                  onClick={prevStep}
                >
                  <ChevronLeft size={17} /> पीछे (Back)
                </button>
                <button type="submit" className="primary-button">
                  आगे बढ़ें (Continue) <ArrowRight size={19} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3 — Review & confirm */}
        {step === 3 && (
          <div className="reg-step-content">
            <div className="form-heading">
              <span className="form-step">चरण 3 / 3</span>
              <h2>
                समीक्षा और<br />
                <em>पुष्टि करें।</em>
              </h2>
              <p>अंतिम नज़र डालें — और आप शुरुआती रेखा (Starting Line) पर होंगे।</p>
            </div>

            <div className="summary-block">
              <h3>{activeCategory.name}</h3>
              <small>
                {activeCategory.distance} · {activeCategory.eligibility}
              </small>
              <ul className="summary-includes">
                {activeCategory.includes.map((inc) => (
                  <li key={inc}>
                    <Check size={14} /> {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>प्रवेश शुल्क (Entry Fee)</span>
                <b>₹{activeCategory.originalPrice}</b>
              </div>
              {savings > 0 && (
                <div className="price-row discount">
                  <span>अर्ली बर्ड छूट (Early Bird Discount)</span>
                  <b>– ₹{savings}</b>
                </div>
              )}
              <div className="price-row total">
                <span>कुल देय राशि (Total Payable)</span>
                <b>₹{activeCategory.price}</b>
              </div>
            </div>

            <label className="check-label">
              <input type="checkbox" required />
              <span>
                मैं 18 वर्ष या उससे अधिक हूँ और इवेंट के नियमों व शर्तों से सहमत हूँ।
              </span>
            </label>
            <label className="check-label">
              <input type="checkbox" required />
              <span>
                मैं पुष्टि करता/करती हूँ कि मैं इस दौड़ में भाग लेने के लिए चिकित्सीय रूप से पूरी तरह फिट हूँ।
              </span>
            </label>

            <form onSubmit={handleSubmit}>
              <div className="reg-step-actions">
                <button
                  type="button"
                  className="ghost-button"
                  onClick={prevStep}
                >
                  <ChevronLeft size={17} /> पीछे (Back)
                </button>
                <button type="submit" className="primary-button">
                  ₹{activeCategory.price} भुगतान करें और रजिस्टर करें{" "}
                  <ArrowRight size={19} />
                </button>
              </div>
              <p className="secure-note">
                <ShieldCheck size={16} /> आपका विवरण और भुगतान 100% सुरक्षित है।
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
