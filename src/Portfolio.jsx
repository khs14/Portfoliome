import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, GraduationCap, Briefcase, FileText, Code, Heart, Mail, Linkedin, Github, Download } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slideFolder = isMobile ? '/slidesm' : '/slides';


  const sections = [
    {
      heading: '',
      icon: Home,
      items: [
        { key: 'intro', title: 'Introduction' },
      ],
    },
    {
      heading: 'Education',
      icon: GraduationCap,
      items: [
        { key: 'edu-highschool', title: 'High School' },
        { key: 'edu-undergrad', title: 'Undergraduate' },
        { key: 'edu-masters', title: 'Masters (PG)' },
        //  add more education slides here, e.g.:
        // { key: 'edu-phd', title: 'PhD' },
      ],
    },
    {
      heading: 'Work Experience',
      icon: Briefcase,
      items: [
        { key: 'work-1', title: 'Work Experience 1' },
        { key: 'work-2', title: 'Work Experience 2' },
        { key: 'work-3', title: 'Work Experience 3' },
        { key: 'work-4', title: 'Work Experience 4' },
        { key: 'work-5', title: 'Work Experience 5' },
        //  add more jobs here, e.g.:
        // { key: 'work-6', title: 'Work Experience 6' },
      ],
    },
    {
      heading: 'Research',
      icon: FileText,
      items: [
        { key: 'research-1', title: 'Research Paper 1' },
        //  add more papers here, e.g.:
        // { key: 'research-2', title: 'Research Paper 2' },
      ],
    },
    {
      heading: 'Personal Projects',
      icon: Code,
      items: [
        { key: 'projects-1', title: 'Project 1' },
        // add more project slides here, e.g.:
        // { key: 'projects-2', title: 'Project 2' },
      ],
    },
    {
      heading: 'Hobbies',
      icon: Heart,
      items: [
        { key: 'hobbies', title: 'Personal Hobbies' },
      ],
    },
    {
      heading: 'Contact Me',
      icon: Mail,
      items: [
        { key: 'contact', title: 'Contact Me' },
      ],
    },
  ];

  // Flatten sections into the flat slide list the rest of the component uses.
  const colorsByPosition = ['pink', 'yellow'];
  let runningIndex = 0;
  const slides = sections.flatMap((section) =>
    section.items.map((item) => {
      const slide = {
        ...item,
        id: runningIndex,
        heading: section.heading,
        icon: section.icon,
        color: colorsByPosition[runningIndex % 2],
        image: item.key === 'contact' ? null : `${slideFolder}/${item.key}.png`,
      };
      runningIndex += 1;
      return slide;
    })
  );

  const contactSlideId = slides.find((s) => s.key === 'contact').id;

  const navItems = slides.reduce((acc, slide) => {
    if (!acc.find((item) => item.heading === slide.heading)) {
      acc.push({
        heading: slide.heading,
        icon: slide.icon,
        slideId: slide.id,
      });
    }
    return acc;
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const ContactSlide = () => (
    <div className="contact-container">
      <h1 className="contact-title">Let's Connect!</h1>
      <div className="contact-grid">
        <a href="https://www.linkedin.com/in/kaustubh-hari-sethi" target="_blank" rel="noopener noreferrer" className="contact-link contact-link-pink">
          <Linkedin className="contact-icon-yellow" />
          <span className="contact-text-pink">LinkedIn</span>
        </a>

        <a href="mailto:kaustubhsethi14@gmail.com" className="contact-link contact-link-yellow">
          <Mail className="contact-icon-pink" />
          <span className="contact-text-yellow">Email</span>
        </a>

        <a href="https://github.com/khs14" target="_blank" rel="noopener noreferrer" className="contact-link contact-link-pink">
          <Github className="contact-icon-yellow" />
          <span className="contact-text-pink">GitHub</span>
        </a>

        <a href="https://x.com/CodesKhs" target="_blank" rel="noopener noreferrer" className="contact-link contact-link-yellow">
          <span className="contact-icon-pink" style={{ fontSize: '2rem', fontWeight: 'bold' }}>𝕏</span>
          <span className="contact-text-yellow">X (Twitter)</span>
        </a>

        <a href="/resume.pdf" download className="contact-link contact-link-pink">
          <Download className="contact-icon-yellow" />
          <span className="contact-text-pink">Resume</span>
        </a>

        <a href="tel:+919205004891" className="contact-link contact-link-yellow">
          <span className="contact-icon-pink" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>📞</span>
          <span className="contact-text-yellow">+91 9205004891</span>
        </a>
      </div>
    </div>
  );

  const ImageSlide = ({ slide }) => (
    <div className="image-slide-container">
      <img
        src={slide.image}
        alt={slide.title}
        className="slide-image"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="placeholder-container" style={{ display: 'none' }}>
        <slide.icon className={`placeholder-icon placeholder-icon-${slide.color}`} />
        <h1 className={`placeholder-title placeholder-title-${slide.color}`}>{slide.title}</h1>
        <p className="placeholder-text-yellow">slide image in:</p>
        <p className="placeholder-text-pink">public/slides/{slide.key}.png (and public/slidesm/{slide.key}.png)</p>
      </div>
    </div>
  );

  return (
    <div className="portfolio-container">
      <div className="nav-bar">
        <div className="nav-container">
          <div className="nav-buttons">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = slides[currentSlide].heading === item.heading;
              return (
                <button
                  key={item.slideId}
                  onClick={() => goToSlide(item.slideId)}
                  className={`nav-button ${isActive ? 'nav-button-active' : 'nav-button-inactive'}`}
                >
                  <Icon className={isActive ? 'nav-icon-active' : 'nav-icon-inactive'} />
                  {!isMobile && item.heading && <span className="nav-button-text">{item.heading}</span>}
                </button>
              );
            })}
          </div>

          <div className="arrow-controls">
            <button onClick={prevSlide} className="arrow-button">
              <ChevronLeft className="arrow-icon" />
            </button>
            <span className="slide-counter">
              <span className="slide-counter-current">{currentSlide + 1}</span>
              <span className="slide-counter-total"> / {slides.length}</span>
            </span>
            <button onClick={nextSlide} className="arrow-button">
              <ChevronRight className="arrow-icon" />
            </button>
          </div>
        </div>
      </div>

      <div className="slide-content">
        <div className="slide-inner">
          {currentSlide === contactSlideId ? (
            <ContactSlide />
          ) : (
            <ImageSlide slide={slides[currentSlide]} />
          )}
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-inner">
          <div className="progress-bars">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`progress-bar ${index === currentSlide ? 'progress-bar-active' : 'progress-bar-inactive'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;