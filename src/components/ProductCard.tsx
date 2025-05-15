import type { IProduct } from "../interfaces";
import { txtSlicer } from "../utils";
import Image from "./Image"
import Button from "./ui/Button"

interface IProps {
    product: IProduct;
}

const ProductCard = ({ product}: IProps) => {
    const {title, description, imageURL}= product;
    return(
        <div className=" max-w-sm md:max-w-lg mx-auto md:mx-0 border my-3 rounded-md p-2 flex flex-col">
            <Image imageURL={imageURL} alt={"product name"} className="rounded-md mb-2 h-50 w-90"/>
            <h3>{title}</h3>
            <p className="text-sm">{txtSlicer(description)}</p>
            <div className="flex  items-center my-4 space-x-2">
            <span className="h-5 w-5 bg-purple-900 rounded-full cursor-pointer"/>
            <span className="h-5 w-5 bg-red-600 rounded-full cursor-pointer"/>
            <span className="h-5 w-5 bg-yellow-500 rounded-full cursor-pointer"/>
            </div>
            <div className="flex items-center justify-between">
                <span>$500</span>
                <Image imageURL={imageURL} alt="product name" className="h-10 w-10 rounded-full object-bottom"/>
            </div>
            <div className="flex items-center justify-between space-x-2 mt-5">
                <Button className=" bg-indigo-700" onClick={() => {console.log("clicked")}}>Edit</Button>
                <Button className=" bg-red-500">Delete</Button>
            </div>
        </div>
    )
}

export default ProductCard