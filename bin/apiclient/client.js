// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs";
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs';
import { scanCfnQuery } from './scanCloudformationTemplate.js';
import { scanTfQuery } from './scanTerraformPlan.js';
import crossFetch from 'cross-fetch';
export class Client {
    url;
    authToken;
    client;
    constructor(url, authToken) {
        this.url = url;
        this.authToken = authToken;
        const httpLink = new HttpLink({ uri: this.url, fetch: crossFetch });
        const authLink = setContext((_, { headers }) => {
            if (this.authToken == null) {
                return { headers: headers };
            }
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${this.authToken}`
                }
            };
        });
        this.client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });
    }
    async scanCfnTemplate(templatePayloads, policy, gitHubOptions, gitLabOptions, secretAccessKey) {
        const scanVariables = {
            templates: templatePayloads,
            policy: policy,
            gitHubOptions: gitHubOptions,
            gitLabOptions: gitLabOptions,
            secretAccessKey: secretAccessKey
        };
        const { data } = await this.client.query({
            query: scanCfnQuery,
            variables: scanVariables
        });
        return data.scanCfnTemplateExt;
    }
    async scanTfPlan(plan, workingDirectory, policy, gitHubOptions, gitLabOptions) {
        const scanVariables = {
            plan: plan,
            workingDirectory: workingDirectory,
            policy: policy,
            gitHubOptions: gitHubOptions,
            gitLabOptions: gitLabOptions
        };
        const { data } = await this.client.query({
            query: scanTfQuery,
            variables: scanVariables
        });
        return data.scanTfPlanExt;
    }
}
