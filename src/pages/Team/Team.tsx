import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  Offcanvas,
  OffcanvasBody,
  Row,
  UncontrolledDropdown,
  FormFeedback,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DeleteModal from "../../Components/Common/DeleteModal";
import { ToastContainer } from "react-toastify";

//User Images
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import userdummyimg from "../../assets/images/users/user-dummy-img.jpg";

//Small Images
import smallImage9 from "../../assets/images/small/img-9.jpg";
//redux
import { useSelector, useDispatch } from "react-redux";

//import action
import {
  getTeamData as onGetTeamData,
  addTeamData as onAddTeamData,
  updateTeamData as onUpdateTeamData,
} from "../../redux/thunks";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useAddMemberMutation,
  useDeleteMemberMutation,
  useEditMemberMutation,
  useGetMembersQuery,
} from "../../redux/features/services/memberServices";

const Team = () => {
  document.title = "Team | Velzon - React Admin & Dashboard Template";

  const dispatch = useDispatch();

  const { data = [], isLoading, isError,
    //  errorcl
     } = useGetMembersQuery(1);

  const [
    addMember,
    {
      // isLoading: isLoadingAdd,
      // isError: isErrorAdd,
      error: errorAdd,
      // isSuccess: isSuccessAdd,
    },
  ]: any = useAddMemberMutation();
  const [
    editMember,
    {
      // isLoading: isLoadingEdit,
      // isError: isErrorEdit,
      error: errorEdit,
      // isSuccess: isSuccessEdit,
    },
  ]: any = useEditMemberMutation();
  const [
    deleteMember,
    {
      // isLoading: isLoadingDelete,
      // isError: isErrorDelete,
      error: errorDelete,
      // isSuccess: isSuccessDelete,
    },
  ]: any = useDeleteMemberMutation();

  const { teamData } = useSelector((state: any) => ({
    teamData: state.Team.teamData,
  }));

  const [team, setTeam] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [teamList, setTeamlist] = useState([]);

  //Modal
  const [teamMem, setTeamMem]: any = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(onGetTeamData());
  }, [dispatch]);

  useEffect(() => {
    setTeam(data.results);
    setTeamlist(data.results);
  }, [data.results]);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTeamMem(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  // Update To do
  const handleTeamClick = useCallback(
    (arg: any) => {
      console.log("first");
      const teamMem = arg;
      setTeamMem({
        id: teamMem.id,
        first_name: teamMem.first_name,
        last_name: teamMem.last_name,
        email: teamMem.email,
        commune: teamMem.commune,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Add To do
  const handleTeamClicks = () => {
    setTeamMem("");
    setModal(!modal);
    setIsEdit(false);
    toggle();
  };

  // delete
  const onClickData = (team: any) => {
    setTeam(team);
    setDeleteModal(true);
  };

  const handleDeleteTeamData = async () => {
    if (team) {
      try {
        await deleteMember({ id: team }).unwrap();
        window.history.back();
      } catch (err) {
        console.error(errorDelete, err);
      }
      deleteMember;
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    const list = document.querySelectorAll(".team-list");
    const buttonGroups: any = document.querySelectorAll(".filter-button");
    for (let i = 0; i < buttonGroups.length; i++) {
      buttonGroups[i].addEventListener("click", onButtonGroupClick);
    }

    function onButtonGroupClick(event: {
      target: { id: string; parentElement: { id: string } };
    }) {
      const listViewButton: any = document.getElementById("list-view-button");
      const gridViewButton: any = document.getElementById("grid-view-button");

      if (
        event.target.id === "list-view-button" ||
        event.target.parentElement.id === "list-view-button"
      ) {
        listViewButton.classList.add("active");
        gridViewButton.classList.remove("active");
        list.forEach(function (el) {
          el.classList.add("list-view-filter");
          el.classList.remove("grid-view-filter");
        });
      } else {
        gridViewButton.classList.add("active");
        listViewButton.classList.remove("active");
        list.forEach(function (el) {
          el.classList.remove("list-view-filter");
          el.classList.add("grid-view-filter");
        });
      }
    }
  }, []);

  const favouriteBtn = (ele: any) => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active");
    } else {
      ele.closest("button").classList.add("active");
    }
  };

  const searchList = (e: string) => {
    const inputVal = e.toLowerCase();

    const filterItems = (arr: any[], query: string) => {
      return arr.filter((el: { name: string }) => {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    };

    const filterData: any = filterItems(teamData, inputVal);
    const noresultId: any = document.getElementById("noresult");
    const teamList: any = document.getElementById("teamlist");
    setTeamlist(filterData);
    if (filterData.length === 0) {
      noresultId.style.display = "block";
      teamList.style.display = "none";
    } else {
      noresultId.style.display = "none";
      teamList.style.display = "block";
    }
  };

  //OffCanvas
  const [isOpen, setIsOpen] = useState(false);
  const [sideBar, setSideBar]: any = useState([]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      last_name: (teamMem && teamMem.last_name) || "",
      first_name: (teamMem && teamMem.first_name) || "",
      email: (teamMem && teamMem.email) || "",
      commune: (teamMem && teamMem.commune) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter team Name"),
      designation: Yup.string().required("Please Enter Your designation"),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        const updateTeamData = {
          id: teamMem ? teamMem.id : 0,
          name: values.name,
          designation: values.designation,
          projectCount: values.projectCount,
          taskCount: values.taskCount,
        };
        // save edit Team data
        dispatch(onUpdateTeamData(updateTeamData));
        validation.resetForm();
      } else {
        const newTeamData = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          name: values.name,
          designation: values.designation,
          projectCount: 0,
          taskCount: 0,
          backgroundImg: smallImage9,
        };
        // save new TeamData
        dispatch(onAddTeamData(newTeamData));
        validation.resetForm();
      }
      toggle();
    },
  });

  const Validate = async (formData: any) => {
    try {
      await addMember({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        commune: formData.commune,
      }).unwrap();
    } catch (err) {
      console.log(errorAdd);
    }
  };

  const EditMember = async (formData: any) => {
    try {
      await editMember({
        id: teamMem ? teamMem.id : 0,
        first_name:
          formData.first_name !== teamMem.first_name
            ? formData.first_name
            : undefined,
        last_name:
          formData.last_name !== teamMem.last_name
            ? formData.last_name
            : undefined,
        email: formData.email !== teamMem.email ? formData.email : undefined,
        commune:
          formData.commune !== teamMem.commune ? formData.commune : undefined,
      }).unwrap();
    } catch (err) {
      console.log(errorEdit);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteTeamData()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Membre" pageTitle="Membre" />
          <Card>
            <CardBody>
              <Row className="g-2">
                <Col sm={4}>
                  <div className="search-box">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Search for name or designation..."
                      onChange={(e) => searchList(e.target.value)}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
                <Col className="col-sm-auto ms-auto">
                  <div className="list-grid-nav hstack gap-1">
                    <Button
                      color="info"
                      id="grid-view-button"
                      className="btn btn-soft-info nav-link btn-icon fs-14 active filter-button"
                    >
                      <i className="ri-grid-fill"></i>
                    </Button>
                    <Button
                      color="info"
                      id="list-view-button"
                      className="btn btn-soft-info nav-link  btn-icon fs-14 filter-button"
                    >
                      <i className="ri-list-unordered"></i>
                    </Button>
                    <Button color="success" onClick={() => handleTeamClicks()}>
                      <i className="ri-add-fill me-1 align-bottom"></i>Ajouter
                      un membre
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Row>
            <Col lg={12}>
              <div id="teamlist">
                <Row className="team-list grid-view-filter">
                  {(teamList || []).map((item: any, key) => (
                    <Col key={key}>
                      <Card className="team-box">
                        <div className="team-cover">
                          <img
                            src={item?.backgroundImg}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <CardBody className="p-4">
                          <Row className="align-items-center team-row">
                            <Col className="team-settings">
                              <Row>
                                <Col>
                                  <div className="flex-shrink-0 me-2">
                                    <Button
                                      type="button"
                                      className="btn btn-light btn-icon rounded-circle btn-sm favourite-btn"
                                      onClick={(e) => favouriteBtn(e.target)}
                                    >
                                      <i className="ri-star-fill fs-14"></i>
                                    </Button>
                                  </div>
                                </Col>
                                <UncontrolledDropdown
                                  direction="start"
                                  className="col text-end"
                                >
                                  <DropdownToggle
                                    tag="a"
                                    id="dropdownMenuLink2"
                                    role="button"
                                  >
                                    <i className="ri-more-fill fs-17"></i>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      className="dropdown-item edit-list"
                                      href="#addmemberModal"
                                      onClick={() => handleTeamClick(item)}
                                    >
                                      <i className="ri-pencil-line me-2 align-bottom text-muted"></i>
                                      Modifier
                                    </DropdownItem>
                                    <DropdownItem
                                      className="dropdown-item remove-list"
                                      href="#removeMemberModal"
                                      onClick={() => onClickData(item.id)}
                                    >
                                      <i className="ri-delete-bin-5-line me-2 align-bottom text-muted"></i>
                                      Supprimer
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </Row>
                            </Col>
                            <Col lg={4} className="col">
                              <div className="team-profile-img">
                                <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                                  {item.userImage != null ? (
                                    <img
                                      src={item.userImage}
                                      alt=""
                                      className="img-fluid d-block rounded-circle"
                                    />
                                  ) : (
                                    <div className="avatar-title text-uppercase border rounded-circle bg-light text-primary">
                                      {item.first_name.charAt(0) +
                                        item.last_name
                                          .split(" ")
                                          .slice(-1)
                                          .toString()
                                          .charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div className="team-content">
                                  <Link
                                    to="#"
                                    onClick={() => {
                                      setIsOpen(!isOpen);
                                      setSideBar(item);
                                    }}
                                  >
                                    <h5 className="fs-16 mb-1">
                                      {item.first_name} {item.last_name}
                                    </h5>
                                  </Link>
                                  <p className="text-muted mb-0">
                                    {item.email}
                                  </p>
                                </div>
                              </div>
                            </Col>
                            <Col lg={4} className="col">
                              <Row className="text-muted text-center">
                                <Col
                                  xs={6}
                                  className="border-end border-end-dashed"
                                >
                                  <p className="text-muted mb-1">Commune</p>

                                  <h5 className="mb-0"> {item.commune}</h5>
                                </Col>
                                <Col xs={6}>
                                  <p className="text-muted mb-0">
                                    Contribution
                                  </p>
                                  <h5 className="mb-1">0</h5>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={2} className="col">
                              <div className="text-end">
                                <Link
                                  to={"/details-membre"}
                                  state={{ id: item.id }}
                                  className="btn btn-light view-btn"
                                >
                                  View Profile
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}

                  {isLoading && (
                    <Col lg={12}>
                      <div className="text-center mb-3">
                        <Link to="#" className="text-success">
                          <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>{" "}
                          Loading
                        </Link>
                      </div>
                    </Col>
                  )}
                </Row>

                <div
                  className="modal fade"
                  id="addmembers"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <Modal isOpen={modal} toggle={toggle} centered>
                      <ModalBody>
                        <Form
                          onSubmit={(e) => {
                            if (isEdit) {
                              EditMember(validation.values);
                            } else {
                              Validate(validation.values);
                            }

                            validation.handleSubmit();
                            e.preventDefault();

                            return false;
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <input
                                type="hidden"
                                id="memberid-input"
                                className="form-control"
                                defaultValue=""
                              />
                              <div className="px-1 pt-1">
                                <div className="modal-team-cover position-relative mb-0 mt-n4 mx-n4 rounded-top overflow-hidden">
                                  <img
                                    src={smallImage9}
                                    alt=""
                                    id="cover-img"
                                    className="img-fluid"
                                  />

                                  <div className="d-flex position-absolute start-0 end-0 top-0 p-3">
                                    <div className="flex-grow-1">
                                      <h5
                                        className="modal-title text-white"
                                        id="createMemberLabel"
                                      >
                                        {!isEdit
                                          ? "Ajouter un nouveau membre"
                                          : "Modifier un membre"}
                                      </h5>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <div className="d-flex gap-3 align-items-center">
                                        <div>
                                          <label
                                            htmlFor="cover-image-input"
                                            className="mb-0"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Select Cover Image"
                                          >
                                            <div className="avatar-xs">
                                              <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                <i className="ri-image-fill"></i>
                                              </div>
                                            </div>
                                          </label>
                                          <input
                                            className="form-control d-none"
                                            defaultValue=""
                                            id="cover-image-input"
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          className="btn-close btn-close-white"
                                          onClick={() => setModal(false)}
                                          id="createMemberBtn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-center mb-4 mt-n5 pt-2">
                                <div className="position-relative d-inline-block">
                                  <div className="position-absolute bottom-0 end-0">
                                    <label
                                      htmlFor="member-image-input"
                                      className="mb-0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="right"
                                      title="Select Member Image"
                                    >
                                      <div className="avatar-xs">
                                        <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                          <i className="ri-image-fill"></i>
                                        </div>
                                      </div>
                                    </label>
                                    <input
                                      className="form-control d-none"
                                      defaultValue=""
                                      id="member-image-input"
                                      type="file"
                                      accept="image/png, image/gif, image/jpeg"
                                    />
                                  </div>
                                  <div className="avatar-lg">
                                    <div className="avatar-title bg-light rounded-circle">
                                      <img
                                        src={userdummyimg}
                                        alt=" "
                                        id="member-img"
                                        className="avatar-md rounded-circle h-auto"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mb-3">
                                <Label
                                  htmlFor="teammembersName"
                                  className="form-label"
                                >
                                  Nom
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="teammembersName"
                                  placeholder="Entrez le nom du membre"
                                  name="last_name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.last_name || ""}
                                  invalid={
                                    validation.touched.last_name &&
                                    validation.errors.last_name
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.last_name &&
                                validation.errors.last_name ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.last_name}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="first_name"
                                  className="form-label"
                                >
                                  Prénoms
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="first_name"
                                  placeholder="Entrez les prénoms du membre"
                                  name="first_name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.first_name || ""}
                                  invalid={
                                    validation.touched.first_name &&
                                    validation.errors.first_name
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.first_name &&
                                validation.errors.first_name ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.first_name}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div className="mb-3">
                                <Label htmlFor="email" className="form-label">
                                  Email
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="email"
                                  placeholder="Entrez l'email du membre"
                                  name="email"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.email || ""}
                                  invalid={
                                    validation.touched.email &&
                                    validation.errors.email
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.email &&
                                validation.errors.email ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.email}
                                  </FormFeedback>
                                ) : null}
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
                                  placeholder="Entrez la commune du membre"
                                  name="commune"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.commune || ""}
                                  invalid={
                                    validation.touched.commune &&
                                    validation.errors.commune
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.commune &&
                                validation.errors.commune ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.commune}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div className="hstack gap-2 justify-content-end">
                                <button
                                  type="button"
                                  className="btn btn-light"
                                  onClick={() => setModal(false)}
                                >
                                  Fermer
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  id="addNewMember"
                                >
                                  {!isEdit ? "Ajouter" : "Enregistrer"}
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>

                <Offcanvas
                  isOpen={isOpen}
                  direction="end"
                  toggle={() => setIsOpen(!isOpen)}
                  className="offcanvas-end border-0"
                  tabIndex={-1}
                  id="member-overview"
                >
                  <OffcanvasBody className="profile-offcanvas p-0">
                    <div className="team-cover">
                      <img
                        src={sideBar.backgroundImg || smallImage9}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="p-3">
                      <div className="team-settings">
                        <Row>
                          <Col>
                            <button
                              type="button"
                              className="btn btn-light btn-icon rounded-circle btn-sm favourite-btn "
                            >
                              {" "}
                              <i className="ri-star-fill fs-14"></i>{" "}
                            </button>
                          </Col>
                          <UncontrolledDropdown
                            direction="start"
                            className="col text-end"
                          >
                            <DropdownToggle
                              tag="a"
                              id="dropdownMenuLink14"
                              role="button"
                            >
                              <i className="ri-more-fill fs-17"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>
                                <i className="ri-star-line me-2 align-middle" />
                                Favorites
                              </DropdownItem>
                              <DropdownItem>
                                <i className="ri-delete-bin-5-line me-2 align-middle" />
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Row>
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <img
                        src={sideBar.userImage || avatar2}
                        alt=""
                        className="avatar-lg img-thumbnail rounded-circle mx-auto"
                      />
                      <div className="mt-3">
                        <h5 className="fs-15 profile-name">
                          <Link to="#" className="link-primary">
                            {sideBar.name || "Nancy Martino"}
                          </Link>
                        </h5>
                        <p className="text-muted profile-designation">
                          {sideBar.designation || "Team Leader & HR"}
                        </p>
                      </div>
                      <div className="hstack gap-2 justify-content-center mt-4">
                        <div className="avatar-xs">
                          <Link
                            to="#"
                            className="avatar-title bg-soft-secondary text-secondary rounded fs-16"
                          >
                            <i className="ri-facebook-fill"></i>
                          </Link>
                        </div>
                        <div className="avatar-xs">
                          <Link
                            to="#"
                            className="avatar-title bg-soft-success text-success rounded fs-16"
                          >
                            <i className="ri-slack-fill"></i>
                          </Link>
                        </div>
                        <div className="avatar-xs">
                          <Link
                            to="#"
                            className="avatar-title bg-soft-info text-info rounded fs-16"
                          >
                            <i className="ri-linkedin-fill"></i>
                          </Link>
                        </div>
                        <div className="avatar-xs">
                          <Link
                            to="#"
                            className="avatar-title bg-soft-danger text-danger rounded fs-16"
                          >
                            <i className="ri-dribbble-fill"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Row className="g-0 text-center">
                      <Col xs={6}>
                        <div className="p-3 border border-dashed border-start-0">
                          <h5 className="mb-1 profile-project">
                            {sideBar.projectCount || "124"}
                          </h5>
                          <p className="text-muted mb-0">Projects</p>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="p-3 border border-dashed border-start-0">
                          <h5 className="mb-1 profile-task">
                            {sideBar.taskCount || "81"}
                          </h5>
                          <p className="text-muted mb-0">Tasks</p>
                        </div>
                      </Col>
                    </Row>
                    <div className="p-3">
                      <h5 className="fs-15 mb-3">Personal Details</h5>
                      <div className="mb-3">
                        <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">
                          Number
                        </p>
                        <h6>+(256) 2451 8974</h6>
                      </div>
                      <div className="mb-3">
                        <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">
                          Email
                        </p>
                        <h6>nancymartino@email.com</h6>
                      </div>
                      <div>
                        <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">
                          Location
                        </p>
                        <h6 className="mb-0">Carson City - USA</h6>
                      </div>
                    </div>
                    <div className="p-3 border-top">
                      <h5 className="fs-15 mb-4">File Manager</h5>
                      <div className="d-flex mb-3">
                        <div className="flex-shrink-0 avatar-xs">
                          <div className="avatar-title bg-soft-danger text-danger rounded fs-16">
                            <i className="ri-image-2-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">
                            <Link to="#">Images</Link>
                          </h6>
                          <p className="text-muted mb-0">4469 Files</p>
                        </div>
                        <div className="text-muted">12 GB</div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="flex-shrink-0 avatar-xs">
                          <div className="avatar-title bg-soft-secondary text-secondary rounded fs-16">
                            <i className="ri-file-zip-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">
                            <Link to="#">Documents</Link>
                          </h6>
                          <p className="text-muted mb-0">46 Files</p>
                        </div>
                        <div className="text-muted">3.46 GB</div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="flex-shrink-0 avatar-xs">
                          <div className="avatar-title bg-soft-success text-success rounded fs-16">
                            <i className="ri-live-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">
                            <Link to="#">Media</Link>
                          </h6>
                          <p className="text-muted mb-0">124 Files</p>
                        </div>
                        <div className="text-muted">4.3 GB</div>
                      </div>
                      <div className="d-flex">
                        <div className="flex-shrink-0 avatar-xs">
                          <div className="avatar-title bg-soft-primary text-primary rounded fs-16">
                            <i className="ri-error-warning-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">
                            <Link to="#">Others</Link>
                          </h6>
                          <p className="text-muted mb-0">18 Files</p>
                        </div>
                        <div className="text-muted">846 MB</div>
                      </div>
                    </div>
                  </OffcanvasBody>
                  <div className="offcanvas-foorter border p-3 hstack gap-3 text-center position-relative">
                    <button className="btn btn-light w-100">
                      <i className="ri-question-answer-fill align-bottom ms-1"></i>{" "}
                      Send Message
                    </button>
                    <Link to="/pages-profile" className="btn btn-primary w-100">
                      <i className="ri-user-3-fill align-bottom ms-1"></i> View
                      Profile
                    </Link>
                  </div>
                </Offcanvas>
              </div>

              {isError && (
                <div
                  className="py-4 mt-4 text-center"
                  id="noresult"
                  style={{ display: "none" }}
                >
                  {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#405189,secondary:#0ab39c" style={{ width: "72px", height: "72px" }}></lord-icon> */}
                  <h5 className="mt-4">Une erreur est survenue</h5>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Team;
