import gql from 'graphql-tag'


export const LighthouseQuery = gql` 
  query Lighthouse {
    lighthouse {
      level
      message
    }
  }
`