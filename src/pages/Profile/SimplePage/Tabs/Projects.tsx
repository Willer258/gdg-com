import { Link } from "react-router-dom";
import { Card, CardBody, Row, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { projects } from "../../../../common/data";


function Projects() {
  return (
    <Card>
    <CardBody>
        <Row>
            {(projects || []).map((item:any, key: number) => (
                <Col xxl={3} sm={6} key={key}>
                    <Card className={`profile-project-card shadow-none profile-project-${item.cardBorderColor}`}>
                        <CardBody className="p-4">
                            <div className="d-flex">
                                <div className="flex-grow-1 text-muted overflow-hidden">
                                    <h5 className="fs-14 text-truncate"><Link to="#"
                                        className="text-dark">{item.title}</Link>
                                    </h5>
                                    <p className="text-muted text-truncate mb-0">Last
                                        Update : <span
                                            className="fw-semibold text-dark">{item.updatedTime}</span></p>
                                </div>
                                <div className="flex-shrink-0 ms-2">
                                    <div className={`badge badge-soft-${item.badgeClass} fs-10`}>
                                        {item.badgeText}</div>
                                </div>
                            </div>

                            <div className="d-flex mt-4">
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center gap-2">
                                        <div>
                                            <h5 className="fs-12 text-muted mb-0">
                                                Members :</h5>
                                        </div>
                                        <div className="avatar-group">
                                            {(item.member || []).map((subitem: { img: string | undefined; }, key: React.Key | null | undefined) => (
                                                <div className="avatar-group-item" key={key}>
                                                    <div className="avatar-xs">
                                                        <img src={subitem.img} alt="" className="rounded-circle img-fluid" />
                                                    </div>
                                                </div>
                                            ))}

                                            {(item.memberName || []).map((element: { memberText: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, key: React.Key | null | undefined) => (
                                                <div className="avatar-group-item" key={key}>
                                                    <div className="avatar-xs">
                                                        <div
                                                            className="avatar-title rounded-circle bg-light text-primary">
                                                            {element.memberText}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            ))}
            <Col lg={12}>
                <Pagination listClassName="justify-content-center" className="pagination-separated mb-0">
                    <PaginationItem disabled> <PaginationLink to="#"> <i className="mdi mdi-chevron-left" /> </PaginationLink> </PaginationItem>
                    <PaginationItem active> <PaginationLink to="#"> 1 </PaginationLink> </PaginationItem>
                    <PaginationItem> <PaginationLink to="#"> 2 </PaginationLink> </PaginationItem>
                    <PaginationItem> <PaginationLink to="#"> 3 </PaginationLink> </PaginationItem>
                    <PaginationItem> <PaginationLink to="#"> 4 </PaginationLink> </PaginationItem>
                    <PaginationItem> <PaginationLink to="#"> 5 </PaginationLink> </PaginationItem>
                    <PaginationItem> <PaginationLink to="#"> <i className="mdi mdi-chevron-right" /> </PaginationLink> </PaginationItem>
                </Pagination>
            </Col>
        </Row>
    </CardBody>
</Card>
  )
}

export default Projects