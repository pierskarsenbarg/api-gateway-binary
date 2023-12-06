import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";

const f = new aws.lambda.CallbackFunction("f", {
    callback: async (ev, ctx) => {
        console.log(JSON.stringify(ev));
        return {
            statusCode: 200,
            body: "goodbye",
        };
    },
});

const api = new apigateway.RestAPI("pk-aws-api", {
    binaryMediaTypes: ["application/json"],
    routes: [{
        path: "/",
        method: "GET",
        eventHandler: f,
    }],
});

export const apiId = api.api.id;