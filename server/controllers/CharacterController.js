const genshindb = require("genshin-db");

const ENKA_BASE = "https://enka.network/ui";
const enkaUrl = (filename) =>
  filename?.trim() ? `${ENKA_BASE}/${filename}.png` : null;

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
        .filter(Boolean)
        .sort((charA, charB) => charB.id - charA.id);

      if (vision)
        characters = characters.filter(
          (char) => char.vision?.toLowerCase() === vision.toLowerCase(),
        );
      if (weapon)
        characters = characters.filter(
          (char) => char.weapon?.toLowerCase() === weapon.toLowerCase(),
        );
      if (nation)
        characters = characters.filter(
          (char) => char.nation?.toLowerCase() === nation.toLowerCase(),
        );
      if (rarity)
        characters = characters.filter(
          (char) => char.rarity === Number(rarity),
        );

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

  static getCharacterStats(req, res, next) {
    try {
      const { id } = req.params;

      const character = genshindb.characters(String(id));
      if (!character)
        throw { name: "NotFound", message: "Character not found" };

      const stats = {};
      for (let level = 1; level <= 100; level++) {
        stats[level] = character.stats(level);
      }

      res.status(200).json({
        substatType: character.substatText,
        stats,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CharacterController;
