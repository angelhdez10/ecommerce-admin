import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((r) => {
      console.log(r.data);
      setProducts(r.data);
    });
  }, []);
  return (
    <Layout>
      <Link
        className="bg-green-700 text-white py-1 px-2 rounded-lg p-2"
        href={"/products/new"}
      >
        Add new product
      </Link>
      <div className="containerProducts mt-2 flex gap-1 justify-evenly flex-grow-0 flex-wrap">
        {!products.length ? (
          <h3>No products</h3>
        ) : (
          //products?.map(p => <Product name={p.name} description={p.description} id={p._id} price={p.price}/>)
          products?.map((p) => (
            <div>
              <span>{p.name}</span>{" "}
              <button className="bg-blue-600 rounded-lg p-1 text-white">
                <Link href={`/products/edit/${p._id}`}>Edit</Link>
              </button>
              <button className="bg-red-600 rounded-lg p-1 text-white">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
