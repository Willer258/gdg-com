import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Progress, Table } from "reactstrap";
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

function Overview({ data }: any) {
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
            <h5 className="card-title mb-3">Info</h5>
            <div className="table-responsive">
              <Table className="table-borderless mb-0">
                <tbody>
                  <tr>
                    <th className="ps-0" scope="row">
                      Nom & Prénoms:
                    </th>
                    <td className="text-muted">
                      {data.last_name} {data.first_name}
                    </td>
                  </tr>
                  <tr>
                    <th className="ps-0" scope="row">
                      Telephone :
                    </th>
                    <td className="text-muted">{data.phone_number}</td>
                  </tr>
                  <tr>
                    <th className="ps-0" scope="row">
                      E-mail :
                    </th>
                    <td className="text-muted">{data.email} </td>
                  </tr>
                  <tr>
                    <th className="ps-0" scope="row">
                      Commune :
                    </th>
                    <td className="text-muted">{data.commune}</td>
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
              {data.website && (
                <div>
                  <a
                    href={data.website}
                    target="_blank"
                    className="avatar-xs d-block"
                  >
                    <span className="avatar-title rounded-circle fs-16 bg-primary">
                      <i className="ri-global-fill"></i>
                    </span>
                  </a>
                </div>
              )}

              {data.github && (
                <div>
                  <a
                    href={data.github}
                    target="_blank"
                    className="avatar-xs d-block"
                  >
                    <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                      <i className="ri-github-fill"></i>
                    </span>
                  </a>
                </div>
              )}

              {data.dribble && (
                <div>
                  <a
                    href={data.dribble}
                    target="_blank"
                    className="avatar-xs d-block"
                  >
                    <span className="avatar-title rounded-circle fs-16 bg-success">
                      <i className="ri-dribbble-fill"></i>
                    </span>
                  </a>
                </div>
              )}

              {data.linkedin && (
                <div>
                  <a
                    href={data.linkedin}
                    target="_blank"
                    className="avatar-xs d-block"
                  >
                    <span className="avatar-title rounded-circle fs-16 ">
                      <i className="ri-linkedin-fill"></i>
                    </span>
                  </a>
                </div>
              )}

              {data.twitter && (
                <div>
                  <a
                    href={data.twitter}
                    target="_blank"
                    className="avatar-xs d-block"
                  >
                    <span className="avatar-title rounded-circle fs-16 bg-info">
                      <i className="ri-twitter-fill"></i>
                    </span>
                  </a>
                </div>
              )}

              {data.blog && (
                <div>
                  <a
                    href={data.blog}
                    target="_blank"
                    className="avatar-xs d-block"
                  >
                    <span className="avatar-title rounded-circle fs-16 ">
                      <i className="ri-book-fill"></i>
                    </span>
                  </a>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xxl={9}>
        <Card>
          <CardBody>
            <h5 className="card-title mb-3">About</h5>
            <p>
             {data.about}
            </p>
           
            <Row>
              <Col xs={6} md={4}>
                <div className="d-flex mt-4">
                  <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                    <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                      <i className="ri-user-2-fill"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="mb-1">Designation :</p>
                    <h6 className="text-truncate mb-0">
                     {data.job}
                    </h6>
                  </div>
                </div>
              </Col>

              <Col xs={6} md={4}>
                <div className="d-flex mt-4">
                  <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                    <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                      <i className="ri-global-line"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="mb-1">Website :</p>
                    <Link to="#" className="fw-semibold">
                    {data.website}
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Overview;
