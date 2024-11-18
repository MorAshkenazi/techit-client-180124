import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import UpdateProduct from "./UpdateProduct";

interface UpdateProductModalProps {
  show: boolean;
  onHide: Function;
  refresh: Function;
  productId: string;
}

const UpdateProductModal: FunctionComponent<UpdateProductModalProps> = ({
  show,
  onHide,
  refresh,
  productId,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateProduct
            onHide={onHide}
            refresh={refresh}
            productId={productId}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
