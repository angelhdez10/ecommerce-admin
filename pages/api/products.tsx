import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    const { name, description, price } = req.body;
    try {
      const productDoc = await Product.create({
        name,
        description,
        price,
      });
      res.json(productDoc).status(200);
    } catch (e) {
      res.json({ error: "Error" })?.status(500);
    }
  } else if (method === "GET") {
    try {
      const { id } = req.query;
      console.log(id);
      if (id) {
        const product = await Product.findOne({ _id: id });
        return res.json(product).status(200);
      }
      const allProducts = await Product.find();
      console.log("products");
      return res.json(allProducts).status(200);
    } catch (e) {
      return res.json(e)?.status(500);
    }
  }
  return res.json({})?.status(500);
}
