import React from "react";
import { Libro } from "../model/libro";
import { useUserStore } from "../store/userStore";

export default function useLibri(firstFetch: boolean = true) {
  //state
  const [libri, setLibri] = React.useState<Libro[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const userStore = useUserStore();

  //function
  const fetchLibri = async () => {
    try {
      setLoading(true);
      const resp = await fetch("https://mia-libreria.vercel.app/api/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userStore.accessToken,
        },
        credentials: "include",
      });
      if (resp.status != 200) {
        console.error(await resp.json())
        return setError(true);
      }
      const data = (await resp.json()) as Libro[];
      setLibri(data);
    } finally {
      setLoading(false);
    }
  };
  const addLibro = async (libro: Libro) => {
    try {
      setLoading(true);
      const resp = await fetch("https://mia-libreria.vercel.app/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userStore.accessToken,
        },
        credentials: "include",
        body: JSON.stringify(libro),
      });
      if (resp.status != 200) {
        return setError(true);
      }
      await fetchLibri();
    } finally {
      setLoading(false);
    }
  };
  const updateLibro = async (libro: Libro) => {
    try {
      setLoading(true);
      const resp = await fetch("https://mia-libreria.vercel.app/api/books/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userStore.accessToken,
        },
        credentials: "include",
        body: JSON.stringify(libro),
      });
      if (resp.status != 200) {
        return setError(true);
      }
      await fetchLibri();
    } finally {
      setLoading(false);
    }
  };
  const deleteLibro = async (id: string) => {
    try {
      setLoading(true);
      const resp = await fetch(
        "https://mia-libreria.vercel.app/api/books/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userStore.accessToken,
          },
          credentials: "include",
        }
      );
      if (resp.status != 200) {
        return setError(true);
      }
      await fetchLibri();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (firstFetch) {
      fetchLibri();
    }
  }, []);

  return {
    libri,
    loading,
    error,
    fetchLibri,
    addLibro,
    updateLibro,
    deleteLibro,
  };
}
