interface userInfo {
    user : {
        name : string;
        email ? : string;
        image ? : string;
        level ? : number;
    }
}

import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import Logout from "./logout";
import Login from "./login";
// import { useCustomSession } from "../sessions";

export default async function Nav() {
    const session = await getServerSession(authOptions) as userInfo;
    // const {data : session, status} = useCustomSession();
    
    return (
        <>
            <div className="max-w-7xl mx-auto pt-20">
                <p className="font-bold">| {session && session.user.level === 10 ? '관리자' : session && session.user !== null && '일반회원'}</p>
                {/* {console.log(session && session.user)} */}
                {
                    session && session.user?.email ? 
                    <button>로그아웃</button>
                    :
                    <>
                        {
                            session && session.user
                            ?
                            <>
                                <p>{session && session.user?.name}님 반가</p>
                                <Logout />
                            </>
                            :
                            <>
                                <Link href='/register'>회원가입</Link>
                                <Login />
                            </>
                        }
                        <div className="flex">
                            <button className="block w-52 h-12 rounded-md bg-yellow-400">Sign in with Kakao</button>
                            <button className="block w-52 h-12 rounded-md bg-green-600 text-white">Sign in with Naver</button>
                            <button className="block w-52 h-12 rounded-md bg-gray-800 text-white">Sign in with Github</button>
                            <button className="block w-52 h-12 rounded-md bg-white shadow-md">Sign in with Google</button>
                            <button className="block w-52 h-12 rounded-md bg-slate-600 text-white">통합 로그인</button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}