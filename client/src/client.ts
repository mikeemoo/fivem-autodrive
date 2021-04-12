let autoPilotActive = false;
const myPed = PlayerPedId();
const waypointBlipId = GetWaypointBlipEnumId();

setTick(() => {
  const vehicleId = GetVehiclePedIsIn(myPed, false);
  if (!vehicleId) {
    autoPilotActive = false;
    return;
  }
  const runAutoPilot = IsControlPressed(0, 29);
  if (runAutoPilot && !autoPilotActive) {
    const blip = GetFirstBlipInfoId(waypointBlipId);
    if (blip) {
      const [ x, y, z ] = GetBlipCoords(blip);
      TaskVehicleDriveToCoordLongrange(myPed, vehicleId, x, y, z, 20, 786603, 10);
      autoPilotActive = true;
      return;
    }
    autoPilotActive = false;
  } else if (!runAutoPilot && autoPilotActive) {
    Citizen.invokeNative("0xDBBC7A2432524127", vehicleId)
    autoPilotActive = false;
  }
})