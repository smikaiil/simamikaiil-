'use client'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const speeds = [0.04, 0.06, 0.03, 0.05]
    let rafId: number
    let currentY = 0

    const update = () => {
      const strips = document.querySelectorAll<HTMLElement>('.logo-svg-inner')
      speeds.forEach((speed, i) => {
        if (strips[i]) strips[i].style.transform = `translateY(${-currentY * speed}px)`
      })
    }

    const onScroll = () => {
      currentY = window.scrollY
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300;1,400;1,700;1,800&display=swap');

        :root {
          --red:    #E63946;
          --blue:   #1D3557;
          --yellow: #F4A261;
          --green:  #2A9D8F;
          --orange: #E76F51;
          --cream:  #FAF3E0;
          --cream2: #EFE4C8;
          --dark:   #264653;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--cream);
          color: var(--dark);
          font-family: 'Nunito', sans-serif;
          overflow-x: hidden;
        }

        /* ──────────── HEADER ──────────── */
        .hdr {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px;
          background: rgba(250,243,224,0.90);
          backdrop-filter: blur(18px);
        }

        /* LOGO */
        .logo { display: flex; align-items: center; gap: 0; text-decoration: none; }
        .logo-strip-group { display: flex; align-items: flex-end; gap: 0; }
        .logo-letter-box {
          height: 34px;
          overflow: hidden; position: relative; flex-shrink: 0;
        }
        .logo-svg-inner {
          position: absolute; top: 0; left: 0;
          will-change: transform;
        }
        .logo-mikaiil {
          font-family: 'Nunito', sans-serif;
          font-size: 1.1rem; font-weight: 700;
          color: #264653; letter-spacing: -0.01em;
          margin-left: 6px;
          align-self: flex-end;
          padding-bottom: 2px;
          flex-shrink: 0;
        }

        /* NAV */
        .nav { display: flex; gap: 8px; }
        .npill {
          padding: 9px 22px;
          background: var(--dark); color: var(--cream);
          border-radius: 100px;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          text-decoration: none;
          transition: background 0.22s;
        }
        .npill:hover { background: var(--red); }

        /* ──────────── INTRO TEXT ──────────── */
        .intro {
          padding: 80px 4px 4px;
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 8px;
        }
        .intro-eyebrow {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: var(--red); padding-left: 8px;
        }
        .intro-desc {
          font-size: 0.9rem;
          line-height: 1.75; font-weight: 400;
          color: var(--dark); opacity: 0.55;
          max-width: 440px; padding-left: 8px;
        }
        .intro-desc strong { font-weight: 800; opacity: 1; }

        /* ──────────── MOSAIC GRID ──────────── */
        .mosaic-cols {
          display: flex;
          gap: 4px; align-items: flex-start;
        }
        .mosaic-cols > div { flex: 1; }
        .col-right { padding-top: 80px; }

        /* ──────────── CARD ──────────── */
        .card {
          border-radius: 20px; overflow: hidden;
          position: relative; margin-bottom: 4px;
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .card:hover { transform: scale(0.985); }

        .card-shapes {
          position: absolute; inset: 0; overflow: hidden;
          transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .card:hover .card-shapes { transform: scale(1.1) rotate(5deg); }
        .card-shapes svg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
        }

        .card-num {
          position: absolute; top: 22px; right: 22px;
          font-size: 0.64rem; font-weight: 700;
          letter-spacing: 0.1em; color: white;
          opacity: 0.28; z-index: 2;
        }

        .card-badge {
          position: absolute; bottom: 22px; left: 22px;
          background: white; border-radius: 100px;
          padding: 10px 18px; z-index: 2;
        }
        .badge-title {
          font-size: 0.84rem; font-weight: 700;
          color: var(--dark); line-height: 1.2;
        }
        .badge-sub {
          font-size: 0.67rem; color: var(--dark);
          opacity: 0.4; font-weight: 500; margin-top: 2px;
        }

        /* ──────────── ABOUT CARD ──────────── */
        .about-card {
          background: var(--cream2);
          border-radius: 20px; overflow: hidden;
          position: relative; margin-bottom: 4px;
          padding: 36px 32px 40px;
          display: flex; flex-direction: column; gap: 24px;
          cursor: default;
        }
        .about-photo-blob {
          width: 100%; aspect-ratio: 4/3;
          border-radius: 40% 60% 55% 45% / 50% 40% 60% 50%;
          object-fit: cover; display: block;
        }
        .about-card-eyebrow {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: var(--red); margin-bottom: 8px;
        }
        .about-card-h {
          font-size: clamp(1.5rem, 2.8vw, 2.2rem);
          font-weight: 900; line-height: 0.96;
          letter-spacing: -0.04em; color: var(--dark); margin-bottom: 14px;
        }
        .about-card-h em { font-style: italic; color: var(--red); }
        .about-card-p { font-size: 0.84rem; line-height: 1.78; opacity: 0.62; margin-bottom: 10px; }
        .skills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .skill-tag {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 7px 14px; border-radius: 100px; border: 1.5px solid;
          transition: transform 0.2s;
        }
        .skill-tag:hover { transform: scale(1.06); }

        /* ──────────── SERVICE CARDS ──────────── */
        .svc-card {
          border-radius: 20px; padding: 32px 26px; height: 260px;
          display: flex; flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s;
          margin-bottom: 4px;
          cursor: pointer;
        }
        .svc-card:hover { transform: scale(0.985); }
        .svc-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,255,255,0.18);
          display: flex; align-items: center;
          justify-content: center; font-size: 1rem;
        }
        .svc-name { font-size: 0.98rem; font-weight: 800; line-height: 1.2; margin-bottom: 6px; }
        .svc-sub  { font-size: 0.7rem; opacity: 0.62; line-height: 1.6; font-weight: 400; }

        /* ──────────── STUDIO BANNER (full-width) ──────────── */
        .full-banner {
          background: var(--blue);
          padding: 80px 68px; color: var(--cream);
          display: flex; align-items: center;
          justify-content: space-between; gap: 56px;
          position: relative; overflow: hidden;
          margin-top: 4px;
          border-radius: 20px;
        }
        .bn-blob {
          position: absolute; border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%;
          pointer-events: none;
        }
        .bn-blob-1 { top: -90px; right: -90px; width: 380px; height: 380px; background: var(--red); opacity: 0.09; }
        .bn-blob-2 { bottom: -70px; left: 28%; width: 240px; height: 240px; background: var(--yellow); opacity: 0.07; border-radius: 50% 60% 40% 50% / 60% 40% 60% 40%; }
        .bn-body { position: relative; z-index: 1; }
        .bn-tag { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: var(--yellow); margin-bottom: 16px; }
        .bn-h { font-size: clamp(2.2rem, 4.5vw, 3.9rem); font-weight: 900; line-height: 0.9; letter-spacing: -0.03em; }
        .bn-h em { font-style: italic; color: var(--yellow); }
        .bn-p { margin-top: 18px; font-size: 0.92rem; opacity: 0.5; max-width: 480px; line-height: 1.78; font-weight: 400; }
        .bn-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px;
          background: var(--yellow); color: var(--blue);
          border-radius: 100px;
          font-size: 0.72rem; font-weight: 800;
          letter-spacing: 0.07em; text-transform: uppercase;
          text-decoration: none; flex-shrink: 0;
          position: relative; z-index: 1;
          transition: background 0.25s, color 0.25s;
        }
        .bn-cta:hover { background: var(--cream); }

        /* ──────────── FOOTER ──────────── */
        footer {
          background: var(--dark); color: var(--cream);
          padding: 84px 44px 48px;
          margin-top: 4px;
        }
        .ft-grid {
          display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 64px; margin-bottom: 84px;
        }
        .ft-brand { font-size: 1.5rem; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 9px; }
        .ft-brand em { font-style: normal; color: var(--yellow); }
        .ft-tagline { font-size: 0.68rem; opacity: 0.28; letter-spacing: 0.09em; text-transform: uppercase; margin-bottom: 26px; }
        .ft-email { font-size: 0.82rem; color: var(--cream); opacity: 0.48; text-decoration: none; transition: opacity 0.25s; }
        .ft-email:hover { opacity: 1; }
        .ft-col-label { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.25; margin-bottom: 18px; }
        .ft-links { display: flex; flex-direction: column; gap: 10px; }
        .ft-links a { font-size: 0.82rem; color: var(--cream); text-decoration: none; opacity: 0.42; transition: opacity 0.25s; }
        .ft-links a:hover { opacity: 1; }
        .ft-bottom {
          border-top: 1px solid rgba(250,243,224,0.08);
          padding-top: 32px; display: flex;
          justify-content: space-between; align-items: center;
        }
        .ft-bottom p { font-size: 0.65rem; opacity: 0.2; letter-spacing: 0.04em; }

        /* ──────────── RESPONSIVE ──────────── */
        @media (max-width: 960px) {
          .hdr { padding: 14px 16px; }
          .intro { padding: 72px 4px 4px; }
          .mosaic-cols { flex-direction: column; }
          .col-right { padding-top: 0; }
          .full-banner { padding: 60px 32px; flex-direction: column; align-items: flex-start; }
          footer { padding: 64px 24px 44px; }
          .ft-grid { grid-template-columns: 1fr 1fr; gap: 44px; }
        }
        @media (max-width: 600px) {
          .ft-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="hdr">
        <a href="#" className="logo">
          <div className="logo-strip-group">
            {([
              {char:'s', w:17, shades:['#E63946','#C42F3A','#E63946','#B32530','#E63946']},
              {char:'i', w:10, shades:['#F4A261','#E8924D','#F4A261','#D9843F','#F4A261']},
              {char:'m', w:27, shades:['#1D3557','#152A45','#1D3557','#264653','#1D3557']},
              {char:'a', w:17, shades:['#2A9D8F','#1E8A7D','#2A9D8F','#23776B','#2A9D8F']},
            ] as {char:string;w:number;shades:string[]}[]).map((lt, li) => (
              <div key={li} className="logo-letter-box" style={{width: lt.w}}>
                <svg className="logo-svg-inner" width={lt.w} height="170" xmlns="http://www.w3.org/2000/svg">
                  {lt.shades.map((color, si) => (
                    <text
                      key={si}
                      x={lt.w / 2}
                      y={17 + si * 34}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={color}
                      fontSize="22"
                      fontFamily="Nunito, sans-serif"
                      fontWeight="800"
                    >{lt.char}</text>
                  ))}
                </svg>
              </div>
            ))}
          </div>
          <span className="logo-mikaiil">mikaiil</span>
        </a>
        <nav className="nav">
          <a href="#about" className="npill">About</a>
          <a href="#work"  className="npill">Index</a>
        </nav>
      </header>

      {/* ── INTRO TEXT ── */}
      <section className="intro">
        <p className="intro-eyebrow">AI Consultant · Creative Strategist · Artist</p>
        <p className="intro-desc">
          <strong>Sima Mikaiil</strong> blends art, technology, and storytelling to build
          AI-powered creative systems — helping artists and businesses embrace the future
          without losing their soul.
        </p>
      </section>

      {/* ── MOSAIC GRID ── */}
      <div className="mosaic-cols" id="work">

        {/* ── LEFT COLUMN — odd cards ── */}
        <div>

          {/* 01 — AI Branding Consultant */}
          <div className="card" style={{background:'#1D3557', height:'520px'}}>
            <div className="card-shapes">
              <svg viewBox="0 0 500 520" preserveAspectRatio="xMidYMid slice">
                <path d="M-40,80 C30,-20,170,0,230,90 C290,180,280,330,190,390 C100,450,-10,420,-40,310 C-70,200,-80,150,-40,80Z" fill="#F4A261" opacity="0.94"/>
                <path d="M290,0 C380,-28,470,80,440,190 C410,300,310,330,220,275 C130,220,135,120,200,60 C240,26,250,22,290,0Z" fill="#E63946" opacity="0.88"/>
                <circle cx="390" cy="440" r="88" fill="#FAF3E0" opacity="0.1"/>
                <path d="M50,440 C90,400,145,415,148,460 C151,505,100,525,55,510 C10,495,-10,460,50,440Z" fill="#2A9D8F" opacity="0.35"/>
              </svg>
            </div>
            <span className="card-num">01</span>
            <div className="card-badge">
              <div className="badge-title">AI Branding Consultant</div>
              <div className="badge-sub">AI Agent · n8n · 2025</div>
            </div>
          </div>

          {/* 03 — Cazh Home */}
          <div className="card" style={{background:'#2A9D8F', height:'480px'}}>
            <div className="card-shapes">
              <svg viewBox="0 0 500 480" preserveAspectRatio="xMidYMid slice">
                <path d="M-30,50 C50,-20,210,10,260,110 C310,210,290,360,185,395 C80,430,-20,380,-30,270 C-40,160,-70,90,-30,50Z" fill="#FAF3E0" opacity="0.32"/>
                <path d="M270,10 C360,-18,460,80,420,200 C380,320,260,355,160,295 C60,235,70,125,155,62 C200,28,220,28,270,10Z" fill="#F4A261" opacity="0.92"/>
                <path d="M30,380 C80,330,150,350,158,410 C166,470,100,505,45,488 C-10,471,-28,432,30,380Z" fill="#1D3557" opacity="0.45"/>
                <circle cx="420" cy="80" r="38" fill="#FAF3E0" opacity="0.22"/>
              </svg>
            </div>
            <span className="card-num">03</span>
            <div className="card-badge">
              <div className="badge-title">Cazh Home</div>
              <div className="badge-sub">Sustainable Fashion · Natural Fibers</div>
            </div>
          </div>

          {/* ABOUT CARD */}
          <div className="about-card" id="about">
            <img src="/portrait.jpg.png" alt="Sima Mikaiil" className="about-photo-blob" />
            <div>
              <p className="about-card-eyebrow">About Sima</p>
              <h2 className="about-card-h">Where <em>art</em> meets intelligence</h2>
              <p className="about-card-p">AI consultant and creative strategist with a nonlinear path — from economic journalism to fashion design, from papier-mâché art to artificial intelligence.</p>
              <p className="about-card-p">Certified AI Consultant (Careerpreneur Academy, Canada/CPD). I build custom AI agents, design brand identities, and teach artists to fearlessly integrate AI into their creative practice.</p>
              <div className="skills">
                {([
                  {b:'#E63946', c:'#E63946', t:'AI Consulting'},
                  {b:'#1D3557', c:'#1D3557', t:'n8n Agents'},
                  {b:'#2A9D8F', c:'#2A9D8F', t:'Prompt Engineering'},
                  {b:'#E76F51', c:'#E76F51', t:'Brand Strategy'},
                  {b:'#264653', c:'#264653', t:'Claude Code'},
                  {b:'#2A9D8F', c:'#2A9D8F', t:'Graphic Design'},
                  {b:'#F4A261', c:'#8B6914', t:'Fashion Design'},
                  {b:'#1D3557', c:'#1D3557', t:'UX Design'},
                ] as {b:string;c:string;t:string}[]).map((sk, i) => (
                  <span key={i} className="skill-tag" style={{borderColor:sk.b, color:sk.c}}>{sk.t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 05 — Personal Brand Strategy */}
          <div className="card" style={{background:'#E76F51', height:'500px'}}>
            <div className="card-shapes">
              <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
                <path d="M-50,90 C30,10,190,20,250,120 C310,220,285,370,175,408 C65,446,-35,395,-45,285 C-55,175,-90,140,-50,90Z" fill="#1D3557" opacity="0.55"/>
                <path d="M295,0 C395,-22,490,100,448,220 C406,340,285,374,175,308 C65,242,70,130,165,65 C215,28,232,18,295,0Z" fill="#FAF3E0" opacity="0.38"/>
                <circle cx="78" cy="82" r="76" fill="#F4A261" opacity="0.7"/>
                <circle cx="400" cy="400" r="50" fill="#2A9D8F" opacity="0.5"/>
              </svg>
            </div>
            <span className="card-num">05</span>
            <div className="card-badge">
              <div className="badge-title">Personal Brand Strategy</div>
              <div className="badge-sub">Consulting · Content</div>
            </div>
          </div>

          {/* SVC — AI Consulting */}
          <div className="svc-card" style={{background:'#E63946', color:'#FAF3E0'}}>
            <div className="svc-icon">✦</div>
            <div>
              <div className="svc-name">AI Consulting</div>
              <div className="svc-sub">Strategic AI implementation for your business. I analyze your workflows, identify automation opportunities, and build custom solutions that actually save time.</div>
            </div>
          </div>

          {/* SVC — Content Production */}
          <div className="svc-card" style={{background:'#1D3557', color:'#FAF3E0'}}>
            <div className="svc-icon">◈</div>
            <div>
              <div className="svc-name">Content Production</div>
              <div className="svc-sub">AI-driven content strategy and execution. From blog posts to social media, I combine creative storytelling with intelligent tools to produce content that connects.</div>
            </div>
          </div>

          {/* 07 — Papier-Mâché Accessories */}
          <div className="card" style={{background:'#E63946', height:'460px'}}>
            <div className="card-shapes">
              <svg viewBox="0 0 500 460" preserveAspectRatio="xMidYMid slice">
                <path d="M10,20 C100,-28,268,18,308,130 C348,242,300,385,192,412 C84,439,-18,378,-22,264 C-26,150,10,58,10,20Z" fill="#F4A261" opacity="0.88"/>
                <ellipse cx="368" cy="105" rx="120" ry="84" fill="#FAF3E0" opacity="0.42" transform="rotate(-22 368 105)"/>
                <path d="M160,318 C224,272,318,295,325,368 C332,441,250,475,170,452 C90,429,72,378,160,318Z" fill="#264653" opacity="0.32"/>
              </svg>
            </div>
            <span className="card-num">07</span>
            <div className="card-badge">
              <div className="badge-title">Papier-Mâché Accessories</div>
              <div className="badge-sub">Art · Handcraft</div>
            </div>
          </div>

          {/* SVC — Workflow Automation */}
          <div className="svc-card" style={{background:'#264653', color:'#FAF3E0'}}>
            <div className="svc-icon">∿</div>
            <div>
              <div className="svc-name">Workflow Automation</div>
              <div className="svc-sub">Automate the repetitive tasks stealing your creative time. Email processing, data entry, report generation — I build n8n workflows that run while you sleep.</div>
            </div>
          </div>

          {/* 09 — n8n Chatbot Agent */}
          <div className="card" style={{background:'#264653', height:'510px'}}>
            <div className="card-shapes">
              <svg viewBox="0 0 500 510" preserveAspectRatio="xMidYMid slice">
                <path d="M-30,65 C55,-15,220,0,285,100 C350,200,318,350,212,396 C106,442,-5,402,-28,292 C-51,182,-70,120,-30,65Z" fill="#2A9D8F" opacity="0.72"/>
                <path d="M310,5 C405,-24,502,100,456,220 C410,340,296,372,188,305 C80,238,82,118,174,55 C224,18,244,26,310,5Z" fill="#E76F51" opacity="0.82"/>
                <circle cx="90" cy="430" r="64" fill="#F4A261" opacity="0.2"/>
                <circle cx="430" cy="105" r="36" fill="#FAF3E0" opacity="0.14"/>
              </svg>
            </div>
            <span className="card-num">09</span>
            <div className="card-badge">
              <div className="badge-title">n8n Chatbot Agent</div>
              <div className="badge-sub">AI Agent · Automation</div>
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN — even cards ── */}
        <div className="col-right">

          {/* 02 — Creative AI Studio */}
          <div className="card" style={{background:'#E63946', height:'490px'}}>
            <div className="card-shapes">
              <svg viewBox="0 0 500 490" preserveAspectRatio="xMidYMid slice">
                <path d="M-20,45 C80,-20,268,15,320,135 C372,255,315,400,198,428 C81,456,-10,400,-5,285 C0,170,10,85,-20,45Z" fill="#FAF3E0" opacity="0.44"/>
                <path d="M295,0 C395,-22,490,100,445,225 C400,350,276,384,165,314 C54,244,60,120,160,55 C215,18,232,18,295,0Z" fill="#1D3557" opacity="0.52"/>
                <circle cx="398" cy="398" r="82" fill="#F4A261" opacity="0.38"/>
                <circle cx="55" cy="70" r="44" fill="#2A9D8F" opacity="0.42"/>
              </svg>
            </div>
            <span className="card-num">02</span>
            <div className="card-badge">
              <div className="badge-title">Creative AI Studio</div>
              <div className="badge-sub">Brand Strategy · Identity · 2025</div>
            </div>
          </div>

          {/* 04 — Workshop: AI for Artists */}
          <div className="card" style={{background:'#F4A261', height:'520px'}}>
            <div className="card-shapes">
              <svg viewBox="0 0 500 520" preserveAspectRatio="xMidYMid slice">
                <path d="M-28,60 C60,-15,230,10,280,115 C330,220,298,374,188,414 C78,454,-18,404,-32,288 C-46,172,-68,112,-28,60Z" fill="#1D3557" opacity="0.6"/>
                <path d="M298,38 C392,8,488,125,440,250 C392,375,264,408,158,338 C52,268,56,150,155,82 C210,44,230,58,298,38Z" fill="#FAF3E0" opacity="0.4"/>
                <ellipse cx="78" cy="90" rx="86" ry="60" fill="#E63946" opacity="0.65" transform="rotate(20 78 90)"/>
                <circle cx="400" cy="420" r="52" fill="#264653" opacity="0.28"/>
              </svg>
            </div>
            <span className="card-num">04</span>
            <div className="card-badge">
              <div className="badge-title">Workshop: AI for Artists</div>
              <div className="badge-sub">Education · 2025</div>
            </div>
          </div>

          {/* SVC — Custom AI Agents */}
          <div className="svc-card" style={{background:'#2A9D8F', color:'#FAF3E0'}}>
            <div className="svc-icon">⬡</div>
            <div>
              <div className="svc-name">Custom AI Agents</div>
              <div className="svc-sub">Specialized chatbots and n8n agents tailored to your needs — branding consultants, customer service bots, content generators, or any custom use case you can imagine.</div>
            </div>
          </div>

          {/* 06 — Textile & Pattern Design */}
          <div className="card" style={{background:'#264653', height:'470px'}}>
            <div className="card-shapes">
              <svg viewBox="0 0 500 470" preserveAspectRatio="xMidYMid slice">
                <path d="M55,8 C145,-22,260,18,295,108 C330,198,308,318,228,360 C148,402,42,388,8,295 C-26,202,-8,128,55,8Z" fill="#F4A261" opacity="0.9"/>
                <path d="M198,155 C275,100,385,148,388,258 C391,368,285,420,195,392 C105,364,68,272,130,202 C162,168,168,200,198,155Z" fill="#E63946" opacity="0.58"/>
                <path d="M58,335 C118,282,218,305,225,376 C232,447,155,486,72,462 C-11,438,-22,388,58,335Z" fill="#2A9D8F" opacity="0.72"/>
                <circle cx="404" cy="72" r="36" fill="#FAF3E0" opacity="0.24"/>
              </svg>
            </div>
            <span className="card-num">06</span>
            <div className="card-badge">
              <div className="badge-title">Textile &amp; Pattern Design</div>
              <div className="badge-sub">Design · Heritage</div>
            </div>
          </div>

          {/* SVC — Prompt Engineering Training */}
          <div className="svc-card" style={{background:'#E76F51', color:'#FAF3E0'}}>
            <div className="svc-icon">◌</div>
            <div>
              <div className="svc-name">Prompt Engineering Training</div>
              <div className="svc-sub">Learn to communicate with AI effectively. One-on-one training and group workshops that turn beginners into confident AI users — no coding required.</div>
            </div>
          </div>

          {/* 08 — Stone Accessories */}
          <div className="card" style={{background:'#1D3557', height:'500px'}}>
            <div className="card-shapes">
              <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
                <path d="M5,42 C105,-12,288,18,330,138 C372,258,310,408,188,436 C66,464,-18,388,-10,268 C-2,148,8,78,5,42Z" fill="#FAF3E0" opacity="0.38"/>
                <path d="M268,5 C375,-22,480,102,428,232 C376,362,242,396,132,322 C22,248,28,112,136,48 C196,12,212,24,268,5Z" fill="#2A9D8F" opacity="0.75"/>
                <circle cx="58" cy="422" r="52" fill="#E63946" opacity="0.35"/>
                <ellipse cx="410" cy="108" rx="68" ry="50" fill="#F4A261" opacity="0.3" transform="rotate(-15 410 108)"/>
              </svg>
            </div>
            <span className="card-num">08</span>
            <div className="card-badge">
              <div className="badge-title">Stone Accessories</div>
              <div className="badge-sub">Product Design</div>
            </div>
          </div>

          {/* SVC — Brand Identity & Strategy */}
          <div className="svc-card" style={{background:'#F4A261', color:'#264653'}}>
            <div className="svc-icon">◆</div>
            <div>
              <div className="svc-name">Brand Identity &amp; Strategy</div>
              <div className="svc-sub">Creative brand strategy combining art, design heritage, and AI tools. Positioning, visual identity, content voice — a complete brand system built to grow.</div>
            </div>
          </div>

          {/* 10 — Graphic Design Portfolio */}
          <div className="card" style={{background:'#E76F51', height:'480px'}}>
            <div className="card-shapes">
              <svg viewBox="0 0 500 480" preserveAspectRatio="xMidYMid slice">
                <path d="M-28,52 C68,-22,258,10,308,128 C358,246,295,400,172,428 C49,456,-22,384,-18,264 C-14,144,-70,100,-28,52Z" fill="#264653" opacity="0.58"/>
                <path d="M308,0 C414,-22,505,110,455,240 C405,370,268,402,152,325 C36,248,46,108,162,46 C222,10,240,18,308,0Z" fill="#E63946" opacity="0.74"/>
                <circle cx="378" cy="394" r="72" fill="#FAF3E0" opacity="0.32"/>
                <ellipse cx="95" cy="120" rx="72" ry="52" fill="#1D3557" opacity="0.32" transform="rotate(15 95 120)"/>
              </svg>
            </div>
            <span className="card-num">10</span>
            <div className="card-badge">
              <div className="badge-title">Graphic Design Portfolio</div>
              <div className="badge-sub">Photoshop · Illustrator</div>
            </div>
          </div>

        </div>
      </div>

      {/* ── FULL-WIDTH STUDIO BANNER ── */}
      <div className="full-banner">
        <div className="bn-blob bn-blob-1" />
        <div className="bn-blob bn-blob-2" />
        <div className="bn-body">
          <p className="bn-tag">Studio</p>
          <h2 className="bn-h">Creative <em>AI</em> Studio</h2>
          <p className="bn-p">A new creative venture where AI meets filmmaking, video content, and short films. We build specialized AI agents for every creative challenge — from scriptwriting to automated editing pipelines. Human imagination amplified by artificial intelligence.</p>
        </div>
        <span className="bn-cta">Coming Soon — 2025</span>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="ft-grid">
          <div>
            <div className="ft-brand">sima<em>·</em>mikaiil</div>
            <p className="ft-tagline">The Art of Intelligent Creation</p>
            <a href="mailto:hello@simamikaiil.com" className="ft-email">hello@simamikaiil.com</a>
          </div>
          <div>
            <p className="ft-col-label">Services</p>
            <div className="ft-links">
              <a href="#">AI Consulting</a>
              <a href="#">Custom AI Agents</a>
              <a href="#">Content Production</a>
              <a href="#">Prompt Engineering</a>
              <a href="#">Workflow Automation</a>
              <a href="#">Brand Identity</a>
            </div>
          </div>
          <div>
            <p className="ft-col-label">Work</p>
            <div className="ft-links">
              <a href="#">AI Branding Consultant</a>
              <a href="#">Creative AI Studio</a>
              <a href="#">Cazh Home</a>
              <a href="#">AI for Artists</a>
              <a href="#">View All</a>
            </div>
          </div>
          <div>
            <p className="ft-col-label">Connect</p>
            <div className="ft-links">
              <a href="https://instagram.com/simamikaiil" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://linkedin.com/in/simamikaiil" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://simamikaiil.com" target="_blank" rel="noreferrer">simamikaiil.com</a>
            </div>
          </div>
        </div>
        <div className="ft-bottom">
          <p>© 2025 Sima Mikaiil — All rights reserved</p>
          <p>Design &amp; Development by Sima Mikaiil × Claude</p>
        </div>
      </footer>
    </>
  )
}
