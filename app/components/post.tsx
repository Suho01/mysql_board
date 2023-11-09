'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface PostList {
    id : number;
    title : string;
    content : string;
    author : string;
    date : string;
    count : number;
}

export default function Post() {
    const [posts, setPosts] = useState<PostList[]>([]);
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    
    // const router = useRouter();
    // console.log(router);

    useEffect(() => {
        const fetchData = async () => {
            if (!page) return; // 페이지가 없다면
            const res = await fetch(`/api/post?page=${page}`);
            const data = await res.json();
            setPosts(data.results);
            console.log(data);
            setTotalCnt(data.totalCnt);
        }
        fetchData();
    }, [page]); // page가 실행될 때 마다 useEffect 실행

    const lastPage = Math.ceil(totalCnt / 15); // ceil : 올림, floor : 버림
    const totalPageCnt = 5; // 5개씩 보여준다.
    const startPage = Math.floor((page - 1) / totalPageCnt) * totalPageCnt + 1;
    const endPage = Math.min(lastPage, startPage + totalPageCnt - 1);
    const nextPage = () => {
        const nextStart = Math.ceil((page) / 5) * 5 + 1;
        setPage(nextStart);
    };
    const prevPage = () => {
        const prevStart = Math.floor((page - 1) / 5) * 5;
        setPage(prevStart);
    };

    return (
        <>
            <div className="mx-auto max-w-7xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className='text-2xl font-semibold'>게시판</h1>
                    <Link href='/write' className='bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600'>글쓰기</Link>
                </div>
                <div className="bg-white shadow-md rounded-lg">
                    <div className="min-w-full">
                        <ul className="bg-gray-100 flex justify-between">
                            <li className="px-6 py-3 text-center">번호</li>
                            <li className="px-6 py-3 text-center">제목</li>
                            <li className="px-6 py-3 text-center">작성자</li>
                            <li className="px-6 py-3 text-center">작성일</li>
                        </ul>
                        {
                            posts && posts.map((e, i) => {
                                const date = new Date(e.date);
                                const year = date.getFullYear();
                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                const day = date.getDate().toString().padStart(2, '0');
                                const formatDate = `${year}-${month}-${day}`
                                return (
                                    <ul key={i} className='flex justify-between'>
                                        <li className="px-6 basis-1/12 py-3 text-center">{posts.length - i}</li>
                                        <li className="px-6 basis-6/12 py-3 text-center"><Link href={`/post/${e.id}`}>{e.title}</Link></li>
                                        <li className="px-6 basis-2/12 py-3 text-center">{e.author}</li>
                                        <li className="px-6 basis-3/12 py-3 text-center">{formatDate}</li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            

            <div className="flex justify-center gap-x-5 mt-5">
                {page > 5 && <button onClick={prevPage} className='bg-white border px-1.5 py-1 rounded text-sm'>이전</button>}
                {
                    Array(endPage - startPage + 1).fill(null).map((_, i) => {
                        const pageNumber = i + startPage;
                        return (
                            <button key={i} onClick={() => {setPage(pageNumber);}} className={`basis-8 ${page === pageNumber ? 'bg-slate-500 text-white' : ''}`}>{pageNumber}</button>
                        )
                    })
                }            
                {page < lastPage && <button onClick={nextPage} className='bg-white border px-1.5 py-1 rounded text-sm'>다음</button>}
            </div>
        </>
    )
}