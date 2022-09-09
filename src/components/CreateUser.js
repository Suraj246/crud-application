import React,{useEffect, useState} from "react";

const getLocalStorageData = ()=>{
    let savedData = localStorage.getItem("userDataList")
    if(savedData){
        return JSON.parse(localStorage.getItem("userDataList"))
    }
    else{
        return []
    }
}
function CreateUser() {
    const [inputTitle, setInputTitle] = useState("")
    const [inputUser, setInputUser] = useState("")
    const [UserEditIcon, setUserEditIcon] = useState(true)
    const [isUserEdited, setIsUserEdited] = useState(null)
    const [items, setItems] = useState(getLocalStorageData)

    // localStorage
    useEffect(()=>{
        localStorage.setItem("userDataList",JSON.stringify(items))
    },[items])
    
    const form =(e)=>{
        e.preventDefault();
    }
    const inputTitleField = (e)=>{
        setInputTitle(e.target.value)
    }
    const inputUserField = (e)=>{
        setInputUser(e.target.value)
    }
    // create user
    const storeData = ()=>{
        if(!inputTitle || !inputUser ){
            alert("Please enter")
        }
        else if(inputTitle && inputUser && !UserEditIcon){
            setItems(items.map((elem)=>{
                if(elem.id===isUserEdited){
                    return {...items,title:inputTitle,user:inputUser,date:new Date().toLocaleDateString()}
                }
                return elem
            }))
        setUserEditIcon(true)
        setInputTitle("")
        setInputUser("")
        setIsUserEdited(null)
        }
        else{
            const task = {id:new Date().getTime(),title:inputTitle,user:inputUser,date:new Date().toLocaleDateString()}
            setItems([...items,task])
            setInputUser("")
            setInputTitle("")
            console.log(task)
        }
    }
    // delete user
    const deleteUser = (index)=>{
        console.log("delete",index)
        const deleteItem = items.filter((elem)=>{
            return index !== elem.id
        })
        console.log(deleteItem)
        setItems(deleteItem)
    }
    // edit user
    const updateUser = (index)=>{
        const updateItem = items.find((elem)=>{
            return elem.id === index
        })
        console.log(updateItem)
        setUserEditIcon(false)
        setInputTitle(updateItem.title)
        setInputUser(updateItem.user)
        setIsUserEdited(index)
    }

  return (
        <div>
            <div className="header">
                <form action="" className="form-flex" onSubmit={form}>
                    <div className="form-group">
                        <input type="text" placeholder="title" value={inputTitle} onChange={inputTitleField}  />
                        <input type="text" placeholder="description" value={inputUser} onChange={inputUserField} />
                    </div>
                    <div className="form-btn">
                    
                        {UserEditIcon ? <button onClick={storeData} className="btn-cre">Create User</button>:<button onClick={storeData} className="btn-cre">Edit</button>}
                        <button className="btn-cre del" onClick={()=>setItems([])}>Delete All User <sup>{items.length}</sup></button>
                    </div>
                </form>                
            </div>
            <div className="s1">
                <div className="user-Data">
            
            {items.filter((elem)=>{
                if(inputTitle===""){
                    return elem;
                }
                else if(elem.title.toLowerCase().includes(inputTitle.toLocaleLowerCase())){return elem}
            }).map((user) =>{
                        return(
                            <div className="user-details" key={user.id}onDoubleClick={()=>updateUser(user.id)}>
                                <div className="flex-head">
                                    <p className="user-title">{user.title}</p>
                                    <i className='bx bx-minus-circle btn-btn udel'onClick={()=>deleteUser(user.id)}></i>
                                </div>
                                <p className="name">{user.user}</p>
                                <div className="btn">
                                    <span>{user.date}</span>
                                    <i className='bx bxs-edit btn-btn uedi'onClick={()=>updateUser(user.id)}></i>
                                </div>
                            </div>
                        )
                    })}
           
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
