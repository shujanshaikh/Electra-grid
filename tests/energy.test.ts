import request from "supertest";

const BASE_URL = "http://localhost:3000"; // Adjust based on your local setup

describe("Energy Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /energy", () => {
    it("should fetch all energy usage records", async () => {
      const response = await request(BASE_URL).get("/energy");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("energy");
    });
  });

  describe("POST /energys", () => {
    it("should create a new energy usage record", async () => {
      const response = await request(BASE_URL)
        .post("/energys")
        .set("Content-Type", "application/json")
        .send({ userId: 8, stationId: 1, energyUsed: 50 });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("energy");
    });

    it("should return 400 if invalid data is provided", async () => {
      const response = await request(BASE_URL).post("/energys").send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid data");
    });
  });

  describe("GET /energy/:id", () => {
    it("should fetch a single energy usage record by ID", async () => {
      const response = await request(BASE_URL).get("/energy/1");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("energy");
    });
  });
});
