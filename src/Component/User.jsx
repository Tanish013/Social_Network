import React,{Component} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import {Form,FormControl,Button} from 'react-bootstrap'
import logo from './Images/photonova.png'
export default class Users extends Component{
    render () {
        return (<>
          <header>
            <Container className=" bg-dark head">
                <Row>
                    <Col lg={5}>
                    <a href="/"> <img src={logo} width="150" height="100" margin="0" alt="alterate text" /></a>
                    </Col>
                    <Col lg={5}>
                  <Form inline>
      <FormControl type="text" placeholder="Search friends" className="mr-sm-2" />
      <Button variant="outline-info bg-light"className='mt-sm-4 ml-sm-3'>Search</Button></Form>
                  </Col>
                </Row>
            </Container>
            </header>
          <Container><Row><Col>User</Col></Row></Container>
        </>)
    }
} 