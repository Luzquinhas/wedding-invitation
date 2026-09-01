# Mirelly & Lucas — Convite de casamento

Site estático do convite de casamento, pronto para publicar no GitHub Pages.

## Estrutura

```
wedding invite/
├── index.html      # Página do convite (PT/EN)
├── css/style.css   # Estilos
├── js/main.js      # Idioma, contagem regressiva e RSVP
└── assets/
    ├── ceremony-sketch.png   # Ilustração da cerimônia (hero)
    └── venue.webp            # Foto do local (Chácara Florestal)
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie estes arquivos para a branch `main`:

   ```bash
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
   git push -u origin main
   ```

2. No repositório, vá em **Settings → Pages**.
3. Em **Source**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.
4. O site ficará disponível em `https://SEU-USUARIO.github.io/SEU-REPO/`.

## Observações

- O formulário de RSVP mostra apenas a confirmação na tela — ele **não envia os dados para nenhum servidor** (mesmo comportamento do projeto original). Para receber as respostas, conecte-o a um serviço como Formspree ou Google Forms.
- A lista de presentes aponta para `https://noivos.casar.com/lucas-e-mirelly` e o mapa para o Google Maps — edite os links em `index.html` se precisar.
