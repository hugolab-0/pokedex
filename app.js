// Função que busca o GIF animado do Pokémon
async function carregarAnimado(nome) {

  // Faz requisição na API para pegar dados do Pokémon pelo nome
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
  
  // Converte a resposta para JSON
  const data = await response.json()

  // Pega o ID do Pokémon (necessário para montar a URL do GIF)
  const id = data.id

  // Monta a URL do sprite animado usando o ID
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
  
  // Retorna a URL do GIF
  return url
}

// Pega o botão de busca pelo ID
const btn = document.getElementById('btn-search')

// Adiciona evento de clique no botão
btn.addEventListener('click', async () => {

  // Pega o valor digitado no input e deixa tudo minúsculo
  const nome = document.getElementById('bar-search').value.toLowerCase()

  // Faz requisição para buscar dados do Pokémon
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
  
  // Converte resposta para JSON
  const data = await response.json()

  // Chama a função para pegar o GIF animado
  const gif = await carregarAnimado(nome)

  // Atualiza o nome do Pokémon na tela
  document.getElementById('pokemon-name').textContent = data.name

  // Atualiza o ID do Pokémon na tela
  document.getElementById('pokemon-id').textContent = `#${data.id}`

  // Atualiza a imagem com o GIF animado
  document.getElementById('pokemon-img').src = gif
 
  // Remove a classe "hidden" para mostrar o resultado na tela
  document.getElementById('result').classList.remove('hidden')
})