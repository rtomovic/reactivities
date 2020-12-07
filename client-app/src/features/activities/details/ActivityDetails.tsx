import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import ActivityScore from "../../../app/stores/activityStore";

export const ActivityDetails: React.FC = observer(() => {
  const activityStore = useContext(ActivityScore);
  const {
    selectedActivity,
    openEditForm,
    cancelSelectedActivity,
  } = activityStore;
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
            onClick={() => openEditForm(selectedActivity?.id!)}
          ></Button>
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelSelectedActivity}
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
