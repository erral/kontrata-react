import React from "react";
import {
  DataSearch,
  SingleList,
  ReactiveList,
  MultiRange,
  SelectedFilters,
  SingleDataList,
  DateRange,
} from "@appbaseio/reactivesearch";
import { Row, Col, Container, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer, ResultCard } from "../components";
import "../style.css";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

function HomePage({ children }) {
  const [modalContent, setModalContent] = React.useState(null);
  const handleClose = () => setModalContent(null);
  const handleShow = (content) => setModalContent(content);
  const intl = useIntl();

  return (
    <>
      <Container>
        <Row>
          <Col md={4}>
            <DateRange
              componentId="DateSensor"
              dataField="adjudication_date"
              title={intl.formatMessage({
                id: "Adjudication date",
                defaultMessage: "Adjudication date",
              })}
              numberOfMonths={1}
              URLParams={true}
              react={{
                and: [
                  "Status",
                  "Type",
                  "MinorContract",
                  "PriceSensor",
                  "BudgetSensor",
                  "SearchSensor",
                  "Authority",
                ],
              }}
            />

            <SingleList
              componentId="Authority"
              dataField="authority.name.keyword"
              title={intl.formatMessage({
                id: "Authority",
                defaultMessage: "Authority",
              })}
              innerClass={{
                title: "search-title",
                input: "search-input",
              }}
              sortBy="asc"
              size={10000}
              URLParams={true}
              react={{
                and: [
                  "Status",
                  "Type",
                  "MinorContract",
                  "PriceSensor",
                  "BudgetSensor",
                  "SearchSensor",
                  "DateSensor",
                ],
              }}
            />

            <SingleList
              componentId="Status"
              dataField="status.name.keyword"
              title={intl.formatMessage({
                id: "Status",
                defaultMessage: "Status",
              })}
              sortBy="asc"
              URLParams={true}
              react={{
                and: [
                  "Authority",
                  "Type",
                  "MinorContract",
                  "PriceSensor",
                  "BudgetSensor",
                  "SearchSensor",
                  "DateSensor",
                ],
              }}
            />

            <SingleList
              componentId="Type"
              dataField="contract_type.name.keyword"
              title={intl.formatMessage({
                id: "Contract type",
                defaultMessage: "Contract type",
              })}
              sortBy="asc"
              URLParams={true}
              react={{
                and: [
                  "Authority",
                  "Status",
                  "MinorContract",
                  "PriceSensor",
                  "BudgetSensor",
                  "SearchSensor",
                  "DateSensor",
                ],
              }}
            />

            <SingleDataList
              componentId="MinorContact"
              dataField="minor_contract"
              title={intl.formatMessage({
                id: "Minor contract",
                defaultMessage: "Minor contract",
              })}
              showSearch={false}
              showRadio={true}
              showCount={true}
              URLParams={true}
              data={[
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ]}
              react={{
                and: [
                  "Authority",
                  "Status",
                  "Type",
                  "PriceSensor",
                  "BudgetSensor",
                  "SearchSensor",
                  "DateSensor",
                ],
              }}
            />

            <MultiRange
              componentId="PriceSensor"
              dataField="resolution_0.priceWithVAT"
              title={intl.formatMessage({
                id: "Price",
                defaultMessage: "Price",
              })}
              URLParams={true}
              data={[
                { start: 0, end: 10000.0, label: "<10000" },
                { start: 10001, end: 50000, label: "10001 < x < 50000" },
                { start: 50001, end: 200000, label: "50001 < x < 200000" },
                { start: 200001, end: 999999999999, label: "200001 < x" },
              ]}
              react={{
                and: [
                  "Authority",
                  "Status",
                  "Type",
                  "MinorContract",
                  "BudgetSensor",
                  "SearchSensor",
                  "DateSensor",
                ],
              }}
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
              title={intl.formatMessage({
                id: "Budget",
                defaultMessage: "Budget",
              })}
              react={{
                and: [
                  "Authority",
                  "Status",
                  "Type",
                  "MinorContract",
                  "PriceSensor",
                  "SearchSensor",
                  "DateSensor",
                ],
              }}
            />
          </Col>
          <Col md={8}>
            <DataSearch
              componentId="SearchSensor"
              dataField={["title", "offerers.name", "winner_0.name"]}
              autosuggest={false}
              URLParams={true}
              searchOperators={true}
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
                  "DateSensor",
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
                {
                  label: "Adjudication date (descending",
                  dataField: "adjudication_date",
                  sortBy: "desc",
                },
                {
                  label: "Adjudication date (ascending)",
                  dataField: "adjudication_date",
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
      <Footer>
        <p>Kontrata</p>
      </Footer>
    </>
  );
}

HomePage.propTypes = {
  children: PropTypes.element,
};

export default HomePage;
