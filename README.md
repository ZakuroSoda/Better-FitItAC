## FitItAC++
This is an app trying to reproduce the FitItAC+ Microsoft PowerApp from ACS(I), which allows users to submit defect reports regarding the maintenance of the school buildings etc. The admin can then see the report and send people down to fix it, who will then mark it as resolved.

## Setup

```bash
git clone https://github.com/ZakuroSoda/Better-FitItAC.git
cd Better-FitItAC
npm install
npm start
npm run api (in a separate terminal)
```

For now, use `admin` username to login.

## Production
```bash
git clone https://github.com/ZakuroSoda/Better-FitItAC.git
cd Better-FitItAC
npm install
echo 'MODE="PRODUCTION"' > .env
sudo nano /etc/nginx/sites-available/better-fixitac
```
```nginx
# nginx config
server {
    listen 80;
    server_name DOMAIN/IP;

    location / {
        proxy_pass http://localhost:2000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/better-fixitac /etc/nginx/sites-enabled
sudo service nginx restart
pm2 start server.js --name better-fixitac
```

## Todo
- [ ] Lots of Vulnerabilities
- [X] Error message comes from API not front-end
- [X] Error handling for API call within front-end
- [ ] Switch to POST instead of GET API eventually
- [ ] Consistent casing, variable naming within database, api, front-end
- [ ] Register/Change PW Functionality
