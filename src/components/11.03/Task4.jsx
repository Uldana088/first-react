import { useState } from "react";

export default function TaggleText() {
    const [show , setShow] = useState(false)
    return(
        <div>
            <button onClick={()=>setShow(!show)}>
                {show ? "жасыру":'кобырек'}
            </button>
            {show && <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur veniam eligendi veritatis ad voluptatibus molestiae iste placeat corporis optio, consequuntur corrupti doloribus saepe illum! Doloremque alias ut eaque exercitationem! </p> || <p> акпарат</p>}
        </div>
    )
}