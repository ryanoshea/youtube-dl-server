FROM amazonlinux:2 as base

USER root

# Install system dependencies
RUN yum install -y amazon-linux-extras
RUN amazon-linux-extras install epel
RUN yum install -y which wget tar xz python3 gcc-c++ make
RUN python3 -m ensurepip

WORKDIR /temp

# Install ffmpeg
RUN wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-arm64-static.tar.xz
RUN tar -xf ffmpeg-release-arm64-static.tar.xz
RUN mv ffmpeg-5.0.1-arm64-static/ffmpeg /usr/local/bin/ffmpeg
RUN mv ffmpeg-5.0.1-arm64-static/ffprobe /usr/local/bin/ffprobe
RUN chmod a+rx /usr/local/bin/ffmpeg
RUN chmod a+rx /usr/local/bin/ffprobe

# Install yt-dlp dependencies
RUN pip3 install mutagen pycryptodome websockets secretstorage brotli certifi

# Install yt-dlp
RUN wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp
RUN chmod a+rx /usr/local/bin/yt-dlp

# Install Node
RUN curl -fsSL https://rpm.nodesource.com/setup_16.x | bash -
RUN yum install -y nodejs

WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm i

# Copy source and compile
COPY ./tsconfig.json ./
COPY ./app ./app
RUN npm run build

CMD ["node", "--es-module-specifier-resolution=node", "./build/Server.js", "/downloads", "8080"]
