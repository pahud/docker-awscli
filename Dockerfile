FROM amazonlinux:2 as installer
COPY awscli-exe-linux-x86_64.zip .
RUN yum update -y \
  && yum install -y unzip \
  && unzip awscli-exe-linux-x86_64.zip \
  # The --bin-dir is specified so that we can copy the
  # entire bin directory from the installer stage into
  # into /usr/local/bin of the final stage without
  # accidentally copying over any other executables that
  # may be present in /usr/local/bin of the installer stage.
  && ./aws/install --bin-dir /aws-cli-bin/


FROM alpine:latest

# RUN \
# 	mkdir -p /aws && \
# 	apk -Uuv add groff less python3 && \
# 	pip3 install awscli && \
# 	rm /var/cache/apk/*

COPY --from=installer /usr/local/aws-cli/ /usr/local/aws-cli/
COPY --from=installer /aws-cli-bin/ /usr/local/bin/
WORKDIR /aws
ENTRYPOINT ["/usr/local/bin/aws"]


