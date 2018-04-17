#!/bin/bash

echo 'Se va a construir tanto el build de dev como el de prod, y se cargaran a abar-apps.com/apps/rch-web/dev.zip y /prod.zip, para que las descargues en la maquina destino y ahi hagas deploy'

ng build
cp src/.htaccess dist/
cp src/web.config dist/
zip -r dev.zip dist
scp dev.zip arodriguez@abar-apps.com:/var/www/abar-apps.com/apps/rch/dev.zip
#rm dev.zip
echo 'dev built and uploaded' 
ng build --prod
cp src/.htaccess dist/
cp src/web.config dist/
zip -r prod.zip dist
scp prod.zip arodriguez@abar-apps.com:/var/www/abar-apps.com/apps/rch/prod.zip
#rm prod.zip
echo 'prod build and uploaded'
echo 'Terminado'
echo ''

