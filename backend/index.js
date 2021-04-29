// We need express first
const express = require("express")

// Create an object from the express
const app = express()

// Bind the app
app.use(express.json())

const books = [
	{ id: 1, title: "Python programming" },
	{ id: 2, title: "JavaScipt programming" },
	{ id: 3, title: "Django programming" },
	{ id: 4, title: "Django Rest Framework programming" },
]


app.get("/", (req, res) => {
	res.send('Welcome to study Automation')
})

// API Gateway to return data
app.get("/api/books", (req, res) => {
	res.send(books)
})

// API Gateway to return single data
app.get("/api/books/:id", (req, res) => {
	const book = books.find(b => b.id === parseInt(req.params.id))
	
	if (!book) res.status(404).send("Book not found...")

	res.send(book)
})

// API Gateway to post a new book
app.post("/api/books/addbook", (req, res) => {
	const book = {
		id: books.length + 1,
		title: req.body.title
	}

	books.push(book)

	res.send(books)
})

// API Gateway to update a book
app.put("/api/books/:id", (req, res) => {
	const book = books.find(b => b.id === parseInt(req.params.id))
	
	if (!book) res.status(404).send("Book not found...")

	book.title = req.body.title

	res.send(books)
})

// API Gateway to delete a book
app.delete("/api/books/:id", (req, res) => {
	const book = books.find(b => b.id === parseInt(req.params.id))
	if (!book) res.status(404).send("Book not found...")

	const index = books.indexOf(book)
	books.splice(index, 1)
	res.send(books)
})


// Bind the gateway with a server
app.listen(5000)