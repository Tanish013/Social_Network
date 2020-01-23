import React,{Component} from 'react'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
export  class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password:"",
            error:"",
            redirectToReferer:false,
            loading: false
        }
    }
    handleChange = (name) => (event) => {
        this.setState({error:""})
        this.setState({[name]:event.target.value})
    };
    authenticate = (jwt,next) => {
        if(typeof window !== "undefined"){
            // console.log(jwt.user)
            //  localStorage.removeItem(jwt);
            localStorage.setItem("jwt",JSON.stringify(jwt));
            next();
        }
    }
    clickSubmit = event =>{
        event.preventDefault();
        this.setState({loading:true})
        const {email,password} = this.state
        const User = {
            email,
            password
        };
        this.signin(User).then(data =>{
            if(data.error) this.setState({error:data.error,loading:false})
            else{
                //autheticate
                this.authenticate(data,() => {
                    this.setState ({redirectToReferer:true,loading:true})
                })
            }
        })
    }
    signin = (User) => {
        return fetch("http://localhost:1827/signin",{
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json"
            },
            body:JSON.stringify(User)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err => console.log(err))
    }
    render(){
        const {email,password,error,redirectToReferer,loading} = this.state
        if (redirectToReferer)
        return <Redirect to="/home"></Redirect>
            return(<div>
                <Modal {...this.props} size='lg' id="ph" aria-labelledby='contained-modal-title-vcenter' centered> 
                <Modal.Header  closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        <span style={{color:'#555',fontSize:'3em'}}>Login</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="alert alert-primary" style={{display:error?"":"none"}}>
                {error}
             </div>
             {loading ? <div className='jumbotron text center'>
                 <h2>Loading ....</h2>
                 </div>: (
                     ""
                 )}
                    <Row>
                        <Col sm={8}>
                            <Form>
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
                                    {/* <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Log In
                                    </Button>
                                    </Form.Group> */}
                                    <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>
                        Submit
                    </button>
                                
                            </Form>
                           <a href="pexels.com">
                               Forget Password
                           </a><br></br>
                            <a href="#top"onClick={this.props.signupModalTrigger}>Don't Have an Account? Sign Up</a> 
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                </Modal>
    
    
            </div> 
            )
        //}
    }
} 