import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../context/RoomContext";

export const useRooms = () => {
    return useContext(RoomContext)
}