const request = require("supertest");
const app = require("../app");
const { Traveler } = require("../models");

beforeAll(async () => {
  await Traveler.create({
    email: "test@mail.com",
    password: "123456",
  });
});

afterAll(async () => {
  await Traveler.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /auth/register", () => {
  test("Positive Case - Should return Traveler id and email", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "register@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("email", "register@mail.com");
  });

  test("Negative Case - Should return 400 if email is empty", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email cannot be empty");
  });

  test("Negative Case - Should return 400 if email is invalid", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "invalidemail",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Please provide a valid email address",
    );
  });

  test("Negative Case - Should return 400 if password is empty", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "newuser@mail.com",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password cannot be empty");
  });

  test("Negative Case - Should return 400 if email already exists", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "test@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("POST /auth/login", () => {
  test("Positive Case - Should return access_token", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("Negative Case - Should return 401 if email is not found", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "notfound@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Email/Password");
  });

  test("Negative Case - Should return 401 if password is wrong", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test@mail.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Email/Password");
  });

  test("Negative Case - Should return 400 if email is not provided", async () => {
    const response = await request(app).post("/auth/login").send({
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("Negative Case - Should return 400 if password is not provided", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test@mail.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });
});
