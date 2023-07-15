import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorList = ['green', 'yellow', 'orange', 'red', 'blue']

class App extends Component {
  state = {
    searchInput: '',
    isShown: false,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordManagerList: [],
    isTrue: false,
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  addContent = e => {
    e.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initial = websiteInput.slice(0, 1).toUpperCase()
    const backcolorName = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: uuidv4(),
      initialName: initial,
      website: websiteInput,
      name: usernameInput,
      password: passwordInput,
      background: backcolorName,
    }
    this.setState(prevState => ({
      passwordManagerList: [...prevState.passwordManagerList, newValues],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShown: true})
    } else {
      this.setState({isShown: false})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeleteButton = id => {
    const {passwordManagerList} = this.state
    const newList = passwordManagerList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({passwordManagerList: newList, isTrue: caseOf})
  }

  render() {
    const {
      passwordManagerList,
      websiteInput,
      usernameInput,
      passwordInput,
      isShown,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = passwordManagerList.filter(eachValue =>
      eachValue.websiteInput.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        <div className="top-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manger"
          />

          <form className="add-details" onSubmit={this.addContent}>
            <h1 className="heading">Add New Password</h1>
            <div className="website-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="wediste-logo"
              />
              <input
                type="text"
                className="input-value"
                value={websiteInput}
                onChange={this.onChangeWebsiteInput}
                placeholder="Enter Website"
              />
            </div>
            <div className="website-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="wediste-logo"
              />
              <input
                type="text"
                className="input-value"
                value={usernameInput}
                onChange={this.onChangeUsernameInput}
                placeholder="Enter Username"
              />
            </div>
            <div className="website-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="wediste-logo"
              />
              <input
                type="password"
                className="input-value"
                value={passwordInput}
                onChange={this.onChangePasswordInput}
                placeholder="Enter Password"
              />
            </div>

            <button type="submit" className="but-name">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manger1"
          />
        </div>
        <div className="bottom-card-container">
          <div className="password-search-container">
            <h1 className="password-count">Your Passwords </h1>
            <p className="span-count">{newList.length}</p>
            <div className="website-input1">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-input1"
              />
              <input
                type="search"
                value={searchInput}
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="show-password-container">
            <input
              type="checkbox"
              onChange={this.showPassword}
              id="check"
              className="check-box"
            />
            <label htmlFor="check" className="label-value">
              Show Passwords
            </label>
          </div>

          {!isTrue && (
            <div className="no-list-items">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords"
              />
              <p className="paragraph">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="list-items">
              {newList.map(eachValue => (
                <li
                  className="password-manger-list-item"
                  key={eachValue.id}
                  id={eachValue.id}
                >
                  <p className={`initial ${eachValue.background}`}>
                    {eachValue.initialName}
                  </p>
                  <div className="user-password">
                    <p className="website-name">{eachValue.website}</p>
                    <p className="website-name">{eachValue.name}</p>
                    {isShown && (
                      <p className="password-shown">{eachValue.password}</p>
                    )}
                    {!isShown && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="not-shown-password"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn"
                    data-testid="delete"
                    onClick={() => this.onDeleteButton(eachValue.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="img-del"
                    />
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
