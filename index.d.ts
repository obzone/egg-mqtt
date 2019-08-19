import 'egg';
import { MqttClient } from 'mqtt'
import Base from 'sdk-base'

declare module 'egg' {
  interface Application {
    mqtt: MqttClient
    registryClient: Base
  }
}