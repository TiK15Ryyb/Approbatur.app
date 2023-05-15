FROM library/debian:bullseye
ENV DOCKER_VERSION=18.03.1-ce
ENV WEBHOOK_VERSION=2.8.0
ENV WEBHOOK_ARCH=linux-amd64

RUN useradd -ms /bin/bash webhook

RUN apt-get update \
    && apt-get install -y ca-certificates python3 python3-distutils python3-pip curl git \
    && pip install docker-compose \
    && apt-get remove python3-pip -y \
    && apt-get autoremove -y \
    && apt-get purge

# Install docker cli
RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz \
  && tar xzvf docker-${DOCKER_VERSION}.tgz --strip 1 \
                 -C /usr/local/bin docker/docker \
  && rm docker-${DOCKER_VERSION}.tgz

# Install webhook
RUN curl -fsSLO https://github.com/adnanh/webhook/releases/download/${WEBHOOK_VERSION}/webhook-${WEBHOOK_ARCH}.tar.gz \
    && tar xvf webhook-${WEBHOOK_ARCH}.tar.gz --strip 1 \
        -C /usr/local/bin webhook-${WEBHOOK_ARCH}/webhook \
    && rm webhook-${WEBHOOK_ARCH}.tar.gz

USER webhook

ENTRYPOINT /docker-entrypoint.sh
