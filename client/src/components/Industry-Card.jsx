import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
 
function IndustryCard() {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages
 
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category'); // Ensure this matches your route
        console.log('Fetched categories:', response.data); // Log the fetched data
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories.'); // Set error message
      }
    };
 
    fetchCategory();
  }, []);
 
  return (
    <div>
      <div className="card categories-indutries">
                    <div className="card-header style-card-header">
                        Industries
                    </div>
                    <div className="card-body p-0 px-3">
                        <ul>
                        {category.map(category => (
              <li key={category.id}>
                <Link to = {`/${category.slug}/`}>
                  {category.title}
                </Link>
              </li>
            ))}
                        </ul>
                    </div>
                </div>
    </div>
  );
}
 
export default IndustryCard;