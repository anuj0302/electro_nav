const BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

// Get all stations
export const getAllStations =
  async () => {
    try {
      const response =
        await fetch(
          `${BASE_URL}/stations`
        );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch stations"
        );
      }

      const result =
        await response.json();

      return result.data || [];
    } catch (error) { 
      console.error(
        "Get Stations Error:",
        error
      );

      return [];
    }
  };

// Get station by ID
export const getStationById =
  async (id) => {
    try {
      const response =
        await fetch(
          `${BASE_URL}/stations/${id}`
        );

      if (!response.ok) {
        throw new Error(
          "Station not found"
        );
      }

      const result =
        await response.json();

      return result.data || null;
    } catch (error) {
      console.error(
        "Get Station Error:",
        error
      );

      return null;
    }
  };