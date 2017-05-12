// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link, Match } from 'react-router-dom'
import User from './users/user'
import Home from './home'
import {getMuiTheme, MuiThemeProvider} from 'material-ui/styles'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Dialog from 'material-ui/Dialog'
import Help from 'material-ui/svg-icons/action/help'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Cookies from 'js-cookie'

injectTapEventPlugin();

class Favdon extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      help: false,
      logged_in: Cookies.get('current_user_id')
    }
  }

  render(){
    var help = (
      <div>
        <h2>Fav丼について</h2>
        <ul>
          <li>当サービスはbyus&co.ltdの代表<a href='http://trickle.ink/@foloinfo' target='_blank'>@foloinfo</a>によって半ば趣味的に開発されている、α版の試験運用中サービスです。問題は避けるように努めますが、予期せぬバグなどがある場合があります。</li>
          <li>当サービスの利用によって生じた不利益など、責任は負いかねますので予めご了承の上ご利用下さい。</li>
          <li>Fav丼はGNUライセンスの元OSSとして開発しています。ご自身のサーバで動かす改造するなど、ご自由にご利用下さい。（drip.inkへのリンクを何処かに貼ってもらえたりするとうれしいです）</li>
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
    var logoutNavigation
    if(this.state.logged_in){
      logoutNavigation = (
        <FloatingActionButton
          backgroundColor='#fff'
          children={<PowerSettingsNew />}
          iconStyle={{width: '56px', height: '56px', fill: '#999'}}
          style={{position: 'fixed', right: '50px', bottom: '190px'}}
          onTouchTap={ this.logout.bind(this) }
        />
      )
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={(route) => (<Home route={route}/>) } />
              <Route exact path="/users/:id" component={(route) => (<User route={route} />) } />
            </Switch>
            {logoutNavigation}
            <FloatingActionButton
              backgroundColor='#fff'
              children={<Help />}
              iconStyle={{width: '56px', height: '56px', fill: '#999'}}
              style={{position: 'fixed', right: '50px', bottom: (this.state.logged_in ? '120px' : '50px')}}
              onTouchTap={()=>this.setState({help: true})}
            />
            <Dialog
              children={help}
              open={this.state.help}
              onRequestClose={()=>this.setState({help: false})}
              autoScrollBodyContent={true}
            />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }

  logout(){
    // remove all cookies
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    location.href = '/'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Favdon />,
    document.body.appendChild(document.createElement('div')),
  )
})
