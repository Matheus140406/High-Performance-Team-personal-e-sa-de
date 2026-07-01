# High-Performance Team — Site (v3)

Landing page para o time de Personal Trainer, Nutrição e Saúde (Fernando Albert, Fernanda e Geovanna Sousa).

## Stack

- **HTML5** puro (sem framework/build step)
- **CSS3** — tema **claro/escuro** via `data-theme`, tokens de cor, animações suaves (`cubic-bezier`), efeitos premium e dinâmicos nos cards de planos
- **JavaScript vanilla**, ofuscado para produção (`javascript-obfuscator`: hex identifiers, control-flow flattening, string array em base64)
- Fontes: Bebas Neue (display) + Inter (corpo), via Google Fonts
- Sem dependências de build — funciona direto como site estático

## Novidades desta versão (v3)

- **Instagram removido do card da Equipe** (mantido na seção Planos e no rodapé).
- **FAQ totalmente reescrito** com 6 novas perguntas, agora com **acordeão fluido custom** (JS, animação de altura suave) — sem depender do `<details>` nativo.
- **Planos com cor dinâmica**: o Plano VIP volta a ficar **dourado**, mas só ao passar o mouse ou clicar/tocar (padrão é grafite/prata). O Plano Base ganha acento azul no hover, e o Premium intensifica o vermelho.
- **Animação no formulário de contato**: ao selecionar a área de interesse, aparece um ícone animado no topo do formulário — 💪💪 para o Fernando, 🩺❤️ para a Geovanna, 🥗🍎 para a Fernanda.
- **Depoimentos corrigidos**: removida a pausa no hover que travava a rolagem. O carrossel anda continuamente via JS (sem travar) e ganhou setas de navegação pra voltar/avançar manualmente.

## Recursos já existentes (v2)

- Tema claro/escuro persistente, com botão no header.
- Menu lateral (drawer) responsivo em tablet e celular.
- Bolha flutuante do WhatsApp com mensagem de interesse pré-preenchida.
- Copy sem referências a "Brasília/DF", tom mais suave e premium.
- Responsividade para iOS/Android/desktop com `env(safe-area-inset-*)`.

## Estrutura

```
index.html
404.html               ← página de erro personalizada (segue o tema ativo)
vercel.json            ← headers de segurança (CSP, HSTS, cache)
.nojekyll                ← evita processamento Jekyll no GitHub Pages
assets/
  css/style.css
  js/script.js          ← ofuscado
imagens/
  logo-icon.png
  gymman.jpg, geovanasousamacedo.jpeg, Fernanda-Nutri.png, fernando-albert.jpeg
  Beneficios-de-fazer-treino.jpg, gymwoman.jpg, nutricao.jpg, fisioterapia.jpg
  nutricao-2.jpg, fisitorepia-2.jpg   ← reservas, não usadas no layout ainda
```

## Contatos WhatsApp (configurados em `assets/js/script.js`, no objeto `WHATSAPP_NUMBERS`)

| Profissional | Número |
|---|---|
| Fernando Albert (Performance / planos / bolha flutuante) | 5561986351036 |
| Fernanda (Nutrição) | 5561991887614 |
| Geovanna Sousa (Saúde) | 5561991463375 |

Para trocar qualquer número, edite o objeto `WHATSAPP_NUMBERS` no código-fonte — como o `script.js` de produção está ofuscado, edite antes uma cópia legível e gere uma nova versão ofuscada (ou peça pra eu gerar de novo).

## Instagram

`https://www.instagram.com/albertperfomance` — linkado no card do Fernando na Equipe, na seção de Planos e no rodapé.

## Deploy

### Vercel
1. Suba a pasta inteira (ou conecte o repositório do GitHub).
2. O `vercel.json` já aplica os headers de segurança automaticamente.
3. Nenhuma configuração de build é necessária — é um site estático.

### GitHub Pages
1. Suba os arquivos na branch/pasta configurada (`main` ou `/docs`).
2. O `.nojekyll` já está incluído para evitar que o Jekyll ignore pastas começando com `_` ou similar.
3. Configure a origem do Pages nas configurações do repositório.

## Pendências

- Adicionar as fotos restantes (`nutricao-2.jpg`, `fisitorepia-2.jpg`) em algum ponto do layout, se desejar.
- Revisar a política de privacidade referenciada no banner de cookies (o link `#` ainda é um placeholder).
