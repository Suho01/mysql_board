import { useSession } from "next-auth/react";

interface userInfo {
    user : {
        name : string;
        email : string;
        image ? : string;
        level ? : number;
    }
}
interface csSession {
    data : userInfo | null; // 로그인 했을 땐 userInfo, 로그인 하지 않았을 땐 null
    status : "loading" | "authenticated" | "unauthenticated"; // 로딩, 로그인 성공, 로그인 실패
}

export function useCustomSession() : csSession {
    const {data, status} = useSession();
    return {data : data as userInfo, status};
}