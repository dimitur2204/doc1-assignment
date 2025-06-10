# Full Stack Hello World

This is a full-stack application with a Node.js/Express backend and Vite/React frontend, containerized with Docker and automated with GitHub Actions.

## Project Structure

```
.
├── backend/           # Express.js backend
├── frontend/         # Vite React frontend
├── k8s/              # Kubernetes manifests
├── .github/          # GitHub Actions workflows
└── docker-compose.yml # Docker compose configuration
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Kubernetes cluster (for production deployment)

### Running with Docker

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Local Development

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Kubernetes Deployment

1. Make sure you have access to a Kubernetes cluster and kubectl configured.

2. For Apple Silicon (M1/M2) Macs:
```bash
# Start minikube with the correct driver
minikube start --driver=docker

# Enable the registry addon
minikube addons enable registry

# Point your shell to minikube's docker-daemon
eval $(minikube docker-env)

# Pull the multi-arch images
docker pull ghcr.io/dimitur2204/doc1-assignment/backend:latest
docker pull ghcr.io/dimitur2204/doc1-assignment/frontend:main
```

3. Apply the Kubernetes manifests:
```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

4. Check the deployment status:
```bash
kubectl get deployments
kubectl get services
```

5. Get the external IP for the frontend service:
```bash
kubectl get service frontend-service
```

The application will be available at:
- Frontend: http://<EXTERNAL-IP>
- Backend: http://backend-service:3000 (internal cluster access)

## CI/CD

The project includes GitHub Actions workflows for:

### Continuous Integration (CI)
- Backend Build: Builds the backend application
- Backend Test: Runs backend tests
- Frontend Build: Builds the frontend application
- Frontend Test: Runs frontend tests

### Continuous Deployment (CD)
- Builds and pushes multi-architecture Docker images to GitHub Container Registry (GHCR)
- Supports both AMD64 and ARM64 architectures
- Uses semantic versioning for image tags
- Implements Docker layer caching for faster builds

### Container Images

The application's container images are available on GitHub Container Registry:
- Backend: `ghcr.io/dimitur2204/doc1-assignment/backend`
- Frontend: `ghcr.io/dimitur2204/doc1-assignment/frontend`

To use these images:
1. Make sure you're logged in to GHCR:
```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
```

2. Pull the images:
```bash
docker pull ghcr.io/dimitur2204/doc1-assignment/backend:latest
docker pull ghcr.io/dimitur2204/doc1-assignment/frontend:main
```

Note: The images are built for both AMD64 and ARM64 architectures, making them compatible with both Intel/AMD and Apple Silicon processors.

### Required Secrets

For the CD workflow to work, you need to set up the following secrets in your GitHub repository:
- `DOCKER_REGISTRY`: Your Docker registry URL (e.g., docker.io/username)
- `DOCKER_USERNAME`: Your Docker registry username
- `DOCKER_PASSWORD`: Your Docker registry password 