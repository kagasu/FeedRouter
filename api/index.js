const env = process.env.NODE_ENV || 'development'
const Parser = require('rss-parser')
const cron = require('node-cron')
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const nodemailer = require('nodemailer')
const CryptoJS = require('crypto-js')
const db = require('../models/')
const emailConfig = require(`${__dirname}/../config/emailConfig.json`)[env]
const transporter = nodemailer.createTransport(emailConfig)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function hasNgWord (title, content, ngWords) {
  for (const ngWord of ngWords) {
    if (title.includes(ngWord) || content.includes(ngWord)) {
      return true
    }
  }

  return false
}

function getReplacedText (feed, item, str) {
  return str
    .replace('{{FeedTitle}}', feed.title)
    .replace('{{EntryTitle}}', item.title)
    .replace('{{EntryUrl}}', item.link)
}

cron.schedule('* * * * *', async () => {
  // 一分ごとにフィードをチェックする
  const parser = new Parser({
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
      'Accept': 'application/rss+xml, application/xml, text/xml'
    }
  })

  const feeds = await db.Feed.findAll()
  for (const feed of feeds) {
    for (const item of (await parser.parseURL(feed.url)).items.reverse()) {
      if (Date.parse(item.isoDate) > feed.updatedAt) {
        if (feed.ngWord && hasNgWord(item.title, item.content, feed.ngWord.split(' '))) {
          continue
        }

        const urlHash = CryptoJS.SHA512(item.link).toString()

        // 存在チェック
        if (await db.ActionLog.findOne({ where: { feedId: feed.id, urlHash } })) {
          continue
        }

        switch (feed.action) {
          case 'email': {
            await transporter.sendMail({
              from: emailConfig.auth.user,
              to: emailConfig.auth.user,
              subject: (!feed.emailSubject) ? null : getReplacedText(feed, item, feed.emailSubject),
              text: (!feed.emailBody) ? null : getReplacedText(feed, item, feed.emailBody)
            })
            break
          }
          case 'webhook': {
            const webhook = JSON.parse(feed.webhook)
            await fetch(webhook.url, {
              method: webhook.method,
              headers: { ...webhook.headers },
              body: getReplacedText(feed, item, webhook.content)
            })
            break
          }
        }
        feed.changed('updatedAt', true)

        await db.ActionLog.create({
          feedId: feed.id,
          urlHash,
          title: item.title.substring(0, 32),
          url: item.link
        })
      }
    }
    await feed.save()
  }
})

/*
app.get('/api/account/:id', wrap(async (req, res, next) => {
  const id = parseInt(req.params.id || 0)

  const obj = await db.Account.findOne({
    where: {
      id
    }
  })
  res.send(JSON.stringify(obj))
}))
*/

app.get('/api/feeds', async (req, res, next) => {
  const obj = await db.Feed.findAll()
  res.send(JSON.stringify(obj))
})

app.post('/api/feed', async (req, res, next) => {
  try {
    await db.Feed.create({
      title: req.body.title,
      url: req.body.url,
      ngWord: req.body.ng_word,
      action: req.body.action,
      emailSubject: req.body.email_subject,
      emailBody: req.body.email_body,
      webhook: req.body.webhook
    })
  } catch (e) {
    res.send(e.original.sqlMessage)
    return
  } finally {
    res.send()
  }
})

app.put('/api/feed', async (req, res, next) => {
  try {
    await db.Feed.update({
      title: req.body.title,
      url: req.body.url,
      ngWord: req.body.ng_word,
      action: req.body.action,
      emailSubject: req.body.email_subject,
      emailBody: req.body.email_body,
      webhook: req.body.webhook
    }, {
      where: {
        id: req.body.id
      }
    })
  } catch (e) {
    res.send(e.original.sqlMessage)
    return
  } finally {
    res.send()
  }
})

app.delete('/api/feed', async (req, res, next) => {
  try {
    await db.Feed.destroy({
      where: {
        id: req.body.id
      }
    })
  } catch (e) {
    res.send(e.original.sqlMessage)
    return
  } finally {
    res.send()
  }
})

export default app
