# youtube-dl-server

Allows remote queuing of [youtube-dl](https://github.com/ytdl-org/youtube-dl) downloads via a simple HTTP interface. Running this on a machine with `youtube-dl` installed allows a remote device (like your phone) to initiate a download by simply sending over a URL to the server.

> Note: This codebase is just a proof of concept and may be brittle. It's only intended for tinkering in something like a home automation project.

## Getting Started

### Prerequisites

- NodeJS 13+
- NPM

### Build and Run

1. Install yarn if needed: `npm i -g yarn`
1. Install dependencies: `yarn`
1. Transpile: `yarn prod`
    - Built JavaScript is output to `./build`.
1. Start the server
    - You'll need to provide a video download directory and (optionally) a port, which defaults to 80
    - The source uses ES2015 modules, so you'll need to specify the `--es-module-specifier-resolution=node` option when you start Node.
    - Example: `node --es-module-specifier-resolution=node ./build/Server.js ~/Downloads/youtube-dl 8080`
        - This is the configuration that runs when executing `yarn start`.

## API

### Download a video

```
POST /youtube/download
```

Request:

```json
{
  "url": "http://example.com/v?id=XXXXXX"
}
```

Response:

```json
{
  "message": "Video queued for download 3d0f21cb-575d-408d-b442-500655767394 - http://example.com/v?id=XXXXXX"
}
```

This request will return as soon as the video is queued, but it will not wait for the video download to complete. To check for progress/success/failure, tail the server logs.

### Health Check

```
GET /health
```

Response:

```
OK
```


## iOS Shortcut

Here's a [very simple iOS Shortcut](https://www.icloud.com/shortcuts/aa1e56a42a1045bcb6ed0e883c19b4ae) that accepts a URL as input from the share sheet and sends it to a running instance of `youtube-dl-server` to be processed.
