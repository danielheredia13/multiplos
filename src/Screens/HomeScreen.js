import React, { useState } from "react";
import { Col, Row, Form, Container, Button, Card } from "react-bootstrap";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

const MultiplosScreen = () => {
  const [number, setNumber] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [result, setResult] = useState([]);
  const [userMultiplesData, setUserMultiplesData] = useState([]);
  const userMultipleCollection = collection(db, "multiples");

  //funcion para buscar el historial de calculo y poder desplegarlo para el usuario
  const getUserMultiples = async () => {
    try {
      const data = await getDocs(userMultipleCollection);
      setUserMultiplesData(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.error("Error geting the data");
    }
  };

  //funcion para agregar la busqueda y resultado a firebase
  const addSearch = async (multiplo) => {
    try {
      await addDoc(userMultipleCollection, {
        search: {
          number: number,
          result: multiplo,
        },
      });
    } catch (error) {
      console.error("Error adding document");
    }
  };

  //funcionalidad para generar los multiplos entre 0 y el input,
  //ademas asignar el color correspondiente segun el multiplo,
  //para luego agregarlo a la base de datos

  const handleClick = async () => {
    let multiplo = [];

    for (let i = 0; i <= number; i++) {
      let num = {
        color: "black",
        data: i,
      };

      if (i % 3 === 0) {
        num = {
          color: "green",
          data: i,
        };
        multiplo.push(num);
        continue;
      }

      if (i % 5 === 0) {
        num = {
          color: "red",
          data: i,
        };
        multiplo.push(num);
        continue;
      }

      if (i % 7 === 0) {
        num = {
          color: "blue",
          data: i,
        };
        multiplo.push(num);
        continue;
      }

      multiplo.push(num);
    }
    setResult(multiplo);
    addSearch(multiplo);
    setDisplayNumber(number);
  };

  return (
    <Container>
      <Row>
        <Col className="mt-4 search-wrap">
          <h1>Multiples of 3, 5 and 7</h1>
          <Form.Label htmlFor="inputPassword5">Number</Form.Label>
          <Form.Control
            className="query-input"
            type="number"
            id="inputnumber"
            placeholder="Enter a Number"
            onChange={(e) => setNumber(e.target.value)}
          />
          <div>
            <Button className="my-4" onClick={handleClick}>
              Enter
            </Button>
            <Button className="my-4 mx-4" onClick={getUserMultiples}>
              Previews Searchs
            </Button>
          </div>
          <h2>Current search</h2>
          {displayNumber === 0 ? null : (
            <Card className="d-flex card-box ">
              <Card.Body>
                <Card.Title>{displayNumber}</Card.Title>
                <Card.Text>
                  {result.map((n, i) => {
                    return (
                      <span
                        className="num-box"
                        style={{ color: n.color }}
                        key={i}
                      >
                        {`${n.data}, `}
                      </span>
                    );
                  })}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <h2 className="history-title">Search history</h2>
      <Row>
        <Col className="d-flex flex-wrap mt-5" style={{ gap: "5px" }}>
          {userMultiplesData &&
            userMultiplesData.map((item) => (
              <Card key={item.id} className="d-flex card-box ">
                <Card.Body>
                  <Card.Title>{item.search.number}</Card.Title>
                  <Card.Text>
                    {item.search.result.map((n, i) => {
                      return (
                        <span
                          className="num-box"
                          style={{ color: n.color }}
                          key={i}
                        >
                          {`${n.data}, `}
                        </span>
                      );
                    })}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MultiplosScreen;
