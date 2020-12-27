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
docker container run -v ${PWD}/html:/usr/share/nginx/html --publish 80:80 --detach --name web-console-dev --rm web-console:latest > /dev/null;
[ $? == 0 ] || exit 2;
echo "* Done";
firefox "http://localhost/";
exit $?;