# Gomboc.ai CLI


## Instructions

Please refer to the internal Gomboc Wiki if you need to work on this repo

## Development instructions:

1. Open in a dev-container.
2. Run `npm install` is needed
3. Run `gomboc`
4. Adjust `.env` as needed and restart the container

### Modus operandi

1. CLI makes a single request to the server, specifies a list of directories with changes and an effect
2. Server responds with a `scanRequestId` and starts working on it
3. CLI waits a little before going into a polling mode where it checks for the status of the scan
4. If it gets a signal that the scan is done processing, it makes a final call to get the action results
5. Because action results can potentially have many observations, CLI only asks for a first page of specific observations with violations
6. Getting at least one of those observations (or a failed scan) will make the cli exit with an error code

### Settings override -- INTERNAL USE

- `GOMBOC_SERVER_URL`: the url for the GraphQL API Server
- `GOMBOC_CLIENT_URL`: the base url for the web app client
- `GOMBOC_DEBUG`: provide any value to enable additional logging

### CLI

```bash
gomboc --help
```
