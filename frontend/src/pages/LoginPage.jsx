import { useRef } from 'react'
import Footer from '../components/Footer'
import { useNavigate } from "react-router-dom";
import { login } from '@api/userApi';


export default function LoginPage() {
    const navigate = useNavigate();
    const usernameRef = useRef()
    const passwordRef = useRef()

    const handleLogin = async () => {
        const inputData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        try {
            const res = await login(inputData)
            if (res.status === 200) {
                navigate("/")
    
                return
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return <div className='flex flex-col h-full justify-center items-center'>
        <div className="
            flex justify-center items-center flex-1
            w-full
            bg-[url('/login-bg.png')]
        ">
            <form 
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
                <button 
                    type='button'
                    className="border-b-1 border-white hover:border-black cursor-pointer"
                    onClick={() => navigate('/register')}
                >
                    Don’t have an account yet?
                </button>

                <button 
                    type="button"
                    onClick={handleLogin}
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
                    Login
                </button>
            </form>
        </div>
        <Footer />
    </div>
}