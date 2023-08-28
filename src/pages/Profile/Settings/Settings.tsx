import React, { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

//import images
import progileBg from "../../../assets/images/profile-bg.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import ContributionsComponent from "./subComponent/ContributionsComponent";
import {
  useEditMemberMutation,
  useGetOneMemberQuery,
} from "../../../redux/features/services/memberServices";
import { useFormik } from "formik";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab: React.SetStateAction<string>) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { state } = useLocation();

  const {   data = [] } = useGetOneMemberQuery(state.id);

  const [
    editMember,
    {
      // isLoading: isLoadingEdit,
      // isError: isErrorEdit,
      error: errorEdit,
      // isSuccess: isSuccessEdit,
    },
  ]: any = useEditMemberMutation();

  const navigate = useNavigate();

  document.title =
    "Profile Settings | Velzon - React Admin & Dashboard Template";

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: (data && data.first_name) || "",
      last_name: (data && data.last_name) || "",
      email: (data && data.email) || "",
      about: (data && data.about) || "",
      commune: (data && data.commune) || "",
      phone_number: (data && data.phone_number) || "",
      job: (data && data.job) || "",
      website: (data && data.website) || "",
      github: (data && data.github) || "",
      blog: (data && data.blog) || "",
      beahance: (data && data.beahance) || "",
      dribble: (data && data.dribble) || "",
      linkedin: (data && data.linkedin) || "",
      twitter: (data && data.twitter) || "",
    },

    onSubmit: async (values: any) => {
      console.log(values, "lomia");
      const DataValidate = { ...values };

      console.log(DataValidate, "okokokokokijijij");

      try {
        await editMember({
          id: state.id,
          first_name:
            DataValidate.first_name !== data.first_name
              ? DataValidate.first_name
              : undefined,
          last_name:
            DataValidate.last_name !== data.last_name
              ? DataValidate.last_name
              : undefined,
          email:
            DataValidate.email !== data.email ? DataValidate.email : undefined,
          about:
            DataValidate.about !== data.about ? DataValidate.about : undefined,

          commune:
            DataValidate.commune !== data.commune
              ? DataValidate.commune
              : undefined,
          phone_number:
            DataValidate.phone_number !== data.phone_number
              ? DataValidate.phone_number
              : undefined,
          job: DataValidate.job !== data.job ? DataValidate.job : undefined,

          website:
            DataValidate.website !== data.website
              ? DataValidate.website
              : undefined,

          github:
            DataValidate.github !== data.github
              ? DataValidate.github
              : undefined,


              blog:
              DataValidate.blog !== data.blog
                ? DataValidate.blog
                : undefined,

                dribble:
                DataValidate.dribble !== data.dribble
                  ? DataValidate.dribble
                  : undefined,


                  linkedin:
                  DataValidate.linkedin !== data.linkedin
                    ? DataValidate.linkedin
                    : undefined,


                    twitter:
                    DataValidate.twitter !== data.twitter
                      ? DataValidate.twitter
                      : undefined,
        }).unwrap();
        navigate(-1);
      } catch (err) {
        console.log(errorEdit);
      }

      validation.resetForm();
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              <img src={progileBg} className="profile-wid-img" alt="" />
              <div className="overlay-content"></div>
            </div>
          </div>
          <Form
            onSubmit={(e) => {
              validation.handleSubmit();
              e.preventDefault();

              return false;
            }}
          >
            <Row>
              <Col xxl={3}>
                <Card className="mt-n5">
                  <CardBody className="p-4">
                    <div className="text-center">
                      <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                        <img
                          src={avatar1}
                          className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                          alt="user-profile"
                        />
                        <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                          <Input
                            id="profile-img-file-input"
                            type="file"
                            className="profile-img-file-input"
                          />
                          <Label
                            htmlFor="profile-img-file-input"
                            className="profile-photo-edit avatar-xs"
                          >
                            <span className="avatar-title rounded-circle bg-light text-body">
                              <i className="ri-camera-fill"></i>
                            </span>
                          </Label>
                        </div>
                      </div>
                      <h5 className="fs-16 mb-1">
                        {data.first_name} {data.last_name}
                      </h5>
                      <p className="text-muted mb-0">{data.job}</p>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-0">Portfolio</h5>
                      </div>
                    </div>
                    <div className="mb-3 d-flex">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                        <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                          <i className="ri-github-fill"></i>
                        </span>
                      </div>
                      <Input
                        type="url"
                        className="form-control"
                        id="github"
                        placeholder="Nom d'utilisateur github"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.github || ""}
                        defaultValue={data.github}
                      />
                    </div>

                    <div className="mb-3 d-flex">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                        <span className="avatar-title rounded-circle fs-16 bg-success">
                          <i className="ri-dribbble-fill"></i>
                        </span>
                      </div>
                      <Input
                        type="url"
                        className="form-control"
                        id="dribbble"
                        placeholder="Nom d'utilisateur dribble"
                        defaultValue={data.dribble}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.dribbble || ""}
                      />
                    </div>
                    <div className="d-flex mb-3">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                        <span className="avatar-title rounded-circle fs-16 ">
                          <i className="ri-linkedin-fill"></i>
                        </span>
                      </div>
                      <Input
                        type="url"
                        className="form-control"
                        id="linkedin"
                        placeholder="Nom d'utilisateur linkedin"
                        defaultValue={data.linkedin}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.linkedin || ""}
                      />
                    </div>
                    <div className="d-flex mb-3">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                        <span className="avatar-title rounded-circle fs-16 bg-info">
                          <i className="ri-twitter-fill"></i>
                        </span>
                      </div>
                      <Input
                        type="url"
                        className="form-control"
                        id="twitter"
                        placeholder="Nom d'utilisateur twitter"
                        defaultValue={data.twitter}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.twitter || ""}
                      />
                    </div>
                    <div className="mb-3 d-flex">
                      <div className="avatar-xs d-block flex-shrink-0 me-3">
                        <span className="avatar-title rounded-circle fs-16  text-light">
                          <i className="ri-book-fill"></i>
                        </span>
                      </div>
                      <Input
                      type="url"
                        className="form-control"
                        id="blog"
                        placeholder="Url du blog"
                        defaultValue={data.blog}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.blog || ""}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xxl={9}>
                <Card className="mt-xxl-n5">
                  <CardHeader>
                    <Nav
                      className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "1" })}
                          onClick={() => {
                            tabChange("1");
                          }}
                        >
                          <i className="fas fa-home"></i>
                          Infomations personnelle
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          to="#"
                          className={classnames({ active: activeTab === "3" })}
                          onClick={() => {
                            tabChange("3");
                          }}
                          type="button"
                        >
                          <i className="far fa-envelope"></i>
                          Contributions
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>
                  <CardBody className="p-4">
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label htmlFor="last_name" className="form-label">
                                Nom
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="last_name"
                                placeholder="Enter le nom "
                                defaultValue={data.last_name}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.last_name || ""}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="first_name"
                                className="form-label"
                              >
                                Prénom
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="first_name"
                                placeholder="Enter le ou les prenoms"
                                defaultValue={data.first_name}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.first_name || ""}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="phone_number"
                                className="form-label"
                              >
                                Numero de telephone
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="phone_number"
                                placeholder="Enter le numero de telephone"
                                defaultValue={data.phone_number}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone_number || ""}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label htmlFor="email" className="form-label">
                                Email
                              </Label>
                              <Input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                defaultValue={data.email}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                              />
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label htmlFor="job" className="form-label">
                                Profession
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="job"
                                placeholder="Proffession"
                                defaultValue={data.job}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.job || ""}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="websiteInput1"
                                className="form-label"
                              >
                                Site web
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="website"
                                placeholder="www.mywebsite.com"
                                defaultValue={data.website}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.website || ""}
                              />
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div className="mb-3">
                              <Label htmlFor="commune" className="form-label">
                                Commune
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="commune"
                                placeholder="commune"
                                defaultValue={data.commune}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.commune || ""}
                              />
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="mb-3 pb-2">
                              <Label htmlFor="about" className="form-label">
                                A propos
                              </Label>
                              <textarea
                                className="form-control"
                                id="about"
                                rows={3}
                                defaultValue={data.about}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.about || ""}
                              ></textarea>
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div className="hstack gap-2 justify-content-end">
                              <button type="submit" className="btn btn-primary">
                                Mettre a jour
                              </button>
                              <button
                                onClick={() => navigate(-1)}
                                type="button"
                                className="btn btn-soft-success"
                              >
                                Annuler
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>

                      <TabPane tabId="3">
                        <ContributionsComponent />
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;
