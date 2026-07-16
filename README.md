# Aurora Mind — Site Institucional

Site institucional e de conversão para a agência digital **Aurora Mind**, desenvolvido com HTML5, CSS3 e JavaScript Vanilla.

## Estrutura do Projeto

```
aurora-mind/
├── index.html               # Página principal
├── css/
│   ├── styles.css           # Estilos gerais, layout e responsividade
│   └── animations.css       # Animações (fade-in, aurora glow, hover)
├── js/
│   └── script.js            # Menu mobile, FAQ, scroll trigger, partículas
├── assets/
│   ├── images/              # Imagens do portfólio
│   └── icons/               # Ícones SVG (favicon)
└── README.md
```

## Tecnologias

- **HTML5** semântico (`header`, `main`, `section`, `footer`)
- **CSS3** com Grid, Flexbox, custom properties e media queries
- **JavaScript Vanilla** (ES5+ compatível, sem dependências)
- **Google Fonts** — Inter

## Seções

1. Header/Navbar com menu hamburger animado
2. Hero com dashboard flutuante e efeito aurora
3. Painel de estatísticas com contador animado
4. Portfólio com hover zoom
5. Tabela de preços (3 planos) com CTA para WhatsApp
6. Depoimentos / prova social
7. FAQ com accordion interativo
8. Footer com redes sociais e botão flutuante WhatsApp

## Como Usar

1. Abra `index.html` diretamente no navegador, ou
2. Sirva com um servidor local:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Acesse `http://localhost:8080`

## WhatsApp

Todos os botões de compra redirecionam para:

```
https://wa.me/5532999577201
```

Com mensagem pré-preenchida incluindo o nome do plano selecionado.

## Responsividade

- Mobile-first (320px+)
- Tablet (768px, 1024px)
- Desktop e 4K (1920px+)
- Suporte a `prefers-reduced-motion`

## Personalização

| Variável CSS | Descrição |
|---|---|
| `--purple` | Roxo neon (#8b5cf6) |
| `--cyan` | Azul ciano (#06b6d4) |
| `--bg-deep` | Fundo principal (#0a0a0c) |
| `--container` | Largura máxima (1200px) |

Edite os preços, textos e links diretamente em `index.html`.

## Licença

© 2026 Aurora Mind. Todos os direitos reservados.
