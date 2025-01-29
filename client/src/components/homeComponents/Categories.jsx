import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import customFetch from '../../utils/customFetch'

const Categories = () => {
  const [catBooks,setCatBooks] = useState([])
 const fetchData = async() => {
  try {
    const response = await customFetch.get('/categories')
    console.log({response})
    setCatBooks(response.data)
    
  } catch (error) {
   console.log(error) 
  }
   
 }
  useEffect(() => {
    fetchData()
  
  },[])
  return (
    <div>
      <h1>Categories</h1>
      {catBooks &&  catBooks?.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.content}</p>
        </div>
      ))}
      
    </div>
  )
}

export default Categories