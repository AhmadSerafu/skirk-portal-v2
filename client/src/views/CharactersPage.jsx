import { useEffect, useState } from "react";
import { url } from "../constants/url";
import { Link } from "react-router";
import CharacterCard from "../components/CharacterCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/characters/charactersSlice";
import { LuFilter } from "react-icons/lu";

const elementColors = {
  Pyro: "brightness(0) saturate(100%) invert(35%) sepia(100%) saturate(700%) hue-rotate(5deg)",
  Hydro:
    "brightness(0) saturate(100%) invert(55%) sepia(100%) saturate(700%) hue-rotate(185deg) brightness(1.3)",
  Cryo: "brightness(0) saturate(100%) invert(70%) sepia(50%) saturate(300%) hue-rotate(175deg)",
  Electro:
    "brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(800%) hue-rotate(265deg)",
  Anemo:
    "brightness(0) saturate(100%) invert(75%) sepia(50%) saturate(400%) hue-rotate(130deg)",
  Geo: "brightness(0) saturate(100%) invert(80%) sepia(100%) saturate(600%) hue-rotate(5deg)",
  Dendro:
    "brightness(0) saturate(100%) invert(60%) sepia(100%) saturate(500%) hue-rotate(70deg)",
};

const weaponColor =
  "brightness(0) saturate(100%) invert(80%) sepia(40%) saturate(400%) hue-rotate(10deg)";

export default function CharactersPage() {
  const { data: characters, loading } = useSelector(
    (state) => state.characters,
  );
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterVision, setFilterVision] = useState("");
  const [filterWeapon, setFilterWeapon] = useState("");
  const [filterRarity, setFilterRarity] = useState("");

  const visions = [
    "Pyro",
    "Hydro",
    "Cryo",
    "Electro",
    "Anemo",
    "Geo",
    "Dendro",
  ];
  const weapons = ["Sword", "Claymore", "Polearm", "Bow", "Catalyst"];
  const rarities = [5, 4];

  const hiddenNames = new Set([
    "aloy",
    "aether",
    "lumine",
    "manekin",
    "manekina",
  ]);

  useEffect(() => {
    dispatch(
      fetchCharacters({
        vision: filterVision,
        weapon: filterWeapon,
        rarity: filterRarity,
      }),
    );
  }, [filterVision, filterWeapon, filterRarity]);

  const displayed = characters.filter(
    (character) =>
      !hiddenNames.has((character.name || "").trim().toLowerCase()) &&
      (!search ||
        (character.name || "").toLowerCase().includes(search.toLowerCase())),
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-gold w-16 h-16"></span>
      </div>
    );

  return (
    <div className="pt-24 px-6 pb-12 max-w-6xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h1 className="page-title">Characters</h1>
      </div>

      {/* Backdrop */}
      {showFilter && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowFilter(false)}
        />
      )}

      {/* Filter Bar */}
      <div className="relative mb-6">
        <div className="flex items-center gap-2 bg-void-800 border border-void-600 rounded-xl px-4 py-2">
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer
              ${showFilter ? "text-gold bg-gold/10" : "text-parchment-dim hover:text-parchment hover:bg-void-600"}`}
          >
            <LuFilter className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-void-600/80" />

          <input
            type="text"
            placeholder="Search characters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none font-nunito text-sm text-parchment placeholder:text-parchment-dim/40"
          />
        </div>

        {/* Filter Panel */}
        <div
          className={`absolute top-full mt-2 left-0 z-20 bg-void-800 border border-void-600 rounded-xl p-5 flex flex-col gap-5 w-[calc(100vw-4rem)] sm:w-[480px] transition-all duration-200 origin-top
            ${showFilter ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
        >
          {/* Elements */}
          <div>
            <p className="font-cinzel text-xs tracking-widest text-parchment-dim/60 mb-3">
              ELEMENTS
            </p>
            <div className="grid grid-cols-7 gap-2">
              {visions.map((el) => (
                <button
                  key={el}
                  onClick={() => setFilterVision(filterVision === el ? "" : el)}
                  title={el}
                  className={`w-10 h-10 rounded-full border-2 p-1.5 transition-all
                    ${filterVision === el ? "border-gold scale-110" : "border-transparent opacity-60 hover:opacity-90"}`}
                >
                  <img
                    src={`https://api.lunaris.moe/data/assets/icons/${el.toLowerCase()}.webp`}
                    alt={el}
                    className="w-full h-full object-contain"
                    style={{ filter: elementColors[el] }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Weapon Type */}
          <div>
            <p className="font-cinzel text-xs tracking-widest text-parchment-dim/60 mb-3">
              WEAPON TYPE
            </p>
            <div className="flex flex-wrap gap-2">
              {weapons.map((w) => (
                <button
                  key={w}
                  onClick={() => setFilterWeapon(filterWeapon === w ? "" : w)}
                  title={w}
                  className={`w-10 h-10 rounded-full border-2 p-1.5 transition-all
                    ${filterWeapon === w ? "border-gold scale-110" : "border-transparent opacity-50 hover:opacity-80"}`}
                >
                  <img
                    src={`https://api.lunaris.moe/data/assets/icons/${w.toLowerCase()}.webp`}
                    alt={w}
                    className="w-full h-full object-contain"
                    style={{
                      filter:
                        filterWeapon === w ? elementColors.Geo : weaponColor,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Rarity */}
          <div>
            <p className="font-cinzel text-xs tracking-widest text-parchment-dim/60 mb-3">
              RARITY
            </p>
            <div className="flex gap-2">
              {rarities.map((r) => (
                <button
                  key={r}
                  onClick={() => setFilterRarity(filterRarity === r ? "" : r)}
                  className={`font-cinzel text-xs px-4 py-1.5 rounded-lg border transition-all
                    ${filterRarity === r ? "border-gold text-gold bg-gold/10" : "border-void-600 text-parchment-dim hover:border-parchment-dim"}`}
                >
                  {r}★
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Character Grid */}
      {displayed.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="font-cinzel text-2xl text-parchment-dim/40 mb-2">
            No characters found
          </p>
          <p className="font-nunito text-sm text-parchment-dim/30">
            Try a different name or filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayed.map((character) => (
            <CharacterCard
              key={character.id ?? character.name}
              character={character}
            />
          ))}
        </div>
      )}
    </div>
  );
}
