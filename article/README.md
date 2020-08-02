# Elsa Morand

Diététique et Naturopathie

## Menu

- [Accueil](/)
- Articles
- [Consultations](/consultations)
- [Qui suis-je ?](/qui-suis-je)

## Articles

- [Les règles douloureuses](/article/les-regles-douloureuses) règles, magnésium, hormones
> Comprendre et soigner naturellement les règles douloureuses

- [Prudence avec les fruits - 1](/article/prudence-avec-les-fruits-1) acidité, déminéralisation, fruits
> Effets de la consommation de fruits selon son tempérament

- [Prudence avec les fruits - 2](/article/prudence-avec-les-fruits-2) digestion, frilosité, combinaisons alimentaires
> Quand et comment consommer les fruits

- [Super-aliments et trésors exotiques](/article/super-aliments-et-tresors-exotiques) spiruline, chia, baies de goji, acérola, noix de cajou, coco, avocat
> Réflexions et mise en garde sur les super-aliments à la mode

- [Les 4 impératifs d'une bonne alimentation](/article/alimentation-les-4-imperatifs) repas, protéines, glucides, produits industriels, digestion
> Conseils de base pour bien se nourrir

- [Les mauvaises combinaisons alimentaires](/article/les-mauvaises-combinaisons-alimentaires) acides, amidons, miel, café, lait, fruits
> Les principales associations à éviter pour une bonne digestion

<script>
const elements = [...document.querySelectorAll('content ul li')]
elements[0].parentElement.style.padding = 0
for (const el of elements) {
  const [link] = el.getElementsByTagName('a')
  const [block] = el.getElementsByTagName('p')
  const [description] = el.getElementsByTagName('blockquote')
  const img = document.createElement('img')
  const div = document.createElement('div')
  const span = document.createElement('span')
  el.style.display = 'flex'
  el.style.flexDirection = 'row'
  el.style.background = '#f8fde2'
  el.style.margin = '12px 0'
  el.style.borderRadius = '4px'
  el.style.overflow = 'hidden'
  span.style.color = '#413e19'
  div.style.display = 'flex'
  div.style.flexDirection = 'column'
  div.style.alignContent = 'center'
  div.style.justifyContent = 'center'
  link.style.fontSize = '26px'
  img.style.width = `120px`
  img.style.height = `120px`
  img.style.marginRight = '12px'
  img.src = `${link.href.replace('/article/', '/image/article/')}-icon.jpg`

  while (description.firstChild) {
    span.appendChild(description.firstChild)
  }

  div.append(link, span)
  block.remove()
  description.remove()

  el.append(img, div)
}
</script>