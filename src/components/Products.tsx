import { FunctionComponent, useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { getAllProducts } from "../services/productsService";
import Navbar from "./Navbar";
import { getUserById } from "../services/usersService";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { addToCart } from "../services/cartsService";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [productsChanged, setProductsChanged] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");

  useEffect(() => {
    // check if admin
    if (localStorage.getItem("userId") != null) {
      getUserById()
        .then((res) => setIsAdmin(res.data.isAdmin))
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [productsChanged]);

  let handleAddProduct = () => {
    // open the add product modal
    setOpenAddModal(true);
  };

  let refresh = () => {
    setProductsChanged(!productsChanged);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h5 className="display-5 my-2">PRODUCTS</h5>
        {isAdmin && (
          <button className="btn btn-success" onClick={handleAddProduct}>
            Add product
          </button>
        )}
        <div className="row mt-3">
          {products.length ? (
            products.map(
              (product: Product) =>
                product.available && (
                  <div
                    key={product.id}
                    className="card col-md-4"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-header">{product.category}</div>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      title={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text text-success">{product.price}$</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          addToCart(product.id as string)
                            .then(() => {
                              alert("Product was added successfully");
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                      {isAdmin && (
                        <span>
                          <button
                            className="btn btn-warning mx-1"
                            onClick={() => {
                              setOpenUpdateModal(true);
                              setProductId(product.id as string);
                            }}
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setProductId(product.id as string);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )
            )
          ) : (
            <p>No products </p>
          )}
        </div>
      </div>
      <AddProductModal
        show={openAddModal}
        onHide={() => setOpenAddModal(false)}
        refresh={refresh}
      />
      <UpdateProductModal
        show={openUpdateModal}
        onHide={() => setOpenUpdateModal(false)}
        refresh={refresh}
        productId={productId}
      />
      <DeleteProductModal
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        refresh={refresh}
        productId={productId}
      />
    </>
  );
};

export default Products;
