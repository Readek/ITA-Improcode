import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './pages/root'
import ErrorPage from './error-page'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import "./assets/global.css"
import MapPage from './pages/map'
import CalendarPage from './pages/calendar'
import ChartsPage from './pages/charts'

const router = createHashRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Map",
    element: <MapPage/>,
  },
  {
    path: "/Calendar",
    element: <CalendarPage/>,
  },
  {
    path: "/Charts",
    element: <ChartsPage/>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
