// Gerado por IA. Colado sem ler. (ATIVIDADE — desafio 3)
//
// Busca um usuário por id numa API e devolve { id, nome, email }.
// A função recebe um `fetchFn` pra facilitar teste (injeção de dependência).

export async function fetchUsuario(id, fetchFn = fetch) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('id inválido');
  }

  const resposta = await fetchFn(`https://api.exemplo.com/usuarios/${id}`);
  if (!resposta.ok) {
    throw new Error(`Erro HTTP ${resposta.status}`);
  }
  const dados = (await resposta.json()) ?? {};

  return {
    id: dados.id,
    nome: typeof dados.nome === 'string' ? dados.nome.trim() : '',
    email: typeof dados.email === 'string' ? dados.email.toLowerCase() : '',
  };
}
