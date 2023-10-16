## FitItAC++
This is an app trying to reproduce the FitItAC+ Microsoft PowerApp from ACS(I), which allows users to submit defect reports regarding the maintenance of the school buildings etc. The admin can then see the report and send people down to fix it, who will then mark it as resolved.

## Setup

```bash
git clone https://github.com/ZakuroSoda/Better-FitItAC.git
npm install
npm start
npm run api (in a separate terminal)
```

For now, use `admin` username to login.

## Production
```bash
echo 'MODE="PRODUCTION"' > .env
npm run prod
```

## Todo
- [ ] Fix Janky Code
- [ ] Lots of Vulnerabilities
- [ ] Error Handling for API Calls and DB Calls
- [ ] Fix Authentication System in General