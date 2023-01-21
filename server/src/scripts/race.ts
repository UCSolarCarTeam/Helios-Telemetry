import TelemetryPacket, { LapData } from "../_objects/telemetry-data.interface"
export default class RaceService {

    /**
     * 
     * @param packetArray 
     * @returns average current in amps
     */
    getAveragePackCurrent(packetArray: TelemetryPacket[]) {
        let totalPackCurrent = 0;
        for (let i = 0; i < packetArray.length; ++i) {
            totalPackCurrent += packetArray[i].Battery.PackCurrent;
        }
        const averagePackCurrent = totalPackCurrent / packetArray.length;

        return Number(averagePackCurrent.toFixed(2));
    }

    /**
     * 
     * @param averagePackCurrent 
     * @param packAmpHours 
     * @returns returns remaining seconds
     */
    getSecondsRemainingUntilChargedOrDepleted(averagePackCurrent: number, packAmpHours: number) {
        if (averagePackCurrent == 0) {
            return -1;
        }
        let amphoursLeft = 0;
        if (averagePackCurrent >= 0) {
            amphoursLeft = packAmpHours;
        } else {
            amphoursLeft = 165.6 - packAmpHours;
        }

        let hoursUntilChargedOrDepleted = amphoursLeft / Math.abs(averagePackCurrent);
        let secondsUntilChargedOrDepleted = hoursUntilChargedOrDepleted * 3600;

        if (isNaN(secondsUntilChargedOrDepleted)) {
            return -1;
        } else {
            return Math.round(secondsUntilChargedOrDepleted);
        }
    }

    /**
     * 
     * @param motorOdometer 
     * @param motorDistanceTraveledSession 
     * @returns { Boolean }
     */
    checkIfMotorReset(motorOdometer: number, motorDistanceTraveledSession: number) {
        let motorReset = false;
        if (Math.round(motorOdometer) == 0
        && Math.abs(motorOdometer - motorDistanceTraveledSession) > 1.0) {
            motorReset = true;
        }
    
        return motorReset;
    }

    /**
     * 
     * @param packetArray 
     * @param odometerIndex 
     * @returns distanct in km
     */
    private calculateMotorDistance(packetArray: TelemetryPacket[], odometerIndex: number) {
        // The Motor's Odometer resets every time a motor trips or the car power cycles
        let totalDistanceTraveled = 0;
        let motorDistanceTraveledSession = 0;
    
        for (let i = 0; i < packetArray.length; i++) {
            // Check if the motor had reset, keep a tally of the distance travelled
            if (this.checkIfMotorReset(packetArray[i].MotorDetails[odometerIndex].Odometer, motorDistanceTraveledSession)) {
                totalDistanceTraveled += motorDistanceTraveledSession;
            }
    
            motorDistanceTraveledSession = packetArray[i].MotorDetails[odometerIndex].Odometer;
        }
        totalDistanceTraveled += motorDistanceTraveledSession;
        // Remove the initial distance
        totalDistanceTraveled -= packetArray[0].MotorDetails[odometerIndex].Odometer;
        // Convert to kilometers (odometer reports as meters)
        totalDistanceTraveled /= 1000;
    
        return totalDistanceTraveled;
    }

    /**
     * 
     * @param packetArray 
     * @returns distance in km
     */
    getDistanceTraveled(packetArray: TelemetryPacket[]) {
        if (packetArray.length == 0) {
            return 0;
        }
        // Reverse the array so we can iterate it in chronological order
        // slice is used to make a shallow copy - packetArray is reversed only in this function
        let chronologicalArray = packetArray.slice(0).reverse();
        let motor0DistanceTravelledTotal = this.calculateMotorDistance(chronologicalArray, 0);
        let motor1DistanceTravelledTotal = this.calculateMotorDistance(chronologicalArray, 1);
    
        return (motor0DistanceTravelledTotal + motor1DistanceTravelledTotal) / 2;
    }

    /**
     * 
     * @param packetArray 
     * @returns average power in as watts
     */
    getAveragePowerIn(packetArray: TelemetryPacket[]) {
        // If no packets, then no power in
        if (packetArray.length == 0) {
            return 0;
        }
    
        // Define constants
        const mpptCount = 4;
        const motorCount = 2;
    
        // Get the sum of the average array power of all MPPTs
        let mpptPowerIn = packetArray.map((packet) => {
            let arrayPower = 0;
            for (let mppt = 0; mppt < mpptCount; mppt++) {
                // Array Power = Array Voltage * Array Current
                // arrayPower += packet['mppt' + mppt + 'arrayvoltage'] *
                //               packet['mppt' + mppt + 'arraycurrent'];
                arrayPower += packet.MPPT[mppt].ArrayVoltage *
                            packet.MPPT[mppt].ArrayCurrent;
            }
            return arrayPower;
        }).reduce((sum, curr) => sum + (curr / packetArray.length), 0);
    
        // Get the sum of the regen of all motors
        let regenPowerIn = packetArray.map((packet) => {
            let regen = 0;
            for (let motor = 0; motor < motorCount; motor++) {
                // let busCurrent = packet['motor' + motor + 'buscurrent'];
                // let busVoltage = packet['motor' + motor + 'busvoltage'];
                let busCurrent = packet.KeyMotor[motor].BusCurrent;
                let busVoltage = packet.KeyMotor[motor].BusVoltage;
    
                // Filter out any values with busCurrent >= 0
                if (busCurrent >= 0) {
                    continue;
                }
    
                regen += busCurrent * busVoltage;
            }
            return regen;
        }).reduce((sum, curr) => sum + (curr / packetArray.length), 0);
    
        return Math.abs(mpptPowerIn + regenPowerIn);
    }

    /**
     * 
     * @param packetArray 
     * @returns average power out as amps
     */
    getAveragePowerOut(packetArray: TelemetryPacket[]) {
        // If no packets, then no power out
        if (packetArray.length == 0) {
            return 0;
        }
    
        return Math.abs(packetArray.reduce((sum, curr) => 
        sum + (curr.Battery.PackCurrent * curr.Battery.PackVoltage), 0) / packetArray.length);
    }

    /**
     * 
     * @param packetArray 
     * @returns average speed in km/h
     */
    getAverageSpeed(packetArray: TelemetryPacket[]) {
        // If no packets, then no average speed
        if (packetArray.length == 0) {
            return 0;
        }
    
        return Math.abs(packetArray.reduce((sum, curr) => 
        sum + (curr.KeyMotor[0].VehicleVelocity + curr.KeyMotor[1].VehicleVelocity) / 2, 0) / packetArray.length);
    }
}