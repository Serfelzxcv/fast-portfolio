import { useEffect, useMemo, useState } from 'react'

import './App.css'

type PageId = 'inicio' | 'proyectos' | 'acerca' | 'contacto' | 'Experiencia'
type ThemeMode = 'dark' | 'light'

type Project = {
  title: string
  category: string
  description: string
  stack: string[]
  images: string[]
  href?: string
  tone: string
  year: string
}

const menuItems: Array<{ index: string; label: string; page: PageId }> = [
  { index: '01', label: 'Inicio', page: 'inicio' },
  { index: '02', label: 'Experiencia', page: 'Experiencia' },
  { index: '03', label: 'Proyectos', page: 'proyectos' },
  { index: '04', label: 'Acerca de', page: 'acerca' },
  { index: '05', label: 'Contacto', page: 'contacto' },
]

const projects: Project[] = [
  {
    title: '9780 Bitcoin',
    category: 'Wallet cripto + plataforma web',
    description: 'Desarrollé la app mobile y la web de 9780 Bitcoin, una wallet de criptomonedas enfocada en una experiencia ágil y segura para sus usuarios.',
    stack: ['Flutter', 'Java Spring Boot', 'Backend APIs'],
    images: ['/assets/proyects/9780/9780-1.png', '/assets/proyects/9780/9780-2.png'],
    href: 'https://play.google.com/store/apps/details?id=com.app9780bitcoin&hl=es_PR',
    tone: 'tone-blue',
    year: '2024',
  },
  {
    title: 'BCP QA Audit',
    category: 'App interna de auditoría',
    description: 'Diseñé el prototipo para auditoría interna del área de QA con Power Apps, Power Automate y SharePoint; luego el producto final se llevó a una app en React Native.',
    stack: ['Power Apps', 'Power Automate', 'SharePoint', 'React Native'],
    images: ['/assets/proyects/bcp/bcp1.png', '/assets/proyects/bcp/bcp2.png'],
    tone: 'tone-cyan',
    year: '2024',
  },
]

const skills = [
  'Flutter / Dart', 'React / Next.js', 'Astro', 'Java / Spring Boot',
  'Django / DRF', 'Nest.js', 'PostgreSQL', 'MongoDB',
  'Docker', 'RabbitMQ', 'Redis', 'AWS',
  'Figma', 'GSAP / Rive / Lottie', 'Git / GitHub', 'Scrum / Agile',
]

const stackLogos = [
  { name: 'Flutter', image: '/assets/stacks-logos/Flutter.png' },
  { name: 'React', image: '/assets/stacks-logos/React.png' },
  { name: 'Next.js', image: '/assets/stacks-logos/Next.js.png' },
  { name: 'Astro', image: '/assets/stacks-logos/Astro.png' },
  { name: 'Spring', image: '/assets/stacks-logos/Spring.png' },
  { name: 'PostgreSQL', image: '/assets/stacks-logos/PostgresSQL.png' },
]

const experienceEntries = [
  {
    period: 'Abr 2024 — hoy',
    company: '9780 Bitcoin',
    role: 'Desarrollador Full Stack',
    desc: 'Desarrollo y despliegue en Play Store y App Store del aplicativo y dashboard de la empresa (Flutter). Backend con Java Spring Boot, PostgreSQL, MongoDB y arquitectura hexagonal con microservicios, API Gateway, RabbitMQ, Docker y Redis.',
    tags: ['Flutter / Dart', 'Java / Spring Boot', 'PostgreSQL', 'MongoDB', 'Docker', 'RabbitMQ', 'Redis'],
  },
  {
    period: 'Ene 2024 — Mar 2024',
    company: 'BCP',
    role: 'Practicante Full Stack',
    desc: 'Desarrollo de un Dashboard móvil para gestión interna usando Power Apps, Power Automate y SharePoint List.',
    tags: ['Power Apps', 'Power Automate', 'SharePoint'],
  },
  {
    period: 'Sept 2023 — Dic 2023',
    company: 'BCP',
    role: 'Pasante Full Stack',
    desc: 'Desarrollo de una App móvil para Auditoría usando PowerApps, Power Automate y SharePoint List.',
    tags: ['Power Apps', 'Power Automate', 'SharePoint'],
  },
  {
    period: 'Mar 2021 — Sept 2023',
    company: 'M&O Asociados',
    role: 'Desarrollador Freelance',
    desc: 'Desarrollo de una App móvil de videos instructivos para la empresa, construida con React Native, Firebase y Django como backend.',
    tags: ['React Native', 'Firebase', 'Django'],
  },
]

function IconGithub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  )
}

function IconWhatsapp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

function IconChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function ProjectCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setCurrent(0)
  }, [title])

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent((c) => (c - 1 + images.length) % images.length)
  }

  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent((c) => (c + 1) % images.length)
  }

  return (
    <div className="carousel">
      <img
        key={`${title}-${current}`}
        src={images[current]}
        alt={`${title} - imagen ${current + 1}`}
        className="projects-preview__img"
      />
      {images.length > 1 && (
        <>
          <button className="carousel__btn carousel__btn--prev" type="button" aria-label="Imagen anterior" onClick={prev}>
            <IconChevronLeft />
          </button>
          <button className="carousel__btn carousel__btn--next" type="button" aria-label="Imagen siguiente" onClick={next}>
            <IconChevronRight />
          </button>
          <div className="carousel__dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel__dot${i === current ? ' carousel__dot--active' : ''}`}
                type="button"
                aria-label={`Ver imagen ${i + 1}`}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function IconTheme({ theme }: { theme: ThemeMode }) {
  if (theme === 'dark') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a6 6 0 1 0 9 9 8.5 8.5 0 1 1-9-9z" />
      </svg>
    )
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
    </svg>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [activePage, setActivePage] = useState<PageId>('inicio')
  const [activeProject, setActiveProject] = useState(projects[0])

  const activePageTitle = useMemo(
    () => menuItems.find((item) => item.page === activePage)?.label ?? 'Inicio',
    [activePage],
  )

  const toggleMenu = () => setIsMenuOpen((current) => !current)
  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  const navigateTo = (page: PageId) => {
    setActivePage(page)
    setIsMenuOpen(false)
  }


  return (
    <main className={`hero-page theme-${theme}`}>
      <div className="hero-top-controls">
        <button
          className="theme-toggle"
          type="button"
          aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          onClick={toggleTheme}
        >
          <span className="theme-toggle__icon">
            <IconTheme theme={theme} />
          </span>
        </button>
        <button
          className={`hero-grid-icon${isMenuOpen ? ' hero-grid-icon--active' : ''}`}
          type="button"
          aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
          <span />
        </button>
      </div>
      <button className="hero-avatar" type="button" aria-label="Ir a inicio" onClick={() => navigateTo('inicio')}>KC</button>

      {isMenuOpen ? (
        <div className="menu-overlay" id="site-menu" role="dialog" aria-modal="true">
          <button className="menu-close" type="button" onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menu">
            <span className="menu-close__icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>

          <nav className="menu-panel" aria-label="Menu principal">
            <div className="menu-list">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className={`menu-link menu-link--button${activePage === item.page ? ' menu-link--current' : ''}`}
                  type="button"
                  onClick={() => navigateTo(item.page)}
                >
                  <span className="menu-link__index">{item.index}</span>
                  <span className="menu-link__label">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      ) : null}

      <section className="page-shell" aria-label={`Vista ${activePageTitle}`}>
        {activePage === 'inicio' ? (
          <section className="hero hero--page page-enter" aria-label="Presentacion principal">
            <div className="hero-grid">
              <div className="hero-copy">
                <h1 className="hero-intro">
                  <span className="hero-intro__base">Hola, mi nombre es</span>
                  <span className="hero-name">Kevin Carrillo</span>
                </h1>

                <p className="hero-role">
                  full stack developer <span className="hero-role__accent">&</span>{' '}
                  ux/ui designer
                </p>

                <div className="hero-stats-row">
                  <div className="hero-stat-item">
                    <strong>4+</strong>
                    <span>años de exp.</span>
                  </div>
                  <div className="hero-stat-divider" aria-hidden="true" />
                  <div className="hero-stat-item">
                    <strong>10+</strong>
                    <span>proyectos</span>
                  </div>
                </div>

                <div className="hero-actions">
                  <button className="hero-button" type="button" onClick={() => navigateTo('acerca')}>
                    Sobre mi
                  </button>
                  <button className="hero-button" type="button" onClick={() => navigateTo('Experiencia')}>
                    Experiencia
                  </button>
                  <button className="hero-button" type="button" onClick={() => navigateTo('proyectos')}>
                    Proyectos
                  </button>
                  <a className="hero-button hero-button--primary" href="mailto:kevin.carrillo.varas@gmail.com">
                    Hablemos
                  </a>
                </div>

                <div className="hero-social">
                  <a
                    className="hero-social__link"
                    href="https://github.com/Serfelzxcv"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <IconGithub />
                  </a>
                  <a
                    className="hero-social__link"
                    href="https://www.linkedin.com/in/kevin-sebastian-carrillo-varas-275228281/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <IconLinkedin />
                  </a>
                  <a
                    className="hero-social__link"
                    href="mailto:kevin.carrillo.varas@gmail.com"
                    aria-label="Email"
                  >
                    <IconMail />
                  </a>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {activePage === 'Experiencia' ? (
          <section className="experience-page page-enter" aria-label="Vista experiencia">
            <div className="experience-head">
              <p className="placeholder-page__index">02</p>
              <h2>Experiencia</h2>
            </div>
            <div className="experience-list">
              {experienceEntries.map((entry) => (
                <div key={entry.company} className="experience-entry">
                  <div className="experience-entry__left">
                    <span className="experience-entry__period">{entry.period}</span>
                    <span className="experience-entry__company">{entry.company}</span>
                  </div>
                  <div className="experience-entry__right">
                    <strong className="experience-entry__role">{entry.role}</strong>
                    <p className="experience-entry__desc">{entry.desc}</p>
                    <div className="experience-entry__tags">
                      {entry.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {activePage === 'proyectos' ? (
          <section className="projects-page page-enter" aria-label="Vista de proyectos">
            <div className={`projects-preview ${activeProject.tone}`}>
              <div className="projects-preview__frame">
                <ProjectCarousel images={activeProject.images} title={activeProject.title} />
              </div>
              <div className="projects-preview__meta">
                <strong className="projects-preview__title">{activeProject.title}</strong>
                <span className="projects-preview__cat">{activeProject.category}</span>
                <p className="projects-preview__desc">{activeProject.description}</p>
                <div className="projects-preview__stack" aria-label={`Tecnologías usadas en ${activeProject.title}`}>
                  {activeProject.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="projects-list-panel">
              <div className="projects-list-header">
                <div className="projects-list-header__title">
                  <p className="placeholder-page__index">03</p>
                  <h2>Proyectos</h2>
                </div>
                <span>{projects.length}</span>
              </div>
              <div className="projects-list">
                {projects.map((project) => (
                  <div
                    key={project.title}
                    className={`project-row${activeProject.title === project.title ? ' project-row--active' : ''}`}
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() => setActiveProject(project)}
                    onFocus={() => setActiveProject(project)}
                    onClick={() => setActiveProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActiveProject(project)
                      }
                    }}
                    aria-pressed={activeProject.title === project.title}
                  >
                    <div className="project-row__info">
                      <strong>{project.title}</strong>
                      <span>{project.category}</span>
                    </div>
                    <div className="project-row__meta">
                      <span className="project-row__year">{project.year}</span>
                      {project.href ? (
                        <a
                          className="project-row__arrow"
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir ${project.title}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconArrow />
                        </a>
                      ) : (
                        <span className="project-row__arrow"><IconArrow /></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {activePage === 'acerca' ? (
          <section className="placeholder-page about-page page-enter" aria-label="Vista acerca de">
            <div className="about-header">
              <p className="placeholder-page__index">04</p>
              <h2>Acerca de mi</h2>
            </div>
            <div className="about-body">
              <div className="about-bio">
                <div className="about-photo-wrap">
                  <img
                    className="about-photo"
                    src="/assets/me/kevin_foto.png"
                    alt="Foto de Kevin Carrillo"
                  />
                </div>
                <p>
Profesional en Diseño y Desarrollo de Software con experiencia en banca, fintech y soluciones digitales (web, dashboards, sistemas y apps móviles). Destaco por mi creatividad, adaptación a equipos y enfoque en resolver problemas con eficiencia. Busco nuevos retos que impulsen mi crecimiento y aportar valor en proyectos de impacto a largo plazo.
                </p>
                <div className="about-edu">
                  <span className="about-edu__item">
                    <strong>UTP</strong> — Ingeniería de Software · 2024 – hoy
                  </span>
                  <span className="about-edu__item">
                    <strong>TECSUP</strong> — Diseño y Desarrollo de Software · 2021 – 2023
                  </span>
                </div>
              </div>
              <div className="about-skills">
                <div className="about-stack-section">
                  <p className="about-skills__label">Stack principal</p>
                  <div className="about-stack-logos">
                    {stackLogos.map((logo) => (
                      <div key={logo.name} className="about-stack-item">
                        <img src={logo.image} alt={logo.name} />
                        <span>{logo.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="about-stack-divider" />
                <p className="about-skills__label">Todas las herramientas</p>
                <div className="about-skills__grid">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {activePage === 'contacto' ? (
          <section className="placeholder-page contact-page page-enter" aria-label="Vista contacto">
            <div className="contact-header">
              <p className="placeholder-page__index">05</p>
              <h2>Contacto</h2>
              <p className="contact-header__sub">
                Cuéntame tu idea. Puedo ayudarte a construirla.
              </p>
            </div>
            <div className="contact-links">
              <a className="contact-card" href="mailto:kevin.carrillo.varas@gmail.com">
                <span className="contact-card__icon"><IconMail /></span>
                <div className="contact-card__body">
                  <strong>Email</strong>
                  <span>kevin.carrillo.varas@gmail.com</span>
                </div>
                <span className="contact-card__arrow"><IconArrow /></span>
              </a>
              <a className="contact-card" href="https://www.linkedin.com/in/kevin-sebastian-carrillo-varas-275228281/" target="_blank" rel="noopener noreferrer">
                <span className="contact-card__icon"><IconLinkedin /></span>
                <div className="contact-card__body">
                  <strong>LinkedIn</strong>
                  <span>linkedin.com/in/kevin-carrillo</span>
                </div>
                <span className="contact-card__arrow"><IconArrow /></span>
              </a>
              <a className="contact-card" href="https://github.com/Serfelzxcv" target="_blank" rel="noopener noreferrer">
                <span className="contact-card__icon"><IconGithub /></span>
                <div className="contact-card__body">
                  <strong>GitHub</strong>
                  <span>github.com/Serfelzxcv</span>
                </div>
                <span className="contact-card__arrow"><IconArrow /></span>
              </a>
              <a className="contact-card" href="https://wa.me/51968879263" target="_blank" rel="noopener noreferrer">
                <span className="contact-card__icon"><IconWhatsapp /></span>
                <div className="contact-card__body">
                  <strong>WhatsApp</strong>
                  <span>+51 968 879 263</span>
                </div>
                <span className="contact-card__arrow"><IconArrow /></span>
              </a>
            </div>
          </section>
        ) : null}
      </section>
    </main>
  )
}

export default App
