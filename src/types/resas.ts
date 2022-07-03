type ResasResponse<T> = {
  message: string | null;
  result: T;
};

export type PrefecturesAPI = ResasResponse<
  {
    prefCode: number;
    prefName: string;
  }[]
>;

export type PopulationAPI = ResasResponse<{
  boundaryYear: number;
  data: {
    label: string;
    data: {
      year: number;
      value: number;
    }[];
  }[];
}>;
