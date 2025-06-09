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

2. Apply the Kubernetes manifests:
```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

3. Check the deployment status:
```bash
kubectl get deployments
kubectl get services
```

4. Get the external IP for the frontend service:
```bash
kubectl get service frontend-service
```

The application will be available at:
- Frontend: http://<EXTERNAL-IP>
- Backend: http://backend-service:3000 (internal cluster access)

## CI/CD

The project includes GitHub Actions workflows for:
- Continuous Integration (CI): Runs tests and linting
- Continuous Deployment (CD): Builds Docker images and deploys to Kubernetes

### Required Secrets

For the CD workflow to work, you need to set up the following secrets in your GitHub repository:
- `DOCKER_REGISTRY`: Your Docker registry URL (e.g., docker.io/username)
- `KUBE_CONFIG`: Your Kubernetes cluster configuration file content 