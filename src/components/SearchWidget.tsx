import { useState, FormEvent } from "react";
import { MapPin, Calendar, Compass, Users, Search, Loader2, Waves } from "lucide-react";

interface SearchWidgetProps {
  onSearchComplete: (details: {
    destination: string;
    dates: string;
    vessel: string;
    guests: number;
  }) => void;
  selectedDestination?: string;
  onDestinationChange?: (dest: string) => void;
}

export default function SearchWidget({ 
  onSearchComplete, 
  selectedDestination, 
  onDestinationChange 
}: SearchWidgetProps) {
  const [destination, setDestination] = useState(selectedDestination || "MaldivesAtolls");
  const [dates, setDates] = useState("2026-08-15");
  const [vessel, setVessel] = useState("Superyacht");
  const [guests, setGuests] = useState(2);
  const [isSearching, setIsSearching] = useState(false);

  const destinationsList = [
    { id: "MaldivesAtolls", name: "Maldives Private Atolls", lat: "3.2028° N, 73.2207° E" },
    { id: "BoraBoraTides", name: "Bora Bora Marine Sanctuary", lat: "16.5004° S, 151.7415° W" },
    { id: "SantoriniCaldera", name: "Santorini Volcanic Caldera", lat: "36.4166° N, 25.4324° E" },
    { id: "GreatBarrierReef", name: "Great Barrier Reef Expedition", lat: "18.2871° S, 147.6992° E" },
    { id: "GalapagosLiving", name: "Galápagos Islands Marine Exploration", lat: "0.9538° S, 90.9656° W" }
  ];

  const vesselTypes = [
    { id: "Superyacht", name: "Private Superyacht Charter" },
    { id: "Catamaran", name: "Luxury Sailing Catamaran" },
    { id: "EcoCruiser", name: "Hybrid Marine Safari Cruiser" }
  ];

  const handleDestinationSelect = (val: string) => {
    setDestination(val);
    if (onDestinationChange) {
      onDestinationChange(val);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate real calculation/booking sequence
    setTimeout(() => {
      setIsSearching(false);
      onSearchComplete({
        destination: destinationsList.find(d => d.id === destination)?.name || destination,
        dates,
        vessel: vesselTypes.find(v => v.id === vessel)?.name || vessel,
        guests
      });
    }, 2000);
  };

  const activeDestinationDetails = destinationsList.find(d => d.id === (selectedDestination || destination)) || destinationsList[0];

  return (
    <div className="w-full">
      <form 
        onSubmit={handleSearch}
        className="w-full bg-slate-950/45 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-6 lg:p-8 shadow-[0_20px_50px_rgba(2,6,23,0.5)] flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Destination Form Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" /> Destination
            </label>
            <div className="relative">
              <select
                value={selectedDestination || destination}
                onChange={(e) => handleDestinationSelect(e.target.value)}
                className="w-full bg-blue-950/40 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-slate-100 hover:border-cyan-400/50 focus:border-cyan-400 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {destinationsList.map((dest) => (
                  <option key={dest.id} value={dest.id} className="bg-slate-950 text-slate-200">
                    {dest.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400/60 text-xs font-mono font-bold">
                ▼
              </div>
            </div>
            <span className="font-mono text-[9px] text-cyan-400/50 mt-0.5 tracking-wider">
              Coords: {activeDestinationDetails.lat}
            </span>
          </div>

          {/* Date Picker Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" /> Departure Date
            </label>
            <input
              type="date"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              className="w-full bg-blue-950/40 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-slate-100 focus:border-cyan-400 focus:outline-none transition-colors [color-scheme:dark] cursor-pointer"
            />
            <span className="font-mono text-[9px] text-cyan-400/50 mt-0.5 tracking-wider">
              Ideal Sailing Conditions Apply
            </span>
          </div>

          {/* Vessel Selection Frame */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" /> Expedition Craft
            </label>
            <div className="relative">
              <select
                value={vessel}
                onChange={(e) => setVessel(e.target.value)}
                className="w-full bg-blue-950/40 border border-blue-900/40 rounded-xl px-4 py-3 text-sm text-slate-100 hover:border-cyan-400/50 focus:border-cyan-400 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {vesselTypes.map((v) => (
                  <option key={v.id} value={v.id} className="bg-slate-950 text-slate-200">
                    {v.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400/60 text-xs font-mono font-bold">
                ▼
              </div>
            </div>
            <span className="font-mono text-[9px] text-cyan-400/50 mt-0.5 tracking-wider">
              Fully Crewed & Luxury Catered
            </span>
          </div>

          {/* Guests count */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" /> Voyagers ({guests})
            </label>
            <div className="flex items-center gap-4 bg-blue-950/40 border border-blue-900/40 rounded-xl px-4 py-2.5">
              <input
                type="range"
                min="1"
                max="8"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-cyan-950/50 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="font-mono text-sm text-cyan-300 font-bold min-w-[20px] text-right">
                {guests}P
              </span>
            </div>
            <span className="font-mono text-[9px] text-cyan-400/50 mt-0.5 tracking-wider">
              Max occupancy 8 guests per yacht
            </span>
          </div>
        </div>

        {/* Action Button & Floating micro status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-cyan-500/10">
          <div className="flex items-center gap-2 text-cyan-200/60 text-[11px] font-sans">
            <Waves className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Inclusive ecological sanctuary contribution with every reserved journey.</span>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 rounded-2xl font-sans font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(34,211,238,0.25)] hover:shadow-[0_4px_35px_rgba(34,211,238,0.45)] hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Mapping Sea Lanes...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Plot Voyage</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
