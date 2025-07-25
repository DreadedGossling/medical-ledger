import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const Product = () => {
  const path = useParams()
  const productId = path.product

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${productId}`)
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProduct()
  }, [])

  return (
    <>
      <div>
        <h1></h1>
        <span>hello{" " + productId}</span>
      </div>
    </>
  )
}

export default Product
