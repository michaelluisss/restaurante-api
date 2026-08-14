<div align="center">

# 🍽️ Restaurante Front

**Interface web para sistema de gestão de restaurante**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> 🚧 Em desenvolvimento

</div>

---

## 📋 Sobre o Projeto

Frontend do sistema de gestão para restaurante. Interface para garçons gerenciarem mesas, cardápio e pedidos com autenticação por cargo.

---

## 🖥️ Telas

| Tela | Descrição |
|------|-----------|
| Login | Autenticação por ID e senha |
| Mesas | Visualização do status das mesas |
| Cardápio | Listagem de itens por categoria |
| Pedidos | Gerenciamento dos itens do pedido |
| Pagamentos | Seleção da forma de pagamento |

---

## 🚀 Tecnologias

- **React** — biblioteca de interface
- **Vite** — build tool
- **React Router DOM** — navegação entre telas
- **Axios** — requisições HTTP

---

## 📁 Estrutura do Projeto

```
src/
├── pages/           # Telas da aplicação
│   ├── App.jsx      # Login
│   ├── mesas.jsx    # Seleção de mesas
│   ├── cardapio.jsx # Cardápio
│   └── pedidos.jsx  # Pedidos
├── App.css
└── main.jsx         # Rotas
```

---

## ⚙️ Como Rodar Localmente

**Pré-requisito:** [restaurante-api](https://github.com/michaelluisss/restaurante-api) rodando localmente

```bash
# Clone o repositório
git clone https://github.com/michaelluisss/restaurante-front.git
cd restaurante-front

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em: `http://localhost:5173`

---

## 🔗 Repositório da API

[michaelluisss/restaurante-api](https://github.com/michaelluisss/restaurante-api)

---

## 👨‍💻 Autor

Feito por [Michael Luis](https://github.com/michaelluisss)
