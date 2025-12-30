import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";

let adminToken;
let userToken;

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth + Admin Access Tests", () => {

  test("Admin login should succeed", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@gmail.com",
        password: "admin123",
      });

    expect(res.statusCode).toBe(200);
    adminToken = res.body.token;
  }, 10000);

  test("User login should succeed", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "aman@gmail.com",
        password: "aman123",
      });

    expect(res.statusCode).toBe(200);
    userToken = res.body.token;
  }, 10000);

  test("Admin can access admin users list", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  test("Normal user cannot access admin users list", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });
  
  test("Access /me without token should fail", async () => {
  const res = await request(app).get("/api/auth/me");
  expect(res.statusCode).toBe(401);
});

});
