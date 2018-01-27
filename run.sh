#!/bin/bash

fileName = "showImage"

while true; do
    ssh server "test -e showImage"
    if [ $? -eq 0 ]; then
        scp server:cam.jpg cam.jpg
        echo "{on:true}">> ${fileName}
    else
        echo "{on:false}">> ${fileName}
    fi
done
