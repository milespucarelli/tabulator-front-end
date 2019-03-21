export const setStaffNotes = (notes) => {
  return {
    type: 'SET_STAFF_NOTES',
    notes
  };
};

export const setTabNotes = (notes) => {
  return {
    type: 'SET_TAB_NOTES',
    notes
  };
};

export const setTimeSig = (timeSig) => {
  return {
    type: 'SET_TIME_SIG',
    timeSig
  };
};

export const setKeySig = (keySig) => {
  return {
    type: 'SET_KEY_SIG',
    keySig
  };
};
