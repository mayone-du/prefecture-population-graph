import type { ChartData } from "chart.js";
import { COLORS } from "src/constants/colors";
import type { PopulationData, PrefData } from "src/types/resas";

/**
 *
 * @param checkedPrefCodes チェックされている都道府県コードの配列
 * @param prefData 都道府県データ
 * @param populationData 人口データ
 */
export const shapeForLineGraph = (
  checkedPrefCodes: number[],
  prefData: PrefData,
  populationData: PopulationData
): ChartData<"line"> => {
  return {
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
};
