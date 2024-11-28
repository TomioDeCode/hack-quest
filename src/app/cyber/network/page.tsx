import React from 'react';

interface WebViewProps {
  url: string;
  width?: string;
  height?: string;
}

const WebView: React.FC<WebViewProps> = ({ 
  url, 
  width = '100%', 
  height = '600px' 
}) => {
  return (
    <iframe 
      src={url}
      width={width}
      height={height}
      allowFullScreen
    />
  );
};

export default function Page() {
  return (
    <WebView 
      url="http://quest.free.nf/quest/web/01" 
      width="800px" 
      height="500px" 
    />
  );
}