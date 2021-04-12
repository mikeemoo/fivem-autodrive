let autoDriveEnabled = false;
let autoDriveActive = false;
const myPed = PlayerPedId();
const waypointBlipId = GetWaypointBlipEnumId();

RegisterCommand(
  "+autodrive",
  () => {
    autoDriveEnabled = true;
  },
  false
);

RegisterCommand(
  "-autodrive",
  () => {
    autoDriveEnabled = false;
  },
  false
);

RegisterKeyMapping("+autodrive", "Auto Drive", "keyboard", "b");

setTick(() => {
  const vehicleId = GetVehiclePedIsIn(myPed, false);
  if (!vehicleId) {
    autoDriveActive = false;
    return;
  }

  if (autoDriveEnabled && !autoDriveActive) {
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
      autoDriveActive = true;
      return;
    }
    autoDriveActive = false;
  } else if (!autoDriveEnabled && autoDriveActive) {
    Citizen.invokeNative("0xDBBC7A2432524127", vehicleId);
    autoDriveActive = false;
  }
});
