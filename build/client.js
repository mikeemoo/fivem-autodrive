(()=>{let e=!1;const i=PlayerPedId(),o=GetWaypointBlipEnumId();setTick((()=>{const t=GetVehiclePedIsIn(i,!1);if(!t)return void(e=!1);const n=IsControlPressed(0,29);if(n&&!e){const n=GetFirstBlipInfoId(o);if(n){const[o,s,r]=GetBlipCoords(n);return TaskVehicleDriveToCoordLongrange(i,t,o,s,r,20,786603,10),void(e=!0)}e=!1}else!n&&e&&(Citizen.invokeNative("0xDBBC7A2432524127",t),e=!1)}))})();