import React,{Component} from 'react'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap'
export default class Post extends Component{
    constructor(props){
        super(props)
        this.state= {
            photo:'',
            title:'',
            body:'',
            error:''
        }
    }
    isAuthenticated = () => {
        if(typeof window == 'undefined')
        return false;
        if(localStorage.getItem('jwt')){
            return JSON.parse(localStorage.getItem('jwt'))
        }
        else
        return false
    }
    handleChange = (name) =>(event) => {
        this.setState({error:''})
        this.setState({[name]:event.target.value})

    }
    clickSubmit = (event) => {
        event.preventDefault();
        const userId = this.isAuthenticated().user._id
        const token = this.isAuthenticated().user.token
        const {photo,title,body} = this.state
        const Post = {
            photo,
            title,
            body
        }
        this.newPost(Post,userId,token)
    }
    newPost = (Post,userId,token) => {
        fetch(`http://localhost:1827/post/new/${userId}`,{
            method:"POST",
            headers:{
                Accept:'application/json',
                Authorization: `Bearer ${token}`
            },
            body:Post
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
        
    }
    
    render(){
        const {photo,title,body} = this.state
        return (<div>
            <Modal {...this.props} size='lg' id="ph" aria-labelledby='contained-modal-title-vcenter' centered> 
                <Modal.Header  closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        <span style={{color:'#555',fontSize:'3em'}}>Add Photo</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {/* <div className="alert alert-primary" style={{display:error?"":"none"}}>
                {error}
             </div> */}
                    <Row>
                        <Col sm={8}>
                            <Form>
                            <Form.Group controlId='photo'> 
                                <Form.Label className='text-muted'>Photo</Form.Label>
                                <Form.Control 
                                onChange={this.handleChange("photo")}
                                type='file'
                                placeholder='Select Photo'
                                value={photo}
                                /></Form.Group>
                            <Form.Group controlId='title'>
                                <Form.Label className='text-muted'>Title</Form.Label>
                                <Form.Control 
                                onChange={this.handleChange("title")}
                                type='text'
                                placeholder='Enter title'
                                value={title}
                                />
                            </Form.Group>
                            <Form.Group controlId='body'>
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