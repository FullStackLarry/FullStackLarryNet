function AppHeader({ onAddParlay }) {
  return (
    <div className='po-app-header'>
      <h3>Parlay Optimizer</h3>
      <button className='add-parlay' type='button' onClick={onAddParlay}>
        Add Parlay
      </button>
    </div>
  );
}

export default AppHeader;
