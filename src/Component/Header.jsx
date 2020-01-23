import React,{Component} from 'react';
import logo from './Images/photonova.png'
import main from './Images/11.jpg'
import {Login} from './Login'
import Signup from './Signup'
import {Container,Row,Col} from 'react-bootstrap'
import './css/header.css'
import { Redirect } from 'react-router-dom';
export default class Header extends Component{
    constructor(props){
        super(props);
        let loggedIn = false
        const token = localStorage.getItem('jwt')
        if(token!=null){
            loggedIn=true;
        }
        this.state={loginModalShow:false,signupModalShow:false,loggedIn}
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
    signupModalTrigger = () =>{
        this.setState({
            loginModalShow:false,
            signupModalShow:true
        })

    }
    
    loginModalTrigger = () =>{
        // console.log("yo")
        this.setState({
            signupModalShow:false,
            loginModalShow:true
        })
    }

    render(){
        if(this.state.loggedIn)
        return <Redirect to='/home'></Redirect>
        let loginModalClose = () =>this.setState({loginModalShow:false});
        let signupModalClose = () =>this.setState({signupModalShow:false});
        return (
            <div>
                <header>
                <Container className=" bg-dark head">
              <Row>
                <Col xs={6}>
                  <a href="/"> <img src={logo} width="150" height="100" margin="0" alt="alterate text" /></a>
                  </Col>
                  {!this.isAuthenticated() && (
                      <div className="col-6">
                      <ul className="list">
                        <li><button type="submit" className="btn btn-light bg-info" onClick={()=>this.setState({loginModalShow:true})}>Log In</button>
                        <Login show={this.state.loginModalShow}
                         onHide={loginModalClose} signupModalTrigger={this.signupModalTrigger}/></li>
                        <li><button type="submit" className="btn btn-light bg-info" onClick={()=>this.setState({signupModalShow:true})}>Sign Up</button>
                        <Signup show={this.state.signupModalShow}
            onHide={signupModalClose} loginModalTrigger={this.loginModalTrigger}/></li>
                      </ul>
                      </div>
                  )}
              </Row>
          </Container>
            </header>
            <body>
            <Container className='bg'>
        <Row>
          <Col lg={6} xs={2}className="ml-2 mr-2">
            <a href="/"> <img className="image" src={main} alt="alterate text" /></a>
          </Col>
          <div className="col-xs gly">
              <div class="StaticLoggedOutHomePage-communicationContent">
                  <div class="StaticLoggedOutHomePage-communicationItem">
                      <span class="glyphicon-glyphicon-user">&#x1F464;&nbsp; </span> Follow your interests.
                  </div>
                  <div class="StaticLoggedOutHomePage-communicationItem">
                      <span class="glyphicon glyphicon-home">&#x1F4F7;&nbsp; </span> Capture your moments.
                  </div>
                  <div class="StaticLoggedOutHomePage-communicationItem">
                      <span class="glyphicon">&#x2764;&nbsp; </span> Talk your heart out.
                   </div>
                </div>
           </div>
        </Row>
      </Container>
            </body>
            <footer>
            <div className="container bg-dark foot" id="foot">
        <div className="row">
            <div className="col">
                <h4>Contact Us:  </h4>
                <div>
                    <h5>Email</h5>
                        <ul>
                            <li>srishtic00&#64;gmail.com<span className="glyphicon glyphicon-envelope"> &nbsp;&#x2709;</span></li>
                            <li>keshavdhingra0103&#64;gmail.com<span className="glyphicon"> &nbsp;&#x2709;</span></li>
                        </ul> 
                   
                </div>
            </div>
            <div className="col">
               <p className="para"> &copy;Copyright 2019. All rights reserved.</p>
            </div>
        </div>
    </div>
            </footer>
            </div>
            
           
          );
    }
}