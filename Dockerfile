FROM node:22.4.1-alpine
WORKDIR ./app/notification
COPY .package*.json ./
COPY . .
RUN npm install
RUN npm update
CMD ["npm","start"]