FROM node:lts-alpine AS depths

WORKDIR /opt/api

COPY package.json package-lock.json /opt/api/

RUN npm i

FROM node:lts-alpine AS builder

WORKDIR /opt/api

COPY package.json tsconfig.json /opt/api/
COPY src /opt/api/src
COPY --from=depths /opt/api/node_modules /opt/api/node_modules

RUN npm run build

FROM node:lts-alpine AS app

WORKDIR /opt/api

COPY package.json /opt/api/
COPY --from=depths /opt/api/node_modules /opt/api/node_modules
COPY --from=builder /opt/api/build /opt/api/build

CMD ["npm", "start"]