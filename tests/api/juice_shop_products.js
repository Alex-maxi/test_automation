const { expect } = require("chai");
const { textGenerator } = require("../../src/libraries/helpers");
const { performance } = require("perf_hooks");
const Parameters = require("../../src/applications/api/getUsersParameters");
const ApiClient = require("../../src/applications/api/apiClient");


describe("GET /api/Products", () => {
  let apiClient;

  before(async () => {
    apiClient = new ApiClient();
    // await apiClient.login();
  });

  after(() => {
    apiClient.logout();
  });

  it("1. Should return 200 and an array of products", async () => {
    const response = await apiClient.getAllProducts();
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("data").that.is.an("array");
  });

  it("2. Each product should contain required fields", async () => {
    const response = await apiClient.getAllProducts();
    const products = response.data.data;

    expect(products.length).to.be.greaterThan(0);

    const product = products[0];
    expect(product).to.include.all.keys("id", "name", "price", "description");
  });

  it("3. Response time should be less than 300 milisecond", async () => {
    const start = performance.now();
    const response = await apiClient.getAllProducts();
    const end = performance.now();
    const responseTime = end - start;

    expect(response.status).to.equal(200);
    expect(responseTime).to.be.lessThan(300);
  });

  it("4. Should be accessible without authentication", async () => {
    const unauthenticatedClient = new ApiClient();
    const response = await unauthenticatedClient.getAllProducts();

    expect(response.status).to.equal(200);
    expect(response.data.data).to.be.an("array");
  });

  it("5. Should return a single product by valid ID", async () => {
    const listResponse = await apiClient.getAllProducts();
    const products = listResponse.data.data;

    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProductId = products[randomIndex].id;

    const singleResponse = await apiClient.getProductById(randomProductId);
    const product = singleResponse.data.data;

    expect(singleResponse.status).to.equal(200);
    expect(product).to.include.all.keys("id", "name", "description",  "price", "deluxePrice", "image");
    expect(product.id).to.equal(randomProductId);
  });

  it("6. All products should have required fields with non-empty values", async () => {
    const listResponse = await apiClient.getAllProducts();
    const products = listResponse.data.data;

    expect(products).to.be.an("array").that.is.not.empty;

    const requiredFields = ["id", "name", "description", "price", "deluxePrice", "image"];

    products.forEach((product, index) => {
      expect(product, `Product at index ${index} is missing required keys`).to.include.all.keys(...requiredFields);

      requiredFields.forEach((key) => {
        expect(product[key], `Field '${key}' is empty in product at index ${index}`).to.satisfy((val) => {
          if (val === null || val === undefined) return false;
          if (typeof val === "string") return val.trim() !== "";
          if (typeof val === "object") return Object.keys(val).length > 0;
          return true;
        });
      });
    });
  });

  it("7. Should return 404 for invalid product ID", async () => {
    try {
      await apiClient.getProductById(999999);
      throw new Error("Expected request to fail with 404");
    } catch (err) {
      expect(err.response.status).to.equal(404);
    }
  });
  
});
