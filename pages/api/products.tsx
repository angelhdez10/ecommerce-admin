import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    const { name, description, price, images, category } = req.body;
    try {
      const productDoc = await Product.create({
        name,
        description,
        price,
        images,
        category,
      });
      res.status(200).json(productDoc);
    } catch (e) {
      res?.status(500).json({ error: "Error" });
    }
  } else if (method === "GET") {
    try {
      const { id } = req.query;
      console.log(id);
      if (id) {
        const product = await Product.findOne({ _id: id });
        res.status(200).json(product);
      }
      const allProducts = await Product.find();
      console.log("products");
      res.status(200).json(allProducts);
    } catch (e) {
      res?.status(500).json(e);
    }
  } else if (method === "PUT") {
    try {
      console.log(req, "put");
      const { _id: id } = req.body;
      const { name, description, price, images, category } = req.body;
      if (id) {
        const product = await Product.updateOne(
          { _id: id },
          { name, description, price, images, category }
        );
        return res.status(200).json(product);
      }
      res.status(403).json({});
    } catch (e) {
      res.status(500).json({});
    }
  } else if (method === "DELETE") {
    try {
      console.log("delete");
      const { id } = req.query;

      console.log(req);
      if (id) {
        await Product.deleteOne({ _id: id });
        return res.status(200);
      }
      res.status(403).json({});
    } catch (e) {
      res.status(500).json({});
    }
  }
}
