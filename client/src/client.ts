const waypointBlipId = GetWaypointBlipEnumId();

RegisterCommand(
  "+autodrive",
  () => {
    const myPed = PlayerPedId();
    const vehicleId = GetVehiclePedIsIn(myPed, false);
    const blip = GetFirstBlipInfoId(waypointBlipId);
    if (blip) {
      const [x, y, z] = GetBlipCoords(blip);
      TaskVehicleDriveToCoordLongrange(
        myPed,
        vehicleId,
        x,
        y,
        z,
        20,
        786603,
        10
      );
    }
  },
  false
);

RegisterCommand(
  "-autodrive",
  () => {
    const myPed = PlayerPedId();
    const vehicleId = GetVehiclePedIsIn(myPed, false);
    if (vehicleId) {
      Citizen.invokeNative("0xDBBC7A2432524127", vehicleId);
    }
  },
  false
);

RegisterKeyMapping("+autodrive", "Auto Drive", "keyboard", "b");
