import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import { categories, colors, formInputsList, productList } from "./data";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ui/ErrorMessage";
import CircleColors from "./components/ui/CircleColors";
import { v4 as uuid } from "uuid";
import Selects from "./components/ui/Selects";
import type { TProductName } from "./types";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const defultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  // STATE
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defultProduct);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defultProduct);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColor] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  console.log(productToEditIdx);

  // HANDLER
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const openEdit = () => {
    setIsOpenEditModal(true);
  };
  const closeEdit = () => {
    setIsOpenEditModal(false);
  };

  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);

  const onChangeHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onChangeEditHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onCancel = () => {
    setProduct(defultProduct);
    close();
  };

  const removeProductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted", {style: {backgroundColor: "black", color: "white"}});
  };

  const supmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = productValidation({ title, description, price, imageURL });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defultProduct);
    setTempColor([]);
    close();
    toast("Product has been added successfully", {style: {backgroundColor: "black", color: "white"}});
  };

  const supmitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;

    const errors = productValidation({ title, description, price, imageURL });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);

    setProductToEdit(defultProduct);
    setTempColor([]);
    closeEdit();
    toast("Product has been Edited successfully", {style: {backgroundColor: "black", color: "white"}});
  };

  // RENDER
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEdit={openEdit}
      idx={idx}
      setProductToEditInx={setProductToEditIdx}
      openConfirmModal={openConfirmModal}
    />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandeler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColors
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }

        if (productToEdit.colors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: TProductName
  ) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[2px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandeler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  return (
    /* */
    <main className="container mx-auto">
      <Button className="bg-green-700" onClick={open}>
        Add Product
      </Button>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 m-5">
        {renderProductList}
      </div>

      {/* add modal */}

      <Modal isOpen={isOpen} closeModal={onCancel} title="Add a new product">
        <form className="space-y-3" onSubmit={supmitHandler}>
          {renderFormInputList}
          <Selects
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center space-x-2">
            {" "}
            {renderProductColors}
          </div>
          <div className="flex items-center space-x-2">
            {tempColors.map((color) => (
              <span
                key={color}
                className=" p-1 mr-1 mb-1 rounded-md text-xs text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button className=" bg-red-700" onClick={onCancel}>
              Cancel
            </Button>
            <Button className=" bg-indigo-700">Submit</Button>
          </div>
        </form>
      </Modal>

      {/* Edit modal*/}

      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEdit}
        title="Edit this product"
      >
        <form className="space-y-3" onSubmit={supmitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product imageURL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product price", "price")}

          {/* {renderFormInputList} */}
          <Selects
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex flex-wrap items-center space-x-2">
            {" "}
            {renderProductColors}
          </div>
          <div className="flex flex-wrap items-center space-x-2">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className=" p-1 mr-1 mb-1 rounded-md text-xs text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button className=" bg-red-700" onClick={onCancel}>
              Cancel
            </Button>
            <Button className=" bg-indigo-700">Submit</Button>
          </div>
        </form>
      </Modal>

      {/* DELETE PRODUCT CONFIRM MODAL */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <Toaster />
    </main>
  );
};

export default App;
