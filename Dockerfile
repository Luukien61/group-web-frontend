#build-stage
FROM node:20.14-alpine as build
WORKDIR ./app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build


FROM nginx:1.27.0-alpine as production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx","-g","daemon off;"]

# /usr/share/nginx/html: đây chính là nơi Nginx sẽ tìm tới và trả về cho user
#khi user truy cập ở trình duyệt

#Project VueJS hay ReactJS khi chạy sẽ cần một webserver để có thể chạy được nó,
#và Nginx ở đây chính là webserver. Ở local có cần Nginx gì đâu nhỉ?
#Vì ở local khi chạy npm run dev thì các nhà phát triển VueJS đã thiết lập sẵn cho
#chúng ta 1 local webserver rồi nhé, nhưng khi chạy thật thì không nên dùng nhé,
#phải có 1 webserver xịn, và Nginx thì rất là xịn

#Cụ thể, -g "daemon off;" nghĩa là nginx sẽ chạy ở chế độ foreground,
#tức là nó sẽ không chạy như một tiến trình nền. Điều này quan trọng vì
#Docker sẽ dừng container khi tiến trình chính (trong trường hợp này là nginx) kết thúc.
#Nếu nginx chạy như một daemon, nó sẽ kết thúc ngay lập tức, làm cho container dừng lại.

#mặc định của Nginx khi bạn ý chạy thì bạn ý sẽ lắng nghe ở cổng 80