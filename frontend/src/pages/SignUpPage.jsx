import { useRef } from 'react'
import Footer from '../components/Footer'
import { useNavigate } from "react-router-dom";
import { register } from '@api/userApi';

export default function SignUpPage() {
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const verifyPasswordRef = useRef();
    const firstnameRef = useRef();
    const lastnameRef = useRef();

    const handleRegister = async () => {
        const inputData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value
        }
        try {
            await register(inputData)
            
        } catch (error) {
            alert(error.response.data.message)

            return;
        }
        
        alert('Sign up successfully')

        navigate("/login")        
    }

    return <div className='flex flex-col h-full justify-center items-center'>
        <form className="
            flex justify-center items-center flex-1
            w-full
            bg-[url('/login-bg.png')]
        ">
            <div 
                id="login-card" 
                className="flex flex-col items-center gap-4 bg-white p-10 border-1 rounded-xl w-4/5 md:w-2/5"
            >
                <label className='flex flex-col justify-center items-start text-xl w-full'>
                    <div className='font-bangers'>username</div>
                    <input 
                        ref={usernameRef} 
                        type="text"
                        className='bg-white border-b-1 px-1 w-full'
                        required
                    />
                </label>
                <label className='flex flex-col justify-center items-start text-xl  w-full'>
                    <div className='font-bangers'>Password</div>
                    <input 
                        ref={passwordRef} 
                        type="password"
                        className="bg-white border-b-1 px-1 w-full"
                        required
                    />
                </label>
                <label className='flex flex-col justify-center items-start text-xl  w-full'>
                    <div className='font-bangers'>Verify Password</div>
                    <input 
                        ref={verifyPasswordRef} 
                        type="password"
                        className="bg-white border-b-1 px-1 w-full"
                        required
                    />
                </label>
                <label className='flex flex-col justify-center items-start text-xl w-full'>
                    <div className='font-bangers'>first name</div>
                    <input 
                        ref={firstnameRef} 
                        type="text"
                        className='bg-white border-b-1 px-1 w-full'
                        required
                    />
                </label>
                <label className='flex flex-col justify-center items-start text-xl w-full'>
                    <div className='font-bangers'>last name</div>
                    <input 
                        ref={lastnameRef} 
                        type="text"
                        className='bg-white border-b-1 px-1 w-full'
                        required
                    />
                </label>
                <button 
                    type="button"
                    className="border-b-1 border-white hover:border-black cursor-pointer"
                    onClick={() => navigate('/login')}
                >
                    Already have an account?
                </button>
                <button 
                    type="button"
                    onClick={handleRegister}
                    className="
                        w-full
                        py-2 text-white
                        text-xl font-bangers rounded-xl 
                        bg-gradient-to-r from-[#295179] to-[#0AB1D7]
                        border-3 border-black shadow-lg 
                        hover:scale-105 active:scale-95 
                        transition-transform duration-200
                        flex gap-0 justify-center items-center relative
                        cursor-pointer"
                >
                    <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.15)_2px,transparent_2px)] bg-[size:8px_8px] opacity-40"></span>
                    Sign up
                </button>
            </div>
        </form>
        <Footer />
    </div>
}