import React from "react";
import { Redirect } from "react-router-dom";
import { DataSearch, ReactiveList } from "@appbaseio/reactivesearch";
import { Row, Col, Container, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, ResultCard } from "../components";
import "../style.css";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function AuthorityPage({ children }) {
  const [modalContent, setModalContent] = React.useState(null);
  const handleClose = () => setModalContent(null);
  const handleShow = (content) => setModalContent(content);
  let { cif } = useParams();
  if (cif === "") {
    <Redirect to="/" />;
  }

  const customQuery = function () {
    return {
      query: {
        match: {
          "authority.cif.keyword": {
            query: cif,
          },
        },
      },
    };
  };
  return (
    <>
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
                            <FormattedMessage
                              id="Close"
                              defaultMessage="Close"
                            />
                          </Button>

                          <Button variant="primary" onClick={handleClose}>
                            <FormattedMessage
                              id="Save changes"
                              defaultMessage="Save changes"
                            />
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
      <Footer>
        <p>Kontrata</p>
      </Footer>
    </>
  );
}

export default AuthorityPage;
