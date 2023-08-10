import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, Progress, Table,  } from 'reactstrap';
// import { SwiperSlide , Swiper } from 'swiper/react';
// import classnames from 'classnames';

// import avatar2 from '../../../../assets/images/users/avatar-2.jpg';
// import avatar3 from '../../../../assets/images/users/avatar-3.jpg';
// import avatar4 from '../../../../assets/images/users/avatar-4.jpg';
// import avatar6 from '../../../../assets/images/users/avatar-6.jpg';
// import avatar7 from '../../../../assets/images/users/avatar-7.jpg';


// import smallImage3 from '../../../../assets/images/small/img-3.jpg';
// import smallImage4 from '../../../../assets/images/small/img-4.jpg';
// import smallImage5 from '../../../../assets/images/small/img-5.jpg';
// import smallImage6 from '../../../../assets/images/small/img-6.jpg';
// import smallImage7 from '../../../../assets/images/small/img-7.jpg';
// import smallImage9 from '../../../../assets/images/small/img-9.jpg';
// import avatar5 from '../../../../assets/images/users/avatar-5.jpg';
// import { useState } from 'react';

function Overview() {

 
    // const [activityTab, setActivityTab] = useState('1');

    // const toggleActivityTab = (tab: React.SetStateAction<string>) => {
    //     if (activityTab !== tab) {
    //         setActivityTab(tab);
    //     }
    // };
  return (
    <Row>
                                            <Col xxl={3}>
                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title mb-5">Complete Your Profile</h5>
                                                        <Progress value={30} color="danger" className="animated-progess custom-progress progress-label" ><div className="label">30%</div> </Progress>
                                                    </CardBody>
                                                </Card>

                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title mb-3">Info</h5>
                                                        <div className="table-responsive">
                                                            <Table className="table-borderless mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Nom & Prénoms:</th>
                                                                        <td className="text-muted">Anna Adame</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Telephone :</th>
                                                                        <td className="text-muted">+(1) 987 6543</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">E-mail :</th>
                                                                        <td className="text-muted">daveadame@velzon.com</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Commune :</th>
                                                                        <td className="text-muted">California, United States
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Date de </th>
                                                                        <td className="text-muted">24 Nov 2021</td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </CardBody>
                                                </Card>

                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title mb-4">Portfolio</h5>
                                                        <div className="d-flex justify-content-around  flex-wrap gap-2">
                                                        <div>
                                                                <Link to="#" className="avatar-xs d-block">
                                                                    <span
                                                                        className="avatar-title rounded-circle fs-16 bg-primary">
                                                                        <i className="ri-global-fill"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div>
                                                                <Link to="#" className="avatar-xs d-block">
                                                                    <span
                                                                        className="avatar-title rounded-circle fs-16 bg-dark text-light">
                                                                        <i className="ri-github-fill"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            
                                                            <div>
                                                                <Link to="#" className="avatar-xs d-block">
                                                                    <span
                                                                        className="avatar-title rounded-circle fs-16 bg-success">
                                                                        <i className="ri-dribbble-fill"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div>
                                                                <Link to="#" className="avatar-xs d-block">
                                                                    <span
                                                                        className="avatar-title rounded-circle fs-16 bg-danger">
                                                                        <i className="ri-pinterest-fill"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>

                                              

                                              


                                            
                                            </Col>
                                            <Col xxl={9}>
                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title mb-3">About</h5>
                                                        <p>Hi I'm Anna Adame, It will be as simple as Occidental; in
                                                            fact, it will be Occidental. To an English person, it will
                                                            seem like simplified English, as a skeptical Cambridge
                                                            friend of mine told me what Occidental is European languages
                                                            are members of the same family.</p>
                                                        <p>You always want to make sure that your fonts work well
                                                            together and try to limit the number of fonts you use to
                                                            three or less. Experiment and play around with the fonts
                                                            that you already have in the software you’re working with
                                                            reputable font websites. This may be the most commonly
                                                            encountered tip I received from the designers I spoke with.
                                                            They highly encourage that you use different fonts in one
                                                            design, but do not over-exaggerate and go overboard.</p>
                                                        <Row>
                                                            <Col xs={6} md={4}>
                                                                <div className="d-flex mt-4">
                                                                    <div
                                                                        className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                        <div
                                                                            className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                            <i className="ri-user-2-fill"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1 overflow-hidden">
                                                                        <p className="mb-1">Designation :</p>
                                                                        <h6 className="text-truncate mb-0">Lead Designer /
                                                                            Developer</h6>
                                                                    </div>
                                                                </div>
                                                            </Col>

                                                            <Col xs={6} md={4}>
                                                                <div className="d-flex mt-4">
                                                                    <div
                                                                        className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                                        <div
                                                                            className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                                            <i className="ri-global-line"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow-1 overflow-hidden">
                                                                        <p className="mb-1">Website :</p>
                                                                        <Link to="#" className="fw-semibold">www.velzon.com</Link>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>

                                             
                                            </Col>
                                        </Row>
  )
}

export default Overview