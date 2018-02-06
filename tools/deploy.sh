#! /bin/sh

git checkout -- process.json
NODE_ENV=production node tools/deploy.js
