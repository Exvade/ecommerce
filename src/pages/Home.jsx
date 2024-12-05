import Banner from "../components/Banner";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div className="px-3 mt-20">
      <Banner />
      <ProductList />
    </div>
  )
}