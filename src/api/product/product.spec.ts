import request from "supertest";
import { app } from "../../app";

describe("global testing", () => {
  it("test should pass", async () => {
    expect(1 + 1).toBe(2);
  });

  it("should return status 200", async () => {
    return request(app).get("/api/books").expect(200);
  });

  it("should NOT find the route", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).not.toEqual(404);
  });

  it("should call to addBook and failed", async () => {
    const res = await request(app).post("/api/books");
    expect(res.statusCode).toEqual(400);
  });
});
