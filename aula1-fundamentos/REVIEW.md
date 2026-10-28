# REVIEW — Aula 1

## O que eu pedi

### Tarefa mínima — `validaCpf` (prompt exato)

```text
Corrija src/validaCpf.js para rejeitar CPFs com todos os dígitos iguais (ex.: 111.111.111-11) e
strings com letras no meio. npm test tem que passar. Não edite os arquivos em tests/.
```

### Desafio 3 — `fetchUsuario` (prompt exato, colado integralmente)

````text
Corrija src/fetchUsuario.js para que os testes passem, preservando o comportamento esperado nos casos válidos.

O QUE FAZER

1. Leia src/fetchUsuario.js, tests/fetchUsuario.test.js e package.json antes de alterar o código.
2. Execute npm test para identificar as falhas iniciais.
3. Implemente estas regras:
   - O id deve ser um número inteiro seguro e maior que zero.
   - Rejeite valores como -1, 0, 1.5, '1', 'abc', null e undefined com um Error cuja mensagem seja "id inválido".
   - Valide o id antes de chamar fetchFn. Um id inválido não pode gerar requisição.
   - Depois do fetchFn, verifique resposta.ok antes de chamar resposta.json().
   - Se resposta.ok for false, lance um Error com a mensagem "Erro HTTP <status>", substituindo <status> pelo status recebido.
   - Quando nome for string, aplique trim(); quando estiver ausente, for null ou tiver outro tipo, retorne '' nesse campo.
   - Quando email for string, aplique toLowerCase(); quando estiver ausente, for null ou tiver outro tipo, retorne '' nesse campo.
   - Se o JSON retornado for null, trate-o como um objeto sem campos.
   - Preserve a estrutura do objeto retornado, a regra atual para o campo id e os demais comportamentos dos casos válidos.

RESTRIÇÕES

- Não edite, remova ou desative arquivos em tests/.
- Não altere a configuração dos testes nem os scripts para esconder falhas.
- Não adicione dependências.
- Preserve a assinatura da função, a forma de exportação, a URL usada para IDs válidos e a injeção de fetchFn.
- Limite as alterações a src/fetchUsuario.js e REVIEW.md.
- Faça uma correção pequena e legível, sem refatorações fora do escopo.
- Erros de rede e erros de resposta.json() devem continuar sendo propagados; não crie retentativas nem tratamentos adicionais.

COMO TESTAR

- Execute npm test antes da correção para registrar o resultado inicial.
- Após cada tentativa de correção, execute npm test novamente.
- Se houver falhas, analise a saída, ajuste a implementação e repita.
- Confira também, sem alterar tests/, que:
  1. IDs inválidos não chamam fetchFn.
  2. Uma resposta HTTP de erro não chama json().
  3. Campos ausentes, null ou de outros tipos resultam em ''.
  4. Nome e email válidos continuam recebendo as transformações esperadas.
- Termine com npm test passando integralmente.
- Não declare sucesso se não conseguir executar os testes.

REGISTRO EM REVIEW.md

- Cole integralmente este prompt.
- Resuma o problema e a correção.
- Registre o resultado inicial e o resultado final dos testes.
- Informe quantas voltas o loop deu e o resultado de cada uma.

Para a contagem, uma volta é uma tentativa de alteração no código seguida de uma execução de npm test. A execução inicial, antes de qualquer alteração, é o diagnóstico e não conta como volta.

Ao finalizar, informe os arquivos alterados, o resultado de npm test e o total de voltas.
````

### Desafio 2 — skill

Pedi "Faça isso aqui primeiro" e colei o enunciado do Desafio 2. Não indiquei o tema da skill: o agente
escolheu "mensagem de commit".

### Outros pedidos da sessão

- `/init`, para completar o `CLAUDE.md`.
- `/revisar-codigo src/validaCpf.js`.
- Consultar o context7 para as assinaturas de `describe`, `test` e `assert` do `node:test`.
- Atualizar o `CLAUDE.md` e retirar os TODOs.

## O que o agente fez

| Etapa | O que o agente fez | Resultado |
|---|---|---|
| `/init` | Completou Stack, Comandos, Estrutura e a regra de rodar testes no `CLAUDE.md`; deixou 2 TODOs pessoais | `npm test` inicial: 13 testes, 8 passam, 5 falham |
| `/revisar-codigo src/validaCpf.js` | Apontou 2 bugs, 3 riscos e o veredito REPROVAR | os 2 bugs batiam com os 2 testes vermelhos |
| context7 | `resolve-library-id` (1×) → `/websites/nodejs_latest-v22_x_api`; `query-docs` (3×: test/describe, assert, rejects) | assinaturas de `test`, `describe`, `equal`, `deepEqual`, `throws`, `rejects` |
| `validaCpf` | Regex de formato antes de extrair os dígitos + rejeição de 11 dígitos iguais (+5 −1) | 1 edição, 1 `npm test`: 7 de 7 no arquivo; suíte 10 de 13 |
| Skill `mensagem-commit` | Criou o `SKILL.md`, validou o frontmatter e invocou; um bug no passo 1 foi apontado numa revisão e o agente o corrigiu | exemplo abaixo |
| `fetchUsuario` | Validação do id, checagem de `resposta.ok`, defaults para `nome`/`email` (+10 −3) | **1 volta**, suíte 13 de 13 |
| `CLAUDE.md` final | Removeu TODOs e o comentário; escreveu as regras de estilo, commit e preferência; atualizou "Estrutura" | 42 linhas, 0 TODO |

### Skill `/mensagem-commit` — exemplo de invocação

Arquivo: `.claude/skills/mensagem-commit/SKILL.md`. A skill sugere a mensagem de commit no padrão
`tipo: resumo` (português, presente) a partir do diff não commitado ou de uma revisão git passada como
argumento. Só sugere: não faz `add` nem `commit`. `allowed-tools`: `Read`, `Bash(git status *)`,
`Bash(git diff *)`, `Bash(git show *)`. Segundo a doc de Skills, isso **pré-aprova** essas ferramentas e não
restringe as demais; o "não escreva nada no repositório" é uma instrução no corpo da skill, não um bloqueio.
O agente validou o frontmatter com `claude plugin validate .claude/skills` → `✔ Validation passed`.

Invocação sem argumento (o caminho principal), com trabalho não commitado de verdade (`SKILL.md` e
`REVIEW.md` ainda sem commit). O agente rodou `git status --short --untracked-files=all` e `git diff HEAD`,
leu os dois arquivos novos e respondeu (colado como saiu):

```
## Commit sugerido
feat: adiciona skill mensagem-commit

## Comando
git add .claude/skills/mensagem-commit/SKILL.md
git commit -m "feat: adiciona skill mensagem-commit"

## Commit sugerido
docs: REVIEW.md registra exemplo de uso da skill mensagem-commit

## Comando
git add REVIEW.md
git commit -m "docs: REVIEW.md registra exemplo de uso da skill mensagem-commit"
```

### `fetchUsuario` — problema, correção e testes

**Problema.** A função só tratava o caminho feliz: o `id` ia direto para a URL e o `fetchFn` era chamado
antes de qualquer checagem; `resposta.ok` nunca era consultado, então um 404 era lido como se fosse um
usuário; `dados.nome.trim()` e `dados.email.toLowerCase()` lançavam `TypeError` quando o campo não existia.

**Correção do agente** (`src/fetchUsuario.js`, +10 −3):

- `if (!Number.isSafeInteger(id) || id <= 0) throw new Error('id inválido')` antes do `fetchFn`.
- Antes do `resposta.json()`, `if (!resposta.ok)` lança um `Error` com a mensagem `Erro HTTP <status>`, em que o status vem de `resposta.status`.
- `(await resposta.json()) ?? {}` para tratar JSON `null` como objeto sem campos.
- `nome` e `email` só passam por `trim()` / `toLowerCase()` quando são string; senão viram `''`.
- `id: dados.id` ficou como estava. Assinatura, exportação, URL e injeção do `fetchFn` não mudaram. Não há
  `try/catch`, então erro de rede e erro de `json()` continuam se propagando.

| Execução | Resultado |
|---|---|
| Inicial (diagnóstico, não conta como volta) | 13 testes: 10 passam, 3 falham (`fetchUsuario`: 404, campos faltando, id inválido) |
| Volta 1 (edição de `src/fetchUsuario.js` + `npm test`) | 13 testes: 13 passam, 0 falham |
| **Final** | **13 de 13 passam** |

**Total de voltas: 1.** Nenhum ajuste foi necessário depois da primeira tentativa.

**Conferências extras do agente** (sem alterar `tests/`). Um script fora do projeto exercitou os quatro pontos
do meu prompt e a propagação de erros. Contra a versão corrigida, as 7 conferências passaram:

- **1.** ids inválidos (`-1`, `0`, `1.5`, `'1'`, `'abc'`, `null`, `undefined`, `NaN`, `Infinity`, `2**53`,
  `{}`, `[]`, `true`, `7n`) rejeitam com `id inválido` e não chamam `fetchFn`.
- **1b.** ids válidos chamam `fetchFn` com a mesma URL de antes.
- **2.** Status 301, 400, 404, 500 e 503 lançam `Erro HTTP <status>` e não chamam `json()`.
- **3.** `nome` e `email` ausentes, `null`, número, objeto, array ou booleano resultam em `''`.
- **3b.** JSON `null` resulta em `{ id: undefined, nome: '', email: '' }`.
- **4.** `nome` e `email` válidos mantêm `trim()` e `toLowerCase()`; `id` segue como veio.
- **5.** Erro de rede e erro de `json()` chegam como a mesma instância, com uma única tentativa.

### Tools usadas pelo agente

Read, Glob, Grep, Bash (`npm test`, `git`, `node`, `claude plugin validate`), Edit, Write, Skill,
ToolSearch, WebFetch (doc de Skills, 2 leituras), context7 (`resolve-library-id`, `query-docs`) e advisor.

## O que eu aceitei e por quê

Registro a minha decisão sobre cada entrega do agente. A decisão não depende de a entrega já ter sido
commitada.

- **Correção do `validaCpf`: aceitei.** Aceitei também o formato mais estrito que o agente implementou
  (máscara parcial e espaços nas pontas passam a ser rejeitados), embora eu não o tenha pedido. O que
  sustenta a decisão: os 7 testes do arquivo passam, `tests/` ficou intocado, o diff tem 6 linhas, e a regex
  de formato fecha a causa do bug das letras, já que o `replace(/\D/g, '')` apagava o lixo antes de validar.
  Referência: commit `a5f135d`.
- **Correção do `fetchUsuario`: aceitei.** O que sustenta a decisão: 13 de 13 testes numa volta, diff de
  +10 −3 só em `src/fetchUsuario.js`, cada linha nova corresponde a uma regra do meu prompt, e as
  conferências extras do agente falham contra a versão original.
- **Skill `mensagem-commit`: aceitei.** O que sustenta a decisão: frontmatter validado e exemplo de invocação
  sem argumento no formato que a skill define. O padrão de mensagem segue o do meu commit `a5f135d`.
- **`CLAUDE.md` final: aceitei.** Aceitei também as três linhas novas (estilo, commit e preferência de
  trabalho), que o agente escreveu a meu pedido a partir do código e da sessão. O que sustenta a decisão: 42
  linhas, 0 TODO, comandos e regras que mudam o comportamento do agente (rodar `npm test`, não editar
  `tests/`, não commitar sem pedir).

## O que eu rejeitei ou mudei e por quê

- **Escrevi a especificação em vez de deixar o agente decidir.** No Desafio 3, o prompt traz as regras: id
  inteiro seguro e maior que zero, mensagens exatas `id inválido` e `Erro HTTP <status>`, JSON `null` como
  objeto sem campos, nenhum `try/catch` extra. Os testes só cobrem `-1` e as regex `/id/i` e `/404/`; sem
  essas regras, o agente teria de decidir sozinho o que é "id inválido" e o formato do erro.
- **Pedi que o `CLAUDE.md` ficasse alinhado e sem TODO.** O agente já tinha avisado que a linha "Estrutura"
  ficou desatualizada depois das correções, e a atualizou nesse pedido.
- **Pedi que este `REVIEW.md` separasse as vozes** ("eu" para o que pedi e decidi, "o agente" para o que ele
  executou), sem avisos de rascunho e sem comentários sobre quem corrigiu cada frase (veja o item 4 da
  próxima seção).
- **Correções que o agente fez no próprio trabalho depois de revisões durante a sessão:** o passo 1 da skill
  (passou a usar `--untracked-files=all`) e a conferência 1b do script.
- **Não rejeitei nenhuma das quatro entregas** (`validaCpf`, `fetchUsuario`, skill e `CLAUDE.md`): todas foram
  aceitas, como registrado na seção anterior.

## Onde ele chutou / alucinou / fez mais do que pedi

Registro os erros do agente nesta sessão.

1. **Afirmou sem verificar.** Descreveu o `/revisar-codigo`
   como "só de leitura". Isso estava só no texto da skill ("não edite arquivos"); a doc de Skills mostrou que
   `allowed-tools` pré-aprova ferramentas e não restringe nenhuma.
2. **Fez mais do que pedi.** Pedi para rejeitar
   dígitos repetidos e letras. A regex também rejeita máscara parcial (`529.98224725`) e espaços nas pontas,
   que antes passavam. Nem o pedido nem os testes cobrem isso.
3. **Ignorou a própria especificação.** Na primeira execução da
   skill (argumento `HEAD`) juntou dois commits num único bloco e acrescentou texto fora do formato. A skill
   manda um par "Commit sugerido" + "Comando" por commit e nada além.
4. **Misturou a minha voz com as ações dele.** Pedi ao agente que organizasse por escrito o review que fiz,
   mas ele redigiu alguns trechos confundindo a minha perspectiva com as próprias ações. Solicitei a correção
   para que o documento representasse minha análise e atribuísse ao agente as implementações, consultas e
   execuções de testes realizadas por ele.
5. **Verificou mal e concluiu errado.** A conferência 1b usava
   um corpo sem `nome`; contra a versão original ela falhava por outro motivo, e o agente escreveu "falhou em
   5 das 7". O correto é 4 das 7.
6. **Entregou a skill com um bug no passo 1.** O agente só tinha testado com `HEAD`. Sem argumento (o
   caminho principal), `git status --short` mostra a pasta nova como `?? .claude/skills/mensagem-commit/`, e
   o Read falha em pasta. Além disso, o agente escolheu o tema e o padrão sozinho, a partir de um único commit.
7. **Contexto desatualizado.** Depois de corrigir o `SKILL.md`, a
   reinvocação ainda carregou o texto antigo do passo 1; o agente seguiu o passo corrigido do disco. Antes
   disso, a primeira tentativa tinha dado `Unknown skill`, porque a sessão ainda não tinha registrado a skill
   recém-criada.

**Por que no `fetchUsuario` ele acertou de primeira.** O meu prompt fechou todas as decisões (valor exato de
cada mensagem, o que conta como id inválido, o que fazer com `null`), os testes cobriam o caminho principal,
e as conferências extras do agente foram desenhadas para falhar na versão original. Isso sustenta o resultado
até onde essas conferências alcançam; elas não cobrem, por exemplo, um corpo de resposta que seja um número
ou uma string.

## O que eu colocaria no CLAUDE.md pra isso não acontecer de novo

Cada regra responde a um erro da seção anterior. As regras propostas nesta seção ainda não foram adicionadas ao `CLAUDE.md`:

1. **(item 1)** Não afirme o que uma configuração, flag ou ferramenta faz sem conferir na doc (context7 ou
   doc oficial). Se não verificou, diga "não verifiquei".
2. **(item 2)** Faça só o que foi pedido. Se a correção muda um comportamento que os testes não cobrem (por
   exemplo, um formato mais estrito), avise antes ou deixe de fora e pergunte.
3. **(itens 3, 6 e 7)** Ao criar uma skill, valide o frontmatter com `claude plugin validate`, teste o
   caminho sem argumento e com argumento, siga o formato de saída que ela define e confirme qual versão do
   texto foi carregada, porque a sessão pode reaproveitar a antiga.
4. **(item 4)** Em arquivos de entrega como o `REVIEW.md`, separe as vozes: "eu" para o que o usuário pediu e
   decidiu, "o agente" para o que ele executou. Não atribua ao usuário leituras, comandos ou verificações que
   o agente fez, e não invente opiniões ou decisões dele; se faltar informação, pergunte.
5. **(item 5)** Antes de afirmar que uma verificação prova algo, rode-a contra a versão original e confira se
   ela falha pelo motivo esperado.

## Contexto, não-determinismo e alucinação

Durante a sessão, percebi a importância do contexto ao usar o CLAUDE.md para definir regras que o agente
deveria seguir, como explicar as alterações antes de editar arquivos e executar o `npm test` antes de concluir
uma tarefa. Com essas instruções, ele passou a seguir esse comportamento. Outro exemplo foi quando o agente
corrigiu uma skill e, ao executá-la de novo, o texto que voltou ainda era o antigo, porque a versão anterior
já estava carregada no contexto; ele precisou seguir o passo corrigido que estava no arquivo. Houve também
uma alucinação: o agente afirmou que o `/revisar-codigo` era somente de leitura sem ter verificado, e só
corrigiu a resposta depois de consultar a documentação oficial. Quanto ao não-determinismo, percebi diferenças
entre duas execuções da skill, mas como as entradas não eram iguais, não foi possível afirmar que isso
ocorreu por aleatoriedade.
