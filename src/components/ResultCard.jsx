import React, { useContext } from "react";
import { Context } from "../Store";
import { Card, Button } from "react-bootstrap";
import Icon from "./Icon";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import routes from "../routes";
import PropTypes from "prop-types";

function ResultCard({ result_item, card_classname, on_click }) {
  const card_class = card_classname || "mb-2";
  const numberFormat = (value) =>
    new Intl.NumberFormat(`es-ES`, {
      style: "currency",
      currency: "EUR",
    }).format(value);
  const dateFormat = (date) =>
    new Intl.DateTimeFormat(`es-ES`, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  const [state] = useContext(Context);
  return (
    <Card className={card_class}>
      <Card.Body>
        <Card.Title>{result_item.title}</Card.Title>
        <Card.Text>
          <FormattedMessage id="ID:" defaultMessage="ID:" /> {result_item.id}
          <br />
          <FormattedMessage id="Authority:" defaultMessage="Authority:" />{" "}
          {result_item.authority?.cif ? (
            <Link
              to={{
                pathname:
                  routes.base_authority[state.language] +
                  "/" +
                  result_item.authority?.cif,
              }}
            >
              {result_item.authority.name}
            </Link>
          ) : (
            result_item.authority.name
          )}
          <br />
          <FormattedMessage
            id="Adjudication date:"
            defaultMessage="Adjudication date:"
          />{" "}
          {dateFormat(result_item.adjudication_date)}
          <br />
          <FormattedMessage id="Budget:" defaultMessage="Budget:" />{" "}
          {numberFormat(result_item.budget)}
          <br />
          <FormattedMessage id="Status:" defaultMessage="Status:" />{" "}
          {result_item.status?.code} ({result_item.status?.name})<br />
          <FormattedMessage
            id="Minor contract:"
            defaultMessage="Minor contract:"
          />
          {result_item.minor_contract ? (
            <Icon name="ok" size="28px" />
          ) : (
            <Icon name="notok" size="28px" />
          )}
          <br />
          <FormattedMessage id="Winner:" defaultMessage="Winner:" />{" "}
          {result_item.winner_0?.cif ? (
            <Link to={"/es/empresa/" + result_item.winner_0.cif}>
              {result_item.winner_0?.name}
            </Link>
          ) : (
            result_item.winner_0?.name
          )}
          <br />
          <FormattedMessage id="Price:" defaultMessage="Price:" />{" "}
          {numberFormat(result_item.resolution_0?.priceWithVAT)}
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
              <FormattedMessage
                id="See more details"
                defaultMessage="See more details"
              />
            </Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

ResultCard.propTypes = {
  result_item: PropTypes.object,
  card_classname: PropTypes.string,
  onclick: PropTypes.func,
};

export default ResultCard;
