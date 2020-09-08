const fetch = require('node-fetch')
const { parseFromTimeZone } = require('date-fns-timezone')
const xpath = require('xpath')
const parse5 = require('parse5')
const xmlser = require('xmlserializer')
const DomParser = require('xmldom').DOMParser
const iconv = require('iconv-lite');

(async () => {
  const feedItems = []
  const timeZone = 'Asia/Shanghai'
  const url = 'https://mdnf.qq.com/gicp/news/674/2/19190/1.html'
  const res = await fetch(url)
  const text = iconv.decode(Buffer.from(await res.arrayBuffer()), 'gb2312')

  const document = parse5.parse(text)
  const xhtml = xmlser.serializeToString(document)
  const doc = new DomParser().parseFromString(xhtml)
  const select = xpath.useNamespaces({ 'x': 'http://www.w3.org/1999/xhtml' })
  const items = select('//x:ul[@class="newsList"]/x:li', doc)

  for (const item of items) {
    const title = select('x:a/x:p[@class="news-title"]/text()', item)[0].data
    const link = `https://mdnf.qq.com/${select('x:a/@href', item)[0].value}`
    const strDate = `${(new Date()).getFullYear()}-${select('x:a/x:i[@class="news-time"]/text()', item)[0].data} 23:59:59`
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
