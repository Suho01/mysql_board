'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);
    const [page, setPage] = useState(1);
    
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
            </div>
            {
                posts && posts.map((e, i) => {
                    return (
                        <React.Fragment key={i}>
                            <p>현재페이지 : {page}</p>
                            <p>이름 : {e.Name} / 구역 : {e.District} / 인구 : {e.Population}</p>
                        </React.Fragment>
                    )
                })
            }

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