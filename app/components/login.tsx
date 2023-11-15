interface userInfo {
    user : {
        name : string;
        email ? : string;
        image ? : string;
        level ? : number;
    }
}

import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
// import { useCustomSession } from "../sessions";

export default async function Login() {
    const session = await getServerSession(authOptions) as userInfo;
    // const {data : session, status} = useCustomSession();
    const redirectTo = () => {
        sessionStorage.setItem('preUrl', window.location.href);
        window.location.href = "/login";
    }
    return (
        <>
            {
                session && session.user.level === 10 ? '관리자' : session && session.user !== null && '일반회원'
            }
            {/* {console.log(session && session.user)} */}
            {
                session && session.user?.email ? 
                <button>로그아웃!!</button>
                :
                <>
                    {
                        session && session.user
                        ?
                        <>
                            <p>{session && session.user?.name}님 반가</p>
                            <Link href='/logout'>로그아우</Link>
                        </>
                        :
                        <>
                            <Link href='/register'>회원가입</Link>
                            <Link href='/login'>로그인</Link>
                        </>
                    }
                    <div className="lg:max-w-7xl mx-auto flex">
                        <button className="block"><img className="w-52" src="./../img/kakao.png" alt="kakao" /></button>
                        <button className="block"><img className="w-52" src="./../img/naver.png" alt="naver" /></button>
                        <button className="block w-52 h-12 rounded-md bg-gray-800 text-white">Sign in with Github</button>
                        <button className="block"><img className="w-52" src="./../img/google.png" alt="google" /></button>
                        <button className="block text-5xl bg-slate-600 text-white p-5">통합 로그인</button>
                        <button>로그인</button>
                    </div>
                </>
            }
        </>
    )
}