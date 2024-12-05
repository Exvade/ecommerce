import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProducts } from "../redux/slices/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold text-primary">For You</h1>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              to={`/productdetail/${product.id}`}
              key={product.id}
              className="p-4 transition duration-200 border rounded-lg shadow-md product-card hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.title}
                className="object-contain w-full h-48 rounded"
              />
              <h2 className="mt-2 text-sm font-medium line-clamp-2">{product.title}</h2>
              <p className="mt-1 font-bold text-md text-primary">${product.price.toFixed(2)}</p>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center">
                  <img src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/phoenix/kratos/de64305b.svg" alt="" />
                  <p className="ml-1 text-xs font-medium">{product.rating.rate}</p>
                </div>
                <span className="border border-gray-500 rounded-full h-[3px] w-[3px] flex"></span>
                <p className="text-xs font-medium">{product.rating.count}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
