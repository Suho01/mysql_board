import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req : NextRequest,
    res : NextResponse
) : Promise<NextResponse> => {
    if (req.method === 'POST') {
        try {

        } catch(error) {
            return NextResponse.json({message : "에러"});
        }
    } else {
        return NextResponse.json({message : "정상적인 데이터가 아닙니다."});
    }
    return NextResponse.json({message : "성공"});
}