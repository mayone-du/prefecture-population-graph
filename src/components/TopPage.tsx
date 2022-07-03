import type { FC } from "react";
import { Line } from "react-chartjs-2";
import { APP_TITLE } from "src/constants/title";
import { shapeForLineGraph } from "src/features/shapeForLineGraph";
import { usePrefectureCheckboxList } from "src/hooks/usePrefectureCheckboxList";
import type { PopulationData, PrefData } from "src/types/resas";

type Props = {
  prefData: PrefData;
  populationData: PopulationData;
};

export const TopPage: FC<Props> = ({ populationData, prefData }) => {
  const { checkedPrefCodes, prefectureCheckBoxList } =
    usePrefectureCheckboxList(prefData);

  const shapedGraphData = shapeForLineGraph(
    checkedPrefCodes,
    prefData,
    populationData
  );

  return (
    <div>
      <h1 className="my-8 text-2xl font-bold text-center">{APP_TITLE}</h1>
      <div className="mx-8 lg:mx-20">{prefectureCheckBoxList}</div>
      <div className="my-8 mx-auto w-full max-w-md md:max-w-xl lg:my-12">
        <Line data={shapedGraphData} />
      </div>
    </div>
  );
};
