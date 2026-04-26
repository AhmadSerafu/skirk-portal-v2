import { Link } from "react-router";

const ELEMENT_COLORS = {
  Pyro: "bg-red-500/20 text-red-400 border-red-500/40",
  Hydro: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  Cryo: "bg-cyan-400/20 text-cyan-300 border-cyan-400/40",
  Electro: "bg-purple-500/20 text-purple-400 border-purple-500/40",
  Anemo: "bg-emerald-400/20 text-emerald-400 border-emerald-400/40",
  Geo: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  Dendro: "bg-green-500/20 text-green-400 border-green-500/40",
};

const RARITY_GLOW = {
  5: "group-hover:shadow-[0_0_16px_rgba(201,168,76,0.35)] border-gold/30 group-hover:border-gold/60",
  4: "group-hover:shadow-[0_0_16px_rgba(168,85,247,0.3)] border-purple-500/30 group-hover:border-purple-400/60",
};

export default function CharacterCard({ character }) {
  // Prefer portrait (cover1 - full body standing) > card (iconCard) > icon fallback
  const imageSrc = character.images?.splash || character.images?.icon || "";

  const rarityGlow =
    RARITY_GLOW[character.rarity] ||
    "border-void-600 group-hover:border-gold/40";

  return (
    <Link to={`/characters/${character.name}`} className="block">
      <div className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1.5">
        {/* Portrait card */}
        <div
          className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${rarityGlow}`}
          style={{ aspectRatio: "3 / 4" }}
        >
          {/* Character image */}
          <img
            src={imageSrc}
            alt={character.name}
            loading="lazy" // ← ini aja
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = character.images?.icon || "";
            }}
          />

          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-void-950 via-void-950/30 to-transparent pointer-events-none" />

          {/* Rarity stars — top left corner */}
          <div className="absolute top-1 left-1.5">
            <span
              className={`text-xs tracking-tight font-bold ${character.rarity === 5 ? "text-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" : "text-purple-400 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"}`}
            >
              {"★".repeat(character.rarity)}
            </span>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2.5 flex flex-col items-center gap-1">
            <p className="font-cinzel text-xs font-bold text-parchment text-center leading-tight line-clamp-1 drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
              {character.name}
            </p>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold tracking-wide ${ELEMENT_COLORS[character.vision] || "bg-void-600/80 text-parchment-dim border-void-500"}`}
            >
              {character.vision}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
