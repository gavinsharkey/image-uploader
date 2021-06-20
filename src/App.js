import { Route, Switch, Redirect } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import ImageViewRoute from "./ImageViewRoute";

const App = () => {
  return <div className="main-container">
    <Switch>
      <Route exact path="/">
        <MainContainer />
      </Route>
      <Route path="/image/:key">
        <ImageViewRoute />
      </Route>
      <Route path="/*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </div>
}

export default App;