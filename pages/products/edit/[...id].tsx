import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";

export default function EditPageProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`/api/products?id=${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);
  const updateProduct = async (ev, product) => {
    console.log(product, "here");
    ev.preventDefault();
    const updatedProduct = await axios.put("/api/products", product);
    console.log(updatedProduct);
    if (updatedProduct.request.status === 200) {
      return router.push("/products");
    }
    console.log(product);
  };
  return (
    <Layout>
      <ProductForm
        product={product}
        onSubmit={updateProduct}
        setProduct={setProduct}
      >
        Edit Product
      </ProductForm>
    </Layout>
  );
}
