## How to use

* [How to build](#build)
* [How to run](#run)

<a name="build"></a>

### Build

To can build the development environment you need run the follow command:

> docker build --file Dockerfile -t web-console:<version> .

<a name="run"></a>

### Run

To run the docker container you need execute the follow command: 

#### **Note:** You need run it on HTML folder. 

> docker container run -v ${PWD}:/usr/share/nginx/html --publish 80:80 --detach --name web-console-dev web-console:1.0.0
