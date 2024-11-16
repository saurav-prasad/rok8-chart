import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/functions/auth'

function Nav() {
    const [userInfo, setUserInfo] = useState('')
    const { user } = useSelector(state => state.authSlice)
    const dispatch = useDispatch()

    useEffect(() => {

        if (user) {
            setUserInfo({ ...user })
        }

    }, [user])


    const onLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        localStorage.removeItem('token')
    }

    return (
        <>
            {user &&
                <nav className='w-full flex flex-row items-center justify-between space-x-4 pt-2 px-2'>
                    <img className='w-10 object-contain' src="/images/logo.png" alt="" />
                    <div className='flex flex-row items-center justify-center space-x-4'>
                        <img
                            alt=""
                            src={userInfo.profilePhoto}
                            className="inline-block size-10 rounded-full ring-2 ring-white"
                        />
                        <p className='text-lg font-medium'>{userInfo.username}</p>
                        <button
                            onClick={onLogout}
                            type="submit"
                            className="flex w-fit justify-center rounded-md bg-red-600 px-3 py-1 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            }
        </>
    )
}

export default Nav