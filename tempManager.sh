#!/bin/bash

while true; do
    echo "21" > /sys/class/gpio/export
    echo "out" > /sys/class/gpio/gpio21/direction

    if [ /opt/vc/bin/vcgencmd measure_temp > 50 ]; then
        echo "1" > /sys/class/gpio/gpio21/value
    else
        echo "0" > /sys/class/gpio/gpio21/value
    fi

    sleep 10
done

