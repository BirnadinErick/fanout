import json
import requests as r

INT_TOKEN = "2e3948c903561af6e828fc2fc10ff69d34130d30efb9f28aab1d21b809f31d53c"
USERNAME = "birnadin"
API_PREFIX = "https://api.medium.com/v1"
BASE_HEADERS = {
        "Authorization":f"Bearer {INT_TOKEN}",
        "Content-Type":"application/json"
}
# populate USER_ID
res = r.get(f"{API_PREFIX}/me", headers=BASE_HEADERS)

if res.status_code == 200:
    data = res.json()
    USER_ID = data["data"]["id"]
    print(f"User Id: {USER_ID}")
else:
    print("Error retreiving USER_ID!")

POST_URL = f"{API_PREFIX}/users/{USER_ID}/posts"

# test post
PAYLOAD = {
  "title": "Fan Out first post",
  "contentFormat": "html",
  "content": "<h1>Liverpool FC</h1><p>You’ll never walk alone.</p>",
  "canonicalUrl": "",
  "tags": ["football", "sport", "Liverpool"],
  "publishStatus": "public"
}

res = r.post(POST_URL, data=json.dumps(PAYLOAD), headers=BASE_HEADERS)
print(res.request.headers)
print(res.request.body)
if res.status_code == 201:
    data = res.json()
    print(data)
else:
    print(res.status_code)
    print("Error posting!")

