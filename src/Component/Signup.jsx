import React,{Component} from 'react'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
 class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            name:"",
            email:"",
            password:"",
            error:"",
            open:false
        }
    }
    //higher order function because of function used
    handleChange = (name) =>  (event) =>{
        this.setState({error:"",open:false})
        this.setState({[name]:event.target.value})
        // console.log([name].value)
    }
    clickSubmit = event =>{
        event.preventDefault()
        const {userName,name,email,password} = this.state
        const User = {
            userName,
            name,
            email,
            password
        };
        this.signup(User).then(data => {
            if (data.error) this.setState({error:data.error});
            else this.setState({
                userName:"",
                error:"",
                name:"",
                email:"",
                password:"",
                open:true
            });
        })
    }
    signup = (User) =>{
        return  fetch(`${process.env.REACT_APP_API_URL}/signup`,{
             method:"POST",
             headers:{
                 Accept:"application/json",
                 "Content-Type":"application/json"
             },
             body: JSON.stringify(User)
         })
         .then(response => {
             return response.json()
         })
         .catch(err => console.log(err))
     }
    render(){
        const {userName,name,email,password,error,open} = this.state
        return (
            
            // <div className='container'>
            //     <div className="alert alert-primary" style={{display:error?"":"none"}}>
            //         {error}
            //     </div>

            //     <div className="alert alert-info" style={{display:open?"":"none"}}>
            //        {/* {alert('New account created . Please sign in')}  */}
            //     </div>
            <Modal {...this.props} size='lg'  aria-labelledby='contained-modal-title-vcenter' centered>
                <Modal.Header  closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    <span style={{color:'#555',fontSize:'3em'}}>Signup</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="alert alert-primary" style={{display:error?"":"none"}}>
                {error}
             </div>
             <div className="alert alert-info" style={{display:open?"":"none"}}>
                     New Account Created!! Please <a  href='#signin' onClick={this.props.loginModalTrigger}>Sign In</a>
                 </div>
                <Row>
                    <Col sm={8}>
                        <Form >
                        <Form.Group controlId='userName'>
                                <Form.Label className='text-muted'>Username</Form.Label>
                                <Form.Control
                                onChange = {this.handleChange("userName")} 
                                type='text'
                                placeholder='Enter Username'
                                value={userName}
                                /></Form.Group>
                                <Form.Group controlId='Name'>
                                <Form.Label className='text-muted'>Name</Form.Label>
                                <Form.Control
                                onChange = {this.handleChange("name")} 
                                type='text'
                                placeholder='Enter Name'
                                value={name}
                                /></Form.Group>
                                <Form.Group controlId='email'>
                                <Form.Label className='text-muted'>Email</Form.Label>
                                <Form.Control 
                                onChange={this.handleChange("email")}
                                type='email'
                                placeholder='Enter mail id'
                                value={email}
                                /></Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label className='text-muted'>Password</Form.Label>
                                <Form.Control 
                                onChange={this.handleChange("password")}
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                />
                            </Form.Group>
                            <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>
                        Submit
                    </button>

                        </Form>
                        <a  href='#signin' onClick={this.props.loginModalTrigger}>Already have an account? Login</a>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        )
    }

    loginModalTrigger() {
        console.log("Sign module login trigger")
    }
} 

export default Signup;