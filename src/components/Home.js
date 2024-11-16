import { BarChart } from '@mui/x-charts/BarChart';
import React, { useEffect, useState } from 'react';
// import dataSet from '../obj';
import Filters from './Filter';
import Line from './Line';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { authRoute } from '../apis/axios'
import Nav from './Nav';
import { login } from '../redux/functions/auth';
import axios from 'axios';

function Home({ dataSet }) {
  const [feature, setFeature] = useState("A")
  // const [dataSet, setDataSet] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const { user } = useSelector(state => state.authSlice)
  const dispatch = useDispatch()

  const chartSetting = {
    xAxis: [
      {
        label: 'Time =>',
      },
    ],
    height: 500,
  };

  useEffect(() => {
    // given parameters
    const gender = searchParams.get("gender")
    let fromDate = searchParams.get("startDate")
    fromDate = new Date(fromDate).getTime()
    let toDate = searchParams.get("endDate")
    toDate = new Date(toDate).getTime()
    const isDate = fromDate && toDate
    const age = searchParams.get("age")

    const initializeFil = () => [
      { name: "F", totalTime: 0 },
      { name: "D", totalTime: 0 },
      { name: "C", totalTime: 0 },
      { name: "B", totalTime: 0 },
      { name: "A", totalTime: 0 },
    ];

    if (gender || (fromDate && toDate) || age) {
      let fil = initializeFil()

      //  filtering items based on given parameters
      dataSet.forEach((item) => {

        // Check filters
        const matchesGender = item.Gender === gender
        const matchesAge = item.Age === age
        let date = new Date(item.Day)
        date = date.getTime()
        const matchesDate = date >= fromDate && date <= toDate


        // only gender
        if (gender && !isDate && !age) {
          if (matchesGender) {
            fil = fil.map((e) =>
              (Object.keys(item).includes(e.name)) ?
                { name: e.name, totalTime: e.totalTime + item[e.name] } : e
            )
          }
        }


        // only age
        else if (age && !gender && !isDate) {
          if (matchesAge) {
            fil = fil.map((e) =>
              (Object.keys(item).includes(e.name)) ?
                { name: e.name, totalTime: e.totalTime + item[e.name] } : e
            )
          }
        }

        // only date
        else if (isDate && !age && !isDate) {
          if (matchesDate) {
            fil = fil.map((e) =>
              (Object.keys(item).includes(e.name)) ?
                { name: e.name, totalTime: e.totalTime + item[e.name] } : e
            )
          }
        }

        // gender + age
        else if (gender && age && !isDate) {
          if (matchesGender && matchesAge) {
            fil = fil.map((e) =>
              (Object.keys(item).includes(e.name)) ?
                { name: e.name, totalTime: e.totalTime + item[e.name] } : e
            )
          }
        }

        // gender + Date
        else if (gender && isDate && !age) {
          if (matchesGender && matchesDate) {
            fil = fil.map((e) =>
              (Object.keys(item).includes(e.name)) ?
                { name: e.name, totalTime: e.totalTime + item[e.name] } : e
            )
          }
        }

        // age + Date
        else if (age && isDate && !gender) {
          if (matchesAge && matchesDate) {
            fil = fil.map((e) =>
              (Object.keys(item).includes(e.name)) ?
                { name: e.name, totalTime: e.totalTime + item[e.name] } : e
            )
          }
        }

        // all
        else {
          if (matchesGender && matchesDate && matchesAge) {
            fil = fil.map((e) =>
              (Object.keys(item).includes(e.name)) ?
                { name: e.name, totalTime: e.totalTime + item[e.name] } : e
            )
          }
        }

      })
      setData([...fil])

    } else {
      let fil = initializeFil()

      dataSet.forEach((e) => {
        fil = fil.map((item) =>
          (Object.keys(e).includes(item.name)) ?
            { name: item.name, totalTime: item.totalTime + e[item.name] } : item
        )
      })
      setData([...fil])
    }
  }, [searchParams, dataSet])

  useEffect(() => {
    // window.location.replace(`name?saurav`);
    const storedPreferences = localStorage.getItem('preferences');

    // Only redirect if preferences exist in localStorage
    if (storedPreferences) {
      console.log(storedPreferences)
      try {
        const preferences = JSON.parse(storedPreferences);

        // Check if the current URL parameters are different from the stored preferences
        const currentParams = Object.fromEntries(searchParams.entries());
        if (JSON.stringify(currentParams) !== JSON.stringify(preferences)) {
          // Update the URL with preferences from localStorage
          const newSearchParams = new URLSearchParams(preferences).toString();
          window.location.replace(`${window.location.pathname}?${newSearchParams}`);
        }
      } catch (error) {
        console.error("Error parsing preferences from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem('token')) {
        try {

          const result = await authRoute.get('/fetchuser', {
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          })
          // console.log(result)
          dispatch(login({ ...result.data.data }))
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/auth')
    }
  }, [user])


  const handleBarClick = (e, d) => {
    // console.log(e)
    // console.log(d.axisValue)
    setSearchParams({ ...Object.fromEntries(searchParams), feature: d.axisValue })
    setFeature(d.axisValue)
  }

  return (
    <>
      <div className='relative min-h-screen'>
        <Nav />
        <div className='h-screen z-[2] p-1 flex flex-col xl:h-screen w-full justify-start xl:justify-center items-center'>

          {dataSet.length > 0 ?

            <BarChart
              onAxisClick={handleBarClick}
              dataset={data}
              yAxis={[{ scaleType: 'band', dataKey: 'name', label: "Features =>" }]}
              series={[{ dataKey: 'totalTime', label: 'Total time' }]}
              layout="horizontal"
              grid={{ vertical: true, horizontal: true }}
              {...chartSetting}
            /> :
            <h1 className='text-5xl my-9'>Loading please wait...</h1>
          }

          <Filters />
          {/* <DatePickers onAgeChange={onAgeChange} onGenderChange={onGenderChange} getStartDate={getStartDate} getEndDate={getEndDate} /> */}
        </div>
        {searchParams.get("feature") && <Line changeFeature={feature} />}
      </div>
    </>
  );
}

export default Home;


// https://script.googleusercontent.com/macros/echo?user_content_key=rutYObUeEi1iteXlfH1pQMss3ckm6bZLa78KVD3BDlkjN49EXxT1WzX8SLOFfYDdLYoPo0iNNPCXjpp5QWcGKlPVGlYTzdi2m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFgZpwzUfXBD-QIELd4yOHBt1WX-k1G3uWvG18dvJGdi7GEGAvYZgPeJhQJZXEl2AqzjQAnQ0LXzwERmOfvlkPvb65B0uVIXYQ&lib=MGZZEC0y0QJot7jTf8eYN4E0Md9AGQDbH


// {/* <div>
//         <label htmlFor="from">From</label>
//         <input id="from" type="date" name="" onChange={onFromDateChange} />
//       </div>
//       <div>
//         <label htmlFor="to">To</label>
//         <input id="to" type="date" name="" onChange={onToDateChange} />
//       </div>
//       <select onChange={onGenderChange}>
//         <option disabled selected value={"none"}> -- select an option -- </option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//         <option value="None">None</option>
//       </select> */}