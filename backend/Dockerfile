#Build stage
FROM node:21-alpine AS build
RUN apk --no-cache add --virtual .builds-deps build-base python3
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

#Production stage
FROM node:21-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]