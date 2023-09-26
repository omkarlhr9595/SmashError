import { connectToDB } from "./db.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { typeDefs } from "./graphql/typedefs.js";
import { ApolloServer } from "apollo-server";
import { PORT } from "./utils/config.js";
connectToDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
