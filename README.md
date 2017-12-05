# levelbots-hiring-api
Prueba técnica Levelbots

## Oauth token
1. POST to /signup with an email and password:
  ```
  curl -H "Content-Type: application/json" -X "POST" -d '{"email": name@mail.com", "password": "123456789"}' https://levelbots-hiring-api.herokuapp.com/oauth/signup
  ```
  > User created successfully, your token is: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

2. Now you can use the token at header:
  ```
  curl -H "accessToken: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" -X "GET" https://levelbots-hiring-api.herokuapp.com/api/companies
  ```
  ```
  curl -H "accessToken: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" -H "Content-Type: application/json" -X "POST" -d '{"name": "xxx", "permalink": "xxx"}' https://levelbots-hiring-api.herokuapp.com/api/company/52cdef7c4bab8bd675297d8a/producto
  ```

## OAuth routes

BASE: https://levelbots-hiring-api.herokuapp.com

Method | Route | Body
------- | ----- | -----
POST | /signup | {"email": "xxx", "password": "xxx"}
POST | /token | {"email": "xxx", "password": "xxx"}


## API routes

BASE: https://levelbots-hiring-api.herokuapp.com/api

Method | Route | Body
------- | ----- | -----
GET | /companies |
POST | /company | {"id": "xxx", "products": ["xxx"], "relationships": ["xxx"], ...}
GET | /company/:id |
PUT | /company/:id | {"id": "xxx", "products": ["xxx"], "relationships": ["xxx"], ...}
DELETE | /company/:id |
GET | /company/:id/products |
GET | /company/:id/members |
POST | /company/:id/producto | {"name": "xxx", "permalink": "xxx", ...}
