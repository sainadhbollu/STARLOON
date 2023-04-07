import { StatusBar } from "expo-status-bar";
import React, { useState, Component, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
  Platform,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

const Home = (props) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // checkBluetoothPermission();
    checkLocationPermission();
  }, []);

  useEffect(() => {
    if (props.params && props.params.connectedDevices) {
      setDevices(props.params.connectedDevices);
    }
  }, [props]);

  checkLocationPermission = async () => {
    // console.log("111111111111111111111111", Platform.Version);
    if (Platform.OS === "android" && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((result) => {
        if (result) {
          console.log("Permission is OK1111");
          // checkBluetoothPermission();
          checkPermission2();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ).then((result) => {
            if (result) {
              console.log("User accept Location Permission");
              // checkBluetoothPermission();
              checkPermission2();
            } else {
              console.log("User refuse Location Permission");
              // checkBluetoothPermission();
            }
          });
        }
      });
    }

    // if (Platform.OS === "android" && Platform.Version >= 23) {
    //   PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    //   ).then((result) => {
    //     if (result) {
    //       console.log("Permission is OK");
    //       // checkBluetoothPermission();
    //     } else {
    //       PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    //       ).then((result) => {
    //         if (result) {
    //           console.log("User accept Location Permission");
    //           // checkBluetoothPermission();
    //         } else {
    //           console.log("User refuse Location Permission");
    //           // checkBluetoothPermission();
    //         }
    //       });
    //     }
    //   });
    // }
    // if (Platform.OS === "android" && Platform.Version >= 23) {
    //   PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE
    //   ).then((result) => {
    //     if (result) {
    //       console.log("Permission is OK");
    //       // checkBluetoothPermission();
    //     } else {
    //       PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE
    //       ).then((result) => {
    //         if (result) {
    //           console.log("User accept Location Permission");
    //           // checkBluetoothPermission();
    //         } else {
    //           console.log("User refuse Location Permission");
    //           // checkBluetoothPermission();
    //         }
    //       });
    //     }
    //   });
    // }
    // let status = [];
    // // const status = await requestMultiple([
    // //   PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    // //   PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    // //   PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    // //   PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
    // // ]);
    // if (
    //   status[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
    //     "granted" &&
    //   ["granted", "unavailable"].includes(
    //     status[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT]
    //   ) &&
    //   ["granted", "unavailable"].includes(
    //     status[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN]
    //   ) &&
    //   ["granted", "unavailable"].includes(
    //     status[PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE]
    //   )
    // ) {
    //   return true;
    // }

    // PermissionsAndroid.check(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    // ).then((result) => {
    //   if (result) {
    //     console.log("Fine Location Permission is OK");
    //     checkBluetoothPermission();
    //   } else {
    //     PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //     ).then((result) => {
    //       if (result) {
    //         console.log("User accept Fine Location");
    //         checkBluetoothPermission();
    //       } else {
    //         console.log("User refuse Fine Location");
    //         checkBluetoothPermission();
    //       }
    //     });
    //   }
    // });

    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   {
    //     title: "Permission Localisation Bluetooth",
    //     message: "Requirement for Bluetooth",
    //     buttonNeutral: "Later",
    //     buttonNegative: "Cancel",
    //     buttonPositive: "OK",
    //   }
    // );
    // console.log("3333333333333333333333333333", granted);
  };

  checkPermission2 = () => {
    if (Platform.OS === "android" && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
      ).then((result) => {
        if (result) {
          console.log("Permission is OK");
          // checkBluetoothPermission();
          checkPermission3();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
          ).then((result) => {
            if (result) {
              console.log("User accept Location Permission");
              // checkBluetoothPermission();
              checkPermission3();
            } else {
              console.log("User refuse Location Permission");
              // checkBluetoothPermission();
            }
          });
        }
      });
    }
  };

  checkPermission3 = () => {
    if (Platform.OS === "android" && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ).then((result) => {
        if (result) {
          console.log("Permission is OK");
          // checkBluetoothPermission();
          checkPermission4();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
          ).then((result) => {
            if (result) {
              console.log("User accept Location Permission");
              // checkBluetoothPermission();
              checkPermission4();
            } else {
              console.log("User refuse Location Permission");
              // checkBluetoothPermission();
            }
          });
        }
      });
    }
  };

  checkPermission4 = () => {
    if (Platform.OS === "android" && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE
      ).then((result) => {
        if (result) {
          console.log("Permission is OK");
          // checkBluetoothPermission();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE
          ).then((result) => {
            if (result) {
              console.log("User accept Location Permission");
              // checkBluetoothPermission();
            } else {
              console.log("User refuse Location Permission");
              // checkBluetoothPermission();
            }
          });
        }
      });
    }
  };

  checkBluetoothPermission = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    ).then((result) => {
      if (result) {
        console.log("Bluetooth Permission is OK");
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
        ).then((result) => {
          console.log("111111111111111111", result);
          if (result) {
            console.log("User accept Bluetooth Permission");
          } else {
            console.log("User refuse Bluetooth Permission");
          }
        });
      }
    });
  };

  const addDevice = () => {
    props.params.callBacks.updateCurrentScreen("Devices");
  };

  return (
    <View>
      <ScrollView style={{ height: "100%" }}>
        <View>
          <Text
            style={{
              color: "#BFBFBF",
              fontSize: 17,
              fontWeight: 600,
              ...styles.textBasicFont,
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              color: "#54C7C5",
              fontSize: 32,
              fontWeight: 800,
              paddingBottom: 10,
              ...styles.textBasicFont,
            }}
          >
            MYO STÄRKE
          </Text>
        </View>
        <View>
          <View style={{ ...styles.separator }} />

          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
          >
            {devices &&
              devices.map((device, key) => {
                return (
                  <View
                    key={"device_" + key}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <TouchableOpacity
                      style={{ justifyContent: "center", alignItems: "center" }}
                      onPress={() => {
                        props.params.callBacks.updateCurrentScreen("Devices");
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={{
                            width: 20,
                            height: 10,
                            marginRight: 10,
                            marginTop: 3,
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
                            color: "#FCFCFC",
                            fontSize: 12,
                            fontWeight: 500,
                            ...styles.textBasicFont,
                          }}
                        >
                          {device.battery}%
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: device.battery > 20 ? "#BFBFBF" : "#FF3333",
                          fontSize: 17,
                          fontWeight: 600,
                          ...styles.textBasicFont,
                        }}
                      >
                        {device.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}

            {devices.length < 2 && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: devices.length == 0 ? "100%" : "50%",
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TouchableOpacity
                    style={styles.addDevice}
                    onPress={() => {
                      addDevice();
                    }}
                  >
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                        marginRight: 9,
                      }}
                      source={{ uri: images.plus }}
                    />
                    <Text
                      style={{
                        color: "#54C7C5",
                        fontSize: 16,
                        fontWeight: 500,
                        ...styles.textBasicFont,
                      }}
                    >
                      Add Device
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <View style={{ ...styles.separator }} />
        </View>

        <View>
          <Text style={{ ...styles.sectionHeading, ...styles.textBasicFont }}>
            Testing
          </Text>

          {devices.length == 0 ? (
            <View
              style={{
                height: 100,
                paddingBottom: 30,
                paddingTop: 30,
                backgroundColor: "#1F1F1F",
              }}
            >
              <Grid>
                <Col
                  style={{
                    width: "33%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      marginRight: 10,
                    }}
                    source={{ uri: images.testingDisable }}
                  />
                </Col>
                <Col
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.takeTestDisabled,
                      textAlign: "center",
                      ...styles.textBasicFont,
                    }}
                  >
                    Take your test today
                  </Text>
                </Col>
              </Grid>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                height: 100,
                paddingBottom: 30,
                paddingTop: 30,
                backgroundColor: "#004847",
              }}
              onPress={() => {
                props.params.callBacks.updateCurrentScreen("Testing");
              }}
            >
              <Grid>
                <Col
                  style={{
                    width: "33%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      marginRight: 10,
                    }}
                    source={{ uri: images.testing }}
                  />
                </Col>
                <Col
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.takeTest,
                      textAlign: "center",
                      ...styles.textBasicFont,
                    }}
                  >
                    Take your test today
                  </Text>
                </Col>
              </Grid>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <Text style={{ ...styles.sectionHeading, ...styles.textBasicFont }}>
            Training
          </Text>

          {devices.length == 0 ? (
            <View style={{ height: 100, alignItems: "center" }}>
              <Grid>
                <Col
                  style={{
                    ...styles.trainingDisabled,
                    marginRight: 10,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      marginRight: 10,
                    }}
                    source={{ uri: images.trainingDisabled }}
                  />
                </Col>
                <Col
                  style={{ ...styles.trainingDisabled, marginRight: 10 }}
                ></Col>
                <Col style={styles.trainingDisabled}></Col>
              </Grid>
            </View>
          ) : (
            <View style={{ height: 100, alignItems: "center" }}>
              <Grid>
                <Col
                  style={{
                    ...styles.training,
                    marginRight: 10,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                    }}
                    onPress={() => {
                      props.params.callBacks.updateCurrentScreen("Training");
                    }}
                  >
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        marginRight: 10,
                      }}
                      source={{ uri: images.training }}
                    />
                  </TouchableOpacity>
                </Col>
                <Col
                  style={{ ...styles.trainingDisabled, marginRight: 10 }}
                ></Col>
                <Col style={styles.trainingDisabled}></Col>
              </Grid>
            </View>
          )}
        </View>

        <View>
          <View
            style={{
              alignItems: "center",
              paddingTop: 40,
            }}
          >
            <Text
              style={{
                color: "#00ABA9",
                fontSize: 12,
                ...styles.textBasicFont,
              }}
            >
              Need help?
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              padding: 40,
            }}
          >
            <Text
              style={{
                color: "#595959",
                fontSize: 14,
                ...styles.textBasicFont,
              }}
            >
              Did you know?
            </Text>
            <Text
              style={{
                color: "#595959",
                fontSize: 12,
                paddingTop: 20,
                textAlign: "center",
                ...styles.textBasicFont,
              }}
            >
              {didYouKnowRandomMessage}
            </Text>
          </View>
        </View>
      </ScrollView>
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

export default Home;

const didYouKnow = [
  "Laughter can increase muscle activity by up to 20%, making it a great way to exercise.",
  "EMG can control video games without traditional controllers, benefiting players with physical disabilities.",
  "Listening to music can improve exercise performance and delay muscle fatigue.Listening to music can improve exercise performance and delay muscle fatigue.",
  "The average human can jump higher than their own height, thanks to the power of their leg muscles.",
  "If all the muscles in you body pulled in the same direction, you could lift up to 25 tons!",
];

const didYouKnowRandomMessage =
  didYouKnow[Math.floor(Math.random() * didYouKnow.length)];

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
