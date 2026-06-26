import { Mail, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router';
import { services } from '../data/services';

export function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-[var(--brand-green)] transition-colors duration-300">Home</button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[var(--brand-green)] transition-colors duration-300">About Us</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('industries')} className="hover:text-[var(--brand-green)] transition-colors duration-300">Industries</button>
              </li>
              <li>
                <button onClick={() => navigate('/blogs')} className="hover:text-[var(--brand-green)] transition-colors duration-300">Blogs</button>
              </li>
              <li>
                <button onClick={() => navigate('/careers')} className="hover:text-[var(--brand-green)] transition-colors duration-300">Careers</button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[var(--brand-green)] transition-colors duration-300">Contact Us</button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => navigate(`/services/${s.id}`)}
                    className="hover:text-[var(--brand-green)] transition-colors duration-300 text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Our Location</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-[var(--brand-green)] flex-shrink-0 mt-1" />
                <p className="text-sm">The Woodlands, Texas, USA</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[var(--brand-green)]" />
                <a href="mailto:contact@vulbright.com" className="hover:text-[var(--brand-green)] transition-colors duration-300">
                  contact@vulbright.com
                </a>
              </div>
              <div className="flex gap-4 mt-6">
                <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-[var(--brand-green)] transition-colors duration-300">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-[var(--brand-green)] transition-colors duration-300">
                  <Twitter size={20} />
                </a>
                <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-[var(--brand-green)] transition-colors duration-300">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400">
            &copy; 2026 Vulbright INC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
