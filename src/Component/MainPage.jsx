import React,{Component} from 'react'
import Header from './Header'
import Home from './Home'
import {Route} from 'react-router-dom'
import {Switch} from 'react-router-dom'
export default  class MainPage extends Component{
    render(){     
        return(
            <Switch>
                <Route exact path="/" component={Header} />
                <Route  exact path="/home" component={Home} />
            </Switch>
        )
    }
}