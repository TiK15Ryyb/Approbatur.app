#!/bin/bash
cd
git clone https://github.com/TiK15Ryyb/Approbatur.app.git
cd Approbatur.app
git checkout develop
ls -la /etc/hooks.json
webhook -hooks /etc/hooks.json
