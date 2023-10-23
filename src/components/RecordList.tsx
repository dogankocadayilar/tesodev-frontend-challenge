import { Record } from "../types/types";
import ListItem from "./ListItem";

type RecordListProps = {
  records: Record[];
};

function RecordList({ records }: RecordListProps) {
  // Check if there is any records to display
  if (records.length === 0)
    return (
      <div className="text-xl font-semibold text-center">
        There is no record found.
      </div>
    );
  return (
    <>
      <ul>
        {records.map((record) => (
          <ListItem key={record.id} record={record} isShowing />
        ))}
      </ul>
    </>
  );
}

export default RecordList;
