function ParlayGroup({
  parlay,
  index,
  totalParlays,
  onAddLeg,
  onRemoveParlay,
  onLegChange,
  onRemoveLeg,
}) {
  return (
    <div className="parlay-group">
      <div className="parlay-header">
        <div className="parlay-title-actions">
          <label>Parlay {index + 1}</label>
          <button
            className="po-button"
            type="button"
            onClick={() => onAddLeg(parlay.id)}
          >
            Add Leg
          </button>
        </div>
        <div className="parlay-actions">
          <button
            className="po-button"
            type="button"
            onClick={() => onRemoveParlay(parlay.id)}
            disabled={totalParlays === 1}
          >
            Remove Parlay
          </button>
        </div>
      </div>
      <div className="odds-group">
        {parlay.legs.flatMap((leg, legIndex) => {
          const isOptionalLeg = legIndex >= 1;

          return [
            <label key={`${parlay.id}-label-${legIndex}`}>
              Leg {legIndex + 1} Odds{isOptionalLeg ? " (optional)" : ""}
            </label>,
            <input
              className="po-input"
              key={`${parlay.id}-input-${legIndex}`}
              type="number"
              step="1"
              value={leg}
              onChange={(event) =>
                onLegChange(parlay.id, legIndex, event.target.value)
              }
            />,
            isOptionalLeg ? (
              <button
                key={`${parlay.id}-remove-${legIndex}`}
                className="po-button remove-leg"
                type="button"
                onClick={() => onRemoveLeg(parlay.id, legIndex)}
              >
                Remove Leg
              </button>
            ) : (
              <span
                key={`${parlay.id}-spacer-${legIndex}`}
                className="leg-action-spacer"
              />
            ),
          ];
        })}
      </div>
      <div className="calc-group">
        <label>Decimal Odds: {parlay.odds}</label>
        <label className="bet-field">Bet: {parlay.bet}</label>
        <label>Win: {parlay.win}</label>
      </div>
    </div>
  );
}

export default ParlayGroup;
