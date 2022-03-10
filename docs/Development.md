# [Antonio Papa] NodeJS Microservices: Breaking a Monolith to Microservices [ENG, 2022]


<br/>

## 02 - The Monolith

<br/>

### 001 Setup

<br/>

### Prepare Backend

```
$ cd apps/api/node-ambassador
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
npm run seed:ambassadors
npm run seed:products
npm run seed:links
npm run seed:orders
npm run update:rankings
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
$ cd apps/client/react-ambassador/react-admin
$ npm install
$ npm start
```

<br/>


```
$ cd apps/client/react-ambassador/react-ambassador
$ npm install
$ npm start
```

<br/>

```
$ cd apps/client/react-ambassador/next-checkout
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


<br/><br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>