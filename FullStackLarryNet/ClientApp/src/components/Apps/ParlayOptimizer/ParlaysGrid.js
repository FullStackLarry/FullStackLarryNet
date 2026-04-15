import ParlayGroup from './ParlayGroup';

function ParlaysGrid({
  parlays,
  totalParlays,
  onAddLeg,
  onRemoveParlay,
  onLegChange,
  onRemoveLeg,
}) {
  return (
    <div className='parlays-grid'>
      {parlays.map((parlay, index) => (
        <ParlayGroup
          key={parlay.id}
          parlay={parlay}
          index={index}
          totalParlays={totalParlays}
          onAddLeg={onAddLeg}
          onRemoveParlay={onRemoveParlay}
          onLegChange={onLegChange}
          onRemoveLeg={onRemoveLeg}
        />
      ))}
    </div>
  );
}

export default ParlaysGrid;
