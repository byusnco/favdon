import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import Star from 'material-ui/svg-icons/toggle/star'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Repeat from 'material-ui/svg-icons/av/repeat'
import {Link} from 'react-router-dom'
import * as moment from 'moment'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Cookies from 'js-cookie'

class Status extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      favourites_color: this.counterColor(props.status.favourites_count),
      reblogs_color: this.counterColor(props.status.reblogs_count),
      loading_fav: false,
      faved: false,
      loading_reblog: false,
      reblogged: false
    }
  }

  render(){
    var favButton
    if(this.state.faved){
      favButton = <FloatingActionButton
        backgroundColor='#fff'
        children={<Star />}
        iconStyle={{width: '40px', height: '40px', fill: 'rgb(241,212,6)'}}
        style={styles.favButton}
        onTouchTap={this.onDestroyFav.bind(this)}
      />
    }else{
      favButton = <FloatingActionButton
        backgroundColor='#fff'
        children={<StarBorder />}
        iconStyle={{width: '40px', height: '40px', fill: '#999'}}
        style={styles.favButton}
        onTouchTap={this.onCreateFav.bind(this)}
      />
    }
    var reblogButton
    if(this.state.reblogged){
      reblogButton = <FloatingActionButton
        backgroundColor='#fff'
        children={<Repeat />}
        iconStyle={{width: '40px', height: '40px', fill: 'rgb(43, 144, 217)'}}
        style={styles.reblogButton}
        onTouchTap={this.onDestroyReblog.bind(this)}
      />
    }else{
      reblogButton = <FloatingActionButton
        backgroundColor='#fff'
        children={<Repeat />}
        iconStyle={{width: '40px', height: '40px', fill: '#999'}}
        style={styles.reblogButton}
        onTouchTap={this.onCreateReblog.bind(this)}
      />
    }

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
          <div className='actions'>
            {favButton}
            {reblogButton}
          </div>
        </div>
      </Card>
    )
  }

  onCreateFav(){
    this.setState({loading_fav: true})
    fetch(`/api/v1/statuses/${this.props.status.id}/favourite`,{
      headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` },
      method: 'post',
      body: JSON.stringify({})
    }).then((response) =>{ return response.json()}
    ).then((json) => {
      this.setState({
        faved: true,
        loading_fav: false
      })
      if(json.message){
        alert(json.message)
      }
    })
  }

  onDestroyFav(){
    this.setState({loading_fav: true})
    fetch(`/api/v1/statuses/${this.props.status.id}/unfavourite`,{
      headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` },
      method: 'post',
      body: JSON.stringify({})
    }).then((response) =>{ return response.json()}
    ).then((json) => {
      this.setState({
        faved: false,
        loading_fav: false
      })
      if(json.message){
        alert(json.message)
      }
    })
  }

  onCreateReblog(){
    this.setState({loading_reblog: true})
    fetch(`/api/v1/statuses/${this.props.status.id}/reblog`,{
      headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` },
      method: 'post',
      body: JSON.stringify({})
    }).then((response) =>{ return response.json()}
    ).then((json) => {
      this.setState({
        reblogged: true,
        loading_reblog: false
      })
      if(json.message){
        alert(json.message)
      }
    })
  }

  onDestroyReblog(){
    this.setState({loading_reblog: true})
    fetch(`/api/v1/statuses/${this.props.status.id}/unreblog`,{
      headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` },
      method: 'post',
      body: JSON.stringify({})
    }).then((response) =>{ return response.json()}
    ).then((json) => {
      this.setState({
        reblogged: false,
        loading_reblog: false
      })
      if(json.message){
        alert(json.message)
      }
    })
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

var styles = {
  favButton: {
    position: 'relative',
    right: '50px',
    bottom: '20px',
    zIndex: 998
  },
  reblogButton: {
    position: 'relative',
    right: '20px',
    bottom: '20px',
    zIndex: 998
  }
}

export default Status;
