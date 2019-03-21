import React from 'react';
import Score from './Score'
import { connect } from 'react-redux';
import { setTopNotes, setBottomNotes, setTimeSig, setKeySig } from '../actions/compositionActions';

class Composition extends React.Component {
  render() {
    return (
      <Score />
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     topNotes: state.topNotes,
//     bottomNotes: state.bottomNotes,
//     timeSig: state.timeSig,
//     keySig: state.keySig
//   }
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setTopNotes: (notes) => {
//       return dispatch(
//         setTopNotes(notes)
//       );
//     },
//     setBottomNotes: (notes) => {
//       return dispatch(
//         setBottomNotes(notes)
//       );
//     },
//     setTimeSig: (timeSig) => {
//       return dispatch(
//         setTimeSig(timeSig)
//       );
//     },
//     setKeySig: (keySig) => {
//       return dispatch(
//         setKeySig(keySig)
//       );
//     }
//   }
// };

export default Composition
