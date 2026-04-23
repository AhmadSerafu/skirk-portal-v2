import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { url } from "../constants/url";
import PassiveCard from "../components/PassiveCard";
import ConstellationCard from "../components/ConstellationCard";
import SkillCard from "../components/SkillCard";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

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

  useEffect(() => {
    fetchCharacter();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-gold w-16 h-16"></span>
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
          className="text-gold hover:text-gold-light font-cinzel text-sm transition-colors"
        >
          ← Back to Characters
        </Link>
      </div>
    );

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto pb-16">
      <Link
        to="/characters"
        className="text-parchment-dim hover:text-gold text-sm font-cinzel tracking-wider transition-colors"
      >
        ← Back
      </Link>

      {/* Header */}
      <div className="bg-void-800 border border-void-600 rounded-xl p-6 flex flex-col md:flex-row gap-6 mt-6 mb-8">
        {/* Kiri - Bio */}
        <div className="w-full md:w-1/3 flex flex-col gap-3">
          <div className="flex justify-between items-start gap-3">
            <div>
              <p className="text-parchment-dim text-xs font-cinzel tracking-widest uppercase mb-1">
                {character.nation} · {character.weapon} · {character.vision}
              </p>
              <h1 className="font-cinzel text-3xl font-bold text-parchment mb-1">
                {character.name}
              </h1>
              <p className="text-gold font-cinzel text-sm italic">
                {character.title}
              </p>
            </div>
            <img
              src={`https://genshin.jmp.blue/characters/${character.id}/icon`}
              alt={character.name}
              className="w-16 h-16 mt-2.5 object-contain md:hidden shrink-0"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-parchment-dim text-xs">
              Rarity:{" "}
              <span className="text-gold">{"★".repeat(character.rarity)}</span>
            </p>
            <p className="text-parchment-dim text-xs">
              Constellation:{" "}
              <span className="text-parchment font-semibold">
                {character.constellation}
              </span>
            </p>
            <p className="text-parchment-dim text-xs">
              Affiliation:{" "}
              <span className="text-parchment font-semibold">
                {character.affiliation}
              </span>
            </p>
            <p className="text-parchment-dim text-xs">
              Birthday:{" "}
              <span className="text-parchment font-semibold">
                {character.birthday === "0000-00-00"
                  ? "Unknown"
                  : character.birthday?.slice(5)}
              </span>
            </p>
            <p className="text-parchment-dim text-xs">
              Release:{" "}
              <span className="text-parchment font-semibold">
                {character.release}
              </span>
            </p>
          </div>

          <div className="border-t border-void-600 pt-3">
            <p className="text-parchment-dim text-sm leading-relaxed">
              {character.description}
            </p>
          </div>
        </div>

        {/* Tengah - Splash Art (hidden mobile) */}
        <div className="hidden md:flex w-1/3 bg-white/5 rounded-2xl overflow-hidden items-center justify-center">
          <img
            src={`https://genshin.jmp.blue/characters/${character.id}/portrait`}
            alt={character.name}
            className="w-full h-80 object-contain object-top"
          />
        </div>

        {/* Kanan - Constellation (hidden mobile) */}
        <div className="hidden md:flex w-1/3 flex-col items-end gap-2 justify-start">
          <img
            src={`https://genshin.jmp.blue/characters/${character.id}/constellation`}
            alt={`${character.name} constellation`}
            className="w-60 h-72 object-cover rounded-xl"
          />
          <p className="font-cinzel text-sm text-gold w-60 text-center">
            {character.constellation}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("skills")}
          className={`font-cinzel text-sm tracking-wider px-4 py-2 rounded-lg transition-all ${
            activeTab === "skills"
              ? "bg-gold text-void-900 font-bold"
              : "text-parchment-dim hover:text-gold"
          }`}
        >
          Skills
        </button>
        <button
          onClick={() => setActiveTab("passive")}
          className={`font-cinzel text-sm tracking-wider px-4 py-2 rounded-lg transition-all ${
            activeTab === "passive"
              ? "bg-gold text-void-900 font-bold"
              : "text-parchment-dim hover:text-gold"
          }`}
        >
          Passives
        </button>
        <button
          onClick={() => setActiveTab("constellations")}
          className={`font-cinzel text-sm tracking-wider px-4 py-2 rounded-lg transition-all ${
            activeTab === "constellations"
              ? "bg-gold text-void-900 font-bold"
              : "text-parchment-dim hover:text-gold"
          }`}
        >
          Constellations
        </button>
      </div>

      {activeTab === "skills" && (
        <div className="flex flex-col gap-3">
          {character.skillTalents?.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      )}

      {activeTab === "passive" && (
        <div className="flex flex-col gap-3">
          {character.passiveTalents?.map((passive, index) => (
            <PassiveCard key={index} passive={passive} />
          ))}
        </div>
      )}

      {activeTab === "constellations" && (
        <div className="flex flex-col gap-3">
          {character.constellations?.map((constellation, index) => (
            <ConstellationCard
              key={index}
              constellation={constellation}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
