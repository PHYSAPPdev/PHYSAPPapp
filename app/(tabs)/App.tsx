import React, { useRef, useState } from 'react';
import { View, ScrollView, SafeAreaView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

/* Pages */
import Homepage from './Homepage';
import Eletromagnetismo from './sections/Eletromagnetismo';
import Cinematica from './sections/Cinematica';
import Termodinamica from './sections/Termodinamica';

/* Components */
import Header from '../../components/Header';
import NavBar from '../../components/Navbar';
import Menu from '../../components/Menu'; // Novo componente

/* Styles */
import styles from '../../styles/Styles';

type Page = 'home' | 'cinematica' | 'termodinamica' | 'eletromagnetismo';

export type { Page };

export default function App() {
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [menuVisible, setMenuVisible] = useState<boolean>(false); // Estado do menu
  const lastOffset = useRef<number>(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (menuVisible) return; // Não esconde navbar se menu estiver aberto
    
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - lastOffset.current;
    const direction = diff > 0 ? 'down' : 'up';

    if (Math.abs(diff) > 80) {
      setNavbarVisible(direction === 'up');
      lastOffset.current = currentOffset;
    }
  };

  const handleNavigate = (route: Page) => {
    setCurrentPage(route);
    setMenuVisible(false); // Fecha menu ao navegar
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage />;
      case 'cinematica':
        return <Cinematica />;
      case 'termodinamica':
        return <Termodinamica />;
      case 'eletromagnetismo':
        return <Eletromagnetismo />;
      default:
        return <Homepage />;
    }
  };

  const menuMap: Record<Page, number> = {
    home: 1,
    cinematica: 2,
    termodinamica: 3,
    eletromagnetismo: 4,
  };

  const activeMenuId = menuMap[currentPage] || 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header onMenuPress={() => setMenuVisible(!menuVisible)} />
      
      {/* Menu Overlay */}
      {menuVisible && (
        <View style={styles.menuOverlay} />
      )}

      {/* Componente Menu */}
      <Menu 
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onNavigate={handleNavigate}
      />

      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}>
        {renderPage()}
      </ScrollView>

      <NavBar
        visible={navbarVisible && !menuVisible} // Esconde navbar quando menu está aberto
        onNavigate={handleNavigate}
        activeItem={activeMenuId}
      />
    </SafeAreaView>
  );
}