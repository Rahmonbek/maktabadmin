import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import styles from "../css/murojat.module.css";
import RasmBuImg from "../img/lalla.jpg";
import GLOBAL from "../host/Global";
import { deleteMurojat } from "../host/Config";
import { IoIosCall, IoMdTime } from "react-icons/io";
import { message } from "antd";
import { httpRequest, url } from "../host/Host";
import { Button } from "antd";
import Loader from "./Loader";
export default function Murojat() {
  const [getUser, setGetUser] = useState([]);
  const [itemME, setItem] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false);
    },2000);
  }, []);
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
    deleteMurojat();
  }, []);
  const deleteMurojat = (idM) => {
    axios
      .delete(`http://143.244.209.138/murojaat/${GLOBAL.id}/${idM}`)
      .then((res) => {
        console.log("delete", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.ContainerMe}>
      {isLoaded ? (
        <Loader />
      ) : (
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
                    {itemME ? (
                      <p key={item.id} onClick={() => setItem(false)}>
                        Ko'rish
                      </p>
                    ) : (
                      <p key={item.id} onClick={() => setItem(true)}>
                        Ko'rildi
                      </p>
                    )}

                    <Button
                      className={styles.CommentButtonGroupItem}
                      onClick={(e) => deleteMurojat(item.id, e)}
                      type="primary"
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              );
            })}
          </div>
        </Container>
      )}
    </div>
  );
}
