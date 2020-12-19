import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard: React.FC = observer(() => {
  const activityStore = useContext(ActivityStore);
  const { editMode, activity: selectedActivity } = activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <GridColumn width={6}>
        <h2>Activity Filters</h2>
      </GridColumn>
    </Grid>
  );
});
