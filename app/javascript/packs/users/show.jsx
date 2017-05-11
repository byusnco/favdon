import React from 'react'
import Status from '../statuses/show'
import {Card} from 'material-ui/Card';

class UsersShow extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      user: {
        username: '',
        url: '',
        avatar: '',
        note: ''
      },
      statuses: []
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
    return(
      <div style={styles.container}>
        <Card style={styles.author}>
          <div style={styles.avatar}>
            <img style={styles.image} src={this.state.user.avatar} />
          </div>
          <a style={{textDecoration: 'none'}} href={this.state.user.url} target='_blank'>
            <h1 style={styles.name}>
              <span>{this.state.user.username}</span>
              <small style={styles.account}><span>{`${this.state.user.username}@${this.state.user.instance}`}</span></small>
            </h1>
          </a>
          <div style={styles.detail}>
            <div style={styles.bio} dangerouslySetInnerHTML={{__html: this.state.user.note}}></div>
            <div style={styles.counters}>
              <div style={styles.favourites}>
                {this.state.user.favoured_count}
              </div>
              <div style={styles.reblogs}>
                {this.state.user.reblogged_count}
              </div>
            </div>
          </div>
          <button onClick={this.onClickFetchData.bind(this)}>fetch</button>
        </Card>
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
    fetch(`/api/v1/users/${this._userId()}/fetch`,{
      method: 'post',
      body: JSON.stringify({})
    }).then((response) =>{ return response.json()}
    ).then((json) => {
      this.fetchStatuses();
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
  author: {
    background: '#fff',
    backgroundSize: 'cover',
    padding: '60px 0',
    paddingBottom: '0',
    borderRadius: '4px 4px 0 0',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    position: 'relative',
  },
  avatar: {
    width: '120px',
    margin: '0 auto',
    marginBottom: '15px',
    position: 'relative',
    zIndex: '2',
  },
  image: {
    width: '120px',
    height: '120px',
    display: 'block',
    borderRadius: '120px',
  },
  name: {
    display: 'block',
    fontSize: '20px',
    lineHeight: '27px',
    color: '#777777',
    fontWeight: '500',
    textAlign: 'center',
    position: 'relative',
    zIndex: '2',
  },
  account: {
    display: 'block',
    fontSize: '14px',
    color: '#2b90d9',
    fontWeight: '400'
  }
}

export default UsersShow;
