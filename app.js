import express from "express";
import "dotenv/config";
import { connectDB } from "./db.js";
import { Category } from "./models/Category.js";
import { Product } from "./models/Product.js";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
connectDB();

const createCategoryAndProduct = async () => {
  try {
    const category = new Category({ name: "Electronics" });
    await category.save();

    const product = new Product({
      name: "Smartphone",
      price: 10,
      category: category._id,
    });
    await product.save();
    console.log("product and category have been added");
  } catch (err) {
    console.error("error creating product and category", err.message);
  }
};
// createCategoryAndProduct();

app.get("/products", async (req, res) => {
  try {
    const product = await Product.find().populate("category", "name");
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server fail", error: err.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "no such category" });
    }
    const product = new Product({ name, price, category: category._id });
    product.save();
    res.status(200).json({ message: "product added", product });
  } catch (err) {
    console.error("error occurred while adding product", err.message);
  }
});

app.get("/", (_req, res) => {
  res.send("server is up");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
