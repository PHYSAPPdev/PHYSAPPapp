import { StyleSheet } from 'react-native';

const stylesCalcs = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  cardTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  cardContent: {
    marginTop: 10,
  },
  formulaText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#2c3e50',
  },
  blueText: {
    color: '#2980b9',
    fontSize: 14,
    lineHeight: 20,
  },
  calculationSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 14,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#e8f4f8',
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  resultLabel: {
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 16,
    color: '#2c3e50',
  },
});

export default stylesCalcs;