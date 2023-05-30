import json
import requests as r

def main(req, res):
  DEV_API_KEY = req.variables.get('DEV_API_KEY', None)
  URL = "https://dev.to/api/articles"
  HEADERS = {
      'Content-Type': 'application/json',
      'api-key': DEV_API_KEY,
    }

  PAYLOAD = {
    "article": {
      "title": "Fan Out second post",
      "body_markdown": "# Hello world \n --- \n *test* \n - hi \n - hello",
      "published": True,
      "description": "fan out first test post",
      "tags": "#helloowrl#jesus".split("#"),
      "organization_id": 0,
      "series": "",
      "main_image": "https://unsplash.com/photos/VQK9J5reAWo/download?ixid=M3wxMjA3fDB8MXxhbGx8MTB8fHx8fHwyfHwxNjg1NDA4NDQ5fA&force=true&w=1920",
      "canonical_url": ""
    }
  }

  resp = r.post(URL, data=json.dumps(PAYLOAD), headers=HEADERS)

  if resp.status_code == 201:
      print(resp.json())
      return res.send(1)
  else:
      print(f"Resp Status {resp.status_code}")
      return res.send(0)