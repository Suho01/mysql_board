import db from '@/db';
import { RowDataPacket } from 'mysql2';
import Link from 'next/link';
import React from 'react';

export default async function SearchResult({
    params
} : {
    params ? : {keyword? : string}
}) {
    const keywords = params?.keyword !== undefined ? params.keyword : '';
    const [results] = await db.query<RowDataPacket[]>('select * from suho.board where title Like ?', [`%${decodeURIComponent(keywords)}%`]);
    return (
        <div>
            <p>검색 결과 : {decodeURIComponent(keywords)}</p>
            {results.length === 0 && <p>검색결과가 없습니다.</p>}
            {results && results.length > 0 && results.map((e, i) => {
                return (
                    <div key={i}>
                        <Link href={`/post/${e.id}`}>
                            <p>{e.title}</p>
                        </Link>
                        <p>{e.content}</p>
                        <p>{e.userid}</p>
                    </div>
                )
            })}
        </div>
    )
}