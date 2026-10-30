import { useEffect, useRef, useState } from "react"
import image8FrameFiles from "virtual:image8-frames"

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const image8Frames = image8FrameFiles.length ? image8FrameFiles : ["image8.webp"]

const profile = {
  name: "Aditya Cheek Baraik",
  role: "Creative technologist and visual designer",
  location: "Gumla Jharkhand",
  email: "aditya.c.baraik@gmail.com",
  instagram: "https://www.instagram.com/_random._.0ne_",
  github: "https://github.com/aditya-baraik",
  linkedin: "https://www.linkedin.com/in/aditya-cheek-baraik",
  portfolio: "https://aditya-baraik.github.io/-/",
}

const photographs = [
  { src: asset("media/image2.webp"), label: "stillness", labelPosition: "center", className: "feature", alt: "Stillness photograph" },
  { src: asset("media/image3.webp"), label: "golden-hour", labelPosition: "bottom", className: "portrait", alt: "Golden hour photograph" },
  { src: asset("media/image4.webp"), label: "chaos", labelPosition: "bottom", className: "portrait", alt: "Abstract motion photograph" },
  { src: asset("media/image5.webp"), caption: "Solitude", className: "landscape", alt: "Solitude photograph" },
  { src: asset("media/image6.webp"), className: "square", alt: "Everyday life photograph" },
  { src: asset("media/image7.webp"), className: "tall", alt: "After light photograph" },
  { src: asset("media/image8.webp"), label: "Frames", labelPosition: "bottom", className: "wide", alt: "Frames photograph", animated: true },
  { src: asset("media/image9.webp"), label: "admire", labelPosition: "bottom", className: "square", alt: "Passing through photograph" },
]

const capabilities = [
  {
    title: "Web and programming",
    items: [
      "HTML and CSS",
      "JavaScript",
      "Python fundamentals",
      "Static deployment",
    ],
  },
  {
    title: "Creative practice",
    items: [
      "Visual content design",
      "Adobe Photoshop",
      "Adobe Lightroom",
      "Content writing",
    ],
  },
  {
    title: "Emerging technology",
    items: [
      "AI image generation",
      "Generative fill",
      "Telegram bots",
      "Android widgets",
    ],
  },
]

const projects = [
  {
    title: "Personal portfolio",
    type: "Website",
    description:
      "A custom portfolio created with HTML CSS and JavaScript featuring responsive layouts smooth motion and an editorial visual language",
    href: profile.portfolio,
    action: "View project",
  },
  {
    title: "Telegram bot",
    type: "Automation",
    description:
      "A functional bot that handles user interactions runs commands and automates useful everyday tasks",
    href: profile.github,
    action: "View code",
  },
  {
    title: "Android widgets",
    type: "Mobile utility",
    description:
      "Custom home screen tools designed as focused utilities and delivered as standalone Android applications",
    href: profile.github,
    action: "Discover more",
  },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [reelPlaying, setReelPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [aboutAlternateActive, setAboutAlternateActive] = useState(false)
  const [aboutPointerHovering, setAboutPointerHovering] = useState(false)
  const [image8FrameIndex, setImage8FrameIndex] = useState(0)
  const cursorRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const reelRef = useRef<HTMLElement>(null)
  const reelVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 900)
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]")
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"))
    }
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    ) : null
    elements.forEach((element) => observer?.observe(element))

    const moveCursor = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !cursorRef.current) return
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }
    window.addEventListener("pointermove", moveCursor)
    return () => {
      window.clearTimeout(timer)
      observer?.disconnect()
      window.removeEventListener("pointermove", moveCursor)
    }
  }, [])


  useEffect(() => {
    if (!reelVideoRef.current) return
    if (reelPlaying) {
      void reelVideoRef.current.play().catch(() => undefined)
    } else {
      reelVideoRef.current.pause()
    }
  }, [reelPlaying])

  useEffect(() => {
    if (image8Frames.length < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => {
      setImage8FrameIndex((index) => (index + 1) % image8Frames.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const carousel = document.querySelector(".work-tail")
    if (!carousel) return
    const preloadFrames = () => {
      image8Frames.forEach((frame) => {
        const image = new Image()
        image.decoding = "async"
        image.src = asset(`media/${frame}`)
      })
    }
    if (!("IntersectionObserver" in window)) {
      preloadFrames()
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          preloadFrames()
          observer.disconnect()
        }
      },
      { rootMargin: "700px 0px" },
    )
    observer.observe(carousel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame = 0
    let scrollFrame = 0
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const updateDepth = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduceMotion.matches) return
      if (!reelRef.current) return
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        if (reelRef.current) {
          const bounds = reelRef.current.getBoundingClientRect()
          const reelX = (event.clientX - bounds.left) / bounds.width - 0.5
          const reelY = (event.clientY - bounds.top) / bounds.height - 0.5
          reelRef.current.style.setProperty("--reel-x", `${reelX * 22}px`)
          reelRef.current.style.setProperty("--reel-y", `${reelY * 16}px`)
        }
      })
    }

    const updateScroll = () => {
      if (scrollFrame) return
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0
        updateScrollState()
      })
    }

    const updateScrollState = () => {
      if (!heroRef.current) return
      const hero = heroRef.current
      const sticky = hero.querySelector<HTMLElement>(".hero__sticky")
      const stickyHeight = sticky?.getBoundingClientRect().height ?? window.innerHeight
      const distance = Math.max(hero.getBoundingClientRect().height - stickyHeight, 1)
      const localScroll = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), distance)
      const curtainProgress = localScroll / distance
      const progress = Math.min(localScroll, stickyHeight)
      heroRef.current.style.setProperty(
        "--hero-media-y",
        reduceMotion.matches ? "0px" : `${progress * 0.055}px`,
      )
      heroRef.current.style.setProperty(
        "--hero-title-y",
        reduceMotion.matches ? "0px" : `${progress * 0.045}px`,
      )
      heroRef.current.style.setProperty(
        "--curtain-y",
        `${curtainProgress * -100}%`,
      )
      heroRef.current.style.setProperty(
        "--curtain-fold",
        `${curtainProgress * 7}rem`,
      )
    }

    window.addEventListener("pointermove", updateDepth, { passive: true })
    window.addEventListener("scroll", updateScroll, { passive: true })
    window.addEventListener("resize", updateScroll, { passive: true })
    reduceMotion.addEventListener("change", updateScroll)
    updateScroll()
    return () => {
      window.cancelAnimationFrame(frame)
      window.cancelAnimationFrame(scrollFrame)
      window.removeEventListener("pointermove", updateDepth)
      window.removeEventListener("scroll", updateScroll)
      window.removeEventListener("resize", updateScroll)
      reduceMotion.removeEventListener("change", updateScroll)
    }
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = menuOpen ? "hidden" : previousOverflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    if (menuOpen) window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const renderPhotoCard = (photo: (typeof photographs)[number], index: number) => (
    <figure
      className={`photo-card photo-card--${photo.className}`}
      key={photo.src}
      data-reveal
    >
      <div className="photo-card__frame">
        <div className="image-fallback">
          <span>{photo.label ?? photo.caption ?? "Visual story"}</span>
          <small>Image ready for upload</small>
        </div>
        <img
          key={
            photo.animated
              ? image8Frames[image8FrameIndex]
              : photo.src
          }
          className={
            photo.animated ? "photo-card__image8" : undefined
          }
          src={
            photo.animated
              ? asset(`media/${image8Frames[image8FrameIndex]}`)
              : photo.src
          }
          alt={photo.alt}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          onError={(event) => (event.currentTarget.style.opacity = "0")}
        />
        {photo.label ? (
          <span className={`photo-card__label photo-card__label--${photo.labelPosition}`}>
            {photo.label}
          </span>
        ) : null}
        <div className="photo-card__view">View image</div>
      </div>
      {photo.caption ? <figcaption><span>{photo.caption}</span></figcaption> : null}
    </figure>
  )

  return (
    <main>
      <div
        className={`loader ${loaded ? "loader--done" : ""}`}
        aria-hidden="true"
      >
        <span className="name-spacing">{profile.name}</span>
        <div className="loader__line" />
      </div>

      <div className="cursor" ref={cursorRef} aria-hidden="true">
        <span />
      </div>

      <div className="pre-marquee">
      <header className="site-header">
        <a className="brand hover-line" href="#top" aria-label="Back to top">
          PORTFOLIO
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a className="hover-line" href="#about">
            About
          </a>
          <a className="hover-line" href="#work">
            Work
          </a>
          <a className="hover-line" href="#experience">
            Experience
          </a>
          <a className="hover-line" href="#contact">
            Contact
          </a>
        </nav>
        <a className="header-contact hover-line" href={`mailto:${profile.email}`}>
          Let&apos;s talk <Arrow />
        </a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <div
        id="mobile-menu"
        className={`menu-panel ${menuOpen ? "menu-panel--open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <p className="menu-panel__eyebrow">Navigate</p>
        <nav aria-label="Mobile navigation">
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
          <a href="#experience" onClick={closeMenu}>
            Experience
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>
        <div className="menu-panel__foot">
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>

      <section className="hero" id="top" ref={heroRef}>
        <div className="hero__sticky">
          <div className="hero__media">
            <div className="image-fallback">
              <span>Featured work</span>
              <small>Image ready for upload</small>
            </div>
            <img
              src={asset("media/image1.webp")}
              alt="Featured photograph"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={(event) => (event.currentTarget.style.opacity = "0")}
            />
            <div className="hero__shade" />
          </div>
          <div className="hero__meta">
            <p>{profile.role}</p>
            <span className="hero__polymath">Polymath</span>
          </div>
          <h1 aria-label={profile.name}>
            <span className="name-spacing">{profile.name}</span>
          </h1>
          <div className="hero__curtain" aria-hidden="true">
          <div className="hero__curtain-name name-spacing">{profile.name}</div>
          </div>
        </div>
      </section>

      <section className="reel" id="reel" ref={reelRef}>
        <div className="reel__stage">
          <video
            ref={reelVideoRef}
            className="reel__video"
            src={asset("media/video1.mp4")}
            autoPlay={reelPlaying}
            preload="metadata"
            muted
            loop
            playsInline
            aria-label="Photography reel"
          />
          <div className="reel__wash" />
          <div className="reel__cinematic">Cinematic</div>
        </div>
        <div className="reel__bottom">
          <button
            type="button"
            onClick={() => setReelPlaying((playing) => !playing)}
            aria-label={reelPlaying ? "Pause photography reel" : "Play photography reel"}
            aria-pressed={reelPlaying}
          >
            {reelPlaying ? "Pause" : "Play"}
          </button>
          <a href="#work">Explore photographs ↓</a>
        </div>
      </section>

      <section className="manifesto introduction" id="introduction">
        <div className="introduction__copy section-pad">
          <div className="section-label" data-reveal>
            <span>Introduction</span>
          </div>
          <p className="manifesto__text" data-reveal>
            I bring design photography storytelling and technology together to
            turn thoughtful ideas into memorable visual experiences
          </p>
          <a className="pill text-link hover-line" href="#about" data-reveal>
            More about me <Arrow />
          </a>
        </div>
        <figure className="introduction__portrait" data-reveal>
          <div className="image-fallback image-fallback--light">
            <span>Introduction</span>
            <small>Image ready for upload</small>
          </div>
          <img
            src={asset("media/image11.jpg")}
            alt="Introduction visual"
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.src = asset("media/image10.webp")
            }}
          />
        </figure>
      </section>

      <section className="work section-pad" id="work">
        <div className="work__heading" data-reveal>
          <h2>Visual Stories</h2>
        </div>
        <div className="gallery">
          {photographs.slice(0, 4).map((photo, index) =>
            renderPhotoCard(photo, index),
          )}
        </div>
        <div className="gallery gallery--pair">
          {photographs.slice(4, 6).map((photo, index) =>
            renderPhotoCard(photo, index + 4),
          )}
        </div>
      </section>
      </div>

      <section className="work-tail">
        <div className="gallery gallery--tail">
          {photographs.slice(6).map((photo, index) =>
            renderPhotoCard(photo, index + 6),
          )}
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <span>Design and technology</span>
          <span>Images and stories</span>
          <span>Design and technology</span>
          <span>Images and stories</span>
        </div>
      </div>

      <section className="about" id="about">
        <button
          type="button"
          className="about__portrait"
          data-reveal
          aria-label="About portrait image frame 10; tap to switch between image10.png and image10.1.jpg"
          aria-pressed={aboutAlternateActive}
          onClick={() => setAboutAlternateActive((active) => !active)}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setAboutPointerHovering(true)
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setAboutPointerHovering(false)
          }}
        >
          <div className="image-fallback image-fallback--light">
            <span>Portrait</span>
            <small>Image ready for upload</small>
          </div>
          <img
            src={asset(
              aboutAlternateActive || aboutPointerHovering
                ? "media/image10.1.webp"
                : "media/image10.webp",
            )}
            alt={`${aboutAlternateActive || aboutPointerHovering ? "Alternate portrait" : "Portrait"} of ${profile.name}`}
            loading="lazy"
            decoding="async"
            onError={(event) => (event.currentTarget.style.opacity = "0")}
          />
        </button>
        <div className="about__copy">
          <div className="section-label section-label--dark" data-reveal>
            <span>About me</span>
          </div>
          <h2 data-reveal>
            Always learning and always looking for new ways to create
          </h2>
          <div className="about__body" data-reveal>
            <p>
              I am <span className="name-spacing">{profile.name}</span> a Computer Instructor and English Honours
              student with a deep interest in creative technology visual
              storytelling and digital experimentation
            </p>
            <p>
              My practice brings together graphic design photography AI powered
              workflows websites and useful digital products with a focus on
              clarity character and purpose
            </p>
          </div>
          <a className="pill" href={`mailto:${profile.email}`} data-reveal>
            Start a project <Arrow />
          </a>
        </div>
      </section>

      <section className="capabilities section-pad" id="capabilities">
        <div className="section-label" data-reveal>
          <span>Capabilities</span>
          <span>Technical and creative practice</span>
        </div>
        <div className="capabilities__intro" data-reveal>
          <h2>
            Ideas become useful when creativity and technology move together
          </h2>
        </div>
        <div className="capabilities__grid">
          {capabilities.map((capability) => (
            <article className="capability" key={capability.title} data-reveal>
              <h3>{capability.title}</h3>
              <ul>
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="projects section-pad">
        <div className="section-label" data-reveal>
          <span>Selected projects</span>
          <span>Independent digital work</span>
        </div>
        <div className="projects__list">
          {projects.map((project) => (
            <a
              className="project-row"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              key={project.title}
              data-reveal
            >
              <span className="project-row__type">{project.type}</span>
              <span className="project-row__main">
                <strong>{project.title}</strong>
                <small>{project.description}</small>
              </span>
              <span className="project-row__action">
                {project.action} <Arrow />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="experience section-pad" id="experience">
        <div className="section-label section-label--dark" data-reveal>
          <span>Experience and education</span>
        </div>
        <div className="experience__layout">
          <div className="experience__heading" data-reveal>
            <h2>Learning through making teaching and experimentation</h2>
          </div>
          <div className="experience__items">
            <article data-reveal>
              <p>Current role</p>
              <h3>Computer Trainer and Technical Coordinator</h3>
              <span>BIRSA JSDMS</span>
              <p>
                Training more than sixty students in basic computing and
                Microsoft Office while managing lab systems documentation and
                technical support
              </p>
            </article>
            <article data-reveal>
              <p>Technical practice</p>
              <h3>Technical Assistant and Media Assistant</h3>
              <span>Local organisations</span>
              <p>
                Managing digital records portal workflows event photography and
                post production for community focused work
              </p>
            </article>
            <article data-reveal>
              <p>Education</p>
              <h3>Bachelor of Arts English Honours</h3>
              <span>Kartik Oraon College Gumla</span>
              <p>
                Building a foundation in language literature and storytelling
                alongside an independent creative technology practice
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact section-pad">
        <div className="section-label" data-reveal>
          <span>Have an idea in mind</span>
        </div>
        <a
          className="contact__link"
          href={`mailto:${profile.email}`}
          data-reveal
        >
          <span>Let&apos;s create</span>
          <span>something real</span>
        </a>
      </section>

      <footer id="contact">
        <div className="footer__top">
          <div>
            <a className="hover-line" href="#top">
              Back to top ↑
            </a>
            <a className="hover-line" href="#work">
              Selected work
            </a>
          </div>
          <div>
            <a
              className="hover-line"
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Instagram <Arrow />
            </a>
            <a
              className="hover-line"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow />
            </a>
            <a
              className="hover-line"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <Arrow />
            </a>
            <a
              className="hover-line"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
              target="_blank"
              rel="noreferrer"
            >
              Email <Arrow />
            </a>
          </div>
        </div>
        <div className="footer__wordmark" aria-hidden="true">
          portfolio
        </div>
        <div className="footer__bottom">
          <span>Copyright {new Date().getFullYear()}</span>
          <span>All photographs reserved</span>
        </div>
      </footer>
    </main>
  )
}
