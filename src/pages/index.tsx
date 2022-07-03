import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ErrorDisplay } from "src/components/ErrorDisplay";
import { TopPage } from "src/components/TopPage";
import { APP_TITLE } from "src/constants/title";
import { fetchPopulation, fetchPrefecture } from "src/repository/resas";
import type { PopulationData, PrefData } from "src/types/resas";

type Props = {
  errorMessage?: string;
  prefData?: PrefData;
  populationData?: PopulationData;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const prefectures = await fetchPrefecture();
    const prefData: PrefData = {};
    prefectures.result.forEach(
      ({ prefCode, prefName }) => (prefData[prefCode] = prefName)
    );
    const populationData: PopulationData = {};
    await Promise.all(
      Object.keys(prefData).map(async (prefCode) => {
        populationData[Number(prefCode)] = await fetchPopulation(
          Number(prefCode)
        );
      })
    );
    return { props: { populationData, prefData } }; // 1年に一度更新するくらいの頻度で問題なさそうなので、revalidateはしない
  } catch (err) {
    if (err instanceof Error) return { props: { errorMessage: err.message } };
    throw err;
  }
};

const IndexPage: NextPage<Props> = ({
  errorMessage,
  populationData,
  prefData,
}) => {
  if (errorMessage || !prefData || !populationData)
    return <ErrorDisplay errorMessage={errorMessage} />;

  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>
      <TopPage populationData={populationData} prefData={prefData} />
    </>
  );
};

export default IndexPage;
