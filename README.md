# marketplace-service
## Stack
- Node Js v16
- TypeScript
- MySQL

## Development quick start

### Setting up development environment

1. Clone repository

```bash
git clone .....
```

2. Install dependencies

```bash
npm install
```

### Running application in development mode

```bash
npm run start
```


### Building distribution code

```bash
npm run build
```

## Building docker image

```bash
docker build -t marketplace-service:latest Dockerfile.prod
```

## Docker-compose

Project contains `docker-compose.yml` for development environment.
Run `docker-compose up -d --build` to run development stack.

## Configuration

application already contains the `.env.*` file

### Database
It is use MySQL as database. Add the secrets of this in the .env file.

## Authentication
The application uses JWT RSA for authentication, the application already contains the keys, it is not necessary to generate them.
the authentication token must be in the header.
```bash
Authorization: Bearer eyJhbGciOi......SecCQBTANGc
```

## Production deployment

For `production` deployment of application:

1. Create container image `docker build -t marketplace-service:latest Dockerfile.prod`

```bash
docker run -d -p 8080:8080 --name marketplace-service marketplace-service:latest
```

- Application is accessible via port `8080`

## Endpoints
Basically there are two groups, public and private.

### Public endpoints
To register:
```bash
/api/auth/sing-up
```
To get a token:
```bash
/api/auth/sing-in
```

### Private endpoints
It is necessary to have the authentication token in the header. A postman collection has been added, please check it for more details.

Relevant details:

```bash
POST /api/products/
```
Creates a product and associates it with the authenticated user

```bash
GET /api/products/my-products/
```
Gets the products of the authenticated user

```bash
POST /api/transactions/
```
Creates a purchase/transaction, the purchaser is the authenticated user

```bash
GET /api/transactions/my-sales
```
Gets a detail of the sales/transactions of your products from the authenticated user

```bash
GET /api/transactions/my-transactions
```
Gets the purchases/transactions made from the authenticated user.