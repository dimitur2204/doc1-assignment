#!/bin/bash

# Start minikube if it's not running
if ! minikube status | grep -q "Running"; then
    echo "Starting minikube..."
    minikube start --memory=4096 --cpus=2
fi

# Point shell to minikube's docker-daemon
eval $(minikube docker-env)

# Build backend image
echo "Building backend image..."
docker build -t hello-world-backend:latest ./backend

# Build frontend image
echo "Building frontend image..."
docker build -t hello-world-frontend:latest ./frontend

# Reset docker environment
eval $(minikube docker-env -u)

echo "Images built and loaded into minikube successfully!" 