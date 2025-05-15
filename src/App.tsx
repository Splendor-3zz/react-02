import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";

interface IProps {}

const App = ({}: IProps) => {
    const [isOpen, setIsOpen] = useState(false)
  
    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }
  return (
    /* */ 
    <main className="container mx-auto">
      <Button className="bg-green-700" onClick={open}>
        Add Product
      </Button>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 m-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Modal isOpen={isOpen} closeModal={close} title="Add a new product">
        <div className="flex items-center space-x-3">
        <Button  className=" bg-red-700" onClick={close}>
          Cancel
        </Button>
        <Button  className=" bg-indigo-700">
          Submit
        </Button>
        </div>
        
      </Modal>
    </main>
  );
};

export default App;
