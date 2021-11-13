import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

export default class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userID:"",
      userName:"",
      tweets:[],
      userError:"",
      isLoading:false
    }
  }

  handleSearchUser=()=>{
    this.setState({
      userID:"",
      tweets:[],
      userError:""
    })
    this.setState({isLoading:true})
    fetch(`/api/twitter/${this.state.userName}`)
    .then((res) => res.json())
    .then((data) => 
    { 
      if(data.body.data.id)
      {
        this.setState({userID:data.body.data.id});
        fetch(`/api/tweets/${this.state.userID}`)
        .then((res) => res.json())
        .then((data) => {console.log(data.body.data)
        this.setState({tweets:data.body.data,isLoading:false})
        if(data.body.data){
        var ele = document.createElement('a');
        ele.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data.body.data)));
        ele.setAttribute('download', this.state.userName+'.json');
        ele.style.display = 'none';
        document.body.appendChild(ele);
        ele.click();
        document.body.removeChild(ele);
        }
        });
      }
      if(data.body.errors){
        this.setState({userError:"Oops! User does not exist.....",isLoading:false})
      }
    })
    .catch((error)=>{console.log(error)
    this.setState({userError:"Oops! User does not exist.....",isLoading:false})
  });
  }

  onInputchange=(event)=> {
    this.setState({
      userName: event.target.value
    });
  }

  render() {
    return (
    <>
          <div className="twitter-form">
            <input
              placeholder='Enter Username'
              name="userName"
              type='text'
              value={this.state.userName}
              onChange={(event)=>this.onInputchange(event)}
              className='twitter-input'
            />
            <button onClick={this.handleSearchUser} className='twitter-button'>
              Search User
            </button>
          </div>
          {this.state.isLoading?<div className="spinner"><Spinner animation="border" variant="light" size="md" /></div>:
          this.state.userID!==""?
            this.state.tweets?this.state.tweets.map(tweet=><div className="twitter-row" key={tweet.id}>{tweet.text}</div>):<div className="user-error">There are no Tweets</div>:
            <div className="user-error">{this.state.userError}</div>
          
        }
    </>
    )
  }
}