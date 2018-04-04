FROM node:onbuild

WORKDIR /usr/src/app
RUN npm link
WORKDIR /
ENTRYPOINT ["kms-cli"]
