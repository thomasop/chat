import React, { useState } from 'react'

const LoginForm: React.FC = () => {
    const [inputText, setInputText] = useState<string>("")
    const [inputPassword, setInputPassword] = useState<string>("")
    const handleInputText = (e: any) => {
        setInputText(e.target.value)
    }
    const handleInputPassword = (e: any) => {
        setInputPassword(e.target.value)
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const getUser = async () => {

            const response = await fetch("http://localhost:8080/login", {
                method: "POST",

                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: inputText,
                    password: inputPassword
                })
            })
            let json = await response.json()
            if (json.errors) {
                console.log(json.errors)
            } else {
                console.log(json.user)
            }
        }
            
        
            getUser()
    }
  return (
    <>
        <form className='loginForm' action="http://localhost:8080/login" method="post" onSubmit={handleSubmit}>
            <input name='email' className='loginForm__inputText' type="email" required placeholder='Votre email' onChange={handleInputText} />
            <input name='password' className='loginForm__inputPassword' type="password" required placeholder='Votre mot de passe' onChange={handleInputPassword} />
            <input className='loginForm__inputSubmit' type="submit" value="Se connecter" />
        </form>
    </>
  )
}

export default LoginForm