const genshindb = require("genshin-db");
const { genAiStructuredOutput } = require("../helpers/gemini");

class AiController {
  static async analyze(req, res, next) {
    try {
      const { characters } = req.body;

      if (!characters || characters.length === 0) {
        throw { name: "BadRequest", message: "Characters is required" };
      }

      if (characters.length > 4) {
        throw { name: "BadRequest", message: "Maximum 4 characters per team" };
      }

      // Enrich dengan elemen tiap karakter
      const characterDetails = characters
        .map((name) => {
          const char = genshindb.characters(name);
          return `${name} (${char?.elementText || "Unknown"})`;
        })
        .join(", ");

      console.log(characterDetails);

      const SKIRK_CONTEXT = `
        Special note: Skirk is a 5-star Cryo Sword character released in version 5.6.
        She is currently the highest DPS character in the game. Her kit revolves around:
        - Serpent's Subtlety resource (gained via Elemental Skill)
        - Seven-Phase Flash mode (activated by Elemental Skill)
        - Havoc: Ruin (Elemental Burst, consumes Serpent's Subtlety for massive Cryo AoE DMG)
        - Havoc: Extinction (special burst inside Seven-Phase Flash)
        - Synergizes strongly with Hydro and Cryo supports
        Account for her extremely high damage ceiling when rating teams that include her.
      `;

      const prompt = `
        You are a Genshin Impact team composition expert.
         ${characters.includes("Skirk") ? SKIRK_CONTEXT : ""}
        Analyze the following team: ${characterDetails}.
        Only include elemental reactions that are actually possible 
        given the exact elements listed above. Do not hallucinate 
        reactions that require elements not present in the team.
        
        Respond ONLY with a JSON object in this exact format, no markdown:
        {
          "teamName": "creative team name",
          "overallRating": "S/A/B/C",
          "synopsis": "brief overall analysis in 2-3 sentences",
          "elementalReactions": ["reaction1", "reaction2"],
          "strengths": ["strength1", "strength2", "strength3"],
          "weaknesses": ["weakness1", "weakness2"],
          "playstyle": "description of how to play this team"
        }
      `;

      const result = await genAiStructuredOutput(prompt);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AiController;
