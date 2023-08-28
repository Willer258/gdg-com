import React, { useEffect, useState } from "react";
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
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
//Import Flatepicker
// import Flatpickr from "react-flatpickr";
import Select from "react-select";
import {
  useEditEventMutation,
  useGetOneEventQuery,
} from "../../../redux/features/services/eventsServices";
import { useGetMembersQuery } from "../../../redux/features/services/memberServices";
import { useFormik } from "formik";

const EditProject = () => {
  const { state } = useLocation();

  const { isError, isLoading, data }:any = useGetOneEventQuery(state.id);

  const [selectedMulti, setselectedMulti] = useState(null);

  const {
    data: DataMember = [],
   
  } = useGetMembersQuery(1);


  const memberOptions =
    DataMember.results &&
    DataMember.results.map((item: any) => ({
      value: item.id,
      label: item.first_name + " " + item.last_name,
    }));

    const defaultValueMember = data && JSON.parse(data.organizers_team).map((item: any) => ({
      value: item.id,
      label: item.first_name + " " + item.last_name
    }))
    


    useEffect(() => {
      setselectedMulti(defaultValueMember);
    }, [])
    

  const [Membres, setMembres]: any = useState([]);

  const handleMulti = (selectedMulti?: any) => {
    console.log(selectedMulti, "sell");

    const nouveauTableau = selectedMulti.map(
      (selection: { label: any; value: any }) => {
        const element = DataMember && DataMember.results.find(
          (item: { id: any }) => item.id === selection.value
        );
        console.log(element);
        if (element) {
          return {
            id: element.id,
            first_name: element.first_name,
            last_name: element.last_name,
          };
        }
      }
    );

    setMembres(JSON.stringify(nouveauTableau));
    console.log(JSON.stringify(nouveauTableau));

    setselectedMulti(selectedMulti);
  };

  /**
   * Formats the size
   */

  document.title =
    "Modifier l'évenement | Velzon - React Admin & Dashboard Template";

  const navigate = useNavigate();

  const [dateEvent, setDateEvent]: any = useState(null);

  const [isActive, setIsActive]: any = useState(null);

  const [
    editEvent,
    {
      // isLoading: isLoadingAdd,
      // isError: isErrorAdd,
      error: errorAdd,
      // isSuccess: isSuccessAdd,
    },
  ]: any = useEditEventMutation();

  useEffect(() => {
    if (data) {
      setDateEvent(data && data.date);
      setIsActive(data && data.is_active ? "En cours" : "Terminée");
    }
  }, [data]);

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (data && data.name) || "",
      lieu: (data && data.lieu) || "",
      description: (data && data.description) || "",
      manager: (data && data.manager) || "",
      isActive: (data && data.is_active) || "",

    },

    onSubmit: async (values: any) => {
      values.is_active = isActive === "En cours" ? true : false;
      values.date = dateEvent
      

      console.log(values , 'lomia')
      const DataValidate = { ...values, organizers_team: Membres ,  };

      console.log(DataValidate, "okokokokokijijij");


      try {
        await editEvent({
          id: state.id,
          name: DataValidate.name !== data.name ? DataValidate.name : undefined,
          lieu: DataValidate.lieu !== data.lieu ? DataValidate.lieu : undefined,
          date: DataValidate.date !== data.date ? DataValidate.date : undefined,
          is_active:
            DataValidate.is_active !== data.is_active
              ? DataValidate.is_active
              : undefined,

          description: DataValidate.description !== data.description
            ? DataValidate.description : undefined,
          manager: DataValidate.manager !== data.manager ? DataValidate.manager : undefined,
          organizers_team : DataValidate.organizers_team !== data.organizers_team ? DataValidate.organizers_team : undefined
        }).unwrap();
        navigate(-1);
      } catch (err) {
        console.log(errorAdd);
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
                      
                      <Input
                        type="textarea"
                        className="form-control"
                        id="description"
                      
                        defaultValue={data.description}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.description || ""}
                        invalid={
                          validation.touched.description && validation.errors.description
                            ? true
                            : false
                        }
                      />
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
                            value={isActive}
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

              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Contributeurs</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-3">
                    <Label htmlFor="choices-lead-input" className="form-label">
                      Responsable de l'evenement
                    </Label>
                    
                    <Input
                      type="text"
                      className="form-control"
                      id="manager"
                      placeholder="Entrer le nom du responsable de l'evenement"
                      defaultValue={data.manager}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.manager || ""}
                      invalid={
                        validation.touched.manager && validation.errors.manager
                          ? true
                          : false
                      }
                    />
                  </div>

                  <div>
                    <Label className="form-label"> Membres </Label>
                    <Select
                      value={selectedMulti}
                      defaultValue={defaultValueMember}
                      isMulti={true}
                      isClearable={true}
                      onChange={(value) => {
                     
                        handleMulti(value);
                      }}
                      options={memberOptions}
                    />
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
