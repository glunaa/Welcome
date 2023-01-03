import React,{FC} from "react";

interface Props{
    header:string;
    position: string;
}
const Header:FC<Props> = ({header,position}) => {
    return(
        <div>
        <h1>{header}</h1>
        <h2>{position}</h2>
        </div>
    );
}
export default Header;

