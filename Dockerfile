FROM isim/oraclejava:1.8.0_101

WORKDIR /usr/src/app
COPY package.json .


RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update && apt-get install -y nodejs


EXPOSE 8090
CMD ["npm","start"]

COPY . .