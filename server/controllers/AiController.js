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

      const prompt = `
        You are a Genshin Impact team composition expert.
        Analyze the following team: ${characters.join(", ")}.
        
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
