# Local Kubernetes

1. Enable Kubernetes in Docker Desktop (or start Minikube).
2. Build `docker build -t cloudcampus:local --build-arg VITE_FIREBASE_API_KEY=... --build-arg VITE_FIREBASE_AUTH_DOMAIN=... --build-arg VITE_FIREBASE_PROJECT_ID=... --build-arg VITE_FIREBASE_APP_ID=... .` from the repository root. For Minikube, use `minikube image load cloudcampus:local`; Docker Desktop shares its local image store.
3. Set the four public Firebase values in `configmap.yaml` before applying it. These values are public client configuration; never put service-account keys here. Nginx creates the runtime config from the ConfigMap environment on container start.
4. Apply in dependency order: `kubectl apply -f k8s/namespace.yaml`, then `kubectl apply -f k8s/configmap.yaml -f k8s/deployment.yaml -f k8s/service.yaml`.
5. Inspect with `kubectl -n cloudcampus get pods,svc` and `kubectl -n cloudcampus logs deploy/cloudcampus`.
6. Access locally with `kubectl -n cloudcampus port-forward svc/cloudcampus 8080:8080`, then open `http://localhost:8080`.
7. Clean up with `kubectl delete namespace cloudcampus`.

This is a local demonstration only. There is no LoadBalancer or cloud cluster.
