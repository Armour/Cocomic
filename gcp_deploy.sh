sudo apt update && sudo apt upgrade -y

# Install node and npm
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt update && sudo apt install -y nodejs

# Install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install -y yarn

# Install docker & docker-compose
sudo apt-get remove docker docker-engine docker.io
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce
docker version

sudo curl -L https://github.com/docker/compose/releases/download/1.17.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

# Give docker sudo permission
sudo usermod -aG docker ${USER}
exit

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
    -v $HOME/Cocomic/backend/nginx/proxy.conf:/etc/nginx/conf.d/my_proxy.conf:ro \
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
cd Cocomic
docker-compose -f docker-compose.prod.yml up --build
