import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const input = {
  id: "1",
  name: "Product Name",
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest
      .fn()
      .mockResolvedValue(new Product(input.id, input.name, input.price)),
    findAll: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const wrongInput = { ...input, name: "" };

    await expect(productUpdateUseCase.execute(wrongInput)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is below zero", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const wrongInput = { ...input, price: -1 };

    await expect(productUpdateUseCase.execute(wrongInput)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
