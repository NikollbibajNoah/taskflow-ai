import React from 'react';

type MainContentProps = {
    children?: React.ReactNode;
}

export const MainContent:React.FC<MainContentProps> = ({ children }) => {
    return <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">{children}</div>;
}