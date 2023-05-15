# Autodeployment webhook

TODO: Documentation

This webhook is supposed to run on the docker host where `Approbatur` is hosted.

Ensure to set secret in hooks.json, .env file in Approbatur repo root, and run

```sh
Approbatur.app $ ./autodeploy/docker-webhook.sh
```
