const request = require("supertest");
const app = require("../app");

describe("GET /characters", () => {
  test("Positive Case - Should return list of characters", async () => {
    const response = await request(app).get("/characters");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    expect(response.body[0]).toHaveProperty("id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("vision", expect.any(String));
    expect(response.body[0]).toHaveProperty("weapon", expect.any(String));
    expect(response.body[0]).toHaveProperty("nation", expect.any(String));
    expect(response.body[0]).toHaveProperty("rarity", expect.any(Number));
  });

  test("Positive Case - Should return filtered characters by vision", async () => {
    const response = await request(app).get("/characters?vision=pyro");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((character) => {
      expect(character.vision.toLowerCase()).toBe("pyro");
    });
  });

  test("Positive Case - Should return filtered characters by weapon", async () => {
    const response = await request(app).get("/characters?weapon=sword");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((character) => {
      expect(character.weapon.toLowerCase()).toBe("sword");
    });
  });

  test("Positive Case - Should return filtered characters by nation", async () => {
    const response = await request(app).get("/characters?nation=liyue");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((character) => {
      expect(character.nation.toLowerCase()).toBe("liyue");
    });
  });

  test("Positive Case - Should return filtered characters by rarity", async () => {
    const response = await request(app).get("/characters?rarity=5");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((character) => {
      expect(character.rarity).toBe(5);
    });
  });
});

describe("GET /characters/:id", () => {
  test("Positive Case - Should return character by id", async () => {
    const response = await request(app).get("/characters/hu-tao");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", "hu-tao");
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("vision", expect.any(String));
    expect(response.body).toHaveProperty("weapon", expect.any(String));
    expect(response.body).toHaveProperty("nation", expect.any(String));
    expect(response.body).toHaveProperty("rarity", expect.any(Number));
  });

  test("Negative Case - Should return 404 if character not found", async () => {
    const response = await request(app).get("/characters/invalid-character");

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Character not found");
  });
});
