// AdsManager.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const AD_UNIT_ID = TestIds.BANNER; // Replace with your real Ad Unit ID in production

const AdsManager = () => {
  return (
    <View style={styles.adContainer}>
      <BannerAd
        unitId={AD_UNIT_ID}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
});

export default AdsManager;
