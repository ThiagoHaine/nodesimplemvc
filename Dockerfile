FROM node:latest
MAINTAINER Thiago Haine
COPY . /var/www
WORKDIR /var/www
EXPOSE 3000
RUN npm install
CMD npm start