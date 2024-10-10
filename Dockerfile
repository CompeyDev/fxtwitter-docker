FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# Temporarily install dependencies to a new layer
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install non-dev dependencies
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Prepare for build by copying source and dependencies from install layer
FROM base AS build 
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Also install other dependencies for the build script
RUN apt-get update && apt-get install git -y

# Build the worker
ENV NODE_ENV=production
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /usr/src/app/dist dist
COPY --from=build /usr/src/app/package.json .

# Run as non-priveleged user
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "dist/worker.js" ]
