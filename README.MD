# srcds-a2s

A tool to make queries on source dedicated servers.

## API

```js
require('srcds-a2s').info(ip, port) // Make an A2S_INFO query
```

## CLI

Make an A2S_INFO query:

```sh
$: srcds 192.168.0.1 27018
```

Or use npx:
```sh
$: npx srcds-a2s 192.168.0.1 27018
```