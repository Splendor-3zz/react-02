interface IProps {

}

const ProductCard = ({}: IProps) => {
    return(
        <div className=" border mx-5 my-3 rounded-md p-2 flex flex-col">
            <img src="https://th.bing.com/th/id/OIP.lv7EvRdtAW6Tf84YVpcCowHaE7?w=288&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7"
             alt="product name" />
            <h3>Product Card</h3>
            <p className="text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, sed.</p>
            <div className="flex  items-center my-4 space-x-2">
            <span className="h-5 w-5 bg-purple-900 rounded-full cursor-pointer"/>
            <span className="h-5 w-5 bg-red-600 rounded-full cursor-pointer"/>
            <span className="h-5 w-5 bg-yellow-500 rounded-full cursor-pointer"/>
            </div>
            <div className="flex items-center justify-between">
                <span>$500</span>
                <img className="h-10 w-10 rounded-full" 
                src="https://th.bing.com/th/id/OIP.lv7EvRdtAW6Tf84YVpcCowHaE7?w=288&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
                alt="product name" />
            </div>
            <div className="flex items-center justify-between space-x-2 mt-5">
                <button className=" w-full rounded-md cursor-pointer bg-indigo-700">Edit</button>
                <button className=" w-full rounded-md cursor-pointer bg-red-500">Delete</button>
            </div>
        </div>
    )
}

export default ProductCard