## How to use

* [How to build](#build)
* [How to run](#run)

<a name="build"></a>

### Build

To can build the development environment you need run the follow command:

> docker build --file Dockerfile --tag web-console:latest .

<a name="run"></a>

### Run

To run the docker container you need execute the follow command: 

#### **Note:** You need run it on HTML folder. 

##### Linux:

> docker container run --volume ${PWD}/html:/usr/share/nginx/html --publish 80:80 --detach --name web-console-dev --rm web-console:latest

##### Windows:

> docker container run --volume %CD%:/usr/share/nginx/html --publish 80:80 --detach --name web-console-dev --rm web-console:latest