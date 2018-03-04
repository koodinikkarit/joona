IMAGE_TAG="$CI_COMMIT_REF_NAME-$CI_COMMIT_SHA"

RELEASE_NAME=$(echo "$CI_COMMIT_REF_NAME" | sed 's/\./-/g')

helm upgrade \
	--wait \
	--set basedomain=$BASE_DOMAIN \
	--set joonaApiImage=jaska/joona-api:$IMAGE_TAG \
	--set joonaFrontendImage=jaska/joona-frontend:$IMAGE_TAG \
	--set mysqlDatabaseName=joona$RELEASE_NAME \
	--set mysqlHost=$MYSQL_HOST \
	--set mysqlUser=$MYSQL_USER \
	--install joona-$RELEASE_NAME ./deployment
