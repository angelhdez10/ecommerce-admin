import { ButtonDelete, ButtonEdit } from "@/components/Buttons";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
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
              <ProductCard
                id={p._id}
                name={p.name}
                description={p.description}
                price={p.price}
                mainImage={p?.images[0]}
              />
              <ButtonEdit href={"/products/edit/"} id={p._id} />
              <ButtonDelete id={p._id} deleteFunction={deleteProduct} />
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
