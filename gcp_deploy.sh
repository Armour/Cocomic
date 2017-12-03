# Setting the default logging driver to use the Google Cloud logging driver
echo '{"log-driver":"gcplogs"}' | sudo tee /etc/docker/daemon.json
sudo systemctl restart docker

# install docker-compose
docker pull docker/compose:1.17.1
echo alias docker-compose="'"'docker run \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:/rootfs/$PWD" \
    -w="/rootfs/$PWD" \
    docker/compose:1.17.1'"'" >> ~/.bashrc
source ~/.bashrc

# run nginx-proxy
cd
mkdir certs
docker network create --driver bridge reverse-proxy
docker run -d -p 80:80 -p 443:443 \
    --name nginx-proxy \
    --net reverse-proxy \
    --restart always \
    -v $HOME/certs:/etc/nginx/certs:ro \
    -v /etc/nginx/vhost.d \
    -v /usr/share/nginx/html \
    -v /var/run/docker.sock:/tmp/docker.sock:ro \
    --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy=true \
    jwilder/nginx-proxy

# run letsencrypt-nginx-proxy-companion to enable https support
docker run -d \
    --name nginx-letsencrypt \
    --net reverse-proxy \
    --volumes-from nginx-proxy \
    --restart always \
    -v $HOME/certs:/etc/nginx/certs:rw \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    jrcs/letsencrypt-nginx-proxy-companion

# run docker-compose
docker-compose -f docker-compose.prod.yml up
