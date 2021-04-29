const express = require("express")
const mongoClient = require('mongodb').MongoClient
const cors = require('cors')
const app = express()

// Swagger documentation
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

app.use(cors())
let database;

// Definitions
const options = {
	definition: {
		openapi : '3.0.0',
		info: {
			title: 'NodeJS API Project for mongodb',
			version: '1.0.0'
		},
		servers: [
			{
				url: 'http://localhost:5000/'
			}
		]
	},
	apis: ['./mongodb.js']
}

// Use the api
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// We want to use json data types
app.use(express.json())

/**
 * @swagger
 * /api/v1:
 *  get:
 *   summary: GET METHOD (Test api link)
 *   description: Test if Get method is working or not
 *   responses:
 *    200:
 *     description: Test Get method
 */

app.get('/api/v1', (req, res) => {
	res.send("Welcome to mongoDB API")
})

// Schema
/**
 * @swagger
 * components:
 *  schema:
 *   Book:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *     title:
 *      type: string
 */

/**
 * @swagger
 * /api/v1/books:
 *  get:
 *   summary: GET METHOD (Get all books)
 *   description: Fetch data from the mongodb
 *   responses:
 *    200:
 *     description: Fetch data from the mongodb
 *     content: 
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#components/schema/Book'
 */

// Get all records
app.get('/api/v1/books', (req, res) => {
	database.collection("books").find({}).toArray((error, results) => {
		if (error) throw error
		res.send(results)
	})
})

/**
 * @swagger
 * /api/v1/books/{id}:
 *  get:
 *   summary: GET METHOD (Get a specific book)
 *   description: Fetch data from the mongodb
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Numeric ID required
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Fetch data from the mongodb
 *     content: 
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#components/schema/Book'
 */

// Get a specific record
app.get('/api/v1/books/:id', (req, res) => {
	database.collection("books").find({id: parseInt(req.params.id)}).toArray((error, results) => {
		if (error) throw error
		res.send(results)
	})
})

/**
 * @swagger
 * /api/v1/books:
 *  post:
 *   summary: POST METHOD (Create a new book)
 *   description: Insert data to the mongodb
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#components/schema/Book'
 *   responses:
 *    200:
 *     description: Added successfully!
 */

// Add new record
app.post('/api/v1/books', (req, res) => {
	database.collection("books").find({}).toArray((error, results) => {
		if (error) throw error
	
		results.sort((lowest, highest) => (lowest.id > highest.id) ? 1 : -1)

		let book = {
			id: results[results.length - 1].id + 1,
			title: req.body.title
		}

		database.collection('books').insertOne(book, (error, results) => {
			if (error) res.status(500).send(error)
			res.send("Book successfully added!")
		})
	})
})

/**
 * @swagger
 * /api/v1/books/{id}:
 *  put:
 *   summary: PUT METHOD (Update a book)
 *   description: Update data from the mongodb
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Numeric ID required
 *      schema:
 *       type: integer
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#components/schema/Book'
 *   responses:
 *    200:
 *     description: Updated successfully!
 *     content: 
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#components/schema/Book'
 */

// Update a record
app.put('/api/v1/books/:id', (req, res) => {
	let query = { id: parseInt(req.params.id) } 
	let book = {
		id: parseInt(req.params.id),
		title: req.body.title
	}

	let dataSet = {
		$set: book
	}

	database.collection('books').updateOne(query, dataSet, (error, results) => {
		if (error) throw error

		res.send(book)
	})
})

/**
 * @swagger
 * /api/v1/books/{id}:
 *  delete:
 *   summary: DELETE METHOD (Purge a book)
 *   description: Delete data from the mongodb
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Numeric ID required
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Deleted successfully!
 */

// Delete a record
app.delete('/api/v1/books/:id', (req, res) => {
	database.collection('books').deleteOne({id: parseInt(req.params.id)}, (error, results) => {
		if (error) throw error

		res.send("Book successfully deleted!")
	})
})

// Connecting with mongodb database
app.listen(5000, () => {
	mongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true}, (error, results) => {
		if (error) throw error

		// Database to connect to
		database = results.db("FULL-STACK-DATABASE")
		console.log("Connection successful");
	}) 
})