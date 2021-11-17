import App1 from '../App1';
import Login from './Login';
import News from './News';
import Togaraklar from './Togaraklar';
import Maktab from './maktab';
import DarsJadvali from './DarsJadvali';
import Admin from './Admin'
import Verify from './Verify'
const routes = [
    {
    path: '/login',
    component: Login,
   
    },
    {
    path: '/dashboard',
    component: App1,
    routes:[
        {
            path: '/dashboard/yangiliklar/uz',
            component: News,
            },
               
                    {
                        path: '/dashboard/maktaboshxona/uz',
                        component: Maktab,
                        },
                        {
                            path: '/dashboard/admin/uz',
                            component: Admin,
                            }
    ]
    },
];

export default routes;