import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const BookModal = ({ show, onHide, onSave, book }) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        author: '',
 year: '',
        genre: '',
        price: ''
    });

    useEffect(() => {
        if (book) {
            setFormData(book); // Populate form with selected book data for editing
        } else {
            setFormData({
                id: '',
                title: '',
                author: '',
                year: '',
                genre: '',
                price: ''
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
         setFormData({
        id: '',
        title: '',
        author: '',
        year: '',
        genre: '',
        price: ''
    });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{book ? 'Edit Book' : 'Add New Book'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BookModal;