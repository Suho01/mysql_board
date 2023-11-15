'use client';

interface formType {
    userid : string;
    username : string;
    title : string;
    content : string;
}

import Link from "next/link";
import { useState } from "react";
import { useCustomSession } from "../sessions";

export default function Write() {
    const {data : session} = useCustomSession();
    const [formData, setFormData] = useState<formType>({
        userid : session?.user?.email ?? '',
        username : session?.user?.name ?? '',
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
        <div className="lg:max-w-5xl md:max-w-3xl max-w-sm mx-auto">
            <div className="bg-lime-50/50 shadow-md mt-40">
                <form method="post" onSubmit={submitEvent} className="p-[2%]">
                    <p className="text-sm font-bold pb-2">닉네임</p><input type="text" name="name" value={session && session.user.name} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 block p-1.5 border-l-2 border-lime-600" /><br />
                    <p className="text-sm font-bold pb-2">제목</p><input type="text" name="title" defaultValue={formData.title} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border-l-2 border-lime-600 block p-1.5 w-full" placeholder="제목을 입력하세요."/><br />
                    <p className="text-sm font-bold pb-2">내용</p><textarea name="content" defaultValue={formData.content} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border-l-2 border-lime-600 block p-1.5 w-full h-36" placeholder="내용을 입력하세요."></textarea>
                    <div className="text-right my-5">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none mr-5">등록</button>
                        <button className="bg-red-500  px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none"><Link href='/' className="text-white">취소</Link></button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}