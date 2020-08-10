# FeedRouter
- Check feed every 1 minutes.
- Notify new entry(Email or Webhook)

![](https://user-images.githubusercontent.com/1202244/89741574-5b1d0200-dacd-11ea-822a-821c1c95aa70.png)

# Initialize
```
git clone https://github.com/kagasu/FeedRouter
cd FeedRouter
npm i
vim config/config.json
vim config/emailConfig.json

sequelize db:create
sequelize db:migrate
```

# Development
```
npm run dev
```

# Production
```
npm run build

pm2 start
pm2 startup
pm2 save
```

# FAQ
### Q. I can't login to Gmail.
A. Access below URLs.
- https://myaccount.google.com/lesssecureapps
- https://accounts.google.com/DisplayUnlockCaptcha
