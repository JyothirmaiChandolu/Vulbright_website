import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImg from '../../imports/logo.png';
import { services } from '../data/services';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (link: string) => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    if (link === 'Contact Us') { navigate('/contact'); return; }
    if (link === 'About Us') { navigate('/about'); return; }
    if (link === 'Blogs') { navigate('/blogs'); return; }
    if (link === 'Careers') { navigate('/careers'); return; }
    const sectionId = link.toLowerCase().replace(/ /g, '-');
    scrollToSection(sectionId);
  };

  const staticLinks = ['Home', 'About Us', 'Blogs', 'Careers', 'Contact Us'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm -z-10" />
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-28">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <ImageWithFallback
              src={logoImg}
              alt="Vulbright INC"
              className="h-14 lg:h-28 w-auto object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {(['Home', 'About Us'] as const).map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="text-sm font-medium text-gray-700 hover:text-[var(--brand-green)] transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--brand-green)] group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesOpen((v) => !v)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[var(--brand-green)] transition-colors duration-300 relative group"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--brand-green)] group-hover:w-full transition-all duration-300" />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setServicesOpen(false);
                        navigate(`/services/${service.id}`);
                      }}
                      className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-[var(--brand-green)]/5 hover:text-[var(--brand-green)] transition-colors duration-200"
                    >
                      {service.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {(['Blogs', 'Careers'] as const).map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="text-sm font-medium text-gray-700 hover:text-[var(--brand-green)] transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--brand-green)] group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            <button
              onClick={() => handleNavClick('Contact Us')}
              className="text-sm font-medium text-gray-700 hover:text-[var(--brand-green)] transition-colors duration-300 relative group"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--brand-green)] group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="px-5 py-2 bg-[var(--brand-green)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--brand-green-dark)] transition-all duration-300 shadow hover:shadow-md"
            >
              Get Quote
            </button>
          </div>

          <button
            onClick={() => {
              const next = !mobileMenuOpen;
              setMobileMenuOpen(next);
              if (!next) setMobileServicesOpen(false);
            }}
            className="lg:hidden p-2 text-gray-700"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col gap-1">
              {staticLinks.slice(0, 2).map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className="text-sm font-medium text-gray-700 hover:text-[var(--brand-green)] transition-colors duration-300 text-left py-3 px-2"
                >
                  {link}
                </button>
              ))}

              {/* Mobile Services — uses separate state to avoid desktop dropdown race condition */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[var(--brand-green)] transition-colors duration-300 py-3 px-2 w-full"
                >
                  Services <ChevronDown size={14} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="ml-4 flex flex-col gap-1 pb-1">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onPointerDown={() => {
                          setMobileMenuOpen(false);
                          setMobileServicesOpen(false);
                          navigate(`/services/${service.id}`);
                        }}
                        className="text-sm text-gray-600 hover:text-[var(--brand-green)] transition-colors duration-200 text-left py-2.5 px-2"
                      >
                        {service.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {staticLinks.slice(2).map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className="text-sm font-medium text-gray-700 hover:text-[var(--brand-green)] transition-colors duration-300 text-left py-3 px-2"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
