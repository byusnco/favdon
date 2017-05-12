import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Star from 'material-ui/svg-icons/toggle/star'
import Help from 'material-ui/svg-icons/action/help'
import Dialog from 'material-ui/Dialog'
import { Link } from 'react-router-dom'

class Home extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      help: false
    }
  }

  render(){
    var help = (
      <div>
        <h2>Fav丼について</h2>
        <ul>
          <li>当サービスはbyus&co.ltdの代表<a href='http://trickle.ink/@foloinfo' target='_blank'>@foloinfo</a>によって半ば趣味的に開発されている、α版の試験運用中サービスです。問題は避けるように努めますが、予期せぬバグなどがある場合があります。</li>
          <li>当サービスの利用によって生じた不利益など、責任は負いかねますので予めご了承の上ご利用下さい。</li>
          <li>Fav丼はGNUライセンスの元OSSとして開発しています。ご自身のサーバで動かす改造するなど、ご自由にご利用下さい。（drip.inkへのリンクを何処かに貼ってもらえたりするるとうれしいです）</li>
          <li>バグを発見した場合、セキュリティ的な指摘、機能要望など、GithubのIssueでご報告下さい。(Pull-req大歓迎です)</li>
        </ul>
        <ul>
        <h2>使い方</h2>
          <li>Masotodonでログイン後、データ取得ボタンを押すとFav / Boostされたtootが取得されます（試験中のため最近の400件に限定してます）。</li>
          <li>累計Fav数、累計Boost数、1件以上のFav/Boostが付いたtootが、合算した件数順に閲覧できます。</li>
          <li><Link to={'/users/1'}>サンプルはこちら</Link></li>
        </ul>
      </div>
    )
    var mastodon_svg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" height="23px" width="23px"><path d="M500 0a500 500 0 0 0-353.553 146.447 500 500 0 1 0 707.106 707.106A500 500 0 0 0 500 0zm-.059 280.05h107.12c-19.071 13.424-26.187 51.016-27.12 73.843V562.05c0 44.32-35.68 80-80 80s-80-35.68-80-80v-202c0-44.32 35.68-80 80-80zm-.441 52c-15.464 0-28 12.537-28 28 0 15.465 12.536 28 28 28s28-12.535 28-28c0-15.463-12.536-28-28-28zm-279.059 7.9c44.32 0 80 35.68 80 80v206.157c.933 22.827 8.049 60.42 27.12 73.842H220.44c-44.32 0-80-35.68-80-80v-200c0-44.32 35.68-80 80-80zm559.12 0c44.32 0 80 35.68 80 80v200c0 44.32-35.68 80-80 80H672.44c19.071-13.424 26.187-51.016 27.12-73.843V419.95c0-44.32 35.68-80 80-80zM220 392c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm560 0c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm-280.5 40.05c-15.464 0-28 12.537-28 28 0 15.465 12.536 28 28 28s28-12.535 28-28c0-15.463-12.536-28-28-28zM220 491.95c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zm560 0c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zM499.5 532c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zM220 591.95c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28zm560 0c-15.464 0-28 12.535-28 28 0 15.463 12.536 28 28 28s28-12.537 28-28c0-15.465-12.536-28-28-28z" fill="#fff"/></svg>
    return(
      <div>
        <div style={styles.container}>
          <h1 style={styles.title}>
            <Star style={styles.fav} color={'rgb(241, 212, 6)'}/>
            Fav丼(α)
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
        <FloatingActionButton
          backgroundColor='#fff'
          children={<Help />}
          iconStyle={{width: '56px', height: '56px', fill: '#999'}}
          style={{position: 'absolute', right: '50px', bottom: '50px'}}
          onTouchTap={()=>this.setState({help: true})}
        />
        <Dialog
          children={help}
          open={this.state.help}
          onRequestClose={()=>this.setState({help: false})}
          autoScrollBodyContent={true}
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
  },
  details: {
    marginTop: '50px'
  }
}

export default Home;
