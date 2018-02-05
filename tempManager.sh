#!/bin/bash

while true; do
    echo "out" > /sys/class/gpio/gpio21/direction

    cpu=$(</sys/class/thermal/thermal_zone0/temp)
    temp=$((cpu/1000))
    echo Temperature is ${temp}
    if [ temp < 75 ]; then
        echo "1" > /sys/class/gpio/gpio21/value
    else
        echo "0" > /sys/class/gpio/gpio21/value
    fi

    sleep 10
done
#test update

