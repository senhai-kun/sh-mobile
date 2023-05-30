import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Text, Provider, DarkTheme as PaperDarkTheme, configureFonts } from 'react-native-paper'
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import reduxStore from './src/redux/store'
import StackView from './src/views/StackView'
import DrawerNav from './src/drawer/DrawerNav';
import BottomNav from './src/bottomTab/BottomNav';
import { ActivityIndicator, Modal, StatusBar, StyleSheet, View } from 'react-native';
import CodePush from 'react-native-code-push';

// appcenter codepush release-react -a senhai/Senhai -d Production

const updateDialogOptions = {
  title: "Notice",
  optionalUpdateMessage: "A New Data Has Been Added!",
  optionalIgnoreButtonLabel: "Later",
  optionalInstallButtonLabel: "Install Now",
}
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,  
  updateDialog: updateDialogOptions,
  installMode: CodePush.InstallMode.IMMEDIATE,
}

const App = () => {
  const [totalUpdateSize, setTotalUpdateSize] = useState(1)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  
  useEffect( () => {
    CodePush.sync(codePushOptions, (status) => {
      switch(status) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log("Checking for updates.");
            break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            setIsDownloading(true)
            console.log("downloading")
            break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
            setIsUpdating(true)
            console.log("Installing update.");
            break;
        case CodePush.SyncStatus.UP_TO_DATE:
            console.log("Up-to-date.");
            break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
            setIsDownloading(false)
            setIsUpdating(false)
            console.log("Update installed.");
            break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
            console.log('Waiting for User Action')
      }
    },
    ({ receivedBytes, totalBytes, }) => {
      const totalSize = totalBytes < 1048576 ? totalBytes.toFixed(3) : (totalBytes / 1048576).toFixed(0)
      setTotalUpdateSize(totalSize)
      setDownloadProgress((receivedBytes / 1048576).toFixed(0))
      }
    )
  }, [])

  const { store, persistor } = reduxStore()

  // paper font config
  const fonts = {
    android: {
      regular: {
        fontFamily: 'OpenSans-Regular',
        // fontWeight: 'normal'
      },
      medium: {
        fontFamily: 'OpenSans-Medium',
        // fontWeight: 'normal',
      },
      light: {
        fontFamily: 'OpenSans-Italic',
        // fontWeight: 'bold',
      },
      thin: {
        fontFamily: 'OpenSans-Bold',
        // fontWeight: 'bold',
      }
    }
  }
  const paperTheme = {
    ...PaperDarkTheme,
    fonts: configureFonts(fonts)
  }

  return (
    <AppearanceProvider>
      <StatusBar barStyle='light-content' backgroundColor="#121212" animated={true} />
      <ReduxProvider store={store} >
      <Provider theme={paperTheme} >
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer theme={DarkTheme} >
            {/* <DrawerNav /> */}
            {/* <BottomNav /> */}
            <StackView />
            {/* open modal for downloading updates */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={isDownloading}
            >
              <View style={styles.darken}>
                <View style={styles.centerContainer} >
                    <Text style={styles.title}>Downloading Update</Text>
                    <View style={styles.progress} >
                      <ActivityIndicator color='#fff' size={23} />
                      { isUpdating ? 
                        <Text style={{ fontSize: 17 }} > Installing..</Text> 
                        :
                        <Text style={styles.percent} > {Math.floor(downloadProgress / totalUpdateSize * 100)}%</Text>
                      }
                    </View>
                </View>
              </View>
            </Modal>
          </NavigationContainer>
        </PersistGate>
      </Provider>
      </ReduxProvider>
    </AppearanceProvider>
  );
};

const styles = StyleSheet.create({
  darken: {
    height: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.70)'
  },
  centerContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems:'center'
  },
  title: {
    fontSize: 20,
    paddingBottom: 20
  },
  progress: {
    display: 'flex',
    flexDirection: 'row'
  },
  percent: {
    fontSize: 18
  }
})

export default App;
