#!/bin/bash
DOCKER_GID=$(getent group docker | cut -d: -f3)
if [ -z $EXPOSE_PORT ]; then
    EXPOSE_PORT=9050
fi
docker run \
    --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v $PWD/autodeploy/docker-entrypoint.sh:/docker-entrypoint.sh \
    -v $PWD/autodeploy/hooks.json:/etc/hooks.json \
    -v $PWD/autodeploy/redeploy.sh:/redeploy.sh \
    -v $PWD/.env:/etc/approbatur-env \
    -p $EXPOSE_PORT:9000 \
    -uwebhook:${DOCKER_GID} \
    --name=approbatur-webhook \
    -d docker.alatvala.fi/docker-webhook:latest
