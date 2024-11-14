import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const DatePicker2 = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [gender, setGender] = useState("None");
    const [age, setAge] = useState("None");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSerachParams = (newParams) => {
        // console.log(newParams)
        setSearchParams({ ...Object.fromEntries(searchParams), ...newParams })
    }
    const deleteSerachParams = (e) => {
        // console.log(newParams)
        // Create a copy of the current search parameters
        const newParams = new URLSearchParams(searchParams);

        // Delete the specified parameter
        newParams.delete(e);

        // Update the search parameters
        setSearchParams(newParams);
    }

    const handelReset = (e) => {
        e.preventDefault()
        setStartDate("")
        setEndDate("")
        setAge("None")
        setGender("None")
        setSearchParams()
    }

    // gender filter
    const handleGenderChange = (event) => {
        const gender = event.target.value
        if (gender !== "None") {
            setGender(gender)
            handleSerachParams({ gender })
        } else {
            setGender("None")
            deleteSerachParams("gender")
        }
        // console.log(searchParams.get("gender"))
    };

    // age filter
    const handleAgeChange = (event) => {
        const age = event.target.value
        if (age !== "None") {
            setAge(age)
            handleSerachParams({ age })
        } else {
            setAge("None")
            deleteSerachParams("age")
        }
        // console.log(searchParams.get("gender"))
    };

    const handleStartDate = (newValue) => {
        const date = newValue.target.value
        if (newValue.target.value) {
            setStartDate(date)
            handleSerachParams({ startDate: date })
        } else {
            setStartDate(date)
            deleteSerachParams("startDate")
        }
    }

    const handleEndDate = (newValue) => {
        const date = newValue.target.value
        if (newValue.target.value) {
            setEndDate(date)
            handleSerachParams({ endDate: date })
        } else {
            setEndDate(date)
            deleteSerachParams('endDate')
        }
    }

    const deletePreferences = (e) => {
        e.preventDefault()
        localStorage.removeItem("preferences")
    }
    const savePreferences = (e) => {
        e.preventDefault()
        if (Array.from(searchParams.keys()).length > 0) {
            const newParams = new URLSearchParams(searchParams);
            const paramsEntries = Object.fromEntries(newParams.entries());
            localStorage.setItem("preferences", JSON.stringify(paramsEntries))
        }
    }

    // useEffect(() => {
    //     if (Array.from(searchParams.keys()).length > 0) {
    //         const newParams = new URLSearchParams(searchParams);
    //         const paramsEntries = Object.fromEntries(newParams.entries());
    //         localStorage.setItem("preferences", JSON.stringify(paramsEntries))
    //     }
    // }, [searchParams])

    useEffect(() => {
        if (searchParams.get("age")) setAge(searchParams.get("age"))

        if (searchParams.get("gender")) setGender(searchParams.get("gender"))

        if (searchParams.get("endDate")) setEndDate(searchParams.get("endDate"))

        if (searchParams.get("startDate")) setStartDate(searchParams.get("startDate"))
    }, [])

    return (
        <>
            <div className='border border-[#ccc] w-[80vw] sm:w-fit rounded-lg mt-2 px-3 py-2 flex flex-col space-y-3'>
                <div className='flex space-x-2 justify-center items-center'>
                    <input value={startDate} onChange={handleStartDate} className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" type="date" name="" id="" />
                    <h1>To</h1>
                    <input value={endDate} onChange={handleEndDate} className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" type="date" name="" id="" />
                </div>
                {/* gender */}
                <div>
                    <label htmlFor="gender" className="block text-sm/6 font-medium text-gray-900">
                        Gender
                    </label>
                    <div className="mt-2">
                        <select
                            id='gender'
                            defaultValue={"None"}
                            value={gender}
                            onChange={handleGenderChange}
                            className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        >
                            <option value={"None"}>None</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                        </select>
                    </div>
                </div>
                {/* age */}
                <div>
                    <label htmlFor="age" className="block text-sm/6 font-medium text-gray-900">
                        Age
                    </label>
                    <div className="mt-2">
                        <select
                            id='age'
                            defaultValue={"None"}
                            value={age}
                            onChange={handleAgeChange}
                            className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        >
                            <option value={"None"}>None</option>
                            <option value={"15-25"}>15-25</option>
                            <option value={">25"}>&gt;25</option>
                        </select>
                    </div>
                </div>
                <button
                    onClick={handelReset}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Reset
                </button>
                <div className='w-full flex items-center justify-around'>
                    <button
                        onClick={deletePreferences}
                        type="submit"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Delete cookies
                    </button>
                    <button
                        onClick={savePreferences}
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save cookies
                    </button>
                </div>
            </div>
        </>
    )
}
export default DatePicker2