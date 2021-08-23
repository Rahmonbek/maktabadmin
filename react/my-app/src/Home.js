import React, { useState, useEffect } from "react";
import "./css/sidebar.css";
import { Switch, Link } from "react-router-dom";
import RouteWithSubRoutes from "./utils/RouteWithSubRoutes";
import styles from "./css/Menu.module.css";
import { BiBasketball } from "react-icons/bi";
import { DiJavascript1 } from "react-icons/di";
import { FiMusic, FiUsers } from "react-icons/fi";
import { FaCrown, FaDatabase, FaRegCalendarAlt } from "react-icons/fa";
import { CgBowl } from "react-icons/cg";
import { GiHeartPlus } from "react-icons/gi";
import { MdSecurity } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import Top from "./pages/Top";
import { Container, Row, Col } from "react-bootstrap";
import { Menu } from "antd";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { BiNews } from "react-icons/bi";
import { FaRibbon } from "react-icons/fa";
import { isArray } from "lodash";
import GLOBAL from "./host/Global";
import {Redirect} from 'react-router-dom'
const Home = ({ routes }) => {
    const [collapsed, setCollapsed] = useState(false);
    const menu = [
        {
            id: 1,
            path: "/home/dashboard/uz", // the url
            name: "Dashboard",
            icon: <AppstoreOutlined />, // name that appear in Sidebar
        },
        { id: 2, path: "/home/admin/uz", name: "Maktab", icon: <UserOutlined /> },
        { id: 3, path: "/home/yangiliklar/uz", name: "Yangiliklar", icon: <BiNews /> },
        { id: 4, path: "/home/tadbirlar/uz", name: "Tadbirlar", icon: <FaRibbon /> },
        { id: 16, path: "/home/togaraklar/uz", name: "To'garaklar", icon: <FaDatabase /> },
        // { id: 5, path: "/home/sportmashgulotlari/uz", name: "Sport mashg'ulotlari", icon: <BiBasketball /> },
        // { id: 6, path: "/home/musiqatogaraklari/uz", name: "Musiqa to'garaklari", icon: <FiMusic /> },
        // { id: 7, path: "/home/axborottexnologiyalari/uz", name: "Axborot texnologiyalari", icon: <DiJavascript1 /> },
        { id: 8, path: "/home/oqituvchilar/uz", name: "O'qituvchilar", icon: <FiUsers /> },
        { id: 9, path: "/home/alochioquvchilar/uz", name: "A'lochi o'quvchilar", icon: <FaCrown /> },
        { id: 14, path: "/home/yutuqlar/uz", name: "Yutuqlar", icon: <FaCrown /> },
        { id: 15, path: "/home/sinflar/uz", name: "Sinflar", icon: <HiUserGroup /> },
        { id: 10, path: "/home/darsjadvali/uz", name: "Dars jadvali", icon: <FaRegCalendarAlt /> },
        // { id: 11, path: "/home/maktaboshxonasi/uz", name: "Maktab oshxonasi", icon: <CgBowl /> },
        // { id: 12, path: "/home/xavfsizlik/uz", name: "Xavfsizlik", icon: <MdSecurity /> },
        // { id: 13, path: "/home/salomatlik/uz", name: "Salomatlik", icon: <GiHeartPlus /> },
    ];
    useEffect(() => {
        window.addEventListener("resize", resize.bind(this));
        resize();
    }, []);

    const resize = () => {
        if (window.innerWidth <= 767) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    };
    return (GLOBAL.id!==null?
        <>
            <Container fluid style={{ padding: "0", position: "relative" }}>
                <Row>
                    <Col lg={12} style={{ position: "sticky" }}>
                        <Row>
                            <Col xl={2} lg={3} md={4} sm={2} xs={2}>
                                <div style={{ position: "sticky", top: "0px", height: "100vh", boxShadow: "0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%), 0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%)", zIndex: "10000000" }}>
                                    <div className={styles.topMenu}>
                                        <h1>Star admin</h1>
                                        <span className={styles.crown}>
                                            <FaCrown style={{ fontSize: "30px" }} />
                                        </span>
                                    </div>
                                    <Menu style={{ overflowY: "scroll", height: "90%", overflowX: "hidden", marginTop: "0" }} className={styles.Menyusidebar} defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" inlineCollapsed={collapsed}>
                                        {menu && isArray(menu)
                                            ? menu.map((item) => {
                                                  return (
                                                      <Menu.Item key={item.id} icon={item.icon} className={styles.menuitem}>
                                                          <Link to={item.path}>{item.name}</Link>
                                                      </Menu.Item>
                                                  );
                                              })
                                            : ""}
                                    </Menu>
                                </div>
                            </Col>
                            <Col xl={10} lg={9} md={8} sm={10} xs={10} style={{ padding: "0" }}>
                                <Row>
                                    <Col lg={12} style={{ padding: "0", position: "sticky", top: "0px", zIndex: "100000" }}>
                                        <Top />
                                    </Col>
                                    <Col lg={12} style={{ padding: "40px", overflowY: "scroll" }}>
                                        <Switch>
                                            {routes.map((route, i) => (
                                                <RouteWithSubRoutes key={i} {...route} />
                                            ))}
                                        </Switch>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>:<Redirect to="/login"/>
    );
};

export default Home;
