import {Component} from 'react'

import {v4} from 'uuid'
import './App.css'

const colorList = ['green', 'yellow', 'orange', 'red', 'blue']

class App extends Component {
    state={searchInput:"", isShown:false, websiteInput:"", usernameInput:"", passwordInput:"", passwordManagerList:[], isTrue:false}

    onClickShowPassword = event=>{
        if(event.target.checked){
            this.setState({isShown:true})
        } else{
            this.setState({isShown:false})
        }
    }
     
     onChangeSearchInput=event=>{
        this.setState({searchInput:event.target.value})
     }

      onChangeWebsiteInput=event=>{
        this.setState({websiteInput:event.target.value})
     }
     
     onChangeUsernameInput=event=>{
        this.setState({usernameInput:event.target.value})
     }

     onChangePasswordInput=event=>{
        this.setState({passwordInput:event.target.value})
     }

    

onAddPasswordManger=event=>{
    event.preventDefault()
    const{websiteInput, usernameInput, passwordInput}=this.state
    const initial=websiteInput.slice(0,1).toUpperCase()
    const backcolorName=colorList[Math.floor(Math.random()*5)]
    const newPasswordManger={
        id:v4(),
        initialName:initial,
        website:websiteInput,
        name:usernameInput,
        password:passwordInput,
        background:backcolorName
    }
    this.setState(prevState=>({passwordManagerList:[...prevState.passwordManagerList, newPasswordManger],
    websiteInput:"",
    usernameInput:"",
    passwordInput:"",
    isTrue:true,
    searchInput:"",
    }))

}

onDeleteButton=id=>{
        const {passwordManagerList}=this.state
        const newList=passwordManagerList.filter(passwordManager=>passwordManager.id!==id)
        const caseOff=passwordManagerList.length!==0
        this.setState({passwordManagerList:newList, isTrue:caseOff})
    }

    render(){
        const {passwordManagerList, websiteInput, usernameInput, passwordInput,isShown, searchInput}=this.state
        let {isTrue}=this.state
        const newList=passwordManagerList.filter(eachList=>eachList.websiteInput.toLowerCase().includes(searchInput.toLowerCase()))
        if(newListItem.length===0){
            isTrue=false
        }else{
            isTrue=true
        }
    return(
        <div className="bg-container">
        <img src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png" alt="app logo" className="app-logo"/>
        <div className="top-card-container">
        <img src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png alt" alt="password manager" className="password-manger"/>
        <form className="form" onSubmit={this.onAddPasswordManger}>
        <h1 className="heading">Add New Password</h1>
        <div className="website-input">
        <img src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png" alt="website" className="wediste-logo"/>
        <input type="text" className="input-value" value={websiteInput} onChange={this.onChangeWebsiteInput} placeholder="Enter Website"/>
        </div>
        <div className="website-input">
        <img src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png" alt="username" className="wediste-logo"/>
         <input type="text" className="input-value" value={usernameInput} onChange={this.onChangeUsernameInput} placeholder="Enter Username"/>
        </div>
        <div className="website-input">
        <img src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png" alt="password" className="wediste-logo"/>
         <input type="password" className="input-value" value={passwordInput} onChange={this.onChangePasswordInput} placeholder="Enter Passoword"/>
        </div>
        <button type="submit" className="button">Add</button>
        </form>
         <img src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png alt" alt="password manager" className="password-manger1"/>
        </div>
        <div className="bottom-card-container">
        <div className="password-search-container">
        <h1 className="password-count">Your Password <span className="span-count">{newList.length}</span></h1>
        <div className="website-input">
        <img src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png alt " alt="search" className="search-input"/>
        <input type="text" value={searchInput} className="search-input" placeholder="Search" onChange={this.onChangeSearchInput}/>
        </div>
        </div>
        <hr className="hr-line"/>
        <div className="show-password">
        <input type="checkbox" onChange={this.onClickShowPassword} id="check" className="check-box"/>
        <label htmlFor="check" className="label-value">Show Passoword</label>
        </div>
        {!isShown && (
        <div className="no-list-items">
        <img src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png" alt="no passwords" className="no-passwords"/>
        <p className="paragraph">No Passwords</p>
        </div>
        )}
        {isShown &&(
            <ul className="list-items">
            {newList.map(eachList=>(
                <li className="password-manger-list-item" key={eachList.id} id={eachList.id}>
                <p className={`initial ${backcolorName}`}>{eachList.initial}</p>
                <div className="user-password">
                <p className="website-name">{eachList.websiteInput}</p>
                <p className="website-name">{eachList.usernameInput}</p>
                {isShown &&(
                    <p className="password-shown">{eachList.passwordInput}</p>
                )}
                {!isShown && (
                    <img src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png" alt="stars" className="not-shown-password"/>
                )}
                </div>
                <button type="button" className="btn" data-testid ="delete" onClick={()=>this.onDeleteButton(eachList.id)}>
                <img src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png" alt="delete" className="img-del"/>
                </button> 
                </li>
            ))}
            </ul>
        )}
        </div>
        </div>
    )
    }
}


export default App
