FROM node:16
WORKDIR /usr/app/proteronline-frontend

ADD src/ /usr/app/proteronline-frontend/src
ADD public/ /usr/app/proteronline-frontend/public
ADD package.json /usr/app/proteronline-frontend
ADD package-lock.json /usr/app/proteronline-frontend

RUN npm install

CMD npm start
