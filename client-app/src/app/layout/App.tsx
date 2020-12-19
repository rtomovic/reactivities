import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { ActivityDetails } from "../../features/activities/details/ActivityDetails";
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
        <Route exact path="/" component={Home} />
        <Route exact path="/activities/:id" component={ActivityDetails} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route
          exact path={["/createActivity", "/manage/:id"]}
          component={ActivityForm}
        />
      </Container>
    </>
  );
});

export default App;
