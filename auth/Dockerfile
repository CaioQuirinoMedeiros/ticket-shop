FROM node:alpine
ENV CI=true

WORKDIR /app
COPY package.json .
RUN yarn install --only=prod
COPY . .
RUN yarn build

CMD ["yarn", "dev"]