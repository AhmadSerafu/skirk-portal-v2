import { useEffect, useState } from "react";
import { url } from "../constants/url";
import { Link } from "react-router";
import CharacterCard from "../components/CharacterCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/characters/charactersSlice";
import { GiSwitchWeapon } from "react-icons/gi";
import { GiFireball } from "react-icons/gi";
import { GiStarFormation } from "react-icons/gi";

export default function CharactersPage() {
  const { data: characters, loading } = useSelector(
    (state) => state.characters,
  );
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(
      fetchCharacters({
        vision: filterVision,
        weapon: filterWeapon,
        rarity: filterRarity,
      }),
    );
  }, [filterVision, filterWeapon, filterRarity]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-gold w-16 h-16"></span>
      </div>
    );

  return (
    <div className="pt-24 px-6 pb-12 max-w-6xl mx-auto overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="page-title">Characters</h1>
        <div className="flex gap-3">
          {/* Element dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn-outline px-3 py-1.5 w-fit flex items-center gap-2"
            >
              <GiFireball className="text-gold text-lg" />
              <span className="font-cinzel text-xs tracking-widest uppercase">
                {filterVision || "Element"}
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-10 mt-1 bg-void-800 border border-void-600 rounded-lg overflow-hidden w-36"
            >
              <li
                onClick={() => setFilterVision("")}
                className="font-nunito text-sm text-parchment-dim px-4 py-2 hover:bg-void-600 cursor-pointer"
              >
                All Elements
              </li>
              {visions.map((vision, index) => (
                <li
                  key={index}
                  onClick={() => setFilterVision(vision)}
                  className="font-nunito text-sm text-parchment px-4 py-2 hover:bg-void-600 cursor-pointer"
                >
                  {vision}
                </li>
              ))}
            </ul>
          </div>

          {/* Weapon dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn-outline px-3 py-1.5 w-fit flex items-center gap-2"
            >
              <GiSwitchWeapon className="text-gold text-lg" />
              <span className="font-cinzel text-xs tracking-widest uppercase">
                {filterWeapon || "Weapon"}
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-10 mt-1 bg-void-800 border border-void-600 rounded-lg overflow-hidden w-36"
            >
              <li
                onClick={() => setFilterWeapon("")}
                className="font-nunito text-sm text-parchment-dim px-4 py-2 hover:bg-void-600 cursor-pointer"
              >
                All Weapons
              </li>
              {weapons.map((weapon, index) => (
                <li
                  key={index}
                  onClick={() => setFilterWeapon(weapon)}
                  className="font-nunito text-sm text-parchment px-4 py-2 hover:bg-void-600 cursor-pointer"
                >
                  {weapon}
                </li>
              ))}
            </ul>
          </div>

          {/* Rarity dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn-outline px-3 py-1.5 w-fit flex items-center gap-2"
            >
              <GiStarFormation className="text-gold text-lg" />
              <span className="font-cinzel text-xs tracking-widest uppercase">
                {filterRarity ? `${filterRarity}★` : "Rarity"}
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-10 mt-1 bg-void-800 border border-void-600 rounded-lg overflow-hidden w-36"
            >
              <li
                onClick={() => setFilterRarity("")}
                className="font-nunito text-sm text-parchment-dim px-4 py-2 hover:bg-void-600 cursor-pointer"
              >
                All Rarities
              </li>
              {rarities.map((rarity, index) => (
                <li
                  key={index}
                  onClick={() => setFilterRarity(rarity)}
                  className="font-nunito text-sm text-parchment px-4 py-2 hover:bg-void-600 cursor-pointer"
                >
                  {rarity}★
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
}
