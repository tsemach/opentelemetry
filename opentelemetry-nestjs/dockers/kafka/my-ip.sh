#!/bin/bash

KAFKA_INTERFACE=enp2s0

INTERFACE=${KAFKA_INTERFACE:-enp2s0}
echo $INTERFACE

export MY_IP=$(ifconfig | grep -C 2 $INTERFACE  | grep 10.100 | awk '{print $2}')
echo "found MY_IP=$MY_IP"

