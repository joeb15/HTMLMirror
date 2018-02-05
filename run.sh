#!/bin/bash

PID=$(python -m SimpleHTTPServer 8000)

while true; do
    pull=`git pull`
    until [ ${pull} = "Already up-to-date." ]; do
        sleep 10
    done
    echo Updating
    kill PID
    PID=$(python -m SimpleHTTPServer 8000)
    echo New server running on process ${PID}
done
