import { RxCheckCircled, RxCircle, RxStopwatch } from "react-icons/rx";

export const statuses = [
  {
    value: "TODO",
    label: "Todo",
    icon: RxCircle,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: RxStopwatch,
  },
  {
    value: "DONE",
    label: "Done",
    icon: RxCheckCircled,
  },
];
