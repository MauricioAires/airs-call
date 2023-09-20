# ![cover](./.github/assets/cover.png)


### 🎉 Sobre o projeto

O projeto Ignite Call é uma solução de agendamento de compromissos que se integra perfeitamente ao Google Agenda. Com este aplicativo, os usuários podem se cadastrar usando suas contas do Google e indicar seus horários e dias disponíveis para agendar compromissos. Todos os compromissos agendados na aplicação são automaticamente sincronizados com o Google Agenda, permitindo que os usuários visualizem e gerenciem seus compromissos diretamente na plataforma do Google.

O Ignite Call foi desenvolvido utilizando o framework Next.js, que oferece recursos poderosos para a criação e integração de front-end e back-end a partir de um único repositório de código. Para a comunicação com o banco de dados, utilizou-se a ferramenta Prisma.io, e um banco de dados MySQL foi configurado em um container Docker. O banco de dados de produção foi hospedado no serviço PlanetScale, e a aplicação em si foi implantada na plataforma Vercel para garantir uma hospedagem confiável.

Com o Ignite Call, agendar compromissos nunca foi tão fácil e integrado. Experimente hoje mesmo e simplifique sua rotina de agendamentos!

---

### 🛠️ Tecnologias

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Prisma](https://www.prisma.io/)
- [Google APIs](https://developers.google.com/apis)
- [Google Cloud Platform](https://cloud.google.com/)
- [Docker](https://www.docker.com/)
- [Axios](https://axios-http.com/)
- [Next SEO](https://github.com/garmeeh/next-seo)
- [Nookies](https://github.com/maticzav/nookies)
- [React Hook Form](https://react-hook-form.com/)
- [Design System](https://www.designsystem.com/)
- [Stitches (CSS-in-JS)](https://stitches.dev/)
- [Phosphor icons](https://phosphoricons.com/)
- [ESLint](https://eslint.org/)
- [date-fns](https://date-fns.org/)
- [Zod](https://github.com/colinhacks/zod)
- [Planetscale](https://planetscale.com/)
  - Debloy do banco de dados MySQL


### 🔧 Instalação

1. Clone este repositório em sua máquina local:

```bash
$ git clone https://github.com/MauricioAires/airs-call
```

2. Na pasta raiz do projeto, instale as dependências:

```bash
  $ npm install
```

### ⚙️ Utilização

Para rodar a aplicação em modo de desenvolvimento, utilize o seguinte comando:

```bash
  $ npm run dev
```

Comando utilizado para rodar o Docker

```bash
  $ docker run --name mysql -e MYSQL_ROOT_PASSWORD=docker -p 3306:3306 mysql:latest
```

Comando utilizado para iniciar o container

```bash
  $ docker start mysql
```


Comando utilizado para parar o container

```bash
  $ docker stop mysql
```
Sincronizar o schema do Prisma executando todas as migrations

```bash
  $  npx prisma db push
```

### 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir, basta abrir uma issue ou pull request neste repositório.

### 📝 Licença

Este projeto está sob a licença MIT.
Veja [LICENSE](LICENSE) para mais informações.

---

### 👨‍💻 Autor

Feito com 💙 by Mauricio Aires
