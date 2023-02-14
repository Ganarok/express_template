FROM node:16.17.0-bullseye-slim

# create destination directory
WORKDIR /app

# copy all files from local system to destination directory
COPY . .

# install dependencies
RUN npm install

# expose image's port X to local system's X port
EXPOSE 3000:3000

CMD [ "npm", "run", "dev" ]
