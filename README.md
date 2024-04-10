# Description

This project is represent the task of <a href="https://www.onethreadapp.com/"  target="_blank">OneThreat</a> NodeJs Developer.

### Task description

Create a set of API endpoints for handling CRUD operations of orders. This endpoint
should process order details (like user ID, product IDs, quantities, and payment information).
Handle GET, POST, PUT, PATCH and DELETE requests for the endpoint. Ensure that the
endpoint validates incoming data, handles exceptions, and returns appropriate responses.

# Live server Information

## App Root Link

- here is the app root link: <a href="https://one-threat-order-api.onrender.com/api" target="_blank">https://one-threat-order-api.onrender.com/api</a>

### I am Using free server of <a href="https://render.com/" target="_blank">Render</a> for deploy this application

<p>According to <a href="https://render.com/" target="_blank">Render</a>: <span style="color:red;font-weight:300">free instance will spin down with inactivity, which can delay requests by 50 seconds or more.</span></p>

### Order APIs

1.  Get Order List (GET): <a href="https://one-threat-order-api.onrender.com/api/orders" target="_blank">Order List</a>

    input of this api: this api can take 5 optional parameters.

    1. page: number
    2. per_page: number
    3. user: string (mongodb id - user id)
    4. status: string (status enum of order [received, processing, order shipped, in transit, out of delivery, delivered, completed] )
    5. paymentStatus: string (paymentStatus enum of order [pending, failed, refunded, canceled, successful])

    output of this api:

    - data
      - data[]
        - id: string
        - status: string
        - paymentStatus: string
        - total: number
        - productsWithQuantity[]
          - id: string
          - name: string
          - description: string
          - price: number
          - createdAt: Date
          - updatedAt: Date
        - user
          - id: string
          - name: string
          - email: string
          - createdAt: Date
          - updatedAt: Date
        - createdAt: Date
        - updatedAt: Date
      - meta
        - page: number
        - per_page: number
        - total_count: number
        - page_count: number
    - message: string[]
    - success: boolean

2.  Get An Order (GET): <a href="https://one-threat-order-api.onrender.com/api/orders/6614cc0d40bf95419231750a" target="_blank">Order(Id: 6614cc0d40bf95419231750a)</a>

here output will be like -

    - data
      - id: string
      - status: string
      - paymentStatus: string
      - total: number
      - productsWithQuantity[]
        - id: string
        - name: string
        - description: string
        - price: number
        - createdAt: Date
        - updatedAt: Date
      - user
        - id: string
        - name: string
        - email: string
        - createdAt: Date
        - updatedAt: Date
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

1.  Create an Order (POST): endpoint is -> https://one-threat-order-api.onrender.com/api/orders

    input of the api is: {user: string(user id), productsWithQuantity: array of object, object have {product: sting(product id), quantity: number}}. can create a new order with valid user and products id via Postman/Insomnia.

    here output will be like -

    - data
      - id: string
      - status: string
      - paymentStatus: string
      - total: number
      - productsWithQuantity[]
        - id: string
        - name: string
        - description: string
        - price: number
        - createdAt: Date
        - updatedAt: Date
      - user
        - id: string
        - name: string
        - email: string
        - createdAt: Date
        - updatedAt: Date
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

2.  Update an Order (PATCH): endpoint is -> https://one-threat-order-api.onrender.com/api/orders/6614cc0d40bf95419231750a

    input of the api is: {status: string, paymentStatus: status}. currently this api can update only the order status and payment status. you can update an order by postman/insomnia.

    here output will be like -

    - data
      - id: string
      - status: string
      - paymentStatus: string
      - total: number
      - productsWithQuantity[]
        - id: string
        - name: string
        - description: string
        - price: number
        - createdAt: Date
        - updatedAt: Date
      - user
        - id: string
        - name: string
        - email: string
        - createdAt: Date
        - updatedAt: Date
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

3.  Delete an Order (DELETE): end-point is -> https://one-threat-order-api.onrender.com/api/orders/6614cc0d40bf95419231750a

    this api update order's delete and deletedAt field and make it true, new Date(). so it is ensuring data will never permanently deleted from database.

    here output will be like -

    - data
      - id: string
      - status: string
      - paymentStatus: string
      - total: number
      - productsWithQuantity[]
        - id: string
        - name: string
        - description: string
        - price: number
        - createdAt: Date
        - updatedAt: Date
      - user
        - id: string
        - name: string
        - email: string
        - createdAt: Date
        - updatedAt: Date
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

## I Also developed User and Product apis

### User APIs

1.  Get User List (GET): <a href="https://one-threat-order-api.onrender.com/api/users" target="_blank">user List</a>

    input of this api: this api can take 3 optional parameters.

    1. page: number
    2. per_page: number
    3. query_text: string (passing this you can find user by name)

    output of this api:

    - data
      - data[]
        - id: string
        - name: string
        - email: string
        - createdAt: Date
        - updatedAt: Date
      - meta
        - page: number
        - per_page: number
        - total_count: number
        - page_count: number
    - message: string[]
    - success: boolean

2.  Get An User (GET): <a href="https://one-threat-order-api.onrender.com/api/users/661386b463eb22abed701038" target="_blank">User(Id: 661386b463eb22abed701038)</a>

    here output will be like -

    - data
      - id: string
      - name: string
      - email: string
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

3.  Create an User (POST): endpoint is -> https://one-threat-order-api.onrender.com/api/users

    input of the api is: {name: string, email: string}. can create a new user. here email should be unique

    here output will be like -

    - data
      - id: string
      - name: string
      - email: string
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

4.  Update an User (PATCH): endpoint is -> https://one-threat-order-api.onrender.com/api/users/661386b463eb22abed701038

    input of the api is: {name: string, email: string}. currently this api can update only the name of user but it takes email for extra checking. you can update an user by postman/insomnia.

    here output will be like -

    - data
      - id: string
      - name: string
      - email: string
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

5.  Delete an User (DELETE): end-point is -> https://one-threat-order-api.onrender.com/api/users/661386b463eb22abed701038

    this api update user's delete and deletedAt field and make it true, new Date(). so it is ensuring data will never permanently deleted from database.

    here output will be like -

    - data
      - id: string
      - name: string
      - email: string
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

### Product APIs

1.  Get Product List (GET): <a href="https://one-threat-order-api.onrender.com/api/products" target="_blank">product List</a>

    input of this api: this api can take 3 optional parameters.

    1. page: number
    2. per_page: number
    3. query_text: string (passing this you can find product by name)

    output of this api:

    - data
      - data[]
        - id: string
        - name: string
        - description: string
        - price: number
        - createdAt: Date
        - updatedAt: Date
      - meta
        - page: number
        - per_page: number
        - total_count: number
        - page_count: number
    - message: string[]
    - success: boolean

2.  Get An Product (GET): <a href="https://one-threat-order-api.onrender.com/api/products/66143411976b93019d435d07" target="_blank">Product(Id: 66143411976b93019d435d07)</a>

    here output will be like -

    - data
      - id: string
      - name: string
      - description: string
      - price: number
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

3.  Create an Product (POST): endpoint is -> https://one-threat-order-api.onrender.com/api/products

    input of the api is: {name: string, description: string, price: number}.
    here output will be like -

    - data
      - id: string
      - name: string
      - description: string
      - price: number
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

4.  Update an User (PATCH): endpoint is -> https://one-threat-order-api.onrender.com/api/products/66143411976b93019d435d07

    input of the api is: {name: string, description: string, price: number}. you can update an user by postman/insomnia.

    here output will be like -

    - data
      - id: string
      - name: string
      - description: string
      - price: number
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

5.  Delete an Product (DELETE): end-point is -> https://one-threat-order-api.onrender.com/api/products/66143411976b93019d435d07

    this api update products's delete and deletedAt field and make it true, new Date(). so it is ensuring data will never permanently deleted from database.

    here output will be like -

    - data
      - id: string
      - name: string
      - description: string
      - price: number
      - createdAt: Date
      - updatedAt: Date
    - message: string[]
    - success: boolean

# Instruction of Running the app in local machine

### Make sure you installed the latest version of NodeJs on you machine

### create .env file in the root, copy .env.example and paste in the .env file

```bash
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
