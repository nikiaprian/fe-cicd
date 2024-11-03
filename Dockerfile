# Menggunakan image Nginx sebagai base image
FROM nginx:alpine

# Menyalin file index.html ke direktori yang sesuai di dalam container
COPY index.html /usr/share/nginx/html/

# Mengekspos port 80
EXPOSE 80
