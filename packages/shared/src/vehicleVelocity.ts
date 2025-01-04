import { useAppState } from "@/contexts/AppStateContext";

export const calculateVehicleVelocity = (
  currentRpmValueMotor0?: number,
  currentRpmValueMotor1?: number,
) => {
  const { setCurrentAppState } = useAppState();

  let averageVelocity = 0;

  if (
    // If parameters are defined we are using this function to calculate lap velocity
    currentRpmValueMotor0 !== undefined &&
    currentRpmValueMotor1 !== undefined
  ) {
    const velocityMotor0 =
      ((currentRpmValueMotor0 * 2 * Math.PI * 0.0001 * 0.0001 * 0.0001) / 60) *
      3.6; // Calculate velocity in km/h

    const velocityMotor1 =
      ((currentRpmValueMotor1 * 2 * Math.PI * 0.0001 * 0.0001 * 0.0001) / 60) *
      3.6; // Calculate velocity in km/h

    averageVelocity = (velocityMotor0 + velocityMotor1) / 2;
    return averageVelocity;
  } else {
    // if parameters are not defined we are using this function to calculate current velocity so we just set the AppState
    setCurrentAppState((prev) => ({
      ...prev,
      vehicleVelocity: averageVelocity,
    }));

    return;
  }
};
