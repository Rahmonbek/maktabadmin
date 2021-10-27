import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import styles from "../css/murojat.module.css";
import RasmBuImg from "../img/lalla.jpg";
import { url } from "../host/Host";
import GLOBAL from "../host/Global";
import { deleteMurojat } from "../host/Config";
import { IoIosCall, IoMdTime } from "react-icons/io";
import { message } from "antd";

export default function Murojat() {
  const [getUser, setGetUser] = useState([]);
  const [itemME, setItem] = useState(true);

  useEffect(() => {
    axios
      .get(`http://143.244.209.138/murojaat/${GLOBAL.id}`)
      .then((res) => {
        console.log("ResDAta", res.data);
        setGetUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteMurojat = (id) => {
    deleteMurojat(id)
      .then((res) => {
        message.success(" o'chirildi");
        this.getNews();
      })
      .catch((err) => {
        message.err(" o'chirilmadi");
      });
  };
  console.log("====================================");
  console.log("GlobalID", GLOBAL.id);

  console.log("====================================");

  return (
    <div className={styles.ContainerMe}>
      <Container>
        <div className={styles.ContainerComment}>
          {getUser.map((item) => {
            return (
              <Card style={{ width: "18rem", marginTop: "10px" }}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>

                  <Card.Text>{item.text}</Card.Text>
                  <Card.Link id={styles.CommentPhoneNumber}>
                    <p>
                      <IoIosCall />
                    </p>
                    <p>{item.phone}</p>
                  </Card.Link>
                  <Card.Link id={styles.CommentPhoneNumber}>
                    <p>
                      <IoMdTime />
                    </p>
                    <p>{item.date_sent}</p>
                  </Card.Link>
                </Card.Body>
                <Card.Footer id={styles.CommentButtonGroup}>
                  <p>Delete</p>
                  {itemME ? (
                    <p key={item.id} onClick={() => setItem(false)}>
                      Ko'rish
                    </p>
                  ) : (
                    <p key={item.id} onClick={() => setItem(true)}>
                      Ko'rildi
                    </p>
                  )}
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
