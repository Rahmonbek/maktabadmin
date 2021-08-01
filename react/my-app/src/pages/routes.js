import App1 from '../App1';
import Login from './Login';
import News from './News';
import Togaraklar from './Togaraklar';
import Maktab from './maktab';
import DarsJadvali from './DarsJadvali';
import Admin from './Admin'

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
                path: '/dashboard/togaraklar/uz',
                component: Togaraklar,
                },
                {
                    path: '/dashboard/darsjadvali/uz',
                    component: DarsJadvali,
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