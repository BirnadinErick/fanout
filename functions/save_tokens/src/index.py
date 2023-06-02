from cuid2 import cuid_wrapper
from appwrite.client import Client
from appwrite.services.databases import Databases


def main(req, res):
  client = Client()

  (client
    .set_endpoint(req.variables.get('APPWRITE_FUNCTION_ENDPOINT', None))
    .set_project(req.variables.get('APPWRITE_FUNCTION_PROJECT_ID', None)) 
    .set_key(req.variables.get('APPWRITE_FUNCTION_API_KEY', None))
  )

  databases = Databases(client)
  
  cuid_gen = cuid_wrapper()
  
  payload = req.payload.split(".")
  data = {
    "userId":payload[0],
    "med":payload[1],
    "dev":payload[2]
  }

  print(data)

  result = databases.create_document(
    req.variables.get('DB_ID', None),
    req.variables.get('COL_ID', None),
    cuid_gen(),
    data
  )

  if "$id" in result.keys():
    return res.send(1)  
  else:
    return res.send(0)