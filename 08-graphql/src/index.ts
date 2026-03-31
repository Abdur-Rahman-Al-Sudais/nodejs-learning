import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import { createApolloGraphqlServer } from "./graphql/index.ts";
import UserService from "./services/user.ts";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  app.get("/", (req, res) => {
    return res.json("Server is up and running");
  });

  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({ req }) => {
        const token = req.headers["token"];

        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (error) {
          return {};
        }
      },
    }),
  );

  app.listen(PORT, () => {
    console.log(`App listening on PORT: 3000`);
  });
}

init();
