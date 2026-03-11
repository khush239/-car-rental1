import React from 'react'
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';

const Login = () => {

    const {setShowLogin, axios, setToken, navigate} = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event)=>{
        try {
            event.preventDefault();
            const {data} = await axios.post(`/api/user/${state}`, {name, email, password})

            if (data.success) {
                navigate('/')
                setToken(data.token)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={()=> setShowLogin(false)} 
      className='fixed inset-0 z-[200] flex items-center justify-center p-6 bg-primary/40 backdrop-blur-md'>

      <motion.form 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onSubmit={onSubmitHandler} 
        onClick={(e)=>e.stopPropagation()} 
        className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 md:p-12 shadow-premium border border-border/50 overflow-hidden">
            
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-primary"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>

            <button 
              type="button"
              onClick={() => setShowLogin(false)}
              className="absolute top-8 right-8 w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors cursor-pointer text-text-muted">
              <img src={assets.close_icon} alt="close" className="w-3 opacity-50" />
            </button>

            <div className="mb-10">
                <h2 className="text-3xl font-black text-primary tracking-tight mb-2">
                    {state === "login" ? "Welcome Back" : "Start Your Journey"}
                </h2>
                <p className="text-text-muted font-bold text-xs uppercase tracking-widest">
                    {state === "login" ? "Access your elite profile" : "Create your guest account today"}
                </p>
            </div>

            <div className="space-y-6">
                {state === "register" && (
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Full Name</label>
                        <input 
                          onChange={(e) => setName(e.target.value)} 
                          value={name} 
                          placeholder="Your Name" 
                          className="w-full bg-surface border border-border px-6 py-4 rounded-2xl text-base outline-none focus:border-accent transition-all font-bold text-text-main shadow-sm" 
                          type="text" 
                          required 
                        />
                    </div>
                )}
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <input 
                      onChange={(e) => setEmail(e.target.value)} 
                      value={email} 
                      placeholder="elite@example.com" 
                      className="w-full bg-surface border border-border px-6 py-4 rounded-2xl text-base outline-none focus:border-accent transition-all font-bold text-text-main shadow-sm" 
                      type="email" 
                      required 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Security Key</label>
                    <input 
                      onChange={(e) => setPassword(e.target.value)} 
                      value={password} 
                      placeholder="••••••••" 
                      className="w-full bg-surface border border-border px-6 py-4 rounded-2xl text-base outline-none focus:border-accent transition-all font-bold text-text-main shadow-sm" 
                      type="password" 
                      required 
                    />
                </div>
            </div>

            <button className="w-full bg-primary hover:bg-black transition-all text-white py-5 rounded-2xl cursor-pointer font-black uppercase tracking-[0.2em] text-sm mt-10 shadow-premium">
                {state === "register" ? "Create Account" : "Secure Login"}
            </button>

            <div className="mt-8 text-center">
                {state === "register" ? (
                    <p className="text-sm font-bold text-text-muted">
                        Already have access? <span onClick={() => setState("login")} className="text-accent cursor-pointer border-b border-accent/20 hover:border-accent transition-colors">Login now</span>
                    </p>
                ) : (
                    <p className="text-sm font-bold text-text-muted">
                        New to the experience? <span onClick={() => setState("register")} className="text-accent cursor-pointer border-b border-accent/20 hover:border-accent transition-colors">Join us</span>
                    </p>
                )}
            </div>
        </motion.form>
    </motion.div>
  )
}

export default Login
