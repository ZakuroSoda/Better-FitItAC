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

## Todo
- Fix Janky Code (Hacky fixes, line breaks, indentation, left a few console.logs here and there)
- Lots of Vulnerabilities
- Error Handling for API Calls and DB Calls
- Move to MySQL or PostGreSQL DB
- Fix bad admin auth system