import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityScore from "../../../app/stores/activityStore";

interface DetailParams {
  id: string;
}

export const ActivityDetails: React.FC<
  RouteComponentProps<DetailParams>
> = observer(({ match, history }) => {
  const activityStore = useContext(ActivityScore);
  const {
    activity: selectedActivity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity]);

  if (loadingInitial || !selectedActivity) {
    return <LoadingComponent content="Loading activity..."></LoadingComponent>;
  }

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedActivity?.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity?.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity?.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            as={Link}
            to={`/manage/${selectedActivity.id}`}
          ></Button>
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => {
              history.push("/activities");
            }}
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
