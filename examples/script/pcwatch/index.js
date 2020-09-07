const fetch = require('node-fetch')
const { parseFromTimeZone } = require('date-fns-timezone')
const xpath = require('xpath')
const parse5 = require('parse5')
const xmlser = require('xmlserializer')
const DomParser = require('xmldom').DOMParser;

(async () => {
  const feedItems = []
  const timeZone = 'Asia/Tokyo'
  const url = 'https://pc.watch.impress.co.jp/category/software/windows/'
  const res = await fetch(url)
  const text = await res.text()

  const document = parse5.parse(text)
  const xhtml = xmlser.serializeToString(document)
  const doc = new DomParser().parseFromString(xhtml)
  const select = xpath.useNamespaces({ 'x': 'http://www.w3.org/1999/xhtml' })
  const items = select('//x:div[@id="main"]/x:article/x:section/x:div/x:ul/x:li[not(contains(@class, "ad"))]', doc)

  for (const item of items) {
    const title = select('x:div[@class="body"]/x:div[@class="text"]/x:p[@class="title"]/x:a/text()', item)[0].data
    const link = select('x:div[@class="body"]/x:div[@class="text"]/x:p[@class="title"]/x:a/@href', item)[0].value
    const strDate = `${select('x:div[@class="body"]/x:div[@class="text"]/x:p[@class="date"]/text()', item)[0].data.replace(/[\\(\\)]/g, '')} 23:59:59`
    const date = parseFromTimeZone(strDate, { timeZone })

    feedItems.push({
      title,
      content: null,
      link,
      isoDate: date.toISOString()
    })
  }

  return feedItems
})()
