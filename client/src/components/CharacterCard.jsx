import { Link } from "react-router";

const ELEMENT_COLORS = {
  Pyro: "bg-red-500/20 text-red-400 border-red-500/30",
  Hydro: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Cryo: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Electro: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Anemo: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Geo: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Dendro: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default function CharacterCard({ character }) {
  return (
    <Link to={`/characters/${character.id}`}>
      <div className="card p-2 flex flex-col items-center gap-1.5 cursor-pointer group hover:-translate-y-1 transition-transform duration-300">
        <div className="relative w-full h-40 sm:h-64 overflow-hidden rounded-lg bg-void-800">
          <img
            src={`https://genshin.jmp.blue/characters/${character.id}/card`}
            alt={character.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-void-950 via-transparent to-transparent" />
        </div>
        <p className="font-cinzel text-sm font-semibold text-parchment text-center leading-snug line-clamp-1">
          {character.name}
        </p>
        <p
          className={`text-sm tracking-widest ${character.rarity === 5 ? "text-gold" : "text-purple-400"}`}
        >
          {"★".repeat(character.rarity)}
        </p>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${ELEMENT_COLORS[character.vision] || "bg-void-600 text-parchment-dim border-void-600"}`}
        >
          {character.vision}
        </span>
      </div>
    </Link>
  );
}
