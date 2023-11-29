import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { Bar } from 'react-chartjs-2';
// import { Chart } from 'chart.js';
import ChartCom from '../components/admin/chart/chart';
import TotalCount from '../components/admin/chart/totalcnt';
import NewMember from '../components/admin/chart/newmember';
import NewPost from '../components/admin/chart/newpost';

interface userInfo {
    user : {
        name : string;
        email ? : string;
        image ? : string;
        level ? : number;
        nickname ? : string;
    }
}

export default async function Admin() {
    const data = {
        labels : ['salmon', 'orange', 'green'],
        datasets : [
            {
                label : "차트",
                data : [10, 50, 5],
                backgroundColor : [
                    'rgba(250, 128, 114, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)'
                ],
                borderColor : [
                    'rgb(250, 128, 114)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 89)'                    
                ],
                borderWidth : 1
            }
        ]
    }
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    let sessions = await getServerSession(authOptions) as userInfo;
    // if (!sessions && sessions || sessions?.user.level !== 10) {
    //     return (
    //         <p>관리자만 접속 가능한 페이지입니다.</p>
    //     )
    // }
    return (
        <>
            <div className='max-w-7xl mx-auto'>
                <p className='text-sm'>관리자 전용 페이지</p>   
                {/* <ChartCom /> */}
                <TotalCount />
                <div className="w-full my-5 flex flex-wrap justify-between">
                    <NewMember />
                    <NewPost />
                </div>
            </div>
        </>
    )
}