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
    properties: [],
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
    const propertiesWithArrayValues = category?.properties?.map((p) => ({
      ...p,
      values: p.values.split(","),
    }));
    if (editedCategory) {
      await axios.put("/api/categories", {
        _id: editedCategory?._id,
        ...category,
        properties: propertiesWithArrayValues,
      });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", {
        ...category,
        properties: propertiesWithArrayValues,
      });
    }
    setCategory({
      name: "",
      parentCategory: "",
      properties: [],
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
      properties:
        category?.properties?.map((p) => ({
          ...p,
          values: p.values.toString(),
        })) || [],
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
  const addProperty = () => {
    setCategory({
      ...category,
      ["properties"]: [...category?.properties, { name: "", values: "" }],
    });
  };
  const handlePropertyChange = (property, index, ev) => {
    category.properties[index] = {
      ...property,
      [ev.target.name]: ev.target.value,
    };
    setCategory({
      ...category,
      ["properties"]: [...category.properties],
    });
  };
  const deleteProperty = (index) => {
    const newProperties = category.properties.filter(
      (e, indexP) => indexP !== index
    );
    setCategory({
      ...category,
      ["properties"]: [...newProperties],
    });
  };
  const cancelEdit = () => {
    setEditedCategory(null);
    setCategory({
      name: "",
      parentCategory: "",
      properties: [],
    });
  };
  console.log(editedCategory);
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
        <div className="flex gap-1 mb-2">
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
        </div>
        <div className="mb-2">
          <label className="NotInputLabel block">Properties</label>
          <button
            type="button"
            onClick={addProperty}
            className="bg-blue-600 rounded-lg p-1 text-sm text-white"
          >
            Add new property
          </button>
          {!!category?.properties?.length &&
            category?.properties?.map((property, index) => {
              return (
                <div className="flex gap-2 m-2">
                  <input
                    type="text"
                    value={property?.name}
                    name="name"
                    onChange={(ev) => handlePropertyChange(property, index, ev)}
                    placeholder="Property Name"
                    className="mb-0 "
                  />
                  <input
                    type="text"
                    value={property?.values}
                    name="values"
                    onChange={(ev) => handlePropertyChange(property, index, ev)}
                    placeholder="Property values"
                    className="mb-0 "
                  />
                  <button
                    type="button"
                    className="bg-red-600 rounded-lg p-1 text-white"
                    onClick={() => deleteProperty(index)}
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
        </div>
        <div className="flex gap-2 w-full justify-center">
          {editedCategory && (
            <button
              type="button"
              onClick={() => cancelEdit()}
              className="rounded-lg bg-gray-400 text-white p-2 w-2/12"
            >
              Cancel
            </button>
          )}
          <button className="rounded-lg bg-green-400 text-white p-2 w-2/12">
            Save
          </button>
        </div>
      </form>
      <div className="container-categories flex items-center justify-center mt-4 ">
        {isUploading.general ? (
          <Spinner />
        ) : !categories.length ? (
          <span>No categories</span>
        ) : (
          !editedCategory && (
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
          )
        )}
      </div>
    </Layout>
  );
}
