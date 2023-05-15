apollo service:download \
    --endpoint=http://localhost:4000/graphql \
    graphql-schema.json

apollo codegen:generate \
    --localSchemaFile=graphql-schema.json \
    --target=typescript \
    --tagName=gql \
    --queries='src/apiclient/*.ts' \
    --globalTypesFile='src/apiclient/__generated__/GlobalTypes.ts'

rm graphql-schema.json