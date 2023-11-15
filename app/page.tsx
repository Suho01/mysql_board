import db from '@/db';
import { RowDataPacket } from 'mysql2/promise';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from './api/auth/[...nextauth]/route';

interface userInfo {
    user : {
        name : string;
        email ? : string;
        image ? : string;
        level ? : number;
    }
}
export default async function Home() {
        const page = 1;
        const perPage = 15; // limit
        const offset = (page - 1) * perPage;        

        const [results] = await db.query<RowDataPacket[]>('SELECT * FROM suho.board order by date desc limit ? offset ?', [perPage, offset]); // schema.table
        const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from suho.board');
        const totalCnt = countResult[0].cnt;

        console.log(results);

        let sessions = await getServerSession(authOptions) as userInfo;
        console.log(sessions);
        
    return (
        <>
            <div className="mx-auto max-w-6xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className='text-2xl font-bold relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-2 after:bg-lime-300 after:-z-10'>NextJS + MySQL</h1>
                    {
                        sessions && <Link href='/write' className='bg-lime-500 text-white px-4 py-2 rounded shadow-md hover:bg-lime-600 font-bold'>글쓰기</Link>
                    }
                </div>
                <div className="bg-white shadow-md rounded-lg">
                    <div className="min-w-full">
                        <ul className="bg-lime-100 flex justify-between">
                            <li className="px-6 py-3 basis-1/12 text-center font-bold">번호</li>
                            <li className="px-6 py-3 basis-6/12 text-center font-bold">제목</li>
                            <li className="px-6 py-3 basis-2/12 text-center font-bold">작성자</li>
                            <li className="px-6 py-3 basis-2/12 text-center font-bold">작성일</li>
                        </ul>
                        {
                            results && results.map((e, i) => {
                                const date = new Date(e.date);
                                const year = date.getFullYear();
                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                const day = date.getDate().toString().padStart(2, '0');
                                const formatDate = `${year}-${month}-${day}`
                                return (
                                    <ul key={i} className='flex justify-between text-sm'>
                                        <li className="px-6 basis-1/12 py-3 text-center">{results.length - i}</li>
                                        <li className="px-6 basis-6/12 py-3 text-center"><Link href={`/post/${e.id}`}>{e.title}</Link></li>
                                        <li className="px-6 basis-2/12 py-3 text-center">{e.username}</li>
                                        <li className="px-6 basis-2/12 py-3 text-center">{formatDate}</li>
                                    </ul>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}