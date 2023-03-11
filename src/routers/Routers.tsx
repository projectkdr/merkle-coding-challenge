import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../views/Layout/Layout'
import News from '../views/Layout/News/News'

const Routers = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route
                    path="/"
                    element={<News />}
                />
                {/* <Route
                    path="/story/:storyId"
                    element={<NewsStory />}
                /> */}
            </Route>
        </Routes>
    </BrowserRouter>
)

export default Routers
