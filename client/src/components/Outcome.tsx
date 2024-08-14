import React, { useState } from 'react';
import { outcomeDataType } from './App';

interface OutcomeProps {
  outcome: outcomeDataType;
}

const Outcome: React.FC<OutcomeProps> = ({ outcome }) => {
	const [isToggled, setIsToggled] = useState(false);
	

const handleChange = () => {
	setIsToggled(!isToggled);
};

  return (
    <div className="outcome">
      <h4>Outcome: {outcome.name}</h4>
			<button 
			onClick={handleChange}> {isToggled ?  `Decimal: ${outcome.price.decimal}` : `Fraction: ${outcome.price.num}/${outcome.price.den}`} 
			</button>  
    </div>
  );
};

export default Outcome;
