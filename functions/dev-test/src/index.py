import json
import requests as r

def main(req, res):
  DEV_API_KEY = req.variables.get('DEV_API_KEY', None)
  URL = "https://dev.to/api/articles"
  HEADERS = {
      'Content-Type': 'application/json',
      'api-key': DEV_API_KEY,
    }
  # payload = json.loads(req.payload)
  print(req.payload)

  # resp = r.post(URL, data=json.dumps(PAYLOAD), headers=HEADERS)
  resp = r.post(URL, data=req.payload, headers=HEADERS)

  if resp.status_code == 201:
      print(resp.json())
      return res.send(1)
  else:
      print(f"Resp Status {resp.status_code}")
      return res.send(0)