import db from '@/db';
import { RowDataPacket } from 'mysql2';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import Comment from '@/app/components/comment';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EditDelete from './editDelete';

interface userInfo {
    user : {
        name : string;
        email ? : string;
        image ? : string;
        level ? : number;
    }
}
interface propsType {
    results : {
        id : number;
        userid : string;
        title ? : string;
        content ? : string;
        username ? : string;
        count ? : number;
        date ? : string;
    }
}

async function Getip() {
    const res = await fetch('http://localhost:3000/api/get-ip');
    const data = res.json();
    if (!res.ok) {
        alert("에러가 발생하였습니다.");
        return;
    }
    return data;
}

export default async function Detail({
    params
} : {
    params ? : {id ? : number}
}) {
    const getIp = await Getip();
    const userIp = getIp.data;
    // console.log(userIp);
    const postId = params?.id !== undefined ? params.id : 1;
    const [results] = await db.query<RowDataPacket[]>('select * from suho.board where id = ?', [postId]);
    const post = results && results[0];
    let session = await getServerSession(authOptions) as userInfo;

    const [countResult] = await db.query<RowDataPacket[]>('select count (*) as cnt from suho.view_log where postid = ? and ip_address = ?', [postId, userIp]);
    const totalCnt = countResult[0].cnt;
    console.log(totalCnt + "개");

    if (results.length > 0) {
        if (totalCnt === 0) {
            await db.query<RowDataPacket[]>('update suho.board set count = count + 1 where id = ?', [postId]);
        }        
        await db.query<RowDataPacket[]>('insert into suho.view_log (postid, ip_address, view_date) select ?, ?, NOW() where not exists (select 1 from suho.view_log where postid = ? and ip_address = ? and view_date > now() - interval 24 hour)', [postId, userIp, postId, userIp]);
        /*
        select 1 : 존재여부를 확인하기 위해 사용
        1이라는 건 상수 값으로 실제 데이터는 중요하지 않으며, 존재 여부를 확인하기 위함
        내가 원하는 테이블에서 어떠한 조건 즉 and까지 포함한 3가지 조건이 모두 충족하는 조건을 찾는다.
        어떠한 행도 반환하지 않을 때만 참이 된다. 즉 3가지 조건이 모두 참일 때 혹은 데이터가 없을 때 쿼리가 실행
        */
    }
    return (
        <>
        <div className="h-screen relative">
            <div className="bg-white shadow-xl w-1/2 h-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {
                    results.length > 0 && (
                        <>
                            <p className="pt-5 text-xl text-center"><span className="font-bold text-base">제목 | </span>{post?.title}</p>
                            <p className="p-5 text-center">{post?.content}</p>
                            <p className="p-5 text-center text-sm">조회수 : {post?.count}</p>
                            {
                                session ? <Comment id={post?.id} /> : <p className="block border p-4 text-center my-5 rounded-md"><Link href='/login'>로그인 후 댓글을 작성해주세요.</Link></p>
                            }
                            <EditDelete results={post as propsType['results']} />
                        </>
                    )
                }
            </div>
        </div>
        </>
    )
}