import Input from "./Input.tsx";
import Link from "next/link";

export default function ProductForm({
  product,
  setProduct,
  onSubmit,
  children,
}) {
  const handleChange = (ev: any) => {
    setProduct({
      ...product,
      [ev.target.name]: ev.target.value,
    });
  };
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
