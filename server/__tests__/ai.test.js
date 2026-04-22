const request = require("supertest");
const app = require("../app");
const { Traveler } = require("../models");
const { signToken } = require("../helpers/jwt");

let token;

beforeAll(async () => {
  const traveler = await Traveler.create({
    email: "ai-test@mail.com",
    password: "123456",
  });
  token = signToken({ id: traveler.id, email: traveler.email });
});

afterAll(async () => {
  await Traveler.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /ai/analyze", () => {
  test("Negative Case - Should return 401 if no token provided", async () => {
    const response = await request(app)
      .post("/ai/analyze")
      .send({
        characters: ["hu-tao", "zhongli"],
      });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("Negative Case - Should return 400 if characters is empty", async () => {
    const response = await request(app)
      .post("/ai/analyze")
      .set("Authorization", `Bearer ${token}`)
      .send({
        characters: [],
      });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Characters is required");
  });

  test("Negative Case - Should return 400 if characters exceed 4", async () => {
    const response = await request(app)
      .post("/ai/analyze")
      .set("Authorization", `Bearer ${token}`)
      .send({
        characters: ["hu-tao", "zhongli", "xingqiu", "yelan", "fischl"],
      });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Maximum 4 characters per team",
    );
  });

  test("Positive Case - Should return AI analysis", async () => {
    const response = await request(app)
      .post("/ai/analyze")
      .set("Authorization", `Bearer ${token}`)
      .send({
        characters: ["hu-tao", "zhongli", "xingqiu", "yelan"],
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("teamName", expect.any(String));
    expect(response.body).toHaveProperty("overallRating", expect.any(String));
    expect(response.body).toHaveProperty("synopsis", expect.any(String));
    expect(response.body).toHaveProperty(
      "elementalReactions",
      expect.any(Array),
    );
    expect(response.body).toHaveProperty("strengths", expect.any(Array));
    expect(response.body).toHaveProperty("weaknesses", expect.any(Array));
    expect(response.body).toHaveProperty("playstyle", expect.any(String));
  }, 30000);
});
