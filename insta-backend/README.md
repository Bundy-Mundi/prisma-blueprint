# Instagram Clone Backend

## Progress

- [X] Create Account
- [X] See Profile
- [X] Login
- [X] Edit Profile
- [X] Basic Authentication
- [ ] Upload Files

## Get started

### Installation only for backend

```bash
npm install
```

### Set up Environment Variables

- `DATABASE_URL`: This is required to connect `postgresql` to `prisma`
- `PORT`: Sever port number
- `SALT`: Password hash salt
- `SECRET`: Secret for Json Web Token(JWT)

### Dev mode

- Run development mode

    ```bash
    npm run dev
    ```

- Prisma migration

    ```bash
    npm run migrate
    ```

- Run Prisma Studio

    ```bash
    npm run studio
    ```

### Prod mode

