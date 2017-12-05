# Make sure the Apt package lists are up to date, so we're downloading versions that exist.
execute 'add GPG key for docker' do
  command 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -'
end
execute 'setup stable docker repo' do
  command 'sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"'
end
execute 'apt_update' do
  command 'apt-get update'
end

# Base configuration recipe in Chef.
package "wget"
package "ntp"
cookbook_file "ntp.conf" do
  path "/etc/ntp.conf"
end
execute 'ntp_restart' do
  command 'service ntp restart'
end

# Get docker
package "docker-ce"
execute 'docker-test' do
  command 'docker -v'
end

# Get docker-compose
execute 'install-docker-compose' do
  command 'sudo curl -L https://github.com/docker/compose/releases/download/1.17.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose'
end
execute 'docker-compose-test' do
  command 'docker-compose -v'
end

# Docker create network
execute 'run' do
  command 'sudo docker network create --driver bridge reverse-proxy'
end

# Docker-compose up
execute 'run' do
  command 'sudo docker-compose -f docker-compose.prod.yml pull && sudo docker-compose -f docker-compose.prod.yml up -d'
  cwd '/home/ubuntu/project'
end
