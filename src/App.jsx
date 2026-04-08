import { useState } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import ExecutiveSummary from './components/tabs/ExecutiveSummary';
import FinancialHealth from './components/tabs/FinancialHealth';
import WhereDuesGo from './components/tabs/WhereDuesGo';
import PLSinceInception from './components/tabs/PLSinceInception';
import BankTransactions from './components/tabs/BankTransactions';
import Q1Budget from './components/tabs/Q1Budget';
import WaterTimeline from './components/tabs/WaterTimeline';
import ProposedSolutions from './components/tabs/ProposedSolutions';
import ContractsVendors from './components/tabs/ContractsVendors';
import { COLORS } from './data/constants';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('executive');

  const renderTab = () => {
    switch (activeTab) {
      case 'executive':
        return <ExecutiveSummary />;
      case 'health':
        return <FinancialHealth />;
      case 'dues':
        return <WhereDuesGo />;
      case 'pl':
        return <PLSinceInception />;
      case 'bank':
        return <BankTransactions />;
      case 'budget':
        return <Q1Budget />;
      case 'water':
        return <WaterTimeline />;
      case 'solutions':
        return <ProposedSolutions />;
      case 'vendors':
        return <ContractsVendors />;
      default:
        return <ExecutiveSummary />;
    }
  };

  return (
    <div style={{
      background: COLORS.background,
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ background: COLORS.background }}>
        {renderTab()}
      </main>
    </div>
  );
}

export default App;
