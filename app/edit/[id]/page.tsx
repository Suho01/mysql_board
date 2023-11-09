import db from '@/db';
import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';

interface editProps {
    params : {
        id : string;
    }
}

interface PostList {
    id : number;
    title : string;
    content : string;
    author : string;
    date : string;
    count : number;
}

export default async function Edit(props : editProps) {
    // console.log(props.params.id); // ssr에서는 console이 터미널에 뜸
    const [results] = await db.query<RowDataPacket[]>('select * from suho.board where id = ?', [props.params.id]);
    console.log(results[0].author);
    // 'update suho.board set 필드 = 변경값, 필드 = 변경값 where id = 변경할 아이디'
    // ('update suho.board set title = ?, content = ? where id = ?'), [title, content, id]
    return (
        <>
            {
            results.length > 0
            ?
            <form method="post">
                <input type="text" name="name" className="shadow text-gray-700 text-sm mb-2 border" />
                <input type="text" name="title" className="shadow text-gray-700 text-sm mb-2 border"/>
                <textarea name="content" className="shadow text-gray-700 text-sm mb-2 border"></textarea>
                <button className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none"><Link href='/'>취소</Link></button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none">등록</button>
            </form>
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
