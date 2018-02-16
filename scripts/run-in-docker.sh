echo "window.config = {};" > ./build/configuration.js
echo "window.config.PETRI_IP = '$PETRI_IP';" >> ./build/configuration.js
echo "window.config.PETRI_PORT = $PETRI_PORT;" >> ./build/configuration.js
npm run start-production