import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AppState,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Modal from "react-native-modal";
import { Buffer } from "buffer";
//import { Base64 } from "js-base64";
import base64 from "react-native-base64";

import { BleManager } from "react-native-ble-plx";
const manager = new BleManager();

const serviceUUIDs = [
  "00001800-0000-1000-8000-00805f9b34fb",
  "909a1400-9693-4920-96e6-893c0157fedd",
  "0000180f-0000-1000-8000-00805f9b34fb",
  "0000180a-0000-1000-8000-00805f9b34fb",
  "0000fe59-0000-1000-8000-00805f9b34fb",
];

const uniqueServiceIDs = ["1800", "1400", "180f", "180a", "fe59"];
let detectedDevices = [];

const Devices = (props) => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [peripherals, setPeripherals] = useState(new Map());
  const [reachedMaxDevices, setReachedMaxDevices] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  // const [manager, setManager] = useState(new BleManager());

  useEffect(() => {
    return () => {
      manager.stopDeviceScan();
      if (manager) manager.destroy();
    };
  }, []);

  useEffect(() => {
    if (props.params && props.params.connectedDevices) {
      setPairedDevices(props.params.connectedDevices);
    }
  }, [props]);

  initializeBluetooth = () => {
    BleManager.start({ showAlert: false });

    handlerDiscover = bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      handleDiscoverPeripheral
    );
    handlerStop = bleManagerEmitter.addListener(
      "BleManagerStopScan",
      handleStopScan
    );
    // handlerDisconnect = bleManagerEmitter.addListener(
    //   "BleManagerDisconnectPeripheral",
    //   handleDisconnectedPeripheral
    // );
    // handlerUpdate = bleManagerEmitter.addListener(
    //   "BleManagerDidUpdateValueForCharacteristic",
    //   handleUpdateValueForCharacteristic
    // );

    // if (Platform.OS === "android" && Platform.Version >= 23) {
    //   PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    //   ).then((result) => {
    //     if (result) {
    //       console.log("Permission is OK");
    //       checkBluetoothPermission();
    //     } else {
    //       PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    //       ).then((result) => {
    //         if (result) {
    //           console.log("User accept");
    //           checkBluetoothPermission();
    //         } else {
    //           console.log("User refuse");
    //           checkBluetoothPermission();
    //         }
    //       });
    //     }
    //   });
    // }
  };

  checkBluetoothPermission = () => {
    if (Platform.OS === "android" && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
      ).then((result) => {
        if (result) {
          console.log("Bluetooth Permission is OK");
          scanDevices();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
          ).then((result) => {
            if (result) {
              if (result == "never_ask_again") {
                ToastAndroid.show(
                  "Provide Bluetooth Permission to Continue",
                  ToastAndroid.SHORT
                );
              } else {
                console.log("User accept");
                scanDevices();
              }
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }
  };

  handleDiscoverPeripheral = (peripheral) => {
    // var peripheralsData = peripherals;
    // console.log("Discovered peripheral", new Date());
    // console.log(peripheral);
    console.log(peripheral);
    if (peripheral.advertising && peripheral.advertising.isConnectable) {
      if (
        peripheral.advertising.serviceUUIDs &&
        uniqueServiceIDs.indexOf(peripheral.advertising.serviceUUIDs[0])
      ) {
        detectedDevices.push(peripheral);
      }
    }

    // ToastAndroid.show(
    //   "Device detected: " + JSON.stringify(peripheral),
    //   ToastAndroid.SHORT
    // );

    // if (!peripheral.name) {
    //   peripheral.name = "NO NAME";
    // }
    // peripheralsData.set(peripheral.id, peripheral);
    // setPeripherals(peripheralsData);
  };

  handleStopScan = () => {
    console.log("Scan stopped", new Date());
    console.log("Detected Devices", detectedDevices);
  };

  const scanForDevice = () => {
    if (!scanning) {
      setScanning(true);
      setShowDevices(true);
      console.log("Scanning Started");
      detectedDevices = [];
      setAvailableDevices([]);
      manager.startDeviceScan(serviceUUIDs, null, (error, device) => {
        console.log("Found Device", serviceUUIDs);
        if (error) {
          // Handle error (scanning will be stopped automatically)
          return;
        }

        let newDevice = true;
        if (device && device.id) {
          console.log("Device Id", device.id);
          // const detectedDevices = availableDevices.concat([]);
          detectedDevices.map((detectedDevice) => {
            detectedDevice.id == device.id ? (newDevice = false) : null;
          });
          if (newDevice) {
            device.name = "Myo Stark";
            detectedDevices.push(device);
            // setAvailableDevices(detectedDevices);
          }
        }
      });

      // BleManager.start({ showAlert: false }).then(() => {
      //   console.log("Module initialized1");
      //   console.log(serviceUUIDs);
      //   BleManager.scan([], 10, false, {exactAdvertisingName : "Pheezee_v1.13.9"}).then((results) => {
      //     console.log("Scan started", new Date(), results);
      //   });
      // });

      setTimeout(() => {
        console.log("detectedDevices", detectedDevices);
        if (manager && manager._scanEventSubscription) manager.stopDeviceScan();
        setAvailableDevices(detectedDevices);
        setScanning(false);
        // if (detectedDevices.length) connectToDevice(detectedDevices[0]);
      }, 5000);
    }
  };
  connectToDevice = async (device) => {
    manager
      .connectToDevice(device.id)
      .then(async (data) => {
        console.log("connectToDevice data", data);

        await device.discoverAllServicesAndCharacteristics();

        // let services = await device.services();

        // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", services);

        // for (let service of services) {
        //   let characteristics = await device.characteristicsForService(
        //     service.uuid
        //   );
        //   console.log("qqqqqqqqqqqqqqqqqqqq", characteristics);
        //   for (let characteristic of characteristics) {
        //     if (characteristic.serviceUUID == "909a1400-9693-4920-96e6-893c0157fedd") {
        //       let write = await characteristic.writeWithResponse(
        //         Buffer.from("0xAA01", "hex").toString("base64")
        //       );
        //       console.log(
        //         "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        //         Buffer.from(write.value, "base64").toString("hex")
        //       );
        //     }
        //   }
        // }

        // discoverServicesAndCharacteristics(data);
        props.params.callBacks.updateConnectedDevices(
          pairedDevices.concat([device])
        );
        setPairedDevices(pairedDevices.concat([device]));
        // writeCharacteristics(data);
        kranthi();
      })
      .catch((error) => {
        console.log("connectToDevice error", error);
      });
  };

  discoverServicesAndCharacteristics = async (device) => {
    manager
      .discoverAllServicesAndCharacteristicsForDevice(device.id)
      .then((data) => {
        console.log("discoverServicesAndCharacteristics data", data);
        delete data._manager;
        setMessage("Device: " + data);
        setShowMessage(true);
        // setPairedDevices(pairedDevices.concat([device]));
        // writeCharacteristics(data);
        kranthi();
      })
      .catch((error) => {
        console.log("discoverServicesAndCharacteristics error", error);
      });
  };

  let kranthi = () => {
    const deviceid = "D8:AC:04:46:E7:11";
    const sid = "909a1400-9693-4920-96e6-893c0157fedd";
    const cid = "909a1401-9693-4920-96e6-893c0157fedd";
    const PData = "0xAA02";
    console.log("33333333333", PData);
    manager
      .writeCharacteristicWithoutResponseForDevice(deviceid, sid, cid, PData)
      .then((data2) => {
        console.log("444444444444444444444444", data2);
        console.log("Characteristic written successfully.");
      })
      .catch((error) => {
        console.log("Error writing characteristic:", error);
      });
  };
  let sai = () => {};

  // const writeCharacteristics = (device) => {
  //   const deviceid = device.id;
  //   const sid = "909a1400-9693-4920-96e6-893c0157fedd";
  //   const cid = "909a1401-9693-4920-96e6-893c0157fedd";
  //   const data1 = Buffer.from("0xAA02", "utf8");
  //   manager
  //     .writeCharacteristicWithoutResponseForDevice(deviceid, sid, cid, data1)
  //     .then(() => {
  //       //console.log("444444444444444444444444", data2);
  //       console.log("Characteristic written successfully.");
  //     })
  //     .catch((error) => {
  //       console.log("Error writing characteristic:", error);
  //     });
  // };

  // const writeCharacteristics = (device) => {
  //   device
  //     .writeCharacteristicWithResponseForService(
  //       "909a1400-9693-4920-96e6-893c0157fedd",
  //       "909a1401-9693-4920-96e6-893c0157fedd",
  //       //device.id,
  //       "0xAA02"
  //       //"909a1401-9693-4920-96e6-893c0157fedd",
  //       //"emg.battery.percent"
  //       //base64.encode("0x2C")
  //       //"1010101000000010"
  //       //Buffer.from("1010101000000010", "hex").toString("base64")
  //       //new Buffer("1010101000000010").toString("base64")
  //     )
  //     .then((data) => {
  //       console.log("55555555555555555555555", data);

  //       readCharacteristics(device);
  //     })
  //     .catch((error) => {
  //       console.log("66666666666666666666666666", error);
  //     });
  // };

  const readCharacteristics = (device) => {
    manager
      .readCharacteristicForDevice(
        device.id,
        "0000180f-0000-1000-8000-00805f9b34fb",
        "00002a19-0000-1000-8000-00805f9b34fb"
      )
      .then((data) => {
        console.log("Battery Level data", data);
        ToastAndroid.show("Battery Level: " + data.value, ToastAndroid.SHORT);
        console.log("Battery Level", data.value);
      })
      .catch((error) => {
        console.log("Battery Level error", error);
      });
  };
  const scanDevices = () => {
    scanForDevice();
    // setAvailableDevices([
    //   { name: "Myo Stark", mac: "E2:48:38:75:DC", battery: 53 },
    //   { name: "Myo Stark", mac: "E2:48:38:75:DC", battery: 13 },
    // ]);
  };

  const connectDevice = (device) => {
    if (pairedDevices.length == 2) {
      setReachedMaxDevices(true);
    } else {
      connectToDevice(device);
    }
  };

  const disconnectDevice = (index) => {
    let finalDevices = pairedDevices;
    finalDevices.splice(index, 1);
    props.params.callBacks.updateConnectedDevices([...finalDevices]);
    setPairedDevices([...finalDevices]);
    setReachedMaxDevices(false);
  };

  navigateToHome = () => {
    props.params.callBacks.updateCurrentScreen("Home");
  };

  return (
    <View style={{ height: "100%" }}>
      <View style={{ height: "10%" }}>
        <Text
          style={{
            color: "#BFBFBF",
            fontSize: 24,
            fontWeight: 700,
            ...styles.textBasicFont,
          }}
        >
          Devices
        </Text>
      </View>
      {!showDevices ? (
        <View
          style={{
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#FCFCFC",
                marginBottom: 20,
                textAlign: "center",
                ...styles.textBasicFont,
              }}
            >
              No Myo Stark device found nearby
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#8C8C8C",
                marginBottom: 20,
                textAlign: "center",
                marginLeft: 80,
                marginRight: 80,
                ...styles.textBasicFont,
              }}
            >
              Please make sure that your Myo Stark device is turned on and
              within range of your mobile device.
            </Text>

            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: "#00ABA9",
                paddingTop: 13,
                paddingBottom: 13,
                paddingLeft: 42,
                paddingRight: 42,
                marginTop: 15,
                color: "#54C7C5",
                flexDirection: "row",
                width: 145,
              }}
              onPress={() => checkBluetoothPermission()}
            >
              <Image
                style={{
                  width: 14,
                  height: 14,
                  marginRight: 9,
                  marginTop: 3,
                }}
                source={{ uri: images.scan }}
              />
              <Text
                style={{
                  color: "#FFFFFF",
                  ...styles.textBasicFont,
                }}
              >
                Scan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={{ height: "80%" }}>
          {pairedDevices && pairedDevices.length ? (
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  height: 30,
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#F0F0F0",
                      ...styles.textBasicFont,
                    }}
                  >
                    Paired Devices
                  </Text>
                </View>
              </View>
              <View style={{}}>
                <View style={styles.separator} />
                {pairedDevices &&
                  pairedDevices.map((device, key) => {
                    return (
                      <View key={"paired_" + key}>
                        <View
                          style={{
                            paddingLeft: 15,
                            paddingRight: 15,
                            width: "100%",
                            flexDirection: "row",
                          }}
                        >
                          <View style={{ width: "50%" }}>
                            <Text
                              style={{
                                color: "#FCFCFC",
                                fontSize: 16,
                                fontWeight: 600,
                                ...styles.textBasicFont,
                              }}
                            >
                              {device.name} {key + 1}
                            </Text>
                            <Text
                              style={{
                                color: "#F0F0F0",
                                fontSize: 12,
                                fontWeight: 400,
                                marginTop: 8,
                                ...styles.textBasicFont,
                              }}
                            >
                              {device.id}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: "50%",
                              alignItems: "flex-end",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                // paddingRight: 5,
                              }}
                            >
                              <Image
                                style={{
                                  width: 20,
                                  height: 10,
                                  marginRight: 10,
                                  marginTop: 4,
                                }}
                                source={{
                                  uri:
                                    device.battery > 20
                                      ? images.mediumBattery
                                      : images.lowBattery,
                                }}
                              />
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 12,
                                  fontWeight: 500,
                                  ...styles.textBasicFont,
                                }}
                              >
                                {device.battery}%
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            marginTop: 15,
                          }}
                        >
                          <View
                            style={{
                              width: "50%",
                              paddingLeft: 15,
                              paddingRight: 15,
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                borderRadius: 20,
                                backgroundColor: "#FF5454",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                                paddingTop: 6.5,
                                paddingBottom: 6.5,
                              }}
                              onPress={() => disconnectDevice(key)}
                            >
                              <Image
                                style={{
                                  width: 10.5,
                                  height: 10.5,
                                  marginRight: 10.75,
                                }}
                                source={{ uri: images.disconnect }}
                              />
                              <Text
                                style={{
                                  color: "#FFFFFF",
                                  fontSize: 16,
                                  fontWeight: 500,
                                  ...styles.textBasicFont,
                                }}
                              >
                                Disconnect
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              width: "50%",
                              paddingLeft: 15,
                              paddingRight: 15,
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                borderRadius: 20,
                                backgroundColor: "#8C8C8C",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                                paddingTop: 6.5,
                                paddingBottom: 6.5,
                              }}
                              // onPress={() => connectDevice(device)}
                            >
                              <Image
                                style={{
                                  width: 16.8,
                                  height: 14,
                                  marginRight: 10.75,
                                }}
                                source={{ uri: images.identify }}
                              />
                              <Text
                                style={{
                                  color: "#FFFFFF",
                                  fontSize: 16,
                                  fontWeight: 500,
                                  ...styles.textBasicFont,
                                }}
                              >
                                Identify
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.separator} />
                      </View>
                    );
                  })}
              </View>
            </View>
          ) : null}

          <View style={{ flexDirection: "column", width: "100%" }}>
            <View
              style={{
                height: 30,
                width: "100%",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#F0F0F0",
                    ...styles.textBasicFont,
                  }}
                >
                  Available Devices
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "50%",
                  marginTop: 4,
                  paddingRight: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                  }}
                  onPress={() => {
                    scanDevices();
                  }}
                >
                  <Image
                    style={{
                      width: 10,
                      height: 10,
                      marginRight: 8,
                      marginTop: 5,
                    }}
                    source={{ uri: images.scan }}
                  />
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 14,
                      fontWeight: 400,
                      ...styles.textBasicFont,
                    }}
                  >
                    Scan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{}}>
              <View style={styles.separator} />
              {availableDevices &&
                availableDevices.map((device, key) => {
                  return (
                    <View key={"available_" + key}>
                      <View
                        style={{
                          paddingLeft: 15,
                          paddingRight: 15,
                          width: "100%",
                          flexDirection: "row",
                        }}
                      >
                        <View style={{ width: "50%" }}>
                          <Text
                            style={{
                              color: "#FCFCFC",
                              fontSize: 16,
                              fontWeight: 600,
                              ...styles.textBasicFont,
                            }}
                          >
                            {device.name}
                          </Text>
                          <Text
                            style={{
                              color: "#F0F0F0",
                              fontSize: 12,
                              fontWeight: 400,
                              marginTop: 8,
                              ...styles.textBasicFont,
                            }}
                          >
                            {device.id}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "50%",
                            paddingLeft: 15,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              borderRadius: 20,
                              borderWidth: 1,
                              borderColor: "#FCFCFC",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "row",
                              paddingTop: 6.5,
                              paddingBottom: 6.5,
                            }}
                            onPress={() => connectDevice(device)}
                          >
                            <Text
                              style={{
                                color: "#FCFCFC",
                                fontSize: 16,
                                fontWeight: 500,
                                ...styles.textBasicFont,
                              }}
                            >
                              Connect
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.separator} />
                    </View>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      )}
      {!availableDevices.length && !pairedDevices.length ? (
        <View
          style={{
            justifyContent: "center",
            height: "10%",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#009C9A",
              textAlign: "center",
              textDecorationLine: "underline",
              ...styles.textBasicFont,
            }}
          >
            Buy Myo Starke Device
          </Text>
        </View>
      ) : null}
      <View style={{ height: "10%" }}>
        <Grid>
          <Col style={{ justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                borderColor: "#00ABA9",
                borderWidth: 1,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                marginRight: 5,
              }}
              onPress={() => {
                props.params.callBacks.updateCurrentScreen("Home");
              }}
            >
              <Text
                style={{
                  color: "#00ABA9",
                  fontSize: 16,
                  fontWeight: 500,
                  ...styles.textBasicFont,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </Col>
          <Col style={{ justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor:
                  pairedDevices.length == 0 ? "#004847" : "#00ABA9",
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                marginLeft: 5,
              }}
              onPress={() => {
                navigateToHome();
              }}
            >
              <Text
                style={{
                  color: pairedDevices.length == 0 ? "#007978" : "#000000",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: 500,
                  ...styles.textBasicFont,
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </Col>
        </Grid>
      </View>
      <Modal isVisible={reachedMaxDevices}>
        <View
          style={{
            width: "80%",
            marginLeft: "10%",
            backgroundColor: "#262626",
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 25,
          }}
        >
          <Image
            style={{
              width: 42,
              height: 42,
              marginTop: 28,
              marginBottom: 28,
            }}
            source={require("../assets/images/max-devices.png")}
          />
          <Text
            style={{
              color: "#F0F0F0",
              fontSize: 16,
              fontWeight: 600,
              textAlign: "center",
              paddingBottom: 10,
              ...styles.textBasicFont,
            }}
          >
            More than 2 Devices Found
          </Text>
          <Text
            style={{
              color: "#F0F0F0",
              fontSize: 12,
              fontWeight: 500,
              textAlign: "center",
              ...styles.textBasicFont,
            }}
          >
            Upgrade Your Fitness Experience with Myo Stark's Multi-Device
            Support on Tablet and TV!
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              backgroundColor: "#33BCBA",
              width: 145,
              height: 45,
              marginTop: 35,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setReachedMaxDevices(false)}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 500,
                textAlign: "center",
                ...styles.textBasicFont,
              }}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={showMessage}>
        <Text
          style={{
            color: "#F0F0F0",
            fontSize: 12,
            fontWeight: 500,
            textAlign: "center",
            ...styles.textBasicFont,
          }}
        >
          {message}
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            backgroundColor: "#33BCBA",
            width: 145,
            height: 45,
            marginTop: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setShowMessage(false)}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 500,
              textAlign: "center",
              ...styles.textBasicFont,
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textBasicFont: {
    fontFamily: "Inter-Regular",
  },

  container: {
    flex: 1,
    backgroundColor: "#262626",
    paddingTop: 48,
    paddingLeft: 16,
    paddingRight: 16,
    fontFamily: "Inter",
    // alignItems: "center",
    // justifyContent: "center",
  },

  separator: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    opacity: 0.3,
    marginBottom: 20,
    marginTop: 20,
  },

  addDevice: {
    height: 40,
    borderRadius: 20,
    backgroundColor: "#004847",
    paddingLeft: 8,
    paddingRight: 10,
    color: "#54C7C5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionHeading: {
    color: "#BFBFBF",
    fontSize: 17,
    fontWeight: 600,
    paddingTop: 40,
    marginBottom: 20,
  },

  takeTestDisabled: {
    color: "#454545",
    fontSize: 20,
    fontWeight: 700,
  },

  takeTest: {
    color: "#54C7C5",
    fontSize: 20,
    fontWeight: 700,
  },

  trainingDisabled: {
    backgroundColor: "#1F1F1F",
  },

  training: {
    backgroundColor: "#004847",
  },
});

export default Devices;

const images = {
  lowBattery:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACwSURBVHgB7ZJLDsIgEEAH6bILj2BYsjLpAeQI3kBv4Aka9QQeqXATkx7ARbcDOKgkfmqTfhYs+pIJZIY8hjAAM+lirb0gou8bxObdk8UNFdbQNADGPBNSahDi2tHDkmLrnFO0mp8q3VZhXXtfFDF2HbLQwOrVZUWvO8b8AsajSH6aUvhB+sIMxqMZY7pdmOfgyvKx9VLuUQj1z0I/G8YGgoxzfm47cBgw2LfvwZ5JkDseP6xP/pZUCwAAAABJRU5ErkJggg==",
  mediumBattery:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADMSURBVHgB7ZK9DcIwEIXPPxJINHSkDAOgZANaSgqghhVYAFgA2CArwAaMQJggNFDiKkVwZF4KpDikiVKEIk86n3wnfz7dHVGr5mWM8bTWL5ipYmmaHvIclh1ILOGC8/NBKkmsjwadbjRxnEtJDVOYklIOvwGZz65vId3juPCGRTRfrIokFODC+ahuwzk/McZCTvXUR4u2APrZpS7M0v/CJNWTQuOPGMD1B7YfeaTe9mr0hPRnWgdFCiAumq+EEDsrgeC46sKWLW2rhvUB7TGk3lDBR+cAAAAASUVORK5CYII=",
  plus: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIqSURBVHgBvVZdbtpAEJ5Z7BjUF47gG6TkKcZBtU9QpJK2b+UGTU4Q5wRNT9DkrVLciJ7AVpVC05eSE5TcwH2o+oN3p7sr4ZpgwIGQTwKzO97v29mZnQFhCfb7/ScCqcsAPCKqA2JdGxCGcjxExF64635cxIELyF8TiCAjXQACGMnv4IOzd1ZK5GUU2WnVfCdNHtwZFAuB3QvXvZkrogR4dSuSO7NhRSivSICXF8pE2lFUN6tb39YRyAvx338bPd9P1JhNDEbNPLoPAQW5c9uwzKPJWIuoYwLCg6WrU+GHjotYKREvxAOVmZkIr/5XvU8QE+1MhAjasAkI6KpYs/2v0qUSd2ElSF7TsrYNSOFx0ZVElYqAo6k5xnS2wJh+AMN4+n2yixJHoLANQir0Qi44DZ3mcZHt3HWH8uHn5zqDzyquAcxsFm0GDwADBb8hVpkxSE+6ncGll59DgYfKixdXV9tcjE9uvW8XFUIkTAwwje/AadaozxftKSIh9NEK5PXbtW1epSXOr9n4559rmcMJbAKSN2y1YqbrC4NT2ABI9hr11IGXqdmDDYCsWqD5JxOdL5dvStWvskA6CXf3DtXPLIXTX+Nj1B1ufahSn1qPsjuWiajYVID56wrppmXVvF6jkcyIKLx3nJESkr7GsBIwVgIXOzvz228ezweDV+qPRKlGJlMVgQXnzebbQull65/1P7UZVp4SykJK8jMhRUwEQIwgzkKnFS/i+Adt/9Gt+DCyXAAAAABJRU5ErkJggg==",
  testingDisable:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA6CAYAAAAURcGYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM1SURBVHgB7ZpLbhpBEIaLh/css8tYHCDkBEE8BLtwA+MTxDmByQmS3ADfwFseImSZVcgFyPgGs0SCgfwV9UgETcbT013dyOKTsBt6BvinaqqrqiFyRLPZrJFjyuSATqdzX61WP5BjSiQMLBZcXV39PhwO0X6/bywWiydyhLjlYLHP/L9UKtXK5fKYHCIqrt1u30DUIHmOcRMu+p4cIeaWyh2/YRicTIXb7fbtcrmMSBgxy6kAEqRMBZi7JweIWC4JIlnH4P5rTCaTXySIiOWUO2YSx/EXEqZCllFBZPjccTgmqNfr0Xq9/kFCWHXLjCCSCq99u93uWiq4WHXLSqXCgSLIezyvfZLBxZrler3eG2QgKypGczabfSfLWLMchD1SQeCeIsHFSkDhxPg4E9EF576SCC7GbqmCyE8MjUoaicTa2C1VEDGu1VRibdU9jSzHa5pApm8tuBhZDsJGZJ+xraq9sDgOIqSxpmkQ2KraC7llnsTYBFvBpZDlkupaCltVu7a40+paChtVu5Zb6ibGFjCq2rUsl1FdS2FUtee2nHQQyaJo1V7VODaCi1yTH8SbSRcuXDBHfCPElFar9ToZ66ZjZyeOKwK1njY5SzmdR965Uo/Rc2JLefuMRUDyO8x7tXkd5cIXa9qQcgKBj/iMu/99RpWbo2lXyCWcQ+I7jEmzouccFxdkgPNH8/n80+m8k53VLFRziTtnhQtUnD9S9eU/eBWnLDYiC6QJ9CaO7zF8IbsNIQjsdrvvkufexOm23vPCUTQZexHHVtOJijpwcEys50Wc9M82Euv5cssGyfL3/b2Ik15XucHEaZtzcf1+PyAHoGvQ8L6IS4Ed29qLFQfXfHIubrPZOOmHQFzkXJzqQYYkDHaKVl7ckksVkmXJf3wtBaLiVPnkRxxvLsJ6S5IhnE6nDzzwmTjfkQDHJZQ3cao9blUg/+QjsRrjdZ2De349LlEMGaPV8PH4Be+LOPc+TAWyxXChbk9f5wZRhEdIHmGByDkf4jjW3fsLIewW5y/TJs+ub4lW4wAX+0ZVDmlNI04CVhzuj++vNM6644yKugHL1Lj9iP5khOqdd1rDvDutfwCCAzoMdtNTBgAAAABJRU5ErkJggg==",
  testing:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA6CAYAAAAURcGYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN+SURBVHgB7ZpfTttAEMZn1mlI+pQbECK1IQip4QTNDZobFE4AtDRU6gPuExSoSm8QbsANSk+QVGoJaaXU3MAvJWBqb3cTUiJwhO3d8SLE7wE5S/jz+RvPzswGICXsVqsAKZOBFNjpdjaC4eV7SBEEYjY7raKFud8A3GVZqK6V5k4gJRgQY7H8p+EVFgIPm5AipOI+dDsvgfP62FJt5/jHC0gJsrCU4cgw90X8geL4Ogdw+v2zBXthwQViyJxjVn75ujCJXMvnpzYgBUicu0oikwmQVd+Wy9+AEBLnZDje+h4e7AEx2sXJJBIWjiHUto6PloEQrWE5KYlMhrun/fMZquSi1TmL5TaiC5NggTK5aHPuY6/7zPeCNiTBglrjSeUraEabc3+94ACS4nOS5KJFnCyM44XjdbBKkVyUw3Kwp7F8S5RZii2N/sJa2TmZRNSFSbDge6A1PJWcG+xpHJqgE43JRc05DjZohvvQ1NW1JxannkTCGRTWj3NakkuisIxSGKuhJ7kkcu6qu6ZCT9ceW1xId02FctceKyzjF8ZqqHbtsZyb1F1Todq1R3aOPolMJmnXHnkoe34G7lQOZsAA5/1T8mHSAw88oA75QYgqu72j6dF13HLszomTHYEsnEUrVRMvazffwduA2GaPuH2bWLzsyRaBAJadWlwrlSLd7WFHLxvf6P8LB35gZWFlksiMKFGKPPQOpceWqCEZWs24HT0C1gMP6sIge71cuXGwSX4+dxuyL2TADlRGFSLybCHwRplmVJx0jGvq5sMEGhMnnzEEpncgJARu/+o8H702Ji7+6D0i/lUkGBEnXQOiDC2ojdwzIi4j+kKg5NI9M2EZ8CqQMvz9RsTR76tY2O31plMXt9npFCEFuOdVjW/iVCDywr0VdxHASericrmzVOYhge+7qYtbnRnMIB0g5t38fNtIWCLD5EfM0TiUX4yIs5CTimM4PDM0Iu6VOFzEy7tLgLNWruzLC2PZkmXZChAgXLP/X4MhXpfEeJyhVoFi7LA3ck1idJ9rPJ39jKjp6Fk8Z+uzc6vjS8Y38Tdi9qEqUDrWKFeWrq9nENHlnDtgEClQ1Jz7FoL8KGMxxo86ovtealTmDsO+eefmlrvdo3oATH6sscZDhkbSDDFMagu3m+PPVxh3euK8/fN7FX2rIFqkImPcDTBwTv9cOFFPWv8BT9NFpc8Z0HMAAAAASUVORK5CYII=",
  trainingDisabled:
    "data:image/png;base64,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",
  training:
    "data:image/png;base64,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",
  scan: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADKSURBVHgBjVIBEYMwDGzvEFAH4GCzMCWVUAnMARKQsjlAQjcFxUGWct8tyxGOv8tRknzyTeOcABENbBNbph8WtpmtR84Wl6TEVpBcQHgoX4KPJKkFo1OoPqFiK9TkEQK9M4C81p069o2I3b337x1CjQ/4fbFdW6DepRhdguwikD0u+uRuN4vMn6Dca4dDcAa44FoT9ypmS6qh4NIOE3THE6SI3CTHXE48R/7LEwuQdWdMVm5V0hWTGHfBai2kVu5IzgwCCRUjnuWLD5FKZUGK4OH1AAAAAElFTkSuQmCC",
  disconnect:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACWSURBVHgBhVABDYAwDFtQgANwcByAA3CGhFvAARKQgARwcNpkkHEGLGmeb+3WTeQjUkoV0AKl/AVIEdiAGVgpzAkLEAw5np2ZV3FpBUE78R2ciWzY5MlL5AiYr3LPvSfS2mjJI5Mv9npbY7Fm0bHg2isAbr7LM2qAy083EU+lJwvmH08bOmnJx7c6flZxlL/Qzh13+uIdshTa8u7is2UAAAAASUVORK5CYII=",
  identify:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADwSURBVHgBlVLtDYJADL0z/BcmACfADU4ncATiBm6AG+AIsgluABOIE8gG5ys+k8sF4WhSSnuvrx+pUhRrbapWCPCxHyihz1Ai4DLiK/E3jNe0exUmhvYmH+22p7UeYAu42QxBD1ztBqLfCHh44f+E37sAZ0hklAH2Ad2OJNCGD0fYhIS7fwzAWRhZas7cXkjOfG8XxvClg0rhIULVxqkSzCD7YyfjTiq2d1UrBHkyzmXsRH1HEJLEAZgAHs3c3mc3dlne/lG6d5Jjzk6uUc0vuOU9jXi3g4JVDP2MsZh+7PmG+MIlKUUnxkodUpHDVM4HQbnVhHcZ+kEAAAAASUVORK5CYII=",
};
