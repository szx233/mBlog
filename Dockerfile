FROM node:10.13-alpine
#ENV NODE_ENV production
COPY . /app
WORKDIR /app
RUN yarn
CMD  yarn run build && yarn run start