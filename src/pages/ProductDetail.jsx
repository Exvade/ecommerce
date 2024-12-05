import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <h1>Product Detail</h1>
      <p>Product ID: {id}</p>
      {/* Fetch product details based on the ID */}
    </div>
  );
}
