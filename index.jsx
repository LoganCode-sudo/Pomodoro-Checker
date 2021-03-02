const audio = document.getElementById("beep");

class App extends React.Component{
  constructor(props){
    super(props);
    this.loop= undefined;
  }
  state={
    breakCounter:5,
    sessionCounter:25,
    clockCount:25*60,
    currentTime:"Session",
    isPlaying:false
  }
  
  componentWillUnmount(){
    clearInterval(this.loop);
  };
  
  handlePlay =()=>{
    const { isPlaying } = this.state;
    
    if(isPlaying){
      clearInterval(this.loop);
      this.setState({
        isPlaying:false
      });
      
    }else{
      this.loop = setInterval(()=>{
        const { clockCount, currentTime, breakCounter, sessionCounter } = this.state;
        
        if(clockCount === 0){
          this.setState({
            currentTime: currentTime ==="Session"? "Break" : "Session",
            clockCount:currentTime==="Session"? breakCounter*60 :sessionCounter*60
          })
          audio.currentTime= 0;
          audio.play();
          this.setState({
            isPlaying:true
        });
        }else{
          this.setState({
            clockCount:clockCount -1
          });
        }
        
      },1000);
      
      this.setState({
        isPlaying:true
      });
    }
    
  };
  
  handleReset =()=>{
    this.setState({
      breakCounter:5,
      sessionCounter:25,
      clockCount:25*60,
      currentTime:"Session",
      isPlaying:false,
    });
    clearInterval(this.loop);
    
    audio.pause();
    audio.currentTime= 0;
  };
  
  handleBreakAdd=()=>{
    const { breakCounter,isPlaying, currentTime } =this.state;
    
    if(breakCounter <60){
      
      if(!isPlaying && currentTime==="Break"){
        this.setState({
          breakCounter:breakCounter +1,
          clockCount: (breakCounter +1) *60
        })
      }else{
        this.setState({
          breakCounter:breakCounter +1
        })
      }
    }
    
  };
  
  handleBreakSub=()=>{
    const { breakCounter,isPlaying, currentTime } =this.state;
    if(breakCounter > 1){
      if(!isPlaying && currentTime==="Break"){
        this.setState({
          breakCounter:breakCounter -1,
          clockCount: (breakCounter -1) *60
        })
      }else{
        this.setState({
          breakCounter:breakCounter -1
        })
      }
    }
  };
  
  handleSessionAdd=()=>{
    const { sessionCounter,isPlaying, currentTime } = this.state;
    
    if(sessionCounter <60){
      if(!isPlaying && currentTime==="Session"){
        this.setState({
          sessionCounter:sessionCounter +1,
          clockCount: (sessionCounter +1) *60
        })
      }else{
        this.setState({
          sessionCounter:sessionCounter +1
        })
      }
    }
    
  };
  
  handleSessionSub=()=>{
    const { sessionCounter,isPlaying, currentTime } = this.state;
    if(sessionCounter >1){
      if(!isPlaying && currentTime==="Session"){
        this.setState({
          sessionCounter:sessionCounter -1,
          clockCount: (sessionCounter -1) *60
        })
      }else{
        this.setState({
          sessionCounter:sessionCounter -1
        })
      }
    }
  };
 
  convertTime =(count)=>{
    let mins = Math.floor(count/60);
    let secs = count%60;
    
    mins = mins < 10 ? "0"+mins : mins;
    secs = secs < 10 ? "0"+secs : secs;
      
    return`${mins}:${secs}`;
  }
  
  
  render(){
    const { breakCounter, sessionCounter, clockCount, currentTime, isPlaying}= this.state;
    
    const breakProps ={
      title:"Break",
      counter:breakCounter,
      handleMinus:this.handleBreakSub,
      handlePlus:this.handleBreakAdd
    }
    const sessionProps ={
      title:"Session",
      counter:sessionCounter,
      handleMinus:this.handleSessionSub,
      handlePlus:this.handleSessionAdd
    }
    
    return(
      <div>
        
        <div className="box">
          <Timer {...breakProps}/>
          <Timer {...sessionProps}/>
        </div>
        
        <div className="clock">
          <h1 id="timer-label">{currentTime}</h1>
          <span id="time-left">{this.convertTime(clockCount)}</span>
          
          <div className="box">
            <button id="start_stop" onClick={this.handlePlay}>
              <i className={`fas fa-${isPlaying ? "pause" : "play"}`}/>
            </button>
            
            <button id="reset" onClick={this.handleReset}>
              <i className="fas fa-sync"/>
            </button>
          </div>
        </div>
        
      </div>
    )
  };
};

const Timer =(props)=>{
  const ids = props.title.toLowerCase();
  return (
  <div className="timer">
    <h2 id={`${ids}-label`}>{props.title} Length</h2>
      <div className="box container">
        
        <button id={`${ids}-decrement`} onClick={props.handleMinus}>
          <i className="fas fa-minus"/>
        </button>
        
        <span id={`${ids}-length`}>{props.counter}</span>
        
        <button id={`${ids}-increment`} onClick={props.handlePlus}>
          <i className="fas fa-plus"/>
        </button>
        
      </div>
  </div>
  )
};

ReactDOM.render(<App />, document.getElementById("App"));
