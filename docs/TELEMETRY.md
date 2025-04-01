_last edited march 29 2025_

# What does the telemetry team do?

Hi I'm burton one of the Telemetry team tech leads and I will try and explain everything that Telemetry does as well as our responsibilites

What is Telemetry? Telemetry is just statistics and analytics of the car basically. That's all we do.

First off, Telemetry has the least impact on whatever the rest of the solar car team does. Although it is a requirement in the race (I think) to have some sort of telemetry (statistics about the car basically), we don't really interact with any of mechanical or electrical (sometimes we do but not really).

## As a new recruit, what should you know?

Future tech leads can edit this if they want but this is what I think

If you're a 3rd year you were probably recruited because you know what you're doing. Hopefully at least LOL this is more for first and second years

You may be intimidated with the amount of stuff you have to learn - most first and second years have never touched typescript before, and many of the technologies listed below. However this is what the documentation is written for - and here are some words of advice

1. You were recruited for a reason - your tech lead is not dumb (hopefully) and knows what the team needs. "Oh but I barely know anything and I barely even know HTML and CSS" - please know that hard work trumps all. We have learned from our mistakes in recruiting and would rather recruit someone who wants to learn, rather than someone who knows it all. If you feel like you have imposter syndrome, just ask yourself this question: "Am I afraid of being unemployed in the future" if the answer is yes then that in itself should motivate you to learn
2. Ask your tech leads for help if you are stuck - We would rather help you then you be stuck on something for the whole workday. "Oh but they look busy" nah we are not busy just ask

I guess at the very least, we expect you to know Python or Java. But those are first year requirements. So basically nothing lol

Good luck!@#!@!

### Things you should probably install

**Yarn**: Similar to when you run `npm run dev`, yarn is just another package manager. There are instructions to install it [here](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

**Prettier**: Just an extension to make your code prettier. You can install it in the extensions tab (if you're in vscode). You can install it [here](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

**ESLint**: An extension to "lint" your code. You can install it in the extensions tab (if you're in vscode). You can install it [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

**Git Graph**: An extension to see the different git branches created, which is good for visualization. You can install it [here](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

**GitLens**: An extension to see who wrote a piece of code in the repository, also known as `git blame`. You can install it [here](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

The rest of these are optional, but helpful

**Color Highlight**: An extension to highlight colors in your code. You can install it [here](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)

**Pretty Typescript Errors**: Typescript errors that are actually readable. You can install it [here](https://marketplace.visualstudio.com/items?itemName=YoavBls.pretty-ts-errors)

**Material Icon Theme**: To make the file directory a little bit more easy to look at, I suggest this. You can install it [here](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

**Live Share**: If you are doing peer programming sessions with your tech lead or other team members, you can collaborate in real-time with this tool. You can install it [here](https://marketplace.visualstudio.com/items?itemName=ms-vsliveshare.vsliveshare)

### Local Env Setup

Also make sure you follow whatever is written in the [README](../README.md) as well regarding the berry stuff

#### Prettier Setup

You should have prettier on save configured. What this does is that when you save, prettier formats your code for you (very nice!)

You can follow these commands:

1. `ctrl+,` (windows) or `cmd+,` (mac)
2. Type in `format on save`
3. Click the first checkbox
4. After that, click the link in the red box
5. Change it from `off` to `onFocusChange`

![format on save photo](https://i.imgur.com/pBigCnc.png)

Now, whenever you switch windows, you will save meaning you don't have to save the file and then switch to the preview to save stuff

#### AWS Setup

Once you start working with things related to AWS, follow the guide [here](./AMPLIFY.md#aws-environment-setup)

## Our projects / tech stacks

As of March 3rd 2025, we have 3 main projects (in terms of priority):

1. Helios Telemetry Site
2. Helios Machine Learning (sort also for the site lol)
3. Solar Car Front Facing Website / Business Portal

### Helios Telemetry Site

Our main telemetry site found [here](https://telemetry.calgarysolarcar.ca/). This is just where we show all of our stats.

This site uses:

- Typescript
- React
- Next.js
- Express.js and Node.js
- Tailwind
- MUI and Mantine Styled Components
- MapboxGL and ThreeJS
- MQTT
- Socket.io
- Vercel
- AWS Services
  - DynamoDB (databse for our tables)
  - AWS Amplify (no clue why we need this lowk)
  - AWS CodePipeline (Commit, Build and Deploy)
  - AWS ECR and ECS (deploying our ec2 instances)
  - Route 53 (for our DNS records)

### Helios Machine Learning

Also technically a part of the website, but the repository is in a different place [here](https://github.com/UCSolarCarTeam/ML-Telemetry)

Our ML stack is listed [here](./ML.md).

### Solar Car Front Facing Website / Business Portal

Our front facing website that contains information about the roster, our sponsors etc. If you just joined the team and are onboarding, please check it out [here](https://calgarysolarcar.ca/)

You can scroll to the bottom and sign up at the team portal. Get the current team lead to verify you so you can add your information

This site uses:

- Typescript
- React
- Next.js
- SASS
- Prisma
- Supabase
- Clerk
- TRPC
- Vercel

## High Level Communication Explanation

![high level archi](https://i.imgur.com/xhSfwxV.png)

Above you can see the high-level architecture of the communication between our frontend, backend, and the car. There are sections that go into more detail about these topics here:

- [MQTT](./SERVER.md#what-is-mqtt)
- [AWS](./AMPLIFY.md#what-aws-services-do-we-use)
- [Sockets](./SERVER.md#wtf-is-a-socketio)

There is no frontend stuff listed here because there the sockets handle broadcasting it from the backend to the frontend.

In race, here is how the data flow should work:

1. The car sends backs via MQTT to the backend hosted in the cloud by the AWS
2. The backend receives these packets on the specified port
3. The backend then sends the client these packets via Socket.io
4. The client/frontend receives these and displays it

## Example of running everything

One good example that I have of how can you can imitate this flow is by using this website, as well as the [Helios MQTT Webserver Test](https://github.com/UCSolarCarTeam/Helios-Mqtt-Webserver-Test). Here is a brief explanation of what I mean:

- When you run `yarn dev` or `npm run dev` for the **Helios-Telemetry** repository you are running both the **client and the server**, due to the script in the `package.json` file [here](../package.json).
- **_If you're confused about how this runs both the client and the server, please check [here](./CLIENT.md#wtf-is-a-package-json-script)_**
- When you run `yarn dev` or `npm run dev` for the **Helios-Mqtt-Webserver-Test** you are running a **simulation of the car sending the backend packets via MQTT**.
- Below is a screenshot of what you should sort of be seeing:

**Running yarn dev in the Helios-Telemetry repo:**
![client server terminal](https://i.imgur.com/xiPuvOP.png)

**Running yarn dev in the Helios-MQTT-Webserver-Test repo:**
![mqtt webserver test](https://i.imgur.com/mtHhmLF.png)

This is an example of one single packet being sent in from the webserver test (the car in this simulation) to the server (when you run yarn dev, but the server part) and then being emitted to the client (when you run yarn dev, but the client part).

You can also see on `http://localhost:3000` that on the network setting, that the packets that are beign sent from the webserver test are being updated in the actual frontend as well! COOL!!!! LOL!!!!

## Some things you should know about before working on this project

- Packets are assumed both on [demo and network](./CLIENT.md#demo-switch) mode to be sent every 0.5 seconds
- The data flow during race starts at the car, to the backend hosted on AWS, and then to us on the client side (the user looking at the site)

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

You can find an explanation for the logic of the faults tab [here](./CLIENT.md#faults-context)

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
