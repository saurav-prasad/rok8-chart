import { LineChart } from '@mui/x-charts/LineChart';
import { toLocaleString, useEffect, useState } from 'react';
import dataSet from './obj';
import DatePickers from './DatePicker';
import { useSearchParams } from 'react-router-dom';

export default function Line({ changeFeature }) {
    const [xData, setXData] = useState([])
    const [yData, setYData] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    const feature = changeFeature

    const handleClose = (e) => {
        // Create a copy of the current search parameters
        const newParams = new URLSearchParams(searchParams);

        // Delete the specified parameter
        newParams.delete("feature");

        // Update the search parameters
        setSearchParams(newParams);
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const gender = searchParams.get("gender")
        let fromDate = searchParams.get("startDate")
        fromDate = new Date(fromDate).getTime()
        let toDate = searchParams.get("endDate")
        toDate = new Date(toDate).getTime()
        const age = searchParams.get("age")

        const feature = searchParams.get('feature')
        if (gender || (fromDate && toDate)) {
            let x = []
            let y = []

            dataSet.map((e) => {

                // only gender
                if (gender && !(fromDate && toDate)) {
                    // console.log(" only gender")
                    if (e.Gender === gender) {
                        let date = new Date(e.Day)
                        const dateString = `${date?.getDate()}-${date?.toLocaleString('default', { month: 'short' })}`
                        x = [...x, dateString]
                        let totalTime = e[feature]
                        y = [...y, totalTime]
                    }
                }

                // only date
                else if (!gender && (fromDate && toDate)) {

                    // console.log(" only date")

                    let date = new Date(e.Day)
                    date = date?.getTime()

                    if (date >= fromDate && date <= toDate) {
                        let date = new Date(e.Day)
                        const dateString = `${date?.getDate()}-${date?.toLocaleString('default', { month: 'short' })}`
                        x = [...x, dateString]
                        let totalTime = e[feature]
                        y = [...y, totalTime]
                    }

                }

                // both
                else {
                    // console.log("both")
                    let date = new Date(e.Day)
                    date = date?.getTime()

                    if ((e.Gender === gender) && (date >= fromDate && date <= toDate)) {
                        let date = new Date(e.Day)
                        const dateString = `${date?.getDate()}-${date?.toLocaleString('default', { month: 'short' })}`
                        x = [...x, dateString]
                        let totalTime = e[feature]
                        y = [...y, totalTime]
                    }
                }

            })
            setXData(x)
            setYData(y)

        } else {
            let x = []
            let y = []
            dataSet.map((e) => {
                let date = new Date(e.Day)
                date = `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}`
                x = [...x, date]
                let totalTime = e[feature]
                y = [...y, totalTime]
            })
            setXData(x)
            setYData(y)
        }

    }, [searchParams])

    return (
        <>
            <div onClick={handleClose} className='absolute h-full w-full z-10 top-0 bg-[#00000075] flex justify-center items-center'>
                {/* <div className='bg-white w-90%'> */}
                <LineChart
                    onClick={stopPropagation}
                    className='bg-white'
                    height={400}
                    series={[
                        { data: yData, label: feature },
                    ]}
                    xAxis={[{ data: xData, scaleType: "point" }]}
                    grid={{ horizontal: true }}
                />
                {/* </div> */}
            </div>
        </>
    );
}