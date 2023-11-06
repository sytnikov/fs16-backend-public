import CategoryRepo from "../models/CategoryModel";
import ProductRepo from "../models/ProductModel";
import { Category } from "../types/Category";
import { CreateProductInput, UpdateProductInput } from "../types/Product";

const createOne = async (newProduct: CreateProductInput) => {
  const category: Category | null = await CategoryRepo.findOne({
    _id: newProduct.categoryId,
  });
  if (category) {
    delete newProduct.categoryId;
    newProduct.category = category;
    const product = new ProductRepo(newProduct);
    return await product.save();
  }
  return false;
};

const findAll = async () => {
  const products = await ProductRepo.find().exec();
  return products;
};

const removeOne = async (productId: string) => {
  const { deletedCount } = await ProductRepo.deleteOne({ _id: productId });
  return deletedCount === 0 ? false : true;
};

const updateOne = async (
  updatedProduct: UpdateProductInput,
  productId: string
) => {
  const result = await ProductRepo.findByIdAndUpdate(
    productId,
    updatedProduct,
    {
      new: true,
    }
  );
  return result;
};

export const findOne = async (productId: string) => {
  const product = await ProductRepo.findById(productId);
  return product;
};

export default { createOne, findAll, removeOne, findOne, updateOne };