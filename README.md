# Recipe API

RESTful API for users, recipes, and categories using Express + MongoDB Atlas + JWT.

## Setup

1. Install dependencies: `npm install`
2. Create `.env` with:
   - `PORT=3000`
   - `MONGO_URI=<your_mongodb_atlas_connection_string>`
   - `JWT_SECRET=<your_jwt_secret>`
3. Run server: `node app.js`

## Roles

- **Guest**: Can read public recipes and categories.
- **Registered User**: Guest permissions + create/update/delete own recipes + manage own password/account.
- **Admin**: Full user-management access and can manage any recipe/user.

## API Endpoints

| Resource | Method | Endpoint | Auth | Description |
| --- | --- | --- | --- | --- |
| Users | POST | `/api/users/signup` | No | Register user |
| Users | POST | `/api/users/login` | No | Login and get JWT |
| Users | GET | `/api/users` | Admin | Get all users |
| Users | PATCH | `/api/users/:id/password` | User/Admin | Update password |
| Users | DELETE | `/api/users/:id` | User/Admin | Delete user |
| Recipes | GET | `/api/recipes?search=&limit=&page=` | Optional | List recipes with search + paging + privacy filtering |
| Recipes | GET | `/api/recipes/:id` | Optional | Get recipe by id (private visibility rules apply) |
| Recipes | GET | `/api/recipes/time/:minutes` | Optional | Get recipes by max preparation time |
| Recipes | POST | `/api/recipes` | User/Admin | Add recipe |
| Recipes | PUT | `/api/recipes/:id` | Owner/Admin | Update recipe |
| Recipes | DELETE | `/api/recipes/:id` | Owner/Admin | Delete recipe |
| Recipes | GET | `/api/recipes/user/:userId` | User/Admin | Get recipes by user |
| Categories | GET | `/api/categories` | No | Get all categories |
| Categories | GET | `/api/categories/all/recipes` | Optional | Get categories including recipes |
| Categories | GET | `/api/categories/:codeOrName` | Optional | Get category by code/description with recipes |

## Error Format

All errors are returned as:

```json
{
  "error": {
    "message": "..."
  }
}
```
