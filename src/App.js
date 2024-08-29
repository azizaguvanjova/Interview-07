import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [users,setUsers] = useState([])
  const [filtredUsers,setFiltredUsers] = useState([])
  const [search, setSearch] = useState('')


  // API den verileri axiosla çekiyoruz
  useEffect(() =>{
    const fetchData = async () =>{
      try{
        const response = await axios.get( "https://randomuser.me/api?results=10")
        setUsers(response.data.results)
        setFiltredUsers(response.data.results)
      } catch (error){
        console.error(error, 'api yüklenırken hata oluştu')
      }
    }
fetchData()
  },[])
//input degiştiginde filtreyi guncellemesi

useEffect(()=>{
  const filtered = users.filter(user => `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase()))
  setFiltredUsers(filtered)
},[search,users])

const handleSearch = (e) =>{
  setSearch(e.target.value)
}

return (
  <div className="grid gap-4 ">
    <div className="flex justify-center items-center">
    <input type="text"
    placeholder="Search users"
    value={search}
    onChange={handleSearch}
    className="border-[1px]  border-black pl-1 h-22 w-28 " /> </div>
    <ul className="text-center font-semibold text-lg relative my-3">
      {
        filtredUsers.map((user) =>(
          <li key={user.login.uuid} className="my-3">
            {user.name.title} {user.name.first} {user.name.last}
          </li>
        ))
      }
    </ul>
   
  </div>
)

}

export default App;
 