import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';

const ProductRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=10');
        const data = await response.json();
        setRecommendations(data.filter(product => !cartItems.some(item => item.id === product.id)));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [cartItems]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  if (loading) {
    return <div className="py-4 text-center">Loading recommendations...</div>;
  }

  return (
    <div className="mb-20">

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {recommendations.map((product) => (
          <div key={product.id} className="transition-shadow bg-white border rounded-lg shadow-sm hover:shadow-md">
            <Link to={`/productdetail/${product.id}`} className="block p-4">
              <div className="mb-3 aspect-square">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
                <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <img src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/phoenix/kratos/de64305b.svg" alt="" />
                    <span className="ml-1">{product.rating.rate}</span>
                  </div>
                  <span>•</span>
                  <span className="text-gray-500">({product.rating.count})</span>
                </div>
              </div>
            </Link>
            <div className="px-4 pb-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full py-2 text-sm font-medium transition-colors border-2 rounded-lg text-primary border-primary hover:bg-primary hover:text-white"
              >
                + Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;

