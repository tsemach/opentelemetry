#!/bin/bash

namespace=$1
portLocal=$2
DEFAULT_CLOUD_PORT=3000
portDefault=${3:-$DEFAULT_CLOUD_PORT}
podDesireName=$4

echo "namespace:$namespace portLocal:$portLocal portDefault:$portDefault podDesireName:$podDesireName"

# kubectl port-forward pgtunnel 5432:5432 --namespace=default
if [ -z "$podDesireName" ]; then
    echo "podDesireName is not defined, going to define by namespace $namespace "
    podDesireName=$namespace
fi

podName=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" --namespace=$namespace | grep -v cronjob | grep $podDesireName | head -1)
if [ -z "$podName" ]; then
    echo "podName $podDesireName could not be found. Exiting."
    exit 1
fi  
echo "connecting to pod: $podName"

echo "running kubectl port-forward $podName $portLocal:$portDefault  --namespace=$namespace > /dev/null 2>&1 &"
kubectl port-forward $podName $portLocal:$portDefault  --namespace=$namespace > /dev/null 2>&1 &

while ! nc -z localhost $portLocal; do
  echo "Waiting for port $portLocal forwarding to be established..."
  sleep 1
done

echo "done"