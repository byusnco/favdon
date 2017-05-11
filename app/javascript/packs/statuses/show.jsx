import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card';

class Status extends React.Component{

  render(){
    return(
      <Card>
        <div dangerouslySetInnerHTML={{__html: this.props.status.content}}></div>
        <div>Fav: {this.props.status.favourites_count}</div>
        <div>Boost: {this.props.status.reblogs_count}</div>
      </Card>
    )
  }

}

export default Status
