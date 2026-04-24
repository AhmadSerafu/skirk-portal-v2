import { useEffect, useState } from "react";
import { url } from "../constants/url";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/characters/charactersSlice";
import { fetchBuilds } from "../features/builds/buildsSlice";

const ELEMENT_COLORS = {
  Pyro: "border-red-500/70 shadow-red-500/30",
  Hydro: "border-blue-500/70 shadow-blue-500/30",
  Cryo: "border-cyan-400/70 shadow-cyan-400/30",
  Electro: "border-purple-500/70 shadow-purple-500/30",
  Anemo: "border-emerald-400/70 shadow-emerald-400/30",
  Geo: "border-yellow-500/70 shadow-yellow-500/30",
  Dendro: "border-green-500/70 shadow-green-500/30",
};

const ELEMENT_GLOW = {
  Pyro: "shadow-[0_0_24px_rgba(239,68,68,0.25)]",
  Hydro: "shadow-[0_0_24px_rgba(59,130,246,0.25)]",
  Cryo: "shadow-[0_0_24px_rgba(34,211,238,0.25)]",
  Electro: "shadow-[0_0_24px_rgba(168,85,247,0.25)]",
  Anemo: "shadow-[0_0_24px_rgba(52,211,153,0.25)]",
  Geo: "shadow-[0_0_24px_rgba(234,179,8,0.25)]",
  Dendro: "shadow-[0_0_24px_rgba(34,197,94,0.25)]",
};

const REACTION_COLORS = {
  Vaporize: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  Melt: "bg-red-500/20 text-red-300 border-red-500/40",
  Burning: "bg-red-600/20 text-red-400 border-red-600/40",
  Overloaded: "bg-orange-600/20 text-orange-400 border-orange-600/40",
  Overload: "bg-orange-600/20 text-orange-400 border-orange-600/40",
  Frozen: "bg-cyan-400/20 text-cyan-300 border-cyan-400/40",
  Freeze: "bg-cyan-400/20 text-cyan-300 border-cyan-400/40",
  Shatter: "bg-cyan-600/20 text-cyan-400 border-cyan-600/40",
  Superconduct: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  "Super Conduct": "bg-purple-500/20 text-purple-300 border-purple-500/40",
  "Electro-Charged": "bg-yellow-400/20 text-yellow-300 border-yellow-400/40",
  "Electro Charged": "bg-yellow-400/20 text-yellow-300 border-yellow-400/40",
  Swirl: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
  "Anemo Swirl": "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
  "Cryo Swirl": "bg-cyan-400/20 text-cyan-300 border-cyan-400/40",
  "Hydro Swirl": "bg-blue-400/20 text-blue-300 border-blue-400/40",
  "Pyro Swirl": "bg-orange-500/20 text-orange-300 border-orange-500/40",
  "Electro Swirl": "bg-yellow-400/20 text-yellow-300 border-yellow-400/40",
  Crystallize: "bg-yellow-600/20 text-yellow-400 border-yellow-600/40",
  "Geo Crystallize": "bg-yellow-600/20 text-yellow-400 border-yellow-600/40",
  Bloom: "bg-green-500/20 text-green-300 border-green-500/40",
  Hyperbloom: "bg-green-600/20 text-green-400 border-green-600/40",
  "Hyper Bloom": "bg-green-600/20 text-green-400 border-green-600/40",
  Burgeon: "bg-lime-500/20 text-lime-300 border-lime-500/40",
  Quicken: "bg-lime-400/20 text-lime-300 border-lime-400/40",
  Catalyze: "bg-lime-400/20 text-lime-300 border-lime-400/40",
  Aggravate: "bg-violet-500/20 text-violet-300 border-violet-500/40",
  Spread: "bg-green-700/20 text-green-400 border-green-700/40",
};

export default function AIAnalyzerPage() {
  const { data: characters, loading: loadingCharacters } = useSelector(
    (state) => state.characters,
  );
  const { data: builds, loading: loadingBuilds } = useSelector(
    (state) => state.builds,
  );
  const dispatch = useDispatch();

  const [selectedCharacter, setSelectedCharacter] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [search, setSearch] = useState("");

  const toggleCharacter = (characterId) => {
    if (selectedCharacter.includes(characterId)) {
      setSelectedCharacter(
        selectedCharacter.filter((id) => id !== characterId),
      );
    } else {
      if (selectedCharacter.length >= 4) {
        toast.warn("Maximum 4 characters per build");
        return;
      }
      setSelectedCharacter([...selectedCharacter, characterId]);
    }
  };

  const handleSelectBuild = (e) => {
    const buildId = Number(e.target.value);
    const build = builds.find((b) => b.id === buildId);
    if (build) {
      setSelectedCharacter(build.BuildCharacters.map((bc) => bc.characterId));
    } else {
      setSelectedCharacter([]);
    }
  };

  const handleAnalyze = async () => {
    if (selectedCharacter.length === 0) {
      toast.warn("Select at least 1 character");
      return;
    }
    try {
      setAnalyzing(true);
      setResult(null);
      const { data } = await axios.post(
        `${url}/ai/analyze`,
        { characters: selectedCharacter },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
      setResult(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Analyze Failed!");
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    dispatch(fetchCharacters());
    dispatch(fetchBuilds());
  }, []);

  return (
    <div className="min-h-screen px-6 pt-24 pb-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* ── Header ── */}
        <div>
          <p className="font-nunito text-gold text-xs tracking-widest uppercase mb-1">
            Powered by Gemini AI
          </p>
          <h1 className="page-title text-3xl mb-1">AI Analyzer</h1>
          <p className="font-nunito text-parchment-dim text-sm">
            Pick from your builds or select characters manually, then analyze
            your team synergy.
          </p>
        </div>

        {/* ── 4 Portrait Slots ── */}
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => {
            const charId = selectedCharacter[i];
            const charObj = characters.find((c) => c.name === charId);
            const elemBorder = charObj
              ? ELEMENT_COLORS[charObj.vision] || "border-gold/50"
              : "";
            const elemGlow = charObj ? ELEMENT_GLOW[charObj.vision] || "" : "";

            return (
              <div
                key={i}
                onClick={() => charId && toggleCharacter(charId)}
                className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300
                  aspect-[2/5] sm:aspect-[3/4]
                  ${
                    charId
                      ? `${elemBorder} ${elemGlow} cursor-pointer`
                      : "border-void-600 border-dashed bg-void-950/60"
                  }`}
              >
                {charId && charObj ? (
                  <>
                    <img
                      src={charObj.images?.splash || charObj.images?.icon || ""}
                      alt={charObj.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/20 to-transparent" />
                    {/* name */}
                    <p className="absolute bottom-2 left-0 right-0 text-center font-cinzel text-[10px] text-parchment tracking-wide px-1">
                      {charObj.name}
                    </p>
                    {/* remove on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-void-950/70 transition-opacity">
                      <span className="text-red-400 text-2xl">✕</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <span className="text-void-600 text-2xl font-light">+</span>
                    <span className="font-cinzel text-void-600 text-[9px] tracking-widest uppercase">
                      Slot {i + 1}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Controls: Build picker + Analyze button ── */}
        <div className="flex flex-row gap-3 items-end">
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <label className="form-label">Import from build</label>
            <select
              className="input-field"
              onChange={handleSelectBuild}
              disabled={loadingBuilds}
            >
              <option value="">Select a build...</option>
              {builds.map((build) => (
                <option key={build.id} value={build.id}>
                  {build.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing || selectedCharacter.length === 0}
            className="btn-gold w-auto px-5 shrink-0 flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Analyzing...
              </>
            ) : (
              "Analyze Team"
            )}
          </button>
        </div>

        {/* ── Analyzing overlay message ── */}
        {analyzing && (
          <div className="card p-6 flex flex-col items-center gap-3 text-center">
            <span className="loading loading-dots loading-md text-gold" />
            <p className="font-cinzel text-parchment-dim text-sm tracking-wide">
              Consulting the Abyss...
            </p>
          </div>
        )}

        {/* ── Result ── */}
        {result && !analyzing && (
          <div className="card overflow-hidden">
            {/* Result header */}
            <div className="relative px-6 py-5 border-b border-void-600 flex items-center justify-between gap-4">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent pointer-events-none" />
              <div className="relative">
                <p className="form-label mb-0.5">Team Analysis</p>
                <h2 className="font-cinzel text-gold text-xl font-bold">
                  {result.teamName}
                </h2>
              </div>
              {/* Rating circle */}
              <div className="relative shrink-0 w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.4)]">
                <span className="font-cinzel text-void-900 font-black text-xl leading-none">
                  {result.overallRating}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {/* Synopsis */}
              <p className="font-nunito text-parchment-dim leading-relaxed text-sm">
                {result.synopsis}
              </p>

              {/* Reactions */}
              <div className="flex flex-col gap-2">
                <span className="form-label">Elemental Reactions</span>
                <div className="flex flex-wrap gap-2">
                  {result.elementalReactions.map((r, i) => (
                    <span
                      key={i}
                      className={`font-nunito text-xs px-3 py-1 rounded-full border ${
                        REACTION_COLORS[r] ||
                        "bg-void-900 border-void-600 text-parchment-dim"
                      }`}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="form-label">Strengths</span>
                  <ul className="flex flex-col gap-1.5">
                    {result.strengths.map((s, i) => (
                      <li
                        key={i}
                        className="font-nunito text-sm text-parchment-dim flex gap-2"
                      >
                        <span className="text-emerald-400 shrink-0 mt-0.5">
                          ✓
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="form-label">Weaknesses</span>
                  <ul className="flex flex-col gap-1.5">
                    {result.weaknesses.map((w, i) => (
                      <li
                        key={i}
                        className="font-nunito text-sm text-parchment-dim flex gap-2"
                      >
                        <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Playstyle */}
              <div className="flex flex-col gap-2 pt-2 border-t border-void-600">
                <span className="form-label">Playstyle</span>
                <p className="font-nunito text-parchment-dim text-sm leading-relaxed">
                  {result.playstyle}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Character Picker ── */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="form-label">Select Characters</span>
            <span className="font-nunito text-parchment-dim text-xs">
              {selectedCharacter.length}/4 selected
            </span>
          </div>
          <input
            type="text"
            className="input-field"
            placeholder="Search characters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {loadingCharacters ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner text-gold w-10 h-10" />
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2 max-h-80 overflow-y-auto pr-1 no-scrollbar">
              {characters
                .filter((char) =>
                  char.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((char) => {
                  const isSelected = selectedCharacter.includes(char.name);
                  return (
                    <button
                      key={char.name}
                      onClick={() => toggleCharacter(char.name)}
                      className={`relative flex flex-col items-center gap-1 p-1 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "border-gold/60 bg-gold/10 scale-95 shadow-[0_0_12px_rgba(201,168,76,0.2)]"
                          : "border-void-600 hover:border-void-500 bg-void-800"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1 right-1 z-10 w-3.5 h-3.5 rounded-full bg-gold flex items-center justify-center">
                          <span className="text-void-900 text-[8px] font-black">
                            ✓
                          </span>
                        </div>
                      )}
                      <div className="w-full aspect-square overflow-hidden rounded-lg bg-void-950">
                        <img
                          src={char.images?.icon || ""}
                          alt={char.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-nunito text-parchment text-[8px] leading-tight text-center line-clamp-1 w-full">
                        {char.name}
                      </span>
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
