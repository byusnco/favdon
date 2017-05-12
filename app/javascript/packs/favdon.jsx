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
          style={{position: 'fixed', right: '50px', bottom: '190px', zIndex: 999}}
          onTouchTap={this.logout.bind(this)}
        />
      )
    }
    var github = <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 47.999998 48.000002" width="30" height="30"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-216.625" y1="-385.75" x2="-215.918" y2="-385.043"><stop offset="0" id="stop6" stop-color="#dedfe3"/><stop offset=".174" id="stop8" stop-color="#d8d9dd"/><stop offset=".352" id="stop10" stop-color="#c9cacd"/><stop offset=".532" id="stop12" stop-color="#b4b5b8"/><stop offset=".714" id="stop14" stop-color="#989a9c"/><stop offset=".895" id="stop16" stop-color="#797c7e"/><stop offset="1" id="stop18" stop-color="#656b6c"/></linearGradient><path class="st0" d="M23.928 1.15C11 1.15.514 11.638.514 24.566c0 10.343 6.75 19.105 15.945 22.265 1.148.144 1.58-.574 1.58-1.15v-4.02c-6.465 1.436-7.902-3.16-7.902-3.16-1.005-2.73-2.586-3.45-2.586-3.45-2.154-1.435.144-1.435.144-1.435 2.298.144 3.59 2.442 3.59 2.442 2.156 3.59 5.46 2.586 6.753 2.01.142-1.58.86-2.585 1.435-3.16-5.17-.574-10.63-2.585-10.63-11.635 0-2.585.862-4.596 2.442-6.32-.287-.575-1.005-3.017.288-6.177 0 0 2.01-.574 6.464 2.442 1.866-.574 3.877-.718 5.888-.718 2.01 0 4.022.286 5.89.717 4.453-3.016 6.464-2.442 6.464-2.442 1.293 3.16.43 5.602.287 6.177a9.29 9.29 0 0 1 2.44 6.32c0 9.05-5.458 10.918-10.63 11.492.863.718 1.58 2.155 1.58 4.31v6.464c0 .574.432 1.292 1.58 1.15 9.338-3.16 15.946-11.924 15.946-22.266-.143-12.785-10.63-23.27-23.558-23.27z" id="path20" clip-rule="evenodd" fill="#191717" fill-rule="evenodd"/></svg>
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
              style={{position: 'fixed', right: '50px', bottom: (this.state.logged_in ? '120px' : '50px'), zIndex: 999}}
              onTouchTap={()=>this.setState({help: true})}
            />
            <Dialog
              children={help}
              open={this.state.help}
              onRequestClose={()=>this.setState({help: false})}
              autoScrollBodyContent={true}
            />
            <FloatingActionButton
              backgroundColor='#fff'
              children={github}
              style={{position: 'fixed', right: '50px', top: '25px', zIndex: 999}}
              href='https://github.com/byusnco/favdon'
              target='_blank'
              mini={true}
            />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }

  logout(){
    var res = confirm('ログアウトしますか？')
    if(res){
      window.location.href = '/logout'
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Favdon />,
    document.body.appendChild(document.createElement('div')),
  )
})
