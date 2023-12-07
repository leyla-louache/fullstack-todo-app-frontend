import axios from "axios";

const baseUrl = "https://fullstack-todo-app-backend-qond.onrender.com"

const getAllToDo = (setToDo, setToDoPending, setToDoDone) => {
    axios
    .get(baseUrl)
    .then(({data})=>{
        console.log('data--> ',data);
        console.log('pending data--> ', data.filter(item => item.isChecked == false ));
        console.log('completed data--> ', data.filter(item => item.isChecked == true ));
        setToDo(data);
        setToDoPending(data.filter(item => item.isChecked == false ));
        setToDoDone(data.filter(item => item.isChecked == true ));
    })
}

const addTodo = (text, setText, setToDo, setToDoPending, setToDoDone) => {
    axios
    .post(`${baseUrl}/save`, {text, isChecked: false})
    .then((data) => {
        console.log(data)
        setText("")
        getAllToDo(setToDo , setToDoPending, setToDoDone)
    })
    .catch((err) => console.log(err))
}

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating, setToDoPending, setToDoDone) => {
    axios
    .post(`${baseUrl}/update`, {_id: toDoId, text})
    .then((data) => {
        setText("")
        setIsUpdating(false)
        getAllToDo(setToDo, setToDoPending, setToDoDone)
    })
    .catch((err) => console.log(err))
}

const updateCheckedToDo = (toDoId, isChecked ,setToDo, setCheckedIsUpdating, setToDoPending, setToDoDone) => {
    axios
    .post(`${baseUrl}/updatechecked`, {_id: toDoId, isChecked})
    .then((data) => {
        setCheckedIsUpdating(false)
        getAllToDo(setToDo , setToDoPending, setToDoDone)
    })
    .catch((err) => console.log(err))
}

const deleteToDo = (_id, setToDo, setToDoPending, setToDoDone) => {
    axios
    .post(`${baseUrl}/delete`, {_id})
    .then((data) => {
        console.log('clear --->', data);
        getAllToDo(setToDo , setToDoPending, setToDoDone)
    })
    .catch((err) => console.log(err))
}

export {getAllToDo, addTodo, updateToDo, deleteToDo, updateCheckedToDo}
