import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import type { PrefData } from "src/types";

export const usePrefectureCheckboxList = (prefData: PrefData) => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([]);
  const handleChangeCheck = useCallback(
    (prefCode: number) =>
      ({ target }: ChangeEvent<HTMLInputElement>) =>
        setCheckedPrefCodes((prev) => {
          return target.checked
            ? [...prev, prefCode]
            : prev.filter((code) => code !== prefCode);
        }),
    []
  );

  const prefectureCheckBoxList = (
    <ul className="grid grid-cols-3 gap-2 lg:grid-cols-5">
      {Object.entries(prefData).map(([code, name]) => {
        const isChecked = checkedPrefCodes.includes(Number(code));
        return (
          <li key={code} className="col-span-1">
            <label className="flex gap-1 items-center cursor-pointer">
              <input
                className="cursor-pointer"
                type="checkbox"
                checked={isChecked}
                onChange={handleChangeCheck(Number(code))}
              />
              {name}
            </label>
          </li>
        );
      })}
    </ul>
  );

  return {
    checkedPrefCodes,
    prefectureCheckBoxList,
  };
};
