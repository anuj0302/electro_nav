export const saveUserLocation = (
  location
) => {
  localStorage.setItem(
    "userLocation",
    JSON.stringify(location)
  );
};

export const getUserLocation = () => {
  try {
    return JSON.parse(
      localStorage.getItem("userLocation")
    );
  } catch {
    return null;
  }
}; 