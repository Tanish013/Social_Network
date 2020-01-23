import React,{Component} from 'react'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap'
import {Redirect} from 'react-router-dom';
export default class Post extends Component{
    constructor(){
        super()
        this.state= {
            photo:'',
            title:'',
            body:'',
            error:'',
            user:{},
            fileSize:0,
            loading:false
        };
    }
    componentDidMount() {
        this.postData = new FormData();
        this.setState({user:this.isAuthenticated().user})
    }
    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };
        isAuthenticated = () => {
        if (typeof window == 'undefined') {
            return false;
        }
    
        if (localStorage.getItem('jwt')) {
            return JSON.parse(localStorage.getItem('jwt'));
        } else {
            return false;
        }
    };
    
    handleChange = (name) =>(event) => {
        this.setState({error:''})
        const value =
        name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });

    }
    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = this.isAuthenticated().user._id;
            const token = this.isAuthenticated().token;

            this.create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    // this.setState({
                    //     loading: false,
                    //     title: "",
                    //     body: "",
                    //     redirectToProfile: true
                    // });
                    console.log("new",data);
                }
            });
        }
        }
        create = (userId, token, post) => {
            return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: post
            })
                .then(response => {
                    return response.json();
                })
                .catch(err => console.log(err));
        };
    
    render(){
        const {title,body,photo,user,error,loading} = this.state
        return (<div>
            <Modal {...this.props} size='lg' id="ph" aria-labelledby='contained-modal-title-vcenter' centered> 
                <Modal.Header  closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        <span style={{color:'#555',fontSize:'3em'}}>Add Photo</span>
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
                            <Form.Group> 
                                <Form.Label className='text-muted'>Photo</Form.Label>
                                <Form.Control 
                                onChange={this.handleChange("photo")}
                                type='file'
                                accept='image/*'
                                placeholder='Select Photo'
                                /></Form.Group>
                            <Form.Group>
                                <Form.Label className='text-muted'>Title</Form.Label>
                                <Form.Control 
                                onChange={this.handleChange("title")}
                                type='text'
                                placeholder='Enter title'
                                value={title}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='text-muted'>Body</Form.Label>
                                <Form.Control 
                                onChange={this.handleChange("body")}
                                type='text'
                                placeholder='Enter body'
                                value={body}
                                />
                            </Form.Group>
                            
                                    <button  className='btn btn-raised btn-primary' onClick={this.clickSubmit}>
                        Add Photo
                    </button>
                                
                            </Form>
                           </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                </Modal>
        </div>
        )
    }
}