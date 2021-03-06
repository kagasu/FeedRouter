# FeedRouter
![](https://github.com/kagasu/FeedRouter/raw/master/resources/image001.png)
![](https://github.com/kagasu/FeedRouter/raw/master/resources/image002.png)

# Features
- Check feed every 1 minutes.<br>Can configure interval.
- Notify new entry(Email or Webhook)
- You can write custom feed in Node.js<br>
https://github.com/kagasu/FeedRouter/tree/master/examples/script

# Initialize
```
git clone https://github.com/kagasu/FeedRouter
cd FeedRouter
npm i
npm i -g sequelize-cli
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
npm install pm2 -g
npm run build

pm2 start
pm2 startup
pm2 save
```

# Check logs
```
pm2 logs
```

# Uninstall
```
pm2 delete FeedRouter
```

# FAQ
### Q. I can't login to Gmail.
A. Access below URLs.
- https://myaccount.google.com/lesssecureapps
- https://accounts.google.com/DisplayUnlockCaptcha
- https://nodemailer.com/usage/using-gmail/
