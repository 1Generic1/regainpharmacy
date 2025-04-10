import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";
import ModalImage from "react-modal-image"; // Replace Lightbox with ModalImage
import "./adminstyles/AdminProductDetailsPage.css";
import EditProductModal from '../EditProductModal';

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

  const [imagePosition, setImagePosition] = useState("first"); // Default to first position
  const [imageIndex, setImageIndex] = useState(0); // Default index for "specific" position
  const [newImageFile, setNewImageFile] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(""); // Image to display in the modal

  const [isEditVariantModalOpen, setIsEditVariantModalOpen] = useState(false);
  const [selectedVariantForEdit, setSelectedVariantForEdit] = useState(null);

  const [isEditSubVariantModalOpen, setIsEditSubVariantModalOpen] = useState(false);
  const [selectedSubVariantForEdit, setSelectedSubVariantForEdit] = useState(null);

  //state for filename and image preview
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");

  const [variantImagePreviews, setVariantImagePreviews] = useState([]);
  const [subVariantImagePreviews, setSubVariantImagePreviews] = useState([]); // For subvariant images
  const [productImagePreviews, setProductImagePreviews] = useState([]); // For product images
  const [variantImagePreview, setVariantImagePreview] = useState("");
  const [subVariantImagePreview, setSubVariantImagePreview] = useState("");

  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);


  const updateProductitem = (updatedProduct) => {
    setProduct(prev => ({
      ...updatedProduct,
      variants: updatedProduct.variants || prev.variants || []
    }));
    setVariants(updatedProduct.variants || []); // Also update the variants state
  };
  
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
    // Generate preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));

    console.log("Selected files:", files);
    setNewProductImage(files); // Update state with selected files
    fileInputRef.current = files; // Store files in the ref
    setProductImagePreviews(previews);
  };

  const handleEditVariant = async (variantId) => {
    const formData = new FormData();
    formData.append("name", selectedVariantForEdit.name);
    formData.append("option", selectedVariantForEdit.option);
    formData.append("price", selectedVariantForEdit.price);
    formData.append("stock", selectedVariantForEdit.stock);
    formData.append("imagePosition", imagePosition);
  
    if (imagePosition === "specific") {
      formData.append("imageIndex", imageIndex);
    }
  
     // Append the new image file if selected
  if (newImageFile) {
    // Check if the file exceeds the maximum size
    if (newImageFile.size > MAX_FILE_SIZE) {
      toast.error("The image exceeds the 2MB size limit");
      return;
    }

    formData.append("image", newImageFile);
  }
  
    try {
      const response = await API.put(`/variant/${variantId}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Variant updated successfully");
      setIsEditVariantModalOpen(false); // Close the modal
      fetchProductDetails(); // Refresh the product details
    } catch (error) {
      toast.error("Failed to update variant");
      console.error(error);
    }
  };


  const handleDeleteVariant = async (variantId) => {
    if (window.confirm("Are you sure you want to delete this variant?")) {
      try {
        await API.delete(`/variant/${variantId}/delete`);
        toast.success("Variant deleted successfully");
        fetchProductDetails(); // Refresh the product details
      } catch (error) {
        toast.error("Failed to delete variant");
        console.error(error);
      }
    }
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
     
    // Generate preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));

    console.log("Selected files:", files);
    setNewVariant((prev) => ({ ...prev, images: files })); // Update state with selected files
    setVariantImagePreviews(previews);
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

//handle edit subvariant
const handleEditSubVariant = async (subVariantId) => {
  const formData = new FormData();
  formData.append("name", selectedSubVariantForEdit.name);
  formData.append("price", selectedSubVariantForEdit.price);
  formData.append("stock", selectedSubVariantForEdit.stock);
  formData.append("imagePosition", imagePosition);

  if (imagePosition === "specific") {
    formData.append("imageIndex", imageIndex);
  }

   // Append the new image file if selected
   if (newImageFile) {
    // Check if the file exceeds the maximum size
    if (newImageFile.size > MAX_FILE_SIZE) {
      toast.error("The image exceeds the 2MB size limit");
      return;
    }

    formData.append("image", newImageFile);
  }

  try {
    const response = await API.put(`/subVariant/${subVariantId}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Sub-variant updated successfully");
    setIsEditSubVariantModalOpen(false); // Close the modal
    fetchProductDetails(); // Refresh the product details
  } catch (error) {
    toast.error("Failed to update sub-variant");
    console.error(error);
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

    // Generate preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));

    console.log("Selected files:", files);
    setNewSubVariant((prev) => ({ ...prev, images: files })); // Update state with selected files
    setSubVariantImagePreviews(previews);
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
      setSubVariantImagePreview("");
      return;
    }
    // Generate preview URL
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSubVariantImagePreview(previewUrl);
    } else {
      setSubVariantImagePreview("");
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

  // Handle single image change for add variant form
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("Image size should not exceed 2MB");
      e.target.value = null; // Clear the file input
      setNewVariant((prev) => ({ ...prev, image: null })); // Ensure image is set to null
      setVariantImagePreview("")
      return;
    }
    // Generate preview URL
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setVariantImagePreview(previewUrl);
    } else {
      setVariantImagePreview("");
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
          <div className="product-header">
            <h1>{product.name}</h1>
            <button 
              className="edit-product-btn"
              onClick={() => {
                setSelectedProductForEdit(product);
                setIsEditProductModalOpen(true);
              }}
            >
              Edit Product
            </button>
          </div>
          
          <div className="product-thedetails">
  <p>price: {product.price}</p>
  <p>stock: {product.stock}</p>
  <p>ratings: {product.rating}</p>
  <p>description: {product.description}</p>
</div>

{/* Add the EditProductModal */}
{isEditProductModalOpen && (
        <EditProductModal
          onClose={() => {
            setIsEditProductModalOpen(false);
            setSelectedProductForEdit(null);
          }}
          product={selectedProductForEdit}
          updateProductitem={updateProductitem}
        />
      )}
          {/* Product Images Section */}
          <div className="product-images-section">
            <h2>Product Images</h2>
            <div className="images-grid">
              {product?.images?.map((image, index) => (
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
                  {/* Display image previews */}
      <div className="image-previews">
        {productImagePreviews.map((preview, index) => (
          <img key={index} src={preview} alt={`Preview ${index + 1}`} className="image-preview" />
        ))}
      </div>
                  <div className="button-group">
                  <button type="submit" className="upload1-button" onClick={() => setProductImagePreviews([])}>Upload</button>
                  <button type="button" className="cancel1-button" onClick={() => {setShowAddProductImageForm(false); setProductImagePreviews([]);}}>
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
              {/* Display image preview */}
      {variantImagePreview && (
        <div className="image-preview">
          <img src={variantImagePreview} alt="Variant Preview" className="preview-image" />
        </div>
      )}
              <button type="submit">Add Variant</button>
              <button type="button" onClick={() => setShowAddVariantForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="variants-list">
          

          {/* Variant List */}
          {variants?.map((variant) => (
            <div key={variant._id} className="variant-item">
              {/* Header Row */}
          <div className="variant-header-row">
            <div className="variant-header-item">Variant Name</div>
            <div className="variant-header-item">Option</div>
            <div className="variant-header-item">Price</div>
            <div className="variant-header-item">Stock</div>
            <div className="variant-header-item">Subvariants</div>
            <div className="variant-header-item">Actions</div>
          </div>
              <div className="variant-header">
                <div className="variant-header-item variant-name">{variant.name}</div>
                <div className="variant-header-item">{variant.option}</div>
                <div className="variant-header-item">${variant.price}</div>
                <div className="variant-header-item">{variant.stock} in stock</div>
                <div className="variant-header-item">
                  {variant.subVariants?.length || 0} {/* Display subvariant count */}
                </div>
                <div className="variant-header-item">
                  <div className="variant-actions">
                    <button className="edit" onClick={() => {
      setSelectedVariantForEdit(variant); // Set the selected variant
      setIsEditVariantModalOpen(true); // Open the modal
    }}>Edit</button>
                    <button className="delete" onClick={() => handleDeleteVariant(variant._id)}>Delete</button>
                    <button onClick={() => toggleVariant(variant._id)} className="toggle-subvariants">
                      {expandedVariant === variant._id ? "Hide" : "Show"} Subvariants
                    </button>
                  </div>
                </div>
              </div>

              {isEditVariantModalOpen && (
  <div className="modal-overlay12">
    <div className="modal-content12 ">
      <h3>Edit Variant</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditVariant(selectedVariantForEdit._id);
        }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={selectedVariantForEdit?.name || ""}
            onChange={(e) =>
              setSelectedVariantForEdit({
                ...selectedVariantForEdit,
                name: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Option:
          <input
            type="text"
            name="option"
            value={selectedVariantForEdit?.option || ""}
            onChange={(e) =>
              setSelectedVariantForEdit({
                ...selectedVariantForEdit,
                option: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={selectedVariantForEdit?.price || ""}
            onChange={(e) =>
              setSelectedVariantForEdit({
                ...selectedVariantForEdit,
                price: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={selectedVariantForEdit?.stock || ""}
            onChange={(e) =>
              setSelectedVariantForEdit({
                ...selectedVariantForEdit,
                stock: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Image Position:
          <select
            value={imagePosition}
            onChange={(e) => setImagePosition(e.target.value)}
          >
            <option value="first">First</option>
            <option value="last">Last</option>
            <option value="specific">Specific Index</option>
          </select>
        </label>
        {imagePosition === "specific" && (
          <label>
            Image Index:
            <input
              type="number"
              value={imageIndex}
              onChange={(e) => setImageIndex(parseInt(e.target.value))}
              min={0}
              max={4} // Maximum index is 4 (for 5 images)
            />
          </label>
        )}
        <label>
          Upload New Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                // Check file size
                if (file.size > MAX_FILE_SIZE) {
                  toast.error("The image exceeds the 2MB size limit");
                  e.target.value = null; // Clear the file input
                  return;
                }

                // Update file name and preview
                setFileName(file.name);
                setPreview(URL.createObjectURL(file));
                setNewImageFile(file);
              }
            }}
          />
        </label>
        {/* Show file name and image preview */}
        {fileName && (
          <div className="file-info1">
            <p>Selected File: {fileName}</p>
            {preview && <img src={preview} alt="Product Preview" className="image-preview1" />}
          </div>
        )}
        <div className="button-group12">
          <button type="submit" className="save-button12">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-button12"
            onClick={() => setIsEditVariantModalOpen(false)}
          >
            Cancel
          </button>
          <button onClick={() => {setIsEditVariantModalOpen(false); setFileName(""); setPreview("");}}
           className="modal-close12"
           >Close</button>
        </div>
      </form>
    </div>
  </div>
)}
              {/* Variant Images Section */}
              <div className="variant-images-section">
                <h4>Variant Images</h4>
                <div className="images-grid">
                  {variant?.images?.map((image, index) => (
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

                {isEditSubVariantModalOpen && (
  <div className="modal-overlay12">
    <div className="modal-content12">
      <h3>Edit Subvariant</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditSubVariant(selectedSubVariantForEdit._id);
        }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={selectedSubVariantForEdit?.name || ""}
            onChange={(e) =>
              setSelectedSubVariantForEdit({
                ...selectedSubVariantForEdit,
                name: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={selectedSubVariantForEdit?.price || ""}
            onChange={(e) =>
              setSelectedSubVariantForEdit({
                ...selectedSubVariantForEdit,
                price: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={selectedSubVariantForEdit?.stock || ""}
            onChange={(e) =>
              setSelectedSubVariantForEdit({
                ...selectedSubVariantForEdit,
                stock: e.target.value,
              })
            }
            required
          />
        </label>
        <label>
          Image Position:
          <select
            value={imagePosition}
            onChange={(e) => setImagePosition(e.target.value)}
          >
            <option value="first">First</option>
            <option value="last">Last</option>
            <option value="specific">Specific Index</option>
          </select>
        </label>
        {imagePosition === "specific" && (
          <label>
            Image Index:
            <input
              type="number"
              value={imageIndex}
              onChange={(e) => setImageIndex(parseInt(e.target.value))}
              min={0}
              max={4} // Maximum index is 4 (for 5 images)
            />
          </label>
        )}
        <label>
          Upload New Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                // Check file size
                if (file.size > MAX_FILE_SIZE) {
                  toast.error("The image exceeds the 2MB size limit");
                  e.target.value = null; // Clear the file input
                  return;
                }

                // Update file name and preview
                setFileName(file.name);
                setPreview(URL.createObjectURL(file));
                setNewImageFile(file);
              }
            }}
          />
        </label>
        {/* Show file name and image preview */}
        {fileName && (
          <div className="file-info">
            <p>Selected File: {fileName}</p>
            {preview && <img src={preview} alt="Product Preview" className="image-preview" />}
          </div>
        )}
        <div className="button-group12">
          <button type="submit" className="save-button12">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-button12"
            onClick={() => setIsEditSubVariantModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="modal-close12"
            onClick={() =>{ setIsEditSubVariantModalOpen(false); setFileName(""); setPreview("");}}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
)}

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
                      {/* Display image previews */}
      <div className="image-previews">
        {variantImagePreviews.map((preview, index) => (
          <img key={index} src={preview} alt={`Preview ${index + 1}`} className="image-preview" />
        ))}
      </div>
                      <div className="button-group">
                      <button
                        type="button"
                        className="upload1-button"
                        onClick={() => {handleAddVariantImages(variant._id); setVariantImagePreviews([]);}}
                      >
                        Upload
                      </button>
                      <button type="button" className="cancel1-button" onClick={() => {setShowAddVariantImageForm(false); setVariantImagePreviews([]);}}>
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
                

                  {/* Subvariants List */}
                  {variant?.subVariants?.map((subVariant) => (
                    <div key={subVariant._id} className="subvariant-item">
                       {/* Subvariant Header Row */}
        <div className="subvariant-header-row">
          <div className="subvariant-header-item ">Variant name</div>
          <div className="subvariant-header-item">Subvariant name</div>
          <div className="subvariant-header-item">Price</div>
          <div className="subvariant-header-item">Stock</div>
          <div className="subvariant-header-item">Actions</div>
        </div>
                      {/* Subvariant Details */}
    <div className="subvariant-details">
    <div className="subvariant-header-item variant-name">{variant.name}</div>
      <div className="subvariant-header-item">{subVariant.name}</div>
      <div className="subvariant-header-item">${subVariant.price}</div>
      <div className="subvariant-header-item">{subVariant.stock} in stock</div>
      <div className="subvariant-header-item">
        <div className="subvariant-actions">
          <button 
            className="edit"
            onClick={() => {
              setSelectedSubVariantForEdit(subVariant); // Set the selected subvariant
              setIsEditSubVariantModalOpen(true); // Open the modal
            }}
          >Edit</button>
          <button className="delete">Delete</button>
        </div>
      </div>
    </div>

                      {/* Subvariant Images Section */}
                      <div className="subvariant-images-section">
                        <h4>Subvariant Images</h4>
                        <div className="images-grid">
                          {subVariant?.images?.map((image, index) => (
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
                              {/* Display image previews */}
      <div className="image-previews">
        {subVariantImagePreviews.map((preview, index) => (
          <img key={index} src={preview} alt={`Preview ${index + 1}`} className="image-preview" />
        ))}
      </div>
                              <div className="button-group">
                              <button type="button"  className="upload1-button" onClick={() => {handleAddSubVariantImages(subVariant._id); setSubVariantImagePreviews([]);}}>Upload</button>
                              <button type="button" className="cancel1-button" onClick={() => {setShowAddSubVariantImageForm(false); setSubVariantImagePreviews([]);}}>
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
                        {/* Display image preview */}
      {subVariantImagePreview && (
        <div className="image-preview">
          <img src={subVariantImagePreview} alt="Subvariant Preview" className="preview-image" />
        </div>
      )}
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