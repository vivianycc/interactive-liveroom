import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Streaming from "./Streaming";
import ToggleButtons from "./ToggleButtons";
import LiveChatUI from "./LiveChatUI";
import WelcomeEffect from "./WelcomeEffect";
import Marquee from "./Marquee";
import PublicMarquee from "./PublicMarquee";
import BulletText from "./BulletText";
import BulletTracks from "./BulletTracks";


const StyledApp = styled.div`
display: flex;
height: 100vh;
overflow:hidden;

main {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: var(--black95);
}

aside {
  flex: 1;
  height: 100%;
  background-color: var(--black);
  padding:1rem;
  color:var(--lightGrey1);
  display:flex;
  flex-direction:column;
  >p{
    margin-top:16px;
    margin-bottom:32px;
  }
  summary{
    margin-bottom:16px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    input{
      position:absolute;
      right:0;
    }
  }
  .option-input{
    display:flex;
    align-items:baseline;
    justify-content:space-between;
    margin:8px 0;
    label{
      color:var(--grey2);
      flex-shrink:0;
      margin-right:4px;
    }
    input{
      flex:1 1 10px;
      background-color:var(--grey1);
      border-radius:4px;
      color:var(--roseBrown);
      padding:4px 8px;
      text-align:center;
      font-weight:bold;
    }
  }
}
`;


const phones = [
  {
    phoneName: "iPhone 8",
    width: "375px",
    height: "667px",
    type: "iphone"
  },
  {
    phoneName: "iPhone 8 Plus",
    width: "414px",
    height: "736px",
    type: "iphone"
  },
  {
    phoneName: "iPhone 11",
    width: "375px",
    height: "812px",
    type: "iphoneX"
  },
  {
    phoneName: "Android",
    width: "360px",
    height: "640px",
    type: "android"
  },
];



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhone: 0,
      welcomeEffect: {
        show: true,
      },
      marquee: {
        show: true,
        duration: 5,
        content: "Congradulations to username122333 for ranking 1st in the leaderboard"
      },
      bulletText: {
        show: true,
        content: "",
        inputContent: "",
        queue: [],
        track1: [],
        track2: [],
        track3: [],
        track1Status: true,
        track2Status: true,
        track3Status: true,

      },
      publicMarquee: {
        show: true,
        duration: 10,
      },
      gift: {
        show: false,
      },
      comboGift: {
        show: false,
      },
      npc: {
        show: false,
      }
    };
  }

  handlePhoneSize = (phoneOption) => {
    this.setState({ currentPhone: phoneOption });
  };

  handleMarqueeDuration = (event) => {
    this.setState({ marquee: { ...this.state.marquee, duration: event.target.value } });
  }
  handlePublicMarqueeDuration = (event) => {
    this.setState({ publicMarquee: { ...this.state.publicMarquee, duration: event.target.value } });
  }
  handleMarqueeContent = (event) => {
    this.setState({ marquee: { ...this.state.marquee, content: event.target.value } });
  }
  handleBulletTextContent = (event) => {
    this.setState({ bulletText: { ...this.state.bulletText, inputContent: event.target.value } })
  }
  handleBulletSubmit = (event) => {
    event.preventDefault();
    const { bulletText } = this.state;
    const targetTrack = this.checkTrackStatus();
    const bullet = this.createBulletText(this.state.bulletText.inputContent,targetTrack)
    if (!targetTrack) {
          console.log("no track is available")
          this.setState({ bulletText: { ...bulletText, content: bulletText.inputContent, inputContent: "", queue: [...bulletText.queue, bullet] } })
        } else {
          console.log("this bullet goes to",targetTrack)
          this.setState({
            bulletText:{
              ...bulletText,
              content: bulletText.inputContent, 
              inputContent: "",
              [`track${targetTrack}`]:[...bulletText[[`track${targetTrack}`]],bullet],
              [`track${targetTrack}Status`]:false,
            }
          })
          this.timerChangeStatus(targetTrack);
        }
      
  }

  checkTrackStatus = () => {
    const { track1Status, track2Status, track3Status } = this.state.bulletText;
    const trackStatus = [track1Status, track2Status, track3Status];
    const isNotAvailable = (currentTrack) => currentTrack == false;
    if (trackStatus.every(isNotAvailable)) {
      return false;
    } else {
      const availableTracks = trackStatus.map((currentTrack,index) =>currentTrack?index+1:-1).filter(currentNumber=>currentNumber>=0);
      const randomTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)];
      return randomTrack
    }
  }

  timerChangeStatus = (order) => {
    setTimeout(() => {
      const {bulletText}=this.state;
      this.setState({bulletText:{...bulletText,[`track${order}Status`]:true}})
    }, 5000)
  }
  createBulletText = (bulletContent,targetTrack) => {
    return <BulletText content={bulletContent} key={new Date().getTime()} target={targetTrack} destroyBulletText={this.destroyBulletText} />
  }

  destroyBulletText = (targetTrack) => {
    const { bulletText } = this.state;
    let track = [...bulletText[[`track${targetTrack}`]]];
    let newTrack = (track.length>1)?[track.shift()]:[];
    this.setState({ bulletText: { ...bulletText, [`track${targetTrack}`]:newTrack} })

  }


  render() {
    const { currentPhone, marquee, publicMarquee, welcomeEffect, bulletText } = this.state;
    return (
      <StyledApp>
        <main>
          <div
            className="phone"
            style={{
              width: phones[currentPhone].width,
              height: phones[currentPhone].height,
            }}
          >
            <div className="app">

              <Streaming />
              <LiveChatUI type={phones[currentPhone].type}>
                {publicMarquee.show && <PublicMarquee duration={publicMarquee.duration} />}
                {welcomeEffect.show && <WelcomeEffect level="Diamond" />}
                {marquee.show && <Marquee duration={marquee.duration} content={marquee.content} />}
                <BulletTracks order={1} status={bulletText.track1Status} >
                  {bulletText.track1}
                </BulletTracks>
                <BulletTracks order={2} status={bulletText.track2Status} >
                  {bulletText.track2}
                </BulletTracks>
                <BulletTracks order={3} status={bulletText.track3Status} >
                  {bulletText.track3}
                </BulletTracks>
              </LiveChatUI>
            </div>
          </div>
          <ToggleButtons
            name={"phone-sizes"}
            options={phones.map((phone) => phone.phoneName)}
            handlePhone={this.handlePhoneSize}
            selected={currentPhone}
          />
        </main>
        <aside>
          <p class="t-title1">A interactive demo - live video streaming UI</p>
          <p class="t-body1">The purpose of the demo is to show how the animation of different elements interact with each other. A better design decision can therefore be made when we see everything happen at the same time</p>
          <details className="control-options welcome-effect-options" open>
            <summary>Enter Effect
                <input id="welcome-effect"
                type="checkbox"
                checked={welcomeEffect.show}
                onChange={() => this.setState({ welcomeEffect: { ...welcomeEffect, show: !welcomeEffect.show } })
                } />
            </summary>
          </details>
          <details className="control-options marquee-effect-options" open>
            <summary>Marquee
                <input id="marquee-effect"
                type="checkbox"
                checked={marquee.show}
                onChange={() => this.setState({ marquee: { ...marquee, show: !marquee.show } })}
              />
            </summary>

            <div className="option-input">
              <label className="t-body2" htmlFor="marquee-duration">Duration(s)</label>
              <input id="marquee-duration" type="text" value={marquee.duration} onChange={this.handleMarqueeDuration} />
            </div>
            <div className="option-input">
              <label className="t-body2" htmlFor="marquee-content">Content</label>
              <input id="marquee-content" type="text" value={marquee.content} onChange={this.handleMarqueeContent} />
            </div>
          </details>

          <details className="control-options public-marquee-options" open>
            <summary>Platform Marquee
                <input id="public-marquee-effect"
                type="checkbox"
                checked={publicMarquee.show}
                onChange={() => this.setState({ publicMarquee: { ...publicMarquee, show: !publicMarquee.show } })} />
            </summary>
            <div className="option-input">
              <label className="t-body2" htmlFor="public-marquee-duration">Duration(s)</label>
              <input id="public-marquee-duration" type="text" value={publicMarquee.duration} onChange={this.handlePublicMarqueeDuration} />
            </div>

          </details>

          <details className="control-options bullet-text-options" open>
            <summary>Bullet Text
                <input id="bullet-text-effect"
                type="checkbox"
                checked={bulletText.show}
                onChange={() => this.setState({ bulletText: { ...bulletText, show: !bulletText.show } })}
              />
            </summary>
            <div className="option-input">
              <form onSubmit={this.handleBulletSubmit}>
                <label className="t-body2" htmlFor="bullet-text-content">Content</label>
                <input id="bullet-text-content" type="text" value={bulletText.inputContent} onChange={this.handleBulletTextContent} />
                <input type="submit" value="Send" />
              </form>
            </div>
          </details>

        </aside>
      </StyledApp>

    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
