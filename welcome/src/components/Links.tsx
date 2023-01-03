import React,{FC} from "react";

interface Props{
    github?: string;
}
const Links:FC<Props> = ({github}) => {
    return(
        <div>
            <ul>
             <li><a href='https://github.com/glunaa'>Github</a></li>
            </ul>
        </div>
    )
}
export default Links;