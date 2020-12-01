import { Marked } from 'https://deno.land/x/markdown/mod.ts'

const mappings = { 'README.md': 'index.html' }

const sharedMeta = ({
  url = '/',
  title = 'Elsa Morand - Naturopathe',
  description = 'Hygiène de vie, alimentation, traitements naturels',
}) => `
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:url" content="https://eslamorand.github.io${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="https://eslamorand.github.io${url}-preview.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="628">
`

const pageMeta = `
  <meta property="og:type" content="website">
`

const profileMeta = `
  <meta property="og:type" content="profile">
  <meta property="profile:first_name" content="Elsa">
  <meta property="profile:last_name" content="Morand">
  <meta property="profile:username" content="morandelsa">
  <meta property="profile:gender" content="female">
`

const articleMeta = ({ name, publishedTime, modifiedTime, tags }) => `
  <meta property="article:published_time" content="${publishedTime}">
  <meta property="article:modified_time" content="${modifiedTime}">
  <meta property="article:author" content="https://eslamorand.github.io/qui-suis-je">
  <meta property="article:section" content="Health">${[
    "naturopatie",
    "elsa morand",
    ...tags,
  ].map(t => `\n  <meta property="article:tag" content="${t}">`).join('')}
`

const parts = (await Deno.readTextFile('./template.html'))
  .split('<!--⚡-->')


const run = (cmd) => Deno.run({ cmd, stdout: 'piped' }).output()

const resize = async image => {
  const basename = image.slice(0, image.lastIndexOf('.'))
  if (basename.endsWith('/README') || basename.endsWith('/consultations')) {
    return
  }
  console.log('creating images for', image)
  await run(['gm', 'convert', image, '-resize', '1200x628^', '-gravity', 'center', '-extent', '1200x628', `${basename}-preview.png`])
  await run(['gm', 'convert', image, '-resize', '720x720^', '-gravity', 'center', '-extent', '720x720', `${basename}-square.png`])
  await run(['gm', 'convert', image, '-resize', '240x240^', '-gravity', 'center', '-extent', '240x240', `${basename}-icon.png`])
  await run(['cjpeg', '-quality', '80', '-outfile', `${basename}-preview.jpg`, `${basename}-preview.png`])
  await run(['cjpeg', '-quality', '80', '-outfile', `${basename}-square.jpg`, `${basename}-square.png`])
  await run(['cjpeg', '-quality', '80', '-outfile', `${basename}-icon.jpg`, `${basename}-icon.png`])
}

const dec = new TextDecoder
const getTime = async file => {
  const changesText = await run(['git', 'log', '--follow', '--format=%aI', file])
  const changes = dec.decode(changesText).split('\n').filter(Boolean)

  return {
    modifiedTime: changes[0],
    publishedTime: changes[changes.length - 1],
  }
}

const mdHeading = `# Elsa Morand

Diététique et Naturopathie

## Menu

- [Accueil](/)
- [Articles](/article)
- [Consultations](/consultations)
- [Qui suis-je ?](/qui-suis-je)
`

const buildPage = async (filename, meta) => {
  const target = filename.endsWith('README.md')
    ? `${filename.slice(0, -9)}index.html`
    : `${filename.slice(0, -3)}.html`

  let markdown = await Deno.readTextFile(filename)
  if (!markdown.includes('## Menu')) {
    markdown = `${mdHeading}\n${markdown}`
  }
  const html = Marked.parse(markdown).content
  const startOfMenuIndex = html.indexOf('<h2 id="menu">Menu</h2>')
  const endOfMenuIndex = html.indexOf('<h2', startOfMenuIndex + 1)

  await Deno.writeTextFile(target, [
    parts[0],
    ...meta,
    parts[1],
    html.slice(startOfMenuIndex + 23, endOfMenuIndex),
    parts[2],
    html.slice(endOfMenuIndex),
    parts[3],
  ].join('\n'))

  console.log(filename, '->', target)

  return { markdown, html }
}

// generate main pages
for await (const info of Deno.readDir('.')) {
  if (!info.isFile || !info.name.endsWith('.md')) continue
  await buildPage(info.name, [
    sharedMeta({}),
    info.name.includes('qui-suis-je')
      ? profileMeta
      : pageMeta,
  ])
  await resize(`./image/${info.name.slice(0, -3)}.jpg`)
}

const chunk = (arr, cache = []) => {
  let i = -1, max = Math.floor(arr.length / 5)
  while (++i < max) cache.push(arr.slice(i*5+1, i*5+5))
  return cache
}

const articlePage = await buildPage('./article/README.md', [
  sharedMeta({}),
  pageMeta,
])

const articles = articlePage
  .markdown
  .split('## Articles')[1]
  .trim()
  .split(/- \[([^\]]+)\]\(([^)]+)\)([^>]+)> ([^\n]+)/)


for (const [title, name, tags, description] of chunk(articles)) {
  const filename = `.${name}.md`
  const times = await getTime(filename)

  const article = {
    title,
    url: name,
    description,
    tags: tags.split(',').map(t => t.trim()),
    ...times,
  }

  await buildPage(filename, [
    sharedMeta(article),
    articleMeta(article),
  ])

  await resize(`./image${name}.jpg`)
}


/*

TODO:

preserve scroll on page changes (from the nav bar)
handle default image for README & consultation


*/