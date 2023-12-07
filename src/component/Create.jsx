import React from 'react'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import {IconButton} from '@mui/material'
import { addTodo, getAllToDo, updateToDo, deleteToDo, updateCheckedToDo} from '../utils/HandleApi'
import ToDo from './ToDo'
import Filters from './Filters'
import { useEffect } from 'react'

const Create = () => {
  const [text, setText] = useState("")
  const [toDo, setToDo] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [checkedIsUpdating, setCheckedIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [toDoDone, setToDoDone] = useState([])
  const [toDoPending, setToDoPending] = useState([])
  const [updateSpan, setUpdateSpan] = useState('all')
  const [myStyle, setMyStyle] = useState({});
  
  useEffect(() => {
    getAllToDo(setToDo, setToDoPending, setToDoDone)
  }, []) 

 
  const updateMode=(_id,text) => {
    setMyStyle([])
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
    setMyStyle(prevState => ({...toDoId,[_id]: !prevState[_id]}))
    
  }

  const handlechange=(_id,isChecked) => {
    setIsChecked(!isChecked)
    setCheckedIsUpdating(true)
    setToDoId(_id)
  }

  const clearCompleted = () =>{
    toDo.map((item) => {
      item.isChecked == true && deleteToDo(item._id, setToDo, setToDoPending, setToDoDone)
    })
  }
 
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className='main'>

      <div className="form">
        <input type="text" 
        className="create_form_input" 
        placeholder='Add todo..' 
        value={capitalizeFirstLetter(text)} 
        onChange={(e) => setText(e.target.value)}/>

        <IconButton
        alignItems="flex-end"
        sx={{
          color:'white',
          backgroundColor:'black',
          "&:hover": { backgroundColor:'gray'}
        }}
        type="button" 
        className='add-and-update-btn' 
        onClick={isUpdating ? () => 
        { 
          updateToDo(toDoId, text, setToDo, setText, setIsUpdating,setToDoPending, setToDoDone)
          setMyStyle([])
        } 
        : 
        () => {
          addTodo(text, setText, setToDo, setToDoPending, setToDoDone)
        }}>
         {isUpdating ? <DoneRoundedIcon fontSize="large"/>: <AddIcon fontSize="large" />}
        </IconButton>
        {checkedIsUpdating && updateCheckedToDo(toDoId, isChecked, setToDo, setCheckedIsUpdating,setToDoPending, setToDoDone)}
        
      </div>
     
      <Filters
        All = {()=>{setUpdateSpan('all')}}
        handlePendingFilter = {()=>setUpdateSpan('pending')}
        handleCompletedFilter  = {()=>setUpdateSpan('completed')}
        itemleft = {updateSpan=='all' ? toDo.length : updateSpan=='pending' ? toDoPending.length : toDoDone.length}
        //colorSpan
        colorall={{color: updateSpan == 'all' ? '#1565c0' : 'black'}}
        colorpending={{color: updateSpan == 'pending' ? '#1565c0' : 'black'}}
        colorcomplete= {{color: updateSpan == 'completed' ? '#1565c0' : 'black'}}
        //Clear 
        clearCompleted={()=> clearCompleted()}
      /> 

       <div className='item-list'>
          { (toDo.length===0 ? (updateSpan=='all' && <div className='record'><h3 className='record_text'>Plan your task ! 😁</h3></div>)
                :
                (updateSpan=='all' &&
                toDo.map((item) => 
                  <div className='todo' key={item._id} style={{backgroundColor: myStyle[`${item._id}`] ? '#424242':'black'}}>
                      <ToDo
                        mykey={item._id} 
                        text={item.text} 
                        isChecked={item.isChecked}
                        textdecoration = {item.isChecked ? 'line-through':'text'}
                        updateMode={() => updateMode(item._id, item.text)}
                        deleteToDo={() => deleteToDo(item._id, setToDo, setToDoPending, setToDoDone)} 
                        handlechange={() => handlechange(item._id, item.isChecked)} 
                      />
                  </div>)))
                  ||
                (toDoPending.length===0 ? (updateSpan=='pending' && <div className='record'><h3 className='record_text'>Everything done ! 🥰</h3></div>)
                 :
                 (updateSpan=='pending' &&
                  toDoPending.map((item) => 
                    <div className="todo" key={item._id}>
                        <ToDo
                          key={item._id} 
                          text={item.text} 
                          isChecked={item.isChecked}
                          textdecoration = 'text'
                          iconsvisibility={{display:'none'}}
                          handlechange={() => handlechange(item._id, item.isChecked)} 
                        />
                    </div>)))
                    ||
                 (toDoDone.length===0 ? (updateSpan=='completed' && <div className='record'><h3 className='record_text'>Nothing done yet 😅</h3></div>)
                  :
                  (updateSpan=='completed' && 
                  toDoDone.map((item) => 
                     <div className="todo" key={item._id}>
                         <ToDo
                            key={item._id} 
                            text={item.text} 
                            isChecked={item.isChecked}
                            textdecoration = 'text'
                            iconsvisibility={{display:'none'}}
                           handlechange={() => handlechange(item._id, item.isChecked)} 
                           />
                        </div>)))
          }
    
       </div>


    </div>
  )
}

export default Create
