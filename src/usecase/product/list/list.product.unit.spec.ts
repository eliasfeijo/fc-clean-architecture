import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product = new Product("1", "Product Name", 10);
const product2 = new Product("2", "Product Name 2", 20);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([product, product2]),
    update: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test list product use case", () => {
  it("should list a product", async () => {
    const productRepository = MockRepository();
    const productListUseCase = new ListProductUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output).toEqual({
      products: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ],
    });
  });
});
