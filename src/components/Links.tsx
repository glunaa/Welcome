import React,{FC} from "react";

interface Props{
    link?: string;
}
const Links:FC<Props> = ({link}) => {
    return(
        <div>
            <ul>
             <li><a href='https://github.com/glunaa'>Github</a></li>
            </ul>
        </div>
    )
}
export default Links;