import type { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    color: string;
}

const CircleColors = ({color, ...rest}: IProps) => {
    return <span className={`block h-5 w-5 rounded-full cursor-pointer mb-1`} style={{background: color}} {...rest}/>
}

export default CircleColors