import db from '@/db';
import { NextRequest, NextResponse } from 'next/server'; // 서버에서 돌아감(미들웨어)
import { NextApiRequest, NextApiResponse } from 'next'; // 자체적인 api에서 돌아감
import { RowDataPacket } from 'mysql2/promise';

export const GET = async (
    req : NextRequest,
    res : NextResponse
) : Promise<NextResponse> => {
    if (req.method === 'GET') {
        console.log(req.nextUrl.searchParams.get("page"));
        const page = Number(req.nextUrl.searchParams.get("page") || 1); // 문자열이 아닌 숫자형으로, index 방지 그리고 1보다 크게
        const perPage = 15; // limit
        const offset = (page - 1) * perPage;        

        try {
            const [results] = await db.query<RowDataPacket[]>('SELECT * FROM suho.board order by date desc limit ? offset ?', [perPage, offset]); // schema.table
            const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from world.city');
            const totalCnt = countResult[0].cnt;

            // console.log(results);

            return NextResponse.json({message : "성공.", results, totalCnt, page, perPage});
        } catch(error) {
            return NextResponse.json({error : error});
        }
    }

    return NextResponse.json({error : "에러가 발생하였습니다."});
}