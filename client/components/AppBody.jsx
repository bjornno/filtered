AppBody = React.createClass({
  render() {
    return (
      <div className="ionic-body">
        <div className="tabs bar-header tabs-icon-top">
          <ReactRouter.Link className="tab-item" to={"/"}> 
            <i className="icon ion-home"></i>
            Home
          </ReactRouter.Link>
          <ReactRouter.Link className="tab-item" to={"/other"}> 
            <i className="icon ion-magnet"></i>
            Liked
          </ReactRouter.Link>
          <ReactRouter.Link className="tab-item" to={"/new"}> 
            <i className="icon ion-plus-circled"></i>
            New Event
          </ReactRouter.Link>
          <ReactRouter.Link className="tab-item" to={"/mine"}> 
            <i className="icon ion-person"></i>
            Mine
          </ReactRouter.Link>
          <ReactRouter.Link className="tab-item" to={"/settings"}> 
            <i className="icon ion-gear-a"></i>
            Settings
          </ReactRouter.Link>
        </div>
        <div className="view">
          <div className="scroll-content ionic-scroll">
            <div className="content overflow-scroll has-header">
              <ReactRouter.RouteHandler />
            </div>
          </div>
        </div>
      </div>
    )
  }
})
