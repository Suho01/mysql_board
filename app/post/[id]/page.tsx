'use client';

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PostList {
    id : number;
    title : string;
    content : string;
    author : string;
    date : string;
    count : number;
}

export default function Detail() {
    const params = useParams();

    const [post, setPost] = useState<PostList[]>([]);
    const [isLoading, setIsLading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            // 배열의 마지막 값을 가지고 오는 방법 pop
            const res = await fetch(`/api/post/${params.id}`);
            const data = await res.json();
            console.log(data);
            setPost(data.data);
            setIsLading(false);
        }
        fetchData();
    }, [params.id]);

    const deletePost = async (e : number) => {
        try {
            const res = await fetch(`/api/delete`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({id : e})
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data.message);
                // alert("정상적으로 등록하였습니다.");
                window.location.href = '/';
            } else {
                const errorData = await res.json();
                console.log(errorData.error);
            }
        } catch(error) {
            console.log(error);
        }
    }
    return (
        <>
        <div className="h-screen relative">
            <div className="bg-white shadow-xl w-1/2 h-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:rotate-6">
                {isLoading && <Loading />}
                {
                    post.length > 0 && (
                        <>
                            <p className="pt-5 text-2xl text-center">{post && post[0]?.title}</p>
                            <p className="p-5">{post && post[0]?.content}</p>
                        </>
                    )
                }
                <div className="absolute bottom-0 p-5 right-0">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none mr-5">수정</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none" onClick={() => deletePost(post[0].id)}>삭제</button>
                </div>
            </div>
        </div>
        </>
    )
}
function Loading() {
    return (
        <div className="fixed w-full h-full bg-black/50 top-0 left-0 z-50">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <g transform="rotate(0 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(30 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(60 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(90 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(120 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(150 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(180 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(210 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(240 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(270 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(300 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                        </rect>
                        </g><g transform="rotate(330 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#FA8072`}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                        </rect>
                    </g>
                </svg>
            </div>
        </div>
    )
}