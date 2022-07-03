type ResasResponse<T> = {
  message: string | null;
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
