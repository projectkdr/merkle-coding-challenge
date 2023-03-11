import React from 'react'
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom'
import Layout from '../views/Layout/Layout'
import News from '../views/Layout/News/News'

const Routers = () => (
  <HashRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<News />} />
      </Route>
    </Routes>
  </HashRouter>
)

export default Routers
