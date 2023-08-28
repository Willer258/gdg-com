import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Modal, Row, UncontrolledDropdown, ModalBody, ModalHeader, Label, Form } from 'reactstrap';

import Select from "react-select";
//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";

import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";
import { useFormik } from 'formik';
import { useAddMembreOnEventMutation } from '../../../redux/features/services/eventsServices';
import { useGetMembersQuery } from '../../../redux/features/services/memberServices';

const TeamTab = ({data}:any) => {


      const [modal, setModal] = useState(false);
  const handleTeamClicks = () => {
    setModal(!modal);
  };

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);
    //Modal  
    console.log(data)
    return (
        <React.Fragment>
            <Row className="g-4 mb-3">
                <div className="col-sm">
                    <div className="d-flex">
                        <div className="search-box me-2">
                            <input type="text" className="form-control" placeholder="Search member..." />
                            <i className="ri-search-line search-icon"></i>
                        </div>
                    </div>
                </div>
                <div className="col-sm-auto">
                <div className="flex-shrink-0">
                <button
                  onClick={() => handleTeamClicks()}
                  type="button"
                  className="btn btn btn-success w-sm "
                >
                  <i className="ri-share-line me-1 align-bottom"></i> Ajoutez un
                  participant
                </button>

                <Modal isOpen={modal} toggle={toggle} centered>
                  <ModalHeader>Ajouter un participant</ModalHeader>
                  <AddCertified id={data.id}/>
                </Modal>
              </div>
                </div>
            </Row>

            <div className="team-list list-view-filter">
                {
                    data.participants.map((item:any) => (
                        <Card className="team-box">
                        <CardBody className="px-4">
                            <Row className="align-items-center team-row">
                              
                                <Col lg={4}>
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
                                            <Link to="#" className="d-block"><h5 className="fs-16 mb-1"> {item.first_name} {item.last_name}</h5></Link>
                                            <p className="text-muted mb-0">{item.job}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <Row className="text-muted text-center">
                                        <Col xs={6} className="border-end border-end-dashed">
                                            <h5 className="mb-1">1</h5>
                                            <p className="text-muted mb-0">Certificats</p>
                                        </Col>
                                        <Col xs={6}>
                                            <h5 className="mb-1">0</h5>
                                            <p className="text-muted mb-0">Contributions</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={2} className="col">
                                    <div className="text-end">
                                        <Link    to={"/details-membre"}
                              state={{ id: item.id }} className="btn btn-light view-btn">Voir son profil</Link>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    ))
                }
               
                
            </div>


          
        </React.Fragment>
    );
};

export default TeamTab;



const AddCertified = ({id}:any) => {
    const [addMembreOnEvent, { error: errorAdd }]: any =
      useAddMembreOnEventMutation();
  
    const {
      data = [],
      isLoading,
      isError,
      //  errorcl
    } = useGetMembersQuery(1);
  
    const [Membres, setMembres]: any = useState([]);
  
    const [selectedMulti, setselectedMulti]: any = useState(null);
  
    const memberOptions =
      data.results &&
      data.results.map((item: any) => ({
        value: item.id,
        label: item.first_name + " " + item.last_name,
      }));
  
    const handleMulti = (selectedMulti?: any) => {
      setselectedMulti(selectedMulti);
    };
  
    const validation: any = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,
  
      initialValues: {},
  
      onSubmit: async (values: any) => {
        console.log(selectedMulti);
        // values.is_active = values.isActive === 'En cours' ? true : false
        // values.organizers_team = Membres
        // values.date = dateEvent
        values.event =  id
        values.member = selectedMulti.value
        values.type = "event";
  
        const dateAujourdhui = new Date();
        const annee = dateAujourdhui.getFullYear();
        const mois = String(dateAujourdhui.getMonth() + 1).padStart(2, "0"); // Mois commence à 0, donc on ajoute 1
        const jour = String(dateAujourdhui.getDate()).padStart(2, "0");
  
        const dateFormatee = `${annee}-${mois}-${jour}`;
  
        values.issue_date = dateFormatee;
        values.signature_name = "event";
        values.community_name = "event";
  
  
        const DataValidate = { ...values };
  
        try {
          await addMembreOnEvent({
            ...DataValidate,
          }).unwrap();
        } catch (err) {
          console.log(errorAdd);
        }
  
        validation.resetForm();
      },
    });
  
    return (
      <ModalBody>
        <div className="mb-3">
          <Form
            onSubmit={(e) => {
              validation.handleSubmit();
              e.preventDefault();
  
              return false;
            }}
          >
            <div>
              <Label className="form-label"> Membres</Label>
              <Select
                value={selectedMulti}
                isClearable={true}
                onChange={(value) => {
                  handleMulti(value);
                }}
                options={memberOptions}
              />
            </div>
  
            <div className="text-end my-4">
              <button className="btn btn-secondary w-sm me-1">Retour</button>
              <button type="submit" className="btn btn-success w-sm">
                Ajouter
              </button>
            </div>
          </Form>
        </div>
      </ModalBody>
    );
  };