import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Product Name", 10);
const input = { id: product.id };

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const productFindUseCase = new FindProductUseCase(productRepository);

    const output = await productFindUseCase.execute(input);

    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });
});
