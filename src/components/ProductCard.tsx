import type { IProduct } from "../interfaces";
import { txtSlicer } from "../utils";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColors from "./ui/CircleColors";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEdit: () => void;
  setProductToEditInx: (value: number) => void;
  idx: number;
}

const ProductCard = ({ product, setProductToEdit, openEdit, setProductToEditInx, idx }: IProps) => {
  const { title, description, imageURL, price, colors, category } = product;

  const renderProductColors = colors.map(color => <CircleColors key={color} color={color} />);

  const onEdit = () => {
    setProductToEdit(product);
    openEdit();
    setProductToEditInx(idx)
  };

  return (
    <div className=" max-w-sm md:max-w-lg mx-auto md:mx-0 border my-3 rounded-md p-2 flex flex-col">
      <Image
        imageURL={imageURL}
        alt={"product name"}
        className="rounded-md mb-2 h-50 w-90"
      />
      <h3>{title}</h3>
      <p className="text-sm">{txtSlicer(description)}</p>

      <div className="flex items-center space-x-2"> {renderProductColors}</div>

      <div className="flex items-center justify-between">
        <span>${price}</span>
        <Image
          imageURL={category.imageURL}
          alt="product name"
          className="h-10 w-10 rounded-full object-bottom"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className=" bg-indigo-700" onClick={onEdit}>
          Edit
        </Button>
        <Button className=" bg-red-500">Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;
