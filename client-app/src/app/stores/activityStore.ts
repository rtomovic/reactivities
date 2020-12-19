import { makeAutoObservable, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

configure({ enforceActions: "always" });

class ActivityStore {
  activities: IActivity[] = [];
  loadingInitial = false;
  activity: IActivity | undefined = undefined;
  editMode = false;
  submitting = false;
  activityRegistry: Map<string, IActivity> = new Map();
  target = "";

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      runInAction(() => {
        this.activity = activity;
      });
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction(() => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  clearActivity = () => (this.activity = undefined);

  createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });

      console.log(error);
    }
  };

  editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  deleteActivity = async (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = e.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  openCreateForm = () => {
    runInAction(() => {
      this.editMode = true;
      this.activity = undefined;
    });
  };

  openEditForm = (id: string) => {
    runInAction(() => {
      this.editMode = true;
      this.activity = this.activityRegistry.get(id);
    });
  };

  cancelEditMode = () => {
    runInAction(() => {
      this.editMode = false;
    });
  };

  cancelSelectedActivity = () => {
    runInAction(() => {
      this.activity = undefined;
    });
  };

  selectActivity = (id: string) => {
    runInAction(() => {
      this.activity = this.activityRegistry.get(id);
    });
  };
}

export default createContext<ActivityStore>(new ActivityStore());
