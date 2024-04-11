# Gomboc.ai CLI


## Instructions

Please refer to the internal Gomboc Wiki if you need to work on this repo

## Development instructions:

Clone `cli` repo

`nvm use`

Manually update the package version in `package.json`

`npm run bootstrap`

If you need to pull the schema, have ScanAPI running in port 4000 and run `npm run generate`

`npm pack` to generate an installable

### Modus Operandi

1. CLI makes a single request to the server, specifies a list of directories with changes and an effect
2. Server responds with a `scanRequestId` and starts working on it
3. CLI waits a little before going into a polling mode where it checks for the status of the scan
4. If it gets a signal that the scan is done processing, it makes a final call to get the action results
5. Because action results can potentially have many observations, CLI only asks for a first page of specific observations with violations
6. Getting at least one of those observations (or a failed scan) will make the cli exit with an error code

### CLI

```bash
gomboc --help
```