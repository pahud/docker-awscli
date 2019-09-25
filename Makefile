build:
	docker build -t pahud/awscli .

build-with-bash:
	docker build -t pahud/awscli:with-bash . -f Dockerfile.bash --no-cache
