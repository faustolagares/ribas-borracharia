
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, Wrench, Disc, Activity, Zap, CheckCircle2, ChevronRight, Star, MessageCircle, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { ServiceItem, Testimonial } from './types';

// Custom SVG Components for Automotive Vibe
const TireTrackPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" width="100%" height="100%">
    <pattern id="tire-track" x="0" y="0" width="100" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <path d="M10 0 L40 0 L30 20 L0 20 Z" fill="currentColor" />
      <path d="M60 40 L90 40 L80 60 L50 60 Z" fill="currentColor" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#tire-track)" />
  </svg>
);

const GiantWheelVector = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 500 500" className={className} fill="none" stroke="currentColor" strokeWidth="0">
    <circle cx="250" cy="250" r="240" className="stroke-white/10" strokeWidth="20" strokeDasharray="40 10" />
    <circle cx="250" cy="250" r="180" className="stroke-ribas-yellow/20" strokeWidth="40" />
    <circle cx="250" cy="250" r="100" className="fill-ribas-blue/20" />
    {/* Stylized Spokes */}
    <path d="M250 150 L250 50" stroke="currentColor" strokeWidth="20" className="stroke-ribas-yellow/30" />
    <path d="M250 350 L250 450" stroke="currentColor" strokeWidth="20" className="stroke-ribas-yellow/30" />
    <path d="M150 250 L50 250" stroke="currentColor" strokeWidth="20" className="stroke-ribas-yellow/30" />
    <path d="M350 250 L450 250" stroke="currentColor" strokeWidth="20" className="stroke-ribas-yellow/30" />
    <path d="M320 320 L390 390" stroke="currentColor" strokeWidth="20" className="stroke-ribas-yellow/30" />
    <path d="M180 180 L110 110" stroke="currentColor" strokeWidth="20" className="stroke-ribas-yellow/30" />
    <path d="M320 180 L390 110" stroke="currentColor" strokeWidth="20" className="stroke-ribas-yellow/30" />
    <path d="M180 320 L110 390" stroke="currentColor" strokeWidth="20" className="stroke-ribas-yellow/30" />
  </svg>
);

// Warning Stripe Pattern
const WarningStripe = () => (
  <div className="h-6 w-full relative z-20" style={{
    backgroundImage: 'repeating-linear-gradient(45deg, #FFD700, #FFD700 20px, #002776 20px, #002776 40px)'
  }}></div>
);

// Mock Data
const services: ServiceItem[] = [
  {
    id: 1,
    title: "VULCANIZAÇÃO",
    description: "Tecnologia de ponta para reparo estrutural. Segurança total em cortes laterais.",
    icon: <Zap />
  },
  {
    id: 2,
    title: "BALANCEAMENTO 3D",
    description: "Equilíbrio perfeito. Zero vibrações e maior vida útil para seus pneus.",
    icon: <Disc />
  },
  {
    id: 3,
    title: "GEOMETRIA",
    description: "Ajuste milimétrico dos ângulos para estabilidade absoluta e economia.",
    icon: <Activity />
  },
  {
    id: 4,
    title: "PNEUS NOVOS",
    description: "As melhores marcas do asfalto estão aqui. Rapidez na troca.",
    icon: <CheckCircle2 />
  }
];

const testimonials: Testimonial[] = [
  { id: 1, name: "Carlos Eduardo", text: "Visual insano e serviço rápido. A melhor da região.", rating: 5 },
  { id: 2, name: "Fernanda Souza", text: "Salvaram meu pneu com a vulcanização. Recomendo.", rating: 5 },
  { id: 3, name: "Roberto Lima", text: "Preço justo e honestidade. Virei cliente fiel.", rating: 5 },
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const logoUrl = "/logo/ribas-logo.avif"; 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-ribas-yellow selection:text-ribas-blue overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 border-b-2 ${scrolled ? 'bg-ribas-blue border-ribas-yellow py-2 shadow-lg' : 'bg-transparent border-transparent py-4 md:py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 z-50">
             <div className="relative group cursor-pointer">
                <img src={logoUrl} alt="Ribas Logo" className="h-10 md:h-20 object-contain transition-transform transform group-hover:scale-105" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="font-sport font-black text-3xl md:text-4xl text-white italic tracking-tighter">RIBAS<span class="text-ribas-yellow">.BORRACHARIA</span></span>';
                }}/>
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {['Início', 'Serviços', 'Sobre', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-white font-black text-lg uppercase italic tracking-wider hover:text-ribas-yellow transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-ribas-yellow transition-all duration-300 group-hover:w-full skew-x-[-12deg]"></span>
              </a>
            ))}
            <a 
              href="#contato" 
              className="bg-ribas-yellow text-ribas-blue border-2 border-ribas-yellow px-8 py-3 font-black text-lg skew-x-[-12deg] hover:bg-transparent hover:text-ribas-yellow transition-colors uppercase tracking-tight"
            >
              <span className="block skew-x-[12deg]">Agendar</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white z-50 p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-ribas-blue z-40 flex flex-col justify-center items-center space-y-6 md:space-y-8 animate-in fade-in duration-200">
            {['Início', 'Serviços', 'Sobre', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-white font-sport font-black text-4xl md:text-5xl italic hover:text-ribas-yellow transition-colors">
                {item}
              </a>
            ))}
            <a 
              href="https://wa.me/5521979810320" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-ribas-yellow text-ribas-blue text-lg md:text-xl px-10 py-3 md:px-12 md:py-4 font-black uppercase skew-x-[-12deg] mt-8 block text-center"
            >
              <span className="block skew-x-[12deg]">Whatsapp</span>
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="início" className="relative min-h-screen flex items-center bg-ribas-blue overflow-hidden pt-20">
        <TireTrackPattern />
        
        {/* Abstract Background Graphic */}
        <div className="absolute -right-32 md:-right-64 top-1/2 transform -translate-y-1/2 opacity-20 md:opacity-40 animate-spin-slow" style={{animationDuration: '60s'}}>
          <GiantWheelVector className="w-[500px] h-[500px] md:w-[1200px] md:h-[1200px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="h-1 w-12 md:w-20 bg-ribas-yellow"></div>
              <span className="text-ribas-yellow font-bold text-sm md:text-xl uppercase tracking-[0.2em]">Borracharia Premium</span>
            </div>
            
            <h1 className="font-sport font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-6 md:mb-8 italic uppercase break-words">
              Performance <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ribas-yellow to-white stroke-text-yellow">
                Sem Limites
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-2xl mb-8 md:mb-12 max-w-2xl font-light leading-relaxed border-l-4 border-ribas-yellow pl-4 md:pl-6">
              Não é só pneu. É a sua segurança. Tecnologia avançada e atendimento especializado para quem exige o melhor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
              <a 
                href="#serviços" 
                className="group bg-ribas-yellow text-ribas-blue px-8 py-4 md:px-10 md:py-5 font-black text-lg md:text-xl uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 border-2 border-ribas-yellow skew-x-[-6deg] w-full sm:w-auto"
              >
                <span className="skew-x-[6deg] flex items-center gap-2">
                  <Wrench className="w-5 h-5 md:w-6 md:h-6" />
                  Nossos Serviços
                </span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-2 transition-transform skew-x-[6deg]" />
              </a>
              
              <a 
                href="#contato" 
                className="group px-8 py-4 md:px-10 md:py-5 font-black text-lg md:text-xl uppercase tracking-wider text-white border-2 border-white hover:bg-white hover:text-ribas-blue transition-all duration-300 flex items-center justify-center gap-3 skew-x-[-6deg] w-full sm:w-auto"
              >
                <span className="skew-x-[6deg] flex items-center gap-2">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                  Localização
                </span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative Bottom Bar */}
        <div className="absolute bottom-0 w-full h-4 bg-ribas-yellow skew-y-1"></div>
      </section>

      {/* Stats Strip */}
      <div className="bg-white border-b-4 border-ribas-blue py-8 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-8">
             {[
               { val: "15min", label: "ATENDIMENTO RÁPIDO" },
               { val: "5K+", label: "PNEUS TROCADOS" },
               { val: "100%", label: "GARANTIA RIBAS" },
             ].map((stat, i) => (
               <div key={i} className="flex items-center gap-3 md:gap-4 group cursor-default">
                  <span className="font-sport font-black text-4xl md:text-6xl text-ribas-blue group-hover:text-ribas-yellow transition-colors italic">{stat.val}</span>
                  <span className="font-bold text-gray-800 text-xs md:text-sm tracking-widest leading-tight uppercase w-20 md:w-24">{stat.label}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="serviços" className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
        {/* Background Big Text */}
        <div className="absolute top-0 right-0 font-sport font-black text-[10rem] md:text-[20rem] text-gray-200 opacity-20 select-none leading-none -mt-10 md:-mt-20 -mr-10 md:-mr-20 z-0">
          SERV
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mb-12 md:mb-20">
            <h2 className="text-ribas-blue font-sport font-black text-4xl sm:text-6xl md:text-7xl mb-4 italic uppercase">
              Nossos <span className="text-ribas-yellow bg-ribas-blue px-2 shadow-sm">Serviços</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-lg font-medium">
              Equipamentos de última geração para precisão absoluta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.id} className="group bg-white p-6 md:p-8 border-2 border-gray-100 hover:border-ribas-blue transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform scale-[3]">
                   {service.icon}
                </div>
                
                <div className="mb-6 md:mb-8 relative">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-ribas-yellow flex items-center justify-center text-ribas-blue skew-x-[-10deg]">
                    {React.cloneElement(service.icon as React.ReactElement, { className: "w-7 h-7 md:w-8 md:h-8 skew-x-[10deg]" })}
                  </div>
                </div>
                
                <h3 className="font-sport font-black text-xl md:text-2xl text-ribas-blue mb-4 uppercase italic group-hover:translate-x-2 transition-transform">{service.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-6 border-l-2 border-gray-200 pl-4 text-sm md:text-base">{service.description}</p>
                
                <a href="#" className="inline-flex items-center font-bold text-ribas-blue uppercase tracking-wider text-xs md:text-sm group-hover:text-ribas-yellow transition-colors">
                  Detalhes <ChevronRight className="w-4 h-4 ml-1" />
                </a>
                
                {/* Bottom Bar on Hover */}
                <div className="absolute bottom-0 left-0 w-0 h-2 bg-ribas-yellow transition-all duration-300 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="sobre" className="py-20 md:py-32 bg-ribas-blue relative">
        <TireTrackPattern />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h2 className="text-center font-sport font-black text-4xl md:text-7xl text-white mb-12 md:mb-20 italic uppercase">
            Quem roda <span className="text-ribas-yellow">confia</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-transparent border-4 border-white/10 p-6 md:p-10 hover:border-ribas-yellow transition-colors duration-300">
                <div className="flex text-ribas-yellow mb-4 md:mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" className="mr-1" />)}
                </div>
                <p className="text-white text-lg md:text-xl font-medium italic mb-6 md:mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-ribas-yellow flex items-center justify-center text-ribas-blue font-black text-lg md:text-xl skew-x-[-10deg]">
                    <span className="skew-x-[10deg]">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-sm md:text-base">{t.name}</h4>
                    <span className="text-xs text-blue-300 uppercase font-bold flex items-center mt-1">
                      <CheckCircle2 size={12} className="mr-1"/> Verificado
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Contact */}
      <section id="contato" className="relative py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-ribas-blue font-sport font-black text-4xl md:text-7xl italic uppercase">
              Vem pra <span className="text-ribas-yellow">Ribas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Contact Info Card */}
            <div className="bg-white p-6 md:p-12 border-2 border-gray-100 hover:border-ribas-blue transition-all duration-300 relative overflow-hidden">
              <div className="space-y-8 md:space-y-10">
                {[
                  { icon: <MapPin className="w-6 h-6 md:w-8 md:h-8"/>, title: "ENDEREÇO", l1: "Av. Automotiva, 1234", l2: "Centro - São Paulo/SP" },
                  { icon: <Phone className="w-6 h-6 md:w-8 md:h-8"/>, title: "TELEFONE", l1: "+55 21 97981-0320", l2: "Seg a Sex: 08h - 18h" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 md:gap-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-ribas-yellow flex items-center justify-center text-ribas-blue shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-ribas-blue font-sport font-black text-xl md:text-2xl uppercase mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-900 text-base md:text-lg font-bold">{item.l1}</p>
                      <p className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wide">{item.l2}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 md:mt-12">
                <a 
                  href="https://wa.me/5521979810320" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-black text-lg md:text-xl py-5 md:py-6 uppercase tracking-widest transition-all flex items-center justify-center gap-4 border-2 border-green-600 hover:border-green-500"
                >
                  <MessageCircle size={24} className="md:w-7 md:h-7" />
                  Chamar no Whatsapp
                </a>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative min-h-[350px] md:min-h-[500px] bg-gray-200 border-2 border-gray-100 hover:border-ribas-blue transition-all duration-300 group overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975!2d-46.6!3d-23.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMwJzAwLjAiUyA0NsKwMzYnMDAuMCJX!5e0!3m2!1sen!2sbr!4v1600000000000!5m2!1sen!2sbr" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
                allowFullScreen={false} 
                loading="lazy"
                title="Localização Ribas Borracharia">
              </iframe>
              
              <div className="absolute bottom-0 left-0 bg-ribas-yellow px-6 py-2 md:px-8 md:py-3 border-t-2 border-r-2 border-ribas-blue">
                <span className="text-ribas-blue font-black text-lg md:text-xl font-sport uppercase">
                  Localização
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer - UPDATED: Brand Blue Background & Clean Schedule */}
      <footer className="bg-ribas-blue text-white relative overflow-hidden">
        <WarningStripe />
        
        {/* Giant Watermark */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 opacity-[0.05] pointer-events-none select-none">
           <span className="font-sport font-black text-[8rem] md:text-[25rem] whitespace-nowrap text-white">RIBAS</span>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            {/* Brand Column */}
            <div className="col-span-1 lg:col-span-2">
              <div className="mb-4 md:mb-6">
                <img 
                  src="/logo/ribas-logo.avif" 
                  alt="Ribas Logo" 
                  className="h-12 md:h-16 object-contain"
                />
              </div>
              <p className="text-blue-100 text-base md:text-lg max-w-md font-medium leading-relaxed border-l-4 border-ribas-yellow pl-4 md:pl-6 mb-6 md:mb-8">
                Mais do que uma borracharia, um centro de performance para o seu veículo. Segurança, tecnologia e atendimento que você merece.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram size={24} />, href: "#" },
                  { icon: <Facebook size={24} />, href: "#" }
                ].map((social, i) => (
                  <a key={i} href={social.href} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white bg-blue-900 border-2 border-blue-400 hover:bg-ribas-yellow hover:text-ribas-blue hover:border-ribas-yellow transition-all skew-x-[-6deg]">
                    <div className="skew-x-[6deg]">{social.icon}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="font-sport font-black text-xl md:text-2xl text-white uppercase italic mb-6 md:mb-8 flex items-center gap-2">
                <span className="w-2 h-6 md:h-8 bg-ribas-yellow inline-block skew-x-[-12deg]"></span> Navegação
              </h4>
              <ul className="space-y-3 md:space-y-4">
                {['Início', 'Serviços', 'Sobre a Ribas', 'Agendamento', 'Contato'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-200 font-bold uppercase tracking-wider hover:text-ribas-yellow hover:pl-2 transition-all flex items-center gap-2 group text-sm md:text-base">
                      <ChevronRight size={16} className="text-ribas-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours Column - UPDATED: Transparent & Bold */}
            <div>
              <h4 className="font-sport font-black text-xl md:text-2xl text-white uppercase italic mb-6 md:mb-8 flex items-center gap-2">
                <span className="w-2 h-6 md:h-8 bg-ribas-yellow inline-block skew-x-[-12deg]"></span> Horários
              </h4>
              <div className="space-y-6 md:space-y-8">
                <div>
                  <p className="text-ribas-yellow font-bold uppercase text-xs md:text-sm mb-1 tracking-widest">Segunda a Sexta</p>
                  <p className="text-white font-black text-2xl md:text-3xl font-sport tracking-wide">08:00 - 18:00</p>
                </div>
                <div>
                  <p className="text-ribas-yellow font-bold uppercase text-xs md:text-sm mb-1 tracking-widest">Sábado</p>
                  <p className="text-white font-black text-2xl md:text-3xl font-sport tracking-wide">08:00 - 14:00</p>
                </div>
                <div className="flex items-center gap-2 text-blue-200 font-bold uppercase text-xs mt-4 bg-blue-900/50 w-fit px-3 py-1 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  Fechado aos Domingos
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-blue-900 bg-blue-950 py-6 md:py-8">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-300 font-bold uppercase text-xs md:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Ribas Borracharia. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 md:gap-8">
               <span className="text-blue-300 font-bold uppercase text-[10px] md:text-xs cursor-pointer hover:text-white transition-colors">Termos de Uso</span>
               <span className="text-blue-300 font-bold uppercase text-[10px] md:text-xs cursor-pointer hover:text-white transition-colors">Política de Privacidade</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5521979810320"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-green-600 hover:bg-green-500 text-white p-4 md:p-5 transition-all flex items-center justify-center border-2 border-green-600 hover:border-green-500"
      >
        <MessageCircle size={28} className="md:w-9 md:h-9" strokeWidth={2.5} />
      </a>
    </div>
  );
};

export default App;
