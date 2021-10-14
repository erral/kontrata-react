import React, { Component } from 'react';
import { ReactiveBase, DataSearch, SingleList, ReactiveList, RangeSlider, MultiRange, SelectedFilters } from "@appbaseio/reactivesearch";
import { Row, Col, Container, Card, Button, Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ReactiveBase
      url="http://localhost:9200"
      app="contracts"
    >
      <Container>
        <Row>
          <Col md={4}>
            <SingleList
              componentId="Authority"
              dataField="authority.keyword"
                title="Authority"
                sortBy="asc"
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
                  end: 20000
                }}
                rangeLabels={{
                  start: '0',
                  end: '20000'
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
              renderItem={(res) =>
                <>
              <Card>
                <Card.Body>
                  <Card.Title>{ res.title }</Card.Title>
                  <Card.Text>
                      Authority: {res.authority}<br/>
                      Status: { res.status }<br />
                      Winner: {res.winner_0?.name}<br />
                      Price: {res.resolution_0?.priceWithVAT}<br/>
                    <Button variant="primary">See more details</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Modal show={show} onHide={handleClose} fullscreen={true}>
              <Modal.Header closeButton>
                <Modal.Title>{res.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body><pre>{JSON.stringify(res, null, 2)}</pre></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
                </>
              }
              renderResultStats={
                  function(stats){
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
  );
}
export default App;
