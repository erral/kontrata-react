import React, { Component } from 'react';
import { ReactiveBase, DataSearch, SingleList, ReactiveList, RangeSlider, MultiRange, SelectedFilters } from "@appbaseio/reactivesearch";
import { Row, Col, Container, Card, Button, Modal, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Icon, LanguageSelector, Footer, DarkModeToogle } from './components';
import { EXTERNAL_LINKS } from "./constants";
import './style.css';

function App() {

  const [modalContent, setModalContent] = React.useState(null);

  const handleClose = () => setModalContent(null);
  const handleShow = (content) => setModalContent(content);

  const numberFormat = (value) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);

  return (
    <>
      <Navbar>
        <LanguageSelector />
        <Nav.Link href={EXTERNAL_LINKS.GITHUB} target="_blank"><Icon name="github" size="28px" color="#fff" /></Nav.Link>
        <DarkModeToogle />
      </Navbar>
      <ReactiveBase
        url="http://localhost:9200"
        app="contracts_es"
      >
        <Container>
          <Row>
            <Col md={4}>
              <SingleList
                componentId="Authority"
                dataField="authority.keyword"
                title="Authority"
                sortBy="asc"
                size={10000}
              />

              <SingleList
                componentId="Status"
                dataField="status.keyword"
                title="Status"
                sortBy="asc"
              />

              <SingleList
                componentId="Type"
                dataField="contract_type.keyword"
                title="Contract type"
                sortBy="asc"
              />

              <RangeSlider
                componentId="PriceSensor"
                dataField="resolution_0.priceWithVAT"
                title="Price"
                range={{
                  start: 0,
                  end: 1000000
                }}
                rangeLabels={{
                  start: '0',
                  end: '1000000'
                }}
                showHistogram={true}
                snap={false}
              />

            </Col>
            <Col md={8}>
              <DataSearch
                componentId="SearchSensor"
                dataField={["title", "offerers.name", "winner_0.name"]}
                autosuggest={false}
              />

              <SelectedFilters />

              <ReactiveList
                componentId="SearchResult"
                pagination={true}
                paginationAt="both"
                react={{
                  "and": [
                    "Authority",
                    "Status",
                    "Type",
                    "SearchSensor", "PriceSensor"]
                }}
                sortOptions={[
                  {
                    label: "Price (high to low)",
                    dataField: "resolution_0.priceWithVAT",
                    sortBy: "desc"
                  },
                  {
                    label: "Price (low to high)",
                    dataField: "resolution_0.priceWithVAT",
                    sortBy: "asc"
                  }
                ]}
                renderItem={(res) =>
                  <>
                    <Card className="mb-2">
                      <Card.Body>
                        <Card.Title>{res.title}</Card.Title>
                        <Card.Text>
                          ID: {res.id}<br />
                          Authority: {res.authority}<br />
                          Status: {res.status}<br />
                          Winner: {res.winner_0?.name}<br />
                          Price: {numberFormat(res.resolution_0?.priceWithVAT)}<br />
                          Offerers: {res.offerers.map((item) => item.name + ', ')} <br />
                          <Button variant="primary" onClick={() => handleShow(res)}>See more details</Button>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Modal show={!!modalContent} onHide={handleClose} fullscreen={true}>
                      {modalContent &&
                        <>
                          <Modal.Header closeButton>
                            <Modal.Title>{modalContent.title}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body><pre>{JSON.stringify(modalContent, null, 2)}</pre></Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </>
                      }
                    </Modal>
                  </>
                }
                renderResultStats={
                  function (stats) {
                    return (
                      `Showing ${stats.displayedResults} of total ${stats.numberOfResults} in ${stats.time} ms`
                    )
                  }
                }
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
export default App;
