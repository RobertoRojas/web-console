#!/usr/bin/env bash
echo "Deleting old container: ";
container_id=$(docker container ls --quiet --all --filter "name=web-console-dev");
if [ ! -z "$container_id" ]; 
then
    docker container rm -f $container_id > /dev/null;
    [ $? == 0 ] || exit 1;
    echo "* Done";
else 
    echo "* Nothing to be done";
fi
echo "Running the docker container: ";
html_path="${PWD}/html";
if [ ! -d $html_path ];
then
    echo "Cannot find the html path[$html_path]" 1>&2;
    exit 2;
fi
docker container run --volume ${PWD}/html:/var/www/html --publish 80:80 --detach --name web-console-dev --rm php:7.3-apache > /dev/null;
[ $? == 0 ] || exit 2;
echo "* Done";
echo "Waiting for 5 seconds:"
sleep 5s;
echo "* Done";
firefox "http://localhost/" &
exit $?;