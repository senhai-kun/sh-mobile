const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    darken: {
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.10)',
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        // padding: 20,
        marginLeft: 20
    },
    settingsWrapper: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    senhai: {
        fontSize: 20,
        color: '#79C7F5' 
    },
    settingsTitle: {
        opacity: 0.6, 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    settingsTitleText: {
        fontSize: 16, 
        marginLeft: 5
    }
})
