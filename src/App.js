import React, { Component } from 'react';
import { ReactiveBase, DataSearch, SingleList, ReactiveList, SingleRange, RangeSlider } from "@appbaseio/reactivesearch";
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
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
              componentId="RangeSliderSensor"
              dataField="res.resolution_0.priceWithVAT"
              title="Price"
              showHistogram={true}
              showFilter={true}
            />

          </Col>
          <Col md={8}>
            <DataSearch
            componentId="SearchSensor"
            dataField={["title"]}
            />

            <ReactiveList
              componentId="SearchResult"
              pagination={true}
              paginationAt="both"
              react={{
                  "and": [
                    "Authority",
                    "Status",
                    "Type",
                    "SearchSensor"]
                }}
              renderItem={(res) =>
              <Card>
                <Card.Body>
                    <Card.Title>{ res.title }</Card.Title>
                    <Card.Text>
                      Authority: {res.authority}<br/>
                      Status: { res.status }<br />
                      Budget: {res.budget.keyword}<br />
                      Winner: {res.winner_0?.name}<br />
                      Price: {res.resolution_0?.priceWithVAT}
                  </Card.Text>
                  <Button variant="primary">See more details</Button>
                </Card.Body>
              </Card>
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
