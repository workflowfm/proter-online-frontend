# proter-online-frontend

This is the repo for Martin Lewis' Honours Project. The project involves creating a front end and corresponding API to expose elements of proter that are only available programmatically.

This is the front end section.

# Installing and Running

For Local use:

Requriements: node >16, npm

1. `git clone https://github.com/martin-lewis/proter-online-frontend`
2. `cd proter-online-frontend`
3. `npm start` in order to start the website

Using Docker

Requirements: Docker

1. `git clone https://github.com/martin-lewis/proter-online-frontend`
2. `sudo docker build -t frontend:1.0.0 proter-online-frontend/`
3. `sudo docker run -p 0.0.0.0:3000:80 frontend:1.0.0` to run


# Ports
Regardless of setup the web server can be found at localhost:3000

It makes requests to the back-end on localhost:8080 (so ensure you have a instance running). This is hardcoded in the front end but can be changed by editing the fetch commands in src/ArrivalsBox.js
