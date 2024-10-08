import AuditClass, { AuditModel } from "./models/audit.js";

const auditPlugin = {
    async requestDidStart(requestContext: {
        request: any; contextValue: any;
    }) {
        const { contextValue } = requestContext

        return {
            async willSendResponse() {
                const audit: AuditClass = {
                    userId: contextValue.user?._id,
                    query: contextValue.req.body.query,
                    variables: JSON.stringify(contextValue.req.body.variables),
                };
                // if (process.env.NODE_ENV !== 'production')
                //     console.log(audit)
                await AuditModel.create(audit);
            },
        };
    },
};

export default auditPlugin;
