import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;
  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || null,
      properties,
    });
    res.status(200).json(categoryDoc);
  }
  if (method === "GET") {
    const allCategories = await Category.find().populate("parent");
    console.log(allCategories);
    res.status(200).json(allCategories);
  }
  if (method === "PUT") {
    const { _id, name, parentCategory, properties } = req.body;
    console.log(_id);
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || null,
        properties,
      }
    );
    res.status(200).json(categoryDoc);
  }
  if (method === "DELETE") {
    const { id } = req?.query;
    if (id) {
      await Category.deleteOne({ _id: id });
      res.status(200).json("ok");
    }
  }
}
