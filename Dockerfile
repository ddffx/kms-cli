FROM node:onbuild

WORKDIR /usr/src/app
RUN npm link
WORKDIR /
CMD [kms-cli]
