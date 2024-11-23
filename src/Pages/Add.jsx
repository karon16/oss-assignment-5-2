import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import API from '../utils/api';

const Add = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
 year: '',
        genre: '',
        price: ''
    });

    // Refs for validation
    const titleRef = useRef();
    const authorRef = useRef();
    const yearRef = useRef();
    const genreRef = useRef();
    const priceRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validation check
        if (name === 'title' && titleRef.current.value.trim() === '') {
            titleRef.current.setCustomValidity('Title cannot be empty');
        } else {
            titleRef.current.setCustomValidity('');
        }

        // Add similar validation checks for other fields...
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/books', { ...formData, id: `${Date.now()}` });
            navigate('/');
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Add Book</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        ref={titleRef}
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
                        ref={authorRef}
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
                        ref={yearRef}
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
                        ref={genreRef}
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
                        ref={priceRef}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
};

export default Add;