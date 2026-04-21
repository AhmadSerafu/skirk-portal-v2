import { Link } from "react-router";

const ELEMENT_COLORS = {
  Pyro: "bg-red-500/20 text-red-400",
  Hydro: "bg-blue-500/20 text-blue-400",
  Cryo: "bg-cyan-500/20 text-cyan-300",
  Electro: "bg-purple-500/20 text-purple-400",
  Anemo: "bg-emerald-500/20 text-emerald-400",
  Geo: "bg-yellow-500/20 text-yellow-400",
  Dendro: "bg-green-500/20 text-green-400",
};

export default function CharacterCard({ character }) {
  return (
    <Link to={`/characters/${character.id}`}>
      <div className="relative overflow-hidden rounded-xl cursor-pointer group aspect-[2/3]">
        {/* Card image */}
        <img
          src={`https://genshin.jmp.blue/characters/${character.id}/card`}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-transparent to-transparent" />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-1">
          <p className="font-cinzel text-sm font-semibold text-parchment">
            {character.name}
          </p>
          <span
            className={`text-xs px-2 py-0.5 rounded-full w-fit ${ELEMENT_COLORS[character.vision] || "bg-void-600 text-parchment-dim"}`}
          >
            {character.vision}
          </span>
        </div>
      </div>
    </Link>
  );
}
