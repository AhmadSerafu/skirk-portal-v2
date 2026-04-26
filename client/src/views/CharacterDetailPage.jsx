import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { url, materialIcon } from "../constants/url";
import PassiveCard from "../components/PassiveCard";
import ConstellationCard from "../components/ConstellationCard";
import SkillCard from "../components/SkillCard";
import { IoArrowBack } from "react-icons/io5";
import {
  GiSwordSpin,
  GiPowerLightning,
  GiBookmarklet,
  GiScrollQuill,
  GiSpeedometer,
} from "react-icons/gi";
import StatsCard from "../components/StatsCard";

// ─── Element badge color ────────────────────────────────────────────────────
const ELEMENT_COLORS = {
  Pyro: "bg-red-500/20 text-red-400 border-red-500/40",
  Hydro: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  Cryo: "bg-cyan-400/20 text-cyan-300 border-cyan-400/40",
  Electro: "bg-purple-500/20 text-purple-400 border-purple-500/40",
  Anemo: "bg-emerald-400/20 text-emerald-400 border-emerald-400/40",
  Geo: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  Dendro: "bg-green-500/20 text-green-400 border-green-500/40",
};

const RARITY_COLORS = {
  5: "text-gold",
  4: "text-purple-400",
};

// ─── Tabs config ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "stats", label: "Stats & Ascension", icon: GiSpeedometer },
  { id: "skills", label: "Skills", icon: GiSwordSpin },
  { id: "passive", label: "Passives", icon: GiBookmarklet },
  { id: "constellations", label: "Constellations", icon: GiPowerLightning },
  { id: "about", label: "About", icon: GiScrollQuill },
];

const SKILL_UNLOCK = ["Normal Attack", "Elemental Skill", "Elemental Burst"];
const PASSIVE_UNLOCK = [
  "1st Ascension Passive",
  "4th Ascension Passive",
  "Utility Passive",
];

// ─── Stat formatter ───────────────────────────────────────────────────────────
const formatStat = (key, value) => {
  if (key === "specialized") return `${(value * 100).toFixed(1)}%`;
  return Math.floor(value).toLocaleString();
};

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("stats");

  const [statsData, setStatsData] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statLevel, setStatLevel] = useState(90);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${url}/characters/${id}`);
        setCharacter(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  useEffect(() => {
    if (activeTab !== "stats" || statsData) return;
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const { data } = await axios.get(`${url}/characters/${id}/stats`);
        setStatsData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, [activeTab, id, statsData]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-gold w-16 h-16" />
      </div>
    );

  if (!character.id)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-cinzel text-xl text-parchment">
          Character not found
        </p>
        <Link
          to="/characters"
          className="text-gold hover:text-gold-light font-cinzel text-sm transition-colors flex items-center gap-1"
        >
          <IoArrowBack /> Back to Characters
        </Link>
      </div>
    );

  const currentStats = statsData?.stats?.[statLevel];

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          to="/characters"
          className="text-parchment-dim hover:text-gold text-xs font-cinzel tracking-wider transition-colors flex items-center gap-1 w-fit"
        >
          <IoArrowBack className="mb-0.5" />
          Back to Characters
        </Link>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden mt-2"
        style={{ height: 480 }}
      >
        {/* Splash art background */}
        {character.images?.splash && (
          <img
            src={character.images.splash}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top scale-105"
            style={{ filter: "blur(0.5px) brightness(0.6)" }}
          />
        )}

        {/* Left-to-right + bottom gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-void-900/98 via-void-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-transparent to-void-900/50" />

        {/* Content */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-end items-start md:items-end gap-8 pb-10 pt-8">
          {/* ── Left: portrait image ──────────────────────────────── */}
          <div className="hidden md:block shrink-0">
            <div
              className={`rounded-2xl overflow-hidden border-2 shadow-2xl ${character.rarity === 5 ? "border-gold/40 shadow-gold/10" : "border-purple-500/40 shadow-purple-500/10"}`}
              style={{ width: 180, height: 240 }}
            >
              <img
                src={
                  character.images?.portrait ||
                  character.images?.icon ||
                  character.images?.card ||
                  ""
                }
                alt={character.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* ── Center: character info ────────────────────────────── */}
          <div className="md:flex-1 flex flex-col gap-3">
            {/* Nation · Weapon · Element */}
            <p className="text-parchment-dim text-xs font-cinzel tracking-widest uppercase">
              {[character.nation, character.weapon, character.vision]
                .filter(Boolean)
                .join(" · ")}
            </p>

            {/* Name + title */}
            <div>
              <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-parchment leading-tight drop-shadow-lg">
                {character.name}
              </h1>
              <p className="text-gold font-cinzel text-base italic mt-1">
                {character.title}
              </p>
            </div>

            {/* Rarity + element badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`font-bold text-lg tracking-widest ${RARITY_COLORS[character.rarity] || "text-parchment"}`}
              >
                {"★".repeat(character.rarity)}
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full border font-semibold ${ELEMENT_COLORS[character.vision] || "bg-void-700 text-parchment-dim border-void-500"}`}
              >
                {character.vision}
              </span>
            </div>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-1">
              {character.constellation && (
                <div>
                  <p className="text-parchment-dim text-[10px] uppercase tracking-widest font-cinzel">
                    Constellation
                  </p>
                  <p className="text-parchment text-xs font-semibold">
                    {character.constellation}
                  </p>
                </div>
              )}
              {character.affiliation && (
                <div>
                  <p className="text-parchment-dim text-[10px] uppercase tracking-widest font-cinzel">
                    Affiliation
                  </p>
                  <p className="text-parchment text-xs font-semibold">
                    {character.affiliation}
                  </p>
                </div>
              )}
              {character.birthday && (
                <div>
                  <p className="text-parchment-dim text-[10px] uppercase tracking-widest font-cinzel">
                    Birthday
                  </p>
                  <p className="text-parchment text-xs font-semibold">
                    {character.birthday}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Voice Actors ───────────────────────────────── */}
          <div className="hidden lg:flex flex-col gap-4 shrink-0 min-w-44 justify-end">
            {character.cv && Object.keys(character.cv).length > 0 && (
              <div className="bg-void-950/60 border border-void-600/50 rounded-xl p-4 backdrop-blur-sm">
                <p className="font-cinzel text-xs text-gold uppercase tracking-widest mb-3">
                  Voice Actors
                </p>
                <div className="flex flex-col gap-2.5">
                  {Object.entries(character.cv).map(([lang, name]) => (
                    <div key={lang}>
                      <p className="text-parchment-dim text-[10px] uppercase tracking-widest">
                        {lang}
                      </p>
                      <p className="text-parchment text-sm font-semibold leading-tight">
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── TABS + CONTENT ───────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        {/* Tab bar */}
        <div className="flex gap-1 border-b border-void-600 mb-6 overflow-x-auto no-scrollbar">
          {TABS.map(({ id: tid, label, icon: Icon }) => (
            <button
              key={tid}
              onClick={() => setActiveTab(tid)}
              className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 font-cinzel text-xs tracking-widest uppercase transition-all shrink-0 border-b-2 -mb-px ${
                activeTab === tid
                  ? "border-gold text-gold"
                  : "border-transparent text-parchment-dim hover:text-parchment"
              }`}
            >
              <Icon className="text-base" />
              {label}
            </button>
          ))}
        </div>

        {/* ── About ────────────────────────────────────────────────── */}
        {activeTab === "about" && (
          <div className="flex flex-col gap-6">
            {character.description && (
              <p className="text-parchment-dim text-sm leading-relaxed max-w-2xl">
                {character.description.replace(/\*\*/g, "")}
              </p>
            )}

            {character.cv && Object.keys(character.cv).length > 0 && (
              <div className="bg-void-950/60 border border-void-600/50 rounded-xl p-4 backdrop-blur-sm w-fit">
                <p className="font-cinzel text-xs text-gold uppercase tracking-widest mb-3">
                  Voice Actors
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3">
                  {Object.entries(character.cv).map(([lang, name]) => (
                    <div key={lang}>
                      <p className="text-parchment-dim text-[10px] uppercase tracking-widest">
                        {lang}
                      </p>
                      <p className="text-parchment text-sm font-semibold leading-tight">
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Skills ───────────────────────────────────────────────── */}
        {activeTab === "skills" && (
          <div className="flex flex-col gap-3">
            {character.skillTalents?.map((skill, i) => (
              <SkillCard
                key={i}
                skill={{ ...skill, unlock: SKILL_UNLOCK[i] || "" }}
              />
            ))}
          </div>
        )}

        {/* ── Passives ─────────────────────────────────────────────── */}
        {activeTab === "passive" && (
          <div className="flex flex-col gap-3">
            {character.passiveTalents?.map((passive, i) => (
              <PassiveCard
                key={i}
                passive={{ ...passive, unlock: PASSIVE_UNLOCK[i] || "" }}
              />
            ))}
          </div>
        )}

        {/* ── Constellations ───────────────────────────────────────── */}
        {activeTab === "constellations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {character.constellations?.map((c, i) => (
              <ConstellationCard
                key={i}
                constellation={{
                  ...c,
                  unlock: `Constellation Lv. ${i + 1}`,
                }}
                index={i}
              />
            ))}
          </div>
        )}

        {/* ── Stats & Ascension ───────────────────────────────── */}
        {activeTab === "stats" && (
          <StatsCard
            statsData={statsData}
            statsLoading={statsLoading}
            statLevel={statLevel}
            setStatLevel={setStatLevel}
            currentStats={currentStats}
            costs={character.costs}
          />
        )}
      </div>
    </div>
  );
}
