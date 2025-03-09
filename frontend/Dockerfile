# Use official Node.js image
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files and build React app
COPY . .
RUN npm run build

# Use Nginx to serve static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
