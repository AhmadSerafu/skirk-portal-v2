import { useEffect, useState } from "react";
import { url } from "../constants/url";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/characters/charactersSlice";
import { fetchBuilds } from "../features/builds/buildsSlice";

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
    try {
      setAnalyzing(true);
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

  const REACTION_COLORS = {
    Vaporize: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    Melt: "bg-red-500/20 text-red-300 border-red-500/40",
    Overloaded: "bg-orange-600/20 text-orange-400 border-orange-600/40",
    Superconduct: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    "Electro-Charged": "bg-yellow-400/20 text-yellow-300 border-yellow-400/40",
    Frozen: "bg-cyan-400/20 text-cyan-300 border-cyan-400/40",
    Shatter: "bg-cyan-600/20 text-cyan-400 border-cyan-600/40",
    Swirl: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
    Crystallize: "bg-yellow-600/20 text-yellow-400 border-yellow-600/40",
    Bloom: "bg-green-500/20 text-green-300 border-green-500/40",
    Hyperbloom: "bg-green-600/20 text-green-400 border-green-600/40",
    Burgeon: "bg-lime-500/20 text-lime-300 border-lime-500/40",
    Quicken: "bg-lime-400/20 text-lime-300 border-lime-400/40",
    Aggravate: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    Spread: "bg-green-700/20 text-green-400 border-green-700/40",
  };

  useEffect(() => {
    dispatch(fetchCharacters());
    dispatch(fetchBuilds());
  }, []);

  return (
    <div className="min-h-screen px-6 pt-24 pb-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="page-title mb-2">AI Analyzer</h1>
        <p className="font-nunito text-parchment-dim text-sm mb-6">
          Pick from your builds or select characters manually, then analyze your
          team.
        </p>

        {/* 4 portrait besar */}
        <div className="flex gap-3 mb-6">
          {Array.from({ length: 4 }).map((_, i) => {
            const charId = selectedCharacter[i];
            return (
              <div
                key={i}
                onClick={() => charId && toggleCharacter(charId)}
                className={`flex-1 h-72 rounded-xl overflow-hidden border-2 bg-void-950 ${
                  charId
                    ? "border-gold/60 cursor-pointer hover:opacity-75 transition-opacity"
                    : "border-void-600 border-dashed"
                }`}
              >
                {charId && (
                  <img
                    src={`https://genshin.jmp.blue/characters/${charId}/portrait`}
                    alt={charId}
                    className="w-full h-full object-cover object-top"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Hasil analisis */}
        {result && (
          <div className="card p-6 mb-6 flex flex-col gap-4">
            {/* Team name + rating */}
            <div className="flex items-center justify-between">
              <h2 className="font-cinzel text-gold text-lg font-semibold">
                {result.teamName}
              </h2>
              <span className="font-cinzel text-void-900 font-bold text-lg w-10 h-10 rounded-full bg-gold flex items-center justify-center shrink-0">
                {result.overallRating}
              </span>
            </div>

            {/* Synopsis */}
            <p className="font-nunito text-parchment-dim leading-relaxed">
              {result.synopsis}
            </p>

            {/* Elemental reactions */}
            <div className="flex flex-col gap-1.5">
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

            {/* Strengths */}
            <div className="flex flex-col gap-1.5">
              <span className="form-label">Strengths</span>
              <ul className="flex flex-col gap-1">
                {result.strengths.map((s, i) => (
                  <li
                    key={i}
                    className="font-nunito text-sm text-parchment-dim flex gap-1.5"
                  >
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="flex flex-col gap-1.5">
              <span className="form-label">Weaknesses</span>
              <ul className="flex flex-col gap-1">
                {result.weaknesses.map((w, i) => (
                  <li
                    key={i}
                    className="font-nunito text-sm text-parchment-dim flex gap-1.5"
                  >
                    <span className="text-red-400 mt-0.5">✗</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Playstyle */}
            <div className="flex flex-col gap-1.5">
              <span className="form-label">Playstyle</span>
              <p className="font-nunito text-parchment-dim text-sm leading-relaxed">
                {result.playstyle}
              </p>
            </div>
          </div>
        )}

        {/* Bottom — picker */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left */}
          <div className="flex flex-col gap-4 lg:w-72 shrink-0">
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Pick from build</label>
              <select className="input-field" onChange={handleSelectBuild}>
                <option value=""> Select a build </option>
                {builds.map((build, index) => (
                  <option key={index} value={build.id}>
                    {build.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="btn-gold"
            >
              {analyzing ? "Analyzing..." : "Analyze Team"}
            </button>
          </div>

          {/* Right — character picker */}
          <div className="flex-1 flex flex-col gap-4">
            <input
              type="text"
              className="input-field"
              placeholder="Search characters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {loadingCharacters ? (
              <div className="flex justify-center mt-12">
                <span className="loading loading-spinner text-gold w-10 h-10"></span>
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-97.5 overflow-y-auto pr-1">
                {characters
                  .filter((char) =>
                    char.name.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((char, index) => {
                    const isSelected = selectedCharacter.includes(char.id);
                    return (
                      <button
                        key={index}
                        onClick={() => toggleCharacter(char.id)}
                        className={`card p-1.5 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          isSelected
                            ? "border-gold/60 ring-1 ring-gold/30"
                            : "hover:border-gold/20"
                        }`}
                      >
                        <div className="w-full aspect-square overflow-hidden rounded-md bg-void-950">
                          <img
                            src={`https://genshin.jmp.blue/characters/${char.id}/icon`}
                            alt={char.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-nunito text-parchment text-[10px] leading-tight text-center line-clamp-2">
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
    </div>
  );
}
