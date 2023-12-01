# Everest API Design

# API Name: **Authentication**

## Description

This is an API for authentication.

## Base URL

### `http:/127.0.0.1:8000/api/auth`

## Endpoints

### Login:

### `POST api/auth/login`

### Request b**ody:**

```jsx
{
	email: "huulinh@gmail.com",
	password: "huulinh123",
}
```

### Parameters

- `required` : Fields cannot be left blank.
- `email` : The field must be email syntax.
- `string` : The value type must be string.

### Response

- `access_token`:  Access Token for the user when logging in
- `token_type`: Type of token
- `expires_in`: Token expiration time

### Example

Request:

```
POST /api/auth/login
```

Response:

```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MDE0MTIxMDUsImV4cCI6MTcwMTQxNTcwNSwibmJmIjoxNzAxNDEyMTA1LCJqdGkiOiJTTktVZGJrdmF3VkJ0NVVZIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.7sxxsbKEKvblaZrEHwm5eY_irLT4kl5zbaJBNnOMELc",
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicmFuZG9tIjoiNjQ1ODY3NTcxMTcwMTQxMjEwNSIsImV4cGlyZXNfaW4iOjE3MDE0MzIyNjV9.sUrx1n1X31hvSYEiWlniDUslwKTWZq0e1r1XgZCm3AY",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
        "id": 1,
        "first_name": "Linh",
        "last_name": "Nguyen Huu",
        "email": "admin@gmail.com",
        "email_verified_at": null,
        "image": "admin.png",
        "role_id": 1,
        "address": "DN",
        "phone": "0935223231",
        "delete_flag": null,
        "created_at": "2023-12-01T06:26:46.000000Z",
        "updated_at": "2023-12-01T06:27:26.000000Z"
    }
}
```

### Error:

- `401 Unauthorized`
- `422 Validate Error`

### Profile:
`GET api/auth/profile`

### Request Headers**:**

```jsx
{
	Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MDA2MTczNjMsImV4cCI6MTcwMDYyMDk2MywibmJmIjoxNzAwNjE3MzYzLCJqdGkiOiJ3dlhHOTRteUtTMk1zU2VCIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.WxIj7vZCfCj81lJTDDpgXSMdiqYmnH0ShNNqb3DpKWs"
}
```

### Response

Request:

```
GET /api/auth/profile
```

Response:

```json
{
    "id": 1,
    "first_name": "Nguyen Huu",
    "last_name": "Linh",
    "email": "admin@gmail.com",
    "email_verified_at": null,
    "image": "admin.png",
    "role_id": 1,
    "address": "DA NANG",
    "phone": "099999",
    "delete_flag": null,
    "created_at": "2023-12-01T06:26:46.000000Z",
    "updated_at": "2023-12-01T06:38:06.000000Z"
}
```

### Error:

- `401 Unauthorized`

### Refresh token:

### `POST api/auth/refresh`

### Request Body**:**

```jsx
{
	refresh_tokenzation: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MDA2MTczNjMsImV4cCI6MTcwMDYyMDk2MywibmJmIjoxNzAwNjE3MzYzLCJqdGkiOiJ3dlhHOTRteUtTMk1zU2VCIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.WxIj7vZCfCj81lJTDDpgXSMdiqYmnH0ShNNqb3DpKWs"
}
```

### Response

```jsx
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvcmVmcmVzaCIsImlhdCI6MTcwMTQxMzgyMCwiZXhwIjoxNzAxNDE3NDIwLCJuYmYiOjE3MDE0MTM4MjAsImp0aSI6ImJEVEEyOWVBWTZFZmE2dGUiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.RUEsQ_jD72DV2YdgRO4y4JnUGTixNcNOXL-Bbplo-hM",
    "refresh_token": null,
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
        "id": 1,
        "first_name": "Nguyen Huu",
        "last_name": "Linh",
        "email": "admin@gmail.com",
        "email_verified_at": null,
        "image": "admin.png",
        "role_id": 1,
        "address": "DA NANG",
        "phone": "099999",
        "delete_flag": null,
        "created_at": "2023-12-01T06:26:46.000000Z",
        "updated_at": "2023-12-01T06:38:06.000000Z"
    }
}
```

### Error:

- `404 User not found`
- `500 Refresh Token Invalid`

### Logout:

### `POST api/auth/logout`

### Request Headers**:**

```jsx
{
	Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MDA2MTczNjMsImV4cCI6MTcwMDYyMDk2MywibmJmIjoxNzAwNjE3MzYzLCJqdGkiOiJ3dlhHOTRteUtTMk1zU2VCIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.WxIj7vZCfCj81lJTDDpgXSMdiqYmnH0ShNNqb3DpKWs"
}
```

### Response

- `message`: Display logout action’s status

### Example

Request:

```
POST /api/auth/logout
```

Response:

```json
{
    "message": "User logged out"
}
```

### Errors:

# User Account Management

### API Name: get all user accounts

## Description

This is an API to manage user account.

## Base URL

### `http:/127.0.0.1:8000/api/users`

## Endpoints

### **Get users**

### `GET api/users/get`

### Request headers

```jsx
{
	Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MDA2MTczNjMsImV4cCI6MTcwMDYyMDk2MywibmJmIjoxNzAwNjE3MzYzLCJqdGkiOiJ3dlhHOTRteUtTMk1zU2VCIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.WxIj7vZCfCj81lJTDDpgXSMdiqYmnH0ShNNqb3DpKWs"
}
```

### Response

- `data`: An array of objects for user information, each object with the following properties:
    - `id`: The identifier of the user.
    - `first_name`: The first name of the user.
    - `last_name`: The last name of the user.
    - `email`: The email of the user.
    - `role_id`: The role of the user.
    - `address`: The address of the user.
    - `role_id`
    - `phone`: The phone number of the user.
    - `image`: User’s avatar.
    - `create_at`: User account registration time.
    - `update_at`: Time the user account updates information.

### Example

Request:

```
GET /api/user/get
```

Response:

```json
[
    {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "first_name": "Linh",
                "last_name": "Nguyen Huu",
                "email": "admin@gmail.com",
                "email_verified_at": null,
                "image": "admin.png",
                "role_id": 1,
                "address": "DN",
                "phone": "0935223231",
                "delete_flag": null,
                "created_at": "2023-12-01T06:26:46.000000Z",
                "updated_at": "2023-12-01T06:27:26.000000Z"
            }
        ],
        "first_page_url": "http://127.0.0.1:8000/api/user/get?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:8000/api/user/get?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/user/get?page=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "next_page_url": null,
        "path": "http://127.0.0.1:8000/api/user/get",
        "per_page": 5,
        "prev_page_url": null,
        "to": 1,
        "total": 1
    }
]

```

### Create user account

### `POST api/user/create`

### Request headers

```jsx
{
	Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MDA2MTczNjMsImV4cCI6MTcwMDYyMDk2MywibmJmIjoxNzAwNjE3MzYzLCJqdGkiOiJ3dlhHOTRteUtTMk1zU2VCIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.WxIj7vZCfCj81lJTDDpgXSMdiqYmnH0ShNNqb3DpKWs"
}
```

### Request b**ody:**

```jsx
{
  email : "huulinh111@gmail.com", 
	first_name: "Linh", 
	last_name: "Nguyen Huu",
	role_id: 1,
	image: "avatar.png",
	address:"Da Nang",
	phone: "0905109563",
  password : "huulinh123"
}
```

### Parameters

- `required` : Fields cannot be left blank.
- `email` : The field must be email syntax.
- `unique` : The value of field must not already exist.
- `string` : The value type must be string.
- `confirmed` : The value of the input field must match.

### Response

- `message`: Returns a response message for successfully create user account.

### Example

Request:

```
POST /api/user/create
```

Response:

```json
{
    "message": "Create user successfully"
}
```

### Errors:

- `422 Validate Error`

### Update user account

### `DELETE api/user/update/{id}`

### Request headers**:**

```json
{
   "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MDA2MTczNjMsImV4cCI6MTcwMDYyMDk2MywibmJmIjoxNzAwNjE3MzYzLCJqdGkiOiJ3dlhHOTRteUtTMk1zU2VCIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.WxIj7vZCfCj81lJTDDpgXSMdiqYmnH0ShNNqb3DpKWs"
}
```

### Request b**ody:**

```jsx
{
  email : "huulinh111@gmail.com", 
	first_name: "Linh", 
	last_name: "Nguyen Huu",
	role_id: 1,
	image: "avatar.png",
	address:"Da Nang",
	phone: "0905109563",
  password : "huulinh123"
}
```

### Response

```json
{
	"message": "Update user successfully",
}
```

### Example

Request:

```
Update /api/user/delete/1
```

Response:

```json
{
    "message": "Update user successfully"
}
```

### Errors:

- `404 User not found`
- `422 Validate Error`

### Delete user account

### `DELETE api/user/delete/{id}`

### Request headers**:**

```json
{
   "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MDA2MTczNjMsImV4cCI6MTcwMDYyMDk2MywibmJmIjoxNzAwNjE3MzYzLCJqdGkiOiJ3dlhHOTRteUtTMk1zU2VCIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.WxIj7vZCfCj81lJTDDpgXSMdiqYmnH0ShNNqb3DpKWs"
}
```

### Response

```json
{
	"message": "Delete user successfully",
}
```

### Example

Request:

```
Delete /api/user/delete/{1}
```

Response:

```json
{
    "message": "Delete user successfully"
}
```

### Errors:

- `400 Invalid user ID`
- `404 User not found or error deleting user`