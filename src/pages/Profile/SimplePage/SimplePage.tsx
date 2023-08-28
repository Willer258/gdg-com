import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Container, Nav, NavItem, NavLink, Row, TabContent,  TabPane,  } from 'reactstrap';
import classnames from 'classnames';


//Images
import profileBg from '../../../assets/images/profile-bg.jpg';
import avatar1 from '../../../assets/images/users/avatar-1.jpg';


import Overview from './Tabs/Overview';
import Activity from './Tabs/Activity';
import Projects from './Tabs/Projects';
import { useGetOneMemberQuery } from '../../../redux/features/services/memberServices';

const SimplePage = () => {

    
  const { state } = useLocation();

  const { isError, isLoading, data } = useGetOneMemberQuery(state.id);

    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = (tab: React.SetStateAction<string>) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

  

    document.title = "Details des membres | Velzon - React Admin & Dashboard Template";

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
            <div className="text-center  mb-3">
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
            <div className="page-content">
                <Container fluid>
                    <div className="profile-foreground position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg">
                            <img src={profileBg} alt="" className="profile-wid-img" />
                        </div>
                    </div>
                    <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
                        <Row className="g-4">
                            <div className="col-auto">
                                <div className="avatar-lg">
                                    <img src={avatar1} alt="user-img"
                                        className="img-thumbnail rounded-circle" />
                                </div>
                            </div>

                            <Col>
                                <div className="p-2">
                                    <h3 className="text-white mb-1"> {data.last_name} {data.first_name}</h3>
                                    <p className="text-white-75">{data.job}</p>
                                    <div className="hstack text-white-50 gap-1">
                                        <div className="me-2"><i
                                            className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle"></i>{data.commune}</div>
                                        {/* <div><i
                                            className="ri-building-line me-1 text-white-75 fs-16 align-middle"></i>Themesbrand
                                        </div> */}
                                    </div>
                                </div>
                            </Col>

                            <Col xs={12} className="col-lg-auto order-last order-lg-0">
                                <Row className="text text-white-50 text-center">
                                    <Col lg={6} xs={4}>
                                        <div className="p-2 d-flex flex-column align-items-center">
                                            <h4 className="text-white mb-1">0</h4>
                                            <p className="fs-14 mb-0">Contributions</p>
                                        </div>
                                    </Col>
                                    {/* <Col lg={6} xs={4}>
                                        <div className="p-2">
                                            <h4 className="text-white mb-1">1.3K</h4>
                                            <p className="fs-14 mb-0">Following</p>
                                        </div>
                                    </Col> */}
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <div>
                                <div className="d-flex">
                                    <Nav pills className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                                        role="tablist">
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({ active: activeTab === '1' })}
                                                onClick={() => { toggleTab('1'); }}
                                            >
                                                <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Information personnelle</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({ active: activeTab === '2' })}
                                                onClick={() => { toggleTab('2'); }}
                                            >
                                                <i className="ri-list-unordered d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Contributions</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({ active: activeTab === '3' })}
                                                onClick={() => { toggleTab('3'); }}
                                            >
                                                <i className="ri-price-tag-line d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Projects</span>
                                            </NavLink>
                                        </NavItem>
                                      
                                    </Nav>
                                    <div className="flex-shrink-0">
                                        <Link to="/edit-membre"   state={{ id: data.id }} className="btn btn-success"><i
                                            className="ri-edit-box-line align-bottom"></i> Modifier les informations</Link>
                                    </div>
                                </div>

                                <TabContent activeTab={activeTab} className="pt-4">
                                    <TabPane tabId="1">
                                       <Overview data={data}/>
                                    </TabPane>
                                    <TabPane tabId="2">
                                     <Activity/>
                                    </TabPane>

                                    <TabPane tabId="3">
                                     <Projects/>
                                    </TabPane>

                                   
                                </TabContent>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default SimplePage;