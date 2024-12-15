import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import IconBack from "../components/icon/IconBack";
import IconShare from "../components/icon/IconShare";
import { addToCart } from "../redux/slices/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomSold, setRandomSold] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isShowPopUp, setIsShowPopUp] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const reduxProduct = useSelector((state) =>
    state.product.products.find((p) => p.id === parseInt(id))
  );

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

    if (!reduxProduct) {
      fetchProductDetail();
    } else {
      setProduct(reduxProduct);
      setLoading(false);
    }

    setRandomSold(Math.floor(Math.random() * (99 - 10 + 1)) + 10);
  }, [id, reduxProduct]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (reduxProduct && reduxProduct.stock > 0) {
        dispatch(addToCart({ ...product, quantity }));
        setIsShowPopUp(true)
        setTimeout(() => setIsShowPopUp(false), 2000);
        return;
      } else {
        alert("Sorry, this product is out of stock!");
      }
    }
  };


  const incrementQuantity = () => {
    if (reduxProduct && quantity < reduxProduct.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="sticky top-0 flex items-center justify-between w-full h-20 max-w-screen-xl px-4 bg-white md:mx-auto">
        <Link to="/">
          <IconBack />
        </Link>
        <p className="line-clamp-1 w-[50%] text-center font-semibold">{product.title}</p>
        <IconShare />
      </div>

      <div className="md:flex md:max-w-screen-lg md:mx-auto md:justify-center md:items-center md:mt-10">
        <div className="w-full aspect-square md:w-[50%]">
          <img src={product.image} alt="" className="object-contain w-full aspect-square" />
        </div>

        <div className="mt-2 md:w-[50%]">
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
            <div className="flex justify-between border-b py-[6px]">
              <p className="w-[50%] text-sm">Stock</p>
              <p className="w-[50%] text-xs capitalize font-bold text-primary flex items-center">
                {reduxProduct ? reduxProduct.stock : "Loading..."}
              </p>
            </div>
            <p className="my-4 text-base font-bold">Product Description</p>
            <p className="mb-4 text-sm">{product.description}</p>
          </div>
          <div className="md:static fixed flex justify-center items-center bottom-0 py-[10px] bg-white w-full md:flex-col md:w-auto">
            <div className="justify-around hidden w-full py-4 md:flex md:items-center">
              <button
                onClick={decrementQuantity}
                className="block font-semibold text-white rounded-sm w-7 aspect-square bg-primary"
              >
                -
              </button>
              <p className="text-xl font-semibold">{quantity}</p>
              <button
                onClick={incrementQuantity}
                className="block px-2 font-semibold text-white rounded-sm w-7 aspect-square bg-primary"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-[90%] md:w-full bg-primary h-[40px] rounded-md text-white font-bold"
              disabled={reduxProduct && reduxProduct.stock <= 0}
            >
              {reduxProduct && reduxProduct.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
      {isShowPopUp && (
        <div className="fixed left-0 right-0 flex items-center justify-center p-4 text-sm font-bold text-white bg-green-500 bottom-14 animate__animated animate__bounceInUp md:bottom-0">
          Product Added to Cart
        </div>
      )}
    </>
  );
}
