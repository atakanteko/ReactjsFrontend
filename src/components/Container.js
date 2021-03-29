import React,{useState,useEffect} from 'react'
import PersonList from './PersonList'
import AddPerson from './AddPerson'
import phoneBookService from '../services/phonebook'
import loginService from '../services/login' 
import LoginForm from './LoginForm'
import Togglable from './Togglable'


const Container = () => {
        const [phoneBook,setPhoneBook] = useState([])
       
        const [username, setUsername] = useState('') 
        const [password, setPassword] = useState('') 

        const [user, setUser] = useState(null)

        const [loginVisible, setLoginVisible] = useState(false)

        const handleLogin = async  (event) => {
            event.preventDefault()
            console.log('logging in with', username, password)
            try {
                const user = await loginService.login({username,password}) //!Destructuring
                window.localStorage.setItem(
                    'loggedAppUser',JSON.stringify(user)
                )
                phoneBookService.setToken(user.token)
                setUser(user)
                setUsername('')
                setPassword('')
              } catch (exception) {
                console.log("Error:",exception);
              }
          }

          

          useEffect(() => {
            const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
            if (loggedUserJSON) {
              const user = JSON.parse(loggedUserJSON)
              setUser(user)
              phoneBookService.setToken(user.token)
            }
          }, [])
        //! Get all from db
        useEffect(() => {
            phoneBookService
                .getAll()
                .then(initialPhonebook => {
                    console.log(initialPhonebook)
                    setPhoneBook(initialPhonebook)
                })
            },[])

        //! Delete Person
        const deletePhone = id => {
            
            const target =phoneBook.find(m => m.id === id)
            console.log(target)
            if(window.confirm("Do you really want to delete the record?")){
                phoneBookService
                .deletePhone(target.id)
                .then(response =>{
                    if(response === 200){
                        window.location.reload()
                    }
                })
                .catch(()=>{
                    console.log('Error')
                })
            }
            
        }

        const handleLogOut = () => {
            setUser(null)
            window.localStorage.clear()
        }

        const loginForm =() =>{
            

            return(
                
                
                        <Togglable buttonLabel='login'>
                            <LoginForm
                            username = {username}
                            password = {password}
                            handleUsernameChange = {({target})=>setUsername(target.value)}
                            handlePasswordChange ={({target})=>setPassword(target.value)}
                            handleSubmit={handleLogin}
                            />
                        </Togglable>

            )
        }
        return(
            <div className="disp-container">
                <div className="person-list">
                    {phoneBook.map(item =>
                        <PersonList 
                            key={item.id} 
                            list={item} 
                            delPhone={()=>deletePhone(item.id)}/>
                    )}
                 </div>
                 <div className="right-section">
                     {user !== null ? 
                        <AddPerson 
                        list={phoneBook} 
                        userLog={user}
                        logOut={()=>{handleLogOut()}}/>
                        : 
                        //!Login ---------------
                        loginForm()                            
                        //!Login --------------- 
                    }
                     
                     
                 </div>
                

            </div>
            
        )
    }

export default Container;