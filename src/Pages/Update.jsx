import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import API from '../utils/api';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: '',
        genre: '',
        price: ''
    });
    const [changeCount, setChangeCount] = useState(0);
    
    // Refs for validation
    const titleRef = useRef();
    const authorRef = useRef();
    const yearRef = useRef();
    const genreRef = useRef();
    const priceRef = useRef();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await API.get(`/books/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };
        fetchBook();
    }, [id]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setChangeCount(prevCount => prevCount + 1);

        // Validation check
        if (name === 'title' && titleRef.current.value.trim() === '') {
            titleRef.current.setCustomValidity('Title cannot be empty');
        } else {
            titleRef.current.setCustomValidity('');
        }

        // Add similar validation checks for other fields...

        try {
            await API.put(`/books/${id}`, { ...formData, [name]: value });
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Update Book</h1>
            <p>Total changes made: {changeCount}</p>
            <Form>
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
                <Button variant="primary" onClick={() => navigate('/')}>
                    Save
                </Button>
            </Form>
        </div>
    );
};

export default Update;