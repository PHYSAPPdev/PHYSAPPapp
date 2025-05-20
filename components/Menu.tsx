import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Linking,
    StyleSheet,
    BackHandler,
    Alert,
    Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

type Page = 'home' | 'cinematica' | 'termodinamica' | 'eletromagnetismo';

type MenuProps = {
    visible: boolean;
    onClose: () => void;
    onNavigate: (route: Page) => void;
};

const Menu: React.FC<MenuProps> = ({ visible, onClose, onNavigate }) => {
    if (!visible) return null;

    // Função para fechar o app
    const handleExitApp = () => {
        onClose();
        if (Platform.OS === 'android') {
            BackHandler.exitApp();
        } else {
            Alert.alert(
                'Sair do App',
                'No iOS, pressione o botão Home para sair.',
                [{ text: 'OK' }]
            );
        }
    };

    // Função para links externos com tratamento de erros
    const handleExternalLink = async (url: string) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Não é possível abrir: ${url}`);
            }
        } catch (error) {
            Alert.alert('Erro ao abrir o link');
        }
        onClose();
    };

    return (
        <View style={styles.menuContainer}>
            {/* Cabeçalho */}
            <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Menu</Text>
                <TouchableOpacity onPress={onClose}>
                    <FontAwesome5 name="times" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Conteúdo Principal */}
            <View style={styles.menuContent}>
                {/* Seção Navegação */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Seções</Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            onNavigate('home');
                            onClose();
                        }}
                    >
                        <FontAwesome5 name="home" size={20} style={styles.icon} />
                        <Text style={styles.menuText}>Página Inicial</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            onNavigate('cinematica');
                            onClose();
                        }}
                    >
                        <FontAwesome5 name="tachometer-alt" size={20} style={styles.icon} />
                        <Text style={styles.menuText}>Cinemática</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            onNavigate('termodinamica');
                            onClose();
                        }}
                    >
                        <FontAwesome5 name="fire" size={20} style={styles.icon} />
                        <Text style={styles.menuText}>Termodinâmica</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            onNavigate('eletromagnetismo');
                            onClose();
                        }}
                    >
                        <FontAwesome5 name="bolt" size={20} style={styles.icon} />
                        <Text style={styles.menuText}>Eletromagnetismo</Text>
                    </TouchableOpacity>
                </View>

                {/* Seção Links Externos */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recursos</Text>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleExternalLink('https://physappdev.github.io/PHYSAPPapp/')}
                    >
                        <FontAwesome5 name="external-link-alt" size={20} style={styles.icon} />
                        <Text style={styles.menuText}>Versão Web</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleExternalLink('https://physappdev.github.io/PHYSAPP/')}
                    >
                        <FontAwesome5 name="external-link-alt" size={20} style={styles.icon} />
                        <Text style={styles.menuText}>Site Oficial</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleExternalLink('https://github.com/PHYSAPPdev')}
                    >
                        <FontAwesome5 name="github" size={20} style={styles.icon} />
                        <Text style={styles.menuText}>Github</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleExternalLink('https://landbot.online/v3/H-2949235-88J8RTDDSG8DOE13/index.html')}
                    >
                        <FontAwesome5 name="cog" size={20} style={styles.icon} />
                        <Text style={styles.menuText}>Chatbot</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Rodapé */}
            <View style={styles.menuFooter}>
                <TouchableOpacity
                    style={[styles.menuItem, styles.exitButton]}
                    onPress={handleExitApp}
                >
                    <FontAwesome5 name="sign-out-alt" size={20} style={styles.icon} />
                    <Text style={[styles.menuText, styles.exitText]}>Sair do App</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos COMPLETOS
const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '85%',
        height: '100%',
        backgroundColor: '#2A354E',
        paddingVertical: 40,
        paddingHorizontal: 20,
        zIndex: 1000,
    },
    menuHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    menuTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    menuContent: {
        flex: 1,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 5,
        borderRadius: 5,
    },
    icon: {
        color: 'white',
        width: 30,
        marginRight: 15,
        textAlign: 'center',
    },
    menuText: {
        color: 'white',
        fontSize: 18,
    },
    menuFooter: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 20,
    },
    exitButton: {
        backgroundColor: 'rgba(255, 50, 50, 0.2)',
    },
    exitText: {
        color: '#FF6B6B',
        fontWeight: 'bold',
    },
});

export default Menu;