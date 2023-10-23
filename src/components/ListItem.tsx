import { MapPinIcon } from "@heroicons/react/24/outline";
import { Record } from "../types/types";

type ListItemProps = {
  record: Record;
  isShowing?: boolean;
};

function ListItem({ record, isShowing = false }: ListItemProps) {
  return (
    <li className="py-5 border-b last-of-type:border-none hover:bg-blue-100 hover:cursor-pointer rounded-md px-2 transition-colors">
      <div className="flex items-center gap-3">
        <MapPinIcon className="w-7 aspect-square" />
        <div className="flex-1">
          <p className="font-semibold text-black">{record.company}</p>
          <p className="text-sm text-gray-500">
            {record.city}, {record.country}
          </p>
        </div>
        {isShowing && (
          <div className="self-end">
            <p className="text-right font-semibold text-black">
              {record.nameSurname}
            </p>
            <p className="text-sm text-gray-500">{record.email}</p>
          </div>
        )}
      </div>
    </li>
  );
}

export default ListItem;
