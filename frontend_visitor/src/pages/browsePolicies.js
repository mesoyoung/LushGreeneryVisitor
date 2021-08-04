import React from 'react';
import DropdownContainer from '../components/dropdown/dropdown.js';
import PolicyContainer from '../components/policyContainer/policyContainer.js';



const POLICIES = [
  {
    id: 'policy-0',
    name: 'Protection Scheme 1',
    description: 'Policy Sceme 1 offers wider coverage for your daily health problems.',
  },
  {
    id: 'policy-1',
    name: 'Protection Scheme 2',
    description: '',
  },
  {
    id: 'policy-2',
    name: 'Protection Scheme 3',
    description: '',
  }
];



const BrowsePolicies = () => {

  const policiesList = POLICIES.map(policy => (
    <PolicyContainer id={policy.id} name={policy.name} description={policy.description} />

  ));

  return (
    <div>
      <div className = "headerAndDropdown">
        <DropdownContainer />
      </div>
      <div className='policyLists'>
        <ul>
          {policiesList}
        </ul>
      </div>
      <button type="button" className="btn">
        Show selected choices
      </button>
    </div>
  )
}


export default BrowsePolicies;
