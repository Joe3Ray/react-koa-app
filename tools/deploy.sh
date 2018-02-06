#! /bin/sh

git checkout -- process.json
git pull origin master
npm i
NODE_ENV=production node tools/deploy.js
