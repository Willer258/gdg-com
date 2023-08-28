import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

//import images
import slack from "../../../assets/images/brands/slack.png";
import OverviewTab from "./OverviewTab";
import DocumentsTab from "./DocumentsTab";
import ActivitiesTab from "./ActivitiesTab";
import TeamTab from "./TeamTab";
import { useGetOneEventQuery } from "../../../redux/features/services/eventsServices";
import { Link, useLocation } from "react-router-dom";

const Section = () => {
  //Tab
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab: React.SetStateAction<string>) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const { state } = useLocation();

  const { isError, isLoading, data } = useGetOneEventQuery(state.id);

  if (isError) {
    return (
      <div
        className="py-4 mt-4 text-center"
        id="noresult"
        style={{ display: "none" }}
      >
        {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#405189,secondary:#0ab39c" style={{ width: "72px", height: "72px" }}></lord-icon> */}
        <h5 className="mt-4">Une erreur est survenue</h5>
      </div>
    );
  }
  if (isLoading) {
    return (
      <Col lg={12}>
        <div className="text-center mb-3">
          <p className="text-success">
            <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>{" "}
            Loading
          </p>
        </div>
      </Col>
    );
  }
  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card className="mt-n4 mx-n4">
            <div className="bg-soft-warning">
              <CardBody className="pb-0 px-4">
                <Row className="mb-3">
                  <div className="col-md">
                    <Row className="align-items-center g-3">
                      <div className="col-md-auto">
                        <div className="avatar-md">
                          <div className="avatar-title bg-white rounded-circle">
                            <img src={slack} alt="" className="avatar-xs" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md">
                        <div>
                          <h4 className="fw-bold">{data.name}</h4>
                          <div className="hstack gap-3 flex-wrap">
                            <div>
                              <i className="ri-building-line align-bottom me-1"></i>{" "}
                              {data.lieu}
                            </div>
                            <div className="vr"></div>
                            <div>
                              Date de l'evenement :{" "}
                              <span className="fw-medium">{data.date}</span>
                            </div>
                            <div className="vr"></div>
                            <div>
                              Participants :{" "}
                              <span className="fw-medium">
                                {data.participants.length}
                              </span>
                            </div>
                            <div className="vr"></div>

                            {data.is_active ? (
                              <div className="badge rounded-pill bg-info fs-12">
                                En cours{" "}
                              </div>
                            ) : (
                              <div className="badge rounded-pill bg-success fs-12">
                                Terminé
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Row>
                  </div>
                  <div className="col-md-auto">
                    <div className="hstack gap-1 flex-wrap">
                    <Link to={"/edit-event"} state={{ id: data.id }}>
                    <button type="submit" className="btn btn-success w-sm">
                        Modifier l'evenement
                      </button>
                          </Link>
                     
                    </div>
                  </div>
                </Row>

                <Nav className="nav-tabs-custom border-bottom-0" role="tablist">
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "1" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("1");
                      }}
                      href="#"
                    >
                      Details
                    </NavLink>
                  </NavItem>
                 
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "4" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("4");
                      }}
                      href="#"
                    >
                      Participants
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardBody>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <TabContent activeTab={activeTab} className="text-muted">
            <TabPane tabId="1">
              <OverviewTab data ={data} />
            </TabPane>
           
            <TabPane tabId="4">
              <TeamTab data={data} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section;
