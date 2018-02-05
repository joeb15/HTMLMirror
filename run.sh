#!/bin/bash

UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
BASE=$(git merge-base @ "$UPSTREAM")

PID=$(python -m SimpleHTTPServer 8000&)
trap 'kill $PID; exit 1' 2

while true; do
    pull=`git pull`
    echo $pull
    until [ $LOCAL = $BASE ]; do
        sleep 10
    done
    echo Updating
    kill $PID
    PID=$(python -m SimpleHTTPServer 8000&)
    echo $PID
done
