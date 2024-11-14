import { BarChart } from '@mui/x-charts/BarChart';
import React, { useEffect, useState } from 'react';
import dataSet from './obj';
import Filters from './DatePicker2';
import Line from './Line';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [feature, setFeature] = useState("A")
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState([])

  const chartSetting = {
    xAxis: [
      {
        label: 'Time =>',
      },
    ],
    height: 500,
  };

  useEffect(() => {
    const gender = searchParams.get("gender")
    let fromDate = searchParams.get("startDate")
    fromDate = new Date(fromDate).getTime()
    let toDate = searchParams.get("endDate")
    toDate = new Date(toDate).getTime()
    const age = searchParams.get("age")

    if (gender || (fromDate && toDate)) {
      let fil = [
        {
          name: "F",
          totalTime: 0
        },
        {
          name: "D",
          totalTime: 0
        },
        {
          name: "C",
          totalTime: 0
        },
        {
          name: "B",
          totalTime: 0
        },
        {
          name: "A",
          totalTime: 0
        },
      ]

      dataSet.map((e) => {

        // only gender
        if (gender && !(fromDate && toDate)) {
          // console.log(" only gender")
          if (e.Gender === gender) {
            fil = fil.map((item) =>
              (Object.keys(e).includes(item.name)) ?
                { name: item.name, totalTime: item.totalTime + e[item.name] } : item
            )
          }
        }

        // only date
        else if (!gender && (fromDate && toDate)) {

          // console.log(" only date")

          let date = new Date(e.Day)
          date = date.getTime()
          if (date >= fromDate && date <= toDate) {
            fil = fil.map((item) =>
              (Object.keys(e).includes(item.name)) ?
                { name: item.name, totalTime: item.totalTime + e[item.name] } : item
            )
          }

        }

        // both
        else {
          // console.log("both")
          let date = new Date(e.Day)
          date = date.getTime()

          if ((e.Gender === gender) && (date >= fromDate && date <= toDate)) {
            fil = fil.map((item) =>
              (Object.keys(e).includes(item.name)) ?
                { name: item.name, totalTime: item.totalTime + e[item.name] } : item
            )
          }
        }

      })
      setData([...fil])

    } else {
      let fil = [
        {
          name: "F",
          totalTime: 0
        },
        {
          name: "D",
          totalTime: 0
        },
        {
          name: "C",
          totalTime: 0
        },
        {
          name: "B",
          totalTime: 0
        },
        {
          name: "A",
          totalTime: 0
        },
      ]

      dataSet.map((e) => {
        fil = fil.map((item) =>
          (Object.keys(e).includes(item.name)) ?
            { name: item.name, totalTime: item.totalTime + e[item.name] } : item
        )
      })
      setData([...fil])
    }
    // console.log(searchParams.get("feature"))
  }, [searchParams])

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


  const handleBarClick = (e, d) => {
    // console.log(e)
    // console.log(d.axisValue)
    setSearchParams({ ...Object.fromEntries(searchParams), feature: d.axisValue })
    setFeature(d.axisValue)
  }

  return (
    <>
      <div className='relative min-h-screen'>
        <div className='h-screen z-[2] p-1 flex flex-col xl:h-screen w-full justify-start xl:justify-center items-center'>

          <BarChart
            onAxisClick={handleBarClick}
            dataset={data}
            yAxis={[{ scaleType: 'band', dataKey: 'name', label: "Features =>" }]}
            series={[{ dataKey: 'totalTime', label: 'Total time' }]}
            layout="horizontal"
            grid={{ vertical: true, horizontal: true }}
            {...chartSetting}
          />

          <Filters />
          {/* <DatePickers onAgeChange={onAgeChange} onGenderChange={onGenderChange} getStartDate={getStartDate} getEndDate={getEndDate} /> */}
        </div>
        {searchParams.get("feature") && <Line changeFeature={feature} />}
      </div>
    </>
  );
}

export default App;


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