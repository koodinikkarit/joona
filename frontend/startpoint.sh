API_IP="$API_IP"
API_PORT="${API_PORT:-80}"
API_HTTPS_PORT="${API_HTTPS_PORT:-443}"

echo "" >/usr/share/nginx/html/config.js
echo "window.config = {" >>/usr/share/nginx/html/config.js
echo " API_IP: '$API_IP'," >>/usr/share/nginx/html/config.js
echo " API_PORT: $API_PORT," >>/usr/share/nginx/html/config.js
echo " API_HTTPS_PORT: $API_HTTPS_PORT" >>/usr/share/nginx/html/config.js
echo "};" >>/usr/share/nginx/html/config.js
nginx
