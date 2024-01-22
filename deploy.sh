#!/bin/bash
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
npm run build
pm2 list
echo " === got pm2 list === "
pm2 stop blog
pm2 start npm --name "blog" -- start
pm2 save
