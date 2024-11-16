import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export default function Line() {
    const [xData, setXData] = useState([])
    const [yData, setYData] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const dataSet = useSelector(state => state.datasetSlice)
    const [feature, setFeature] = useState(() => searchParams.get("feature"))

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
        setFeature(searchParams.get("feature"))
    }, [searchParams])


    useEffect(() => {
        // given parameters
        const gender = searchParams.get("gender")
        let fromDate = searchParams.get("startDate")
        fromDate = new Date(fromDate).getTime()
        let toDate = searchParams.get("endDate")
        toDate = new Date(toDate).getTime()
        const isDate = fromDate && toDate
        const age = searchParams.get("age")

        if (gender || (fromDate && toDate) || age) {
            let x = []
            let y = []
            dataSet.forEach((item) => {
                //  console.log(item)
                // Check filters
                const matchesGender = item.Gender === gender
                const matchesAge = item.Age === age
                let date = new Date(item.Day)
                const matchesDate = date >= fromDate && date <= toDate

                // only gender
                if (gender && !isDate && !age) {
                    if (matchesGender) {
                        const dateString = `${date?.getDate()}-${date?.toLocaleString('default', { month: 'short' })}`
                        x = [...x, dateString]
                        let totalTime = item[feature]
                        y = [...y, totalTime]
                    }
                }

                // only age
                else if (age && !gender && !isDate) {
                    if (matchesAge) {
                        const dateString = `${date?.getDate()}-${date?.toLocaleString('default', { month: 'short' })}`
                        x = [...x, dateString]
                        let totalTime = item[feature]
                        y = [...y, totalTime]
                    }
                }

                // only date
                else if (isDate && !age && !gender) {
                    if (matchesDate) {
                        const dateString = `${date?.getDate()}-${date?.toLocaleString('default', { month: 'short' })}`
                        x = [...x, dateString]
                        let totalTime = item[feature]
                        y = [...y, totalTime]
                    }
                }

                // gender + age
                else if (gender && age && !isDate) {
                    if (matchesGender && matchesAge) {
                        const dateString = `${date?.getDate()}-${date?.toLocaleString('default', { month: 'short' })}`
                        x = [...x, dateString]
                        let totalTime = item[feature]
                        y = [...y, totalTime]
                    }
                }

                // gender + Date
                else if (gender && isDate && !age) {
                    if (matchesGender && matchesDate) {
                        const dateString = `${date?.getDate()}-${date?.toLocaleString('default', { month: 'short' })}`
                        x = [...x, dateString]
                        let totalTime = item[feature]
                        y = [...y, totalTime]
                    }
                }

                // age + Date
                else if (age && isDate && !gender) {
                    if (matchesAge && matchesDate) {
                        const dateString = `${date?.getDate()}-${date?.toLocaleString('default', { month: 'short' })}`
                        x = [...x, dateString]
                        let totalTime = item[feature]
                        y = [...y, totalTime]
                    }
                }

                // all
                else {
                    if (matchesGender && matchesDate && matchesAge) {
                        const dateString = `${date?.getDate()}-${date?.toLocaleString('default', { month: 'short' })}`
                        x = [...x, dateString]
                        let totalTime = item[feature]
                        y = [...y, totalTime]
                    }
                }

            })
            setXData(x)
            setYData(y)

        } else {
            let x = []
            let y = []
            dataSet.forEach((item) => {
                let date = new Date(item.Day)
                date = `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}`
                x = [...x, date]
                let totalTime = item[feature]
                y = [...y, totalTime]
            })
            setXData(x)
            setYData(y)
        }

    }, [searchParams, dataSet])




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
            </div>
        </>
    );
}