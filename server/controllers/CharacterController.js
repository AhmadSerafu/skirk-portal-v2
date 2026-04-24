const genshindb = require("genshin-db");

const ENKA_BASE = "https://enka.network/ui";
const enkaUrl = (filename) =>
  filename?.trim() ? `${ENKA_BASE}/${filename}.png` : null;

// Enrich a cost array: adds image + rarity to each material
const enrichMaterialList = (items = []) =>
  items.map((item) => {
    try {
      const mat = genshindb.materials(item.name);
      return {
        name: item.name,
        count: item.count,
        rarity: mat?.rarity ?? null,
        image: enkaUrl(mat?.images?.filename_icon) || null, // ← fix
      };
    } catch {
      return { name: item.name, count: item.count, rarity: null, image: null };
    }
  });

const testMat = genshindb.materials("Mora");
console.log("mat images keys:", Object.keys(testMat?.images || {}));

// Enrich ALL ascension phases
const enrichCosts = (costs) => {
  if (!costs) return null;
  const result = {};
  for (const [phase, items] of Object.entries(costs)) {
    result[phase] = enrichMaterialList(items);
  }
  return result;
};

class CharacterController {
  static getCharacters(req, res, next) {
    try {
      const { vision, weapon, nation, rarity } = req.query;

      const charNames = genshindb.characters("names", {
        matchCategories: true,
      });

      let characters = charNames
        .map((name) => {
          const character = genshindb.characters(name);
          if (!character || !character.images) return null;
          return {
            id: character.id,
            name: character.name,
            vision: character.elementText,
            weapon: character.weaponText,
            nation: character.region,
            rarity: character.rarity,
            images: {
              icon:
                enkaUrl(character.images.filename_icon) ||
                character.images.mihoyo_icon ||
                null,
              splash: enkaUrl(character.images.filename_gachaSplash) || null,
            },
          };
        })
        .filter(Boolean);

      if (vision)
        characters = characters.filter(
          (c) => c.vision?.toLowerCase() === vision.toLowerCase(),
        );
      if (weapon)
        characters = characters.filter(
          (c) => c.weapon?.toLowerCase() === weapon.toLowerCase(),
        );
      if (nation)
        characters = characters.filter(
          (c) => c.nation?.toLowerCase() === nation.toLowerCase(),
        );
      if (rarity)
        characters = characters.filter((c) => c.rarity === Number(rarity));

      res.status(200).json(characters);
    } catch (error) {
      next(error);
    }
  }

  static getCharacterById(req, res, next) {
    try {
      const { id } = req.params;

      const character = genshindb.characters(String(id));
      if (!character)
        throw { name: "NotFound", message: "Character not found" };

      const talents = genshindb.talents(character.name);
      const constellations = genshindb.constellations(character.name);

      // Talent upgrade materials — query by character name
      let talentMaterials = null;
      try {
        const tm = genshindb.talentmaterials(character.name);
        if (tm) {
          talentMaterials = {
            availability: tm.availability ?? null, // days of the week available
            items: enrichMaterialList(
              [
                tm.talentBook && { name: tm.talentBook, count: null },
                tm.bossDropName && { name: tm.bossDropName, count: null },
                tm.specialtyName && { name: tm.specialtyName, count: null },
              ].filter(Boolean),
            ),
          };
        }
      } catch {
        talentMaterials = null;
      }

      res.status(200).json({
        id: character.id,
        name: character.name,
        title: character.title,
        description: character.description,
        rarity: character.rarity,
        vision: character.elementText,
        weapon: character.weaponText,
        nation: character.region,
        affiliation: character.affiliation,
        birthday: character.birthday,
        constellation: character.constellation,
        cv: character.cv,
        costs: enrichCosts(character.costs),
        talentMaterials,
        skillTalents: talents
          ? [talents.combat1, talents.combat2, talents.combat3].filter(Boolean)
          : [],
        passiveTalents: talents
          ? [talents.passive1, talents.passive2, talents.passive3].filter(
              Boolean,
            )
          : [],
        constellations: constellations
          ? [
              constellations.c1,
              constellations.c2,
              constellations.c3,
              constellations.c4,
              constellations.c5,
              constellations.c6,
            ].filter(Boolean)
          : [],
        images: {
          icon:
            enkaUrl(character.images.filename_icon) ||
            character.images.mihoyo_icon ||
            null,
          portrait: character.images.cover1 || null,
          card: enkaUrl(character.images.filename_iconCard) || null,
          splash: enkaUrl(character.images.filename_gachaSplash) || null,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CharacterController;
