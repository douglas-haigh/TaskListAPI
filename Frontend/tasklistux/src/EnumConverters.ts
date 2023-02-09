import {Priority, Status} from "/Users/douglashaigh/TaskListAPI/Frontend/tasklistux/src/Types"

export const convertPriority: (priority: Priority) => string = (priority: Priority) => {
    switch (priority) {
      case (Priority.LOW):
        return "Low";
      case (Priority.MEDIUM):
        return "Medium";
      case (Priority.HIGH):
        return "High";
      default:
        return "Invalid Priority";
    }
  };

  export const convertStatus: (status: Status) => string = (status: Status) => {
    switch (status) {
      case (Status.NOT_STARTED):
        return "Not started";
      case (Status.IN_PROGRESS):
        return "In Progress";
      case (Status.COMPLETED):
        return "Completed";
      default:
        return "Invalid Status";
    }
  };