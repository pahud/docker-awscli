build:
	docker build -t pahud/awscli:v2 .

build-with-bash:
	docker build -t pahud/awscli:v2-with-bash . -f Dockerfile.bash --no-cache
