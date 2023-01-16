#!/bin/bash

# 1. Data API App Id
appid="data-irilv"

# 2. API Key
apikey="'P86jkJ5UcsV1YMxt04hFJtnY2E5zwNZIDHaiUXE7LFvUCEIoIvGDImQHtnkgxtsV"

# 3. Base URL
baseurl="https://data.mongodb-api.com/app/data-irilv/endpoint/data/v1"

# 4. Endpoint
endpoint="/action/findOne"

# 5. dataSource
dataSource="Cluster0"

# 6. database
database="scream_your_heart_out"

# 7. collection
collection="user_posts"

# 8. filter
# filter='{}'
filter='{
  "body": {
    "$regex": "Sheena", 
    "$options": "i"
  } 
}'

# 9. Run the curl request from the terminal: ./findOne.sh
curl -XPOST -H "api-key: $apikey" -H 'Access-Control-Request-Headers: *' -H 'Content-type: application/json' -d '{ 
  "dataSource": "'"$dataSource"'", 
  "database": "'"$database"'", 
  "collection": "'"$collection"'",
  "filter": '"$filter"'
}' $baseurl$endpoint | npx json