#!/bin/bash

PID=$(python -m SimpleHTTPServer 8000)

while true; do
    echo Updating
    git diff
    while $?; do
        git diff
        sleep 10
    done
    kill PID
    PID=$(python -m SimpleHTTPServer 8000)
done
