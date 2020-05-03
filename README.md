# ppl-ui
1) Clone the project from https://github.com/ankith8/ppl-ui.git
2) cd ppl-ui
3) npm install 
4) npm start

To build Docker container follow these steps : 
1) cd ppl-ui
2) Make sure you are logged in to your docker hub account and docker is running on your system
3) docker build -t YOUR_USERNAME/ppl-ui .
4) Test if image has been built by : docker image ls
5) docker run --name ppl-ui -p 4680:3000 -d YOUR_USERNAME/ppl-ui
6) Find out your Machine IP address by : docker-machine ip default
7) Open your Browser : http://192.168.xxx.xxx:4680

To Publish your image to dockerhub : 
1) docker logout
2) docker login
3) docker tag YOUR_USERNAME/ppl-ui YOUR_USERNAME/dockerhub:ppl-ui
4) docker push YOUR_USERNAME/dockerhub:ppl-ui
