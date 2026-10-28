# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

Campo de treino da Aula 1 (Fundamentos) da Especialização em IA da PDA.
Projeto Node pequeno com funções utilitárias em `src/` e testes em `tests/`.

## Stack

- Node >= 18 (`engines` no `package.json`; testado com v22). Sem dependências.
- ESM (`"type": "module"`): `import`/`export`, e o caminho relativo leva a extensão (`../src/validaCpf.js`).
- Testes com o runner nativo `node:test` + `node:assert/strict`. Sem Jest/Vitest.

## Comandos

- Rodar os testes: `npm test` (= `node --test`)
- Watch: `npm run test:watch`
- Um arquivo só: `node --test tests/validaCpf.test.js`
- Um teste por nome: `node --test --test-name-pattern="CPF válido" tests/validaCpf.test.js`

## Estrutura

- Cada `src/<nome>.js` tem o seu `tests/<nome>.test.js`. Os testes são a especificação.
- `src/validaCpf.js` e `src/fetchUsuario.js` nasceram com bugs de propósito (código "gerado por IA, colado sem ler") e já foram corrigidos. Hoje todo teste deve passar: falha agora é regressão, não tarefa.
- `fetchUsuario(id, fetchFn = fetch)` recebe o `fetch` por parâmetro; os testes injetam um fake e nunca chamam a rede.
- `exemplos/` é material de aula, com bugs intencionais, e não roda no `npm test`. Não "conserte".

## Regras

- Os arquivos em `tests/` são a especificação. **Nunca edite testes** pra fazê-los passar.
- Antes de dizer que terminou, rode `npm test` e mostre o resultado. Se algum teste falhar, diga qual e por quê; não declare pronto.
- Em código novo ou alterado: `const` por padrão (`let` só quando reatribui), `===` em vez de `==`, `parseInt(x, 10)` com radix, e comentários e mensagens de erro em português (ex.: `'id inválido'`).
- Commits: `tipo: resumo`, em português e no presente (ex.: `fix: validaCpf rejeita dígitos repetidos e letras`). A skill `/mensagem-commit` sugere a mensagem.

## Como eu quero trabalhar com você

- Antes de editar, explique em 1–2 frases o que vai mudar e por quê.
- Mudanças pequenas e focadas. Uma tarefa por vez.
- Se não tiver certeza sobre uma API ou lib, consulte a documentação (MCP context7) em vez de chutar.
- Ao terminar, liste os arquivos alterados e o resultado do `npm test`. Não commite nem faça push sem eu pedir.
