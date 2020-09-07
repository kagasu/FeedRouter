# FeedRouter
![](https://github.com/kagasu/FeedRouter/raw/master/resources/image001.png)

# Features
- Check feed every 1 minutes.
- You can write custom feed in Node.js
- Notify new entry(Email or Webhook)

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
- https://nodemailer.com/usage/using-gmail/
