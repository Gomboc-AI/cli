import type { CodegenConfig } from '@graphql-codegen/cli';
import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset'
 
// https://the-guild.dev/graphql/codegen/plugins/typescript/typed-document-node
// https://the-guild.dev/graphql/codegen/plugins/presets/preset-client
// https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#documentmode

const SCHEMA_SOURCE = process.env.SCHEMA_SOURCE ?? 'http://0.0.0.0:4000/graphql';

const config: CodegenConfig = {
  schema: [SCHEMA_SOURCE],
  documents: ['src/apiclient/{queries,mutations}/**/*.ts'],
  generates: {
    'src/apiclient/gql/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
      documentTransforms: [addTypenameSelectionDocumentTransform],
    },
  },
};

export default config;