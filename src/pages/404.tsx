import type { NextPage } from "next";
import Link from "next/link";
import { ErrorDisplay } from "src/components/ErrorDisplay";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <ErrorDisplay errorMessage="404 Not Found" />
      <p className="text-center ">
        <Link href="/">
          <a className="text-blue-400 underline">トップページへ戻る</a>
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
