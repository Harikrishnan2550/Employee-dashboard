import React from 'react'

function Login() {
  return (
    <section className="container flex justify-center flex-col pt-24 mb-20">
    <div className="w-[455px] h-[450px] bg-white m-auto px-14 py-10 rounded-xl shadow-2xl">
    <h3 className="text-[28px] font-semibold text-center">Login</h3>
    <div className="flex flex-col gap-4 mt-12">
    <input
            type="email"
            placeholder="Email Address"
            name="email"
              className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
              className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
    </div>
    <button
           className="my-5 w-full rounded-md bg-emerald-300 h-11 font-bold mt-5"
         
        >Login</button>
    </div>
    </section>
  )
}

export default Login
