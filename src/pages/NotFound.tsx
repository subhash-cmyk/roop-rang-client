import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="container-custom py-24 text-center">
      <div className="text-roop-gold font-playfair text-7xl">404</div>
      <h2 className="font-playfair text-3xl mt-3">Page not found</h2>
      <p className="text-gray-600 mt-2">The beauty you’re looking for moved.</p>
      <Link to="/" className="btn-primary inline-block mt-6">Back to Home</Link>
    </div>
  )
}
