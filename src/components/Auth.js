import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { authRoute } from '../apis/axios'
import { useDispatch } from 'react-redux';
import { login } from '../redux/functions/auth'

function Auth() {
  const [authInfo, setAuthInfo] = useState({ username: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [testLoading, setTestLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isSigninState, setIsSigninState] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // sign in
      if (isSigninState) {
        const result = await authRoute.post("/loginuser", { email: authInfo.email, password: authInfo.password })
        // console.log(result)
        setLoading(false)
        setAuthInfo({ username: "", email: "", password: "" })
        localStorage.setItem("token", result.data.data.token)
        dispatch(login({ ...result.data.data }))
        navigate("/")
      }
      // sign up
      else {
        const result = await authRoute.post("/createuser", { ...authInfo })
        // console.log(result)
        setLoading(false)
        setAuthInfo({ username: "", email: "", password: "" })
        localStorage.setItem("token", result.data.data.token)
        dispatch(login({ ...result.data.data }))
        navigate("/")
      }
    }
    catch (error) {
      console.log(error)
      setErrorMsg(error.response.data.message)
      setTimeout(() => {
        setErrorMsg("")
      }, 2500);
      setLoading(false)
      setAuthInfo({ username: "", email: "", password: "" })

    }
  }

  const onTestuser = async (e) => {
    e.preventDefault()
    setTestLoading(true)

    try {
      // sign in
      const result = await authRoute.post("/loginuser", { email: "test@test.com", password: "test123" })
      // console.log(result)
      setTestLoading(false)
      navigate('/')
      localStorage.setItem("token", result.data.data.token)
      dispatch(login({ ...result.data.data }))
    }
    catch (error) {
      console.log(error)
      setErrorMsg(error.response.data.message)
      setTimeout(() => {
        setErrorMsg("")
      }, 2500);
      setTestLoading(false)

    }
  }

  return (
    <section className="h-[90vh] flex justify-center items-center">
      <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8 w-full">
        <div className="xl:mx-auto sm:w-[30rem] w-full">
          <h2 className="text-3xl font-bold leading-tight text-black text-center">
            {isSigninState ? "Sign-in to your" : "Sign up to create"} account
          </h2>

          <form onSubmit={onSubmit} className="mt-8">
            <div className="space-y-5">
              {!isSigninState &&
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    {' '}
                    Username{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      id='name'
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                      onChange={e => setAuthInfo({ ...authInfo, username: e.target.value })}
                    ></input>
                  </div>
                </div>
              }
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    id='email'
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    onChange={e => setAuthInfo({ ...authInfo, email: e.target.value })}
                  ></input>
                </div>
              </div>
              <div className=''>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    minLength={6}
                    id='password'
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Password"
                    onChange={e => setAuthInfo({ ...authInfo, password: e.target.value })}
                  ></input>
                </div>
                {/* error texts */}
                <label className="text-red-600  text-sm font-medium absolute">
                  {errorMsg}
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  {loading ?
                    <span className='loader'></span> :
                    <>{isSigninState ? "Sign in" : "Create Account"} <ArrowRight className="ml-2" size={16} /></>
                  }
                </button>
                {/* test user */}
                <button
                  onClick={onTestuser}
                  type="button"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#2563eb] px-3.5 py-2 font-semibold leading-7 text-white hover:bg-[#2564ebe8]"
                >
                  {
                    testLoading ?
                      <span className="loader"></span> :
                      <>{"Test User"}<ArrowRight className="ml-2" size={16} /> </>
                  }
                </button>

              </div>
            </div>
          </form>
          <p className="mt-2text-sm text-gray-600 mt-3">
            {isSigninState ? `Dont have an account?${' '}` : `Already have an account?${' '}`}
            <span
              onClick={() => setIsSigninState(!isSigninState)}
              to={'/login'}
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline select-none"
            >
              {isSigninState ? "Create one" : "Login In"}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
export default Auth