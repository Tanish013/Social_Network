import React,{Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Axios from 'axios';
import {Redirect} from "react-router-dom"
import logo from './Images/photonova.png'
import {Col} from 'react-bootstrap'
import {Form,FormControl} from 'react-bootstrap'
import Post from './Post'
export default class Home extends Component{
    constructor(props){
        super(props);
        const token =  localStorage.getItem("jwt");
        // console.log(token)
        let loggedIn = true
        if(token == null)
        loggedIn = false
        this.state={
            image : [],
            loggedIn,
            postModalShow:false
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
    signout = () =>{
        if(typeof window !=='undefined') localStorage.removeItem('jwt');
        return fetch('http://localhost:1827/signout',{
            method:"GET"
        })
        .then(response=>{
            console.log('signout',response);
            return response.json();
        })
        .then(this.setState(()=>this.state.loggedIn=false))
        .catch(err => console.log(err));
    }
    componentDidMount(){
        // Axios.get('http://localhost:1827/photos')
        // .then(res =>{
        //    this.setState({image: res.data});
        //   })
    }
    // componentDidUpdate(){
    //     Axios.get('http://localhost:1827/photos')
    //     .then(res =>{
    //        this.setState({image: res.data});
    //       })
    // }
    render(){
        if(this.state.loggedIn === false){
            return <Redirect to='/' />
        }
        let postModalClose = () => this.setState({postModalShow:false})
        return <div>
            <header>
            <div className="container bg-dark head fixed-top" >
              <div className="row">
                <div className="col-5">
                  <a href="/"> <img src={logo} width="150" height="100" alt="alterate text" /></a>
                  </div>
                  <Col lg={5}>
                  <Form inline>
      <FormControl type="text" placeholder="Search friends" className="mr-sm-2" />
      <Button variant="outline-info bg-light"className='mt-sm-4 ml-sm-3'>Search</Button></Form>
                  </Col>
                  <Col className='text-light pt-4 pl-5 mt-5 ml-5'>
                      @{this.isAuthenticated().user.userName}
                  </Col>
              </div>
          </div>
            </header>
            <body>
                <div className='container bg-info'>
                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col-8">
                        <br />
                        <br />
                        <br />
                        <br />
                            {this.state.image.map((a)=>{
               return <><Card>
  <Card.Img variant="top" src={a.imageSrc} />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text className='text-black-50'>
        {a.alt}
    </Card.Text>
    <Button variant="primary">like</Button>
  </Card.Body>
</Card></>            })}
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </body>
            <footer className="container bg-dark foot fixed-bottom">
                {/* <div > */}
                    {/* <div className="row"> */}
                      ? <button type='submit' className='btn btn-light bg-info mt-4' 
                      onClick={()=>this.setState({postModalShow:true})}>Add Photo</button>
                      <Post show={this.state.postModalShow} onHide={postModalClose} />
                       <button type='submit' className='btn btn-light bg-info mt-4'>View Profile</button>
                       {/* </div> */}
                       {/* <div className='col-1'> */}
                       <button type='submit' className='btn btn-light bg-info m-4' onClick={this.signout} style={{"float":'right'}}>Sign Out</button>
                       {/* </div> */}
                    {/* </div> */}
                {/* </div> */}
            </footer>
        </div>
     }
}