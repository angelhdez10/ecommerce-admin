import axios from "axios";
import Input from "./Input";
import Link from "next/link";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  product,
  setProduct,
  onSubmit,
  children,
}) {
  const [isUploading, setUploading] = useState(false);
  const handleChange = async (ev: any) => {
    if (ev.target.name === "images") {
      const files = ev.target.files;
      if (files?.length > 0) {
        setUploading(true);
        const data = new FormData();
        for (const file of files) {
          data.append("file", file);
        }
        const res = await axios.post("/api/upload", data);
        console.log(res.data.links);
        setProduct({
          ...product,
          [ev.target.name]: [...product.images, ...res.data.links],
        });
        setUploading(false);
      }
    } else {
      setProduct({
        ...product,
        [ev.target.name]: ev.target.value,
      });
    }
  };

  const updateImagesOrder = (images) => {
    setProduct({
      ...product,
      ["images"]: [...images],
    });
  };
  console.log(product, "images");
  return (
    <form onSubmit={(ev) => onSubmit(ev, product)} className="w-full">
      <h2>{children}</h2>
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

      <div className="mb-5">
        <label className="relative"> Photos </label>

        <div className="flex flex-wrap gap-2 flex-grow-0">
          <ReactSortable
            className="flex flex-wrap gap-2"
            list={product.images || []}
            setList={updateImagesOrder}
          >
            {!!product.images?.length &&
              product.images?.map((link) => {
                return (
                  <img
                    src={link}
                    alt="First image"
                    className="w-24 h-24 rounded-lg"
                  />
                );
              })}
          </ReactSortable>
          {isUploading && (
            <div className="h-24">
              <Spinner />
            </div>
          )}
          <label className="relative cursor-pointer w-24 h-24 flex flex-col items-center justify-center bg-neutral-500 rounded-lg text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
              />
            </svg>
            Upload
            <input
              name="images"
              type="file"
              className="hidden"
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
      </div>
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
        Price
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
  );
}
