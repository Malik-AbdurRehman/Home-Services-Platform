'use client'
import { useFormStatus } from 'react-dom'
import { SubmitData } from './action';
function SubmitButton(){
    const {pending}=useFormStatus();
    return(
        <button
            type='submit'
            disabled={pending}
        >
            {pending? 'Registering':'Register'}
        </button>
    )
}

export default function RegisterForm(){
    return(
        <form action={SubmitData}>
            <div>
                <label>Name</label>
                <input
                type="text"
                name="name"
                required 
                />
            </div>
            <div>
                <label>Email</label>
                <input
                type="email"
                name="email"
                required 
                />
            </div>
            <div>
                <label>Password</label>
                <input
                type="password"
                name="password"
                required 
                />
            </div>
        <SubmitButton/>
        </form>
    )
}