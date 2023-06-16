export const praseCookies = (cookies: string, name: string): string | null => {
  const cookieArr = cookies.split(";");
  let cookieValue: string | null = null;
  cookieArr.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    if (key.trim() === name) {
      cookieValue = value;
    }
  });
  return cookieValue;
};
