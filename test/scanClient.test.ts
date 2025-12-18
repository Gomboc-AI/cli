import { Client } from '../src/apiclient/client'
import { InfrastructureTool } from '../src/apiclient/gql/graphql'

test("Test proper client creation", () => {
  const client = new Client([InfrastructureTool.Terraform])
  expect(client.authToken).toBe(undefined)
})
