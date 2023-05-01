import React from 'react'
import LoginForm from '../components/login/LoginForm'

const Login: React.FC = () => {
  return (
        <main>
            <section className='login'>
                <h1 className='login__h1'>Se connecter</h1>
                <LoginForm />
            </section>
        </main>
  )
}

export default Login