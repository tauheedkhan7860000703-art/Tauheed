import { motion } from "motion/react";
import { Compass, Sparkles, Anchor, Waves } from "lucide-react";

interface Hotspot {
  id: string;
  name: string;
  region: string;
  depth: string;
  icon: string;
  idealMonth: string;
}

interface FeaturedHotspotsProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function FeaturedHotspots({ selectedId, onSelect }: FeaturedHotspotsProps) {
  const hotspots: Hotspot[] = [
    {
      id: "MaldivesAtolls",
      name: "Maldives Atolls",
      region: "Indian Ocean",
      depth: "40 meters max dive",
      icon: "🏝️",
      idealMonth: "Nov - April"
    },
    {
      id: "BoraBoraTides",
      name: "Bora Bora",
      region: "South Pacific",
      depth: "32 meters max dive",
      icon: "🐠",
      idealMonth: "May - Oct"
    },
    {
      id: "SantoriniCaldera",
      name: "Santorini",
      region: "Aegean Sea",
      depth: "300m volcanic bay",
      icon: "🏛️",
      idealMonth: "April - Nov"
    },
    {
      id: "GreatBarrierReef",
      name: "Barrier Reef",
      region: "Coral Sea",
      depth: "Marine biodiversity",
      icon: "🪸",
      idealMonth: "June - Oct"
    },
    {
      id: "GalapagosLiving",
      name: "Galápagos",
      region: "Pacific Ocean",
      depth: "Active currents",
      icon: "🐢",
      idealMonth: "Dec - May"
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-xs text-cyan-300 uppercase tracking-[0.2em] flex items-center gap-2">
          <Anchor className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          Select Marine Destination Hub
        </h4>
        <span className="font-mono text-[10px] text-cyan-400/40 hidden sm:inline-block">
          Click hotspot card to load coordinates
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {hotspots.map((item) => {
          const isActive = item.id === selectedId;
          return (
            <motion.button
              key={item.id}
              onClick={() => onSelect(item.id)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden text-left p-4 rounded-2xl border transition-all duration-500 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-br from-cyan-950/80 to-blue-900/60 border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                  : "bg-slate-950/40 border-blue-900/20 hover:border-cyan-400/35 hover:bg-slate-950/60"
              }`}
            >
              {/* Active lighting pulse overlay */}
              {isActive && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-cyan-400 m-3 animate-ping" />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {item.icon}
                </span>
                <span className="font-mono text-[9px] text-cyan-300/60">
                  {item.idealMonth}
                </span>
              </div>

              <h5 className="font-sans font-bold text-sm text-white tracking-wide truncate">
                {item.name}
              </h5>
              
              <p className="font-mono text-[10px] text-slate-350 tracking-wider font-light mb-1 mt-0.5 opacity-90">
                {item.region}
              </p>

              <div className="flex items-center gap-1.5 mt-2">
                <Waves className="w-3 h-3 text-cyan-400/70" />
                <span className="font-mono text-[9px] text-cyan-300/40">
                  {item.depth}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
