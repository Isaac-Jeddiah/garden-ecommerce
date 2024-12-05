import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MetaData from './layouts/MetaData';

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/api/v1/blogs');
                setBlogs(data.blogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <>
            <MetaData title={'Plant Care Blogs'} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-green-600 dark:text-green-400">Plant Care Blogs</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <div key={blog._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">{blog.title}</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{blog.excerpt}</p>
                                <Link to={`/blog/${blog._id}`} className="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">Read More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

