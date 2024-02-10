/* eslint-disable @typescript-eslint/restrict-plus-operands */
// eslint-disable-next-line prettier/prettier
import PISTransformer from "@/components/transformers/PIStransformer";
import mppt from "@/objects/PIS/PIS.mppt";

// const fakeData: MpptData = {
//   Unit0: {
//     Channel0: {
//       arrayVoltage: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
//       arrayCurrent: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "C",
//       batteryVoltage:
//         faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
//       temperature: faker.number.int({ min: 22.0, max: 100.0 }).toString() + "C",
//     },
//     Channel1: {
//       arrayVoltage: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
//       arrayCurrent: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "C",
//       batteryVoltage:
//         faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
//       temperature: faker.number.int({ min: 22.0, max: 100.0 }).toString() + "C",
//     },
//   },
//   Unit1: {
//     Channel0: {
//       arrayVoltage: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
//       arrayCurrent: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "C",
//       batteryVoltage:
//         faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
//       temperature: faker.number.int({ min: 22.0, max: 100.0 }).toString() + "C",
//     },
//     Channel1: {
//       arrayVoltage: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
//       arrayCurrent: faker.number.int({ min: 0.0, max: 100.0 }).toString() + "C",
//       batteryVoltage:
//         faker.number.int({ min: 0.0, max: 100.0 }).toString() + "V",
//       temperature: faker.number.int({ min: 22.0, max: 100.0 }).toString() + "C",
//     },
//   },
// };

function MpptTab(): JSX.Element {
  return (
    <div>
      <PISTransformer root={mppt()} />
    </div>
  );
}

export default MpptTab;
