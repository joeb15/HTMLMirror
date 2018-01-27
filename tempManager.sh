#!/bin/bash

if [ /opt/vc/bin/vcgencmd measure_temp > 50 ]; then
    echo "1" > /sys/class/gpio/gpio3/value
else
    echo "0" > /sys/class/gpio/gpio3/value
fi

sleep 10
