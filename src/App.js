import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import ErrorPage from "./components/ErrorPage"
import axios from 'axios';

function App() {
  const [dataSet, setDataSet] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(process.env.REACT_APP_DATASET_API)
      // console.log(result.data)
      setDataSet([...result.data])
    }
    fetchData()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home dataSet={dataSet} />
    },
    {
      path: "/auth",
      element: <Auth />
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ])

  return (
    <>
      <div className='relative min-h-screen'>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;


// https://script.googleusercontent.com/macros/echo?user_content_key=rutYObUeEi1iteXlfH1pQMss3ckm6bZLa78KVD3BDlkjN49EXxT1WzX8SLOFfYDdLYoPo0iNNPCXjpp5QWcGKlPVGlYTzdi2m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFgZpwzUfXBD-QIELd4yOHBt1WX-k1G3uWvG18dvJGdi7GEGAvYZgPeJhQJZXEl2AqzjQAnQ0LXzwERmOfvlkPvb65B0uVIXYQ&lib=MGZZEC0y0QJot7jTf8eYN4E0Md9AGQDbH
