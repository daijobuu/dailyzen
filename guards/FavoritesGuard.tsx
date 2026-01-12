import React, { useCallback, useState } from 'react';
import Favorites from '../screens/Favorites';
import PaywallModal from '../components/PaywallModal';
import { useUserStore } from '../stores/userStore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function FavoritesGuard() {
  const isPremium = useUserStore((s) => s.isPremium);

  const [showPaywall, setShowPaywall] = useState(false);
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      if (!isPremium) {
        setShowPaywall(true);
      }

      return () => setShowPaywall(false);
    }, [isPremium]),
  );

  const handleClose = useCallback(() => {
    setShowPaywall(false);
    if (!isPremium) {
      navigation.navigate('Home');
    }
  }, [isPremium, navigation]);

  if (isPremium) {
    return <Favorites />;
  }

  if (!showPaywall) {
    return null;
  }

  return <PaywallModal visible={showPaywall} onClose={handleClose} />;
}
