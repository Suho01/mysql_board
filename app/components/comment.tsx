/*
const {data : session} = useCustomSession();
const data = {
    id : 5,
    name : "김준면",
    email : "abcd@naver.com"
}
변수 내에 {중괄호}가 들어가면 구조 분해 할당(destructuring assignment) : 해당 객체에서 그 속성을 추출해서 새로운 변수로 할당할 때 사용
예를 들어 data.id 이걸 변수로 따로 저장하고 싶다면
const {id} = data   >>   const id = 5 라는 값이 저장된다.
data.id로 물론 사용 가능...
*/

'use client';

import { useEffect, useState } from "react";
import { useCustomSession } from "../sessions";
import { useParams } from "next/navigation";

interface CommentProps {
    id : number;
}
interface formType {
    parentid :number;
    userid : string;
    username : string;
    content : string;
    nickname : string;
}
interface CommentType {
    id : number;
    parentid :number;
    userid : string;
    username : string;
    content : string;
    date : string;
    nickname : string;
}

export default function Comment(props : CommentProps) {
    const {id} = props;
    const [comment, setComment] = useState<string>();
    const commentValue = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name] : e.target.value});
        console.log(formData);
    };

    const params = useParams();
    console.log(params);
    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch(`/api/comment?id=${params.id}`);
            const data = await res.json();
            console.log(data);
            setTotalComment(data.result);
        }
        fetchData();
    }, [params.id]);

    const {data : session} = useCustomSession();
    const [formData, setFormData] = useState<formType>({
        parentid : id,
        userid : session?.user?.email ?? '',
        username : session?.user?.name ?? '',
        content : '', // comment
        nickname : session?.user?.nickname ?? ''
    });

    useEffect(() => {
        setFormData({
            parentid : id,
            userid : session?.user?.email ?? '',
            username : session?.user?.name ?? '',
            content : '',
            nickname : session?.user?.nickname ?? ''
        });
    }, [session?.user.name, session?.user.email, id, session?.user?.nickname]); // 글쓰기 안되면 추가해주는 코드

    const [totalComment, setTotalComment] = useState<CommentType[]>();

    const cmtSubmit = async () => {
        try {
            const res = await fetch('/api/comment', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })
            if (res.ok) {
                const data = await res.json();
                // console.log(data);
                setTotalComment(data.result);
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        
        <>
            {
                session && session.user && <>
                <p className="p-5 font-bold bg-lime-200">🤍 댓글 리스트</p>
                {
                    totalComment && totalComment.map((e, i) => {
                        const date = new Date(e.date);
                        // date.setTime(date.getTime() + (60 * 60 * 9 * 1000));
                        const year = date.getFullYear();
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const day = date.getDate().toString().padStart(2, '0');
                        const hours = (date.getHours() + 9).toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        const seconds = date.getSeconds().toString().padStart(2, '0');
                        const formatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                        return (
                            <>
                                <ul className="flex justify-between px-5 pt-5 text-sm">
                                    <li className="basis-3/12 font-bold">{e.username} | <span className="font-normal text-xs">{e.userid}</span></li>
                                    <li key={i} className="basis-7/12">{e.content}</li>
                                    <li className="basis-2/12">{formatDate}</li>
                                </ul>
                            </>
                        );
                    })
                }
                <div className="w-full flex pt-10">
                    <input name="content" type="text" onChange={commentValue} placeholder="댓글을 입력해주세요." className="border p-2 border-lime-500 rounded text-sm m-5 lg:basis-10/12" />
                    <button onClick={cmtSubmit} className="bg-lime-500 hover:bg-lime-600 text-white p-2 text-sm rounded-md px-4 lg:basis-2/12 h-full m-5">작성</button>
                </div>
                </>
            }
        </>
    )
}