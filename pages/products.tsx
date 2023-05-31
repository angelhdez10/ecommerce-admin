import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
  return (
    <Layout>
      <Link
        className="bg-green-700 text-white py-1 px-2 rounded-lg p-2"
        href={"/products/new"}
      >
        Add new product
      </Link>
    </Layout>
  );
}
