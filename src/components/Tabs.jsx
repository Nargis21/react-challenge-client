import * as React from 'react'

export function Bar({ tab, activeTab, setActiveTab }) {
  const tabStyle =
    tab.tabName === activeTab.tabName
      ? 'tab tab-lifted tab-active'
      : 'tab tab-lifted';
  return (
    <div onClick={() => setActiveTab(tab)} className={tabStyle}>
      {tab.tabName}
    </div>
  );
}

export function TabContent({ activeTab }) {
  return <div className="px-5">{activeTab.content}</div>;
}

export default function Tabs({ allTabs, activeTab, setActiveTab }) {
  // console.log('tabs : ',tabs)
  return (
    <div className="tabs">
      {allTabs.map((tab) => (
        <Bar tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
      ))}
    </div>
  );
}