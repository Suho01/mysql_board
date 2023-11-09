'use client';
interface formType {
    name : string;
    title : string;
    content : string;
}

import Link from "next/link";
import { useState } from "react";

export default function Write() {
    const [formData, setFormData] = useState<formType>({
        name : '',
        title : '',
        content : ''
    });

    const changeEvent = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name] : e.target.value});
        console.log(formData);
    };
    const submitEvent = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/write', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data.message);
                alert("정상적으로 등록하였습니다.");
                window.location.href = '/';
            } else {
                const errorData = await res.json();
                console.log(errorData.error);
            }
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <>
        <div className="lg:max-w-7xl md:max-w-3xl max-w-sm mx-auto">
            <div className="bg-white shadow-md mt-40">
                <form method="post" onSubmit={submitEvent} className="p-[2%]">
                    <p className="text-sm font-bold">닉네임</p><input type="text" name="name" defaultValue={formData.name} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border block p-1.5" /><br />
                    <p className="text-sm font-bold">제목</p><input type="text" name="title" defaultValue={formData.title} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border block p-1.5"/><br />
                    <p className="text-sm font-bold">내용</p><textarea name="content" defaultValue={formData.content} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border block p-1.5 w-full h-36"></textarea>
                    <div className="text-right my-5">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none mr-5">등록</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none"><Link href='/'>취소</Link></button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}