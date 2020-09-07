const fetch = require('node-fetch')
const Enumerable = require('linq')
const { parseFromTimeZone } = require('date-fns-timezone');

(async () => {
  const feedItems = []
  const timeZone = 'Asia/Tokyo'
  const url = 'https://genshin.mihoyo.com/content/yuanshen/getContentList?pageSize=10&pageNum=1&channelId=141'
  const res = await fetch(url)
  const json = await res.json()

  for (const item of json.data.list) {
    const date = parseFromTimeZone(item.start_time, { timeZone })
    // debug
    // date.setDate(date.getDate() + 1)

    const content = Enumerable.from(item.ext).where(x => x.arrtName === 'banner').first().value[0].url
    if (content) {
      feedItems.push({
        title: item.title,
        content,
        link: `https://genshin.mihoyo.com/ja/news/detail/${item.contentId}`,
        isoDate: date.toISOString()
      })
    }
  }

  return feedItems
})()
