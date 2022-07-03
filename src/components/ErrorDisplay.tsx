import type { FC } from "react";

type Props = {
  errorMessage?: string;
};

export const ErrorDisplay: FC<Props> = ({ errorMessage }) => {
  return (
    <div className="m-4">
      <p className="text-xl font-bold text-center text-red-400">
        {errorMessage ? errorMessage : "エラーが発生しました。"}
      </p>
    </div>
  );
};
