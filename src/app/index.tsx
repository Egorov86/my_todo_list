import React from 'react'
import { RouterProvider } from '@remix-run/react-router'
import router from './router'

const App = () => (
  <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
)

export default App