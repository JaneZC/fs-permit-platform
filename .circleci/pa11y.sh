docker-compose build fs-intake-pa11y
docker-compose up fs-intake-pa11y &
sleep 300
cd ../frontend
sudo npm run pa11y
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
cd ../docker
docker-compose down
exit $pa11yreturncode
