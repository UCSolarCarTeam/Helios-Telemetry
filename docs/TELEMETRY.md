_last edited march 22 2025_

# Documentation on what telemetry does

Hi I'm burton one of the Telemetry team tech leads and I will try and explain everything that Telemetry does as well as our responsibilites

What is Telemetry? Telemetry is just statistics and analytics of the car basically. That's all we do.

First off, Telemetry has the least impact on whatever the rest of the solar car team does. Although it is a requirement in the race (I think) to have some sort of telemetry (statistics about the car basically), we don't really interact with any of mechanical or electrical (sometimes we do but not really).

## Our projects

As of March 3rd 2025, we have 3 main projects (in terms of priority):

1. Helios Telemetry Site
2. Helios Machine Learning (sort also for the site lol)
3. Solar Car Front Facing Website / Business Portal

### Helios Telemetry Site

Our main telemetry site found [here](https://telemetry.calgarysolarcar.ca/). This is just where we show all of our stats. There are multiple components that part of the site:

#### Main PIS data

This includes the tabs at the top (Battery, Faults, Motor, MPPT). If you have any questions about what a field means, that is not a question for anyone on the Telemetry team (unless they've been on the team for a while or have been to race). Ask electrical.

This data is what is in the [packet](./TELEMETRY.md#packet).

#### Race tab

This is the tab named Race, and we use this tab for viewing the laps of the drivers who drove them. We store the drivers in Dynamo in the [driver table](./AMPLIFY.md#driver-table), and the laps in the [lap table](./AMPLIFY.md#lap-table). The drivers and the laps are associated by a partition key of [Rfid](./TELEMETRY.md#rfid).

There are multiple fields that are calculated in the lap object, such as the Amp Hours or Average speed of the car. Again, who knows what these fields actually mean. Ask your tech lead, or if you really need to, Viscomm. If they don't know, ask Electrical.

These laps are used to just be analyzed by the people in the pit when they race. They are also used in the ML workflow for the [analysis tab](#analysis-tab)

#### Analysis Tab

This is the tab named Analysis. I lowk didn't work on this tab specifically, but we use Python and PyTorch do analyze the [lap data](#lap).

We use graphs. Something like that

#### Faults "Box"

In the bottom right of the site is the faults box. There are two severities of the faults that come in, and they are either warning (yellow) or errors (red). This is subject to change.

You can find an explanation for the logic of the faults tab [here](./CLIENT.md#faults-box-logic)

Hypothetically in the future if it isn't already implemented yet, when faults come in the corresponding part on the 3d car model should also glow according to the location of the fault, which is either in the battery, motor, arrays, etc.

#### Realtime Map

Based on the latitude and longitude found in the [packet](#packet), we can visually show the car as well as calculate the direction (bearing) of the car.

There is also a flag that is set on the map. Everytime we pass the flag, a lap is completed yay

More information in the [lap section](#lap)

#### Playback Function

Current in progess as of when this was written.

The primary goal of the playback is to "play back" data from a previous time in the race. One use case that I can think of is that people in the pit would basically mark a time when an error occured, and then when race ends they could play that specific time back.

The switch for this under the logo in the top left.

#### Network tab vs. Demo

**Demo**: Demo data is generated either when the demo button is explicitly pressed in the settings or when you cannot connect to the network. Demo data is generated using the faker-js library, and the logic of that can be found [here](./CLIENT.md#generate-fake-data)

**Network**: Network data is generated when we are sent data over [MQTT](./SERVER.md#what-is-mqtt) from the Viscomm team. This is real time data that changes with every [packet](#packet) sent.

#### Favorites

The favorites are past the map and 3d model of the car. You can add favorites by hovering over any field that is currently in any of the [main PIS data tabs](#main-pis-data).

The point of this is to have the pit crew highlight which stats are important and which ones to watch.

The logic of it can be found [here](./CLIENT.md#favorites-logic)

We are lowk doing it in a very efficient way. Future leads or members can take a look and try to make it more efficient.

### Terms that we use often

#### Packet

Sort of like a basic unit of data that we use. This follows the [**ITelemetryData**](../packages/shared/src/types.ts#L394) type that is found in the [shared](./SHARED.md) folder. This contains all the information that we use to calculate laps, to get the location of the car, etc. This is sent to us by the Viscomm team and we recieve and visualize it.

#### Lap

This is calcuated based off of the [packet data](#packet), and the logic for that can be found in the [LapController.ts](../packages/server/src/controllers/LapController/LapController.ts). Logic for calculating all the lap data, checking if the lap has been completed, etc.

More information on the logic can be found [here](./SERVER.md/#lap-controller)

#### PIS (idek what this stands for blame Ideen)

Man this irritates me greatly because I don't even fully understand the PIS

It's supposed to be dynamic, and any change you make to the [packet](#packet) structure.

You can find a brief explanation of the logic [here](./CLIENT.md#pis-logic)

### Rfid

What we identify the drivers by. Basically when you scan your UCID (even credit cards, or any other card that has tap) an RFID is assoicated to it. We use this Rfid to relate drivers to their laps.
