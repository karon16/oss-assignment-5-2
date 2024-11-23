import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import API from '../utils/api';

const Detail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await API.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Price:</strong> ${book.price}</p>
    </div>
  );
};

export default Detail;