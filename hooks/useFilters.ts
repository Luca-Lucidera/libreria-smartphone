import { useEffect, useState } from "react";

export default function useFilters(firstFetch: boolean = true) {
  const [types, setType] = useState<string[]>([]);
  const [statuses, setStatus] = useState<string[]>([]);
  const [publishers, setPublisher] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const fetchFilters = async () => {
    try {
      setLoading(true);
      const [dataStatus, dataPublisher, dataTypes] = await Promise.all([
        (
          await fetch("https://mia-libreria.vercel.app/api/filter/status")
        ).json() as Promise<string[]>,
        (
          await fetch("https://mia-libreria.vercel.app/api/filter/publisher")
        ).json() as Promise<string[]>,
        (
          await fetch("https://mia-libreria.vercel.app/api/filter/type")
        ).json() as Promise<string[]>,
      ]);

      if (dataStatus && dataPublisher && dataTypes) {
        setStatus(dataStatus);
        setPublisher(dataPublisher);
        setType(dataTypes);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firstFetch) {
      fetchFilters();
    }
  }, []);

  return { types, statuses, publishers, loading, fetchFilters };
}
