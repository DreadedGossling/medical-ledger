import React from 'react'

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-lg mb-6">Page Not Found</p>
          <a
            href="/"
            className="text-blue-500 underline hover:text-blue-700 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    </>
  )
}

export default NotFound
