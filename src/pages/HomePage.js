import React from "react"
import { ReactiveBase, DataSearch, SingleList, ReactiveList, RangeSlider, ToggleButton, MultiRange, SelectedFilters } from "@appbaseio/reactivesearch";
import { Row, Col, Container, Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from '../components';
import '../style.css';
import { REACT_APP_ELASTIC_SCHEME,
    REACT_APP_ELASTIC_HOST,
    REACT_APP_ELASTIC_PORT } from '../constants.js';

function HomePage({ children }) {
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
                            />

                            <SingleList
                                componentId="Status"
                                dataField="status.name.keyword"
                                title="Status"
                                sortBy="asc"
                            />

                            <SingleList
                                componentId="Type"
                                dataField="contract_type.name.keyword"
                                title="Contract type"
                                sortBy="asc"
                            />

                            <ToggleButton
                                componentId="MinorContact"
                  dataField="minor_contract"
                  title="Minor contact"
                                data={[
                                    { label: 'Yes', value: true },
                                    { label: 'No', value: false },
                                    { label: 'Unknown', value: null },
                                ]}
                            />



                                            <MultiRange
                                componentId="PriceSensor"
                  dataField="resolution_0.priceWithVAT"
                  title="Price"
                                data={[
                                    { start: 0, end: 10000.0, label: '<10000' },
                                    { start: 10001, end: 50000, label: '10001 < x < 50000' },
                                    { start: 50001, end: 200000, label: '50001 < x < 200000' },
                                    { start: 200001, end: 999999999999, label: '200001 < x' },
                                ]}
                                title="Prices"
                            />

                            <MultiRange
                                componentId="BudgetSensor"
                                dataField="budget"
                                data={[
                                    { start: 0, end: 10000.0, label: '<10000' },
                                    { start: 10001, end: 50000, label: '10001 < x < 50000' },
                                    { start: 50001, end: 200000, label: '50001 < x < 200000' },
                                    { start: 200001, end: 999999999999, label: '200001 < x' },
                                ]}
                                title="Budget"
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
      "MinorContract"]
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
                                          Authority: {res.authority?.name} ({res.authority?.cif})<br />
                                          Budget: {numberFormat(res.budget)}<br />
                                          Status: {res.status?.code} ({res.status?.name})<br />
                                          Minor Contract: {res.minor_contract}<br />
                                                    Winner: {res.winner_0?.name}<br />
                                                    Price: {numberFormat(res.resolution_0?.priceWithVAT)}<br />
                                                    Offerers: {res.offerers.map(item => item.name + ', ')} <br />
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

export default HomePage;
