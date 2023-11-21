'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";

interface formType {
    email : string;
    password : string;
    name : string;
    nickname : string;
}

export default function Register() {
    const [formData, setFormData] = useState<formType>({
        email : '',
        password : '',
        name : '',
        nickname : ''
    });
    const [message, setMessage] = useState<string>("");

    const changeEvent = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, [e.target.name] : e.target.value
        });
        console.log(formData);
    }
    const submitEvent = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/signup', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            });
            if (res.ok) {
                const data = await res.json();
                const result = data.data;
                if (data.message === '성공') {
                    alert("회원가입이 완료되었습니다.");
                    // window.location.href='/';
                    signIn('credentials', {
                        email : result.email,
                        password : result.password,
                        callbackUrl : '/'
                    });
                }
                console.log(data);
                setMessage(data.message);
            }
        } catch(error) {
            console.log(error);
        }
    }
    return (
        <>
        <div className="max-w-7xl mx-auto pt-20">
            <p>{message}</p>
            <form onSubmit={submitEvent} method="POST">
                <input className="border block p-2 m-2" type="text" placeholder="이메일" name="email" required onChange={changeEvent} />
                <input className="border block p-2 m-2" type="password" placeholder="비밀번호" name="password" required onChange={changeEvent} />
                <input className="border block p-2 m-2" type="text" placeholder="이름" name="name" required onChange={changeEvent} />
                <input className="border block p-2 m-2" type="text" placeholder="닉네임" name="nickname" required onChange={changeEvent} />
                <button className="bg-slate-400 text-white py-2 px-4 m-2" type="submit">가입</button>
            </form>
        </div>
        </>
    )
}