import { materialIcon } from "../constants/url";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const TALENT_LEVELS = [
  "lvl2",
  "lvl3",
  "lvl4",
  "lvl5",
  "lvl6",
  "lvl7",
  "lvl8",
  "lvl9",
  "lvl10",
];

const ASCENSION_PHASES = [
  "ascend1",
  "ascend2",
  "ascend3",
  "ascend4",
  "ascend5",
  "ascend6",
];

const formatStat = (key, value) => {
  if (key === "specialized") return `${(value * 100).toFixed(1)}%`;
  return Math.floor(value).toLocaleString();
};

export default function StatsTab({
  statsData,
  statsLoading,
  statLevel,
  setStatLevel,
  currentStats,
  costs,
  talentCosts,
}) {
  const [showAscension, setShowAscension] = useState(false);
  const [showTalent, setShowTalent] = useState(false);

  if (statsLoading)
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner text-gold w-10 h-10" />
      </div>
    );

  if (!statsData)
    return (
      <p className="text-parchment-dim text-sm font-cinzel">
        Failed to load stats.
      </p>
    );

  return (
    <div className="flex flex-col gap-4">
      {/* Base Stats Scaling */}
      <div className="card p-5">
        <p className="font-cinzel text-sm font-semibold text-parchment mb-1">
          Base Stats Scaling
        </p>
        <p className="text-xs text-gold mb-3">
          {statsData.substatType || "Substat"}
        </p>
        <div className="border-t border-void-600 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kiri: slider + ascension */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="form-label shrink-0">Level</span>
              <input
                type="range"
                min={1}
                max={100}
                value={statLevel}
                onChange={(e) => setStatLevel(Number(e.target.value))}
                className="flex-1 accent-gold cursor-pointer"
              />
              <span className="font-cinzel text-gold font-bold text-sm w-8 text-center shrink-0">
                {statLevel}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-parchment-dim">Ascension Phase</span>
              <span className="text-parchment font-semibold">
                {currentStats?.ascension}
              </span>
            </div>
          </div>

          {/* Kanan: stat values */}
          {currentStats && (
            <div className="flex flex-col gap-1.5">
              {[
                { key: "hp", label: "Base HP" },
                { key: "attack", label: "Base ATK" },
                { key: "defense", label: "Base DEF" },
                {
                  key: "specialized",
                  label: statsData.substatType || "Substat",
                },
              ].map(({ key, label }) => (
                <div key={key} className="flex justify-between text-xs">
                  <span className="text-parchment-dim">{label}</span>
                  <span className="text-parchment font-semibold">
                    {formatStat(key, currentStats[key])}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ascension Materials */}
      {costs && (
        <div className="card p-5 flex flex-col gap-0">
          <button
            onClick={() => setShowAscension(!showAscension)}
            className="cursor-pointer flex justify-between items-center w-full hover:text-gold transition-colors group"
          >
            <p className="font-cinzel text-sm font-semibold text-parchment group-hover:text-gold transition-colors">
              Ascension Materials
            </p>
            <IoChevronDown
              className={`text-parchment-dim group-hover:text-gold transition-all duration-300 ${
                showAscension ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Border separator — selalu ada */}
          <div className="border-t border-void-600/50 mt-2" />

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden transition-all duration-300 ${
              showAscension
                ? "max-h-500 opacity-100 pt-4 pb-4"
                : "max-h-0 opacity-0"
            }`}
          >
            {ASCENSION_PHASES.map((phase) => {
              const materials = costs[phase];
              if (!materials) return null;
              return (
                <div
                  key={phase}
                  className="border border-void-600/50 rounded-lg p-3 flex flex-col gap-2"
                >
                  <p className="font-cinzel text-xs text-gold uppercase tracking-widest">
                    {phase.replace("ascend", "Ascension ")}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {materials.map((mat) => (
                      <div key={mat.id} className="flex items-center gap-2">
                        <img
                          src={materialIcon(mat.id)}
                          alt={mat.name}
                          className="w-7 h-7 object-contain shrink-0"
                          onError={(e) => {
                            e.target.outerHTML = `<div class="w-7 h-7 rounded bg-void-600 shrink-0 flex items-center justify-center text-parchment-dim text-[10px] font-bold">${mat.name[0]}</div>`;
                          }}
                        />
                        <span className="text-parchment-dim text-xs flex-1 leading-tight">
                          {mat.name}
                        </span>
                        <span className="text-parchment font-semibold text-xs shrink-0">
                          ×{mat.count.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Talent Level-Up Materials */}
      {talentCosts && (
        <div className="card p-5 flex flex-col gap-0">
          <button
            onClick={() => setShowTalent(!showTalent)}
            className="cursor-pointer flex justify-between items-center w-full hover:text-gold transition-colors group"
          >
            <p className="font-cinzel text-sm font-semibold text-parchment group-hover:text-gold transition-colors">
              Talent Level-Up Materials
            </p>
            <IoChevronDown
              className={`text-parchment-dim group-hover:text-gold transition-all duration-300 ${
                showTalent ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Border separator — selalu ada */}
          <div className="border-t border-void-600/50 mt-2" />

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden transition-all duration-300 ${
              showTalent
                ? "max-h-500 opacity-100 pt-4 pb-4"
                : "max-h-0 opacity-0"
            }`}
          >
            {TALENT_LEVELS.map((lvl) => {
              const materials = talentCosts[lvl];
              if (!materials) return null;
              return (
                <div
                  key={lvl}
                  className="border border-void-600/50 rounded-lg p-3 flex flex-col gap-2"
                >
                  <p className="font-cinzel text-xs text-gold uppercase tracking-widest">
                    {lvl.replace("lvl", "Level ")}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {materials.map((mat) => (
                      <div key={mat.id} className="flex items-center gap-2">
                        <img
                          src={materialIcon(mat.id)}
                          alt={mat.name}
                          className="w-7 h-7 object-contain shrink-0"
                          onError={(e) => {
                            e.target.outerHTML = `<div class="w-7 h-7 rounded bg-void-600 shrink-0 flex items-center justify-center text-parchment-dim text-[10px] font-bold">${mat.name[0]}</div>`;
                          }}
                        />
                        <span className="text-parchment-dim text-xs flex-1 leading-tight">
                          {mat.name}
                        </span>
                        <span className="text-parchment font-semibold text-xs shrink-0">
                          ×{mat.count.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
