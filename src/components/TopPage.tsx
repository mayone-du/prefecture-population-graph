import type { ChartData } from "chart.js";
import type { FC } from "react";
import { Line } from "react-chartjs-2";
import { COLORS } from "src/constants/colors";
import { APP_TITLE } from "src/constants/title";
import { usePrefectureCheckboxList } from "src/hooks/usePrefectureCheckboxList";
import type { PopulationData, PrefData } from "src/types/resas";

type Props = {
  prefData: PrefData;
  populationData: PopulationData;
};

export const TopPage: FC<Props> = ({ populationData, prefData }) => {
  const { checkedPrefCodes, prefectureCheckBoxList } =
    usePrefectureCheckboxList(prefData);

  const graphData: ChartData<"line"> = {
    labels: populationData[1].result.data[0].data.map(({ year }) => year),
    datasets: checkedPrefCodes.length
      ? checkedPrefCodes.map((prefCode) => {
          return {
            label: prefData[prefCode],
            data: populationData[prefCode].result.data[0].data.map(
              ({ value }) => value
            ),
            borderColor: COLORS[prefCode - 1],
          };
        })
      : [{ label: "都道府県ごとの色分け", data: [] }],
  };

  return (
    <div>
      <h1 className="my-8 text-2xl font-bold text-center">{APP_TITLE}</h1>
      <div className="mx-8 lg:mx-20">{prefectureCheckBoxList}</div>
      <div className="my-8 mx-auto w-full max-w-md md:max-w-xl lg:my-12">
        <Line data={graphData} />
      </div>
    </div>
  );
};
