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

import { useState } from "react";
import { useCustomSession } from "../sessions";

interface CommentProps {
    id : number;
}

export default function Comment(props : CommentProps) {
    const {id} = props;
    const [comment, setComment] = useState<string>('');
    const commentValue = (e : React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const {data : session} = useCustomSession();
    const cmtSubmit = async () => {
        try {
            const res = await fetch('api/comment', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(comment)
            })
        } catch(error) {
            console.log(error);
        }
    }

    return (
        
        <>
            {
                session && session.user && <>
                <p>댓글 목록</p>
                <input type="text" onChange={commentValue} placeholder="댓글을 입력해주세요." className="border p-2 border-orange-500 rounded m-2" />
                {comment}
                <button onClick={() => cmtSubmit()}>댓글 작성</button>
                </>
            }
        </>
    )
}