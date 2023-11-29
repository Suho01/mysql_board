import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

interface PostType {
    pathUrl ? : string;
    id ? : number;
}
interface MainType {
    totalCnt : number;
    todayCnt : number;
    writeCnt : number;
    commentCnt : number;
    visitCnt : number;
    totalTotalCnt : number;
}

export const POST = async(req:NextRequest) : Promise<NextResponse> => {
    const {pathUrl, id} : PostType = JSON.parse(await req.text());
    if (req.method === 'POST') {
        switch(pathUrl) {
            case 'member' :
                const [memberResult] = await db.query<RowDataPacket[]>('select * from suho.member order by date DESC');
                return NextResponse.json({message : "성공", data : memberResult});
            case 'edit' :
                const [editResult] = await db.query<RowDataPacket[]>('select * from suho.member where id = ?', [id]);
                return NextResponse.json({message : "성공", data : editResult});
            case 'mainCnt' :
                const [totalCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from suho.member');
                const [todayCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from suho.member where date >= now() - interval 1 day'); // 24시간 기준 새 멤버
                const [writeCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from suho.board where date >= now() - interval 1 day'); // 24시간 이내의 새 글
                const [commentCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from suho.comment where date >= now() - interval 1 day'); // 24시간 이내의 새 댓글
                const [visitCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from suho.visits where visit_time >= now() - interval 1 day'); // 24시간 이내의 새 방문자
                const [totalTotalCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from suho.visits'); // 총 방문자
                const totalData : MainType = {
                    totalCnt : totalCnt[0].cnt ?? 0, // ?? 0 : 없다면 0으로 반환
                    todayCnt : todayCnt[0].cnt ?? 0,
                    writeCnt : writeCnt[0].cnt ?? 0,
                    commentCnt : commentCnt[0].cnt ?? 0,
                    visitCnt : visitCnt[0].cnt ?? 0,
                    totalTotalCnt : totalTotalCnt[0].cnt ?? 0
                }
                return NextResponse.json({message : "성공", data : totalData});
            case 'mainNewMember' :
                const [todayMember] = await db.query<RowDataPacket[]>('select * from suho.member where date >= now() - interval 1 day');
                return NextResponse.json({message : "성공", data : todayMember});
            case 'mainPost' :
                const [newPost] = await db.query<RowDataPacket[]>('select * from suho.board where date >= now() - interval 1 day');
                const [newComment] = await db.query<RowDataPacket[]>('select * from suho.comment where date >= now() - interval 1 day');
                const postData = {
                    newPost : newPost,
                    newComment : newComment
                }
                return NextResponse.json({message : "성공", data : postData});
            default : // 최종 else는 default
                return NextResponse.json({error : "알 수 없는 에러가 발생하였습니다."});
        }
        // if (pathUrl === 'member') {
        //     const [memberResult] = await db.query<RowDataPacket[]>('select * from suho.member order by date DESC');
        //     return NextResponse.json({message : "성공", data : memberResult});
        // } else if (pathUrl === 'edit') {
        //     const [memberResult] = await db.query<RowDataPacket[]>('select * from suho.member where id = ?', [id]);
        //     return NextResponse.json({message : "성공", data : memberResult});
        // } else {
        //     return NextResponse.json({error : "알 수 없는 에러가 발생하였습니다."});
        // }
    } else {
        return NextResponse.json({error : "알 수 없는 에러가 발생하였습니다."});
    }
}