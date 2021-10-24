import React from "react";
import { Card, Button } from "react-bootstrap";
import Icon from "./Icon";
import { Link } from "react-router-dom";

function ResultCard({ result_item, card_classname, on_click }) {
  const card_class = card_classname || "mb-2";
  const numberFormat = (value) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  return (
    <Card className={card_class}>
      <Card.Body>
        <Card.Title>{result_item.title}</Card.Title>
        <Card.Text>
          ID: {result_item.id}
          <br />
          Authority:{" "}
          {result_item.authority?.cif ? (
            <Link to={{ pathname: "/es/empresa/" + result_item.authority.cif }}>
              {result_item.authority.name}
            </Link>
          ) : (
            result_item.authority.name
          )}
          <br />
          Budget: {numberFormat(result_item.budget)}
          <br />
          Status: {result_item.status?.code} ({result_item.status?.name})<br />
          Minor Contract:
          {result_item.minor_contract ? (
            <Icon name="ok" size="28px" />
          ) : (
            <Icon name="notok" size="28px" />
          )}
          <br />
          Winner:{" "}
          {result_item.winner_0?.cif ? (
            <Link to={"/es/empresa/" + result_item.winner_0.cif}>
              {result_item.winner_0?.name}
            </Link>
          ) : (
            result_item.winner_0?.name
          )}
          <br />
          Price: {numberFormat(result_item.resolution_0?.priceWithVAT)}
          <br />
          {result_item.offerers.length > 1 && (
            <ul>
              {" "}
              {result_item.offerers
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((offerer) => (
                  <li>
                    {offerer.cif ? (
                      <Link to={{ pathname: "/es/empresa/" + offerer.cif }}>
                        {offerer.name}
                      </Link>
                    ) : (
                      offerer.name
                    )}
                  </li>
                ))}
            </ul>
          )}
          <br />
          {on_click !== undefined && (
            <Button variant="primary" onClick={() => on_click(result_item)}>
              See more details
            </Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ResultCard;
