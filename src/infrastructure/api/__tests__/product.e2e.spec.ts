import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 10,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
    });
    expect(response.status).toBe(500);
  });

  it("should list a product", async () => {
    const response = await request(app).get("/product");

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(0);

    await request(app).post("/product").send({
      name: "Product 1",
      price: 10,
    });
    await request(app).post("/product").send({
      name: "Product 2",
      price: 20,
    });

    const response2 = await request(app).get("/product");
    expect(response2.status).toBe(200);
    expect(response2.body.products.length).toBe(2);
    expect(response2.body.products[0].name).toBe("Product 1");
    expect(response2.body.products[0].price).toBe(10);
    expect(response2.body.products[1].name).toBe("Product 2");
    expect(response2.body.products[1].price).toBe(20);
  });
});
