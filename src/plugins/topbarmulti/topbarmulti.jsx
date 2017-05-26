import React, { PropTypes } from "react"

//import "./topbarmulti.less"
import Logo from "./logo_small.png"

export default class Topbarmulti extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = { url: props.specSelectors.url(), urls: props.specSelectors.urls() }
    console.log(this.state)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ url: nextProps.specSelectors.url(), urls: nextProps.specSelectors.urls() })
  }

  onUrlChange = (e)=> {
    let {target: {value}} = e
    this.setState({url: value})
  }

  onSelect = (e)=> {
    let {target: {value}} = e
    this.setState({url: value})
    this.props.specActions.updateUrl(value)
    this.props.specActions.download(value)
    e.preventDefault()
  }

  downloadUrl = (e) => {
    this.props.specActions.updateUrl(this.state.url)
    this.props.specActions.download(this.state.url)
    e.preventDefault()
  }

  render() {
    let { getComponent, specSelectors } = this.props
    const Button = getComponent("Button")
    const Link = getComponent("Link")

    let isLoading = specSelectors.loadingStatus() === "loading"
    let isFailed = specSelectors.loadingStatus() === "failed"

    let options = [];
    this.state.urls.forEach(function(url, name){
      options.push(<option value={url}>{name}</option>)
    });

    let inputStyle = {}
    if(isFailed) inputStyle.color = "red"
    if(isLoading) inputStyle.color = "#aaa"
    return (
        <div className="topbarmulti">
          <div className="wrapper">
            <div className="topbarmulti-wrapper">
              <Link href="#" title="Swagger UX">
                <img height="30" width="30" src={ Logo } alt="Swagger UX"/>
                <span>swagger</span>
              </Link>
              <form className="download-url-wrapper" onSubmit={this.downloadUrl}>
                <select className="download-url-select" onChange={ this.onSelect } value={this.state.url} disabled={isLoading} style={inputStyle}>{options}</select>
                <input className="download-url-input" type="text" onChange={ this.onUrlChange } value={this.state.url} disabled={isLoading} style={inputStyle} />
                <Button className="download-url-button" onClick={ this.downloadUrl }>Explore</Button>
              </form>
            </div>
          </div>
        </div>

    )
  }
}

Topbarmulti.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired
}
