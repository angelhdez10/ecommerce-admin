import Input from "@/components/Input";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ButtonDelete, ButtonEdit } from "@/components/Buttons";
import Swal from "sweetalert2";

export default function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    parentCategory: "",
  });
  const [isUploading, setIsUploading] = useState({
    general: false,
    item: false,
  });
  useEffect(() => {
    setIsUploading({
      ...isUploading,
      general: true,
    });
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .then((r) => {
        setIsUploading({
          ...isUploading,
          general: false,
        });
      });
  }, []);
  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value !== "0" ? e.target.value : null,
    });
  };
  const saveCategory = async (e) => {
    setIsUploading({
      ...isUploading,
      item: true,
    });
    e.preventDefault();
    if (editedCategory) {
      await axios.put("/api/categories", {
        _id: editedCategory?._id,
        ...category,
      });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", category);
    }
    setCategory({
      name: "",
      parentCategory: "",
    });
    const newCategories = await axios.get("/api/categories");
    setCategories(newCategories.data);
    setIsUploading({
      ...isUploading,
      item: false,
    });
  };
  const editFunction = (category) => {
    setEditedCategory(category);
    setCategory({
      name: category?.name,
      parentCategory: category?.parent?._id,
    });
  };
  const deleteCategory = async (id) => {
    if (id) {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you want delete this category ${id}`,
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: "Cancel",
      })
        .then(async (res) => {
          console.log(id, "id to send");
          if (res.value) {
            await axios.delete(`/api/categories?id=${id}`);
            await axios.get("/api/categories").then((r) => {
              setCategories(r.data);
            });
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
  };
  console.log(categories, isUploading, category, editedCategory);
  return (
    <Layout>
      <h3 className="mb-2">Categories</h3>
      <form
        onSubmit={(e) => saveCategory(e)}
        className="w-full container-form-categories mt-4 flex flex-col gap-1"
      >
        {editedCategory && (
          <label className="relative block">Edit Category</label>
        )}
        <div className="flex gap-1">
          <input
            name="name"
            value={category.name}
            onChange={(e) => handleChange(e)}
            type="text"
            className="mb-0 "
            placeholder="Category name"
          />
          <select
            value={category.parentCategory}
            onChange={(e) => handleChange(e)}
            name="parentCategory"
          >
            <option value={"0"}>No parent category</option>
            {categories.length &&
              categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
          </select>
          <button className="rounded-lg bg-green-400 text-white p-2">
            Save
          </button>
        </div>
      </form>

      <div className="container-categories flex items-center justify-center mt-4">
        {!isUploading.general ? (
          <table className="table-fixed">
            <thead>
              <th>Name</th>
              <th>Parent Category</th>
              <th></th>
            </thead>
            <tbody>
              {!!categories?.length &&
                categories.map((category) => (
                  <tr>
                    <td>{category?.name}</td>
                    <td>{category?.parent?.name}</td>
                    <td>
                      {/*<ButtonEdit
                        id={category._id}
                        href={"/categories/edit/"}
                      />
                      <ButtonDelete
                        id={category._id}
                        deleteFunction={deleteCategory}
                      />*/}
                      <button
                        onClick={() => editFunction(category)}
                        className="bg-blue-600 rounded-lg p-1 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category?._id)}
                        className="bg-red-600 rounded-lg p-1 text-white "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              {isUploading.item && <Spinner />}
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
      </div>
    </Layout>
  );
}
