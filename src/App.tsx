import { useState, type ChangeEvent } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import { formInputsList, productList } from "./data";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces";

interface IProps {}

const App = ({}: IProps) => {
  const [product, setProduct] = useState <IProduct> ({
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    }
  })
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {setIsOpen(true);}
  function close() {setIsOpen(false);}
  const onCangeHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target
    
    setProduct({
      ...product,
      [name]: value,
    })
  }

  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col">
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onCangeHandeler} />
    </div>
  ));
  return (
    /* */
    <main className="container mx-auto">
      <Button className="bg-green-700" onClick={open}>
        Add Product
      </Button>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 m-5">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={close} title="Add a new product">
        <form className="space-y-3">
          {renderFormInputList}
          <div className="flex items-center space-x-3">
            <Button className=" bg-red-700" onClick={close}>
              Cancel
            </Button>
            <Button className=" bg-indigo-700">Submit</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
