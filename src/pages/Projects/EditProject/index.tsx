import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
//Import Flatepicker
// import Flatpickr from "react-flatpickr";
import Select from "react-select";

import Dropzone from "react-dropzone";

//Import Images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import { useFormik } from "formik";
import {
  useEditEventMutation,
  useGetOneEventQuery,
} from "../../../redux/features/services/eventsServices";

const EditProject = () => {
  const { state } = useLocation();

  const { isError, isLoading, data } = useGetOneEventQuery(state.id);
  const SingleOptions = [
    { value: "Watches", label: "Watches" },
    { value: "Headset", label: "Headset" },
    { value: "Sweatshirt", label: "Sweatshirt" },
    { value: "20% off", label: "20% off" },
    { value: "4 star", label: "4 star" },
  ];
  const [selectedMulti, setselectedMulti] = useState(null);

  const handleMulti = (selectedMulti?: any) => {
    setselectedMulti(selectedMulti);
  };

  //Dropzone file upload
  const [selectedFiles, setselectedFiles] = useState([]);

  const handleAcceptedFiles = (files: any) => {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  };

  /**
   * Formats the size
   */
  const formatBytes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  document.title =
    "Modifier l'évenement | Velzon - React Admin & Dashboard Template";

  const navigate = useNavigate();
  const [event, setEvent]: any = useState(null);

  const [dateEvent, setDateEvent]: any = useState(null);
  
  const [isActive, setIsActive]: any = useState(null);

  const [
    editEvent,
    {
      isLoading: isLoadingAdd,
      isError: isErrorAdd,
      error: errorAdd,
      isSuccess: isSuccessAdd,
    },
  ]: any = useEditEventMutation();

useEffect(() => {
    if(data){
        setDateEvent(data && data.date) ;
        setIsActive(data && data.is_active ? 'En cours' : 'Terminée' ) ;
    }
   
}, [data])

 
console.log(isActive, 'isActive')
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (data && data.name) || "",
      lieu: (data && data.lieu) || "",
    },

    onSubmit: async (values: any) => {
      values.is_active = isActive === "En cours" ? true : false;
       
      console.log(values, "values");
      
      
      
      
        const DataValidate = { ...values, date: dateEvent , };

        console.log(DataValidate,'okokokokokijijij')
        try {
          await editEvent({

            id:state.id,
            name: DataValidate.name !== data.name ? DataValidate.name : undefined,
            lieu: DataValidate.lieu !== data.lieu ? DataValidate.lieu : undefined,
            date: DataValidate.date !== data.date ? DataValidate.date : undefined,
            is_active: DataValidate.is_active !== data.is_active ? DataValidate.is_active : undefined,
          
          }).unwrap();
          navigate(-1)

        } catch (err) {
            console.log(errorAdd)
        }

      validation.resetForm();
    },
  });

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
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Modification de l'evenement"
            pageTitle="Evenements"
          />
          <Row>
            <Col lg={8}>
              <Form
                onSubmit={(e) => {
                  validation.handleSubmit();
                  e.preventDefault();

                  return false;
                }}
              >
                <Card>
                  <CardBody>
                    <div className="mb-3">
                      <Label className="form-label" htmlFor="name">
                        Nom de l'evenement
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        defaultValue={data.name}
                        id="name"
                        placeholder="Entrer le nom de l'evenement"
                        validate={{
                          required: { value: true },
                        }}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <Label className="form-label" htmlFor="lieu">
                        Lieu de l'evenement
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="lieu"
                        placeholder="Entrer le lieu de l'evenement"
                        defaultValue={data.lieu}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.lieu || ""}
                        invalid={
                          validation.touched.lieu && validation.errors.lieu
                            ? true
                            : false
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <Label
                        className="form-label"
                        htmlFor="project-thumbnail-img"
                      >
                        Photo
                      </Label>
                      <Input
                        className="form-control"
                        id="project-thumbnail-img"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Description </Label>
                      <Input id="exampleText" name="text" type="textarea" />
                    </div>

                    <Row>
                      <Col lg={6}>
                        <div className="mb-3 mb-lg-0">
                          <Label htmlFor="isActive" className="form-label">
                            Statut
                          </Label>

                          <Input
                            type="select"
                            name="isActive"
                            id="isActive"
                           
                            onChange={(e) => setIsActive(e.target.value)}
                            onBlur={validation.handleBlur}
                            value={
                                isActive
                            }
                            invalid={
                              validation.touched.isActive &&
                              validation.errors.isActive
                                ? true
                                : false
                            }
                          >
                            <option value={"En cours"}>En cours</option>
                            <option value={"Terminée"}>Terminée</option>
                          </Input>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div>
                          <Label htmlFor="dateEvent" className="form-label">
                            Date
                          </Label>

                          <Input
                            id="dateEvent"
                            name="dateEvent"
                            type="date"
                            onChange={(e) => setDateEvent(e.target.value)}
                            onBlur={validation.handleBlur}
                            value={dateEvent}
                            invalid={
                              validation.touched.dateEvent &&
                              validation.errors.dateEvent
                                ? true
                                : false
                            }
                          />
                          {/* <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                    dateFormat: "d M, Y"
                                                    }}
                                                    placeholder="Selact Date"
                                                /> */}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">Photos souvenirs</h5>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <p className="text-muted">Ajoutez les photos ici.</p>

                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          handleAcceptedFiles(acceptedFiles);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone dz-clickable">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <div className="mb-3">
                                <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                              </div>
                              <h4>Glisser les fichiers ici !</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>

                      <ul className="list-unstyled mb-0" id="dropzone-preview">
                        {selectedFiles.map((f: any, i: number) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          );
                        })}
                      </ul>
                    </div>
                  </CardBody>
                </Card>

                <div className="text-end mb-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary w-sm me-1"
                  >
                    Retour
                  </button>
                  <button type="submit" className="btn btn-success w-sm">
                    Modifier
                  </button>
                </div>
              </Form>{" "}
            </Col>

            <Col lg={4}>
              {/* <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Privacy</h5>
                </div>
                <CardBody>
                  <div>
                    <Label
                      htmlFor="choices-privacy-status-input"
                      className="form-label"
                    >
                      Status
                    </Label>
                    <select
                      className="form-select"
                      data-choices
                      data-choices-search-false
                      id="choices-privacy-status-input"
                    >
                      <option defaultValue="Private">Private</option>
                      <option value="Team">Team</option>
                      <option value="Public">Public</option>
                    </select>
                  </div>
                </CardBody>
              </div> */}

              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Caracteristiques</h5>
                </div>
                <CardBody>
                  <div className="mb-3">
                    <Label
                      htmlFor="choices-categories-input"
                      className="form-label"
                    >
                      Categories
                    </Label>
                    <select
                      className="form-select"
                      data-choices
                      data-choices-search-false
                      id="choices-categories-input"
                    >
                      <option defaultValue="Designing">Design</option>
                      <option value="Development">Devellopement</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="choices-text-input" className="form-label">
                      Tags
                    </Label>
                    <Select
                      value={selectedMulti}
                      isMulti={true}
                      onChange={() => {
                        handleMulti();
                      }}
                      options={SingleOptions}
                    />
                  </div>
                </CardBody>
              </div>

              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Contributeurs</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-3">
                    <Label htmlFor="choices-lead-input" className="form-label">
                      Chef{" "}
                    </Label>
                    <select
                      className="form-select"
                      data-choices
                      data-choices-search-false
                      id="choices-lead-input"
                    >
                      <option defaultValue="Brent Gonzalez">
                        Brent Gonzalez
                      </option>
                      <option value="Darline Williams">Darline Williams</option>
                      <option value="Sylvia Wright">Sylvia Wright</option>
                      <option value="Ellen Smith">Ellen Smith</option>
                      <option value="Jeffrey Salazar">Jeffrey Salazar</option>
                      <option value="Mark Williams">Mark Williams</option>
                    </select>
                  </div>

                  <div>
                    <Label className="form-label"> Membres</Label>
                    <div className="avatar-group">
                      <Link
                        to="#"
                        className="avatar-group-item"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        title="Brent Gonzalez"
                      >
                        <div className="avatar-xs">
                          <img
                            src={avatar3}
                            alt=""
                            className="rounded-circle img-fluid"
                          />
                        </div>
                      </Link>
                      <Link
                        to="#"
                        className="avatar-group-item"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        title="Sylvia Wright"
                      >
                        <div className="avatar-xs">
                          <div className="avatar-title rounded-circle bg-secondary">
                            S
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="#"
                        className="avatar-group-item"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        title="Ellen Smith"
                      >
                        <div className="avatar-xs">
                          <img
                            src={avatar4}
                            alt=""
                            className="rounded-circle img-fluid"
                          />
                        </div>
                      </Link>
                      <Link
                        to="#"
                        className="avatar-group-item"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        title="Add Members"
                      >
                        <div
                          className="avatar-xs"
                          data-bs-toggle="modal"
                          data-bs-target="#inviteMembersModal"
                        >
                          <div className="avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary">
                            +
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditProject;
