import { ApolloServerPlugin, BaseContext, GraphQLRequestContext, } from 'apollo-server-plugin-base';
import { AuthenticationError } from 'type-graphql';
import jwt from './utils/jwt';

const authPlugin: ApolloServerPlugin = {
    async requestDidStart(requestContext: GraphQLRequestContext<BaseContext>) {
        const { request } = requestContext;
        const token = request.http.headers["authorization"] || '';

        if (!token) {
            throw new AuthenticationError('Authorization token is required');
        }

        try {
            const decoded = jwt.verifyAccessToken(token);

            requestContext.context.user = decoded;
        } catch (error) {
            throw new AuthenticationError('Invalid token or Token is expired');
        }

        return {
            async willSendResponse() { },
        };
    },
};

export default authPlugin;
