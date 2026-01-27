# Instalação e Primeiros Passos com Docker

## Passo 1 – Instalar o Docker

### Windows
Acesse o link abaixo e siga as instruções do instalador:  
https://www.docker.com/get-started/

### Linux

Instale o `curl`:
```bash
sudo apt-get install curl
```

Baixe e execute o script oficial de instalação do Docker:
```bash
curl -fsSL https://get.docker.com | sudo bash
```

Para executar o Docker sem utilizar `sudo`, crie o grupo `docker` e adicione o usuário atual a ele:
```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Atualize as mudanças realizadas no grupo:
```bash
newgrp docker
```

---

## Passo 2 – Verificar Docker

Verifique se o Docker foi instalado corretamente:
```bash
docker --version
```

---

## Passo 3 – Primeiro Container

Execute o container de teste:
```bash
docker run hello-world
```
