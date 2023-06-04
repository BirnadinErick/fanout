import json
import requests as r

def main(req, res):
  try:
    GET_USER_ARTICLES = """
      query GetUserArticles($page: Int!) {
          user(username: "birnadine") {
              publication {
                  posts(page: $page) {
                      title
                      brief
                      slug
                  }
              }
          }
      }
  """
    print("requesting...",end="")
    resp = r.post('https://api.hashnode.com/', headers={'Content-Type':'application/json'}, data=json.dumps({
      GET_USER_ARTICLES, {'page':0}
    }))
    print("done1")

    print("parsing result...",end="")
    result = data.json()
    print("done!")
    print(result)

    return res.send(1)
  except e:
    print(e)
    return res.send(0)