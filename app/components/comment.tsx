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
}
interface CommentType {
    id : number;
    parentid :number;
    userid : string;
    username : string;
    content : string;
    date : string;
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
        content : '' // comment
    });
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
                <p>댓글 목록</p>
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
                                <ul className="flex justify-between p-5">
                                    <li key={i}>{e.content}</li>
                                    <li>{formatDate}</li>
                                </ul>
                            </>
                        );
                    })
                }
                <input name="content" type="text" onChange={commentValue} placeholder="댓글을 입력해주세요." className="border p-2 border-orange-500 rounded m-2" />
                <button onClick={cmtSubmit}>댓글 작성</button>
                </>
            }
        </>
    )
}