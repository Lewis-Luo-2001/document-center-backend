# Auth Service
Image service. Providing CRUD method of images.

## Usage

### docker
```
docker build -t image-service .
docker run --env PORT=8082 -p 8082:8082 --name image-service image-service
```