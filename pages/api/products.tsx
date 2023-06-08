import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    const { name, description, price, images } = req.body;
    try {
      const productDoc = await Product.create({
        name,
        description,
        price,
        images,
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
        res.json(product).status(200);
      }
      const allProducts = await Product.find();
      console.log("products");
      res.json(allProducts).status(200);
    } catch (e) {
      res.json(e)?.status(500);
    }
  } else if (method === "PUT") {
    try {
      console.log(req, "put");
      const { _id: id } = req.body;
      const { name, description, price, images } = req.body;
      if (id) {
        const product = await Product.updateOne(
          { _id: id },
          { name, description, price, images }
        );
        res.json(product).status(200);
      }
      res.json({}).status(403);
    } catch (e) {
      res.json({}).status(500);
    }
  } else if (method === "DELETE") {
    try {
      console.log("delete");
      const { id } = req.query;

      console.log(req);
      if (id) {
        await Product.deleteOne({ _id: id });
        res.status(200);
      }
      res.json({}).status(403);
    } catch (e) {
      res.json({}).status(500);
    }
  }
}
