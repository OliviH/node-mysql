#!/bin/bash

set -e

./scripts/stop.sh

sudo rm -Rf ./DATAS || rm -Rf ./DATAS || echo "error to delete DATAS folder"
sudo rm -RF ./engine/node_modules || rm -Rf ./engine/node_modules || echo "error to delete node_modules folder"
