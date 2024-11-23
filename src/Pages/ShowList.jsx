import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import API from '../utils/api';

const ShowList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    // Fetch books from the API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await API.get('/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    // Delete a book
    const handleDelete = async (id) => {
        try {
            await API.delete(`/books/${id}`);
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Book List</h1>
            <Button variant="primary" className="mb-3" onClick={() => navigate('/add')}>
                Add Book
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            {/* <td>{book.id}</td> */}
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.year}</td>
                            <td>{book.genre}</td>
                            <td>{book.price}</td>
                            <td>
                                 <Button
                                    variant="info"                                   size="sm"
                                   className="me-2"
                                    onClick={() => navigate(`/detail/${book.id}`)}
                           >
                                    View
                                </Button>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => navigate(`/update/${book.id}`)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(book.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ShowList;
