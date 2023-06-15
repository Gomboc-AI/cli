import gql from 'graphql-tag'


export const callLighthouseQuery = gql` 
  query CallLighthouse {
    lighthouse {
      level
      message
    }
  }
`