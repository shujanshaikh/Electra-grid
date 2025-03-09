import request from "supertest";

const BASE_URL = "http://localhost:3000"; // Change the port if needed

describe("Auth Routes (Local Server)", () => {
  describe("POST /signup", () => {
    it("should create a new user and return user ID", async () => {
      const response = await request(BASE_URL)
        .post("/signup")
        .send({
          email: `test${Date.now()}@example.com`,
          password: "password123",
          name: "Test User",
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("user");
    });

    it("should return 400 for invalid data", async () => {
      const response = await request(BASE_URL).post("/signup").send({ email: "invalid-email" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid data");
    });
  });

  describe("POST /signin", () => {
    it("should return a JWT token for valid credentials", async () => {
      const response = await request(BASE_URL)
        .post("/signin")
        .send({
          email: "test@example.com",
          password: "password123",
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return 401 for invalid credentials", async () => {
      const response = await request(BASE_URL)
        .post("/signin")
        .send({
          email: "wrong@example.com",
          password: "wrongpassword",
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials");
    });
  });
});
