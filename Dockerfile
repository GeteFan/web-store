FROM denoland/deno:alpine-1.29.2

EXPOSE 7777

WORKDIR /app

COPY /shopping-lists .

RUN deno cache deps.js

COPY . .

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-env", "--no-check", "app.js" ]