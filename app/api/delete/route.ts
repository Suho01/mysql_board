import { NextRequest, NextResponse } from "next/server";
import db from '@/db';
import { RowDataPacket } from "mysql2";

interface PostNumber {
    id : number;
    pathUrl ? : string;
}

export const POST = async (
    req : NextRequest
) : Promise<NextResponse> => {
    if (req.method === 'POST') {
        try {
            const {id, pathUrl} : PostNumber = JSON.parse(await req.text());

            if (!id) {
                return NextResponse.json({message : "데이터가 부족합니다."});
            } if (pathUrl === 'member') {
                const [chkMember] = await db.query<RowDataPacket[]>('select level from suho.member where id = ?', [id]);
                // console.log(chkMember[0]);
                if (chkMember[0].level === 10) {
                    return NextResponse.json({message : "관리자는 삭제할 수 없습니다."});
                } else {
                    await db.query<RowDataPacket[]>('delete from suho.member where id = ?', [id]);
                    return NextResponse.json({message : "정상적으로 삭제되었습니다."});
                }
            } else {
                /* select : 선택, insert : 입력, delete : 삭제, update : 수정 */
                await db.query(
                    'delete from board where id = ?', [id]
                );
                return NextResponse.json({message : "정상적으로 삭제되었습니다."});
            }
        } catch(error) {
            return NextResponse.json({error : "에러"});
        }
    } else {
        return NextResponse.json({message : "정상적인 데이터가 아닙니다."});
    }
}