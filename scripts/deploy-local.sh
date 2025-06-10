#!/bin/bash

# Apply Kubernetes manifests
echo "Deploying backend..."
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml

echo "Deploying frontend..."
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl rollout status deployment/backend
kubectl rollout status deployment/frontend

# Get the frontend service URL
echo "Getting service URLs..."
minikube service frontend-service --url
echo "Backend service is available at: backend-service:3000"

echo "Deployment completed!" 