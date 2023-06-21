import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import Input from "@/components/Input.js";
import axios from "axios";
import { useRouter } from "next/router";
import ProductForm from "@/components/ProductForm";

export default function NewProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    categories: "",
  });

  const router = useRouter();
  const createProduct = async (ev, product) => {
    ev.preventDefault();
    const productCreated = await axios.post("/api/products", product);
    console.log(productCreated);
    if (productCreated.request.status === 200) {
      return router.push("/products");
    }
    console.log(product);
  };
  return (
    <Layout>
      <ProductForm
        product={product}
        setProduct={setProduct}
        onSubmit={createProduct}
      >
        New Product
      </ProductForm>
    </Layout>
  );
}
