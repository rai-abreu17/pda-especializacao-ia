---
name: mensagem-commit
description: "Sugere a mensagem de commit no padrão deste projeto (`tipo: resumo`, em português, no presente) a partir do diff não commitado, ou de um commit existente se vier uma revisão. Use quando o usuário pedir mensagem de commit, perguntar 'o que eu coloco no commit?' ou invocar /mensagem-commit. Só sugere: nunca faz add nem commit."
argument-hint: "[revisão opcional, ex.: HEAD~1]"
allowed-tools:
  - Read
  - Bash(git status *)
  - Bash(git diff *)
  - Bash(git show *)
---

# Mensagem de commit

Você sugere a mensagem de commit. Quem commita é a pessoa: esta skill não escreve nada no repositório.

## Entrada

Argumento recebido: `$ARGUMENTS`

- Vazio: descreva as mudanças ainda não commitadas.
- Uma revisão git (ex.: `HEAD~1`, `a5f135d`): descreva a mudança daquele commit.

## Passos

1. Sem argumento: rode `git status --short --untracked-files=all` e `git diff HEAD`. Arquivos novos
   (`??`) não aparecem no diff: abra cada um com Read (a flag lista arquivos, não pastas).
   Com argumento: rode `git show --patch <revisão>`.
2. Se não houver mudança nenhuma, diga isso em uma linha e pare.
3. Escolha o tipo: `feat` (comportamento novo), `fix` (corrige comportamento errado), `docs`,
   `test`, `refactor` (muda a estrutura sem mudar o comportamento) ou `chore`.
4. Escreva o assunto (veja o padrão abaixo) descrevendo o comportamento que mudou, não os arquivos.
5. Se o diff mistura assuntos independentes (ex.: correção de código + atualização de docs),
   proponha um commit por assunto e diga quais arquivos entram em cada um.

## Padrão do assunto

- `<tipo>: <resumo>`, tudo em português, verbo no presente (`rejeita`, `adiciona`, `corrige`).
- Minúsculas, sem ponto final, no máximo 72 caracteres.
- Cite a função ou o módulo quando ajudar: `fix: validaCpf rejeita dígitos repetidos e letras`.
- Corpo só se o porquê não for óbvio pelo assunto: uma linha em branco e linhas de até 72 caracteres.

## Formato da saída

```
## Commit sugerido
<tipo>: <resumo>

<corpo, só se precisar>

## Comando
git add <arquivos>
git commit -m "<tipo>: <resumo>"
```

Se houver mais de um assunto, repita o bloco "Commit sugerido" + "Comando" para cada commit,
na ordem em que devem ser feitos.

## Regras

- Não rode `git add`, `git commit`, `git push` nem qualquer comando que altere o repositório.
- Descreva só o que está no diff. Não afirme que os testes passam: esta skill não os roda.
- Não escreva "(revisado)" nem diga que alguém revisou o código: isso é da pessoa que lê o diff.
- Não invente motivação. Se o diff não explica o porquê, fique no assunto e deixe o corpo de fora.
