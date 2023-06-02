import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((r) => {
      setProducts(r.data);
    });
  }, []);
  const deleteProduct = async (id) => {
    console.log(id);
    if (id) {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you want delete the product ${id}`,
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: "Cancel",
      })
        .then(async (res) => {
          console.log(id, "id to send");
          if (res.value) {
            await axios.delete(`/api/products?id=${id}`);
            await axios.get("/api/products").then((r) => {
              setProducts(r.data);
            });
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
  };
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
            <div key={p._id}>
              <span>{p.name}</span>{" "}
              <button className="bg-blue-600 rounded-lg p-1 text-white">
                <Link href={`/products/edit/${p._id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </Link>
              </button>
              <button
                className="bg-red-600 rounded-lg p-1 text-white"
                onClick={() => deleteProduct(p?._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
