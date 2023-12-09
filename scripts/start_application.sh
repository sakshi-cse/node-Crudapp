#!/bin/bash

cd /home/ubuntu/node-Crudapp
chmod +x scripts/start_application.sh

pm2 restart app.js
