import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2A354E',
  },
  view: {
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#2A354E',
    ...Platform.select({
      ios: {
        height: 50,
      },
    }),
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 70,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 18,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#2A354E',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    elevation: 10, // Android shadow
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  navButton: {
    alignItems: 'center',
    padding: 5,
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
});

export default styles;