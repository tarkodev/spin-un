FROM node:latest
WORKDIR /app
COPY . /app
COPY prisma ./
RUN npm install
RUN npm run build
EXPOSE 10004
CMD ["sh", "-c", "sleep 1 && npx prisma generate && npx prisma migrate deploy && npm run start:prod"]