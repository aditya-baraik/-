import { useEffect, useRef, useState } from "react"
import image8FrameFiles from "virtual:image8-frames"

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const image8Frames = image8FrameFiles.length ? image8FrameFiles : ["image8.jpg"]

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
  { src: asset("media/image2.jpg"), title: "Stillness", className: "feature" },
  { src: asset("media/image3.jpg"), title: "Golden Hour", className: "portrait" },
  { src: asset("media/image4.jpg"), title: "In Motion", className: "portrait" },
  { src: asset("media/image5.jpg"), title: "Solitude", className: "landscape" },
  { src: asset("media/image6.jpg"), title: "The Everyday", className: "square" },
  { src: asset("media/image7.jpg"), title: "After Light", className: "tall" },
  { src: asset("media/image8.jpg"), title: "Somewhere Quiet", className: "wide" },
  { src: asset("media/image9.jpg"), title: "Passing Through", className: "square" },
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
  const [reelPlaying, setReelPlaying] = useState(true)
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))

    const moveCursor = (event: PointerEvent) => {
      if (!cursorRef.current) return
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }
    window.addEventListener("pointermove", moveCursor)
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
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
    const timer = window.setInterval(() => {
      setImage8FrameIndex((index) => (index + 1) % image8Frames.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0

    const updateDepth = (event: PointerEvent) => {
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
      if (!heroRef.current) return
      const distance = Math.max(
        heroRef.current.offsetHeight - window.innerHeight,
        1,
      )
      const curtainProgress = Math.min(
        Math.max(window.scrollY / distance, 0),
        1,
      )
      const progress = Math.min(window.scrollY, window.innerHeight)
      heroRef.current.style.setProperty(
        "--hero-media-y",
        `${progress * 0.055}px`,
      )
      heroRef.current.style.setProperty(
        "--hero-title-y",
        `${progress * 0.045}px`,
      )
      heroRef.current.style.setProperty(
        "--curtain-y",
        `${curtainProgress * -104}vh`,
      )
      heroRef.current.style.setProperty(
        "--curtain-fold",
        `${curtainProgress * 7}rem`,
      )
    }

    window.addEventListener("pointermove", updateDepth)
    window.addEventListener("scroll", updateScroll, { passive: true })
    updateScroll()
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", updateDepth)
      window.removeEventListener("scroll", updateScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
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
          <span>{photo.title}</span>
          <small>Image ready for upload</small>
        </div>
        <img
          key={
            photo.title === "Somewhere Quiet"
              ? image8Frames[image8FrameIndex]
              : photo.src
          }
          className={
            photo.title === "Somewhere Quiet" ? "photo-card__image8" : undefined
          }
          src={
            photo.title === "Somewhere Quiet"
              ? asset(`media/${image8Frames[image8FrameIndex]}`)
              : photo.src
          }
          alt={`${photo.title} photograph`}
          loading={index === 0 ? "eager" : "lazy"}
          onError={(event) => (event.currentTarget.style.opacity = "0")}
        />
        <div className="photo-card__view">View image</div>
      </div>
      <figcaption>
        <span>{photo.title}</span>
        <span>Photography and editing</span>
      </figcaption>
    </figure>
  )

  return (
    <main>
      <div
        className={`loader ${loaded ? "loader--done" : ""}`}
        aria-hidden="true"
      >
        <span>Aditya Cheek Baraik</span>
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
          <span>{profile.location}</span>
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
              src={asset("media/image1.jpg")}
              alt="Featured photograph"
              onError={(event) => (event.currentTarget.style.opacity = "0")}
            />
            <div className="hero__shade" />
          </div>
          <div className="hero__meta">
            <p>{profile.role}</p>
            <p>Based in {profile.location}</p>
            <span className="hero__polymath">Polymath</span>
          </div>
          <h1 aria-label={profile.name}>
            <span>{profile.name}</span>
          </h1>
          <div className="hero__curtain" aria-hidden="true">
            <div className="hero__curtain-name">{profile.name}</div>
            <div className="hero__curtain-foot">
              <span>Design Photography Technology</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reel" id="reel" ref={reelRef}>
        <div className="reel__stage">
          <video
            ref={reelVideoRef}
            className="reel__video"
            src={asset("media/video1.mp4")}
            autoPlay
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
          >
            {reelPlaying ? "Pause" : "Play"}
          </button>
          <span>Now playing · video1.mp4</span>
          <a href="#work">Explore photographs ↓</a>
        </div>
      </section>

      <section className="manifesto section-pad">
        <div className="section-label" data-reveal>
          <span>Introduction</span>
          <span>Design Photography Technology</span>
        </div>
        <p className="manifesto__text" data-reveal>
          I bring design photography storytelling and technology together to
          turn thoughtful ideas into memorable visual experiences
        </p>
        <a className="pill text-link hover-line" href="#about" data-reveal>
          More about me <Arrow />
        </a>
      </section>

      <section className="work section-pad" id="work">
        <div className="work__heading" data-reveal>
          <h2>Selected photographs</h2>
          <span>Recent visual work</span>
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
                ? "media/image10.1.jpg"
                : "media/image10.png",
            )}
            alt={`${aboutAlternateActive || aboutPointerHovering ? "Alternate portrait" : "Portrait"} of ${profile.name}`}
            loading="lazy"
            onError={(event) => (event.currentTarget.style.opacity = "0")}
          />
        </button>
        <div className="about__copy">
          <div className="section-label section-label--dark" data-reveal>
            <span>About me</span>
            <span>Curious by nature</span>
          </div>
          <h2 data-reveal>
            Always learning and always looking for new ways to create
          </h2>
          <div className="about__body" data-reveal>
            <p>
              I am {profile.name} a Computer Instructor and English Honours
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
          <span>{profile.location}</span>
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
          <span>Available for select projects</span>
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
          <p>{profile.name}</p>
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
          <span>Based in {profile.location}</span>
          <span>All photographs reserved</span>
        </div>
      </footer>
    </main>
  )
}
