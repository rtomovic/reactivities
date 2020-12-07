import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { IActivity } from "../../../app/models/activity";
import ActivityScore from "../../../app/stores/activityStore";

interface Props {
  activity: IActivity | undefined;
}
export const ActivityForm: React.FC<Props> = observer(
  ({ activity: initialFormStaate }) => {
    const activityStore = useContext(ActivityScore);
    const { createActivity, editActivity, submitting, cancelEditMode } = activityStore;

    const initializeForm = () => {
      if (initialFormStaate) {
        return initialFormStaate;
      } else {
        return {
          id: "",
          title: "",
          category: "",
          description: "",
          date: "",
          city: "",
          venue: "",
        };
      }
    };

    const [activity, setActivity] = useState(initializeForm);

    const handleSubmit = () => {
      if (activity.id.length === 0) {
        let newActivity = {
          ...activity,
          id: uuid(),
        };
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
    };

    const handleInputChange = (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.currentTarget;
      setActivity({ ...activity, [name]: value });
    };

    return (
      <Segment clearing>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            onChange={handleInputChange}
            name="title"
            placeholder="Title"
            value={activity.title}
          />
          <Form.TextArea
            onChange={handleInputChange}
            name="description"
            placeholder="Description"
            value={activity.description}
          />
          <Form.Input
            onChange={handleInputChange}
            name="category"
            placeholder="Category"
            value={activity.category}
          />
          <Form.Input
            onChange={handleInputChange}
            name="date"
            type="datetime-local"
            placeholder="Date"
            value={activity.title}
          />
          <Form.Input
            onChange={handleInputChange}
            name="city"
            placeholder="City"
            value={activity.city}
          />
          <Form.Input
            onChange={handleInputChange}
            name="venue"
            placeholder="Venue"
            value={activity.venue}
          />
          <Button
            loading={submitting}
            floated="right"
            positive
            type="submit"
            content="Submit"
          />
          <Button
            floated="right"
            type="button"
            content="Cancel"
            onClick={cancelEditMode}
          />
        </Form>
      </Segment>
    );
  }
);
