import { Undo2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
    const navigate = useNavigate()
    return (
        <div className='h-screen w-screen flex justify-center align-middle'>
            <div className="py-10 h-screen flex justify-center items-center">
                <div className="text-center h-fit">
                    <p className="text-base font-semibold text-black">404</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                        Sorry, we couldn't find the page you&apos;re looking for.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-x-3">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={(e) => { e.preventDefault(); navigate(-1) }}
                        >
                            <Undo2 size={16} className="mr-2" />
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}