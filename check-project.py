#!/usr/bin/env python3
import requests
import json

API_TOKEN = "1cf367c3-7099-4b69-93a1-5401c2297fec"
PROJECT_ID = "fda2073b-d325-4734-8dd6-20deb81eb585"

# Check existing project
query = """
{
  project(id: "%s") {
    id
    name
    services {
      edges {
        node {
          id
          name
          type
        }
      }
    }
  }
}
""" % PROJECT_ID

response = requests.post(
    "https://backboard.railway.com/graphql/v2",
    headers={
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    },
    json={"query": query}
)

print("Response:", response.status_code)
print(json.dumps(response.json(), indent=2))
