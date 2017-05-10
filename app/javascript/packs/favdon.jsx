// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Favdon extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      name: this.props.name
    }
  }

  render(){
    return (
      <div>Hello {this.state.name}!</div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Favdon name="World" />,
    document.body.appendChild(document.createElement('div')),
  )
})
