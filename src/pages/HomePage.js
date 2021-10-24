import React from "react";
import {
  ReactiveBase,
  DataSearch,
  SingleList,
  ReactiveList,
  RangeSlider,
  ToggleButton,
  MultiRange,
  SelectedFilters,
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
import useLocalStorage from "../utils/useLocalStorage";
import { DB_KEYS } from "../constants";
import { Icon } from "../components";

function HomePage({ children }) {
  const default_language = navigator.language.split(/[-_]/)[0]; // language without region code
  const [language, setLanguage] = useLocalStorage(
    DB_KEYS.SELECTED_LANGUAGE,
    default_language
  );
  const [modalContent, setModalContent] = React.useState(null);

  const handleClose = () => setModalContent(null);
  const handleShow = (content) => setModalContent(content);

  return (
    <>
      <ReactiveBase
        url={`${REACT_APP_ELASTIC_SCHEME}://${REACT_APP_ELASTIC_HOST}:${REACT_APP_ELASTIC_PORT}/`}
        app="contracts_es"
      >
        <Container>
          <Row>
            <Col md={4}>
              <SingleList
                componentId="Authority"
                dataField="authority.name.keyword"
                title="Authority"
                sortBy="asc"
                size={10000}
                URLParams={true}
              />

              <SingleList
                componentId="Status"
                dataField="status.name.keyword"
                title="Status"
                sortBy="asc"
                URLParams={true}
              />

              <SingleList
                componentId="Type"
                dataField="contract_type.name.keyword"
                title="Contract type"
                sortBy="asc"
                URLParams={true}
              />

              <SingleDataList
                componentId="MinorContact"
                dataField="minor_contract"
                title="Minor contact"
                showSearch={false}
                showRadio={true}
                showCount={true}
                URLParams={true}
                data={[
                  { label: "Yes", value: "true" },
                  { label: "No", value: "false" },
                ]}
              />

              <MultiRange
                componentId="PriceSensor"
                dataField="resolution_0.priceWithVAT"
                title="Price"
                URLParams={true}
                data={[
                  { start: 0, end: 10000.0, label: "<10000" },
                  { start: 10001, end: 50000, label: "10001 < x < 50000" },
                  { start: 50001, end: 200000, label: "50001 < x < 200000" },
                  { start: 200001, end: 999999999999, label: "200001 < x" },
                ]}
              />

              <MultiRange
                componentId="BudgetSensor"
                dataField="budget"
                URLParams={true}
                data={[
                  { start: 0, end: 10000.0, label: "<10000" },
                  { start: 10001, end: 50000, label: "10001 < x < 50000" },
                  { start: 50001, end: 200000, label: "50001 < x < 200000" },
                  { start: 200001, end: 999999999999, label: "200001 < x" },
                ]}
                title="Budget"
              />
            </Col>
            <Col md={8}>
              <DataSearch
                componentId="SearchSensor"
                dataField={["title", "offerers.name", "winner_0.name"]}
                autosuggest={false}
                URLParams={true}
              />

              <SelectedFilters />

              <ReactiveList
                componentId="SearchResult"
                dataField=""
                pagination={true}
                paginationAt="both"
                react={{
                  and: [
                    "Authority",
                    "Status",
                    "Type",
                    "PriceSensor",
                    "BudgetSensor",
                    "SearchSensor",
                    "MinorContract",
                  ],
                }}
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

export default HomePage;
