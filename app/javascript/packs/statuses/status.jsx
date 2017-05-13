import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import Star from 'material-ui/svg-icons/toggle/star'
import Repeat from 'material-ui/svg-icons/av/repeat'
import {Link} from 'react-router-dom'
import * as moment from 'moment'

class Status extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      favourites_color: this.counterColor(props.status.favourites_count),
      reblogs_color: this.counterColor(props.status.reblogs_count)
    }
  }

  render(){
    return(
      <Card className='status-card'>
        <div className='header'>
          <Link to={`/users/${this.props.status.user.id}`}>
            <div className='avatar'>
              <div className='image' style={{backgroundImage: `url('${this.props.status.user.avatar}')`}} />
            </div>
          </Link>
          <div className='name'>
            <a href={this.props.status.user.url} target='_blank' style={{textDecoration: 'none'}}>
              {this.props.status.user.uid}
            </a>
          </div>
          <div className='relative-time'>
            <a href={this.props.status.url} target='_blank'  style={{textDecoration: 'none'}}>
              {this.props.status.status_created_at ? moment(this.props.status.status_created_at).fromNow() : ''}
            </a>
          </div>
        </div>
        <a href={this.props.status.url} target='_blank'  style={{textDecoration: 'none'}}>
          <div className='content' dangerouslySetInnerHTML={{__html: this.props.status.content}}></div>
        </a>
        <div className='details'>
          <div className='details-counters'>
            <div className='counter'>
              <div className='counter-label'>
                <Star color={'rgb(241, 212, 6)'}/>
              </div>
              <div className='counter-number' style={{color: this.state.favourites_color}}>
                {this.props.status.favourites_count}
              </div>
            </div>
            <div className='counter'>
              <div className='counter-label'>
                <Repeat color={'rgb(43, 144, 217)'}/>
              </div>
              <div className='counter-number' style={{color: this.state.reblogs_color}}>
                {this.props.status.reblogs_count}
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  counterColor(count){
    if(count === 1){
      return '#000'
    }else if(count === 2){
      return '#339966'
    }else if(count === 3 || count === 4){
      return '#993366'
    }else if(count >= 5){
      return '#f00'
    }
  }

}

export default Status;
