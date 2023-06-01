import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import Input from "@/components/Input.js";
import axios from "axios";
import { useRouter } from "next/router";

export default function NewProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (ev: any) => {
    setProduct({
      ...product,
      [ev.target.name]: ev.target.value,
    });
  };
  const router = useRouter();
  console.log(product);
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
      <form onSubmit={(ev) => createProduct(ev, product)} className="w-full">
        <h2>New product</h2>
        <Input
          name="name"
          type="text"
          onChange={(e: any) => handleChange(e)}
          id="name"
          value={product.name}
          textArea={false}
        >
          Product Name
        </Input>

        <Input
          onChange={(e: any) => handleChange(e)}
          name="description"
          value={product.description}
          type="text"
          id="description-area"
          textArea={true}
        >
          Description
        </Input>

        <Input
          onChange={(e: any) => handleChange(e)}
          name="price"
          value={product.price}
          type="number"
          id="price"
          textArea={false}
        >
          Price{" "}
        </Input>
        <div className="flex justify-evenly w-4/6">
          <button className="w-1/3 bg-red-600 p-2 rounded-lg text-white">
            <Link href={"/products"}>Back</Link>
          </button>
          <button
            type="submit"
            className="w-1/3 bg-green-400 p-2 rounded-lg text-white"
          >
            Save
          </button>
        </div>
      </form>
    </Layout>
  );
}
