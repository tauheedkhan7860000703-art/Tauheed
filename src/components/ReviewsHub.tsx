import React, { useState, useEffect } from "react";
import { Star, Quote, MessageSquare, Anchor, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Review {
  id: string;
  name: string;
  location: string;
  vessel: string;
  rating: number;
  text: string;
  date: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Alexandra & Pierre Dubois",
    location: "Geneva, Switzerland",
    vessel: "Luxury Sailing Catamaran",
    rating: 5,
    text: "An absolutely transcendent journey across French Polynesia. The hybrid catamaran was near-silent, permitting us to slide beautifully beside rare marine sanctuaries. The crew's ecological care remains the Gold Standard.",
    date: "May 2026"
  },
  {
    id: "rev-2",
    name: "Marcus Vance",
    location: "San Francisco, CA",
    vessel: "Private Superyacht Charter",
    rating: 5,
    text: "The voyage mapping engine configured our Maldivian lagoon itinerary down to the minute. Aligning our anchor points with pristine coral sanctuaries and local tides felt truly tailor-made. Highly recommended.",
    date: "April 2026"
  },
  {
    id: "rev-3",
    name: "Dr. Evelyn Thorne",
    location: "Sailing Author & Ecologist",
    vessel: "Hybrid Marine Safari Cruiser",
    rating: 5,
    text: "Navigating the deep, ancient volcanic Caldera of Santorini on an eco-conscious luxury vessel was extraordinary. Engaging directly with safe ecological soundings aboard provided unforgettable memories for my entire family.",
    date: "June 2026"
  }
];

export default function ReviewsHub() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [vessel, setVessel] = useState("Luxury Sailing Catamaran");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("thalassa-reviews");
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(DEFAULT_REVIEWS);
      }
    } else {
      setReviews(DEFAULT_REVIEWS);
    }
  }, []);

  const saveReviews = (updated: Review[]) => {
    setReviews(updated);
    localStorage.setItem("thalassa-reviews", JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name,
      location: location || "Global Mariner",
      vessel,
      rating,
      text,
      date: "Just Now"
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);
    
    // Reset form with feedback
    setName("");
    setLocation("");
    setText("");
    setRating(5);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <div className="w-full flex flex-col gap-16">
      
      {/* Testimonials Bento Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, index) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative overflow-hidden bg-slate-950/40 backdrop-blur-xl border border-cyan-500/10 hover:border-cyan-400/30 rounded-3xl p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_45px_rgba(34,211,238,0.05)]"
          >
            {/* Top glass ambient flow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-450/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            
            <div className="flex flex-col gap-5">
              {/* Stars & Rating indicator and quote icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? "text-cyan-400 fill-cyan-400" : "text-slate-800"
                      }`}
                    />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-cyan-400/20 group-hover:text-cyan-400/40 transition-colors" />
              </div>

              {/* Text comment body */}
              <p className="font-serif text-slate-200 text-[14px] leading-relaxed italic filter drop-shadow-sm min-h-[100px]">
                "{rev.text}"
              </p>
            </div>

            {/* Guest details stack */}
            <div className="mt-6 pt-5 border-t border-cyan-500/10 flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <h4 className="font-sans font-bold text-white text-sm tracking-wide">
                  {rev.name}
                </h4>
                <span className="font-mono text-[9px] text-slate-500">{rev.date}</span>
              </div>
              
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-300/80">{rev.location}</span>
                <span className="text-white/40 flex items-center gap-1">
                  <Anchor className="w-2.5 h-2.5 text-cyan-300/50" />
                  {rev.vessel}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Guest logbook insertion form */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl mx-auto bg-slate-950/30 backdrop-blur-xl border border-cyan-405/15 rounded-3xl p-6 sm:p-8"
      >
        <div className="flex flex-col gap-4 text-center mb-6">
          <div className="inline-flex self-center items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 font-mono text-[10px] tracking-widest uppercase">
            <MessageSquare className="w-3 h-3" />
            Nautical Registry
          </div>
          <h3 className="font-serif text-2xl text-white font-medium">
            Record Your Sanctuary Impression
          </h3>
          <p className="font-sans text-xs text-slate-400 max-w-md mx-auto">
            Logged an unforgettable eco-experience on our platform? Contribute your voyage testimonial to Thalassa's global guest catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Input Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                Explorer Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Capt. Julian Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950/50 border border-blue-900/35 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Input Residence */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                Residence / Base coordinates
              </label>
              <input
                type="text"
                placeholder="e.g. London, UK"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950/50 border border-blue-900/35 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Vessel Experience Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                Vessel Cycled
              </label>
              <select
                value={vessel}
                onChange={(e) => setVessel(e.target.value)}
                className="w-full bg-slate-950/60 border border-blue-900/35 rounded-xl px-4 py-3 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="Luxury Sailing Catamaran" className="bg-slate-950">Luxury Sailing Catamaran</option>
                <option value="Private Superyacht Charter" className="bg-slate-950">Private Superyacht Charter</option>
                <option value="Hybrid Marine Safari Cruiser" className="bg-slate-950">Hybrid Marine Safari Cruiser</option>
              </select>
            </div>

            {/* Rating Stars Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                Nautical Rating 
              </label>
              <div className="flex items-center gap-2 h-10 px-4 bg-slate-950/50 border border-blue-900/35 rounded-xl">
                {Array.from({ length: 5 }).map((_, i) => {
                  const val = i + 1;
                  return (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setRating(val)}
                      className="text-cyan-400/40 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          val <= rating ? "text-cyan-400 fill-cyan-400" : "text-slate-800"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="font-mono text-[10px] text-cyan-300 ml-auto uppercase tracking-wider">
                  {rating}/5 Stars
                </span>
              </div>
            </div>

          </div>

          {/* Feedback Text Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              Verification Impression *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Detail your voyage reflections, booking convenience, sea lanes performance..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-slate-950/50 border border-blue-900/35 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto self-end px-8 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl font-bold font-sans text-xs tracking-wider uppercase transition-colors flex items-center gap-2 justify-center cursor-pointer shadow-[0_4px_15px_rgba(34,211,238,0.2)]"
          >
            <Award className="w-4 h-4" />
            <span>Validate Logbook</span>
          </button>

          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3.5 bg-cyan-950/40 border border-cyan-450/40 text-cyan-300 rounded-xl text-center text-xs font-mono tracking-wide"
              >
                ✓ TESTIMONIAL CHRONICLED: Your stellar guest review has been preserved locally and integrated.
              </motion.div>
            )}
          </AnimatePresence>

        </form>
      </motion.div>

    </div>
  );
}
