/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

export default class Home extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
  }

  componentWillMount() {
    console.log('mounted');
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanandcon();
        subscription.remove();
      }
    }, true);
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        // Handle error (scanning will be stopped automatically)
        return;
      }
      console.log('error1');
      console.log(device.name);

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'SH-HC-08') {
        // Stop scanning as it's not necessary if you are scanning for one device.
        this.manager.stopDeviceScan();
        console.log(`Found ${device.name}`);
        this.setState({
          device: device,
        });
        // Proceed with connection.
        device
          .connect()
          .then((device) => {
            console.log(device);
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            console.log(device);
          })
          .then((result) => {
            // Do work on device with services and characteristics
            //console.log(this.manager.characteristicsForService("00001800-0000-1000-8000-00805f9b34fb"))
            console.log(result);
            console.log('connected');
          })
          .catch((error) => {
            // Handle errors
            console.log(error);
          });
      }
    });
  }

  scanandcon() {
    this.manager.startDeviceScan(null, null, (error, device) => {
        console.log('Scanning...');
      console.log(device);

      if (error) {
        console.log(error.message);
        return;
      }
      this.manager.stopDeviceScan();
      if (device.name === 'MyDevice') {
        console.log('Connecting to Tappy');
        this.manager.stopDeviceScan();

        device
          .connect()
          .then((device) => {
            console.log('Discovering services and characteristics');
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            console.log(device.id);
            device
              .writeCharacteristicWithResponseForService(
                '12ab',
                '34cd',
                'aGVsbG8gbWlzcyB0YXBweQ==',
              )
              .then((characteristic) => {
                this.info(characteristic.value);
                return;
              });
          })
          .catch((error) => {
            this.error(error.message);
          });
      }
    });
  }

  send() {
    this.manager
      .writeCharacteristicWithResponseForDevice(
        '58:7A:62:4F:EF:6D',
        this.device.serviceUUIDs[0],
        this.manager.characteristicsForDevice(this.device.id),
        'ok',
      )
      .catch((error) => {
        console.log('error in writing data');
        console.log(error);
      });
  }

  render() {
    return <View></View>;
  }
}
