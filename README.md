# jwt-nodejs-mongo

## API
### Register
POST: localhost:8888/register
```json
{
    "fullname": "role1",
    "email": "role1@gmail.com",
    "password": "1234",
    "role": 1
}
```

### Login
POST: localhost:8888/login
```json
{
    "email": "role1@gmail.com",
    "password": "1234"
}
```

### Test API
GET: localhost:8888/welcome
#### x-access-token: TOKEN_INPUT
