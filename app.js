// ======================== API ========================

// 🔹 Buscar GIF animado do Pokémon
async function carregarAnimado(nome) {

  // Faz requisição na PokeAPI usando o nome do Pokémon
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
  
  // Converte a resposta para JSON
  const data = await res.json()

  // Monta a URL do sprite animado usando o ID retornado
  const URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif`
  
  // Retorna a URL do GIF
  return URL
}


// 🔹 Buscar informações + descrição + cor
async function carregarInformacao(nome) {

  // Requisição para dados principais (nome, id, tipo, etc)
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
  const data = await res.json()

  // Requisição para dados da espécie (descrição e cor)
  const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nome}`)
  const species = await resSpecies.json()

  // Retorna um objeto com todas as informações necessárias
  return {
    nome: data.name, // nome do Pokémon
    id: data.id, // ID do Pokémon
    descricao: species.flavor_text_entries
      .find(entry => entry.language.name === 'en').flavor_text, // descrição em inglês
    cor: species.color.name // cor padrão da species
  }
}


// ======================== UI ========================

// 🔹 Mapear cor da API para classes do Tailwind
function corPokemon(cor) {

  // Objeto que converte cor da API → classe Tailwind
  const cores = {
    red: "bg-red-400 border-red-600",
    blue: "bg-blue-400 border-blue-600",
    green: "bg-green-400 border-green-600",
    yellow: "bg-yellow-300 border-yellow-600",
    purple: "bg-purple-400 border-purple-600",
    pink: "bg-pink-300 border-pink-600",
    brown: "bg-yellow-700 border-yellow-600",
    black: "bg-gray-800 border-gray-600",
    gray: "bg-gray-400 border-gray-600",
    white: "bg-gray-100 border-gray-600"
  }

  // Retorna a cor correspondente ou cinza padrão
  return cores[cor] 
}


// ======================== EVENTO ========================

// 🔹 Seleciona botão de busca
const btn = document.getElementById('btn-search')

// 🔹 Evento de clique
btn.addEventListener('click', async () => {

  // Pega o valor digitado e normaliza (minúsculo)
  const nome = document.getElementById('bar-search').value.toLowerCase()

  // Busca informações do Pokémon
  const dados = await carregarInformacao(nome)

  // Busca GIF animado
  const gif = await carregarAnimado(nome)


  // ======================== RENDER ========================

  // Atualiza nome
  document.getElementById('pokemon-name').textContent = dados.nome

  // Atualiza ID (com símbolo custom "*")
  document.getElementById('pokemon-id').textContent = `*${dados.id}`

  // Atualiza imagem
  document.getElementById('pokemon-img').src = gif

  // Atualiza descrição
  document.getElementById('descricao').textContent = dados.descricao
  

  // ======================== ESTILO ========================

  // Seleciona o card
  const card = document.getElementById('result')

  // Remove cores antigas (evita conflito)
  card.classList.remove(
  "bg-red-400","border-red-600",
  "bg-blue-400","border-blue-600",
  "bg-green-400","border-green-600",
  "bg-yellow-300","border-yellow-600",
  "bg-purple-400","border-purple-600",
  "bg-pink-300","border-pink-600",
  "bg-yellow-700","border-yellow-600",
  "bg-gray-800","border-gray-600",
  "bg-gray-400","border-gray-600",
  "bg-gray-100","border-gray-600"
)

  // Adiciona nova cor baseada no Pokémon
  card.classList.add(...corPokemon(dados.cor).split(' '))

  // Mostra o card (remove hidden)
  card.classList.remove('hidden')
})