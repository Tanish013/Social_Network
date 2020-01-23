import React,{Component} from 'react'
import logo from './Images/photonova.png'
import {Redirect,Link} from 'react-router-dom'
import {Container,Row,Col} from 'react-bootstrap'
export default class Profile extends Component{
    constructor(){
        super();
        this.state={
            user:'',
            // userName:'',
            email:'',
            redirectToSignin:false
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
    read = (userId,token) => {
        return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                "Content-Type":'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }
    init = (userId) => {
        const token = this.isAuthenticated().token
            this.read(userId,token)
        .then(data => {
            if(data.error){
                this.setState({redirectToSignin:true})
            }
            else{
                this.setState({user:data})
            }
        });
    }
    componentDidMount = () =>{
        // console.log(this.props.match.params.userId)
       const userId = this.props.match.params.userId
       this.init(userId);
    }
    render(){
        const {redirectToSignin,user} = this.state
        if(redirectToSignin){
            return <Redirect to='/'></Redirect>
        }
        return(<div>
            <header>
            <Container className=" bg-dark head">
                <Row>
                    <Col>
                    <a href="/"> <img src={logo} width="150" height="100" margin="0" alt="alterate text" /></a>
                    </Col>
                </Row>
            </Container>
            </header>
                <Container>
                    <Row>
                    <Col md={6}>
                    <h2 className='mt-5 mb-5'>Profile</h2>
                        <p>Hello {this.isAuthenticated().user.userName}</p>
                        <p>Name: {this.isAuthenticated().user.name}</p>
                        <p>Email: {this.isAuthenticated().user.email}</p>
                        <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                    </Col>
                    <Col md={6}>
                        {this.isAuthenticated().user && this.isAuthenticated().user._id == user._id && (
                            <div className= ' d-inline-block mt-5'>
                                <Link className='btn btn-raised btn-success mr-5'
                                to={`/users/edit/${user._id}`}>
                                    Edit Profile
                                </Link>
                                <button className='btn btn-raised btn-danger'>
                                    Delete Profile
                                </button>
                            </div>
                        )}
                    </Col>
                    </Row>
                </Container>
                
        </div>)
    }
}