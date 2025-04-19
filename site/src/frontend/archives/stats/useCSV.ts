import { parse } from "csv-parse/browser/esm/sync";
import { useEffect, useState } from "react";
import { type Options } from "csv-parse";

const useCSV = <T>({
  url,
  parseOptions,
}: {
  url: string;
  parseOptions: Options;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    const abort = new AbortController();
    setLoading(true);
    setError(undefined);
    void (async () => {
      try {
        const response = await fetch(url, {
          signal: abort.signal,
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
          );
        }

        const raw = await response.text();
        const parsedData = parse(raw, parseOptions) as T[];
        setData(parsedData);
        setLoading(false);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      abort.abort();
    };
  }, [url, parseOptions]);
  return {
    loading,
    error,
    data,
  };
};

export default useCSV;
