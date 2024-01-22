#!/bin/bash
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
pm2 list
echo " === got pm2 list === "
pm2 stop blog
npm run build
pm2 start npm --name "blog" -- start
