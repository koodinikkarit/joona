IMAGE_TAG="$TRAVIS_BRANCH-$TRAVIS_COMMIT"

RELEASE_NAME=$(echo "$TRAVIS_BRANCH" | sed 's/\./-/g')

helm upgrade \
	--wait \
	--set joonaImage=jaska/joona:$IMAGE_TAG \
	--install joona-$RELEASE_NAME ./deployment
