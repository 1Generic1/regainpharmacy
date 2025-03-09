import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";
import ModalImage from "react-modal-image"; // Replace Lightbox with ModalImage
import "./adminstyles/AdminProductDetailsPage.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const AdminProductDetailsPage = () => {
  const fileInputRef = useRef(null);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [expandedVariant, setExpandedVariant] = useState(null);
  const [showAddVariantForm, setShowAddVariantForm] = useState(false);
  const [newVariant, setNewVariant] = useState({
    name: "",
    option: "",
    price: "",
    stock: "",
    images: [],
  });

  // State for subvariant form
  const [showAddSubVariantForm, setShowAddSubVariantForm] = useState(false);
  const [newSubVariant, setNewSubVariant] = useState({
    name: "",
    price: "",
    stock: "",
    images: [],
  });
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  // State for product images
  const [showAddProductImageForm, setShowAddProductImageForm] = useState(false);
  const [newProductImage, setNewProductImage] = useState(null);

  // State for variant and subvariant image forms
  const [showAddVariantImageForm, setShowAddVariantImageForm] = useState(false);
  const [showAddSubVariantImageForm, setShowAddSubVariantImageForm] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(""); // Image to display in the modal

  // Fetch product details
  const fetchProductDetails = useCallback(() => {
    API.get(`/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setVariants(res.data.variants || []);
        console.log("Fetched product:", res.data);
      })
      .catch(() => toast.error("Failed to fetch product details"));
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  // Handle file change for product images
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array

    // Check if any file exceeds the maximum size
    const isFileSizeValid = files.every((file) => file.size <= MAX_FILE_SIZE);

    if (!isFileSizeValid) {
      toast.error("One or more images exceed the 2MB size limit");
      e.target.value = null; // Clear the file input
      return;
    }

    console.log("Selected files:", files);
    setNewProductImage(files); // Update state with selected files
    fileInputRef.current = files; // Store files in the ref
  };

  // Handle variant image change for multiple images
  const handleVariantImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array

    // Check if any file exceeds the maximum size
    const isFileSizeValid = files.every((file) => file.size <= MAX_FILE_SIZE);

    if (!isFileSizeValid) {
      toast.error("One or more images exceed the 2MB size limit");
      e.target.value = null; // Clear the file input
      return;
    }

    console.log("Selected files:", files);
    setNewVariant((prev) => ({ ...prev, images: files })); // Update state with selected files
  };

  // Function to upload variant images
const handleAddVariantImages = async (variantId) => {
  console.log("newVariant.images:", newVariant.images);
  if (!newVariant.images || newVariant.images.length === 0) {
    toast.error("No images selected");
    return;
  }

  const formData = new FormData();
  newVariant.images.forEach((file) => {
    formData.append("images", file); // Append each file to the FormData object
  });

  try {
    const response = await API.post(`/variant/${variantId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload response:", response.data);
    toast.success("Variant images added successfully");
    setNewVariant((prev) => ({ ...prev, images: [] })); // Clear the selected images
    setShowAddVariantImageForm(false)
    fetchProductDetails(); // Refresh the product details
  } catch (error) {
    console.error("Upload error:", error);
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message); // Displays the error message in a toast
    } else {
      toast.error("Something went wrong. Please try again.");
    };
  }
};

// Function to delete a variant image
const handleDeleteVariantImage = async (variantId, imageIndex) => {
  try {
    const response = await API.delete(`/variant/${variantId}/delete-image/${imageIndex}`);
    console.log("Delete response:", response.data);

    // Update the state to remove the deleted image
    const updatedVariants = variants.map((variant) => {
      if (variant._id === variantId) {
        return {
          ...variant,
          images: variant.images.filter((_, index) => index !== imageIndex),
        };
      }
      return variant;
    });

    setVariants(updatedVariants);
    toast.success("Variant image deleted successfully");
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Failed to delete variant image");
  }
};

  // Handle subvariant image change
  const handleSubVariantImagesChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array

    // Check if any file exceeds the maximum size
    const isFileSizeValid = files.every((file) => file.size <= MAX_FILE_SIZE);

    if (!isFileSizeValid) {
      toast.error("One or more images exceed the 2MB size limit");
      e.target.value = null; // Clear the file input
      return;
    }

    console.log("Selected files:", files);
    setNewSubVariant((prev) => ({ ...prev, images: files })); // Update state with selected files
  };

  //handle the upload suvariant images
  const handleAddSubVariantImages = async (subVariantId) => {
    if (!newSubVariant.images || newSubVariant.images.length === 0) {
      toast.error("No images selected");
      return;
    }
  
    const formData = new FormData();
    newSubVariant.images.forEach((file) => {
      formData.append("images", file); // Append each file to the FormData object
    });
  
    try {
      const response = await API.post(`/subvariant/${subVariantId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Upload response:", response.data);
      toast.success("Sub-variant images added successfully");
      setNewSubVariant((prev) => ({ ...prev, images: [] })); // Clear the selected images
      setShowAddSubVariantForm(false);
      fetchProductDetails(); // Refresh the product details
      setShowAddSubVariantImageForm(false);
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); // Displays the error message in a toast
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

   // Delete image from subvariant
   const handleDeleteSubVariantImage = async (subVariantId, imageIndex) => {
    try {
      await API.delete(`/subvariant/${subVariantId}/delete-image/${imageIndex}`);
      const updatedVariants = variants.map((variant) => {
        const updatedSubVariants = variant.subVariants.map((subVariant) => {
          if (subVariant._id === subVariantId) {
            return {
              ...subVariant,
              images: subVariant.images.filter((_, index) => index !== imageIndex),
            };
          }
          return subVariant;
        });
        return { ...variant, subVariants: updatedSubVariants };
      });
      setVariants(updatedVariants);
      toast.success("Subvariant image deleted successfully");
    } catch (error) {
      toast.error("Failed to delete subvariant image");
    }
  };

   // Handle single subvariant image change
   const handleSubVariantImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("Image size should not exceed 2MB");
      e.target.value = null; // Clear the file input
      setNewSubVariant((prev) => ({ ...prev, images: null })); // Ensure image is set to null
      return;
    }
    setNewSubVariant((prev) => ({ ...prev, images: file }));
  };

  // Handle adding product images
  const handleAddProductImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    newProductImage.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await API.post(`/products/${productId}/add-images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload response:", response.data);
      setProduct(response.data);
      toast.success("Images added successfully");
      setShowAddProductImageForm(false);
      setNewProductImage([]);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); // Displays the error message in a toast
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Delete product image
  const handleDeleteProductImage = async (imageIndex) => {
    try {
      await API.delete(`/products/${productId}/delete-image/${imageIndex}`);
      const updatedImages = product.images.filter((_, index) => index !== imageIndex);
      setProduct({ ...product, images: updatedImages });
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };



 

  // Open modal for a single image
  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  // Toggle variant expansion
  const toggleVariant = (variantId) => {
    if (expandedVariant === variantId) {
      setExpandedVariant(null); // Collapse the variant
      setShowAddSubVariantForm(false); // Hide the subvariant form
    } else {
      setExpandedVariant(variantId); // Expand the variant
    }
  };

  // Handle "Add Variant" button click
  const handleAddVariantClick = () => {
    setShowAddVariantForm(true);
  };

  // Handle input change for variant form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVariant((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change for variant form
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("Image size should not exceed 2MB");
      e.target.value = null; // Clear the file input
      setNewVariant((prev) => ({ ...prev, image: null })); // Ensure image is set to null
      return;
    }
    setNewVariant((prev) => ({ ...prev, image: file }));
  };

  // Handle variant form submission
  const handleAddVariantSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newVariant.name);
    formData.append("option", newVariant.option);
    formData.append("price", newVariant.price);
    formData.append("stock", newVariant.stock);
    if (newVariant.images) {
      formData.append("image", newVariant.images);
    }

    let variantName = newVariant.name;
    try {
      const response = await API.post(`/variant/${productId}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      variantName = response.data.name;
      toast.success(`${variantName} added successfully`);
      setShowAddVariantForm(false);
      setNewVariant({ name: "", option: "", price: "", stock: "", images: null});
      fetchProductDetails(); // Refresh the product details
    } catch (error) {
      toast.error(`Failed to add ${variantName}`);
      console.error(error);
    }
  };

  // Handle subvariant form input change
  const handleSubVariantInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubVariant((prev) => ({ ...prev, [name]: value }));
  };

  // Handle subvariant form submission
  const handleAddSubVariantSubmit = async (e, variantId) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newSubVariant.name);
    formData.append("price", newSubVariant.price);
    formData.append("stock", newSubVariant.stock);
    if (newSubVariant.images) {
      formData.append("image", newSubVariant.images);
    }
    let subVariantName = newSubVariant.name;
    try {
      const response = await API.post(`/subVariant/${variantId}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      subVariantName = response.data.name;
      toast.success(` ${subVariantName} added successfully`);
      setShowAddSubVariantForm(false);
      setNewSubVariant({ name: "", price: "", stock: "", images: null});
      fetchProductDetails(); // Refresh the product details
    } catch (error) {
      toast.error(`Failed to add ${subVariantName}`);
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Parent component re-rendered!");
  });

  
  return (
    <div className="admin-product-details">
      {product && (
        <div className="product-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          {/* Product Images Section */}
          <div className="product-images-section">
            <h3>Product Images</h3>
            <div className="images-grid">
              {product.images.map((image, index) => (
                <div key={index} className="image-item">
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    onClick={() => openModal(image)} // Open modal on click
                  />
                  <button onClick={() => handleDeleteProductImage(index)}>Delete</button>
                </div>
              ))}
            </div>
            <button className="add-product-image" onClick={() => setShowAddProductImageForm(true)}>+ Add Product Image</button>

            {/* Add Product Image Form */}
            {showAddProductImageForm && (
              <div className="add-image-form">
                <form onSubmit={handleAddProductImage}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="images"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                  />
                  <div className="button-group">
                  <button type="submit" className="upload1-button">Upload</button>
                  <button type="button" className="cancel1-button" onClick={() => setShowAddProductImageForm(false)}>
                    Cancel
                  </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for displaying images using react-modal-image */}
      {isModalOpen && (
        <ModalImage
          small={modalImage} // Small image (required)
          large={modalImage} // Large image (required)
          alt="Product Image" // Alt text
          onClose={closeModal} // Close handler
        />
      )}

      {/* Variants Section */}
      <div className="variants-section">
        <h2>Variants</h2>
        <button className="add-variant" onClick={handleAddVariantClick}>
          + Add Variant
        </button>

        {showAddVariantForm && (
          <div className="add-variant-form">
            <h3>Add New Variant</h3>
            <form onSubmit={handleAddVariantSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newVariant.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Option:
                <input
                  type="text"
                  name="option"
                  value={newVariant.option}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={newVariant.price}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Stock:
                <input
                  type="number"
                  name="stock"
                  value={newVariant.stock}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Image:
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
              <button type="submit">Add Variant</button>
              <button type="button" onClick={() => setShowAddVariantForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="variants-list">
          {/* Header Row */}
          <div className="variant-header-row">
            <div className="variant-header-item">Name</div>
            <div className="variant-header-item">Option</div>
            <div className="variant-header-item">Price</div>
            <div className="variant-header-item">Stock</div>
            <div className="variant-header-item">Subvariants</div>
            <div className="variant-header-item">Actions</div>
          </div>

          {/* Variant List */}
          {variants.map((variant) => (
            <div key={variant._id} className="variant-item">
              <div className="variant-header">
                <div className="variant-header-item">{variant.name}</div>
                <div className="variant-header-item">{variant.option}</div>
                <div className="variant-header-item">${variant.price}</div>
                <div className="variant-header-item">{variant.stock} in stock</div>
                <div className="variant-header-item">
                  {variant.subVariants?.length || 0} {/* Display subvariant count */}
                </div>
                <div className="variant-header-item">
                  <div className="variant-actions">
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                    <button onClick={() => toggleVariant(variant._id)} className="toggle-subvariants">
                      {expandedVariant === variant._id ? "Hide" : "Show"} Subvariants
                    </button>
                  </div>
                </div>
              </div>

              {/* Variant Images Section */}
              <div className="variant-images-section">
                <h4>Variant Images</h4>
                <div className="images-grid">
                  {variant.images?.map((image, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={image}
                        alt={`Variant Image ${index + 1}`}
                        onClick={() => openModal(image)}
                      />
                      <button onClick={() => handleDeleteVariantImage(variant._id, index)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Variant Image Button */}
                <button
                  className="add-variant-image"
                  onClick={() => setShowAddVariantImageForm(variant._id)}
                >
                  + Add Variant Image
                </button>

                {/* Add Variant Image Form */}
                {showAddVariantImageForm === variant._id && (
                  <div className="add-variant-image-form">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="file"
                        name="variantImages"
                        onChange={handleVariantImageChange}
                        accept="image/*"
                        multiple
                      />
                      <div className="button-group">
                      <button
                        type="button"
                        className="upload1-button"
                        onClick={() => handleAddVariantImages(variant._id)}
                      >
                        Upload
                      </button>
                      <button type="button" className="cancel1-button" onClick={() => setShowAddVariantImageForm(false)}>
                        Cancel
                      </button>
                      </div>
                      
                    </form>
                  </div>
                )}
              </div>

              {/* Subvariants Section */}
              {expandedVariant === variant._id && (
                <div className="subvariants-section">
                  {/* Subvariants Header Row */}
                  <div className="subvariant-header-row">
                  <div className="subvariant-header-item">VariantName</div>
                    <div className="subvariant-header-item">Name</div>
                    <div className="subvariant-header-item">Price</div>
                    <div className="subvariant-header-item">Stock</div>
                    <div className="subvariant-header-item">Actions</div>
                  </div>

                  {/* Subvariants List */}
                  {variant.subVariants?.map((subVariant) => (
                    <div key={subVariant._id} className="subvariant-item">
                      {/* Subvariant Details */}
    <div className="subvariant-details">
    <div className="subvariant-header-item">{variant.name}</div>
      <div className="subvariant-header-item">{subVariant.name}</div>
      <div className="subvariant-header-item">${subVariant.price}</div>
      <div className="subvariant-header-item">{subVariant.stock} in stock</div>
      <div className="subvariant-header-item">
        <div className="subvariant-actions">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </div>
      </div>
    </div>

                      {/* Subvariant Images Section */}
                      <div className="subvariant-images-section">
                        <h4>Subvariant Images</h4>
                        <div className="images-grid">
                          {subVariant.images?.map((image, index) => (
                            <div key={index} className="image-item">
                              <img
                                src={image}
                                alt={`Subvariant Image ${index + 1}`}
                                onClick={() => openModal(image)}
                              />
                              <button onClick={() => handleDeleteSubVariantImage(subVariant._id, index)}>
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Add Subvariant Image Button */}
                        <button
                          className="add-subvariant-image"
                          onClick={() => setShowAddSubVariantImageForm(subVariant._id)}
                        >
                          + Add Subvariant Image
                        </button>

                        {/* Add Subvariant Image Form */}
                        {showAddSubVariantImageForm === subVariant._id && (
                          <div className="add-subvariant-image-form">
                            <form onSubmit={(e) => e.preventDefault()}>
                              <input
                                type="file"
                                name="subvariantImages"
                                onChange={handleSubVariantImagesChange}
                                accept="image/*"
                                multiple
                              />
                              <div className="button-group">
                              <button type="button"  className="upload1-button" onClick={() => handleAddSubVariantImages(subVariant._id)}>Upload</button>
                              <button type="button" className="cancel1-button" onClick={() => setShowAddSubVariantImageForm(false)}>
                                Cancel
                              </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Subvariant Button */}
                  <button
                    className="add-subvariant"
                    onClick={() => {
                      setSelectedVariantId(variant._id);
                      setShowAddSubVariantForm(true);
                    }}
                  >
                    + Add Subvariant
                  </button>

                  {/* Add Subvariant Form */}
                  {showAddSubVariantForm && selectedVariantId === variant._id && (
                    <div className="add-subvariant-form">
                      <h3>Add New Subvariant</h3>
                      <form onSubmit={(e) => handleAddSubVariantSubmit(e, variant._id)}>
                        <label>
                          Name:
                          <input
                            type="text"
                            name="name"
                            value={newSubVariant.name}
                            onChange={handleSubVariantInputChange}
                            required
                          />
                        </label>
                        <label>
                          Price:
                          <input
                            type="number"
                            name="price"
                            value={newSubVariant.price}
                            onChange={handleSubVariantInputChange}
                            required
                          />
                        </label>
                        <label>
                          Stock:
                          <input
                            type="number"
                            name="stock"
                            value={newSubVariant.stock}
                            onChange={handleSubVariantInputChange}
                            required
                          />
                        </label>
                        <label>
                          Image:
                          <input
                            type="file"
                            name="image"
                            onChange={handleSubVariantImageChange}
                            accept="image/*"
                          />
                        </label>
                        <button type="submit">Add Subvariant</button>
                        <button type="button" onClick={() => setShowAddSubVariantForm(false)}>
                          Cancel
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetailsPage;