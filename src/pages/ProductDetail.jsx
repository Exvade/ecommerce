import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice"; // Import action addToCart

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomSold, setRandomSold] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Cek login dari Redux state

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching product details");
        setLoading(false);
      }
    };

    fetchProductDetail();

    // Generate angka acak untuk jumlah produk yang terjual (10-99)
    setRandomSold(Math.floor(Math.random() * (99 - 10 + 1)) + 10);
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // Jika belum login, arahkan ke halaman login
      navigate("/login");
    } else {
      // Jika sudah login, tambahkan produk ke keranjang
      dispatch(addToCart(product));
      alert("Product added to cart!");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-full max-w-screen-xl px-4 md:mx-auto h-14">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
            <g fill="none" stroke="#515151" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
              <path strokeDasharray={20} strokeDashoffset={20} d="M21 12h-17.5">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0"></animate>
              </path>
              <path strokeDasharray={12} strokeDashoffset={12} d="M3 12l7 7M3 12l7 -7">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="12;0"></animate>
              </path>
            </g>
          </svg>
        </Link>
        <p className="line-clamp-1 w-[50%] text-center font-semibold">{product.title}</p>
        <svg className="unf-icon" viewBox="0 0 24 24" width="24" height="24" fill="#515151">
          <path d="M3.092 19.78a1 1 0 0 0 .78-.57c2.36-3.81 6.57-4.82 9.95-5v2.45a1.33 1.33 0 0 0 .8 1.22 1.25 1.25 0 0 0 1.37-.28l5.1-5a2.25 2.25 0 0 0 0-3.18l-5.05-5a1.25 1.25 0 0 0-1.38-.28 1.29 1.29 0 0 0-.79 1.2v2.43c-6.78.32-11.53 4.94-11.53 11.23a.8.8 0 0 0 .55.75l.2.03Zm11.5-7.03c-3.24 0-7.44.69-10.42 3.7 1.14-4.29 5.18-7.2 10.42-7.2a.76.76 0 0 0 .75-.75V5.82l4.66 4.66a.75.75 0 0 1 0 1.06l-4.66 4.66v-2.7a.76.76 0 0 0-.75-.75Z"></path>
        </svg>
      </div>

      <div className="md:flex md:max-w-screen-lg md:mx-auto md:justify-center md:items-center">
        <div className="w-full aspect-square md:w-[30%]">
          <img src={product.image} alt="" className="object-contain w-full aspect-square" />
        </div>

        <div className="mt-2 md:w-[50%] ">
          <div className="px-4 md:flex md:flex-col">
            <p className="text-xl font-bold md:mt-4 md:order-3 md:text-3xl md:font-bold">${product.price.toFixed(2)}</p>
            <p className="mt-2 text-sm font-medium md:order-1 md:text-lg md:font-bold">{product.title}</p>
            <div className="flex items-center mt-2 md:mt-0 md:order-2">
              <p className="text-xs font-semibold">Sold {randomSold}+</p>
              <div className="flex items-center justify-center p-2 border border-gray-400 md:border-none rounded-md gap-[6px] ml-4">
                <img src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/phoenix/kratos/de64305b.svg" alt="" />
                <p className="text-sm font-medium">{product.rating.rate}</p>
                <p className="text-sm font-medium text-gray-700">({product.rating.count})</p>
              </div>
            </div>
          </div>
          <div className="px-4 mt-4 border-y-8 md:border-none">
            <p className="my-4 text-base font-bold">Product Detail</p>
            <div className="flex justify-between border-y py-[6px]">
              <p className="w-[50%] text-sm">Category</p>
              <p className="w-[50%] text-xs capitalize font-bold text-primary flex items-center">{product.category}</p>
            </div>
            <p className="my-4 text-base font-bold">Product Description</p>
            <p className="mb-4 text-sm">{product.description}</p>
          </div>
        </div>

        <div className="md:static fixed flex justify-center items-center bottom-0 py-[10px] bg-white w-full shadow-[0px_-1px_12px_10px_#00000024] md:w-[20%]md:flex md:flex-col md:w-auto">
          <div className="hidden md:block">
            <p>Select Quantity and Notes</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-[90%] bg-primary h-[40px] rounded-md text-white font-bold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
