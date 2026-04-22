const request = require("supertest");
const app = require("../app");
const { Traveler, Build, BuildCharacter } = require("../models");
const { signToken } = require("../helpers/jwt");

let token;
let buildId;

beforeAll(async () => {
  const traveler = await Traveler.create({
    email: "build-test@mail.com",
    password: "123456",
  });
  token = signToken({ id: traveler.id, email: traveler.email });

  const build = await Build.create({
    name: "Test Build",
    description: "Test Description",
    travelerId: traveler.id,
  });
  buildId = build.id;
});

afterAll(async () => {
  await BuildCharacter.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Build.destroy({ truncate: true, restartIdentity: true, cascade: true });

  await Traveler.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("GET /builds", () => {
  test("Positive Case - Should return list of builds", async () => {
    const response = await request(app)
      .get("/builds")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);

    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("travelerId", expect.any(Number));
    expect(response.body[0]).toHaveProperty(
      "BuildCharacters",
      expect.any(Array),
    );
    expect(response.body[0]).toHaveProperty(
      "createdAt",
      expect.stringContaining(response.body[0].createdAt),
    );
    expect(response.body[0]).toHaveProperty(
      "updatedAt",
      expect.stringContaining(response.body[0].updatedAt),
    );
  });

  test("Negative Case - Should return 401 if no token provided", async () => {
    const response = await request(app).get("/builds");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
});

describe("POST /builds", () => {
  test("Positive Case - Should create build successfully", async () => {
    const response = await request(app)
      .post("/builds")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New Build",
        description: "New Description",
        characters: ["hu-tao", "zhongli"],
      });

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", "New Build");
    expect(response.body).toHaveProperty("description", "New Description");
    expect(response.body).toHaveProperty("travelerId", expect.any(Number));
    expect(response.body).toHaveProperty("BuildCharacters", expect.any(Array));
    expect(response.body).toHaveProperty(
      "createdAt",
      expect.stringContaining(response.body.createdAt),
    );
    expect(response.body).toHaveProperty(
      "updatedAt",
      expect.stringContaining(response.body.updatedAt),
    );
  });

  test("Negative Case - Should return 401 if no token provided", async () => {
    const response = await request(app)
      .post("/builds")
      .send({
        name: "New Build",
        description: "New Description",
        characters: ["hu-tao", "zhongli"],
      });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("Negative Case - Should return 400 if name is not provided", async () => {
    const response = await request(app)
      .post("/builds")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        description: "New Description",
        characters: ["hu-tao", "zhongli"],
      });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Build name cannot be empty",
    );
  });

  test("Negative Case - Should return 400 if no characters provided", async () => {
    const response = await request(app)
      .post("/builds")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Build Without Characters",
        description: "No characters",
      });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "At least 1 character is required",
    );
  });

  test("Negative Case - Should return 400 if characters exceed 4", async () => {
    const response = await request(app)
      .post("/builds")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New Build",
        description: "New Description",
        characters: ["hu-tao", "zhongli", "xingqiu", "yelan", "fischl"],
      });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Maximum 4 characters per build",
    );
  });
});

describe("GET /builds/:id", () => {
  test("Positive Case - Should return build by id", async () => {
    const response = await request(app)
      .get(`/builds/${buildId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", buildId);
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("travelerId", expect.any(Number));
    expect(response.body).toHaveProperty("BuildCharacters", expect.any(Array));
    expect(response.body).toHaveProperty(
      "createdAt",
      expect.stringContaining(response.body.createdAt),
    );
    expect(response.body).toHaveProperty(
      "updatedAt",
      expect.stringContaining(response.body.updatedAt),
    );
  });

  test("Negative Case - Should return 401 if no token provided", async () => {
    const response = await request(app).get(`/builds/${buildId}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("Negative Case - Should return 403 if accessing other user's build", async () => {
    const otherTraveler = await Traveler.create({
      email: "other@mail.com",
      password: "123456",
    });
    const otherToken = signToken({
      id: otherTraveler.id,
      email: otherTraveler.email,
    });

    const response = await request(app)
      .get(`/builds/${buildId}`)
      .set("Authorization", `Bearer ${otherToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "You are not authorized to access this build",
    );
  });
});

describe("PUT /builds/:id", () => {
  test("Positive Case - Should update build successfully", async () => {
    const response = await request(app)
      .put(`/builds/${buildId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Build",
        description: "Updated Description",
        characters: ["hu-tao", "zhongli"],
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", buildId);
    expect(response.body).toHaveProperty("name", "Updated Build");
    expect(response.body).toHaveProperty("description", "Updated Description");
    expect(response.body).toHaveProperty("BuildCharacters", expect.any(Array));
    expect(response.body).toHaveProperty(
      "createdAt",
      expect.stringContaining(response.body.createdAt),
    );
    expect(response.body).toHaveProperty(
      "updatedAt",
      expect.stringContaining(response.body.updatedAt),
    );
  });

  test("Negative Case - Should return 400 if no characters provided", async () => {
    const response = await request(app)
      .put(`/builds/${buildId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Without Characters",
        description: "No characters",
      });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "At least 1 character is required",
    );
  });

  test("Negative Case - Should return 400 if characters exceed 4", async () => {
    const response = await request(app)
      .put(`/builds/${buildId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Build",
        description: "Updated Description",
        characters: ["hu-tao", "zhongli", "xingqiu", "yelan", "fischl"],
      });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Maximum 4 characters per build",
    );
  });

  test("Negative Case - Should return 401 if no token provided", async () => {
    const response = await request(app)
      .put(`/builds/${buildId}`)
      .send({
        name: "Updated Build",
        description: "Updated Description",
        characters: ["hu-tao", "zhongli"],
      });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("Negative Case - Should return 403 if updating other user's build", async () => {
    const otherTraveler = await Traveler.create({
      email: "other2@mail.com",
      password: "123456",
    });
    const otherToken = signToken({
      id: otherTraveler.id,
      email: otherTraveler.email,
    });

    const response = await request(app)
      .put(`/builds/${buildId}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({
        name: "Updated Build",
        description: "Updated Description",
        characters: ["hu-tao", "zhongli"],
      });

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "You are not authorized to access this build",
    );
  });

  test("Negative Case - Should return 404 if build not found", async () => {
    const response = await request(app)
      .put(`/builds/9999`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Build",
        description: "Updated Description",
        characters: ["hu-tao", "zhongli"],
      });

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Build not found");
  });
});

describe("DELETE /builds/:id", () => {
  test("Positive Case - Should delete build successfully", async () => {
    const response = await request(app)
      .delete(`/builds/${buildId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Build deleted successfully",
    );
  });

  test("Negative Case - Should return 401 if no token provided", async () => {
    const response = await request(app).delete(`/builds/${buildId}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("Negative Case - Should return 403 if deleting other user's build", async () => {
    const otherTraveler = await Traveler.create({
      email: "other3@mail.com",
      password: "123456",
    });
    const otherToken = signToken({
      id: otherTraveler.id,
      email: otherTraveler.email,
    });

    const build = await Build.create({
      name: "Other Build",
      description: "Other Description",
      travelerId: otherTraveler.id,
    });

    const response = await request(app)
      .delete(`/builds/${build.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "You are not authorized to access this build",
    );
  });

  test("Negative Case - Should return 404 if build not found", async () => {
    const response = await request(app)
      .delete(`/builds/9999`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Build not found");
  });
});
