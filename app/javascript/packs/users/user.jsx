import React from 'react'
import Status from '../statuses/status'
import {Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class User extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      user: {
        username: '',
        url: '',
        avatar: '',
        note: '',
        instance: ''
      },
      statuses: [],
      fetching: false
    }
  }

  componentWillMount() {
    this.fetchUser();
    this.fetchStatuses();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.route.match.params.id !== this.props.route.match.params.id) {
      this.fetchUser(nextProps.route.match.params.id);
    }
  }

  render(){
    console.log(this.state)
    var statuses
    if(this.state.statuses.length > 0){
     statuses = this.state.statuses.map((status) => (<Status key={status.uri} status={status} />))
    }
    if(this.props.current_user.instance === this.state.user.instance && this.props.current_user.username === this.state.user.username){
      var fetchButton = <RaisedButton
        icon={mastodon_svg}
        label='Mastodonからデータを取得'
        onTouchTap={this.onClickFetchData.bind(this)}
        fullWidth={true}
        primary={true}
        disabled={this.state.fetching}
      />
    }
    var mastodon_svg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" height="23px" width="23px"><path d="M500 0a500 500 0 0 0-353.553 146.447 500 500 0 1 0 707.106 707.106A500 500 0 0 0 500 0zm-.059 280.05h107.12c-19.071 13.424-26.187 51.016-27.12 73.843V562.05c0 44.32-35.68 80-80 80s-80-35.68-80-80v-202c0-44.32 35.68-80 80-80zm-.441 52c-15.464 0-28 12.537-28 28 0 15.465 12.536 28 28 28s28-12.535 28-28c0-15.463-12.536-28-28-28zm-279.059 7.9c44.32 0 80 35.68 80 80v206.157c.933 22.827 8.049 60.42 27.12 73.842H220.44c-44.32 0-80-35.68-80-80v-200c0-44.32 35.68-80 80-80zm559.12 0c44.32 0 80 35.68 80 80v200c0 44.32-35.68 80-80 80H672.44c19.071-13.424 26.187-51.016 27.12-73.843V419.95c0-44.32 35.68-80 80-80zM220 392c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm560 0c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm-280.5 40.05c-15.464 0-28 12.537-28 28 0 15.465 12.536 28 28 28s28-12.535 28-28c0-15.463-12.536-28-28-28zM220 491.95c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zm560 0c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zM499.5 532c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zM220 591.95c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zm560 0c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28z" fill="#fff"/></svg>
    return(
      <div style={styles.container}>
        <Card className='user-card'>
          <div className='avatar'>
            <img src={this.state.user.avatar} />
          </div>
          <h1 className='name'>
            <span>{this.state.user.username}</span>
            <a style={{textDecoration: 'none'}} href={this.state.user.url} target='_blank'>
              <small><span>{`${this.state.user.username}@${this.state.user.instance}`}</span></small>
            </a>
          </h1>
          <div className='details'>
            <div className='bio' dangerouslySetInnerHTML={{__html: this.state.user.note}}></div>
            <div className='details-counters'>
              <div className='counter'>
                <span className='counter-label'>
                  ふぁぼられ
                </span>
                <span className='counter-number'>
                  {this.state.user.favoured_count}
                </span>
              </div>
              <div className='counter'>
                <span className='counter-label'>
                  ブーストられ
                </span>
                <span className='counter-number'>
                  {this.state.user.reblogged_count}
                </span>
              </div>
            </div>
          </div>
        </Card>
        {fetchButton}
        <div>
          {statuses}
        </div>
      </div>
    )
  }

  _userId(){
    return this.props.route.match.params.id
  }

  onClickFetchData(){
    this.setState({fetching: true})
    fetch(`/api/v1/users/${this._userId()}/fetch`,{
      method: 'post',
      body: JSON.stringify({})
    }).then((response) =>{ return response.json()}
    ).then((json) => {
      this.fetchStatuses();
      this.setState({fetching: false});
      alert('データの取得が完了しました :)')
    })
  }

  fetchStatuses(){
    fetch(`/api/v1/users/${this._userId()}/statuses`).then(
      (response) =>{ return response.json() }
    ).then((json) => {
      this.setState({statuses: json})
    })
  }

  fetchUser(user_id){
    fetch(`/api/v1/users/${this._userId()}`).then(
      (response) =>{ return response.json() }
    ).then((json) => {
      this.setState({user: json})
    })
  }

  //getCSRFToken() {
  //  const metas = document.getElementsByTagName('meta');
  //  for (let i = 0; i < metas.length; i++) {
  //    const meta = metas[i];
  //    if (meta.getAttribute('name') === 'csrf-token') {
  //      return meta.getAttribute('content');
  //    }
  //  }
  //  return null;
  //}

}

var styles = {
  container: {
    width: '700px',
    margin: '0 auto',
    marginTop: '40px',
  },
}

export default User;
