const env = process.env.NODE_ENV || 'development'
const Parser = require('rss-parser')
const cron = require('node-cron')
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const nodemailer = require('nodemailer')
const db = require('../models/')
const emailConfig = require(`${__dirname}/../config/emailConfig.json`)[env]
const transporter = nodemailer.createTransport(emailConfig)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

cron.schedule('* * * * *', async () => {
  // 一分ごとにフィードをチェックする
  const parser = new Parser()
  const feeds = await db.Feed.findAll()
  for (const feed of feeds) {
    for (const item of (await parser.parseURL(feed.url)).items.reverse()) {
      if (Date.parse(item.isoDate) > feed.updatedAt) {
        switch (feed.action) {
          case 'email': {
            await transporter.sendMail({
              from: emailConfig.auth.user,
              to: emailConfig.auth.user,
              subject: `${feed.title} ${item.title}`,
              text: item.link
            })
            break
          }
          case 'webhook': {
            const webhook = JSON.parse(feed.webhook)
            await fetch(webhook.url, {
              method: webhook.method,
              headers: { ...webhook.headers },
              body: webhook.content.replace('{{FeedTitle}}', feed.title).replace('{{EntryUrl}}', item.link)
            })
            break
          }
        }
        feed.changed('updatedAt', true)
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
      action: req.body.action,
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
      action: req.body.action,
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
