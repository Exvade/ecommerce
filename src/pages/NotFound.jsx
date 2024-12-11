import { Link } from "react-router-dom"
import ErrorPNG from "../assets/error.png"

export default function NotFound() {
  return (
    <div className="h-[70vh] flex justify-center items-center px-4 flex-col mt-12">
      <img src={ErrorPNG} alt="404 Picture" className="max-w-lg" />
      <div className="mt-8 text-center">
        <h1 className="text-lg font-bold md:text-3xl">Oops, wrong turn! But don't worry</h1>
        <p className="mb-8 text-sm md:text-base">It seems this page doesn’t fit, but maybe our other collections will be the perfect match for you.</p>
        <Link to="/" className="self-center flex-shrink px-12 py-3 text-base font-semibold text-white rounded-md bg-primary">Back to Home</Link>
      </div>
    </div>
  )
}