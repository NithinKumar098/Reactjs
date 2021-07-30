import {users} from "../util/userData"
import {useState , useReducer} from "react"
import { useHistory } from "react-router-dom";



 const  reducer = (state , action) =>{
    const index = users.findIndex((user) => user.id === state.id);
    if(action.type === 'user-delete'){
        console.log('user-deleted')
        console.log(state)
        if (index > -1) users.splice(index, 1);
        action.data.history.push('/login')
    
    }
    if(action.type === 'user-update'){
        let newUserData = state;
        newUserData.email = action.data.email;
        newUserData.password = action.data.password;
        if (index > -1) users[index] = newUserData;
        action.data.history.push('/login')
    }
    
}

const UpdateUser = (props) => {
        let history = useHistory();
        const currentUser = props.loginDetails;
        const [enteredEmail, setEnteredEmail] = useState(currentUser.email);
        const [emailError , setemailError] = useState('');
        const [age, setAge] = useState(currentUser.age);
        const [emailIsValid, setEmailIsValid] = useState();
        const [enteredPassword, setEnteredPassword] = useState("");
        const [DOB , setDOB] = useState(currentUser.DOB)
        const [passwordIsValid, setPasswordIsValid] = useState();
        const [formIsValid, setFormIsValid] = useState(false);
        const [state, dispatch] = useReducer(reducer, currentUser)

        

        

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    
        setFormIsValid(
            event.target.value.includes("@") && enteredPassword.trim().length > 3
        );
        };
        const validateEmailHandler = () => {
            if(!enteredEmail.includes("@")){
              setEmailIsValid(enteredEmail.includes("@"))
              setemailError('Enter correct Email')
            }
        };
        
        const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 3);
        };
    
        const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    
        setFormIsValid(
            enteredEmail.includes("@") && event.target.value.trim().length > 3
        );
        };
        const deleteUser=(event)=>{
            event.preventDefault()
            dispatch({'type':"user-delete" , 'data':{"history":history}});
            props.logoutUser();
           //history.push("/login");

        }

        const DOBHandler = (event)=>{
           console.log(event)
           let today = new Date();
            let birthDate = new Date(event.target.value);
            let age_now = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                age_now--;
            }
            setDOB(event.target.value)
            setAge(age_now)

        }

    const updateUserDate = (event) =>{
        event.preventDefault();
        dispatch({'type':"user-update" , 'data': {
            'id': currentUser.id,
            'email': enteredEmail,
            'password': enteredPassword,
            'profilePic': 'link',
            "history":history
        }});
        props.logoutUser();
       
       //history.push("/login");
     }

     
   

    return (
        <div className="updateForm col-sm-12 col-md-6">
            <form onSubmit={updateUserDate}>
            
            <div className="form-group">
            <label htmlFor="image">Update Profile Pic</label><br/>
            <input type="file" id="file-input"  name="ImageStyle"/>
            
            </div>
            
            <div className="form-group">
            <label htmlFor="email">Update Email address</label>
            <input type="email" className="form-control" value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            id="inputEmail"  aria-describedby="emailHelp" placeholder="Update Enter email"/>
            
            </div>
            <div className="form-group">
            <label htmlFor="DOB">DOB</label>
            <input type="date" className="form-control" 
            onBlur={DOBHandler}
            id="inputDOB"   />
            
            </div>
            <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" readOnly className="form-control" value={age}
            id="age"  />
            
            </div>
            
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            className="form-control" id="exampleInputPassword1"  placeholder="update Password"/>
            </div>
            
            <button type="submit" disabled={!formIsValid} className="btn btn-primary mt-2 col-sm-12 col-md-3 ">Submit</button>
            <button onClick={deleteUser} className="btn btn-danger mt-2 col-sm-12 col-md-3">
                    Remove user
                </button>
            </form>
    </div>
    );
};

export default UpdateUser;

