import { useEffect, useRef, useState } from 'react';

import './ParlayOptimizer.css';
import AppHeader from './AppHeader';
import ParlaysGrid from './ParlaysGrid';
import TotalBetSection from './TotalBetSection';

const DEFAULT_TOTAL_BET = '10';

const createParlay = (id) => ({
  id,
  legs: ['-110', '-110'],
});

const oddsToDecimal = (odds) => {
  const numOdds = parseInt(odds, 10);

  if (Number.isNaN(numOdds)) {
    return 0;
  }

  return numOdds > 0 ? 1 + numOdds / 100 : 1 - 100 / numOdds;
};

const getParlayOdds = (parlay) => {
  return parlay.legs.reduce((product, leg, index) => {
    // First two legs are required; additional legs are optional until provided.
    if (index >= 2 && !leg) {
      return product;
    }

    return product * oddsToDecimal(leg);
  }, 1);
};

const calculateParlay = ({ totalBet, parlays }) => {
  const parsedTotalBet = parseFloat(totalBet);

  if (Number.isNaN(parsedTotalBet) || parsedTotalBet < 0) {
    return {
      parlays: parlays.map((parlay) => ({
        ...parlay,
        odds: '',
        bet: '',
        win: '',
      })),
      optimalTotalWin: '',
      coveredParlays: 0,
    };
  }

  const totalBetUnits = Math.floor(parsedTotalBet);
  const parlayData = parlays.map((parlay, index) => {
    const odds = getParlayOdds(parlay);

    return {
      index,
      odds,
      minimumCoverUnits:
        odds > 0 ? Math.ceil(parsedTotalBet / odds) : Number.POSITIVE_INFINITY,
    };
  });

  const coverableParlays = [...parlayData]
    .filter((parlay) => parlay.minimumCoverUnits <= totalBetUnits)
    .sort((left, right) => {
      if (left.minimumCoverUnits !== right.minimumCoverUnits) {
        return left.minimumCoverUnits - right.minimumCoverUnits;
      }

      return right.odds - left.odds;
    });

  const allocations = Array(parlays.length).fill(0);
  let coveredParlays = 0;
  let committedUnits = 0;

  for (const parlay of coverableParlays) {
    if (committedUnits + parlay.minimumCoverUnits > totalBetUnits) {
      continue;
    }

    allocations[parlay.index] = parlay.minimumCoverUnits;
    committedUnits += parlay.minimumCoverUnits;
    coveredParlays += 1;
  }

  const highestOddsParlay = parlayData.reduce(
    (best, current) => (current.odds > best.odds ? current : best),
    { index: 0, odds: Number.NEGATIVE_INFINITY },
  );

  if (parlays.length > 0 && highestOddsParlay.index >= 0) {
    allocations[highestOddsParlay.index] += totalBetUnits - committedUnits;
  }

  const calculatedParlays = parlays.map((parlay, index) => {
    const bet = allocations[index];
    const odds = parlayData[index].odds;
    const win = bet * odds;

    return {
      ...parlay,
      odds: odds.toFixed(4),
      bet: bet.toString(),
      win: win.toFixed(2),
    };
  });

  return {
    parlays: calculatedParlays,
    optimalTotalWin: calculatedParlays
      .reduce((total, parlay) => total + parseFloat(parlay.win || 0), 0)
      .toFixed(2),
    coveredParlays,
  };
};

function ParlayOptimizer() {
  const totalBetRef = useRef(null);
  const nextParlayIdRef = useRef(3);

  useEffect(() => {
    totalBetRef.current?.focus();
  }, []);

  const [inputs, setInputs] = useState({
    totalBet: DEFAULT_TOTAL_BET,
    parlays: [createParlay(1), createParlay(2)],
  });

  const calculatedState = calculateParlay(inputs);

  const handleTotalBetChange = (event) => {
    const { value } = event.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      totalBet: value,
    }));
  };

  const handleLegChange = (parlayId, legIndex, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      parlays: prevInputs.parlays.map((parlay) => {
        if (parlay.id !== parlayId) {
          return parlay;
        }

        return {
          ...parlay,
          legs: parlay.legs.map((leg, index) =>
            index === legIndex ? value : leg,
          ),
        };
      }),
    }));
  };

  const handleAddParlay = () => {
    const nextId = nextParlayIdRef.current;
    nextParlayIdRef.current += 1;

    setInputs((prevInputs) => ({
      ...prevInputs,
      parlays: [...prevInputs.parlays, createParlay(nextId)],
    }));
  };

  const handleAddLeg = (parlayId) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      parlays: prevInputs.parlays.map((parlay) => {
        if (parlay.id !== parlayId) {
          return parlay;
        }

        return {
          ...parlay,
          legs: [...parlay.legs, ''],
        };
      }),
    }));
  };

  const handleRemoveLeg = (parlayId, legIndex) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      parlays: prevInputs.parlays.map((parlay) => {
        if (parlay.id !== parlayId) {
          return parlay;
        }

        if (parlay.legs.length <= 2 || legIndex < 2) {
          return parlay;
        }

        return {
          ...parlay,
          legs: parlay.legs.filter((_, index) => index !== legIndex),
        };
      }),
    }));
  };

  const handleRemoveParlay = (parlayId) => {
    setInputs((prevInputs) => {
      if (prevInputs.parlays.length === 1) {
        return prevInputs;
      }

      return {
        ...prevInputs,
        parlays: prevInputs.parlays.filter((parlay) => parlay.id !== parlayId),
      };
    });
  };

  return (
    <div className='parlay-optimizer'>
      <AppHeader onAddParlay={handleAddParlay} />
      <TotalBetSection
        totalBet={inputs.totalBet}
        totalBetRef={totalBetRef}
        onTotalBetChange={handleTotalBetChange}
        optimalTotalWin={calculatedState.optimalTotalWin}
        coveredParlays={calculatedState.coveredParlays}
        parlayCount={calculatedState.parlays.length}
      />
      <ParlaysGrid
        parlays={calculatedState.parlays}
        totalParlays={inputs.parlays.length}
        onAddLeg={handleAddLeg}
        onRemoveParlay={handleRemoveParlay}
        onLegChange={handleLegChange}
        onRemoveLeg={handleRemoveLeg}
      />
    </div>
  );
}

export default ParlayOptimizer;
