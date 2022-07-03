type ResasResponse<T> = {
  statusCode?: string | null;
  message: string | null;
  description?: string | null;
  result: T;
};

export type PrefecturesAPI = ResasResponse<
  { prefCode: number; prefName: string }[]
>;

export type PopulationAPI = ResasResponse<{
  boundaryYear: number;
  data: {
    /** 総人口 | 年少人口 | 生産年齢人口 | 老年人口 */
    label: string;
    data: {
      year: number;
      value: number;
    }[];
  }[];
}>;

/**
 * 扱いやすくするための整形後の型
 */
export type PrefData = Record<number, string>;
export type PopulationData = Record<number, PopulationAPI>;
