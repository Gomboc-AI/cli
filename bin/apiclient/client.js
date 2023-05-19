import crossFetch from 'cross-fetch';
// @ts-ignore
import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs";
// @ts-ignore
import { HttpLink } from "@apollo/client/link/http/http.cjs";
// @ts-ignore
import { setContext } from '@apollo/client/link/context/context.cjs';
import { scanCfnQuery } from './scanCloudformationTemplate.js';
import { scanTfQuery } from './scanTerraformPlan.js';
import { CLI_VERSION } from '../cli/version.js';
export class Client {
    url;
    authToken;
    client;
    constructor(url, authToken) {
        this.url = url;
        this.authToken = authToken;
        const httpLink = new HttpLink({ uri: this.url, fetch: crossFetch });
        const authLink = setContext((_, { headers }) => {
            headers = {
                'X-GOMBOC-CLI-VERSION': CLI_VERSION,
                'X-GOMBOC-RUNNER-PATH': process.env._,
                ...headers
            };
            if (this.authToken != null) {
                headers = {
                    'Authorization': `Bearer ${this.authToken}`,
                    ...headers
                };
            }
            return { headers: headers };
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
    async scanTfPlan(plan, workingDirectory, policy, gitHubOptions, gitLabOptions, secretAccessKey) {
        const scanVariables = {
            plan: plan,
            workingDirectory: workingDirectory,
            policy: policy,
            gitHubOptions: gitHubOptions,
            gitLabOptions: gitLabOptions,
            secretAccessKey: secretAccessKey
        };
        const { data } = await this.client.query({
            query: scanTfQuery,
            variables: scanVariables
        });
        return data.scanTfPlanExt;
    }
}
