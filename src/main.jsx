import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  Clock3,
  Flag,
  HeartHandshake,
  MapPin,
  Menu,
  Medal,
  MoveRight,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import "./styles.css";

const benefits = [
  {
    icon: Medal,
    title: "A medal with meaning",
    copy: "Carry home a keepsake of the courage you found on the road.",
  },
  {
    icon: Users,
    title: "A crowd that carries you",
    copy: "Run alongside people who believe that every step counts.",
  },
  {
    icon: HeartHandshake,
    title: "A cause worth showing up for",
    copy: "A healthier, stronger India starts with a single choice.",
  },
];

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
  const [registration, setRegistration] = useState(
    window.location.hash === "#register",
  );
  useEffect(() => {
    const onHash = () => setRegistration(window.location.hash === "#register");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return registration ? <Registration /> : <Home />;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const goRegister = () => {
    window.location.hash = "register";
    setMenuOpen(false);
  };
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <div className="site-shell">
      <header className="new-nav">
        <a className="new-brand" href="/" aria-label="Home">
          <img src="/logo-clean.png" alt="Logo" className="brand-logo-img" />
          <div className="new-brand-text">
            <b>शौर्य दौड़</b>
            <small>स्वस्थ युवा • सशक्त भारत</small>
          </div>
        </a>
        <nav className={menuOpen ? "new-nav-links open" : "new-nav-links"}>
          <button className="active" onClick={() => scrollTo("home")}>Home</button>
          <button onClick={() => scrollTo("about")}>About Us</button>
          <button onClick={() => scrollTo("details")}>Event Details</button>
          <button onClick={() => scrollTo("categories")}>Categories</button>
          <button onClick={() => scrollTo("gallery")}>Gallery</button>
          <button onClick={() => scrollTo("news")}>News</button>
          <button onClick={() => scrollTo("contact")}>Contact Us</button>
        </nav>
        <div className="nav-right-actions">
          <button className="new-nav-cta" onClick={goRegister}>
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
                <button className="btn-hero-register" onClick={goRegister}>
                  Register Now <ArrowRight size={16} strokeWidth={2.5} />
                </button>
                <button className="btn-hero-details" onClick={() => scrollTo("details")}>
                  View Details <span className="play-triangle">▶</span>
                </button>
              </div>
            </div>

            {/* Right Emblem & Poetic Quote Column */}
            <div className="new-hero-right">
              <div className="hero-emblem-wrap">
                <img src="/logo-clean.png" alt="शौर्य दौड़ प्रतीक" className="hero-emblem-img" />
              </div>
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

        {/* TRICOLOR THREAD & ABOUT SECTION */}
        <div className="tricolor-thread"></div>

        <section className="about-section-wrap" id="about">
          <div className="about-section">
            <div className="about-copy">
              <div className="about-badge">
                <span className="about-badge-dot"></span>
                <span className="about-badge-text">आयोजन तिथि: 28 सितंबर, 2026 (सोमवार) · हावड़ा ब्रिज, कोलकाता</span>
              </div>

              <div className="about-eyebrow">जय बालाजी ग्रुप</div>
              <h2 className="about-heading">शौर्य दौड़ के बारे में — स्वस्थ युवा, सशक्त भारत</h2>
              <p className="about-para">
                शौर्य दौड़ देश के वीरों को समर्पित एक दौड़ है, जो हावड़ा ब्रिज के ऐतिहासिक मार्ग पर आयोजित की जाएगी।
                11 किलोमीटर की यह दौड़ फिट इंडिया आंदोलन की भावना को आगे बढ़ाते हुए युवा शक्ति और राष्ट्र शक्ति का उत्सव मनाती है।
                हर कदम इतिहास से प्रेरणा लेकर एक स्वस्थ और सशक्त भारत के निर्माण की ओर बढ़ता है।
              </p>

              <div className="stat-chips">
                <div className="stat-chip">
                  <div className="stat-chip-ring">18+</div>
                  <div className="stat-chip-text">
                    <div className="num">आयु सीमा</div>
                    <div className="lbl">18 वर्ष और अधिक</div>
                  </div>
                </div>
                <div className="stat-chip">
                  <div className="stat-chip-ring">11</div>
                  <div className="stat-chip-text">
                    <div className="num">दूरी</div>
                    <div className="lbl">11 km</div>
                  </div>
                </div>
                <div className="stat-chip">
                  <div className="stat-chip-ring">₹</div>
                  <div className="stat-chip-text">
                    <div className="num">पंजीकरण शुल्क</div>
                    <div className="lbl">₹ 1100/-</div>
                  </div>
                </div>
              </div>

              <div className="about-actions">
                <button onClick={goRegister} className="register-cta">
                  अभी पंजीकरण करें →
                </button>
                <button onClick={() => scrollTo("details")} className="read-more-link">
                  पूरी जानकारी देखें →
                </button>
              </div>
            </div>

            <div className="about-media">
              <div className="media-frame">
                <button className="play-badge" onClick={() => scrollTo("films")} aria-label="Play video">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path d="M2 2L18 12L2 22V2Z" fill="#6E1423"/>
                  </svg>
                </button>
                <div className="media-caption">
                  <div className="tag">शौर्य दौड़ 2026</div>
                  <div className="title">देश के वीरों को समर्पित एक दौड़</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FILMS SECTION: See what happens when we run together */}
        <section className="film-section" id="films">
          <div className="film-eyebrow">
            <span className="dot"></span> शौर्य दौड़ फिल्म
          </div>

          <h2 className="film-heading">
            देखिए क्या होता है<br />
            <span className="accent">जब हम साथ दौड़ते हैं।</span>
          </h2>

          <p className="film-desc">
            पहले कदम से पहले एक एहसास होता है — एक शहर की जागती धड़कन, भीड़ की एक साझा लय,
            और हर कहानी का इंतज़ार करती एक फिनिश लाइन।
          </p>

          <div className="film-grid">
            <div className="film-card">
              <div
                className="film-thumb"
                onClick={() => setPlayingVideo(playingVideo === "ScMzIvxBSi4" ? null : "ScMzIvxBSi4")}
              >
                {playingVideo === "ScMzIvxBSi4" ? (
                  <iframe
                    src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0"
                    title="शौर्य दौड़ की आत्मा"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ width: '100%', height: '100%', border: 0 }}
                  />
                ) : (
                  <>
                    <div className="film-play">
                      <svg width="24" height="28" viewBox="0 0 20 24" fill="currentColor">
                        <path d="M2 2L18 12L2 22V2Z" />
                      </svg>
                    </div>
                    <div className="film-duration">2:14</div>
                  </>
                )}
              </div>
              <div
                className="film-body"
                onClick={() => setPlayingVideo(playingVideo === "ScMzIvxBSi4" ? null : "ScMzIvxBSi4")}
              >
                <div>
                  <div className="film-tag">EVENT FILM · 2026</div>
                  <div className="film-title">शौर्य दौड़ की आत्मा</div>
                </div>
                <div className="film-arrow">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <div className="film-card">
              <div
                className="film-thumb"
                onClick={() => setPlayingVideo(playingVideo === "ysz5S6PUM-U" ? null : "ysz5S6PUM-U")}
              >
                {playingVideo === "ysz5S6PUM-U" ? (
                  <iframe
                    src="https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1&rel=0"
                    title="हर कदम, एक साझा कहानी"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ width: '100%', height: '100%', border: 0 }}
                  />
                ) : (
                  <>
                    <div className="film-play">
                      <svg width="24" height="28" viewBox="0 0 20 24" fill="currentColor">
                        <path d="M2 2L18 12L2 22V2Z" />
                      </svg>
                    </div>
                    <div className="film-duration">1:48</div>
                  </>
                )}
              </div>
              <div
                className="film-body"
                onClick={() => setPlayingVideo(playingVideo === "ysz5S6PUM-U" ? null : "ysz5S6PUM-U")}
              >
                <div>
                  <div className="film-tag">COMMUNITY FILM · 2026</div>
                  <div className="film-title">हर कदम, एक साझा कहानी</div>
                </div>
                <div className="film-arrow">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE ROUTE */}
        <section className="route-section" id="route">
          <div className="route-dots" aria-hidden="true" />
          <div className="route-watermark" aria-hidden="true">
            11K
          </div>

          <div className="route-heading">
            <div className="section-heading">
              <h2>
                पूरा शहर बनेगा
                <br />
                <em>आपकी फिनिश लाइन।</em>
              </h2>
              <p className="body-copy">
                एक सुबह। भोपाल के दिल से गुज़रता एक अविस्मरणीय लूप। दौड़िए, और उस एहसास के लिए रुक जाइए।
              </p>
            </div>
          </div>

          <div className="route-card">
            <div className="route-timeline">
              <div className="route-stop start">
                <div className="route-marker">
                  <i />
                </div>
                <div className="route-stop-body">
                  <span className="route-stop-time">शुरुआत · सुबह 05:30 बजे</span>
                  <span className="route-stop-name">शौर्य चौक</span>
                  <p className="route-stop-note">
                    फ्लैग-ऑफ पॉइंट · हाइड्रेशन स्टेशन #1 · एकत्रण स्थल
                  </p>
                </div>
              </div>

              <div className="route-stop">
                <div className="route-marker">
                  <i />
                </div>
                <div className="route-stop-body">
                  <span className="route-stop-time">चेकपॉइंट · सुबह 06:15 बजे</span>
                  <span className="route-stop-name">अपर लेक</span>
                  <p className="route-stop-note">
                    झील किनारे का सुंदर मार्ग · चीयरिंग ज़ोन · मेडिकल सहायता
                  </p>
                </div>
              </div>

              <div className="route-stop">
                <div className="route-marker">
                  <i />
                </div>
                <div className="route-stop-body">
                  <span className="route-stop-time">चेकपॉइंट · सुबह 07:20 बजे</span>
                  <span className="route-stop-name">पुराना भोपाल</span>
                  <p className="route-stop-note">
                    ऐतिहासिक इलाक़ा · लाइव संगीत · एनर्जी ड्रिंक्स
                  </p>
                </div>
              </div>

              <div className="route-stop finish">
                <div className="route-marker">
                  <i />
                </div>
                <div className="route-stop-body">
                  <span className="route-stop-time">समापन · सुबह 08:30 बजे</span>
                  <span className="route-stop-name">शौर्य चौक</span>
                  <p className="route-stop-note">
                    पदक समारोह · फोटो वॉल · रिकवरी ज़ोन
                  </p>
                </div>
              </div>
            </div>

            <div className="route-map-panel">
              <div className="map-shape">
                <span className="map-road r1" />
                <span className="map-road r2" />
                <span className="map-road r3" />
                <MapPin className="map-pin one" size={20} />
                <MapPin className="map-pin two" size={20} />
                <span className="map-label l1">आईएसबीटी</span>
                <span className="map-label l2">अपर लेक</span>
                <span className="map-label l3">पुराना भोपाल</span>
              </div>

              <div className="route-map-stats">
                <span>
                  <b>11.0 किमी</b>
                  <small>शहर जितनी बड़ी चुनौती</small>
                </span>
                <span>
                  <b>02:30 घंटे</b>
                  <small>अधिकतम समय</small>
                </span>
                <span>
                  <b>+ 15</b>
                  <small>हाइड्रेशन पॉइंट्स</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* EVENT DETAILS: Everything you need to know */}
        <section className="info-section" id="details">
          <div className="info-section-inner">
            <div className="info-eyebrow">जो कुछ जानना ज़रूरी है</div>
            <h2 className="info-heading">
              दौड़ने आइए।<br />
              <span className="accent">बाकी हम संभाल लेंगे।</span>
            </h2>

            <div className="info-card-grid">
              <div className="info-detail-card">
                <div className="info-card-icon">
                  <Medal size={26} strokeWidth={2.2} />
                </div>
                <div className="info-card-title">एक सार्थक पदक</div>
                <div className="info-card-desc">सड़क पर पाई गई हिम्मत की एक निशानी घर ले जाइए।</div>
              </div>

              <div className="info-detail-card">
                <div className="info-card-icon">
                  <Users size={26} strokeWidth={2.2} />
                </div>
                <div className="info-card-title">साथ देने वाली भीड़</div>
                <div className="info-card-desc">उन लोगों के साथ दौड़िए जो हर कदम को मायने देते हैं।</div>
              </div>

              <div className="info-detail-card">
                <div className="info-card-icon">
                  <HeartHandshake size={26} strokeWidth={2.2} />
                </div>
                <div className="info-card-title">एक सार्थक उद्देश्य</div>
                <div className="info-card-desc">एक स्वस्थ, सशक्त भारत की शुरुआत आपके एक कदम से होती है।</div>
              </div>

              <div className="info-detail-card">
                <div className="info-card-icon">
                  <ShieldCheck size={26} strokeWidth={2.2} />
                </div>
                <div className="info-card-title">सुरक्षित और प्रमाणित मार्ग</div>
                <div className="info-card-desc">पूरी तरह सुरक्षित, चिकित्सा सहायता से लैस दौड़ मार्ग।</div>
              </div>
            </div>

            <div className="date-bar">
              <div className="date-bar-left">
                <CalendarDays size={20} strokeWidth={2.4} /> अपनी तारीख तय करें
              </div>
              <div className="date-bar-center">
                <div className="day">28</div>
                <div className="month">सितंबर, 2026</div>
              </div>
              <div className="date-bar-right">
                <MapPin size={18} strokeWidth={2.4} /> हावड़ा ब्रिज, कोलकाता
              </div>
            </div>
          </div>
        </section>

        {/* RACE CATEGORIES */}
        <section className="categories-section" id="categories">
          <div className="tab-strip"><div className="tab"></div></div>
          <div className="skyline">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <path d="M0 120 L0 90 L40 90 L40 70 L60 70 L60 90 L120 90 L140 40 L160 90 L220 90 L240 60 L280 60 L300 90 L380 90 L400 30 L420 90 L500 90 L550 50 L600 90 L700 90 L720 40 L760 40 L780 90 L850 90 L880 60 L920 60 L950 90 L1020 90 L1050 45 L1080 90 L1150 90 L1200 90 L1200 120 Z" fill="#ffffff" />
            </svg>
          </div>

          <div className="categories-inner">
            <div className="cat-heading">
              <span className="hi">रेस कैटेगरी</span>
              <span className="yr">2026</span>
            </div>
            <div className="cat-sub">#शौर्यदौड़चलो</div>

            <div className="cat-feature">
              <img className="cat-feature-photo" src="/event-banner.png" alt="शौर्य दौड़ 11 KM" />
              <div className="cat-feature-body">
                <div className="cat-feature-tag">
                  <Flag size={14} strokeWidth={2.5} /> मुख्य श्रेणी
                </div>
                <div className="cat-feature-title">
                  शौर्य दौड़ <span>11 KM</span>
                </div>
                <div className="cat-feature-desc">
                  देश के वीरों को समर्पित मुख्य दौड़ — हावड़ा ब्रिज के ऐतिहासिक मार्ग पर
                  11 किलोमीटर की चुनौती। फिट इंडिया आंदोलन की भावना को आगे बढ़ाते हुए
                  हर आयु वर्ग के धावकों के लिए खुली यह श्रेणी युवा शक्ति और राष्ट्र
                  शक्ति का उत्सव है।
                </div>

                <div className="cat-feature-stats">
                  <div className="cat-feature-stat">
                    <div className="num">11 km</div>
                    <div className="lbl">दूरी</div>
                  </div>
                  <div className="cat-feature-stat">
                    <div className="num">18+</div>
                    <div className="lbl">आयु सीमा</div>
                  </div>
                  <div className="cat-feature-stat">
                    <div className="num">₹1100</div>
                    <div className="lbl">पंजीकरण शुल्क</div>
                  </div>
                  <div className="cat-feature-stat">
                    <div className="num">28 सित.</div>
                    <div className="lbl">आयोजन तिथि</div>
                  </div>
                </div>

                <button onClick={goRegister} className="cat-feature-cta">
                  अभी पंजीकरण करें <ArrowRight size={17} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SPONSORS & PARTNERS: Stronger when we show up */}
        <section className="sponsors-section" id="sponsors">
          <div className="sponsors-eyebrow">एक साथ निर्मित</div>
          <h2 className="sponsors-heading">
            मजबूत तब होते हैं<br />
            <span className="accent">जब हम साथ खड़े होते हैं।</span>
          </h2>
          <p className="sponsors-sub">
            यह दौड़ उन संस्थाओं की वजह से संभव हो पाई है, जो मानते हैं कि एक स्वस्थ भारत
            की शुरुआत सक्रिय और जुड़े हुए समुदायों से होती है।
          </p>

          <div className="sponsors-group-heading">प्रमुख प्रायोजक</div>
          <div className="sponsors-tile-grid">
            {sponsors.map(([name, site, href, image]) => (
              <a
                className="sponsor-tile"
                href={href}
                target="_blank"
                rel="noreferrer"
                key={name}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="tile-overlay" />
                <div className="tile-link-icon">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </div>
                <div className="sponsor-tile-content">
                  <div className="tile-name">{name}</div>
                  <div className="tile-sub">{site}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="sponsors-group-heading">सामुदायिक भागीदार</div>
          <div className="sponsors-tile-grid">
            {partners.map(([name, role, image]) => (
              <div
                className="sponsor-tile"
                key={name}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="tile-overlay" />
                <div className="tile-link-icon">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </div>
                <div className="sponsor-tile-content">
                  <div className="tile-name">{name}</div>
                  <div className="tile-sub">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL HERO CTA: YOUR NEXT CHAPTER STARTS HERE */}
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
                YOUR NEXT CHAPTER
                <br />
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
                <button className="cta-primary-btn" onClick={goRegister}>
                  <span>अभी रजिस्टर करें · REGISTER NOW</span>
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
                <a href="#details" className="cta-secondary-link">
                  इवेंट की जानकारी देखें <MoveRight size={16} />
                </a>
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

      {/* PATRIOTIC FOOTER */}
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
                  <span>रविवार · सुबह 05:30 बजे</span>
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
              <li><a href="#about">हमारे बारे में (About)</a></li>
              <li><a href="#categories">दौड़ श्रेणियाँ (Categories)</a></li>
              <li><a href="#films">इवेंट फ़िल्म्स (Films)</a></li>
              <li><a href="#details">मुख्य बिंदु (Event Info)</a></li>
              <li><a href="#route">दौड़ मार्ग (Route)</a></li>
              <li><a href="#sponsors">भागीदार (Sponsors)</a></li>
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
            <button className="footer-reg-btn" onClick={goRegister}>
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

function Registration() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("11k");
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    {
      id: "11k",
      name: "शौर्य 11K (Shaurya 11K)",
      distance: "11 किमी (11 KM)",
      eligibility: "18 वर्ष और अधिक | सभी के लिए खुली",
      price: 1100,
      originalPrice: 1400,
      earlyBird: true,
      badge: "अर्ली बर्ड छूट",
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
      distance: "5 किमी (5 KM)",
      eligibility: "14 वर्ष और अधिक | सभी के लिए खुली",
      price: 700,
      originalPrice: 900,
      earlyBird: true,
      badge: "अर्ली बर्ड छूट",
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
      distance: "3 किमी (3 KM Non-timed)",
      eligibility: "12 वर्ष और अधिक | सभी के लिए खुली",
      price: 400,
      originalPrice: 500,
      earlyBird: false,
      badge: null,
      includes: ["आधिकारिक बीब नंबर", "ड्राई-फिट टी-शर्ट"],
    },
  ];

  const activeCategory = categories.find((c) => c.id === selectedCategory);
  const savings = activeCategory.originalPrice - activeCategory.price;

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="registration-page">
        <div className="registration-art">
          <div className="registration-art-bg" aria-hidden="true" />
          <a className="back-link" href="/">
            <ChevronLeft size={18} /> होमपेज पर वापस जाएँ
          </a>
          <div className="registration-left-content">
            <span className="reg-eyebrow">पंजीकरण पुष्ट · REGISTRATION CONFIRMED</span>
            <h1>
              आप शुरुआती रेखा
              <br />
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
        <div className="registration-form-wrap">
          <div className="success-state">
            <div className="success-icon">
              <Check size={36} strokeWidth={3} />
            </div>
            <h2>
              पंजीकरण के लिए
              <br />
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
            <a href="/" className="primary-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', margin: '24px auto 0' }}>
              होमपेज पर वापस जाएँ <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page">
      {/* LEFT: Event info + emblem bg */}
      <div className="registration-art">
        <div className="registration-art-bg" aria-hidden="true" />
        <a className="back-link" href="/">
          <ChevronLeft size={18} /> होमपेज पर वापस जाएँ
        </a>
        <div className="registration-left-content">
          <span className="reg-eyebrow">शौर्य दौड़ 2026 · 11 किमी · भोपाल</span>
          <h1>
            शौर्य दौड़ के लिए
            <br />
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
      <div className="registration-form-wrap">
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
                अपनी दौड़ श्रेणी
                <br />
                <em>चुनें।</em>
              </h2>
              <p>
                अपनी क्षमता और उत्साह के अनुसार दूरी चुनें। सभी श्रेणियाँ टाइम्ड हैं और इनमें आधिकारिक पदक शामिल हैं।
              </p>
            </div>

            <div className="category-list">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-card ${selectedCategory === cat.id ? "selected" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.earlyBird && (
                    <span className="category-badge">{cat.badge || "अर्ली बर्ड"}</span>
                  )}
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
                प्रतिभागी का विवरण
                <br />
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
              <label>
                शहर / राज्य (CITY / STATE)
                <input required placeholder="उदा. भोपाल, मध्य प्रदेश" />
              </label>
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
                समीक्षा और
                <br />
                <em>पुष्टि करें।</em>
              </h2>
              <p>अंतिम नज़र डालें — और आप शुरुआती रेखा (Starting Line) पर होंगे।</p>
            </div>

            {/* Category summary */}
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

            {/* Price breakdown */}
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
