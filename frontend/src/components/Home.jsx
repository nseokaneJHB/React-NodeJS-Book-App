import { useState, useEffect } from 'react';
import axios from 'axios';

import { v4 as id } from 'uuid';

// External Components
import { MDBInput, MDBBtn, MDBCard, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

	const url = "http://localhost:5000/api/v1/books";

	const [allBooks, setAllBooks] = useState([]);
	const [updateBook, setUpdateBook] = useState(null);
	const [book, setBook] = useState({});

	const watchBookTitle = (e) => {
		setBook({...book, title: e.target.value})
	}

	const submitBook = (e) => {
		e.preventDefault()
		if (!book.title) {
			errorMessage()
			return
		}

		if (!updateBook) {
			axios.post(url, book)
			.then(response => {
				successMessage('Book Successfully Added!')
			})
			.catch(error => {
				console.error('There was an error!', error);
			})	
		}else{
			setBook({...updateBook, title: book.title})

			axios.put(`${url}/${book.id}`, book)
			.then(response => {
				successMessage('Book Successfully Updated!')
			})
			.catch(error => {
				console.error('There was an error!', error);
			})

			setUpdateBook(null)
		}
		setBook({title: ""})
	}

	const editBook = (mybook) => {
		setBook({...mybook, title: mybook.title})
		setUpdateBook(mybook)
	}

	const deleteBook = (mybook) => {
		axios.delete(`${url}/${mybook.id}`)
		.then(response => {
			warningMessage()
		})
		.catch(error => {
			console.error('There was an error!', error);
		})	
	}

	// Toasts
	const successMessage = (message) => toast.success(message, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	});

	const warningMessage = () => toast.warn('Book Successfully Deleted!', {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	});

	const errorMessage = () =>  toast.error('Cannot submit a book with no title!', {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	});

	useEffect(() => {
		axios.get(url)
		.then(response => {
			setAllBooks(response.data)
		})
		.catch(error => {
			console.error('There was an error!', error);
		});
	}, [allBooks])

	return (
		<div>
			<h1 className="text-center pt-4">Books Application</h1>

			<div className="main">
				<ToastContainer />
				<form className="form" onSubmit={submitBook}>
					<MDBInput type="text" icon="tasks" label="Enter book title" value={book.title} onChange={watchBookTitle} />
					<MDBBtn color="default" type="submit">Submit</MDBBtn>
				</form>
				<div>
					<MDBCard className="card-body bg-teal">
						<MDBRow>
							<MDBCol size="1">#</MDBCol>
							<MDBCol size="9">Title</MDBCol>
							<MDBCol>Actions</MDBCol>
						</MDBRow>
					</MDBCard>

					{ allBooks.length > 0 ? allBooks.map(book => (
						<MDBCard key={book.id} className="card-body">
							<MDBRow>
								<MDBCol size="1">{book.id}</MDBCol>
								<MDBCol size="9">{book.title}</MDBCol>
								<MDBCol className="action-icons">
									<MDBIcon className="cyan-text" far icon="edit" onClick={() => editBook(book)} /> 
									<MDBIcon type="button" className="red-text" far icon="trash-alt" onClick={() => deleteBook(book)} />
								</MDBCol>
							</MDBRow>
						</MDBCard> 
						))
						: 
						<p className="text-center">No books yet</p>
					}
				</div>
			</div>
		</div>
	)
}

export default Home
