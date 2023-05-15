#!/bin/bash
docker-compose pull
docker-compose --env-file=/etc/approbatur-env up -d
exit $?
