
import db from '@/db';
import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';
import { useState } from 'react';

interface editProps {
    params : {
        id : number;
        title : string;
        content : string;
    }
}
interface editPost {
    title : string;
    content : string;
}

export default async function Edit(props : editProps) {
    // console.log(props.params.id); // ssr에서는 console이 터미널에 뜸
    const [results] = await db.query<RowDataPacket[]>('update database.board set title = ?, content = ? where id = ?', [props.params.title, props.params.content, props.params.id]);
    // 'update suho.board set 필드 = 변경값, 필드 = 변경값 where id = 변경할 아이디'
    // ('update suho.board set title = ?, content = ? where id = ?'), [title, content, id]

    // const [formData, setFormData] = useState<editPost>({
    //     title : '',
    //     content : ''
    // });

    // const changeEvent = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     setFormData({...formData, [e.target.name] : e.target.value});
    //     console.log(formData);
    // };
    const submitEvent = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/update', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(results)
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
            {
            results.length > 0
            ?
            <div className="lg:max-w-5xl md:max-w-3xl max-w-sm mx-auto">
                <div className="bg-white shadow-md mt-40">
                    <form method="post" onSubmit={submitEvent} className="p-[2%]">
                        <p className="text-sm font-bold">닉네임</p><input type="text" name="name" defaultValue={results[0].name} className="shadow text-gray-700 text-sm mb-2 border block p-1.5" /><br />
                        <p className="text-sm font-bold">제목</p><input type="text" name="title" defaultValue={results[0].title} className="shadow text-gray-700 text-sm mb-2 border block p-1.5"/><br />
                        <p className="text-sm font-bold">내용</p><textarea name="content" defaultValue={results[0].content} className="shadow text-gray-700 text-sm mb-2 border block p-1.5 w-full h-36"></textarea>
                        <div className="text-right my-5">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none mr-5">등록</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none"><Link href='/' className='text-white'>취소</Link></button>
                        </div>
                    </form>
                </div>
            </div>
            
            :
            <NotData />
            }
        </>
    )
}


function NotData() {
    return (
        <>
            <p>데이터가 존재하지 않습니다.</p>
            <Link href="/">목록</Link>
        </>
    )
}
