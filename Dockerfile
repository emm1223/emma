FROM nginx:stable-alpine
LABEL maintainer="emma <emmanuelmunayar@gmail.com>"
COPY docs /usr/share/nginx/html
EXPOSE 80
CMD ["/usr/sbin/nginx","-g","daemon off;"]
