FROM node:alpine
ENV CI=true
 
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
 
CMD ["yarn", "start"]