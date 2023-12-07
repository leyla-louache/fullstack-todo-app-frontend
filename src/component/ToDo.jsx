import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { pink, red } from '@mui/material/colors';
import { useState } from 'react'

const ToDo = ({text, updateMode, deleteToDo, isChecked, handlechange, iconsvisibility, mykey, textdecoration}) => {
   const [doneTodo, setDoneTodo] = useState(isChecked)
    const handleonchange = () => {
      setDoneTodo(!doneTodo)
    }
   
  return (
    <div id={mykey}>
      <div className="element-todo">
          <Checkbox
              className="element-todo"
              icon={<FavoriteBorder />} checkedIcon={<Favorite/>} sx={{color: red[800],'&.Mui-checked': {color: red[400],}, }}                     
              onChange={handleonchange}
              onClick={handlechange}
              checked={doneTodo} /> 
          <div className={textdecoration}>{text}</div>   
          <div className="icons" style={iconsvisibility}>
            <BiEdit className="icon" onClick={updateMode}/>
            <AiFillDelete className="icon" onClick={deleteToDo}/>
          </div>
      </div>
    </div>

  )
}

export default ToDo
