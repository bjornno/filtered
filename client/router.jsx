const routes = (
  <ReactRouter.Route name="root" handler={AppBody}>
    <ReactRouter.Route name="home" path="/" handler={Home} />
    <ReactRouter.Route name="other" path="/other" handler={Other} />
    <ReactRouter.Route name="settings" path="/settings" handler={Settings} />
    <ReactRouter.DefaultRoute handler={AppLoading} />
    <ReactRouter.NotFoundRoute handler={AppNotFound} />
        
  </ReactRouter.Route>
)

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Meteor.startup(function () {
  Tracker.autorun(function () {
    let loc = Geolocation.latLng();
    if (loc) {
      reverseGeocode.getLocation(loc.lat, loc.lng, function(location){
        address = reverseGeocode.getAddrStr();
        Session.set('address', address)
      });
      Session.set('geo', {
        lat: parseFloat(loc.lat.toFixed(3)), 
        lng: parseFloat(loc.lng.toFixed(3))
      });
    }
  }); 
  ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler, state) {
    React.render(<Handler />, document.getElementById("app"));
  });
});
