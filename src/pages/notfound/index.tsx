import { Link } from "react-router-dom"

export function NotFound(){
    return(
        <div className="text-white  flex flex-col w-full min-h-screen justify-center items-center">
            <h1
            className="text-6xl mb-2 "
            >404</h1>
            <h1
            className="font-bold text-4xl mb-4 "
            >Page not found</h1>
            <p
            className="italic text-1xl mb-4"
            >This page doesn't exist</p>

            <Link
                className="bg-gray-50/20 py-1 px-4 rounded-md "
            to='/'>
                Back to home
            </Link>
        </div>
    )
}