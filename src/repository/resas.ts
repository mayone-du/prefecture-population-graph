import { RESAS_API } from "src/constants/url";
import type { PopulationAPI, PrefecturesAPI } from "src/types/resas";

/**
 * 都道府県の一覧を取得
 * @see https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
 */
export const fetchPrefecture = async () => {
  const data = await fetch(`${RESAS_API}/api/v1/prefectures`, {
    headers: { "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY },
  });
  const res = await data.json();
  return res as PrefecturesAPI;
};

/**
 * 都道府県ごとの人口構成を取得
 * @see https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
 */
export const fetchPopulation = async (prefCode: number) => {
  const data = await fetch(
    `${RESAS_API}/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    { headers: { "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY } }
  );
  const res = await data.json();
  return res as PopulationAPI;
};
