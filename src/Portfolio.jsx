import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, GraduationCap, Briefcase, Code, Heart, Mail, Linkedin, Github, Download } from 'lucide-react';
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
  
  const slides = [
    { id: 0, title: 'Introduction', heading: '', icon: Home, color: 'pink', image: `${slideFolder}/slide1.png` },
    { id: 1, title: 'High School', heading: 'Education', icon: GraduationCap, color: 'yellow', image: `${slideFolder}/slide2.png` },
    { id: 2, title: 'Undergraduate', heading: 'Education', icon: GraduationCap, color: 'pink', image: `${slideFolder}/slide3.png` },
    { id: 3, title: 'Work Experience 1', heading: 'Work Experience', icon: Briefcase, color: 'yellow', image: `${slideFolder}/slide4.png` },
    { id: 4, title: 'Work Experience 2', heading: 'Work Experience', icon: Briefcase, color: 'pink', image: `${slideFolder}/slide5.png` },
    { id: 5, title: 'Work Experience 3', heading: 'Work Experience', icon: Briefcase, color: 'yellow', image: `${slideFolder}/slide6.png` },
    { id: 6, title: 'Work Experience 4', heading: 'Work Experience', icon: Briefcase, color: 'pink', image: `${slideFolder}/slide7.png` },
    { id: 7, title: 'Work Experience 5', heading: 'Work Experience', icon: Briefcase, color: 'yellow', image: `${slideFolder}/slide8.png` },
    { id: 8, title: 'Personal Projects', heading: 'Personal Projects', icon: Code, color: 'pink', image: `${slideFolder}/slide9.png` },
    { id: 9, title: 'Personal Hobbies', heading: 'Hobbies', icon: Heart, color: 'yellow', image: `${slideFolder}/slide10.png` },
    { id: 10, title: 'Contact Me', heading: 'Contact Me', icon: Mail, color: 'pink', image: null }
  ]

  
  const navItems = slides.reduce((acc, slide) => {
    if (!acc.find(item => item.heading === slide.heading)) {
      acc.push({
        heading: slide.heading,
        icon: slide.icon,
        slideId: slide.id
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
        <p className="placeholder-text-pink">public/slides/slide{slide.id + 1}.png</p>
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
          {currentSlide === 10 ? (
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