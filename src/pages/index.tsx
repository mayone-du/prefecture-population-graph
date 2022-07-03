import type { ChartData } from "chart.js";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Line } from "react-chartjs-2";
import { COLORS } from "src/constants/colors";
import { APP_TITLE } from "src/constants/title";
import { usePrefectureCheckboxList } from "src/hooks/usePrefectureCheckboxList";
import { fetchPopulation, fetchPrefecture } from "src/repository/resas";
import type { PrefData } from "src/types";
import type { PopulationAPI } from "src/types/resas";

type Props = {
  prefData: PrefData;
  populationData: Record<number, PopulationAPI>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const prefectures = await fetchPrefecture();
  const prefData: PrefData = {};
  prefectures.result.forEach(
    ({ prefCode, prefName }) => (prefData[prefCode] = prefName)
  );
  const populationData: Props["populationData"] = {};
  await Promise.all(
    Object.keys(prefData).map(async (prefCode) => {
      populationData[Number(prefCode)] = await fetchPopulation(
        Number(prefCode)
      );
    })
  );
  return { props: { populationData, prefData } }; // 1年に一度更新するくらいの頻度で問題なさそうなので、revalidateはしない
};

const IndexPage: NextPage<Props> = ({ populationData, prefData }) => {
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
    <>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>
      <div>
        <h1 className="my-8 text-2xl font-bold text-center">{APP_TITLE}</h1>
        <div className="mx-8 lg:mx-20">{prefectureCheckBoxList}</div>
        <div className="my-8 mx-auto w-full max-w-md md:max-w-xl lg:my-12">
          <Line data={graphData} />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
