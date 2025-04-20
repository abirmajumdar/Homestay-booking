import React, { useState } from "react";
import axios from 'axios'
export default function Register() {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password ,setPassword] = useState()
    const [cnfpassword ,setCnfPassword] = useState()
    function validateUserInput(username, email, password) {
        const errors = {};
    
        // Username: at least 3 characters, only alphanumeric
        if (!/^[a-zA-Z0-9]{1,}$/.test(name)) {
            errors.name = "Username must be at least 3 characters and alphanumeric only.";
        }
    
        // Email: basic format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = "Invalid email format.";
        }
    
        // Password: 8+ characters, includes uppercase, lowercase, number, and special character
        const passwordRegex = /^.{5,}$/;
        if (!passwordRegex.test(password)) {
            errors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
        }
    
        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    
    const registerForm=async(e)=>{
        e.preventDefault()
        const data = validateUserInput(name ,email,password);
        
        if (data.isValid) {
            if(password !== cnfpassword){
                alert("password mismatched")
            }
            else{
               const response = await axios.post('http://localhost:4000/user/signup',{name,email,password})
                console.log(response.data.user);
                localStorage.setItem("User",JSON.stringify(response.data.user))

            }
        } else {
            if(data.errors.email ){
                alert(data.errors.email)
            }
            else if(data.errors.password){
                alert(data.errors.password)
            }
            else{
                alert("invalid user input")
            }
        }
    }

    return (
        <div style={{
            backgroundColor:"red",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
        }}>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-purple-600">
                            Logo
                        </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <form>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    value={name}
                                    onChange={(e)=>{setName(e.target.value)}}
                                    type="text"
                                    name="name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    value={email}
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                    type="email"
                                    name="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    value={password}
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    value={cnfpassword}
                                    onChange={(e)=>{setCnfPassword(e.target.value)}}
                                    type="password"
                                    name="password_confirmation"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <a
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                                href="#"
                            >
                                Already registered?
                            </a>
                            <button
                                
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                                onClick={registerForm}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}