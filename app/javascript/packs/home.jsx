import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Star from 'material-ui/svg-icons/toggle/star';

class Home extends React.Component{
  render(){
    var mastodon_svg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" height="23px" width="23px"><path d="M500 0a500 500 0 0 0-353.553 146.447 500 500 0 1 0 707.106 707.106A500 500 0 0 0 500 0zm-.059 280.05h107.12c-19.071 13.424-26.187 51.016-27.12 73.843V562.05c0 44.32-35.68 80-80 80s-80-35.68-80-80v-202c0-44.32 35.68-80 80-80zm-.441 52c-15.464 0-28 12.537-28 28 0 15.465 12.536 28 28 28s28-12.535 28-28c0-15.463-12.536-28-28-28zm-279.059 7.9c44.32 0 80 35.68 80 80v206.157c.933 22.827 8.049 60.42 27.12 73.842H220.44c-44.32 0-80-35.68-80-80v-200c0-44.32 35.68-80 80-80zm559.12 0c44.32 0 80 35.68 80 80v200c0 44.32-35.68 80-80 80H672.44c19.071-13.424 26.187-51.016 27.12-73.843V419.95c0-44.32 35.68-80 80-80zM220 392c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm560 0c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm-280.5 40.05c-15.464 0-28 12.537-28 28 0 15.465 12.536 28 28 28s28-12.535 28-28c0-15.463-12.536-28-28-28zM220 491.95c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zm560 0c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zM499.5 532c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zM220 591.95c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zm560 0c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28z" fill="#fff"/></svg>
    return(
      <div style={styles.container}>
        <h1 style={styles.title}>
          <Star style={styles.fav} color={'rgb(241, 212, 6)'}/>
          Fav丼
        </h1>
        <div style={styles.providedBy}>
          <a href='http://drip.ink' target='_blank' style={{color: '#999'}}>
            drip.ink
          </a>
          の提供でお送りします (*´∀｀*)
        </div>
        <RaisedButton
          icon={mastodon_svg}
          href='/auth/mastodon'
          label='Mastodonでログイン'
          fullWidth={true}
          primary={true}
        />
      </div>
    )
  }
}

var styles = {
  container: {
    width: '700px',
    position: 'fixed',
    textAlign: 'center',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  title: {
    fontSize: '100px',
    margin: 0,
  },
  fav: {
    height: '100px',
    width: '100px'
  },
  providedBy: {
    fontSize: '15px',
    marginBottom: '50px',
    color: '#999'
  }
}

export default Home;
