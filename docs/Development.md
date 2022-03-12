# [Antonio Papa] NodeJS Microservices: Breaking a Monolith to Microservices [ENG, 2022]

<br/>

## 02 - The Monolith

<br/>

### 001 Setup

<br/>

### Prepare Backend

```
$ cd node-ambassador
$ npm install
```

<br/>

```
$ docker-compose up
```

<br/>

```
$ docker-compose exec backend sh
```

<br/>

```
{
    npm run seed:ambassadors
    npm run seed:products
    npm run seed:links
    npm run seed:orders
}
```

<br/>

```
// stop / start docker-compose

***
node-ambassador-db-1       | mbind: Operation not permitted
node-ambassador-backend-1  | listening to port 8000
```

<br/>

### Prepare Frontend

<br/>

```
$ cd react-ambassador/react-admin
$ npm install
$ npm start
```

<br/>

```
$ cd react-ambassador/react-ambassador
$ npm install
$ npm start
```

<br/>

```
$ cd react-ambassador/next-checkout
$ npm install
$ npm run dev
```

<br/>

### 002 Stripe Keys

stipe.com

<br/>

```
next-checkout/constraints.ts
node-ambassador/.env
```

<br/>

https://github.com/mailhog/MailHog

mailhog

<br/>

## 03 - Email Microservices

<br/>

```
$ mkdir email && cd email
$ npm init -y

$ npm install nodemailer
$ npm install -D @types/nodemailer nodemon ts-node typescript
```

<br/>

### 003 Kafka Setup

**I will use local kafka**

<br/>

### 005 Consuming Kafka Messages

<br/>

```
$ mkdir email && cd email
$ npm install kafkajs
$ npm install -D @types/kafkajs
```

<br/>

```
$ npm run start
```

<br/>

```
// Create a Message
$ kafka-console-producer.sh \
    --broker-list localhost:9092 \
    --topic default
```

<br/>

```
{"test":"test"}

^C
```

<br/>

**response:**

<br/>

```
{ test: 'test' }
```

<br/>

### 006 Producing Kafka Messages

<br/>

```
$ cd node-ambassador/

$ npm install kafkajs
$ npm install -D @types/kafkajs
```

<br/>

## 04 - Users Microservice

<br/>

```
$ mkdir users && cd users
$ npm install

$ docker-compose up
```

<br/>

### 003 Importing Data

<br/>

**user.entity.ts**

need remove select, make seed:users and return as was.

<br/>

```
  @Column({
    select: false,
  })
  password: string;
```

<br/>

```
$ docker-compose up
$ docker-compose exec users_backend sh
$ npm run seed:users
```

<br/>

```
$ cd ../node-ambassador/

$ npm install axios
$ npm install -D @types/axios
```

<br/>

```
// REGISTER
$ curl \
    --data '{
      "first_name":"FirstName",
      "last_name":"LastName",
      "password":"123456789",
      "password_confirm":"123456789",
      "email":"marley1@example.com"}' \
    --header "Content-Type: application/json" \
    --request POST \
    --url http://localhost:8000/api/admin/register \
    | jq
```

<br/>

### 005 Login

<br/>

```
// LOGIN
$ curl \
    --data '{
      "email":"marley1@example.com",
      "password":"123456789"
      }' \
    --header "Content-Type: application/json" \
    --request POST \
    --url http://localhost:8000/api/admin/login \
    | jq
```

<br/>

```
{
  "message": "success"
}

```

<br/><br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
