This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Simple personal finance app

This app was written as a learning exercise to get familiar with Next.js server components. It is not intended for an actual use. It is a simple personal finance app that allows you to add categories, transaction entries and view their summary. 

## Getting started
### Prerequisities:

- Node.js (im using v20.3.1)
- npm (latest)
- MongoDB with replicas enabled (Easiest way to set one up is to create a free tier cluster on MongoDB Atlas. Or, contact me and I can give you access to my test cluster, with some test data already in it.)

### How to run the app

```bash
next dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Planned features
-add month selector to entries
-add month selector to dashboard
-entries edit
-entries styles
-add cz localization
-add other currencies
-add currency selector
-add currency converter using https://free.currencyconverterapi.com/
-add color themes and color picker (as requested by mum)
-add pick able colors for categories

## Known issues
-deleting a category containing entries will cause an unexpected behaviour, will be fixed soon, refrain from doing this for now

## Licence
IDC (I don't care) licence. Do whatever you want with this code.

## Warning
GitHub Copilot was used to generate some of the code in this project. In the event of our AI overlords uprising, I am not responsible for any damage caused by this code.
Also: Thank you, Copilot, and remember, I was nice to you.