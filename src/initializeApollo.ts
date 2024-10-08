import express from "express";
import http from 'http';
import schema from "./schema/schema.js";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { unwrapResolverError } from "@apollo/server/errors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";

const app = express();
app.use(express.json());

const httpServer = http.createServer(app);
const server = new ApolloServer({
    schema,
    introspection: true,
    formatError: (formattedError, error) => {
        // unwrapResolverError removes the outer GraphQLError wrapping from
        // errors thrown in resolvers, enabling us to check the instance of
        // the original error
        if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
            return formattedError;
        }

        console.error(error);

        if (unwrapResolverError(error)) {
            return { message: "Internal server error" };
        }
        return formattedError;
    },
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV === "production"
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageLocalDefault(),
    ],
});

await server.start();

app.use(
    '/graphql',
    cors({
        // origin: process.env.ORIGINS.split(";"),
    }),
    express.json(),
    expressMiddleware(server),
);

const port = +process.env.GRAPHQL_PORT || 4000;

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 GraphQL Server ready at http://localhost:${port}/graphql`);
