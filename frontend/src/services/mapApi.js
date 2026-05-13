// src/services/mapApi.js

import api from "./api";

/* ---------------- GET ALL STATIONS ---------------- */

export const getMapStations =
  async () => {
    try {
      const response =
        await api.get(
          "/stations"
        );

      console.log(
        "MAP STATIONS RESPONSE",
        response.data
      ); 

      return (
        response.data?.data || []
      );
    } catch (error) {
      console.error(
        "GET MAP STATIONS ERROR:",
        error
      );

      return [];
    }
  };

/* ---------------- GET NEARBY STATIONS ---------------- */

export const getNearbyStations =
  async ({
    lat,
    lng,
    radius = 10,
  }) => {
    try {
      const response =
        await api.get(
          `/stations/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
        );

      console.log(
        "NEARBY STATIONS RESPONSE",
        response.data
      );

      return (
        response.data?.data || []
      );
    } catch (error) {
      console.error(
        "GET NEARBY STATIONS ERROR:",
        error
      );

      return [];
    }
  };

/* ---------------- GET STATION BY ID ---------------- */

export const getMapStationById =
  async (stationId) => {
    try {
      const response =
        await api.get(
          `/stations/${stationId}`
        );

      console.log(
        "MAP STATION DETAILS",
        response.data
      );

      return (
        response.data?.data ||
        null
      );
    } catch (error) {
      console.error(
        "GET MAP STATION ERROR:",
        error
      );

      return null;
    }
  };