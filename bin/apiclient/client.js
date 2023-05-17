// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs";
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs';
import { scanCfnQuery } from './scanCloudformationTemplates.js';
import { scanTfQuery } from './scanTerraformPlan.js';
import crossFetch from 'cross-fetch';
export class Client {
    url;
    idToken;
    constructor(url, idToken) {
        this.url = url;
        this.idToken = idToken;
    }
    async scanCfnTemplates(templatePayloads, policy, gitHubOptions, gitLabOptions, secretAccessKey) {
        const httpLink = new HttpLink({ uri: this.url, fetch: crossFetch });
        const authLink = setContext((_, { headers }) => {
            if (this.idToken == null) {
                return { headers: headers };
            }
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${this.idToken}`
                }
            };
        });
        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });
        const scanVariables = {
            templates: templatePayloads,
            policy: policy,
            gitHubOptions: gitHubOptions,
            gitLabOptions: gitLabOptions,
            secretAccessKey: secretAccessKey
        };
        const { data } = await client.query({
            query: scanCfnQuery,
            variables: scanVariables
        });
        return data.scanCfnTemplateExt;
    }
    async scanTfPlan(plan, workingDirectory, policy, gitHubOptions, gitLabOptions) {
        const httpLink = new HttpLink({ uri: this.url, fetch: crossFetch });
        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${this.idToken}`
                }
            };
        });
        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });
        const scanVariables = {
            plan: plan,
            workingDirectory: workingDirectory,
            policy: policy,
            gitHubOptions: gitHubOptions,
            gitLabOptions: gitLabOptions
        };
        const { data } = await client.query({
            query: scanTfQuery,
            variables: scanVariables
        });
        return data.scanTfPlanExt;
    }
}
