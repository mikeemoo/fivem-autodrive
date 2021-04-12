const CURRENT_RESOURCE = GetCurrentResourceName();
const WAYPOINT_BLIP_ID = GetWaypointBlipEnumId();
const SPEED_LIMIT_SLOW = Number(
  GetResourceMetadata(CURRENT_RESOURCE, "speed_limit_slow", 0) || "35"
);
const SPEED_LIMIT_NORMAL = Number(
  GetResourceMetadata(CURRENT_RESOURCE, "speed_limit_normal", 0) || "35"
);
const SPEED_LIMIT_HIGHWAY = Number(
  GetResourceMetadata(CURRENT_RESOURCE, "speed_limit_highway", 0) || "75"
);

enum VehicleNodeFlags {
  SLOW_ROAD = 8,
  HIGHWAY = 64,
}

let currentSpeed = SPEED_LIMIT_NORMAL;
let checkRoadTypeInterval: number | null = null;

const getSpeedLimit = (x: number, y: number, z: number) => {
  const [valid, _, flags] = GetVehicleNodeProperties(x, y, z);
  if (!valid) {
    return SPEED_LIMIT_NORMAL;
  }
  if ((flags & VehicleNodeFlags.HIGHWAY) === VehicleNodeFlags.HIGHWAY) {
    return SPEED_LIMIT_HIGHWAY;
  } else if (
    (flags & VehicleNodeFlags.SLOW_ROAD) ===
    VehicleNodeFlags.SLOW_ROAD
  ) {
    return SPEED_LIMIT_SLOW;
  }
  return SPEED_LIMIT_NORMAL;
};

RegisterCommand(
  "+autodrive",
  () => {
    const myPed = PlayerPedId();
    const vehicleId = GetVehiclePedIsIn(myPed, false);
    const blip = GetFirstBlipInfoId(WAYPOINT_BLIP_ID);

    if (checkRoadTypeInterval) {
      clearInterval(checkRoadTypeInterval);
      checkRoadTypeInterval = null;
    }

    if (blip) {
      const [x, y, z] = GetBlipCoords(blip);
      const driveToBlip = () => {
        Citizen.invokeNative("0xDBBC7A2432524127", vehicleId);
        console.log(currentSpeed);
        TaskVehicleDriveToCoordLongrange(
          myPed,
          vehicleId,
          x,
          y,
          z,
          currentSpeed,
          786603,
          10
        );
      };

      checkRoadTypeInterval = setInterval(() => {
        const [currentX, currentY, currentZ] = GetEntityCoords(vehicleId, true);
        const nextSpeed = getSpeedLimit(currentX, currentY, currentZ);
        if (nextSpeed !== currentSpeed) {
          currentSpeed = nextSpeed;
          driveToBlip();
        }
      }, 1e3);

      driveToBlip();
    }
  },
  false
);

RegisterCommand(
  "-autodrive",
  () => {
    if (checkRoadTypeInterval) {
      clearInterval(checkRoadTypeInterval);
      checkRoadTypeInterval = null;
    }

    const myPed = PlayerPedId();
    const vehicleId = GetVehiclePedIsIn(myPed, false);
    if (vehicleId) {
      Citizen.invokeNative("0xDBBC7A2432524127", vehicleId);
    }
  },
  false
);

RegisterKeyMapping("+autodrive", "Auto Drive", "keyboard", "b");
