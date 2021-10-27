import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import styles from "../css/murojat.module.css";
import RasmBuImg from "../img/lalla.jpg";
import GLOBAL from "../host/Global";
import { deleteMurojat } from "../host/Config";
import { IoIosCall, IoMdTime } from "react-icons/io";
import { message } from "antd";
import { httpRequest, url } from "../host/Host";

export default function Murojat() {
  const [getUser, setGetUser] = useState([]);
  const [itemME, setItem] = useState(true);

  useEffect(() => {
    axios
      .get(`http://143.244.209.138/murojaat/2`)
      .then((res) => {
        console.log("ResDAta", res.data);
        setGetUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    deleteMurojat();
  }, []);
  const deleteMurojat = (idM) => {
    axios
      .delete(`http://143.244.209.138/murojaat/2/${idM}`)
      .then((res) => {
        console.log("delete", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const deleteMurojat = (e) => {
  //     e.preventDefault();
  //     axios
  //       .delete(`http://143.244.209.138/murojaat/${GLOBAL.id}/${id}`)
  //       .then((res) => {
  //         console.log("Deleted", res.data);
  //       })
  //       .catch((err) => {
  //         console.log("errorDelete", err);
  //       });
  //   };
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
                  <p onClick={(e) => deleteMurojat(item.id,e)}>Delete</p>
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
