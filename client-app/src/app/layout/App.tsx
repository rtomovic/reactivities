import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { ActivityForm } from "../../features/activities/form/ActivityForm";
import { Home } from "../../features/home/Home";
import { NavBar } from "../../features/nav/NavBar";
import ActivityStore from "../stores/activityStore";
import { LoadingComponent } from "./LoadingComponent";

export const App: React.FC = observer(() => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route path="/activities" component={ActivityDashboard} />
        <Route path="/createActivity" component={ActivityForm} />
        <Route exact path="/" component={Home} />
      </Container>
    </>
  );
});

export default App;
