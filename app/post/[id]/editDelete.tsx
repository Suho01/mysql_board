'use client';

import { useCustomSession } from "@/app/sessions";
import Link from "next/link";

interface propsType {
    results : {
        id : number;
        userid : string;
        title ? : string;
        content ? : string;
        username ? : string;
        count ? : number;
        date ? : string;
    }
}

const deletePost = async (e : number) => {
    try {
        const res = await fetch('/api/delete', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({id : e})
        })
        if (res.ok) {
            alert("정상적으로 삭제되었습니다.");
            window.location.href = '/';
        } else {
            alert("삭제 실패");
            return;
        }
    } catch(error) {
        console.log(error);
    }
}

export default function EditDelete({results} : propsType) {
    const {data : session} = useCustomSession();
    return (
        <>
            {
                session && session.user && (
                    (results && results && session.user.email === results.userid) || session.user.level === 10
                ) &&
                <>
                    <div className="absolute bottom-0 p-5 right-0">
                        <Link href={`/`} className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none mr-5">수정</Link>
                        <button onClick={() => deletePost(results.id)} className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none">삭제</button>
                    </div>
                </>
            }
        </>
    )
}