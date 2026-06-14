import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Sparkles, 
  Compass, 
  ChevronRight, 
  Anchor, 
  Waves, 
  ShieldCheck,
  Globe,
  Award,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Navbar from "./components/Navbar";
import SearchWidget from "./components/SearchWidget";
import FeaturedHotspots from "./components/FeaturedHotspots";
import ReviewsHub from "./components/ReviewsHub";

export default function App() {
  const [activeDestination, setActiveDestination] = useState("MaldivesAtolls");
  const [isPlaying, setIsPlaying] = useState(true);
  const [bookingSummary, setBookingSummary] = useState<{
    destination: string;
    dates: string;
    vessel: string;
    guests: number;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const destinationDetails: Record<string, { title: string; subtitle: string; depth: string; fact: string; icon: string }> = {
    MaldivesAtolls: {
      title: "Maldives Private Atolls",
      subtitle: "Bespoke Yacht Journeys Across Infinite Sunlit Lagoons",
      depth: "Exotic Reef Depth: 24m",
      fact: "Over 1,190 coral islands curated into perfect harmony.",
      icon: "🏝️"
    },
    BoraBoraTides: {
      title: "Bora Bora Sanctuary",
      subtitle: "Sailing the Deep Turquoise of French Polynesia's Best Keep Secret",
      depth: "Lagoon depth: 12m",
      fact: "Surrounded by a majestic sand-fringed reef and emerald islets.",
      icon: "🐠"
    },
    SantoriniCaldera: {
      title: "Santorini Volcanic Caldera",
      subtitle: "A Classical Maritime Quest Across Dark Volcanic Waters & Cliffs",
      depth: "Volcanic Caldera depth: 400m",
      fact: "Steep, sun-bleached cliffs meet ancient Aegean sea legends.",
      icon: "🏛️"
    },
    GreatBarrierReef: {
      title: "Great Barrier Reef",
      subtitle: "Charting the Largest Living Ecological Reef System on Earth",
      depth: "Biodiverse Reef depth: 18m",
      fact: "Home to thousands of vibrant tropical fish and rare green turtles.",
      icon: "🪸"
    },
    GalapagosLiving: {
      title: "Galápagos Exploration",
      subtitle: "Voyage into the Nexus of Marine Life Evolution & Wildlife Sanctuaries",
      depth: "Sailing Trench depth: 140m",
      fact: "Where three ocean currents converge to host unmatched endemic species.",
      icon: "🐢"
    }
  };

  const activeDetails = destinationDetails[activeDestination] || destinationDetails.MaldivesAtolls;

  // Lock body scroll when booking modal is active to prevent scroll bug on mobile
  useEffect(() => {
    if (bookingSummary) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingSummary]);

  // Auto playback trigger
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(err => {
          console.log("Auto-playback throttled: ", err);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSearchSubmit = (details: typeof bookingSummary) => {
    setBookingSummary(details);
  };

  const triggerScrollToPlanner = () => {
    const planner = document.getElementById("voyage-planner");
    if (planner) {
      planner.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerScrollToAbout = () => {
    const about = document.getElementById("about-us");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerScrollToDestinations = () => {
    const destinations = document.getElementById("destinations-hub");
    if (destinations) {
      destinations.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 font-sans text-slate-100 flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Cinematic Hero Section with full screen background video */}
      <section className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between items-center z-10 px-6 lg:px-12 pb-8 lg:pb-0">
        {/* Background Video container filling exactly this section */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover select-none scale-[1.01]"
          >
            {/* Stream from Local Express Video Proxy which fetches from Google Drive */}
            <source src="/api/video" type="video/mp4" />
            {/* Direct embed fallback as secondary */}
            <source src="https://drive.google.com/uc?export=download&id=1u_pOQlhZCW-LPL35ZCW0VJPXXNV_9F73" type="video/mp4" />
          </video>

          {/* Minimal protective shadow gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/90 z-1 pointer-events-none" />
        </div>

        {/* Top Header Navigation */}
        <Navbar onSearchClick={triggerScrollToPlanner} />

        {/* Responsive Split-Layout for Hero Section content */}
        <div className="relative z-10 flex-grow w-full max-w-7xl mx-auto pt-28 pb-12 lg:py-0 px-4 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* Left Column: Focused Plot-Centric Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              {/* Ambient Micro-badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-950/35 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.1)] mb-1"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span className="font-mono text-[10px] text-cyan-300 font-semibold uppercase tracking-[0.25em]">
                  Eco-Sustainable Ultra-Yachts
                </span>
              </motion.div>

              {/* Bold visual tagline */}
              <span className="font-mono text-xs text-cyan-400/80 tracking-[0.3em] uppercase block -mb-2">
                Bespoke Ocean Expeditions
              </span>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-[42px] sm:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.1] filter drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)]"
              >
                The Deep Ocean <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-white italic">
                  is Calling.
                </span>
              </motion.h1>

              {/* Core Plot-Centric description statement */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] opacity-95"
              >
                Explore untouched marine sanctuaries, navigate remote coral reef archipelagos, and chart custom voyages on premier sailing vessels tailored beautifully to your coordinates.
              </motion.p>

              {/* Primary Action Button - Plotcentric */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4"
              >
                <button
                  onClick={triggerScrollToPlanner}
                  className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:scale-[1.03] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Plot Sea Route</span>
                  <ChevronRight className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={triggerScrollToAbout}
                  className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-slate-100 font-sans font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Learn Our Standard</span>
                </button>
              </motion.div>
            </div>

            {/* Right Column: Dynamic Coordinate Hub moved "aside" */}
            <div className="lg:col-span-5 w-full flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative overflow-hidden bg-slate-950/70 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                
                {/* Active Hub micro badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[9px] text-cyan-300/80 uppercase tracking-[0.25em] flex items-center gap-1.5 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-400/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Selected Coordinate Hub
                  </span>
                  
                  <span className="text-xl">{activeDetails.icon}</span>
                </div>

                {/* Info Stack */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDestination}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-3 min-h-[140px]"
                  >
                    <h3 className="font-serif text-white text-xl sm:text-2xl font-bold tracking-tight">
                      {activeDetails.title}
                    </h3>
                    
                    <p className="font-sans text-xs text-slate-300/90 leading-relaxed font-light">
                      {activeDetails.subtitle}
                    </p>

                    <div className="flex flex-col gap-1.5 mt-2 pt-3 border-t border-cyan-400/10">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-400 font-medium">
                        <Waves className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                        <span>{activeDetails.depth}</span>
                      </div>
                      <div className="font-sans text-[11px] text-slate-400 italic">
                        "{activeDetails.fact}"
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Options button */}
                <div className="mt-6 flex flex-col gap-2">
                  <button
                    onClick={triggerScrollToDestinations}
                    className="w-full py-2.5 rounded-xl border border-cyan-400/30 bg-cyan-950/30 hover:bg-cyan-950/65 text-cyan-355 hover:text-white font-mono text-[10px] tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                    <span>Switch Destination Hub</span>
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Compact Hero Playback status bar */}
        <div className="relative z-10 w-full py-6 flex flex-col md:flex-row items-center justify-between border-t border-white/10 mt-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/40 border border-blue-900/20 mb-3 md:mb-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[9px] text-cyan-300 uppercase tracking-widest">
              Live Ambient Vista
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-mono text-[10px] text-slate-400">
              Made by <span className="text-white hover:text-cyan-300 font-bold transition-colors">Tauheed</span>
            </div>
          </div>
        </div>

      </section>

      {/* 2. New Section: About Us (Solid Dark Slate Ocean Backdrop) */}
      <section id="about-us" className="relative z-10 w-full bg-slate-950 border-t border-cyan-500/10 py-24 px-6 lg:px-12">
        
        {/* Abstract graphic ambient lines inside section background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.03)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Typographic Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              
              <div className="flex items-center gap-2">
                <span className="w-8 h-[1px] bg-cyan-400" />
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
                  About Thalassa Journeys
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium tracking-tight leading-tight">
                Crafting Voyages That <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-100">
                  Empower the Voyager.
                </span>
              </h2>

              <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                For over a decade, <strong className="text-white font-semibold">Thalassa Journeys</strong> has pioneered high-luxury, zero-impact marine travel. We curate personalized sailing itineraries across delicate oceanic regions, establishing a true harmony between pure human curiosity and aquatic preservation.
              </p>

              <blockquote className="border-l-2 border-cyan-400 pl-4 py-1 italic font-serif text-slate-400 text-sm">
                "The ocean is not a barrier between continents; it is a vital web that unifies the soul with the raw currents of nature."
              </blockquote>

              <p className="font-sans text-slate-400 text-sm leading-relaxed">
                Whether charting deep volcano calderas in the Aegean or exploring remote marine wildlife sanctuaries in French Polynesia, our bespoke fleet of crewed catamarans and solar-hybrid vessels ensures a voyage unlike any other.
              </p>

              <div className="flex pt-4">
                <button
                  onClick={triggerScrollToPlanner}
                  className="group inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  <span>Build your voyage manifest</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Column: Key Pillars Bento/Cards */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              
              {/* Premium Stat Card 1 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-blue-900/20 shadow-lg flex items-start gap-4 hover:border-cyan-400/20 transition-all duration-300">
                <div className="p-3 rounded-xl bg-cyan-950/45 border border-cyan-500/20 text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-base tracking-wide mb-1">
                    100% Eco-Conservation
                  </h4>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    Every sea mile booked directly funds coral reef habitat regeneration projects at your chosen sailing destination.
                  </p>
                </div>
              </div>

              {/* Premium Stat Card 2 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-blue-900/20 shadow-lg flex items-start gap-4 hover:border-cyan-400/20 transition-all duration-300">
                <div className="p-3 rounded-xl bg-cyan-950/45 border border-cyan-500/20 text-cyan-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-base tracking-wide mb-1">
                    Bespoke Sailing Routes
                  </h4>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    Skip preset generic pathways. We plot customizable nautical coordinates using our advanced live tracking mechanics.
                  </p>
                </div>
              </div>

              {/* Premium Stat Card 3 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-blue-900/20 shadow-lg flex items-start gap-4 hover:border-cyan-400/20 transition-all duration-300">
                <div className="p-3 rounded-xl bg-cyan-950/45 border border-cyan-500/20 text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-base tracking-wide mb-1">
                    A Luxury Signature
                  </h4>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    Designed by elite master shipwrights. Styled with premium glassmorphism interfaces engineered beautifully by Tauheed.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 3. New Section: Oceanic Voyage Manifest Booking System */}
      <section id="voyage-planner" className="relative z-10 w-full bg-gradient-to-b from-slate-950 via-slate-950 to-blue-950/30 border-t border-cyan-500/10 py-24 px-6 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.03)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="text-center mb-10 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] tracking-widest uppercase">
              <Anchor className="w-3.5 h-3.5" />
              Oceanic Voyage Manifest Selector
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-tight">
              Configure Your Sea Route
            </h2>
            
            <p className="font-sans text-slate-400 text-sm max-w-xl">
              Lock in your calendar coordinates, desired premium vessel class, and voyagers. Our certified luxury crews handles the rest.
            </p>
          </div>

          {/* SearchWidget rendered inside the manifest frame */}
          <div className="w-full">
            <SearchWidget 
              selectedDestination={activeDestination}
              onDestinationChange={(dest) => setActiveDestination(dest)}
              onSearchComplete={handleSearchSubmit} 
            />
          </div>

        </div>
      </section>

      {/* 4. New Section: Select Marine Destination Hub */}
      <section id="destinations-hub" className="relative z-10 w-full bg-slate-950 border-t border-cyan-500/10 py-24 px-6 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.02)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-10">
          <div className="text-center flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] tracking-widest uppercase">
              <Globe className="w-3.5 h-3.5" />
              Interactive Coordinates
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-tight">
              Select Marine Destination Hub
            </h2>
            
            <p className="font-sans text-slate-400 text-sm max-w-xl">
              Preview our pristine handpicked sailing destinations. Clicking any card will synchronize the primary coordinates feed globally.
            </p>
          </div>

          <FeaturedHotspots 
            selectedId={activeDestination} 
            onSelect={(id) => setActiveDestination(id)} 
          />

          {/* Dedicated Readout Panel for Active Destination - highly useful on mobile/tablet viewports */}
          <div className="w-full max-w-2xl mx-auto mt-6 px-2">
            <motion.div
              key={activeDestination}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col gap-4 text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-cyan-300/80 uppercase tracking-widest flex items-center gap-1.5 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-400/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Selected Coordinate Hub Details
                </span>
                <span className="text-2xl">{activeDetails.icon}</span>
              </div>

              <div>
                <h3 className="font-serif text-white text-xl sm:text-2xl font-bold tracking-tight mb-2">
                  {activeDetails.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-350 leading-relaxed font-light">
                  {activeDetails.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-cyan-400/10 mt-2">
                <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-400 font-semibold">
                  <Waves className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                  <span>{activeDetails.depth}</span>
                </div>
                <div className="font-sans text-xs text-slate-400 italic">
                  "{activeDetails.fact}"
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. New Section: Guest Reviews & Impressions */}
      <section id="guest-reviews" className="relative z-10 w-full bg-slate-950/20 border-t border-cyan-500/10 py-24 px-6 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.02)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-12">
          <div className="text-center flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] tracking-widest uppercase">
              <MessageSquare className="w-3.5 h-3.5" />
              Verified Impressions
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-tight">
              Testimonials & Guest Registry
            </h2>
            
            <p className="font-sans text-slate-400 text-sm max-w-xl">
              Discover raw reflections and stories penned by our esteemed scientific explorers and luxury voyagers.
            </p>
          </div>

          <ReviewsHub />
        </div>
      </section>

      {/* 6. Elegant Multi-Column Yachting Footer */}
      <footer className="relative z-10 w-full bg-slate-950 border-t border-cyan-500/10 pt-20 pb-12 px-6 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(6,182,212,0.03)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-16">
          
          {/* Main Footer columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-left">
            
            {/* Column 1: Brand details */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-cyan-400/30 bg-blue-950/40">
                  <Waves className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <span className="font-sans font-semibold tracking-[0.2em] text-sm text-white uppercase block">
                    Thalassa
                  </span>
                  <span className="font-mono text-[8px] tracking-widest text-cyan-300/80 block -mt-1 uppercase">
                    Journeys
                  </span>
                </div>
              </div>
              
              <p className="font-sans text-[12px] text-slate-400 leading-relaxed mt-2">
                Pioneering eco-friendly private voyages through pristine marine sanctuaries. Curating extraordinary luxury expeditions with a zero-carbon ocean footprint initiative.
              </p>

              {/* Verified badges */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-cyan-400/10 text-cyan-300 font-mono text-[9px] uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  Lloyd's Certified
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-cyan-400/10 text-cyan-300 font-mono text-[9px] uppercase tracking-wider">
                  <Anchor className="w-3 h-3 text-cyan-400" />
                  Eco-Sailing V1
                </div>
              </div>
            </div>

            {/* Column 2: Address Coordinates */}
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-semibold border-b border-cyan-400/10 pb-2">
                Global Headquarters
              </h4>
              
              <div className="flex items-start gap-2.5 mt-1">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 font-sans text-xs text-slate-300 leading-relaxed">
                  <p className="font-bold text-white">Thalassa Marina Towers</p>
                  <p>Suite 400, Port of Monaco</p>
                  <p>98000 Monaco</p>
                  <p className="font-mono text-[10px] text-cyan-300/70 mt-1">
                    43.7315° N, 7.4200° E
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Communication & Support */}
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-semibold border-b border-cyan-400/10 pb-2">
                Marine Communications
              </h4>
              
              <div className="flex flex-col gap-4 font-sans text-xs text-slate-300 mt-1">
                <div className="flex items-center gap-2.5 py-0.5">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href="tel:+377931234567" className="hover:text-cyan-300 transition-colors">
                    +377 (93) 123-4567
                  </a>
                </div>
                
                <div className="flex items-center gap-2.5 min-w-0 py-0.5">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href="mailto:expeditions@thalassajourneys.com" className="hover:text-cyan-300 transition-colors break-all text-[11px] sm:text-xs">
                    expeditions@thalassajourneys.com
                  </a>
                </div>

                <div className="flex items-start gap-2.5 pt-3.5 border-t border-cyan-500/10 mt-1">
                  <Waves className="w-4 h-4 text-cyan-400/40 shrink-0 mt-0.5" />
                  <div className="flex flex-col font-mono text-[10px] leading-normal">
                    <span className="text-white/60 font-medium">DSC CALL CH 16</span>
                    <span className="text-cyan-400/80">MMSI: 254999888</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Navigational Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-semibold border-b border-cyan-400/10 pb-2">
                Navigational Hub
              </h4>
              
              <ul className="flex flex-col gap-2 font-sans text-xs text-slate-400">
                <li>
                  <a href="#destinations-hub" className="hover:text-cyan-300 transition-colors">
                    Select Marine Destination Hub
                  </a>
                </li>
                <li>
                  <a href="#voyage-planner" className="hover:text-cyan-300 transition-colors">
                    Private Voyage Planner
                  </a>
                </li>
                <li>
                  <a href="#about-us" className="hover:text-cyan-300 transition-colors">
                    Impact & Eco Standards
                  </a>
                </li>
                <li>
                  <a href="#guest-reviews" className="hover:text-cyan-300 transition-colors">
                    Guest Book & Reviews
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Designer Credit Row */}
          <div className="pt-8 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
            <p className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} Thalassa Journeys.</span>
              <span className="text-slate-600 hidden md:inline">|</span>
              <span className="text-slate-600">All rights reserved.</span>
            </p>
            <p>
              Designed and engineered masterfully by{" "}
              <span className="text-white hover:text-cyan-300 font-bold transition-all underline decoration-cyan-400/30">
                Tauheed
              </span>
            </p>
          </div>

        </div>
      </footer>

      {/* Floating premium credit badge in the bottom-right viewport corner */}
      <div className="fixed bottom-6 right-6 z-50 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-slate-950/85 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] select-none pointer-events-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-mono text-[9px] text-cyan-300 font-semibold tracking-wider uppercase">
          by Tauheed
        </span>
      </div>

      {/* Booking confirmation Overlay at the Root level (safeguarded against z-index container bugs) */}
      <AnimatePresence>
        {bookingSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              className="my-auto w-full max-w-md bg-slate-900 border border-cyan-400/30 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
              
              <div className="mx-auto w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 mt-2">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-2xl text-white font-medium mb-2">
                Oceanic Voyage Configured
              </h3>
              <p className="text-sm text-slate-400 mb-6 font-sans">
                Tauheed's voyage mapping engine successfully logged your sea lanes under prime nautical conditions.
              </p>

              <div className="bg-slate-950/60 rounded-2xl p-4 text-left border border-blue-900/20 flex flex-col gap-3 mb-6 font-sans">
                <div className="flex justify-between text-xs p-0.5">
                  <span className="text-slate-400 font-mono">SANCTUARY:</span>
                  <span className="text-cyan-300 font-bold">{bookingSummary.destination}</span>
                </div>
                <div className="flex justify-between text-xs p-0.5">
                  <span className="text-slate-400 font-mono">SAILING DATE:</span>
                  <span className="text-slate-200">{bookingSummary.dates}</span>
                </div>
                <div className="flex justify-between text-xs p-0.5">
                  <span className="text-slate-400 font-mono">VESSEL CLASS:</span>
                  <span className="text-slate-200">{bookingSummary.vessel}</span>
                </div>
                <div className="flex justify-between text-xs p-0.5">
                  <span className="text-slate-400 font-mono">VOYAGERS:</span>
                  <span className="text-slate-200 font-bold">{bookingSummary.guests} Luxury Guests</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setBookingSummary(null)}
                  className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl font-sans font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Confirm Charter Registry
                </button>
                <button
                  onClick={() => setBookingSummary(null)}
                  className="w-full py-3 text-slate-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Adjust Coordinates
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

