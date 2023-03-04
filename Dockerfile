# Setup Node and npm
FROM node:19-bullseye
RUN npm update -g npm

# Setup system packages
RUN apt-get update
RUN apt-get -y upgrade

# Setup working directory
WORKDIR /calendar-js

# Setup python packages
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

# Copy code
COPY ./api/ /calendar-js/api

# Provide access to script files
RUN chmod -R 777 api/src/scripts

# Setup the application
EXPOSE 8000
ENTRYPOINT ["bash"]