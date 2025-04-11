# Project: [MERN] Task Management

# 📁 Collection: task

## End-point: Create Task

### Method: POST

> ```
> http://localhost:3000/api/tasks
> ```

### Body (**raw**)

```json
{
  "title": "Task 1",
  "description": ""
}
```

### 🔑 Authentication bearer

| Param | value                                                                                                                                                                                                        | Type   |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtOWNlNHNwZTAwMDExcnJ2M2FqYnQ5OTgiLCJlbWFpbCI6InJhbUBnbWFpbC5jb20iLCJpYXQiOjE3NDQzNTI4OTUsImV4cCI6MTc0ND21NzY5NX0.VBEOT0-QvFd4vLoEN2eGUQbSqdxAFJCqQkNbEycEKOI | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get All Tasks

### Method: GET

> ```
> http://localhost:3000/api/tasks
> ```

### 🔑 Authentication bearer

| Param | value                                                                                                                                                                                                           | Type   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtOWJpdHc3eDAwMDAxcmpyOHJ2NHNsZmwiLCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsImlhdCI6MTc0NDI5OTQyMiwiZXhwIjoxNzQ0OTA0MjIyfQ.4RfTC7_Xz3RnUiIsiPcJQi5OfLZ1PDVAzlGSJ_XCNS8 | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Task by id

### Method: DELETE

> ```
> http://localhost:3000/api/tasks/:id
> ```

### 🔑 Authentication bearer

| Param | value                                                                                                                                                                                                           | Type   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtOWJpdHc3eDAwMDAxcmpyOHJ2NHNsZmwiLCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsImlhdCI6MTc0NDI5OTQyMiwiZXhwIjoxNzQ0OTA0MjIyfQ.4RfTC7_Xz3RnUiIsiPcJQi5OfLZ1PDVAzlGSJ_XCNS8 | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Task

### Method: PATCH

> ```
> http://localhost:3000/api/tasks/:id
> ```

### Body (**raw**)

```json
{
  "completed": false
}
```

### 🔑 Authentication bearer

| Param | value                                                                                                                                                                                                        | Type   |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtOWNmMnVtcjAwMDAxcmtjYm2vbWhwb3giLCJlbWFpbCI6InJhbUBnbWFpbC5jb20iLCJpYXQiOjE3NDQzNzgzNDEsImV4cCI6MTc0NDk4MzE0MX0.XG9Z_ylyun_dOoi_hYIOZIbj77Sb7_phqLOqixi7Vjo | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: auth

undefined

## End-point: Login

### Method: POST

> ```
> http://localhost:3000/api/auth/login
> ```

### Body (**raw**)

```json
{
  "email": "ram@gmail.com",
  "password": "Ram123456"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Register

### Method: POST

> ```
> http://localhost:3000/api/auth/register
> ```

### Body (**raw**)

```json
{
  "name": "ram",
  "email": "ram@gmail.com",
  "password": "Ram123456"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
