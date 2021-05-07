import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

faker.seed(123);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      product: Model,
      wishList: Model,
      cartList: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.resource("products");
      this.resource("wishLists");
      this.resource("cartLists");
    },

    seeds(server) {
      [...Array(50)].forEach((_) => {
        server.create("product", {
          productId: faker.random.uuid(),
          name: faker.commerce.productName(),
          desc: faker.commerce.productDescription(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          fastDelivery: faker.random.boolean(),
          inStock: faker.random.boolean(),
          offer: faker.random.arrayElement([
            "Save 50",
            "70% bonanza",
            "40% off",
            "22% off",
            "70% off"
          ])
        });
      });
    }
  });
}
