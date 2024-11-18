import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import * as yup from "yup";
import { Product } from "../interfaces/Product";
import { getProductById, updateProduct } from "../services/productsService";

interface UpdateProductProps {
  onHide: Function;
  refresh: Function;
  productId: string;
}

const UpdateProduct: FunctionComponent<UpdateProductProps> = ({
  productId,
  onHide,
  refresh,
}) => {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    getProductById(productId)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const formik: FormikValues = useFormik({
    initialValues: product,
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      price: yup.number().required().moreThan(0),
      category: yup.string().required().min(2),
      description: yup.string().required().min(2),
      image: yup.string().required().url(),
    }),
    onSubmit: (values) => {
      updateProduct({ ...values, id: productId })
        .then(() => {
          alert("Product was updated successfully!");
          onHide();
          refresh();
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="container w-75">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Laptop"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="name">Name</label>
            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="name@example.com"
              name="price"
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="price">Price</label>
            {formik.touched.price && formik.errors.price && (
              <p className="text-danger">{formik.errors.price}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="catgeory"
              placeholder="category"
              name="category"
              value={formik.values.category}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="catgeory">Category</label>
            {formik.touched.category && formik.errors.category && (
              <p className="text-danger">{formik.errors.category}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="description"
              name="description"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="description">Description</label>
            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="image"
              placeholder="image"
              name="image"
              value={formik.values.image}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="image">Image</label>
            {formik.touched.image && formik.errors.image && (
              <p className="text-danger">{formik.errors.image}</p>
            )}
          </div>
          <button
            className="btn btn-warning mt-3 w-100"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
