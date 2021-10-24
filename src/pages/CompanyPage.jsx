import React from "react";
import { Redirect } from "react-router-dom";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
} from "@appbaseio/reactivesearch";
import { Row, Col, Container, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, ResultCard } from "../components";
import "../style.css";
import {
  REACT_APP_ELASTIC_SCHEME,
  REACT_APP_ELASTIC_HOST,
  REACT_APP_ELASTIC_PORT,
} from "../constants.js";
import { useParams } from "react-router-dom";

function CompanyPage({ children }) {
  const [modalContent, setModalContent] = React.useState(null);
  const handleClose = () => setModalContent(null);
  const handleShow = (content) => setModalContent(content);
  let { cif } = useParams();
  console.log(cif);
  if (cif === "") {
    <Redirect to="/" />;
  }

  const customQuery = function () {
    return {
      query: {
        match: {
          "winner_0.cif.keyword": {
            query: cif,
          },
        },
      },
    };
  };
  return (
    <>
      <ReactiveBase
        url={`${REACT_APP_ELASTIC_SCHEME}://${REACT_APP_ELASTIC_HOST}:${REACT_APP_ELASTIC_PORT}/`}
        app="contracts_es"
      >
        <Container>
          <Row>
            <Col>
              <DataSearch
                componentId="SearchSensor"
                dataField={["title", "offerers.name"]}
                customQuery={customQuery}
                autosuggest={false}
              />

              <ReactiveList
                componentId="SearchResult"
                dataField=""
                pagination={true}
                paginationAt="both"
                react={{
                  and: ["SearchSensor"],
                }}
                defaultQuery={customQuery}
                sortOptions={[
                  {
                    label: "Price (high to low)",
                    dataField: "resolution_0.priceWithVAT",
                    sortBy: "desc",
                  },
                  {
                    label: "Price (low to high)",
                    dataField: "resolution_0.priceWithVAT",
                    sortBy: "asc",
                  },
                ]}
                renderItem={(res) => (
                  <>
                    <ResultCard
                      result_item={res}
                      card_classname="mb2"
                      on_click={handleShow}
                    />

                    <Modal
                      show={!!modalContent}
                      onHide={handleClose}
                      fullscreen={true}
                    >
                      {modalContent && (
                        <>
                          <Modal.Header closeButton>
                            <Modal.Title>{modalContent.title}</Modal.Title>
                          </Modal.Header>

                          <Modal.Body>
                            <pre>{JSON.stringify(modalContent, null, 2)}</pre>
                          </Modal.Body>

                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>

                            <Button variant="primary" onClick={handleClose}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </>
                      )}
                    </Modal>
                  </>
                )}
                renderResultStats={function (stats) {
                  return `Showing ${stats.displayedResults} of total ${stats.numberOfResults} in ${stats.time} ms`;
                }}
              />
            </Col>
          </Row>
        </Container>
      </ReactiveBase>
      <Footer>
        <p>Kontrata</p>
      </Footer>
    </>
  );
}

export default CompanyPage;
