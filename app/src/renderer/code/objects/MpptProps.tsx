export interface ChannelData {
  arrayVoltage: string
  arrayCurrent: string
  batteryVoltage: string
  temperature: string
}
export interface UnitData {
  Channel0: ChannelData
  Channel1: ChannelData
}
export interface MpptData {
  Unit0: UnitData
  Unit1: UnitData
}
