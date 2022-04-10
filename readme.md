# youtube-dl-server

Allows remote queuing of [yt-dlp](https://github.com/yt-dlp/yt-dlp) downloads via a simple HTTP interface. Running this spawns a simple REST server on port 8080 that allows a remote device (like your phone) to initiate a download by simply sending over a URL to the server.

> Note: This codebase is just a proof of concept and may be brittle. It's only intended for tinkering in something like a home automation project.

## Getting Started

### Run with Docker

There's a Docker Compose v2 config included. To build the image and run it on a machine with Docker installed:

```zsh
$ docker compose build
$ docker compose up -d
```

The server will start listening on port `8080` and will save downloads to a `./downloads` subdirectory.

### Build and Run (Native)

Alternatively, on a system with `yt-dlp` and its dependencies installed (see project page), you can build and run the Node server locally.

1. Install Node 16.
1. Install dependencies: `npm i`
1. Transpile: `npm run build`
    - Built JavaScript is output to `./build`.
1. Start the server
    - You'll need to provide a video download directory and (optionally) a port, which defaults to 80
    - The source uses ES2015 modules, so you'll need to specify the `--es-module-specifier-resolution=node` option when you start Node.
    - Example: `node --es-module-specifier-resolution=node ./build/Server.js ./downloads 8080`.

## API

### Download a video

```
POST /youtube/download
```

Request:

```json
{
  "url": "http://example.com/v?id=XXXXXX",
  "subDir": "my-folder"
}
```

`subDir` is optional

Response:

```json
{
  "message": "Video queued for download with ID cf69998b-c03e-4c0e-9b23-6f78d9406cf4 - http://example.com/v?id=XXXXXX"
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
