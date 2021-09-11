import Home from "./Home";
import Login from "./pages/Login";
import Maktaboshxonasi from "./pages/Maktaboshxonasi";
import Oqituvchilar from "./pages/Oqituvchilar";
import DarsJadvali from "./pages/DarsJadvali";
import Rahbariyat from "./pages/Rahbariyat";
import Admin from "./pages/Admin";
import Alochilar from "./pages/Alochilar";
import Tadbirlar from "./pages/Tadbirlar";
import Sport from "./pages/Sport";
import Musiqa from "./pages/Musiqa";
import Axborot from "./pages/Axborot";
import Xavfsizlik from "./pages/Xavfsizlik";
import Salomatlik from "./pages/Salomatlik";
import Dashboard from "./pages/Dashboard";
import Yutuqlar from "./pages/Yutuqlar";
import Yangiliklar from "./pages/Yangiliklar";
import Sinflar from "./pages/Sinflar";
import Togaraklar from "./pages/Togaraklar";
import Oquvchilar from "./pages/Oquvchilar";
const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
    routes: [
      {
        path: "/home/dashboard/uz",
        component: Dashboard,
      },
      {
        path: "/home/oquvchilar/uz",
        component: Oquvchilar,
      },
      {
        path: "/home/maktaboshxonasi/uz",
        component: Maktaboshxonasi,
      },
      {
        path: "/home/oqituvchilar/uz",
        component: Oqituvchilar,
      },
      {
        path: "/home/darsjadvali/uz",
        component: DarsJadvali,
      },
      {
        path: "/home/sinflar/uz",
        component: Sinflar,
      },
      {
        path: "/home/sportmashgulotlari/uz",
        component: Sport,
      },
      {
        path: "/home/yangiliklar/uz",
        component: Yangiliklar,
      },
      {
        path: "/home/rahbariyat/uz",
        component: Rahbariyat,
      },
      {
        path: "/home/admin/uz",
        component: Admin,
      },
      {
        path: "/home/alochioquvchilar/uz",
        component: Alochilar,
      },
      {
        path: "/home/yutuqlar/uz",
        component: Yutuqlar,
      },
      {
        path: "/home/tadbirlar/uz",
        component: Tadbirlar,
      },
      {
        path: "/home/musiqatogaraklari/uz",
        component: Musiqa,
      },
      {
        path: "/home/togaraklar/uz",
        component: Togaraklar,
      },
      {
        path: "/home/axborottexnologiyalari/uz",
        component: Axborot,
      },
      {
        path: "/home/xavfsizlik/uz",
        component: Xavfsizlik,
      },
      {
        path: "/home/salomatlik/uz",
        component: Salomatlik,
      },
    ],
  },
];

export default routes;
