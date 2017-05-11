// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, Match } from 'react-router-dom'
import UsersShow from './users/show'
import Home from './home'
import {getMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

class Favdon extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      name: this.props.name
    }
  }

  render(){
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Router>
          <Switch>
            <Route exact path="/" component={(route) => (<Home route={route}/>) } />
            <Route exact path="/users/:id" component={(route) => (<UsersShow route={route}/>) } />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Favdon name="World" />,
    document.body.appendChild(document.createElement('div')),
  )
})
