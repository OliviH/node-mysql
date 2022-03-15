#!/bin/bash

set -e

mkdir DATAS || echo "Folder DATAS exists\nIf you want to delete folders for project, use: make clear"

FILE=.env
if test -f "$FILE"; then
    echo "$FILE exists."
else
    cp .env-example .env
fi

docker-compose up --build -d && docker-compose logs -f
