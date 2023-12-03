import React, { useEffect, useState } from "react";
import Header from "../../../sharedModule/components/Header/Header";
import Modal from "react-bootstrap/Modal";
import noData from "../../../assets/imgs/noData.svg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Recipes(props) {
  const [recipesList, setRecipesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [recipeId, setRecipeId] = useState(0);
  const [recipe, setRecipe] = useState(0);
  const showAddModal = () => {
    setValue("name", null);
    setValue("price", null);
    setValue("categoriesIds", null);
    setValue("tagId", null);
    setValue("description", null);
    setModalState("modal-add");
    getAllTags();
    getAllCategories();
  };
  const showDeleteModal = (id) => {
    setModalState("modal-delete");
    setRecipeId(id);
  };
  const showUpdateModal = (recipe) => {
    setModalState("modal-update");
    getAllTags();
    getAllCategories();
    setRecipeId(recipe.id);
    setRecipe(recipe);
    console.log(recipe);
    setValue("name", recipe.name);
    setValue("price", recipe.price);
    setValue("description", recipe.description);
    setValue("categoriesIds", recipe.category[0].id);
    setValue("tagId", recipe.tag.id);
    console.log("updateeeeeeeeeeee");
  };
  const handleClose = () => setModalState("close");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    getRecipes();
  }, []);
  const getRecipes = () => {
    axios
      .get(
        `https://upskilling-egypt.com:443/api/v1/Recipe/`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        setRecipesList(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllTags = () => {
    axios
      .get(`https://upskilling-egypt.com:443/api/v1/tag/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTagsList(res?.data);
        console.log(tagsList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCategories = () => {
    axios
      .get(`https://upskilling-egypt.com:443/api/v1/Category/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        setCategoriesList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addRecipe = (data) => {
    const addFormData = new FormData();
    addFormData.append("name", data["name"]);
    addFormData.append("price", data["price"]);
    addFormData.append("description", data["description"]);
    addFormData.append("tagId", data["tagId"]);
    addFormData.append("categoriesIds", data["categoriesIds"]);
    addFormData.append("recipeImage", data["recipeImage"][0]);
    axios
      .post(`https://upskilling-egypt.com:443/api/v1/Recipe/`, addFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        toast("recipe added successfully");
        handleClose();
        getRecipes();
      })
      .catch((err) => {
        toast("error in adding new recipr");
      });
  };

  const daleteRecipe = (recipeId) => {
    axios
      .delete(`https://upskilling-egypt.com:443/api/v1/Recipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        toast("Recipe deleted successfully");
        handleClose();
        getRecipes();
      })
      .catch((err) => {
        toast("error while deleting item");
      });
  };

  const updateRecipe =(data,recipeId)=>{
       console.log("heloooo");
    const addFormData = new FormData();
    addFormData.append("name", data["name"]);
    addFormData.append("price", data["price"]);
    addFormData.append("description", data["description"]);
    addFormData.append("tagId", data["tagId"]);
    addFormData.append("categoriesIds", data["categoriesIds"]);
    addFormData.append("recipeImage", data["recipeImage"][0]);
    axios
      .put(`https://upskilling-egypt.com:443/api/v1/Recipe/${recipeId}`, addFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        console.log("okkkkkk");
        toast("recipe updated successfully");
        handleClose();0
        getRecipes();
      })
      .catch((err) => {
        console.log(err);
        toast("error in updating new recipr");
      });
    
  };

  return (
    <>
      <Modal show={modalState === "modal-add"} onHide={handleClose}>
        <Modal.Body>
          <div>
            <form
              className="w-75 m-auto py-5 "
              onSubmit={handleSubmit(addRecipe)}
            >
              <h3>Add New recipe</h3>

              <div className="inputContainer p-2">
                <input
                  type="text"
                  placeholder="recipe name"
                  className="w-100 form-control bg-light"
                  {...register("name", {
                    required: true,
                  })}
                />

                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger">recipe name is required</span>
                )}
              </div>
              <div className="inputContainer p-2">
                <input
                  type="number"
                  placeholder="price"
                  className="w-100 form-control bg-light"
                  {...register("price", {
                    required: true,
                  })}
                />

                {errors.price && errors.price.type === "required" && (
                  <span className="text-danger">recipe price is required</span>
                )}
              </div>
              <div className="inputContainer p-2">
                <select
                  class="form-select"
                  {...register("categoriesIds", {
                    required: true,
                  })}
                >
                  <option value="">Select category</option>
                  {categoriesList?.map((category) => (
                    <option value={category?.id}>{category?.name}</option>
                  ))}
                </select>
                {errors.categoriesIds &&
                  errors.categoriesIds.type === "required" && (
                    <span className="text-danger">category is required</span>
                  )}
              </div>
              <div className="inputContainer p-2">
                <select
                  class="form-select"
                  {...register("tagId", {
                    required: true,
                  })}
                >
                  <option value="">Select a tag</option>

                  {tagsList?.map((tag) => (
                    <option value={tag?.id}>{tag?.name}</option>
                  ))}
                </select>
              </div>
              <div className="inputContainer p-2">
                <textarea
                  placeholder="Description"
                  className="w-100 form-control bg-light"
                  {...register("description", {
                    required: true,
                  })}
                ></textarea>
                {errors.description &&
                  errors.description.type === "required" && (
                    <span className="text-danger">description is required</span>
                  )}
              </div>
              <div className="inputContainer p-2">
                <input
                  type="file"
                  className="w-100 form-control bg-light"
                  {...register("recipeImage")}
                />

                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger">recipe name is required</span>
                )}
              </div>

              <div className="btn-container text-end">
                <button className=" btn btn-success py-1 px-5 w-100">
                  Add recipe
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalState === "modal-delete"} onHide={handleClose}>
        <Modal.Body>
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 text-center">
              <img src={noData} alt="no data" className="m-2" />
              <h4>Delete this recipe?</h4>
              <p className="text-muted py-2">
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
              <div className="text-end">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    daleteRecipe(recipeId);
                  }}
                >
                  Delete this item
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalState === "modal-update"} onHide={handleClose}>
        <Modal.Body>
          <div>
            <form className="w-75 m-auto py-5 "  onSubmit={handleSubmit(updateRecipe)}>
              <h3>Update Recipe</h3>
              <div className="inputContainer p-2">
                <input
                  type="text"
                  placeholder="recipe name"
                  className="w-100 form-control bg-light"
                  {...register("name", {
                    required: true,
                  })}
                />

                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger">recipe name is required</span>
                )}
              </div>
              <div className="inputContainer p-2">
                <input
                  type="number"
                  placeholder="price"
                  className="w-100 form-control bg-light"
                  {...register("price", {
                    required: true,
                  })}
                />

                {errors.price && errors.price.type === "required" && (
                  <span className="text-danger">recipe price is required</span>
                )}
              </div>
              <div className="inputContainer p-2">
                <select {...register("categoriesIds", {
                    required: true,
                  })}
                  class="form-select" 
                >
                  {categoriesList?.map((category) => (
                    <option  value={category?.id}>{category?.name}</option>
                  ))}
                </select>
               
              </div>
              <div className="inputContainer p-2">
                <select  {...register("tagId", {
                    required: true,
                  })} class="form-select"  >

                  {tagsList?.map((tag) => (
                    <option  value={tag?.id}>{tag?.name}</option>
                  ))}
                </select>
               
              </div>
              <div className="inputContainer p-2">
                <textarea
                  placeholder="Description"
                  className="w-100 form-control bg-light"
                  {...register("description", {
                    required: true,
                  })}
                ></textarea>
                {errors.description &&
                  errors.description.type === "required" && (
                    <span className="text-danger">description is required</span>
                  )}
              </div>
              <div className="inputContainer p-2">
                <input
                  type="file"
                  className="w-100 form-control bg-light"
                  {...register("recipeImage")}
                />
                <img className="recipeImgContainer" src={`https://upskilling-egypt.com:443/` + recipe.imagePath} alt="" />

                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger">recipe name is required</span>
                )}
              </div>

              <div className="btn-container">
              <button 
              className=" btn btn-success py-1 px-5" type="submit" >update</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Header
        header={"Recipes Items"}
        paragraph={
          "This is a weYou can now add your items that any user can order it from the Application and you can editlcoming screen for the entry of the application , you can now see the options"
        }
      />
      <div className="row bg-light p-4 justify-content-between">
        <div className="col-md-6">
          <h3>Recipe Table Details </h3>
          <p className="py-2"> you can check all details</p>
        </div>
        <div className="col-md-3 text-white">
          <button className="btn btn-success" onClick={showAddModal}>
            Add New Recipe
          </button>
        </div>
      </div>
      {recipesList.length > 0 ? (
        <table className="table mt-5 table-striped">
          <thead>
            <tr className="">
              <th>id</th>
              <th>Name</th>
              <th>image</th>
              <th>price</th>
              <th>description</th>
              <th>tag</th>
              <th>category</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {recipesList.map((recipe) => (
              <tr>
                <th>{recipe?.id}</th>
                <td>{recipe?.name}</td>
                <td>
                  <div className="recipeImgContainer overflow-hidden">
                    <img
                      src={
                        `https://upskilling-egypt.com:443/` + recipe.imagePath
                      }
                      alt="recipe"
                      className="w-100"
                    />
                  </div>
                </td>
                <td>{recipe?.price}</td>
                <th>{recipe?.description}</th>
                <td>{recipe?.tag.name}</td>
                <td>{recipe?.category[0]?.name}</td>
                <td>
                  <i
                    className="fa-solid fa-trash-can text-danger fa-xl mx-2"
                    onClick={() => {
                      showDeleteModal(recipe.id);
                    }}
                  ></i>
                  <i
                    className="fa-solid fa-pencil text-success fa-xl  mx-2"
                    onClick={() => {
                      showUpdateModal(recipe);
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 text-center">
              <img src={noData} alt="no data" />
              <h3>No Data</h3>
              <p>there is no data here !! you can add using adding button</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
