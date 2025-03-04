import React, { Component } from 'react'
import FormValidator from '../../_validators/FormValidators';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commonService } from '../../_services/common.service';
import DbOperation from '../../_helpers/dbOperation';
import Breadcrumb from '../common/breadcrumb';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

export default class Size extends Component {
    constructor(props) {
        super(props);

        this.validationForm = new FormValidator([
            {
                field: "name",
                method: "isEmpty",
                validWhen: false,
                message: "Size name is required"
            },
        ]);
        this.state = {
            dbops: DbOperation.create,
            btnText: 'Save',
            data: [],
            open: false,
            size: {
                name: "",
                id: 0,

            },
            submitted : false,
            formValidation: this.validationForm.valid(),
        }

    }
    handleInputChange =(e) =>{

        e.preventDefault();
        const {name,value} = e.target;
        const { size } = this.state;
        this.setState({
            size: {
                ...size, 
                [name] : value 
            }
            })
     }
     clearForm = () =>{
    this.setState({
        dbops: DbOperation.create,
        btnText: 'Save',
        data: [],
        open: false,
        size: {
            name: "",
            id: 0,

        },
        submitted : false,
        formValidation: this.validationForm.valid(),
    })
     }
     handleSubmit(e){
         e.preventDefault();
         const validation = this.validatorForm.validate(this.state, "user");
     this.setState({
         formValidation : validation,
         submitted : true
     });
     const {size,dbops} = this.state;
     if(validation.isValid){
         switch(dbops){
            case DbOperation.create:
                commonService.save("SizeMaster",false,size)
                .then( res => {
                    if(res.isSuccess){
                        {
                            toast.success("Data has been saved completetly!" , "Size Master");
                            this.clearForm();
                            this.getData();
                        }
                     
                    }else{
                        toast.error(res.errors[0],"registration")
                    }
                },
                (error) =>{
                    toast.error("Something went wrong with registration")
                }
            )
            break;
            case DbOperation.update:
                commonService.update("SizeMaster",false,size)
                .then( res => {
                    if(res.isSuccess){
                        toast.success("Data has been updated successfully!" , "Size Master");
                        this.clearForm();
                        this.getData();
                    }else{
                        toast.error(res.errors[0],"registration")
                    }
                },
                (error) =>{
                    toast.error("Something went wrong with registration")
                }
            )
         }
      
     }
          }

          getData = () =>{
            // recieve table data here
            commonService.getAll("SizeMaster",false)
            .then( res => {
                if(isSuccess){
                    this.setState({data: res.data})
                }else{
                    toast.error(res.errors[0],"Size Master")
                }
            },
                (error) =>{
                    toast.error("Something went wrong with registration")
                }
        )
          }
          componentDidMount(){
              this.getData();
          }
          onEdit =(objRow) =>{
          this.setState({
                dbops: DbOperation.update,
                btnText: 'Update',
                size: {
                    id: objRow.id,
                    name: objRow.name,
                },
                open: true
            })
          }
          onOpenModal = () =>{
          this.clearForm();
          this.setState({
                open: true,
          })
        }
        onCloseModal = () =>{
            this.clearForm();
        }
          onDelete = (id) =>{
            let obj = {id:id}
            commonService.delete("SizeMaster",false,obj)
            .then(res => {
                if(res.isSuccess){
                    toast.success("Data has been deleted successfully!" , "Size Master");
                    this.getData();
                }else{
                    toast.error(res.errors[0],"registration")
                }
            },
            (error) =>{
                toast.error("Something went wrong with registration")
            }
          )}
        render() {
            const {open, data,submitted,formValidation, size,btnText} = this.state;
          let _validation = submitted ? this.validationForm.validate(this.state, 'size') : formValidation;
        
            return (
                <>
                    <Breadcrumb title="Size" parent="Masters" />
                    < div className="container-fluid" >
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Products Size</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="btn-popup pull-right">
                                            <button type="button" className="btn btn-primary" onClick={this.onOpenModal} >Add Size</button>
                                            <Modal open={open} onClose={this.onCloseModal}>
                                                <div className="modal-header">
                                                    <h5 className="modal-title f-w-600" >Add
                                                        Size</h5>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={this.handleSubmit} >
                                                        <div className="form-group">
                                                            <label htmlFor="recipient-name" className="col-form-label" >Size
                                                                Name :</label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                className={"form-control " + (_validation.name.isInvalid ? "has-error" : "")}
                                                                value={size.name}
                                                                onChange={this.handleInputChange}
                                                            />
                                                            {
                                                                _validation.name.isInvalid &&
                                                                <div className='help-block' >{_validation.name.message}</div>
                                                            }
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="submit" className="btn btnprimary">{btnText}</button>
                                                            <button type="button" className="btn btnsecondary"
                                                                onClick={this.onCloseModal}>Close</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </Modal>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div id="basicScenario" className="product-physical">
                                            {/* <TableWithPagination data={data} columnFilter columns={tableCols} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
