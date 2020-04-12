FROM node:12-alpine3.9  
#Added lighter version skips secuirty scan and other features

# Create working directory
WORKDIR /src/app/core-api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]

# ADD PM2 and Clustering and remove app.js Master/Slave
