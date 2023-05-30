import json
import requests as r

def main(req, res):
    INT_TOKEN = req.variables.get('INT_TOKEN', None)
    API_PREFIX = "https://api.medium.com/v1"
    BASE_HEADERS = {
            "Authorization":f"Bearer {INT_TOKEN}",
            "Content-Type":"application/json"
    }
    # populate USER_ID
    resp = r.get(f"{API_PREFIX}/me", headers=BASE_HEADERS)

    if resp.status_code == 200:
        data = resp.json()
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

    resp = r.post(POST_URL, data=json.dumps(PAYLOAD), headers=BASE_HEADERS)
    print(resp.request.headers)
    print(resp.request.body)
    if resp.status_code == 201:
        data = resp.json()
        print(data)
        return res.json(data)
    else:
        print(resp.status_code)
        print("Error posting!")
        raise Exception(f"returned: {resp.status_code}\n {resp.json()}")

