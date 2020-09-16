### STAGE 1: Build ###
FROM node:13.3.0 AS compile-image

WORKDIR /opt/ng
COPY package.json package-lock.json ./

RUN npm install
COPY . .
ENV PATH="./node_modules/.bin:$PATH" 

RUN ng build --prod
### STAGE 2: Run ###
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=compile-image /opt/ng/dist/erp-angular-web-app /usr/share/nginx/html